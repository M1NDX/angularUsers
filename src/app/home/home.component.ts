import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketIoService } from '../socket-io.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  msg = "";
  listaMensajes:string[] = [];
  mensajesSubscription : Subscription;


  constructor(private socketIOService: SocketIoService) { }
  ngOnDestroy(): void {
    this.mensajesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.mensajesSubscription = this.socketIOService
        .getMessage()
        .subscribe((msg:string)=>{
          this.listaMensajes.push(msg);
          console.log("test");
        })
  }

  enviarMensaje(){
    this.socketIOService.sendMessage(this.msg);
  }






}
