import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/interfaces/coin';
import { AlertController } from '@ionic/angular';
import { DatabaseManagerService } from 'src/app/services/database-manager.service';
import { NetworkingManagerService } from 'src/app/services/networking-manager.service';

@Component({
  selector: 'app-favourites-list',
  templateUrl: './favourites-list.page.html',
  styleUrls: ['./favourites-list.page.scss'],
})
export class FavouritesListPage implements OnInit {

  public favourites: Coin[];

  constructor(
    private networkManager: NetworkingManagerService,
    private databaseManager: DatabaseManagerService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.databaseManager.dbState().subscribe((data) => {
      if (data) {
        this.databaseManager.fetchCoins().subscribe((faves) => {
          this.favourites = faves;
        });
      }
    });
    for (const f of this.favourites) {
      this.networkManager.getOneCoin(f.id).subscribe((data) => {
        const favouriteData = data as Coin;
        f.image.small = favouriteData.image.small;
      });
    }
  }

  async removeFromFavourites(id: string) {
    this.databaseManager.deleteCoin(id).then(_ => {});
    const alert = this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success!',
      subHeader: 'Your favourites are updated!',
      message: `Removed ${id} from favourites!`,
      buttons: ['OK']
    });

    (await alert).present();
  }
}
