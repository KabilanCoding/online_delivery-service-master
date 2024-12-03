import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import image1 from "../assets/slider1.webp";
import image2 from "../assets/slider2.webp";
import image3 from "../assets/slider3.webp";
import image4 from "../assets/slider4.webp";

const images = [image1, image2, image3, image4];

function DemoCarousel() {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={2800}
      showThumbs={false}
      showStatus={false}
      stopOnHover={false}
      className="hover-pointer"
    >
      {images.map((image, i) => (
        <div key={i}>
          <img src={image} alt="Slider" />
        </div>
      ))}
    </Carousel>
  );
}

export default DemoCarousel;
