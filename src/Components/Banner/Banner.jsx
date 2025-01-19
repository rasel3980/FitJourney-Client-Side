import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import slider from '../../assets/slider.jpg'
import slider2 from '../../assets/slider2.jpg'
import slider3 from '../../assets/slider3.jpg'
import slider4 from '../../assets/slider4.jpg'
import slider5 from '../../assets/slider5.jpg'
import Slider from './Slider'
const Banner = () => {
  return (
    <div className='container px-6 py-10 mx-auto'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slider
            image={slider}
            text='Charming farmhouse surrounded by greenery, perfect for family retreats'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slider
            image={slider2}
            text='A cozy cottage with lake views, perfect for a peaceful retreat.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slider
            image={slider3}
            text='A serene bungalow with ocean views, perfect for relaxation.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slider
            image={slider4}
            text='A serene bungalow with ocean views, perfect for relaxation.'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slider
            image={slider5}
            text='A serene bungalow with ocean views, perfect for relaxation.'
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
