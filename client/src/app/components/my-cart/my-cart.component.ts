import { Component, OnInit } from '@angular/core';
import { CartitemsService } from 'src/app/services/cartitems.service';
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  public cartContainerOpen: Boolean = true
  public checkoutProcess: Boolean = false

  public SearchCartOpen = false
  public SearchCartValue: string = ""

  constructor(
    private _snackBar: MatSnackBar,
    public _cartitem: CartitemsService,
    public _cart: CartsService,
    public _user: UsersService,
    public _order: OrdersService
  ) { }

  ngOnInit(): void {
    this._cart.get_open_cart(this._user.loggedInUser._doc._id).subscribe(
      (res: any) => {
        if (res.cart === null) {
          this._cart.openCart = {}
        } else {
          this._cart.openCart = res.cart
          this._cartitem.Func_GetCurrectitemsListCart()
        }
      }
    )
  }

  clearCart() {
    for (let i = 0; i < this._cart.myCartItems.length; i++) {
      this._cartitem.delete_item_from_cart(this._cart.myCartItems[i]._id).subscribe(
        (res: any) => {
          this._cartitem.Func_GetCurrectitemsListCart()
        }
      )
    }
    this._snackBar.open("Your cart has been reset", "X", {
      duration: 3000,
    });
  }

  removeSingleItemFromCart(cartItemId) {
    this._cartitem.delete_item_from_cart(cartItemId).subscribe(
      (res: any) => {
        this._snackBar.open(res.msg, "X", {
          duration: 3000,
        });
        this._cartitem.Func_GetCurrectitemsListCart()
      }
    )
  }

  handleCheckout() {
    this.checkoutProcess = true
  }

  checkSearchedProduct(productName: string) {
    if (productName.includes(this.SearchCartValue)) {
      return true;
    }
    if (productName.toLowerCase().includes(this.SearchCartValue)) {
      return true;
    }
    return false;
  }

}
