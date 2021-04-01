import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { CartitemsService } from 'src/app/services/cartitems.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public myForm: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public _user: UsersService,
    public _cart: CartsService,
    public _order: OrdersService,
    public _cartitem: CartitemsService,
    public _r: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })

    if (this._user.loggedInUser._doc && this._user.loggedInUser._doc.isAdmin) {
      this._r.navigateByUrl('/store')
    }
  }

  public handle_login() {
    this._user.login(this.myForm.value).subscribe(
      (res: any) => {
        localStorage.token = res.token
        this._user.decode(res.token)
        this.myForm.reset()

        if (this._user.loggedInUser._doc.isAdmin) {
          this._r.navigateByUrl('/store')
          this._snackBar.open("Connected as ADMIN", "X", {
            duration: 3000,
          });
        } else {
          this._snackBar.open(res.msg, "X", {
            duration: 3000,
          });
          this._cart.get_open_cart(this._user.loggedInUser._doc._id).subscribe(
            (res: any) => {
              if (res.cart === null) {
                this._cart.openCart = {}
              } else {
                this._cart.openCart = res.cart
                this._cartitem.Func_GetCurrectitemsListCart()
              }
              this._order.get_last_order(this._user.loggedInUser._doc._id).subscribe(
                (res: any) => {
                  this._order.userLastOrder = res.order
                }
              )
            }
          )
        }
      }, err => {
        console.log(err)
        this._snackBar.open(err.error.error, "", {
          duration: 3000,
        });
      }
    )
  }

  handleOpenCart() {
    const body = { user_id: this._user.loggedInUser._doc._id }

    this._cart.open_new_cart(body).subscribe(
      (res: any) => {
        this._cart.openCart = res.cart_to_be_saved
        this._r.navigateByUrl('/store')
      }
    )
  }
}
