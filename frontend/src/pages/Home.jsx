import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../assets/css/slider.css";
import banners from "../data/banners.json";

export default function Home(){
    // Importar dinámicamente las imágenes desde src/images/banners/
    const getImagePath = (imageName) => {
        try {
            return require(`../images/banners/${imageName}`).default || require(`../images/banners/${imageName}`);
        } catch (e) {
            console.warn(`Imagen no encontrada: ${imageName}`);
            return "";
        }
    };

    return(
        <section id="index" className="index-section">
            <div className="slider-container">
                {banners && banners.length > 0 && (
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 3000 }}
                        speed={3000}
                        pagination={{ clickable: true }}
                        navigation
                    >
                        {banners.map((banner, index) => (
                        <SwiperSlide key={index}>
                            <img src={getImagePath(banner.imagen)} alt={banner.titulo || `banner-${index}`} />
                        </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>    
            <div className="index-container">
                <h1 className="welcome-text center">Welcome to Guitar Store</h1>
                <p className="ppal-text subtitle-text center">Find the best guitars at the best price</p>
            </div>
        </section>
    )
}