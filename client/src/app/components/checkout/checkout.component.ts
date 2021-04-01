import { Component, OnInit } from '@angular/core';
import { CartitemsService } from 'src/app/services/cartitems.service';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public orderForm: FormGroup

  constructor(
    public _user: UsersService,
    public _order: OrdersService,
    public _cart: CartsService,
    public _cartitem: CartitemsService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public _r: Router
  ) { }

  ngOnInit(): void {
    this.orderForm = this._fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      city: ["", Validators.required],
      street: ["", Validators.required],
      shippingDate: ["", Validators.required],
      payment: ["", [Validators.required, Validators.pattern('^[0-9]*$')]]
    })
  }

  getInfoUser(e) {
    this.orderForm.controls[e.target.name].setValue(this._user.loggedInUser._doc[e.target.name])
  }

  checkNumberofOrdersDate(e) {
    this._order.get_all_orders_date(e.target.value).subscribe(
      (res: any) => {
        console.log(res.dates)
        if (res.dates.length >= 3) {
          this._snackBar.open("This day is busy, please pick another date", "X", {
            duration: 4000,
          });
          this.orderForm.controls.shippingDate.reset()
        }
      }
    )
  }

  sendOrder() {
    console.log(this.orderForm.value)
    this._order.add_new_order({
      user: this._user.loggedInUser._doc._id,
      cart: this._cart.openCart._id,
      total_cart_price: this._cartitem.cart_total_price,
      city: this.orderForm.value.city,
      street: this.orderForm.value.street,
      delivery_date: this.orderForm.value.shippingDate,
      payment_details: this.orderForm.value.payment
    }).subscribe(
      (res: any) => {
        this._snackBar.open(res.msg, "X", {
          duration: 3000,
        });
        this._cart.set_cart_has_complited(this._cart.openCart._id).subscribe(
          (res: any) => {
            this._order.isOrderComplited = true
          }
        )
      }
    )
  }

  CreditCardValidation() {
    if (this.orderForm.controls.payment.value.slice(0, 4) == "5326") {
      this.orderForm.controls.payment.setErrors(null)
    } else {
      this.orderForm.controls.payment.setErrors({ isCardValid: true })
    }
  }

  receiptBody() {
    let body = `
    JoyStick Gaming Online Store - ${(new Date).toJSON().slice(0, 10)}
    _________________________________________\n

    Name: ${this._user.loggedInUser._doc.firstName} ${this._user.loggedInUser._doc.lastName} \n
    Delivery date: ${this.orderForm.value.shippingDate}\n
    Delivery to: ${this.orderForm.value.city}, ${this.orderForm.value.street}\n
    Delivery Items:\n`;

    for (let item of this._cart.myCartItems) {
      body += `\t${item.item.name} X ${item.count} = ${item.total_item_price}$\n`;
    }

    body += `\t\n\tTotal Price:${this._cartitem.cart_total_price}$
    _________________________________________\n
    \n Thanks, hope to see you again !`;

    return body;
  }

}
