import React from "react";
import styles from "./card.module.css";

interface Props {
  video: string;
  caption: string;
  onPress: () => void;
}

const Card = ({ video, caption, onPress }: Props) => {
  return (
    <div className={styles.card} onClick={onPress}>
      <video className={styles.video} loop autoPlay muted playsInline>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.caption}>
        <p className={styles.text}>{caption}</p>
      </div>
    </div>
  );
};

export default Card;
