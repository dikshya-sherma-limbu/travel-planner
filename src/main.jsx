import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/custom/Header.jsx";
import React from "react";
import CreateTrip from "./create-trip/CreateTrip.jsx";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripId]/ViewTrip.jsx";
import MyTrips from "./my-trips/MyTrips";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/view-trip/:tripId",
    element: <ViewTrip />,
  },
  {
    path: "/my-trips",
    element: <MyTrips />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />.
    </GoogleOAuthProvider>
  </StrictMode>
);
