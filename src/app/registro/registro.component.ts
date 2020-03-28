import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  // tslint:disable: no-inferrable-types
    nombre: string = '';
    email: string = '';
    password: string = '';
    rol: string = '';
  
  
  
  
  
    // tslint:disable-next-line: variable-name
    constructor(private dataService: DataService, private _renderer: Renderer2) { }
  
    ngOnInit(): void {
    }
    // tslint:disable-next-line: use-lifecycle-interface
    ngAfterContentChecked(): void {
    }
  
    guardarUsuario() {
      // tslint:disable-next-line: prefer-const
      let element = document.getElementById('mensajeAlertaGuardar');
      element.innerHTML = '';
      console.log(this.nombre, this.email, this.password, this.rol);
      this.dataService.agregarUsuario(this.nombre, this.email, this.password, this.rol)
        .subscribe((resultado) => {
        console.log(resultado);
        this._renderer.selectRootElement(this._renderer, true);
        this.dataService.obtenerUsuarios();
        this.nombre = '';
        this.email = '';
        this.password = '';
        this.rol = '';
        localStorage.removeItem('_id');
      }, (error) => {
        console.log( error );
        // tslint:disable-next-line: triple-equals
        if (error.error.mensajeError != 0) {
          // tslint:disable-next-line: only-arrow-functions
          (error.error.mensajeError).forEach(function(mensajeError) {
            element.innerHTML = element.innerHTML + "<div class='alert alert-danger alert-dismissible fade show' role='alert'>"+
            "<strong>" + mensajeError.mensaje +"</strong>" +
            "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
              "<span aria-hidden='true'>&times;</span>"+
            "</button>"+
          "</div>";
          });
        }
      });
    }
  }
