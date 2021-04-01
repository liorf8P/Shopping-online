import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public _user: UsersService,
    public _r: Router
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._fb.group({
      id: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });

    this.secondFormGroup = this._fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  Register() {
    const body = {
      firstName: this.secondFormGroup.controls.name.value,
      lastName: this.secondFormGroup.controls.lastname.value,
      email: this.firstFormGroup.controls.email.value,
      citizenID: this.firstFormGroup.controls.id.value,
      password: this.firstFormGroup.controls.password.value,
      city: this.secondFormGroup.controls.city.value,
      street: this.secondFormGroup.controls.street.value
    }
    this._user.register(body).subscribe(
      (res: any) => {
        this._snackBar.open(res.msg, "X", {
          duration: 3000,
        });
        this.secondFormGroup.reset()
        this.firstFormGroup.reset()
        this._r.navigateByUrl("/homepage/login")
      }
    )
  }

  isUserIdExist() {
    this._user.get_user_id(this.firstFormGroup.controls.id.value).subscribe(
      (res: any) => {
        if (res.user_id != null) {
          this.firstFormGroup.controls.id.setErrors({ idExist: true })
        }
      }
    )
  }

  ConfirmPassword() {
    const password = this.firstFormGroup.controls.password.value
    const confirmpassword = this.firstFormGroup.controls.confirmpassword.value
    if (confirmpassword == "") {
      this.firstFormGroup.controls.confirmpassword.setErrors(null)
    } else {
      if (password == confirmpassword) {
        this.firstFormGroup.controls.confirmpassword.setErrors(null)
      } else {
        this.firstFormGroup.controls.confirmpassword.setErrors({ misMatch: true })
      }
    }
  }

}
