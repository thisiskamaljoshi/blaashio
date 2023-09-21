// eslint-disable-next-line react/prop-types
function UnMute({ onPress }) {
  const handleClick = () => {
    if (onPress && typeof onPress === "function") {
      onPress();
    }
  };
  return (
    <svg viewBox="0 0 512 512" onClick={handleClick}>
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g fill="#fff" transform="translate(42.667 85.333)">
          <path d="M361.3 341.61l-33.286-26.628c74.193-81.076 74.193-205.016-.001-286.091l33.285-26.628c86.612 96.712 86.61 242.635.001 339.348zM276.912 69.773l-33.324 26.659c39.795 42.568 39.794 108.444.001 151.012l33.324 26.658c52.205-58.22 52.205-146.109-.001-204.329zM191.75 0L80.896 87.23H0v170.666h81.02l110.73 85.458V0zM42.667 129.896h53.02l53.396-42.021v168.646l-53.52-41.292H42.666v-85.333z"></path>
        </g>
      </g>
    </svg>
  );
}

export default UnMute;
