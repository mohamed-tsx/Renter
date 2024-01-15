import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import image1 from "@/public/Images/avery-klein-JaXs8Tk5Iww-unsplash.jpg";
import image2 from "@/public/Images/daniil-silantev-nBuiLbz_j4A-unsplash.jpg";

const Hero = () => {
  return (
    <div className="mt-20">
      <div>
        <div className="flex flex-col items-center text-center">
          <h1 className="w-70 text-3xl font-semibold">
            Unlock Your Dream Home: Where Comfort Meets Convenience!
          </h1>
          <p className="w-70">
            Discover. Rent. Enjoy. Your dream home, just a click away.
          </p>
        </div>
        <div className="p-6">
          <button className="flex items-center bg-black text-white gap-2 px-4 py-2 rounded-md">
            Get Started <FaArrowRight />
          </button>
        </div>
        <div className="p-4 flex flex-wrap justify-center gap-4">
          <Image
            src={image1}
            alt="First Image"
            width={200}
            height={100}
            className="rounded-md"
          />
          <div className="flex flex-col gap-6 mt-[6px]">
            <Image
              src={image2}
              alt="Second Image"
              width={200}
              height={100}
              className="rounded-md"
            />
            <Image
              src={image2}
              alt="Second Image"
              width={200}
              height={100}
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
