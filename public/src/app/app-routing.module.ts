import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CakeComponent } from './cake/cake.component';

const routes: Routes = [
    { path: 'cake', component: CakeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
