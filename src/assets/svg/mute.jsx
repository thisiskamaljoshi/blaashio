// eslint-disable-next-line react/prop-types
function Mute({ onPress }) {
  const handleClick = () => {
    if (onPress && typeof onPress === "function") {
      onPress();
    }
  };
  return (
    <svg viewBox="0 0 512 512" onClick={handleClick}>
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g fill="#fff" transform="translate(42.667 59.582)">
          <path d="M47.085 0l362.667 362.667-30.17 30.17-187.833-187.834.001 164.103-110.73-85.458H0V112.98h80.896l10.537-8.293L16.915 30.17 47.085 0zm314.213 28.015c67.74 75.639 82.5 181.38 44.28 270.137l-32.95-32.952c23.87-71.003 8.998-151.972-44.615-210.558l33.285-26.627zM121.824 135.078l-26.137 20.57h-53.02v85.333h52.895l53.521 41.291V162.337l-27.259-27.259zm155.089-39.554c28.626 31.924 41.556 72.768 38.788 112.75l-49.238-49.237c-4.968-13.304-12.593-25.857-22.874-36.854zM191.75 25.752l-.001 58.573-32.78-32.78 32.781-25.793z"></path>
        </g>
      </g>
    </svg>
  );
}

export default Mute;
