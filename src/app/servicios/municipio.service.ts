import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MunicipioService {
  private urlApi = 'http://nomintegra.alcanosesp.com:8001/';
  constructor(private http: HttpClient) {}

  // Lista de municipios
  getMunicipios() {
    return this.http.get(
      this.urlApi +
        'odata/divisionpoliticaniveles2?$expand=divisionpoliticanivel1'
    );
  }

  // Obtener municipio por codigo
  getMunicipio(id: number) {
    return this.http.get(`${this.urlApi}odata/divisionpoliticaniveles2/${id}`);
  }

  // guardar municipio
  guardar(data: any, esEdicion: boolean = false, id: any = null) {
    if (!esEdicion){
      return this.http.post(`${this.urlApi}api/divisionpoliticaniveles2`, data);
    }
    else{
      return this.http.put(
        `${this.urlApi}api/divisionpoliticaniveles2/${id}`,
        data
      );
    }
  }
}
