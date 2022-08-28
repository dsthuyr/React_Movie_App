import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Slider.css";

import SwiperCore, { Autoplay } from "swiper";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

SwiperCore.use([Autoplay]);

export default function Slider() {
  let movies = useSelector((state) => state.movies.movies);
  movies = movies.slice(0, 16);
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
        autoplay={{ delay: 2000 }}
      >
        {movies.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <Link to={`/detailMovie/${movie.id}`}>
                <img src={movie.banner} alt={movie.id} />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
