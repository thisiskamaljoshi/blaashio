import styles from "./carouselCard.module.css";

import PropTypes from "prop-types";

/**
 * CarouselCard component to display a video card within a carousel.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.video - The URL of the video to display.
 * @param {Array} props.videos - An array of video objects.
 * @param {string} props.caption - The caption for the video.
 * @param {function} props.onPress - The click event handler function.
 * @param {Object} props.active - The active video object.
 * @param {string} props.current - The ID of the currently active video.
 * @param {number} props.index - The index of the video card in the carousel.
 * @param {number} props.activeIndex - The index of the active video in the carousel.
 * @param {boolean} props.muteStatus - The mute status for the video.
 * @returns {JSX.Element} The rendered JSX element.
 */

const CarouselCard = ({
  video,
  videos,
  // eslint-disable-next-line no-unused-vars
  caption,
  onPress,
  active,
  current,
  index,
  activeIndex,
  muteStatus,
}) => {
  function isNullOrUndefined(value) {
    return value === undefined || value === null;
  }

  let cardClass;

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
    </div>
  );
};

// Prop type validation
CarouselCard.propTypes = {
  video: PropTypes.string.isRequired,
  videos: PropTypes.array.isRequired,
  caption: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.object,
  current: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  activeIndex: PropTypes.number,
  muteStatus: PropTypes.bool.isRequired,
};

export default CarouselCard;
