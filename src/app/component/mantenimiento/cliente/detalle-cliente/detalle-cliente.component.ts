import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Host,
  ɵConsole,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Cliente } from 'src/app/model/mantenimiento/Cliente';
import { IfStmt } from '@angular/compiler';
import { ClienteService } from 'src/app/service/mantenimiento/cliente/cliente.service';
import { ClienteComponent } from '../cliente.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


/* Datapicker */
import {
  BsDatepickerModule,
  BsDatepickerConfig,
  BsLocaleService,
} from 'ngx-bootstrap/datepicker';
import { esDoLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';

/* Calendar */
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateStruct,
  NgbDate,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.scss'],
})
export class DetalleClienteComponent implements OnInit {
  modalRef !: BsModalRef;
  // tslint:disable-next-line: variable-name
  @Input() _cliente!: Cliente;
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  visualizaLista = false;
  messageError: string = '';
  isError = false;
  isErrorAlert = false;
  bResultado: Boolean = false;

  datePickerConfig: Partial<BsDatepickerConfig>;

  // tslint:disable-next-line: variable-name
  Date_Desde?: NgbDate | null;
  // tslint:disable-next-line: variable-name
  Date_Hasta?: NgbDate | null;

  _objClienteEmail?: Cliente;

  constructor(
    //public bsModalRef: BsModalRef,
    private modalService: BsModalService,

    private _clienteService: ClienteService,
    private _builder: FormBuilder,
    @Host() private _app: ClienteComponent,
    /* Calendar */
    private ngbCalendar: NgbCalendar,

    /* Datapicker */
    private localeService: BsLocaleService
  ) {
    this.formCliente = this._builder.group({
      id: 0,
      nombre: [
        '',
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250),
      ],
      apellido: [
        '',
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250),
      ],
      correo: ['', Validators.required, Validators.email],
      fechaNacimiento: new Date(),
      direccion: '',
      activo: 0,
      fechaRegistro: new Date(),
    });

    // getToday
    this.Date_Desde = this.ngbCalendar.getToday();
    this.Date_Hasta = this.ngbCalendar.getNext(
      this.ngbCalendar.getToday(),
      'y',
      1
    );

    /* Datapicker */
    this.datePickerConfig = Object.assign(
      {},
      {
        containerClass: 'theme-red',
        showWeekNumbers: false,
        isAnimated: true,
        //minDate: new Date (this.Date_Desde.year, this.Date_Desde.month - 3, this.Date_Desde.day),
        //maxDate: new Date (this.Date_Hasta.year, this.Date_Hasta.month - 1, this.Date_Hasta.day),
        dateInputFormat: 'DD/MM/YYYY',
      }
    );

    esDoLocale.weekdaysShort = ['Lu', 'Ma', 'Mi', 'Jue', 'Vie', 'Sa', 'Do'];
    esDoLocale.weekdays = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ];
    esDoLocale.months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Setiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    //esDoLocale.week.dow = 0;
    defineLocale('es', esDoLocale);
  }

  get id() {
    return this.formCliente.get('id');
  }
  get nombre() {
    return this.formCliente.get('nombre');
  }
  get apellido() {
    return this.formCliente.get('apellido');
  }
  get correo() {
    return this.formCliente.get('correo');
  }
  get fechaNacimiento() {
    return this.formCliente.get('fechaNacimiento');
  }

  objetoCliente: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    // tslint:disable-next-line: new-parens
    fechaNacimiento: new Date(),
    direccion: '',
    activo: 0,
    fechaRegistro: new Date(),
  };

  formCliente = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    correo: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    direccion: new FormControl(''),
    activo: new FormControl(''),
    fechaRegistro: new FormControl(''),
  });

  ngOnInit(): void {
    this.formCliente = this._builder.group({
      id: 0,
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      fechaNacimiento: new Date(),
      direccion: '',
      activo: 0,
      fechaRegistro: new Date(),
    });

    this.localeService.use('es');
    this.ngLimpiar();
    this.ngBuscarFormularioCliente(this._cliente);
  }

  ngBuscarFormularioCliente(obj: Cliente) {
    if (obj != null || obj != undefined) {
      this.objetoCliente.id = obj.id;
      this.objetoCliente.nombre = obj.nombre;
      this.objetoCliente.apellido = obj.apellido;
      this.objetoCliente.correo = obj.correo;
      //this.objetoCliente.fechaNacimiento = obj.fechaNacimiento;
      this.objetoCliente.direccion = obj.direccion;
      this.objetoCliente.activo = obj.activo;
      this.objetoCliente.fechaRegistro = obj.fechaRegistro;

      var dFec1 = new Date(obj.fechaNacimiento);
      this.objetoCliente.fechaNacimiento = dFec1;
      var dFec2 = new Date(obj.fechaRegistro);
      this.objetoCliente.fechaRegistro = dFec2;
      this.formCliente.setValue(this.objetoCliente);
    }
  }

  ngSetCliente(): void {
    this.objetoCliente.id = this.formCliente.get('id')?.value;
    this.objetoCliente.nombre = this.formCliente.get('nombre')?.value;
    this.objetoCliente.apellido = this.formCliente.get('apellido')?.value;
    this.objetoCliente.correo = this.formCliente.get('correo')?.value;
    //this.objetoCliente.fechaNacimiento = this.formCliente.get('fechaNacimiento')?.value;

    if (
      this.formCliente.get('fechaNacimiento')?.value != null ||
      this.formCliente.get('fechaNacimiento')?.value != undefined
    ) {
      this.objetoCliente.fechaNacimiento = this.formCliente.get(
        'fechaNacimiento'
      )?.value;
    } else {
      //this.objetoCliente.fechaNacimiento = null;
    }
    this.objetoCliente.direccion = this.formCliente.get('direccion')?.value;
    this.objetoCliente.activo = this.formCliente.get('activo')?.value;
    //this.objetoCliente.fechaRegistro = this.formCliente.get('fechaRegistro')?.value;

    if (
      this.formCliente.get('fechaRegistro')?.value != null ||
      this.formCliente.get('fechaRegistro')?.value != undefined
    ) {
      this.objetoCliente.fechaRegistro = this.formCliente.get(
        'fechaRegistro'
      )?.value;
    } else {
      //this.objetoCliente.fechaNacimiento = null;
    }
    this.formCliente.setValue(this.objetoCliente);
  }

  onIsError(): void {
    this.isErrorAlert = true;
    setTimeout(() => {
      this.isErrorAlert = false;
    }, 5000);
  }

  ngLimpiar(): void {
    this.formCliente.reset();
    this.isError = false;
    setTimeout(() => {
      this.isErrorAlert = false;
    }, 0);
  }

  ngGrabarCliente(template: TemplateRef<any>): void {
    this.ngSetCliente();

    if (this.formCliente.invalid) {
      this.isError = true;
      this.onIsError();
      this.messageError = '';
      return;
    }

    this.isError = false;

    if (this.objetoCliente.id == 0 || this.objetoCliente.id == null) {
      this._clienteService.buscaremail(this.objetoCliente).subscribe(
        (result: Cliente) => {
          console.log(result);
          if (result == null) {

            this._clienteService.crear(this.objetoCliente).subscribe(
              (result) => {
                if (result) {
                  this.bResultado = true;

                  this.visualizaLista = !this.visualizaLista;
                  this._app.ngOnInit();
                  window.location.reload();

                } else {
                  this.bResultado = false;
                }
                // console.log(result);
              },
              (err) => {
                console.log(err);
              }
            );
          }
          else
          {
            this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this._clienteService.buscaremail(this.objetoCliente).subscribe(
        (result: Cliente) => {
          console.log(result);
          if (result == null) {

            this._clienteService.actualizar(this.objetoCliente).subscribe(
              (result) => {
                if (result) {
                  this.bResultado = true;

                  this.visualizaLista = !this.visualizaLista;
                  this._app.ngOnInit();
                  window.location.reload();

                } else {
                  this.bResultado = false;
                }
                // console.log(result);
              },
              (err) => {
                console.log(err);
              }
            );
          }
          else
          {
            this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }

  }

  ngVisualizarLista() {
    this.visualizaLista = !this.visualizaLista;
  }

  Cancel(): void {
    this.modalRef.hide();
  }
}
