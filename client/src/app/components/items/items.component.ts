import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { ItemsService } from 'src/app/services/items.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartitemsService } from 'src/app/services/cartitems.service';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { UsersService } from 'src/app/services/users.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent implements OnInit {

  constructor(
    public _items: ItemsService,
    public _cart: CartsService,
    public _r: Router,
    public _cartitem: CartitemsService,
    public _user: UsersService,
    public _category: CategoriesService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this._items.get_items_by_category('603d186d74ac3b4200ed2319').subscribe(
      (res: any) => {
        this._items.currectItemsDisplay = res.products
      }
    )
  }

  openModal(itemID) {
    this._items.get_items_by_id(itemID).subscribe(
      (res: any) => {
        this._cartitem.cart_item_to_add = res.product
        const DialogRef = this.dialog.open(ItemModalComponent);
      }
    )
  }

  goToEdit() {
    this._items.get_items_by_id(this._items.currectEditItemID).subscribe(
      (res: any) => {

        this._category.get_category_name(this._category.currentCategory).subscribe(
          (res: any) => {
            this._items.editForm.controls['productCategory'].setValue(res.categoryName.name);
            this._items.editForm.controls['productCategory'].disable();
          }
        )
        this._items.currectEdititem = res.product
        this._items.editForm.controls['productName'].setValue(this._items.currectEdititem.name);
        this._items.editForm.controls['productPrice'].setValue(this._items.currectEdititem.price);
        this._items.editForm.controls['productImage'].setValue(this._items.currectEdititem.image);
      }
    )
  }
}




