import { Component, OnInit, TemplateRef } from '@angular/core';
import { Usuario } from '../Usuario';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../usuarios.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;
  registrado = false;
  error = false;
  esperando = false;
  errorVal = "";

  estados = ['AGUASCALIENTES','JALISCO','CIUDAD DE MÉXICO'];
  hobbies = ['Correr','Nadar','Cine','Leer','Programar','Videjuegos'];
  selectedH: boolean[];

  modoNew = true;

  user:Usuario;


  //para multer

  image;
  src;




  constructor(
    private route: ActivatedRoute,
    private userService: UsuariosService,
    private modalService: BsModalService,
    private http: HttpClient
    ) { 
    this.selectedH = this.hobbies.map(h => false);
  
  }

  ngOnInit(): void {

    this.route.params.subscribe((params)=>{
      if(params.id){
         this.modoNew = false;
         this.user = this.userService.getUsers().find(n => n.nombre = params.id);
      }else{
         this.user = new Usuario('','','',[]);
      }
    })

    
  }

  submit(formulario: NgForm){
    this.esperando = true;
    console.log(formulario);
    this.userService.addUser(this.user)
    .subscribe(
      (data)=> {
        console.log(data)
        this.esperando = false;
        this.registrado = true;

      },
      (err)=> {
        console.log(err);
        this.esperando = false;
        this.error = true;
        this.errorVal = err.error.error;
      }
    );

  }

  closeAlert(){
    this.error =false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }


  obtenerImage(event){
    this.image = event.target.files[0];
    console.log(this.image);

    let reader = new FileReader();
    reader.onloadend = ()=> {
         this.src =  reader.result;
    }
    reader.readAsDataURL(this.image);
  }

  uploadImage(form: NgForm){
    let formData = new FormData();
    formData.append("image",this.image);
    formData.append("desc",form.value.desc);
    this.http.post('http://localhost:3000/upload', formData).subscribe((res)=>console.log(res))
  }

}
