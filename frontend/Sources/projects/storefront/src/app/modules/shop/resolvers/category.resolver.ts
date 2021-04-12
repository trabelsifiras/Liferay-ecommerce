import { Injectable } from '@angular/core';
import { ShopCategory } from '../../../interfaces/category';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopApi } from '../../../api';

@Injectable()
export class CategoryResolver implements Resolve<ShopCategory> {
    constructor(
        private shop: ShopApi,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ShopCategory> {
        // return this.shop.getCategoryBySlug(route.params.categorySlug || route.data.categorySlug, {depth: 2});
        const slug = route.params.categorySlug || route.data.categorySlug;
        const idFromSlug = Number(slug.substring(0, slug.indexOf("-") ));
        console.log("idFromSlug: ", idFromSlug)

        return this.shop.getCategoryById(idFromSlug, { depth: 2 });

        // return this.shop.getCategoryById(route.params.categorySlug || route.data.categorySlug, { depth: 2 });


    }
}
