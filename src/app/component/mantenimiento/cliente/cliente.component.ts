import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/model/mantenimiento/Cliente';
import { ClienteService } from 'src/app/service/mantenimiento/cliente/cliente.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  modalRef !: BsModalRef;
  listaCliente: Cliente[] = [];
  listaClienteTemporal: Cliente[] = [];
  textoFiltra: string = "";

  // tslint:disable-next-line: variable-name
  _objCliente !: Cliente;
  // tslint:disable-next-line: variable-name
  _objClienteDelete !: Cliente;

  mensaje: string = "";
  titulo: string = "";
  subtitulo: string = "";
  visualizaLista: boolean = true;

  public href: string = "";

  constructor(

    //public bsModalRef: BsModalRef,

    private modalService: BsModalService,
    // tslint:disable-next-line: variable-name
    private _clienteService: ClienteService
    ) { }

  ngOnInit(): void {
    this.textoFiltra = '';
    this.ngListaCliente();
  }

    ngListaCliente() {
      this._clienteService.listar().subscribe(
        (result: Cliente[]) => {
          this.listaCliente = result;
          this.listaClienteTemporal = result;
          console.log(result);
        },
        err => {
          console.log(err);
        }
      );
    }

    ngFiltrarLista(): void {
      this.listaClienteTemporal = [];
      this.listaCliente.forEach(x => {
        if (x.nombre.toUpperCase().includes(this.textoFiltra.toUpperCase()))
        {
          this.listaClienteTemporal.push(x);
        }
      });
    }

    ngVerDetalle(obj: Cliente) {
      this.titulo = 'Editar Cliente';
      this.subtitulo = 'Actualizar Información';
      this.visualizaLista = !this.visualizaLista;
      this._objCliente = obj;
    }

    ngCrearCliente() {
      this.titulo = 'Crear Cliente';
      this.subtitulo = 'Ingresar Información';
      this._objCliente != null;
      this.visualizaLista = !this.visualizaLista;
    }

    ngSearch(): void {
      this.textoFiltra = '';
      this.ngFiltrarLista();
    }

    ngEliminar(obj: Cliente, template: TemplateRef<any>) {
      this._objClienteDelete = obj;
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    Confirmar(): void {
      console.log('Eliminar');
      console.log(this._objClienteDelete);

      this._clienteService.eliminar(this._objClienteDelete).subscribe(
        result => {
          this.DeleteRow(this._objClienteDelete);
        },
        err => {
          console.log(err);
        }
      );
      this.modalRef.hide();
    }

    Cancel(): void {
      this._objClienteDelete != null;
      this.modalRef.hide();
    }

    DeleteRow(obj: Cliente): void {
      this.listaCliente = this.listaCliente.filter( row => row.id != obj.id);
      this.listaClienteTemporal = this.listaCliente;
    }

}
