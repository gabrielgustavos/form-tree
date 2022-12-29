import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { forwardRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from './components/form/form.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CdkTableModule } from '@angular/cdk/table';
import { InputComponent } from './components/form/input/input.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsuariosComponent,
    FormComponent,
    InputComponent,
    ButtonComponent,
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatFormFieldModule,
    MatSelectModule,
    CdkTableModule,
    MatProgressSpinnerModule,
  ],
  exports: [RouterModule],
  providers: [
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
