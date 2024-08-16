"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
    {imgUrl: '/assets/images/hero-image-1.svg', alt: 'studying'},
    {imgUrl: '/assets/images/hero-image-2.svg', alt: 'ideation'},
    {imgUrl: '/assets/images/hero-image-3.svg', alt: 'learning'},
    {imgUrl: '/assets/images/hero-image-4.svg', alt: 'exam'},
    {imgUrl: '/assets/images/hero-image-5.svg', alt: 'education'},
]

const HeroCarousel = () => {
  return ( 
    <div className="hero-carousel"> 
    
        <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={2000}
            showArrows={false}
            showStatus={false}
        >
            {heroImages.map((image) => (
                <Image 
                    src={image.imgUrl}
                    alt={image.alt}
                    width={264}
                    height={264}
                    className="object-contain"
                    key={image.alt}
                />
            ))}
        </Carousel>


    </div>
  )
}

export default HeroCarousel