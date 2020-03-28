import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnappComponent } from './annapp/annapp.component';
import { FinalscoreComponent } from './finalscore/finalscore.component';

const routes: Routes = [
  {
    path:'play',
    component:AnnappComponent
  },
  {
    path:'finalscore',
    component:FinalscoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
