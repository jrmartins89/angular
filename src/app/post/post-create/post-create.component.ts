import { Component } from "@angular/core";

//templateUrl contem o caminho para o meu arquivo que vai ser como template deste componente
//selector vai permitir que o componente que foi criado seja utilizado. é um parâmetro que é utilizado para pode manipular esse componente
//componente precisa de um template e de um seletor por via de regra

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls:['./post-create.component.css']
})
export class PostCreateComponent{
  enteredValue='';
  newPost='';
  onAddPost(){
    this.newPost=this.enteredValue;
  }
}
