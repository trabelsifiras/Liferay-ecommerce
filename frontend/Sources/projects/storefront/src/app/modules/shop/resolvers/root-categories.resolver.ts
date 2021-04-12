import { Injectable } from '@angular/core';
import { ShopApi } from '../../../api/base';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopCategory } from '../../../interfaces/category';
import { map } from 'rxjs/operators';

@Injectable()
export class RootCategoriesResolver implements Resolve<ShopCategory[]> {
    constructor(
        private shop: ShopApi,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<ShopCategory[]>{
        // return this.shop.getCategories({depth: 1});

        return this.shop.getCategories3({depth: 1})
        .pipe(
            map(categoriesList=>
                (
                    new Array<ShopCategory>().concat(categoriesList.items)
                )
                )
        )
    }
}
