import React, { useState, useEffect } from "react";
import styles from "./carouselCard.module.css";

interface Props {
  video: string;
  caption: string;
  onPress: () => void;
  active: any;
  current: any;
  index: number;
  activeIndex: number;
  videos: any[];
  muteStatus?: boolean;
}

const CarouselCard = ({
  video,
  videos,
  caption,
  onPress,
  active,
  current,
  index,
  activeIndex,
  muteStatus,
}: Props) => {
  function isNullOrUndefined(value) {
    return value === undefined || value === null;
  }

  let cardClass: string;

  if (
    !isNullOrUndefined(activeIndex) &&
    ((activeIndex - 2 >= 0 && activeIndex - 2 === index) ||
      activeIndex - 2 + videos.length === index)
  ) {
    cardClass = "leftTwo";
  } else if (
    (!isNullOrUndefined(activeIndex) &&
      activeIndex - 1 >= 0 &&
      activeIndex - 1 === index) ||
    activeIndex - 1 + videos.length === index
  ) {
    cardClass = "leftOne";
  } else if (!isNullOrUndefined(activeIndex) && activeIndex === index) {
    cardClass = "active";
  } else if (
    !isNullOrUndefined(activeIndex) &&
    ((activeIndex + 1 < videos.length && activeIndex + 1 === index) ||
      activeIndex + 1 - videos.length === 0)
  ) {
    cardClass = "rightOne";
  } else if (
    !isNullOrUndefined(activeIndex) &&
    ((activeIndex + 2 < videos.length && activeIndex + 2 === index) ||
      activeIndex + 2 - videos.length === 0)
  ) {
    cardClass = "rightTwo";
  }

  return (
    <div className={`${styles.card} ${styles[cardClass]}`} onClick={onPress}>
      {active?.StoryId === current ? (
        <video
          className={styles.video}
          loop
          autoPlay
          muted={!!muteStatus}
          playsInline
        >
          <source src={active?.Url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : null}

      {active?.StoryId !== current ? (
        <video className={styles.video} loop autoPlay playsInline>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : null}

      {/* <div className={styles.caption}>
        <p className={styles.text}>{caption}</p>
      </div> */}
    </div>
  );
};

export default CarouselCard;
