import { Injectable } from '@angular/core';
import { NewCartItem } from '../models/new-cartItem';

@Injectable({
    providedIn: 'root'
})
export class InternalCartService {
    private value: any[];
    listeners: any[];

    constructor()
    {
        this.listeners = [];
        this.value = [];
    }

    onDataChange(fn){
        this.listeners.push(fn);
    }

    set setData(value: any){
        this.value = value;
        this.listeners.forEach((fn) =>{
            fn(value);
        })
    }
}
