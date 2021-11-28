import { Component, OnInit } from '@angular/core';
import { NetworkingManagerService } from 'src/app/services/networking-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public coinData: any;

  constructor(private network: NetworkingManagerService) { }

  ngOnInit(): void {
    this.network.getAllCoins().subscribe(data => {
      this.coinData = data;
    });
  }
}
