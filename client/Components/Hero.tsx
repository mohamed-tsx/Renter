import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import image1 from "@/public/Images/avery-klein-JaXs8Tk5Iww-unsplash.jpg";
import image2 from "@/public/Images/daniil-silantev-nBuiLbz_j4A-unsplash.jpg";

const Hero = () => {
  return (
    <div className="mt-10 md:mt-16 lg:mt-32">
      <div className="md:flex justify-between items-center flex-col-reverse md:flex-row">
        <div className="text-center md:text-left mb-8 md:mb-0">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="w-full md:w-[600px] text-3xl md:text-4xl font-semibold">
              Unlock Your Dream Home: Where Comfort Meets Convenience!
            </h1>
            <p className="w-full md:w-[600px] md:text-xl text-center md:text-left">
              Discover. Rent. Enjoy. Your dream home, just a click away.
            </p>
          </div>
          <div className="p-6">
            <button className="flex items-center bg-black text-white gap-2 px-4 py-2 rounded-md">
              Get Started <FaArrowRight />
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-wrap justify-center gap-4">
          <Image
            src={image1}
            alt="First Image"
            width={200}
            height={100}
            className="rounded-md md:w-[300px] mb-4 md:mb-0"
          />
          <div className="flex flex-col gap-6 md:mt-[12px]">
            <Image
              src={image2}
              alt="Second Image"
              width={200}
              height={100}
              className="rounded-md md:w-[300px] mb-4"
            />
            <Image
              src={image2}
              alt="Third Image"
              width={200}
              height={100}
              className="rounded-md md:w-[300px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
