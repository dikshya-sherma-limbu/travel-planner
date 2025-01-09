import React from "react";
import { Button } from "../ui/button";

export default function Header() {
  console.log("Header.jsx");
  return (
    <div className="p-3 shawdow-sn flex justify-between items-center px-5 shadow-md">
      <img src="/logo.svg" />
      <div className="">
        <Button>Sign In</Button>
      </div>
    </div>
  );
}
