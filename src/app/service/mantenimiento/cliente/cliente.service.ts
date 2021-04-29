import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiConfig, apiMantenimiento, apiUri } from '../../apiConfig';
import { Cliente } from 'src/app/model/mantenimiento/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private _HTTP: HttpClient) { }

  listar() {
    return this._HTTP.get<Cliente[]>(environment.dominio +  apiConfig.prefijo + apiMantenimiento.cliente + apiUri.Listar);
  }

  buscar(obj: Cliente) {
    return this._HTTP.get<Cliente>(environment.dominio +  apiConfig.prefijo + apiMantenimiento.cliente + apiUri.Buscar + '?id=' + obj.id);
  }

  buscaremail(obj: Cliente) {
    return this._HTTP.get<Cliente>(environment.dominio +  apiConfig.prefijo + apiMantenimiento.cliente + apiUri.BuscarEmail + '?id=' + obj.id + '&email=' + obj.correo);
  }

  crear(obj: Cliente) {
    if(obj.activo == null)
    {
      obj.activo = 1;
    }
    return this._HTTP.post(environment.dominio +  apiConfig.prefijo + apiMantenimiento.cliente + apiUri.Grabar, obj);
  }

  actualizar(obj: Cliente) {
    if(obj.activo == null)
    {
      obj.activo = 1;
    }
    return this._HTTP.put(environment.dominio +  apiConfig.prefijo + apiMantenimiento.cliente + apiUri.Actualizar, obj);
  }

  eliminar(obj: Cliente) {
    return this._HTTP.delete(environment.dominio +  apiConfig.prefijo + apiMantenimiento.cliente + apiUri.Eliminar + '?id=' + obj.id);
  }
}
