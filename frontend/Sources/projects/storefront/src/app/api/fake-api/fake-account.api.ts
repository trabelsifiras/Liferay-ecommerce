import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AccountApi, EditAddressData, EditProfileData, GetOrdersListOptions } from '../base';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import {map, tap} from 'rxjs/operators';
import { Address } from '../../interfaces/address';
import { OrdersList } from '../../interfaces/list';
import { Order } from '../../interfaces/order';
/*import {
    accountChangePassword,
    accountEditProfile,
    accountSignIn,
    accountSignOut,
    accountSignUp,
    addAddress,
    delAddress,
    editAddress,
    getAddress,
    getAddresses,
    getDefaultAddress,
    getOrderById,
    getOrderByToken,
    getOrdersList,
} from '../../../fake-server/endpoints';*/
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {accountSignOut} from "../../../fake-server/endpoints";

const baseUrl = 'http://localhost:8080/o//authapi/authentification';


@Injectable()
export class FakeAccountApi extends AccountApi {
    private userSubject: BehaviorSubject<User | null>;

    get user(): User | null {
        return this.userSubject.value;
    }

    readonly user$: Observable<User | null>;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private http: HttpClient
    ) {
        super();

        let storedUser = null;

        if (isPlatformBrowser(this.platformId)) {
            storedUser = localStorage.getItem('user');
            storedUser = storedUser ? JSON.parse(storedUser) : null;
        }

        this.userSubject = new BehaviorSubject<User | null>(storedUser);
        this.user$ = this.userSubject.asObservable();
    }

    signIn(email: string, password: string): Observable<User>{
        const body = {
            "login":email,
            "password":password
        }
        return this.http.post<User>(baseUrl + '/login',
            body,
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/json')
                    .set('Authorization', 'Basic dGVzdEB0ZXN0LmNvbTp0ZXN0')
            }
        ).pipe(map(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));


    }
/*
    signIn(email: string, password: string): Observable<any> {
        const body = new HttpParams()
            .set('login', email)
            .set('password', password);

        // @ts-ignore
        return this.http.post<User>(baseUrl + '/login',
            body.toString(),
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/json')
                    .set('Authorization', 'Basic dGVzdEB0ZXN0LmNvbTp0ZXN0')
            }
        ).pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));


    }

   */

    // @ts-ignore
    signUp(email: string, password: string): Observable<User> {
        /*return accountSignUp(email, password).pipe(
            tap(user => this.setUser(user)),
        );*/
    }



        // @ts-ignore
    signOut(): Observable<void> {
            return accountSignOut().pipe(
                tap(() => this.setUser(null)),
            );
        }



        // @ts-ignore
    editProfile(data: EditProfileData): Observable<User> {
            /*return accountEditProfile(data).pipe(
                tap(user => this.setUser(user)),
            );*/
        }

        // @ts-ignore
    changePassword(oldPassword: string, newPassword: string): Observable<void> {
           // return accountChangePassword(oldPassword, newPassword);
        }


    // @ts-ignore
    addAddress(data: EditAddressData): Observable<Address> {
       // return addAddress(data);
    }

    // @ts-ignore
    editAddress(addressId: number, data: EditAddressData): Observable<Address> {
       // return editAddress(addressId, data);
    }
    // @ts-ignore
    delAddress(addressId: number): Observable<void> {
       // return delAddress(addressId);
    }
// @ts-ignore
    getDefaultAddress(): Observable<Address | null> {
       // return getDefaultAddress();
    }
// @ts-ignore
    getAddress(addressId: number): Observable<Address> {
       // return getAddress(addressId);
    }
// @ts-ignore
    getAddresses(): Observable<Address[]> {
       // return getAddresses();
    }
// @ts-ignore
    getOrdersList(options?: GetOrdersListOptions): Observable<OrdersList> {
       // return getOrdersList(options);
    }
// @ts-ignore
    getOrderById(id: number): Observable<Order> {
       // return getOrderById(id);
    }
// @ts-ignore
    getOrderByToken(token: string): Observable<Order> {
       // return getOrderByToken(token);
    }

    private setUser(user: User): void {
        this.userSubject.next(user);

        localStorage.setItem('user', JSON.stringify(user));
    }


    }

