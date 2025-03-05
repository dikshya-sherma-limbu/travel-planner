import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import image from "../../assets/trip.jpg";

export default function Hero() {
  return (
    <div className="flex flex-col items-center mx-4 gap-9 mt-20 md:mx-56">
      <h1 className="text-2xl md:text-4xl font-bold text-center mt-13 text-sm whitespace-nowrap">
        <span className="text-cyan-950 animate-pulse">
          Discover Your Next Adventure with Us.{" "}
        </span>
        <br></br>
      </h1>
      <p className="text-center mt-5 text-gray-600 text-base md:text-xl text-sm md:whitespace-normal whitespace-nowrap">
        {" "}
        It's time to explore the world around you.{" "}
      </p>
      <Link to="/create-trip">
        <Button>Explore</Button>
      </Link>
      <img
        src={image}
        alt="travel"
        className="w-[300px] h-[300px] object-cover shadow-md rounded-xl xs:w-[100px] xs:h-[100px] sm:w-[500px] sm:h-[150px] md:w-[1000px] md:h-[250px]"
      />
    </div>
  );
}
