import { Component, OnInit } from '@angular/core';
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

  public formClient: FormGroup;


  constructor(public httpService: ApiRestService, 
              public form:FormBuilder,
              public snack: SnackService) { 
    this.viewClientes();
    this.formClient = form.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.pattern('\\S+')])),
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
