import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CartitemsService } from 'src/app/services/cartitems.service';
import { CartsService } from 'src/app/services/carts.service';
import { ItemsService } from 'src/app/services/items.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.css']
})
export class ItemModalComponent implements OnInit {

  public itemCount = 1

  constructor(
    private _snackBar: MatSnackBar,
    public _cartitem: CartitemsService,
    public _items: ItemsService,
    public _cart: CartsService,
    public dialogRef: MatDialogRef<ItemModalComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  addItemToCart(itemID) {
    this._cartitem.add_item_to_cart({
      item: itemID,
      cart: this._cart.openCart._id,
      count: this.itemCount,
      total_item_price: this._cartitem.cart_item_to_add.price * this.itemCount
    }).subscribe(
      (res: any) => {
        this._snackBar.open(res.msg, "X", {
          duration: 3000,
        });
        this._cartitem.get_cart_items_list(this._cart.openCart._id).subscribe(
          (res: any) => {
            this._cart.myCartItems = res.items
            this._cartitem.calTotalCartItems()
          }
        )
      }
    )
  }
}
