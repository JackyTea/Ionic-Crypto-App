import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkingManagerService {

  private url = 'https://api.coingecko.com/api/v3/coins';

  constructor(private client: HttpClient) { }

  getAllCoins() {
    return this.client.get(this.url).pipe(map(data => data));
  }

  getOneCoin(id: string) {
    return this.client.get(`${this.url}/${id}`).pipe(map(data => data));
  }
}
