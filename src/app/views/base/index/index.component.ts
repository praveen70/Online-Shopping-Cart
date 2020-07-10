import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  carouselList = [
    {
      bannerImg: "./assets/banner_img/mixer2.jpg",
      title: "Mixer Grinder",
      
    },
    {
      bannerImg: "./assets/banner_img/microwaveBanner.jpeg",
      title: " Microwave",
      
    },
    {
      bannerImg: "./assets/banner_img/keyboardBanner.jpeg",
      title: " Keyboard",
      
    },
  ];

  constructor() {}

  ngOnInit() {}
}
