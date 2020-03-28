import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  NbThemeModule,
  NbContextMenuModule,
  NbMenuModule,
  NbToastrModule,
  NbSidebarModule,
  NbDialogModule, NbLayoutModule
} from "@nebular/theme";
import { UserService } from "./services/user/user.service";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { SpinnerService } from "./services/spinner/spinner.service";
import { RestclientService } from "./services/restclient/restclient.service";
import { ToastService } from "./services/toast/toast.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DataService } from './services/data/data.service';
import { NbEvaIconsModule } from '@nebular/eva-icons';
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
// }


export const options={};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NbContextMenuModule,
    BrowserAnimationsModule,
    NbToastrModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot({ name: "default" }),
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // }),
  ],
  providers: [
    UserService,
    SpinnerService,
    RestclientService,
    ToastService,
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
