import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../servicios/pais.service';
import { DivisionPoliticaService } from '../../servicios/division-politica.service';
import { MunicipioService } from '../../servicios/municipio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dependientes',
  templateUrl: './dependientes.component.html',
  styles: [],
})
export class DependientesComponent implements OnInit {
  paises: any[] = [];
  departamentos: any[] = [];
  municipios: any[] = [];
  seleccion: any = {
    paisId: '',
    divisionPoliticaNivel1Id: '',
    municipioId: '',
  };
  filtroDepartamento: any[] = [];
  filtroMunicipio: any[] = [];
  constructor(
    private paisService: PaisService,
    private divisionService: DivisionPoliticaService,
    private municipioService: MunicipioService
  ) {}

  ngOnInit(): void {
    this.paisService.getPaises().subscribe((respuesta: any) => {
      this.paises = respuesta.value;
    });

    this.divisionService.getDivisionPolitica().subscribe((respuesta: any) => {
      this.departamentos = respuesta.value;
    });

    this.municipioService.getMunicipios().subscribe((respuesta: any) => {
      this.municipios = respuesta.value;
    });
  }

  filtrarDepartamento() {
    let $self = this;
    this.filtroDepartamento = null;
    this.filtroDepartamento = this.departamentos.filter(function (item) {
      return item.paisId == $self.seleccion.paisId;
    });
  }

  filtrarMunicipios() {
    let $self = this;
    this.filtroMunicipio = null;
    this.filtroMunicipio = this.municipios.filter(function (item) {
      return (
        item.divisionPoliticaNivel1Id ==
        $self.seleccion.divisionPoliticaNivel1Id
      );
    });
  }

  guardar() {
    console.log(this.seleccion);
    if (this.seleccion.paisId == '') {
      Swal.fire('Error', 'Debe seleccionar el país', 'error');
      return;
    }
    if (this.seleccion.divisionPoliticaNivel1Id == '') {
      Swal.fire('Error', 'Debe seleccionar el departamento', 'error');
      return;
    }
    if (this.seleccion.municipioId == '') {
      Swal.fire('Error', 'Debe seleccionar el municipio', 'error');
      return;
    }
    const id = `${this.seleccion.paisId}${this.seleccion.divisionPoliticaNivel1Id}${this.seleccion.municipioId}`;
    const existe = localStorage.getItem(id);
    if (!existe) {
      localStorage.setItem(id, JSON.stringify(this.seleccion));
      Swal.fire('Mensaje', 'Registro guardado', 'info');
    } else {
      Swal.fire('Mensaje', 'El registro existe', 'error');
    }
  }
}
