import { useState, useEffect } from "react";
import axios from "axios";

import { Card, Modal, Carousel } from "./components";

import { Close, Mute, UnMute } from "./assets";

import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({});

  const [mute, setMute] = useState(false);

  const [showCarousel, setShowCarousel] = useState(false);

  const videosUrl = `${import.meta.env.VITE_API_PATH}/getfeeds_v1`;

  const oneVideoUrl = `${import.meta.env.VITE_API_PATH}/getPostContent?eid=`;

  const videosBody = {
    Index: 1,
    ContentType: [2],
    ProductCategory: [],
    PlayListCode: `${import.meta.env.VITE_VIDEO_PLAYLIST_CODE}`,
    IsTagged: false,
  };

  const videosConfig = {
    headers: {
      "x-api-key": `${import.meta.env.VITE_X_API_KEY}`,
      "x-tenant-key": `${import.meta.env.VITE_X_TENANT_KEY}`,
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
                  <Mute onPress={() => setMute(false)} />
                ) : (
                  <UnMute onPress={() => setMute(true)} />
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
            muteStatus={mute}
          />
        </Modal>
      ) : null}
    </div>
  );
}

export default App;
