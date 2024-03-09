import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api: any = "http://localhost/CodeIgniter-3.1.13-mobogic-task/welcome/";

  constructor(public http: HttpClient) { }



  uploadfile(newFile: any) {
    return this.http.post(this.api + 'submit', newFile);
  }


  getdata(dataToSend: any = null): Observable<any> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('param1', 'value1')
      .set('param2', 'value2');
    return this.http.post(`${this.api + 'get'}/endpoint`, dataToSend, { headers, params });
  }

  delete(deleteid: any) {
    let obj = { 'deleteid': deleteid };
    return this.http.post(this.api + 'delete', obj);
  }
  edit(adminid: any) {
    let obj = { 'adminid': adminid };
    return this.http.post(this.api + 'edit', obj);
  }
  update(editid: any, admminname: any, adminemail: any, adminmobile: any) {
    let obj = { 'editid': editid, 'admminname': admminname, 'adminemail': adminemail, 'adminmobile': adminmobile };
    return this.http.post(this.api + 'update', obj);
  }


}
