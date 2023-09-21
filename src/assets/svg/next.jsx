// eslint-disable-next-line react/prop-types
function Next({ onPress }) {
  const handleClick = () => {
    if (onPress && typeof onPress === "function") {
      onPress();
    }
  };
  return (
    <svg fill="none" viewBox="0 0 24 24" onClick={handleClick}>
      <path
        fill="#fff"
        d="M7.82 20.731a1 1 0 001.415 0l6.644-6.644a3 3 0 00.001-4.242L9.31 3.27a1 1 0 10-1.415 1.414l6.572 6.572a1 1 0 010 1.414l-6.646 6.647a1 1 0 000 1.414z"
      ></path>
    </svg>
  );
}

export default Next;
