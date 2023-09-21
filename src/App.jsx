import { useState, useEffect } from "react";
import axios from "axios";

import Card from "./components/Card/card";
import Modal from "./components/Modal/Modal";

import Close from "./assets/svg/close";
import Mute from "./assets/svg/mute";
import UnMute from "./assets/svg/umMute";

import "./App.css";
import Carousel from "./components/Carousel/Carousel";

function App() {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({});

  const [mute, setMute] = useState(false);

  const [showCarousel, setShowCarousel] = useState(false);

  const videosUrl = `https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getfeeds_v1`;
  const oneVideoUrl = `https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getPostContent?eid=`;
  const videosBody = {
    Index: 1,
    ContentType: [2],
    ProductCategory: [],
    PlayListCode: "XL7OXUUX_638264173348576143",
    IsTagged: false,
  };

  const videosConfig = {
    headers: {
      "x-api-key": "MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr",
      "x-tenant-key": "BLAASH1122",
    },
  };

  const postRequestVideos = async (url, body, config) => {
    axios
      .post(url, body, config)
      .then((response) => {
        if (response?.data?.data?.Feeds)
          setVideos([...response.data.data.Feeds]);
      })
      .catch((err) => console.log(err));
  };

  const getRequestVideo = async (url, config) => {
    axios
      .get(url, config)
      .then((response) => {
        setCurrentVideo(response?.data?.data[0]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    postRequestVideos(videosUrl, videosBody, videosConfig);
  }, []);

  // useEffect(() => {}, [currentVideo]);

  const handleVideoClick = (id) => {
    getRequestVideo(oneVideoUrl + id, videosConfig);
    setShowCarousel(true);
  };

  return (
    <div className="body">
      <div className="productCards">
        {videos.map((videoObject) => {
          return (
            <Card
              key={videoObject?.EngagementPostId}
              video={videoObject?.Thumbnail_URL}
              caption={videoObject?.Thumbnail_Title}
              onPress={() => handleVideoClick(videoObject?.EngagementPostId)}
            />
          );
        })}
      </div>
      {showCarousel ? (
        <Modal>
          <div className="buttonsMain">
            <div className="modalButtons">
              <div className="buttonCarousel closeBtn">
                <Close onPress={() => setShowCarousel(false)} />
              </div>
              <div className="buttonCarousel muteBtn">
                {mute ? (
                  <UnMute onPress={() => setMute(false)} />
                ) : (
                  <Mute onPress={() => setMute(true)} />
                )}
              </div>
            </div>
          </div>
          <Carousel
            currentVideo={currentVideo}
            setCurrentVideo={setCurrentVideo}
            videos={videos}
            handleVideoClick={handleVideoClick}
            getRequestVideo={getRequestVideo}
          />
        </Modal>
      ) : null}
    </div>
  );
}

export default App;
