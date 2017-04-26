import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ApiRestService } from '../api-rest.service';
import { SnackService } from '../snack.service';

@Component({
  selector: 'app-tablet-client',
  templateUrl: './tablet-client.component.html',
  styleUrls: ['./tablet-client.component.css']
})
export class TabletClientComponent implements OnInit {

  public getClients:any[] = [];
  public clienteId:any;
  public clientName:any;
  public clientCountry:any;
  public clientAddress:any;
  public clientPhone:any;
  public clientEmail:any;
  closeResult: string;

  public formClient: FormGroup;


  constructor(public httpService: ApiRestService, 
              public form:FormBuilder,
              public snack: SnackService,
              public modalService: NgbModal) { 
    this.viewClientes();
    this.formClient = form.group({
      name: new FormControl('', Validators.compose([
        Validators.required, 
        Validators.pattern('|^[a-zA-Z]+(\s*[a-zA-Z]*)*[a-zA-Z]+$|'),
        Validators.maxLength(45)
        ])),
      email: new FormControl('', Validators.compose([
        Validators.required, 
        Validators.pattern('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$')
        ])),
      country: new FormControl('', Validators.compose([Validators.required, Validators.pattern('\\S+')])),
      address: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('|^[a-zA-Z]+(\s*[a-zA-Z]*)*[a-zA-Z]+$|'),
        Validators.maxLength(100)
        ])),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('\\S+')]))
    })
  }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  @ViewChild('modal')
  modal: ModalComponent;
  close() {
    this.modal.close();
  }

  /**
   * viewDataClient
   */
  public viewDataClient(data:any) {
    this.clienteId  = data._id;
    this.clientName = data.name;
    this.clientAddress = data.address;
    this.clientPhone  = data.phone;
    this.clientEmail  = data.email;
    this.clientCountry = data.country;
    console.log(data);
  }

  /**
   * editDataClient
   */
  public editDataClient(data:any) {
    this.clienteId  = data._id;
    this.clientName = data.name;
    this.clientAddress = data.address;
    this.clientPhone  = data.phone;
    this.clientEmail  = data.email;
    this.clientCountry = data.country;
    console.log(data);
  }

    /**
   * viewClientes
   */
  public viewClientes() {
    
    this.httpService.getCliente().subscribe((response) => {
      
      this.getClients = response.content
      console.log(this.getClients);
    }, (error) => {
      console.log(error);
    })
  }

    /**
   * rmClient
   */
  public rmClient(id:any) {
    this.getClients =[];
    this.httpService.delClient(id).subscribe((response) => {
      console.log(response);
      if (response.code == 200){
        this.viewClientes();
        this.snack.showSnackBar("Cliente eliminado correctamente");
      }else{
        this.snack.showSnackBar("Error al eliminar cliente");
      }

    }, (error) => {
      console.log(error);
    })
    console.log(id);
  }

  /**
   * updateClient
   */
  public updateClient() {
    this.httpService.putClient(this.clienteId,this.clientName,this.clientEmail,this.clientCountry,this.clientPhone,this.clientAddress)
    .subscribe((response) => {
      console.log(response);
      if (response.code == 200){
        this.viewClientes();
        this.snack.showSnackBar("Cliente actualizado");
      }else{
        this.snack.showSnackBar("Error al actualizar");
      }
      
    }, (error) => {
      console.log(error)
    })
    
  }

  /**
   * addClient
   */
  public addClient() {
    console.log(this.formClient.value.name);
    let name = this.formClient.value.name;
    let email = this.formClient.value.email;
    let country = this.formClient.value.country;
    let address = this.formClient.value.address;
    let phone = this.formClient.value.phone;
    this.httpService.postClient(name,email,country,address,phone).subscribe((response) => {
      console.log(response);
      if (response.code == 200) {
        this.viewClientes();
        this.snack.showSnackBar("Nuevo cliente creado");
      } else {
        this.snack.showSnackBar("Cliente no creado");
      }
      this.formClient.reset();
    }, (error) =>{
      console.log(error);
    })
  }

}
