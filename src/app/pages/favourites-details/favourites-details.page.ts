import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  public updateForm: FormGroup;

  constructor(
    private databaseManager: DatabaseManagerService,
    private networkManager: NetworkingManagerService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      updateTerm: ['', Validators.required]
    });
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
      }
    });
    this.databaseManager.dbState().subscribe((data) => {
      if (data) {
        this.databaseManager.getCoin(this.id).then((fave) => {
          this.favourite = fave;
        });
      }
    });
    this.networkManager.getOneCoin(this.id).subscribe((data) => {
      this.favourite = data as Coin;
      this.favourite.description.en = this.favourite.description.en.length > 200 ?
        this.favourite.description.en.substring(0, 200) : this.favourite.description.en;
    });
  }

  updateFavourite(event: Event) {
    event.preventDefault();
    if (!this.updateForm.dirty ||
      !this.updateForm.valid ||
      !this.updateForm.get('updateTerm').value
    ) {

    } else {
      this.networkManager.getOneCoin(this.updateForm.get('updateTerm').value.toLowerCase()).subscribe((data) => {
        if(data) {
          const coinData = data as Coin;
          this.databaseManager.updateCoin(this.id, coinData);
          this.router.navigate(['/favourites-list']);
        } else {

        }
      });
    }
    this.updateForm.reset();
  }

  removeFromFavourites() {
    this.databaseManager.deleteCoin(this.id).then(_ => { });
    this.router.navigate(['/favourites-list']);
  }

}
