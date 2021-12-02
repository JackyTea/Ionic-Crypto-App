import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/interfaces/coin';
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
    private databaseManager: DatabaseManagerService
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

  removeFromFavourites(id: string) {
    this.databaseManager.deleteCoin(id).then(_ => {});
  }
}
