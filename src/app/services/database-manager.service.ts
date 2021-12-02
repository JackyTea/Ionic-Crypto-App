import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Coin } from '../interfaces/coin';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagerService {
  private storage: SQLiteObject;
  private coinsList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'coinsDatabase.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.storage = db;
        this.initializeTable();
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchCoins(): Observable<Coin[]> {
    return this.coinsList.asObservable();
  }

  initializeTable() {
    this.httpClient.get(
      'assets/dump.sql',
      { responseType: 'text' }
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getCoins();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  getCoins() {
    return this.storage.executeSql('SELECT * FROM favouritestable', []).then(res => {
      const items: Coin[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).coinId,
            symbol: res.rows.item(i).coinSymbol,
            name: res.rows.item(i).coinName,
            image: {
              thumb: res.rows.item(0).coinImage,
              small: res.rows.item(0).coinImage,
              large: res.rows.item(0).coinImage
            },
            marketData: { currentPrice: { usd: res.rows.item(i).coinPrice } },
            description: { en: res.rows.item(i).coinDescription }
          });
        }
      }
      this.coinsList.next(items);
    });
  }

  addCoin(coin) {
    const data = [coin.id, coin.symbol, coin.name, coin.image.small, coin.market_data.current_price.usd, coin.description.en];
    return this.storage.executeSql(
      'INSERT INTO favouritestable (coinId, coinSymbol, coinName, coinImage, coinPrice, coinDescription) \
       VALUES (?, ?, ?, ?, ?, ?)', data)
      .then(res => {
        this.getCoins();
      });
  }

  deleteCoin(id) {
    return this.storage.executeSql('DELETE FROM favouritestable WHERE coinId = ?', [id])
    .then(_ => {
      this.getCoins();
    });
  }

  updateCoin(oldId, newCoin) {
    this.deleteCoin(oldId);
    this.addCoin(newCoin);
  }

  getCoin(id: string): Promise<Coin> {
    return this.storage.executeSql('SELECT * FROM favouritestable WHERE coinId = ?', [id]).then(res => ({
      id: res.rows.item(0).coinId,
      symbol: res.rows.item(0).coinSymbol,
      name: res.rows.item(0).coinName,
      image: {
        thumb: res.rows.item(0).coinImage,
        small: res.rows.item(0).coinImage,
        large: res.rows.item(0).coinImage
      },
      marketData: { currentPrice: { usd: res.rows.item(0).coinPrice } },
      description: { en: res.rows.item(0).coinDescription }
    }));
  }
}
