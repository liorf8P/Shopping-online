import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from './services/categories.service';
import { ItemsService } from './services/items.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';

  // public myCategories = []
  public SearchInputOpen: boolean = false
  public SearchValue: String = ""

  constructor(
    public _user: UsersService,
    public _r: Router,
    public _category: CategoriesService,
    public _items: ItemsService
  ) { }

  ngOnInit(): void {
    if (localStorage.token) {
      this._user.decode(localStorage.token)
      this._category.get_categories().subscribe(
        (res: any) => {
          this._category.myCategories = res.categories
        }
      )
    }
  }

  handleChangeCategory(e: any) {
    console.log(e.target.id)
    this._items.get_items_by_category(e.target.id).subscribe(
      (res: any) => {
        this._items.currectItemsDisplay = res.products
        this._category.currentCategory = e.target.id
      }
    )
  }

  searchItemsByName() {
    this._items.currectItemsDisplay = []
    this._items.get_all_items().subscribe(
      (res: any) => {
        res.products.forEach(product => {
          if (product.name.toLowerCase().indexOf(this.SearchValue) != -1) {
            this._items.currectItemsDisplay = [...this._items.currectItemsDisplay, product]
          }
        });
        this.SearchValue = ""
      }
    )
  }
}
