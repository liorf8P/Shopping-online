import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { ItemsService } from 'src/app/services/items.service';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-add-item',
  templateUrl: './admin-add-item.component.html',
  styleUrls: ['./admin-add-item.component.css']
})
export class AdminAddItemComponent implements OnInit {
  public addForm: FormGroup

  public getAllCategories: Category

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public _category: CategoriesService,
    public _item: ItemsService,
    public _user: UsersService
  ) { }

  ngOnInit(): void {
    this.addForm = this._fb.group({
      productName: ["", Validators.required],
      productCategory: ["", Validators.required],
      productPrice: ["", Validators.required],
      productImage: ["", Validators.required]
    })

    this._category.get_categories().subscribe(
      (res: any) => {
        this.getAllCategories = res.categories
      }
    )
  }

  addProduct() {
    const body = {
      name: this.addForm.controls.productName.value,
      category: this.addForm.controls.productCategory.value,
      price: this.addForm.controls.productPrice.value,
      image: this.addForm.controls.productImage.value
    }

    this._item.add_item(body).subscribe(
      (res: any) => {
        this._snackBar.open(res.msg, "X", {
          duration: 3000,
        });
        this._item.get_items_by_category(this.addForm.controls.productCategory.value).subscribe(
          (res: any) => {
            this._item.currectItemsDisplay = res.products
            this.addForm.reset()
            this._user.addItemAdminProcess = false
          }
        )
      }
    )
  }
}
