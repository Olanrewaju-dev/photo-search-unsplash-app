/* eslint-disable react-hooks/exhaustive-deps */
// importing react and state hooks
import { useState, useEffect } from "react";
import axios from "axios";

// importing css file
import "../index.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);

  // declaring API endpoint
  const url = `https://api.unsplash.com/search/photos/?page=1&query=${query}&client_id=${
    import.meta.env.VITE_API_KEY
  }`;

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(url);
      console.log(query);
      console.log(response);
      if (response) {
        console.log(response.status);
        const data = response.data.results;

        setPhotos(data);
      } else {
        throw new Error("Error " + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   fetchPhotos();
  //   console.log("useEffect!!!");
  // }, []);

  // function to trigger API data fetch once the submit button is clicked
  const Submit = (e) => {
    e.preventDefault();
    console.log("clicked");
    fetchPhotos();
    setQuery("");
  };

  // returning jsx element to the browser
  return (
    <>
      <div className="relative">
        <div className="bg-sky-500 text-center  text-white py-5 px-2">
          <h1 className="text-xl font-bold mb-2">Photo Search App</h1>
          <p>
            Take advantage of Unsplash API to search a wide repository of photo
            gallery.
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <form>
            <input
              className="border border-gray-300 p-2 m-2"
              type="text"
              placeholder="Search for photos"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              onClick={Submit}
              className="bg-sky-500/75 text-white p-2 m-2"
            >
              Search
            </button>
          </form>
        </div>
        <div className="md:grid md:grid-cols-3 gap-4 md:px-4 px-2 mb-20">
          {photos.map((photo) => {
            return (
              <div key={photo.id} className="m-2">
                <img
                  key={photo.id}
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  className="rounded-lg"
                />
                <p>
                  <b>Credit:</b> {photo.user.name}
                </p>
              </div>
            );
          })}
        </div>

        <div className="px-2 fixed bottom-0 text-center bg-sky-500 text-white py-5 w-full">
          <p>
            Built with React, Tailwind CSS, and Unsplash API by{" "}
            <a href="https://github.com/Olanrewaju-dev/" target="_blank">
              Olanrewaju
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
