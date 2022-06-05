export class OrderNrGenerator
{
    static min: number = 1000;
    static max = 999999;

    static Generate(){
        let randomNr = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);

        return randomNr.toString();
    }
}