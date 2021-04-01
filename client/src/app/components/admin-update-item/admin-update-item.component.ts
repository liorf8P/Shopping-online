import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { ItemsService } from 'src/app/services/items.service';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin-update-item',
  templateUrl: './admin-update-item.component.html',
  styleUrls: ['./admin-update-item.component.css']
})
export class AdminUpdateItemComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public _category: CategoriesService,
    public _item: ItemsService,
    public _user: UsersService
  ) { }

  ngOnInit(): void {
    this._item.editForm = this._fb.group({
      productName: ["", Validators.required],
      productCategory: ["", Validators.required],
      productPrice: ["", Validators.required],
      productImage: ["", Validators.required]
    })
  }

  editProduct() {
    const body = {
      id: this._item.currectEditItemID,
      name: this._item.editForm.controls.productName.value,
      category: this._item.editForm.controls.productCategory.value,
      price: this._item.editForm.controls.productPrice.value,
      image: this._item.editForm.controls.productImage.value
    }

    this._item.edit_item(body).subscribe(
      (res: any) => {
        this._snackBar.open(res.msg, "X", {
          duration: 3000,
        });
        this._item.get_items_by_category(this._category.currentCategory).subscribe(
          (res: any) => {
            this._item.currectItemsDisplay = res.products
            this._user.editItemAdminProcess = false
          }
        )
      }
    )
  }

}
