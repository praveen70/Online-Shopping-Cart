import { Product } from "../../../../../shared/models/product";
import { ProductService } from "../../../../../shared/services/product.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
declare var $: any;
@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"],
})
export class ResultComponent implements OnInit {
  products: Product[];
  date: number;
  totalPrice = 0;
  tax = 0;
  deliveryCharge = 0;
  discount = 10;
  
  mixer = 4;
  microwave = 12;
  keyboard = 0;
  sdCard = 6;
  recliner = 20;
  diningTable = 15;
  normalDayDiscount = 0;
  independentDiscountMixer= 3;
  independentDiscountMicrowave = 2;
  independentDiscountKeyboard = 5;
  independentDiscountSdcard = 5;
  independentDiscountRecliner = 25;
  independentDiscountDiningtable = 10;
  independentDiscount = 0;
  totalDiscount = 10;
  totalDiscountAmount = 0;
  subtotal=0;
  billDiscountAbove25k =0;
  constructor(private productService: ProductService) {
    /* Hiding Billing Tab Element */
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "none";
    document.getElementById("resultTab").style.display = "block";

    this.products = productService.getLocalCartProducts();

    this.products.forEach((product) => {
     
      if(product.productCategory === "Home Appliances"){
        this.deliveryCharge += 150;
      }
      if(product.productCategory === " Computers"){
        this.deliveryCharge += 0;
      }
      if(product.productCategory === " Mobile"){
        this.deliveryCharge += 50;
      }
      if(product.productCategory === "  Furniture"){
        this.deliveryCharge += 500;
      }
      ///product Normal and independent Day Discount

      if(product.productName === "Mixer Grinder"){
        this.normalDayDiscount +=  (product.productPrice*this.mixer/100 );
                this.independentDiscount += (product.productPrice*this.independentDiscountMixer/100 );
      }

     if(product.productName === "Microwave"){
      this.normalDayDiscount =  (product.productPrice*this.microwave/100) 
      this.independentDiscount = (product.productPrice *this.independentDiscountMixer/100)
      
        
      }

      if(product.productName === "Keyboard"){
        this.normalDayDiscount =  (product.productPrice *this.keyboard /100) 
        this.independentDiscount = (product.productPrice *this.independentDiscountKeyboard /100)
        
      }

      if(product.productName === "SD Card"){
        this.normalDayDiscount =  (product.productPrice*this.sdCard/100 ) 
        this.independentDiscount = (product.productPrice *this.independentDiscountSdcard /100)
        
        
        
      }

      if(product.productName === "Recliner"){
        this.normalDayDiscount = (product.productPrice*this.recliner/100 ) ;
        this.independentDiscount = (product.productPrice*this.independentDiscountRecliner /100)
        
        
        
        
      }

      if(product.productName === "Dining table"){
        this.normalDayDiscount +=  (product.productPrice *this.diningTable/100 ) 
        this.independentDiscount += (product.productPrice *this.independentDiscountDiningtable/100 )
        
      }

      this.subtotal += product.productPrice;
      this.totalPrice += product.productPrice;
      
        
      
       if(this.totalPrice > 25000){
       
        this.billDiscountAbove25k = (this.totalPrice*this.totalDiscount/100) ;
      }
     
      
       this.totalDiscountAmount = this.normalDayDiscount +  this.independentDiscount + this.billDiscountAbove25k ;

       this.totalPrice = (this.totalPrice  + this.deliveryCharge) - (this.totalDiscountAmount);
     
    });

    this.date = Date.now();
  }

  ngOnInit() {}

  downloadReceipt() {
    const data = document.getElementById("receipt");
    // console.log(data);

    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      const imgWidth = 100;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      const pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("praveen-programming.pdf"); // Generated PDF
    });
  }
}
