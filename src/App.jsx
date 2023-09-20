import { useState, useEffect } from "react";
import axios from "axios";

import Card from "./components/Card/card";

import videoOne from "./assets/vids/cardVideo1.mp4";
import videoTwo from "./assets/vids/cardVideo2.mp4";
import videoThree from "./assets/vids/cardVideo3.mp4";
import videoFour from "./assets/vids/cardVideo4.mp4";

import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);

  const videoUrl = `https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getfeeds_v1`;
  const videoBody = {
    Index: 1,
    ContentType: [2],
    ProductCategory: [],
    PlayListCode: "XL7OXUUX_638264173348576143",
    IsTagged: false,
  };
  const videoConfig = {
    headers: {
      "x-api-key": "MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr",
      "x-tenant-key": "BLAASH1122",
    },
  };

  const postRequest = async (url, body, config) => {
    // const res = await axios.get(url, config);
    axios
      .post(url, body, config)
      .then((response) => {
        // console.log(response?.data?.data?.Feeds, "data");
        if (response?.data?.data?.Feeds) {
          setVideos([...response.data.data.Feeds]);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    postRequest(videoUrl, videoBody, videoConfig);
  }, []);

  return (
    <div className="body">
      {/* <div className="productCards">
        <Card video={videoOne} caption="Your Fashion Style" />
        <Card video={videoTwo} caption="Jeans & Tshirt" />
        <Card video={videoThree} caption="Stylish Outfits" />
        <Card video={videoFour} caption="Sporty Tshirt" />
      </div> */}
      <div className="productCards">
        {videos.map((videoObject) => {
          return (
            <Card
              key={videoObject?.EngagementPostId}
              video={videoObject?.Thumbnail_URL}
              caption={videoObject?.Thumbnail_Title}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
