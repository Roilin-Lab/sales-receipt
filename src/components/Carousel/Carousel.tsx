import type { PropsWithChildren } from "react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import classes from "./Carousel.module.css"
import "swiper/swiper.css";

interface CarouselProps extends PropsWithChildren {
  className?: string;
  duration: number;
}

const Carousel = ({ className, duration, children }: CarouselProps) => {
  return (
    <Swiper
      loop
      slidesPerView="auto"
      autoplay={{
        delay: duration,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

interface CarouselItemProps {
  imageUrl: string; 
}

const CarouselItem = ({ imageUrl }: CarouselItemProps) => {
  return (
    <div className={classes.carouselItem}>
      <div
        className={classes.carouselItemBg}
        style={{
          background: `url(${imageUrl}) center / cover`,
        }}
      ></div>
      <div className={classes.carouselItemImgWrapper}>
        <img className={classes.carouselItemImg} src={imageUrl} />
      </div>
    </div>
  );
};

Carousel.Item = CarouselItem;

export default Carousel;
