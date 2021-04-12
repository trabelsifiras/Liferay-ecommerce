import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ProductsList } from '../../../interfaces/list';
import { BehaviorSubject, Observable } from 'rxjs';
import { parseProductsListParams } from '../../../functions/utils';
import { ShopApi } from '../../../api/base';
import { HttpClient } from '@angular/common/http';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Injectable()
export class ProductsListResolver implements Resolve<ProductsList> {
    constructor(
        private shop: ShopApi,
        private http: HttpClient,
   
    ) { }


    // private messageSource = new BehaviorSubject('default');
    // currentMessage = this.messageSource.asObservable();

    // ngOnInit() {
    //     this.paginationComponent.pageChange.subscribe(value => {
    //         this.resolve(this.route, this.state);
    //     })
    // }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductsList> {
        const categorySlug = route.params.categorySlug || route.data.categorySlug;
        console.log("categorySlug is:   ", categorySlug)
        const options = parseProductsListParams(route.queryParams);
        console.log("options are: ", options)

        // return this.shop.getProductsList({
        //     ...options,
        //     filters: {
        //         ...options.filters,
        //         category: categorySlug,
        //     },
        // });

        return this.shop.getProductsList({
            ...options,
            filters: {
                ...options.filters,
                category: categorySlug,
            },
        });
    }
}
