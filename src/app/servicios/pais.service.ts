import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private urlApi = 'http://nomintegra.alcanosesp.com:8001/';
  constructor(private http: HttpClient) {}

  getPaises() {
    return this.http.get(
      this.urlApi +
        'odata/paises'
    );
  }
}
