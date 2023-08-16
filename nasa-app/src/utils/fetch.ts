const API_KEY = "wojw7kia0pN7o2S6zaVUwhBDR5OHE8FRChQk8OLh";
const API_URL = "https://api.nasa.gov/planetary/apod";

export default async (urlParams?: string) => {
  try {
    const response = await fetch(
      `${API_URL}?api_key=${API_KEY}${
        typeof urlParams !== "undefined" && urlParams?.length > 0
          ? urlParams
          : ""
      }`
    );
    const data = await response.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
