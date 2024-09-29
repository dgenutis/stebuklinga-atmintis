
import PropTypes from "prop-types";
import "./Korta.css";

export default function Korta({
  korta,
  handlePasirinkimas,
  flipped,
  disabled,
}) {
  const handleClick = () => {
    if (!disabled) {
      handlePasirinkimas(korta);
    }
  };

  return (
    <div className="korta" onClick={handleClick}>
      <div className={flipped ? "flipped" : ""}>
        <img className="priekis" src={korta.src} alt="kortos priekine puse" />
        <img
          className="nugara"
          src="/img/cover.webp"
          alt="kortos nugarine puse"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

Korta.propTypes = {
  korta: PropTypes.shape({
    src: PropTypes.string.isRequired,
    matched: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  handlePasirinkimas: PropTypes.func.isRequired,
  flipped: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};
