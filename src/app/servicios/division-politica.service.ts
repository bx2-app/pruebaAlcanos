import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DivisionPoliticaService {

  private urlApi = 'http://nomintegra.alcanosesp.com:8001/odata/';
  constructor(private http: HttpClient ) { }

  getDivisionPolitica() {
    return this.http.get(this.urlApi + 'divisionpoliticaniveles1');
  }
}
