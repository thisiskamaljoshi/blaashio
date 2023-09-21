import React, { useState, useEffect } from "react";
import styles from "./carousel.module.css";
import { CarouselCard } from "../index";

import { Prev, Next } from "../../assets";

const Carousel = ({
  currentVideo,
  videos,
  getRequestVideo,
  muteStatus,
  oneVideoUrl,
  videosConfig,
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

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

export default Carousel;
