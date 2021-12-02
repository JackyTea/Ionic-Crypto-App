import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coin } from 'src/app/interfaces/coin';
import { DatabaseManagerService } from 'src/app/services/database-manager.service';
import { NetworkingManagerService } from 'src/app/services/networking-manager.service';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.page.html',
  styleUrls: ['./coin-details.page.scss'],
})
export class CoinDetailsPage implements OnInit {

  public coin: Coin;

  public id: string;

  constructor(
    private databaseManager: DatabaseManagerService,
    private networkManager: NetworkingManagerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
      }
    });
    this.networkManager.getOneCoin(this.id).subscribe((data) => {
      const coinData = data as Coin;
      this.coin = coinData;
      this.coin.description.en = this.coin.description.en.length > 200 ?
        this.coin.description.en.substring(0, 200) : this.coin.description.en;
    });
  }

  addToFavourites() {
    this.databaseManager.addCoin(this.coin).then(_ => {});
  }

}
