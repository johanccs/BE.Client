export class ListCartItem {
    constructor(
        public id: number, public productId: number, 
        public img: string, public name: string, 
        public qty: number, public price: number){}
}