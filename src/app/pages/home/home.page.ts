import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatabaseManagerService } from 'src/app/services/database-manager.service';
import { NetworkingManagerService } from 'src/app/services/networking-manager.service';
import { Coin } from 'src/app/interfaces/coin';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public searchForm: FormGroup;

  constructor(
    private databaseManager: DatabaseManagerService,
    private networkManager: NetworkingManagerService,
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.databaseManager.dbState().subscribe((res) => {
      if (res) {
        this.databaseManager.fetchCoins().subscribe(_ => { });
      }
    });
    this.searchForm = this.formBuilder.group({
      searchTerm: ['', Validators.required]
    });
  }

  async searchCoin(event: Event) {
    event.preventDefault();
    if (!this.searchForm.dirty ||
      !this.searchForm.valid ||
      !this.searchForm.get('searchTerm').value
    ) {
      const alert = this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error!',
        subHeader: 'Empty field!',
        message: `Search field cannot be empty!`,
        buttons: ['OK']
      });

      (await alert).present();
    } else {
      this.networkManager.getOneCoin(this.searchForm.get('searchTerm').value.toLowerCase()).subscribe((data) => {
        if (data) {
          const coinData = data as Coin;
          this.router.navigate(['/coin-details', coinData.id]);
        }
      }, async () => {
        const alert = this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Error!',
          subHeader: 'Coin does not exist!',
          message: `Could not find the coin ${this.searchForm.get('searchTerm').value}...`,
          buttons: ['OK']
        });

        (await alert).present();
      });
    }
    this.searchForm.reset();
  }
}
