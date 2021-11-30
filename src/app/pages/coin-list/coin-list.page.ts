import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/interfaces/coin';
import { NetworkingManagerService } from 'src/app/services/networking-manager.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.page.html',
  styleUrls: ['./coin-list.page.scss'],
})
export class CoinListPage implements OnInit {

  public coins: Coin[];

  constructor(private networkManager: NetworkingManagerService) { }

  ngOnInit() {
    this.networkManager.getAllCoins().subscribe((data) => {
      const coinsData = data as Array<Coin>;
      this.coins = coinsData;
    });
  }

}
