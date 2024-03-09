import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loaddata',
  templateUrl: './loaddata.component.html',
  styleUrls: ['./loaddata.component.scss']
})
export class LoaddataComponent {

  selectedFile: File | null = null;

  formm: FormGroup;
  // employees: any;
  editRowdata: any;

  constructor(private api: ApiService, private fbb: FormBuilder) {
    this.formm = fbb.group({
      fileInput: ['', Validators.required]
    });

    this.api.getdata().subscribe((res: any) => {
      this.employees = res[0];
      console.log(res);

    })
  }

  editRow(adminid: any) {
    this.api.edit(adminid).subscribe((res: any) => {
      // console.log(res);
      this.editRowdata = res;

    })
  }
  update(selcid: any, name: any, mobile: any, email: any) {
    this.api.update(selcid, name, mobile, email).subscribe((res: any) => {
      // console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'The data has been updated Successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        location.reload();
      })
  
    });
  }

  deleteRow(delid: any) {
    this.api.delete(delid).subscribe((res: any) => {
      console.log(res);
      if (res) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "The Data has been successfully deleted"
        }).then(() => {
          location.reload();
        })
      }
    })
  }





  filess: any;
  uploadFileselected(elmt: any) {
    this.filess = elmt.target.files[0];
    // console.log(this.filess);

  }


  submit() {
    // console.log(this.filess, "rutuja");
    let form = new FormData();
    form.append('newFile', this.filess);
    this.api.uploadfile(form).subscribe((res: any) => {
      // console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'File Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        location.reload();
      })
    })


  }






  employees: any[] = [];  
  paginatedEmployees: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  ngOnInit() {

    this.paginateData();
   
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.paginateData();
  }

  private paginateData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedEmployees = this.employees.slice(startIndex, startIndex + this.itemsPerPage);
  }

getPageArray(): number[] {
  const totalPages = this.getTotalPages();
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

getTotalPages(): number {
  return Math.ceil(this.employees.length / this.itemsPerPage);
}
calculateMin(value1: number, value2: number): number {
  return Math.min(value1, value2);
}


itemsPerPageOptions = [5, 10, 15, 20];  
itemsPerPageControl = new FormControl(10);  

 


}
