import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useState } from "react";
import axios from "axios";
export default function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      getUserProfile(response);
      console.log("Login Success:", response);
    },
    onError: (error) => {
      console.log("Login Error:", error);
    },
  });
  const getUserProfile = (token) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  return (
    <div className="p-3 shawdow-sn flex justify-between items-center px-5 shadow-md">
      <img src="/logo.svg" />
      <div className="">
        {user ? (
          <div className="flex items-center space-x-2">
            <a href="/create-trip">
              <Button
                variant="outline"
                className="rounded-full bg-black text-white"
              >
                + Plan a Trip
              </Button>
            </a>

            <a href="/my-trips">
              <Button
                variant="outline"
                className="rounded-full bg-black text-white"
              >
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[30px] w-[30px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h3
                  className="teext-black cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  {" "}
                  Log Out
                </h3>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" className="w-20" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Authenticate with Google Securely</p>
              <Button
                disabled={loading}
                onClick={login}
                className="mt-5 w-full gap-4 items-center"
              >
                <>
                  <FcGoogle className="h-7 w-7" />
                  Sign In With Google
                </>
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
