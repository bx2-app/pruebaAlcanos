import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { MunicipioComponent } from './componentes/municipio/municipio.component';
import { DependientesComponent } from './componentes/dependientes/dependientes.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  {path: 'municipio', component: MunicipioComponent},
  {path: 'dependientes', component: DependientesComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
