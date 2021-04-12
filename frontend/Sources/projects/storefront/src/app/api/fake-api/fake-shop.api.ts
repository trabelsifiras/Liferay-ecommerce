import { Injectable } from '@angular/core';
import { Observable, of, Subject, timer } from 'rxjs';
import { BaseCategory, Category, ShopCategory } from '../../interfaces/category';
import { Product } from '../../interfaces/product';
import { Brand } from '../../interfaces/brand';
import { CategoriesList, ProductsList, ReviewsList } from '../../interfaces/list';
import { Review } from '../../interfaces/review';
import { Order } from '../../interfaces/order';
import {
    AddProductReviewData,
    CheckoutData,
    GetBrandsOptions,
    GetCategoriesOptions,
    GetCategoryBySlugOptions,
    GetProductReviewsOptions,
    GetProductsListOptions,
    GetSearchSuggestionsOptions,
    GetSearchSuggestionsResult,
    ShopApi,
} from '../base';
import {
    addProductReview,
    checkout,
    getCategories,
    getCategoryBySlug,
    getFeaturedProducts,
    getLatestProducts,
    getPopularProducts,
    getProductAnalogs,
    getProductBySlug,
    getProductReviews,
    // getProductsList,
    getRelatedProducts,
    getSearchSuggestions,
    getSpecialOffers,
    getTopRatedProducts,
} from '../../../fake-server/endpoints';
import { getBrands } from '../../../fake-server/endpoints/brands';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { AbstractFilterBuilder } from 'projects/storefront/src/fake-server/filters/abstract-filter-builder';
import { CategoryFilterBuilder } from 'projects/storefront/src/fake-server/filters/category-filter-builder';
import { VehicleFilterBuilder } from 'projects/storefront/src/fake-server/filters/vehicle-filter-builder';
import { RangeFilterBuilder } from 'projects/storefront/src/fake-server/filters/range-filter-builder';
import { CheckFilterBuilder } from 'projects/storefront/src/fake-server/filters/check-filter-builder';
import { RadioFilterBuilder } from 'projects/storefront/src/fake-server/filters/radio-filter-builder';
import { RatingFilterBuilder } from 'projects/storefront/src/fake-server/filters/rating-filter-builder';
import { ColorFilterBuilder } from 'projects/storefront/src/fake-server/filters/color-filter-builder';
import { delayResponse } from 'projects/storefront/src/fake-server/utils';


////////////////////////////////////////////////////////////

const urlGetUser = 'http://localhost:8090/api/jsonws/user/get-user-by-id/user-id';
const urlGetProduct = 'http://localhost:8090/o/headless-commerce-admin-catalog/v1.0/products';
const urlGetPageProduct = 'http://localhost:8090/o/headless-commerce-admin-catalog/v1.0/products';

const urlGetCategories = 'http://localhost:8090/o/books/test/categories';


const httpOptions = {
    headers: new HttpHeaders({
        // 'Access-Control-Allow-Origin':'*',
        'Content-Type': 'applsication/json',
        'Authorization': 'Basic ' + btoa('test@liferay.com:test')
    })
};

///////////////////////////////////////////////////////////////

@Injectable()
export class FakeShopApi extends ShopApi {

    //////////////////////////////////////////////////////////

    constructor(private http: HttpClient) {
        super()
    }





    // getListProducts(options?: GetProductsListOptions): Observable<ProductsList> {
    //     // let listProducts: Observable<ProductsList> = this.getProductsList2();
    //     const filterValues = options.filters || {};
    //     const filters: AbstractFilterBuilder[] = [
    //         new CategoryFilterBuilder('category', 'Categories'),
    //         new VehicleFilterBuilder('vehicle', 'Vehicle'),
    //         new RangeFilterBuilder('price', 'Price'),
    //         new CheckFilterBuilder('brand', 'Brand'),
    //         new RadioFilterBuilder('discount', 'With Discount'),
    //         new RatingFilterBuilder('rating', 'Rating'),
    //         new ColorFilterBuilder('color', 'Color'),
    //     ];

    //     this.http.get<any>(`${urlGetPageProduct}`, httpOptions).subscribe(
    //         data => {
    //             let wrongProducts: any[] = data.items;

    //             const page = data.page || 1;
    //             const limit = data.pageSize || 16;
    //             const sort = options.sort || 'default';
    //             const total = data.totalCount;
    //             const pages = data.lastPage;
    //             const from = (page - 1) * limit + 1;
    //             const to = Math.min(page * limit, total);

    //             let products: Product[] = [];

    //             wrongProducts.forEach(item => {
    //                 products.push(
    //                     {
    //                         id: item.productId,
    //                         name: item.name.en_US,
    //                         images: [
    //                             'https://techcrunch.com/wp-content/uploads/2018/12/google-search-magnifying-glass.png?w=730&crop=1',
    //                             'https://feedmotorsports.com/photos/product/4/176/4.jpg'
    //                         ],

    //                         badges: ['sale', 'new', 'hot'],
    //                         rating: 4,
    //                         reviews: 3,
    //                         availability: 'in-stock',
    //                         compatibility: [1, 2],
    //                         attributes: [],
    //                         slug: 'some-slug',
    //                         sku: '145-00007-B',
    //                         price: 12345,

    //                         options: [
    //                             {
    //                                 type: 'default',
    //                                 slug: 'material',
    //                                 name: 'Material',
    //                                 values: [
    //                                     { slug: 'steel', name: 'Steel' },
    //                                     { slug: 'aluminium', name: 'Aluminium' },
    //                                     { slug: 'thorium', name: 'Thorium' },
    //                                 ],
    //                             },
    //                             {
    //                                 type: 'color',
    //                                 slug: 'color',
    //                                 name: 'Color',
    //                                 values: [
    //                                     { slug: 'white', name: 'White', color: '#fff' },
    //                                     { slug: 'yellow', name: 'Yellow', color: '#ffd333' },
    //                                     { slug: 'red', name: 'Red', color: '#ff4040' },
    //                                     { slug: 'blue', name: 'Blue', color: '#4080ff' },
    //                                 ],
    //                             },
    //                         ],
    //                         tags: ['Brake Kit', 'Brandix', 'Filter', 'Bumper', 'Transmission', 'Hood'],



    //                         excerpt: `
    //                     Ecommerce managers and online store owners all know the importance of product descriptions. but they are still often overlooked and not optimized to their full potential.
    //             `,
    //                         description: 'some description',

    //                         partNumber: 'BDX-750Z370-S',
    //                         stock: "out-of-stock",

    //                         compareAtPrice: 1234,


    //                         brand: null,

    //                         type: {
    //                             slug: 'default',
    //                             name: 'Default',
    //                             attributeGroups: [
    //                                 {
    //                                     name: 'General',
    //                                     slug: 'general',
    //                                     attributes: [
    //                                         'speed',
    //                                         'power-source',
    //                                         'battery-cell-type',
    //                                         'voltage',
    //                                         'battery-capacity',
    //                                         'material',
    //                                         'engine-type',
    //                                     ],
    //                                 },
    //                                 {
    //                                     name: 'Dimensions',
    //                                     slug: 'dimensions',
    //                                     attributes: [
    //                                         'length',
    //                                         'width',
    //                                         'height',
    //                                     ],
    //                                 },
    //                             ],
    //                         },
    //                         categories: [],

    //                         customFields: {
    //                             active: item.active,
    //                         },
    //                     }
    //                 )
    //             })


    //             filters.forEach(filter => filter.makeItems(products, filterValues[filter.slug]));

    //             // Calculate items count for filter values.
    //             filters.forEach(filter => filter.calc(filters));

    //             // Apply filters to products list.
    //             products = products.filter(product => filters.reduce((mr, filter) => mr && filter.test(product), true));

    //             // const page = options.page || 1;
    //             // const limit = options.limit || 16;
    //             // const sort = options.sort || 'default';
    //             // const total = products.length;
    //             // const pages = Math.ceil(products.length / limit);
    //             // const from = (page - 1) * limit + 1;
    //             // const to = Math.min(page * limit, total);

    //             // Sort items array.
    //             products = products.sort((a, b) => {
    //                 if (['name_asc', 'name_desc'].includes(sort)) {
    //                     if (a.name === b.name) {
    //                         return 0;
    //                     }

    //                     return (a.name > b.name ? 1 : -1) * (sort === 'name_asc' ? 1 : -1);
    //                 }

    //                 return 0;
    //             });

    //             const items = products.slice(from - 1, to) as unknown as Array<Product>;

    //             return delayResponse(of({
    //                 items,
    //                 page,
    //                 limit,
    //                 sort,
    //                 total,
    //                 pages,
    //                 from,
    //                 to,
    //                 filters: filters.map(x => x.build()),
    //             }), 350);
    //         }
    //     )
    //     return delayResponse(of({
    //         items: [],
    //         page: 0,
    //         limit: 0,
    //         sort: 'default',
    //         total: 0,
    //         pages: 0,
    //         from: 0,
    //         to: 0,
    //         filters: [],
    //     }), 350);
    // }

    ////////////////////////////////////////////////////////////////////

    // getPageProducts(page?: number): Observable<any> {
    //     return this.http.get<any>(`${urlGetPageProduct}?page=${page}`, httpOptions);
    // }
    // getAllProducts(page?: number): any {
    //     // var items = []
    //     this.getPageProducts(page).subscribe(
    //         data => {
    //             let pageProduct = data;
    //             let products: any[] = data.items;
    //             let currentPage = data.page;
    //             let lastPage = data.lastPage;
    //             let pageSize = data.pageSize;
    //             let totalCount = data.totalCount;

    //             for (let i = pageProduct.page; i < pageProduct.lastPage; i++) {
    //                 console.log("before next call:  i=", i, " , page=", i + 1);
    //                 this.getPageProducts(i + 1).subscribe(
    //                     data2 => {
    //                         var tmp = products.concat(data2.items);
    //                         products = tmp;
    //                         console.log("total products number is: ", products.length)
    //                     },
    //                     error => {
    //                         console.log(error);
    //                     }
    //                 );
    //             }
    //             return { products, currentPage, lastPage, pageSize, totalCount }
    //         },
    //         error => {
    //             console.log(error);
    //             return {}
    //         }
    //     );

    // }

    // getListProducts(options?: GetProductsListOptions): Observable<ProductsList> {


    //     this.getPageProducts().subscribe(
    //         data => {
    //             let pageProduct = data;
    //             let products: any[] = data.items;
    //             let currentPage = data.page;
    //             let lastPage = data.lastPage;
    //             let pageSize = data.pageSize;
    //             let totalCount = data.totalCount;

    //             for (let i = pageProduct.page; i < pageProduct.lastPage; i++) {
    //                 console.log("before next call:  i=", i, " , page=", i + 1);
    //                 this.getPageProducts(i + 1).subscribe(
    //                     data2 => {
    //                         var tmp = products.concat(data2.items);
    //                         products = tmp;
    //                         console.log("total products number is: ", products.length)
    //                     },
    //                     error => {
    //                         console.log(error);
    //                     }
    //                 );
    //             }
    //             const filters = [];
    //             const sort = 'default';
    //             const items = products;
    //             const page = currentPage;
    //             const limit = pageSize;
    //             const pages = lastPage;
    //             const total = totalCount;
    //             const from = (currentPage - 1) * pageSize + 1;
    //             const to = Math.min(currentPage * pageSize, totalCount);

    //             console.log(of({
    //                 items,
    //                 page,
    //                 limit,
    //                 sort,
    //                 total,
    //                 pages,
    //                 from,
    //                 to,
    //                 filters: filters.map(x => x.build()),
    //             }))

    //             return this.delayResponse(of({
    //                 items,
    //                 page,
    //                 limit,
    //                 sort,
    //                 total,
    //                 pages,
    //                 from,
    //                 to,
    //                 filters: filters.map(x => x.build()),
    //             }), 350);

    //         },
    //         error => {
    //             console.log(error);
    //             return this.delayResponse(of({
    //                 items: [],
    //                 page: 0,
    //                 limit: 0,
    //                 sort: 'default',
    //                 total: 0,
    //                 pages: 0,
    //                 from: 0,
    //                 to: 0,
    //                 filters: [],
    //             }), 350);
    //         }
    //     );

    //     return this.delayResponse(of({
    //         items: [],
    //         page: 0,
    //         limit: 0,
    //         sort: 'default',
    //         total: 0,
    //         pages: 0,
    //         from: 0,
    //         to: 0,
    //         filters: [],
    //     }), 350);
    // }

    // clone(data: any): any {
    //     return JSON.parse(JSON.stringify(data));
    // }

    // delayResponse<T>(input: Observable<T>, time = 500): Observable<T> {
    //     return timer(time).pipe(mergeMap(() => input));
    // }





    // getCategories2(options?: GetCategoriesOptions): Observable<ShopCategory[]> {
    //     let categories: ShopCategory[] = [];
    //     var subject = new Subject<ShopCategory[]>();

    //     //     this.http.get<any>(`${urlGetCategories}`, httpOptions).subscribe(

    //     //         assetCategories => {
    //     //             assetCategories.map(assetCateg => {
    //     //                 categories.push(
    //     //                     {
    //     //                         id: assetCateg.categoryId,
    //     //                         type: 'shop',



    //     //                         customFields: {},

    //     //                         layout: 'products',
    //     //                         name: assetCateg.name,
    //     //                         slug: 'headlights-lighting',
    //     //                         image: 'assets/images/categories/category-1.jpg',
    //     //                         items: 131,
    //     //                         children: [

    //     //                         ],
    //     //                     }
    //     //                 );
    //     //                 subject.next(categories);
    //     //             }
    //     //             );
    //     //             // subject.next(categories)
    //     //             // console.log(categories)
    //     //         }
    //     //     );
    //     //     console.log(subject.asObservable())
    //     //     return subject.asObservable();
    //     // }

    //     // let categories = shopCategoriesTree.slice(0);
    //     // const depth = options.depth || 0;

    //     // if (options.parent) {
    //     //     const parent = shopCategoriesList.find(x => x.slug === options.parent.slug);

    //     //     if (parent) {
    //     //         categories = parent.children;
    //     //     }
    //     // } else if (options.slugs) {
    //     //     categories = shopCategoriesList.filter(x => options.slugs.includes(x.slug));
    //     // }

    //     // categories = categories.map(x => prepareCategory(x, depth));

    //     // return of(clone(categories));


    //     return this.http.get<any>(`${urlGetCategories}`, httpOptions).pipe(

    //         map(liferayAssetListCategories => (new Array<ShopCategory>(liferayAssetListCategories.length).fill(
    //             {
    //                 id: liferayAssetListCategories[0].categoryId,
    //                 type: 'shop',



    //                 customFields: {},

    //                 layout: 'products',
    //                 name: liferayAssetListCategories[0].name,
    //                 slug: 'headlights-lighting',
    //                 image: 'assets/images/categories/category-1.jpg',
    //                 items: 131,
    //                 children: [
    //                     {
    //                         id: liferayAssetListCategories[1].categoryId,
    //                         type: 'shop',



    //                         customFields: {},

    //                         layout: 'products',
    //                         name: liferayAssetListCategories[1].name,
    //                         slug: 'headlights-lighting',
    //                         image: 'assets/images/categories/category-1.jpg',
    //                         items: 131,
    //                         children: [

    //                         ],
    //                     },
    //                     {
    //                         id: liferayAssetListCategories[2].categoryId,
    //                         type: 'shop',



    //                         customFields: {},

    //                         layout: 'products',
    //                         name: liferayAssetListCategories[2].name,
    //                         slug: 'headlights-lighting',
    //                         image: 'assets/images/categories/category-1.jpg',
    //                         items: 131,
    //                         children: [

    //                         ],
    //                     },
    //                     {
    //                         id: liferayAssetListCategories[3].categoryId,
    //                         type: 'shop',



    //                         customFields: {},

    //                         layout: 'products',
    //                         name: liferayAssetListCategories[3].name,
    //                         slug: 'headlights-lighting',
    //                         image: 'assets/images/categories/category-1.jpg',
    //                         items: 131,
    //                         children: [

    //                         ],
    //                     },
    //                     {
    //                         id: liferayAssetListCategories[4].categoryId,
    //                         type: 'shop',



    //                         customFields: {},

    //                         layout: 'products',
    //                         name: liferayAssetListCategories[4].name,
    //                         slug: 'headlights-lighting',
    //                         image: 'assets/images/categories/category-1.jpg',
    //                         items: 131,
    //                         children: [

    //                         ],
    //                     },
    //                     {
    //                         id: liferayAssetListCategories[5].categoryId,
    //                         type: 'shop',



    //                         customFields: {},

    //                         layout: 'products',
    //                         name: liferayAssetListCategories[5].name,
    //                         slug: 'headlights-lighting',
    //                         image: 'assets/images/categories/category-1.jpg',
    //                         items: 131,
    //                         children: [

    //                         ],
    //                     }

    //                 ],
    //             }
    //         )
    //         )
    //         ),
    //     )
    // }


    // doString(ch: string) {
    //     var chArray = ch.split(" ");
    //     return chArray.join("-");
    // }
    // prepareCategory<T extends BaseCategory>(category: T, depth?: number): T {
    //     let children;

    //     if (depth && depth > 0) {
    //         children = category.children.map(x => this.prepareCategory(x, depth - 1));
    //     }

    //     return JSON.parse(JSON.stringify({
    //         ...category,
    //         parent: category.parent ? this.prepareCategory(category.parent) : (category.parent === null ? null : undefined),
    //         children,
    //     }));
    // }



    getProductById(id: number): Observable<Product> {
        return this.http.get<any>(`${urlGetProduct}/${id}`, httpOptions).pipe(
            map(product => ({
                id: product.productId,
                name: product.name.en_US,
                images: [
                    'https://techcrunch.com/wp-content/uploads/2018/12/google-search-magnifying-glass.png?w=730&crop=1',
                    'https://feedmotorsports.com/photos/product/4/176/4.jpg'
                ],

                badges: ['sale', 'new', 'hot'],
                rating: 4,
                reviews: 3,
                availability: 'in-stock',
                compatibility: [1, 2],
                attributes: [],
                slug: this.nameToSlug(product.productId,product.name.en_US),
                sku: '145-00007-B',
                price: 12345,

                options: [
                    {
                        type: 'default',
                        slug: 'material',
                        name: 'Material',
                        values: [
                            { slug: 'steel', name: 'Steel' },
                            { slug: 'aluminium', name: 'Aluminium' },
                            { slug: 'thorium', name: 'Thorium' },
                        ],
                    },
                    {
                        type: 'color',
                        slug: 'color',
                        name: 'Color',
                        values: [
                            { slug: 'white', name: 'White', color: '#fff' },
                            { slug: 'yellow', name: 'Yellow', color: '#ffd333' },
                            { slug: 'red', name: 'Red', color: '#ff4040' },
                            { slug: 'blue', name: 'Blue', color: '#4080ff' },
                        ],
                    },
                ],
                tags: ['Brake Kit', 'Brandix', 'Filter', 'Bumper', 'Transmission', 'Hood'],



                excerpt: `
                Ecommerce managers and online store owners all know the importance of product descriptions. but they are still often overlooked and not optimized to their full potential.
        `,
                description: 'some description',

                partNumber: 'BDX-750Z370-S',
                stock: "in-stock",

                compareAtPrice: 1234,


                brand: null,

                type: {
                    slug: 'default',
                    name: 'Default',
                    attributeGroups: [
                        {
                            name: 'General',
                            slug: 'general',
                            attributes: [
                                'speed',
                                'power-source',
                                'battery-cell-type',
                                'voltage',
                                'battery-capacity',
                                'material',
                                'engine-type',
                            ],
                        },
                        {
                            name: 'Dimensions',
                            slug: 'dimensions',
                            attributes: [
                                'length',
                                'width',
                                'height',
                            ],
                        },
                    ],
                },
                categories: [],

                customFields: {
                    active: product.active,
                },

            })),
        );
    }



    getProductsList(options?: GetProductsListOptions): Observable<ProductsList> {
        return this.http.get<any>(`${urlGetPageProduct}?page=${options.page}`, httpOptions).pipe(

            map(pageProduct => ({
                filters: [],

                items: this.getPageProductsItems(pageProduct.items, pageProduct.totalCount),

                page: pageProduct.page,


                limit: pageProduct.pageSize,


                sort: 'default',


                total: pageProduct.totalCount,


                pages: pageProduct.lastPage,


                from: (pageProduct.page - 1) * pageProduct.pageSize + 1,


                to: Math.min(pageProduct.page * pageProduct.pageSize, pageProduct.totalCount),

            }))
        );
    }

    getPageProductsItems(items: any[], itemsCount: number): Product[] {


        // let realItems = new Array<Product>(items.length);
        let realItems: Product[] = new Array<Product>();
        items.forEach(item => {
            realItems.push(
                {
                    id: item.productId,
                    name: item.name.en_US,
                    images: [
                        'https://techcrunch.com/wp-content/uploads/2018/12/google-search-magnifying-glass.png?w=730&crop=1',
                        'https://feedmotorsports.com/photos/product/4/176/4.jpg'
                    ],

                    badges: ['sale', 'new', 'hot'],
                    rating: 4,
                    reviews: 3,
                    availability: 'in-stock',
                    compatibility: [1, 2],
                    attributes: [],
                    slug: this.nameToSlug(item.productId,item.name.en_US),
                    sku: '145-00007-B',
                    price: 12345,

                    options: [
                        {
                            type: 'default',
                            slug: 'material',
                            name: 'Material',
                            values: [
                                { slug: 'steel', name: 'Steel' },
                                { slug: 'aluminium', name: 'Aluminium' },
                                { slug: 'thorium', name: 'Thorium' },
                            ],
                        },
                        {
                            type: 'color',
                            slug: 'color',
                            name: 'Color',
                            values: [
                                { slug: 'white', name: 'White', color: '#fff' },
                                { slug: 'yellow', name: 'Yellow', color: '#ffd333' },
                                { slug: 'red', name: 'Red', color: '#ff4040' },
                                { slug: 'blue', name: 'Blue', color: '#4080ff' },
                            ],
                        },
                    ],
                    tags: ['Brake Kit', 'Brandix', 'Filter', 'Bumper', 'Transmission', 'Hood'],



                    excerpt: `
                        Ecommerce managers and online store owners all know the importance of product descriptions. but they are still often overlooked and not optimized to their full potential.
                `,
                    description: 'some description',

                    partNumber: 'BDX-750Z370-S',
                    stock: "out-of-stock",

                    compareAtPrice: 1234,


                    brand: null,

                    type: {
                        slug: 'default',
                        name: 'Default',
                        attributeGroups: [
                            {
                                name: 'General',
                                slug: 'general',
                                attributes: [
                                    'speed',
                                    'power-source',
                                    'battery-cell-type',
                                    'voltage',
                                    'battery-capacity',
                                    'material',
                                    'engine-type',
                                ],
                            },
                            {
                                name: 'Dimensions',
                                slug: 'dimensions',
                                attributes: [
                                    'length',
                                    'width',
                                    'height',
                                ],
                            },
                        ],
                    },
                    categories: [],

                    customFields: {
                        active: item.active,
                    },
                }
            )
        })
        // console.log(realItems)
        // realItems.fill(someProduct);
        // console.log(realItems)
        // for (let i = 0; i < items.length; i++) {
        //     console.log(items[i].productId)
        //     realItems[i].id = items[i].productId;
        //     // realItems[i].name = items[i].name.en_US;
        //     // realItems[i].customFields.active = items[i].active;
        // }
        // console.log(realItems)


        // let items2: Product[] = realItems.concat(realItems);
        // realItems = items2;

        console.log(realItems)
        // realItems.slice(0, 20) as unknown as Array<Product>;
        // console.log(realItems)

        return realItems;
    }

    getCategories3(options?: GetCategoriesOptions): Observable<CategoriesList> {

        return this.http.get<any>(`${urlGetCategories}`, httpOptions).pipe(

            map(liferayAssetListCategories =>
                ({
                    items: this.getCategoriesItems(liferayAssetListCategories, options),

                })


            )
        );

    }
    getCategoriesItems(liferayAssetListCategories: any[], options?: GetCategoriesOptions): ShopCategory[] {
        let realItems: ShopCategory[] = new Array<ShopCategory>();
        let categoriesIDs: number[] = new Array<number>();

        liferayAssetListCategories.forEach(item => {
            categoriesIDs.push(item.categoryId);
            realItems.push(
                {
                    id: item.categoryId,
                    type: 'shop',
                    customFields: {},
                    layout: 'products',
                    name: item.name,
                    slug: this.nameToSlug(item.categoryId,item.name),
                    image: 'assets/images/categories/category-1.jpg',
                    items: 131,
                    children: [],
                    parent: null,
                }

            )
        })
        for (var i = 0; i < liferayAssetListCategories.length; i++) {
            if (liferayAssetListCategories[i].parentCategoryId) {

                let parent = realItems.find(x => x.id === liferayAssetListCategories[i].parentCategoryId)
                if (parent) {
                    realItems[i].parent = parent;
                    realItems[realItems.indexOf(parent)].children.push(realItems[i]);
                }
            }
        }
        console.log("categories : ", realItems)

        let rootCategories: ShopCategory[] = [];
        realItems.forEach(item => {
            if (!item.parent) {
                rootCategories.push(item)
            }
        })
        //////////////////////////////////////
        console.log("root categories: ", rootCategories)

        // realItems = this.flatTree(realItems);
        // console.log("categories after flatTree: ",realItems)

        const depth = options.depth || 0;
        console.log("depth is : ", depth)

        if (options.parent) {
            const parent = rootCategories.find(x => x.slug === options.parent.slug);

            if (parent) {
                rootCategories = parent.children;
                console.log("root categories after option.parent: ", rootCategories)
            }
        } else if (options.slugs) {
            rootCategories = rootCategories.filter(x => options.slugs.includes(x.slug));
            console.log("root categories after option.slugs: ", rootCategories)
        }

        rootCategories = rootCategories.map(x => this.prepareCategory(x, depth));
        console.log("root categories after map: ", rootCategories)


        return rootCategories;
    }


    getCategoryById(id: number, options?: GetCategoryBySlugOptions): Observable<ShopCategory> {
        return this.http.get<any>(`${urlGetCategories}/${id}`, httpOptions).pipe(
            map(category =>
                ({
                    id: category.categoryId,
                    type: 'shop',
                    customFields: {},
                    layout: 'products',
                    name: category.name,
                    slug: this.nameToSlug(category.categoryId, category.name),
                    image: 'assets/images/categories/category-1.jpg',
                    items: 131,
                    children: [],
                })
            )
        )

    }


    flatTree<T extends Category>(categories: T[]): T[] {
        let result = [];

        categories.forEach(category => result = [...result, category, ...this.flatTree(category.children as Category[])]);

        return result;
    }

    nameToSlug(id: number, name: string): string {
        return id.toString() + "-" + name.toLowerCase().replace(/[^a-z0-9]/, '-').replace(/-+/, '-');
    }

    prepareCategory<T extends BaseCategory>(category: T, depth?: number): T {
        let children;

        if (depth && depth > 0) {
            children = category.children.map(x => this.prepareCategory(x, depth - 1));
        }

        return JSON.parse(JSON.stringify({
            ...category,
            parent: category.parent ? this.prepareCategory(category.parent) : (category.parent === null ? null : undefined),
            children,
        }));
    }

    ////////////////////////////////////////////////////////////
    getCategoryBySlug(slug: string, options?: GetCategoryBySlugOptions): Observable<ShopCategory> {
        return getCategoryBySlug(slug, options);
    }

    getCategories(options?: GetCategoriesOptions): Observable<ShopCategory[]> {
        return getCategories(options);
    }

    getBrands(options?: GetBrandsOptions): Observable<Brand[]> {
        return getBrands(options);
    }

    // getProductsList(options?: GetProductsListOptions): Observable<ProductsList> {
    //     return getProductsList(options);
    // }

    getProductBySlug(slug: string): Observable<Product> {
        return getProductBySlug(slug);
    }

    getProductReviews(productId: number, options?: GetProductReviewsOptions): Observable<ReviewsList> {
        return getProductReviews(productId, options);
    }

    addProductReview(productId: number, data: AddProductReviewData): Observable<Review> {
        return addProductReview(productId, data);
    }

    getProductAnalogs(productId: number): Observable<Product[]> {
        return getProductAnalogs(productId);
    }

    getRelatedProducts(productId: number, limit: number): Observable<Product[]> {
        return getRelatedProducts(productId, limit);
    }

    getFeaturedProducts(categorySlug: string, limit: number): Observable<Product[]> {
        return getFeaturedProducts(categorySlug, limit);
    }

    getPopularProducts(categorySlug: string, limit: number): Observable<Product[]> {
        return getPopularProducts(categorySlug, limit);
    }

    getTopRatedProducts(categorySlug: string, limit: number): Observable<Product[]> {
        return getTopRatedProducts(categorySlug, limit);
    }

    getSpecialOffers(limit: number): Observable<Product[]> {
        return getSpecialOffers(limit);
    }

    getLatestProducts(limit: number): Observable<Product[]> {
        return getLatestProducts(limit);
    }

    getSearchSuggestions(query: string, options?: GetSearchSuggestionsOptions): Observable<GetSearchSuggestionsResult> {
        return getSearchSuggestions(query, options);
    }

    checkout(data: CheckoutData): Observable<Order> {
        return checkout(data);
    }
}
