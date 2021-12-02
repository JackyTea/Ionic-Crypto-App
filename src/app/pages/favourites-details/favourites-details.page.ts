import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coin } from 'src/app/interfaces/coin';
import { Router } from '@angular/router';
import { DatabaseManagerService } from 'src/app/services/database-manager.service';
import { NetworkingManagerService } from 'src/app/services/networking-manager.service';

@Component({
  selector: 'app-favourites-details',
  templateUrl: './favourites-details.page.html',
  styleUrls: ['./favourites-details.page.scss'],
})
export class FavouritesDetailsPage implements OnInit {

  public favourite: Coin;

  public id: string;

  constructor(
    private databaseManager: DatabaseManagerService,
    private networkManager: NetworkingManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
      }
    });
    this.databaseManager.dbState().subscribe((data) => {
      if(data) {
        this.databaseManager.getCoin(this.id).then((fave) => {
          this.favourite = fave;
        });
      }
    });
    this.networkManager.getOneCoin(this.id).subscribe((data) => {
      const favouriteData = data as Coin;
      this.favourite.name = favouriteData.name;
      this.favourite.symbol = favouriteData.symbol;
      this.favourite.image.large = favouriteData.image.large;
      this.favourite.marketData.currentPrice.usd = favouriteData.marketData.currentPrice.usd;
    });
  }

  updateFavourite() {

  }

  removeFromFavourites() {
    this.databaseManager.deleteCoin(this.id).then(_ => {});
    this.router.navigate(['/favourites-list']);
  }

}
