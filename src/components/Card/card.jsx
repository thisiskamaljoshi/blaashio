import styles from "./card.module.css";

import PropTypes from "prop-types";

/**
 * Card component to display a video with a caption.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.video - The URL of the video to display.
 * @param {string} props.caption - The caption for the video.
 * @param {function} props.onPress - The click event handler function.
 * @returns {JSX.Element} The rendered JSX element.
 */

const Card = ({ video, caption, onPress }) => {
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

Card.propTypes = {
  video: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Card;
