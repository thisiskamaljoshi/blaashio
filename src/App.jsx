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

  // API URLs and configuration
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

  // API request functions
  const postRequestVideos = async () => {
    try {
      // Send a POST request to fetch videos
      const response = await axios.post(videosUrl, videosBody, videosConfig);
      if (response?.data?.data?.Feeds) {
        setVideos([...response.data.data.Feeds]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getRequestVideo = async (url) => {
    try {
      // Send a GET request to fetch a specific video
      const response = await axios.get(url, videosConfig);
      setCurrentVideo(response?.data?.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  // Event handlers
  const handleVideoClick = (id) => {
    // Fetch and display a specific video when a card is clicked
    getRequestVideo(oneVideoUrl + id);
    setShowCarousel(true);
  };

  const toggleMute = () => {
    // Toggle the 'mute' state
    setMute((prevMute) => !prevMute);
  };

  const toggleCarousel = () => {
    // Toggle the 'showCarousel' state to open or close the modal
    setShowCarousel((prevShowCarousel) => !prevShowCarousel);
  };

  // Fetch videos on initial load
  useEffect(() => {
    postRequestVideos();
  }, []);

  return (
    <div className="body">
      <div className="productCards">
        {videos.map((videoObject) => (
          <Card
            key={videoObject?.EngagementPostId}
            video={videoObject?.Thumbnail_URL}
            caption={videoObject?.Thumbnail_Title}
            onPress={() => handleVideoClick(videoObject?.EngagementPostId)}
          />
        ))}
      </div>
      {showCarousel && (
        <Modal>
          <div className="buttonsMain">
            <div className="modalButtons">
              <div className="buttonCarousel closeBtn">
                <Close onPress={toggleCarousel} />
              </div>
              <div className="buttonCarousel muteBtn">
                {mute ? (
                  <Mute onPress={toggleMute} />
                ) : (
                  <UnMute onPress={toggleMute} />
                )}
              </div>
            </div>
          </div>
          <Carousel
            currentVideo={currentVideo}
            videos={videos}
            handleVideoClick={handleVideoClick}
            getRequestVideo={getRequestVideo}
            muteStatus={mute}
            oneVideoUrl={oneVideoUrl}
            videosConfig={videosConfig}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
