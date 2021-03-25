import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { PostListComponent } from './post/post-list/post-list.component';
import {PostCreateComponent} from './post/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
// tem que colocar o import ali em cima para poder informar o caminho do arquivo onde está esse componente.
// tem que adicionar os módulos criados na seção de declarations porque o angular não percorre todo o diretório para identificar os arquivos, sendo assim, se vc referenciar um component no app app.component.html sem incluir no app.module, o angular não vai saber quem ele é
// tem que adicionar o módulo FormsModule para poder  utilizar a diretiva ngModule no arquivo app.component.html

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
