import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './compartidos/navegacion/navegacion.component';
import { MunicipioComponent } from './componentes/municipio/municipio.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule} from '@angular/forms';
import { DependientesComponent } from './componentes/dependientes/dependientes.component';


@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    MunicipioComponent,
    InicioComponent,
    DependientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, DataTablesModule, ModalModule.forRoot(), FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
