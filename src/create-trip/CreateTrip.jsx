import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input";
import {
  SelectBuDgetOptions,
  SelectTravelList,
  AI_PROMPT,
} from "@/constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/services/AiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/FireBaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = React.useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onGenerateTrip = async () => {
    var user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all the fields");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    saveTripData(result?.response?.text());
  };

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
        onGenerateTrip();
      });
  };

  const login = useGoogleLogin({
    onSuccess: (response) => {
      getUserProfile(response);
      console.log("Login Success:", response);
    },
    onError: (error) => {
      console.log("Login Error:", error);
    },
  });

  const saveTripData = async (tripData) => {
    // Add a new document in collection "tripPlanner"
    setLoading(true);
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));
    await setDoc(doc(db, "tripPlanner", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
      docId: docId,
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-4xl">
        Tell us about your travel preference 🏖️,
      </h2>
      <p className="mt-3 text-gray-600 text-xl font-medium">
        And we will generate your trip plan.
      </p>
      <div className="mt-20 flex flex-col gap-5">
        <div>
          <h2 className="text-xl mt-3 my-2 font-medium">
            Your Choice of Destination ?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
            selectProps={{
              place,
              styles: {
                input: (provided) => ({
                  ...provided,
                  width: "100%",
                }),
              },
              onChange: (e) => {
                setPlace(e);
                handleInputChange("location", e);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl mt-3 my-2 font-medium">
            Totals days of your trip ?
          </h2>
          <Input
            placeholder={"Ex. 3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl mt-3 my-2 font-medium">Your Budget ?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBuDgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-md
                  ${
                    formData.budget === item.title
                      ? "shadow-lg border-black"
                      : ""
                  }`}
              >
                <h2>{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl mt-3 my-2 font-medium">
            Your Travel Companion ?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.title)}
                className={`p-4 border rounded-lg hover:shadow-md
                  ${
                    formData.traveler === item.title
                      ? "shadow-lg border-black"
                      : ""
                  }`}
              >
                <h2>{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="my-4 justify-end flex">
          <Button disabled={loading} onClick={onGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
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

export default CreateTrip;
