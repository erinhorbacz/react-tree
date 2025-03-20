import "../assets/Header.css";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";

const Header: React.FC<any> = ({
  isDragging,
  handleMouseDown,
  handleMinimize,
  isMinimized,
  handleClose,
}) => {
  return (
    <div
      className='popup-header'
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}>
      {isMinimized && <h1>React Tree</h1>}
      {isMinimized ? (
        <>
          <button
            className='fullscreen-button'
            onClick={() => {
              handleMinimize(false);
            }}>
            <FullscreenIcon fontSize='small' />
          </button>
          <button className='close-button-mini' onClick={() => handleClose()}>
            <CloseIcon fontSize='small' />
          </button>
        </>
      ) : (
        <>
          <button
            className='minimize-button'
            onClick={() => {
              handleMinimize(true);
            }}>
            <CloseFullscreenIcon fontSize='small' />
          </button>
          <button className='close-button' onClick={() => handleClose()}>
            <CloseIcon fontSize='small' />
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
