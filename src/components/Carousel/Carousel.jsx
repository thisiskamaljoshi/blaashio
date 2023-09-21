import { useState, useEffect } from "react";
import styles from "./carousel.module.css";
import { CarouselCard } from "../index";

import { Prev, Next } from "../../assets";

import PropTypes from "prop-types";

/**
 * Carousel component to display a carousel of videos.
 *
 * @param {Object} props - The component's props.
 * @param {Object} props.currentVideo - The currently active video.
 * @param {Array} props.videos - An array of video objects to display.
 * @param {function} props.getRequestVideo - A function to request video data.
 * @param {boolean} props.muteStatus - The mute status for the videos.
 * @param {string} props.oneVideoUrl - The URL for fetching a single video.
 * @param {Object} props.videosConfig - Configuration for video requests.
 * @returns {JSX.Element} The rendered JSX element.
 */

const Carousel = ({
  currentVideo,
  videos,
  getRequestVideo,
  muteStatus,
  oneVideoUrl,
  videosConfig,
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  /**
   * Handle interactions with the carousel.
   *
   * @param {string} id - The ID of the video.
   * @param {string} direction - The direction of interaction ("prev" or "next").
   */

  const handleInteraction = (id, direction) => {
    let newIndex;

    if (direction === "prev") {
      newIndex = (activeIndex - 1 + videos.length) % videos.length;
    } else if (direction === "next") {
      newIndex = (activeIndex + 1) % videos.length;
    } else {
      newIndex = videos.findIndex((video) => video.EngagementPostId === id);
    }

    getRequestVideo(
      oneVideoUrl + videos[newIndex].EngagementPostId,
      videosConfig
    );
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const findActiveIndex = () => {
      const newIndex = videos.findIndex(
        (videoObject) => currentVideo?.StoryId === videoObject?.EngagementPostId
      );
      if (newIndex !== -1) {
        setActiveIndex(newIndex);
      }
    };

    findActiveIndex();
  }, [currentVideo, videos]);

  return (
    <div className={styles.carouselMain}>
      <div className={`${styles.prev} ${styles.navBtns}`}>
        <Prev onPress={() => handleInteraction(null, "prev")} />
      </div>
      {videos.map((videoObject, index) => (
        <CarouselCard
          key={videoObject?.EngagementPostId}
          current={videoObject?.EngagementPostId}
          video={videoObject?.Thumbnail_URL}
          caption={videoObject?.Thumbnail_Title}
          active={currentVideo}
          index={index}
          activeIndex={activeIndex}
          videos={videos}
          onPress={() => handleInteraction(videoObject?.EngagementPostId, null)}
          muteStatus={muteStatus}
        />
      ))}
      <div className={`${styles.next} ${styles.navBtns}`}>
        <Next onPress={() => handleInteraction(null, "next")} />
      </div>
    </div>
  );
};

// Prop type validation
Carousel.propTypes = {
  currentVideo: PropTypes.object.isRequired,
  videos: PropTypes.array.isRequired,
  getRequestVideo: PropTypes.func.isRequired,
  muteStatus: PropTypes.bool.isRequired,
  oneVideoUrl: PropTypes.string.isRequired,
  videosConfig: PropTypes.object.isRequired,
};

export default Carousel;
