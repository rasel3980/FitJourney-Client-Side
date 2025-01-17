// import { Carousel } from "react-responsive-carousel";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// const Carousel = require('react-responsive-carousel').Carousel;
import slider from '../assets/slider.jpg'
import slider2 from '../assets/slider2.jpg'
import slider3 from '../assets/slider3.jpg'
import slider4 from '../assets/slider4.jpg'
import slider5 from '../assets/slider5.jpg'
const Banner = () => {
  return (
    <Carousel>
      <div>
        <img  src={slider} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={slider2} />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src={slider3} />
        <p className="legend">Legend 3</p>
      </div>
      <div>
        <img src={slider4} />
        <p className="legend">Legend 4</p>
      </div>
      <div>
        <img src={slider5} />
        <p className="legend">Legend 5</p>
      </div>
    </Carousel>
  );
};

export default Banner;
