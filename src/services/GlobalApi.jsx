import axios from "axios";
const BASE_URL = "https://places.googleapis.com/v1/places:searchText";
export const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_MAP_API_KEY;
export const getPlaces = async (data) => {
  try {
    const response = await axios.post(BASE_URL, data, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAP_API_KEY,
        "X-Goog-FieldMask": [
          "places.photos",
          "places.displayName",
          "places.id",
        ],
      },
    });
    return response;
  } catch (error) {
    console.error("Error in getPlaces:", error.message);
  }
};
