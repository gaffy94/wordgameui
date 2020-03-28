import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AnnappComponent } from './annapp/annapp.component';
import { NbMenuModule, NbLayoutModule, NbSidebarModule, NbIconModule, NbSelectModule, NbActionsModule, NbUserModule, NbInputModule, NbContextMenuModule, NbDialogModule, NbCardModule, NbButtonModule, NbListModule, NbStepperModule } from '@nebular/theme';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FinalscoreComponent } from './finalscore/finalscore.component';
import { CountdownModule } from 'ngx-countdown';
@NgModule({
  declarations: [AnnappComponent, FinalscoreComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NbMenuModule,
    NbLayoutModule,
    NbSidebarModule,
    NbIconModule,
    NbSelectModule,
    NbActionsModule,
    NbUserModule,
    NbInputModule,
    NbContextMenuModule,
    NgxSpinnerModule,
    NbDialogModule.forChild(),
    NbCardModule,
    NbButtonModule,
    TranslateModule,
    NbListModule,
    NbUserModule,
    FormsModule,
    ReactiveFormsModule,
    NbStepperModule,
    NbEvaIconsModule,
    CountdownModule
  ]
})
export class PagesModule { }
