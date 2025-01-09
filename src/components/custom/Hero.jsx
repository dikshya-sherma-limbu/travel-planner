import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9 mt-20 ">
      <h1 className="text-4xl font-bold text-center mt-13 ">
        <span className="text-cyan-950">
          Discover Your Next Adventure with Us.{" "}
        </span>
        <br></br>
      </h1>
      <p className="text-center mt-5 text-gray-600 text-xl">
        {" "}
        It's time to explore the world around you.{" "}
      </p>
      <Link to="/create-trip">
        <Button>Explore</Button>
      </Link>
    </div>
  );
}
