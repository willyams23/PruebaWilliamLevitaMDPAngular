import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

 /* Component */
 import { HeaderComponent } from './component/common/header/header.component';
 import { LayoutComponent } from './component/common/layout/layout.component';
 import { MainComponent } from './component/common/main/main.component';

 import { ClienteComponent } from './component/mantenimiento/cliente/cliente.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'mantenimiento',
                children: [
                    {
                        path: 'cliente',
                        component: ClienteComponent
                    }
                  ]
      },
      {
        path: '',
        component: MainComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
