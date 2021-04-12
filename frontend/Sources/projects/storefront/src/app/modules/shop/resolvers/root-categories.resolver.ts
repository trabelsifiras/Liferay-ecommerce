import { Injectable } from '@angular/core';
import { ShopApi } from '../../../api/base';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopCategory } from '../../../interfaces/category';

@Injectable()
export class RootCategoriesResolver implements Resolve<ShopCategory[]> {
    constructor(
        private shop: ShopApi,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.shop.getCategories2({depth: 1});
    }
}
