import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MunicipioService } from '../../servicios/municipio.service';
import { DataTableDirective } from 'angular-datatables';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { DivisionPoliticaService } from '../../servicios/division-politica.service';
// import {Observable} from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.css'],
})
export class MunicipioComponent implements OnInit, AfterViewInit, OnDestroy {
  public municipios: any[] = [];
  public divisiones: any[] = [];
  // Datatable
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  // Fin variables datatable
  modalRef: BsModalRef;

  municipio: any = { codigo: '', nombre: '', divisionPoliticaNivel1Id: '' };
  esEdicion = false;
  idActual = null;

  constructor(
    private municipioServicio: MunicipioService,
    private divisionService: DivisionPoliticaService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 10,
    };
    this.getDataMunicipios();
    // Cargamos las divisiones politicas
    this.divisionService.getDivisionPolitica().subscribe((respuesta: any) => {
      this.divisiones = respuesta.value;
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  render(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  abrirModal(template: any) {
    this.municipio = { codigo: '', nombre: '', divisionPoliticaNivel1Id: '' };
    this.esEdicion = false;
    this.idActual = null;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      Swal.fire('Mensaje', 'Guardando', 'info');
      Swal.showLoading();
      this.municipioServicio.guardar(this.municipio, this.esEdicion, this.idActual).subscribe(
        (response) => {
          Swal.close();
          Swal.fire('Mensaje', 'Registro guardado correctamente', 'success');
          this.getDataMunicipios();
          this.modalRef.hide();
        },
        (err) => {
          if (err.status === 400) {
            Swal.close();
            Swal.fire(
              'Mensaje',
              'El Código (' +
                form.controls['codigo'].value +
                ') ya esta siendo utilizado',
              'error'
            );
          }
        }
      );
    } else {
      Swal.fire('Mensaje', 'El formulario no es válido', 'error');
    }
  }

  editar(template: any, item: any) {
    this.municipio = item;
    this.esEdicion = true;
    this.idActual = item.id;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  getDataMunicipios() {
    this.municipioServicio.getMunicipios().subscribe((respuesta: any) => {
      this.municipios = respuesta.value;
      this.render();
    });
  }
}
