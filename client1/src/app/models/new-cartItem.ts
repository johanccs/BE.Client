export class NewCartItem {
    constructor(
        public productId: number, public userId: string,
        public orderNr: string,
        public img: string, public name: string, 
        public qty: number, public price: number){}
}