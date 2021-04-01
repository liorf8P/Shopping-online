import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart';
import { Item } from 'src/app/interfaces/item';
import { CartitemsService } from 'src/app/services/cartitems.service';
import { CartsService } from 'src/app/services/carts.service';
import { ItemsService } from 'src/app/services/items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  public numberOfItems: number
  public numberofOrders: number

  constructor(
    public _item: ItemsService,
    public _cart: CartsService,
    public _cartitem: CartitemsService,
    public _user: UsersService,
    public _order: OrdersService
  ) { }

  ngOnInit(): void {
    this._item.get_all_items().subscribe(
      (res: any) => {
        this.numberOfItems = res.products.length
      }
    )
    this._order.get_all_orders().subscribe(
      (res: any) => {
        this.numberofOrders = res.orders.length
      }
    )
    if (this._user.loggedInUser._doc) {
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
  }


}
