import { Component, OnInit } from '@angular/core';
import { Product } from '../../data-type';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/products.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent implements OnInit {
  searchResult: undefined | Product[];

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query &&
      this.productService.searchProduct(query).subscribe((result) => {
        this.searchResult = result;
      });
  }
}
