import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Coin } from 'src/app/interfaces/coin';
import { Router } from '@angular/router';
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

  public isFavourited = true;

  constructor(
    private databaseManager: DatabaseManagerService,
    private networkManager: NetworkingManagerService,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router
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
    this.databaseManager.getCoin(this.id).then((data) => {
      const coinData = data as Coin;
      if(coinData.id) {
        this.isFavourited = true;
      }
    }).catch(_ => {
      this.isFavourited = false;
    });
  }

  async addToFavourites() {
    this.isFavourited = true;
    this.databaseManager.addCoin(this.coin).then(_ => {});
    const alert = this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success!',
      subHeader: 'Your favourites are updated!',
      message: `Added ${this.coin.name} to favourites!`,
      buttons: ['OK']
    });

    (await alert).present();
  }

  async removeFromFavourites() {
    this.isFavourited = false;
    this.databaseManager.deleteCoin(this.id).then(_ => {});
    const alert = this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success!',
      subHeader: 'Your favourites are updated!',
      message: `Removed ${this.coin.name} from favourites!`,
      buttons: ['OK']
    });

    (await alert).present();
  }

}
