import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import {
  bebeslideone,
  bebeslidetwo,
  bebeslidethree,
} from "../assets/images/index";
import "slick-carousel/slick/slick.css";
import Container from "./Container";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const bannerData = [
  {
    title: "Poussettes Premium",
    subtitle: "Confort et sécurité pour votre bébé",
    description:
      "Découvrez nos poussettes modernes et légères pour accompagner votre bébé partout.",
    tag: "Nouveautés 2025",
    image: bebeslideone,
    buttonText: "Voir les poussettes",
  },
  {
    title: "Vêtements Bébé",
    subtitle: "Style, douceur et qualité",
    description:
      "Des tenues adorables, respirantes et confortables pour votre petit ange.",
    tag: "Nouvelles Arrivages",
    image: bebeslidetwo,
    buttonText: "Voir les vêtements",
  },
  {
    title: "Kouna & Accessoires",
    subtitle: "Confort et chaleur",
    description:
      "Kounas douces, couvertures et accessoires indispensables pour votre bébé.",
    tag: "Collection Bébé",
    image: bebeslidethree,
    buttonText: "Voir la collection",
  },
];

const Banner = () => {
  const navigate = useNavigate();
  const [dotActive, setDocActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    cssEase: "linear",
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ul className="flex items-center gap-3">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`cursor-pointer transition-all duration-300 ${
          i === dotActive
            ? "w-8 h-2 bg-pink-400 rounded-full"
            : "w-2 h-2 bg-pink-200 rounded-full hover:bg-pink-300"
        }`}
      />
    ),
  };

  return (
    <div
      className="w-full h-[70vh] min-h-[500px] max-h-[700px] relative overflow-hidden group bg-pink-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Slider ref={sliderRef} {...settings}>
        {bannerData?.map((item, index) => (
          <div key={index} className="relative h-[70vh] min-h-[500px]">
            <div className="relative z-10 h-full bg-gradient-to-br from-pink-50 to-blue-50">

              <Container className="h-full relative z-10 py-8 md:py-0">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 h-full lg:items-center">

                  {/* LEFT TEXT */}
                  <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4 text-gray-800 text-center lg:text-left order-2 lg:order-1"
                  >
                    {/* Tag */}
                    <span className="inline-flex px-5 py-2 bg-pink-300 text-white text-xs font-bold rounded-full shadow">
                      {item.tag}
                    </span>

                    {/* Title */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-pink-600"
                    >
                      {item.title}
                    </motion.h1>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl text-gray-600 font-medium">
                      {item.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-xl mx-auto lg:mx-0">
                      {item.description}
                    </p>

                    {/* CTA Button */}
                    <button
                      onClick={() => navigate("/shop")}
                      className="mt-4 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold rounded-full shadow-lg transition-all duration-300"
                    >
                      {item.buttonText}
                    </button>
                  </motion.div>

                  {/* RIGHT IMAGE */}
                  <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center order-1 lg:order-2"
                  >
                    <img
                      src={item.image}
                      alt={`Banner ${index + 1}`}
                      className="w-full max-w-sm sm:max-w-md lg:max-w-lg drop-shadow-2xl"
                    />
                  </motion.div>

                </div>
              </Container>
            </div>
          </div>
        ))}
      </Slider>

      {/* ARROWS */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className={`absolute left-4 top-1/2 -translate-y-1/2 bg-pink-400 text-white p-3 rounded-full shadow-lg transition ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <HiChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => sliderRef.current?.slickNext()}
        className={`absolute right-4 top-1/2 -translate-y-1/2 bg-pink-400 text-white p-3 rounded-full shadow-lg transition ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <HiChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Banner;
