import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/interfaces/coin';
import { DatabaseManagerService } from 'src/app/services/database-manager.service';

@Component({
  selector: 'app-favourites-list',
  templateUrl: './favourites-list.page.html',
  styleUrls: ['./favourites-list.page.scss'],
})
export class FavouritesListPage implements OnInit {

  public favourites: Coin[];

  constructor(private databaseManager: DatabaseManagerService) { }

  ngOnInit() {
    this.databaseManager.dbState().subscribe((data) => {
      if(data) {
        this.databaseManager.fetchCoins().subscribe((faves) => {
          console.log('JOE HERE ', faves);
          this.favourites = faves;
        });
      }
    });
  }

}
