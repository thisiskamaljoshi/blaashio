import React from "react";
import styles from "../carouselCard.module.css";

const Video = ({ muteStatus, videoUrl,autoplay }) => {
  console.log(videoUrl, "url", muteStatus);
  return (
    <video className={styles.video} loop autoPlay={autoplay} muted={!!muteStatus} playsInline>
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
