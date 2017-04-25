import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiRestService {

  constructor(private http: Http) { }

  public getByIdPaises(){
    let paises  = this.http.get('https://restcountries.eu/rest/v2/region/Americas')
    .map((res:Response) =>  res.json());
    return paises;
  }


  /**
   * getCliente
   */
  public getCliente():Observable<any> {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.get('https://ragzza-api-test.herokuapp.com/api/v1/clients', options)
            .map((response: Response) => response.json()).catch(this.handleError);
  }

  /**
   * delClient
   */
  public delClient(id:any):Observable<any> {
    console.log(id);
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.delete('https://ragzza-api-test.herokuapp.com/api/v1/clients/'+ id)
        .map((response: Response) => response.json())
        .catch(this.handleError);
  }

  /**
   * putClient
   */
  public putClient(id:any, name:any, email:any, country:any, phone:any, address:any):Observable<any> {

    let body = {
      name,
      email,
      country,
      address,
      phone
    };
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    
    return this.http.put('https://ragzza-api-test.herokuapp.com/api/v1/clients/'+id, body)
            .map((response: Response) => response.json())
            .catch(this.handleError)
  }

  /**
   * postClient
   */
  public postClient(name:any, email:any, country:any, address:any, phone:any) :Observable<any>{
    let body = { 
      name,
      email,
      country,
      address,
      phone
    };
    let headers = new Headers();

    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers })
    return this.http.post('https://ragzza-api-test.herokuapp.com/api/v1/clients', body)
            .map((response: Response) => response.json())
            .catch(this.handleError)
  }

/** API PAISES **/

  /**
   * getCountry
   */
  public getCountry():Observable<any> {
    let headers = new Headers();
    headers.append('Accept', 'application/json' );
    headers.append("X-Mashape-Key", "brtxVpfMZqmsh75ybwibjjQaEBoAp14QK8vjsndxPMBXHsIZC0");
    let options = new RequestOptions({ headers: headers });

    return this.http.get('https://restcountries-v1.p.mashape.com/subregion/South America', options)
            .map((response: Response) => response.json()).catch(this.handleError);
  }

  public handleError(error: any): any {
    let err = JSON.parse(error._body);
    if (err.error == 'Unauthenticated.') {
        err = Object.assign({}, err, { meta: { code: -1 } });
        return Observable.throw(err);
    } else {
        return Observable.throw(error.json());
    }
  }

}
