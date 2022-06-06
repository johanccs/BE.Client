import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private value: number;
    listeners: any[];

    constructor()
    {
        this.listeners = [];
        this.value = 0;
    }

    onDataChange(fn){
        this.listeners.push(fn);
    }

    set setData(value: number){
        this.value = value;
        this.listeners.forEach((fn) =>{
            fn(value);
        })
    }
}
