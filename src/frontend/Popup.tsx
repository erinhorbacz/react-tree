import { useState, useEffect, useRef } from "react";
import "../assets/Popup.css";
import Tree from "./Tree.tsx";
import Header from "./Header.tsx";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

const Popup: React.FC<any> = ({ tree, isDragging, setIsDragging, handleClose }) => {
  // const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(true);
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (popupRef.current) {
      setIsDragging(true);
      const rect = popupRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && popupRef.current) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMinimize = (resize: boolean) => {
    setIsMinimized(resize);
    setPosition({ x: 10, y: 10 });
  };

  const handleZoomIn = () => {
    setZoom((prev) => {
      if (prev < 2.5) {
        return prev + 0.1;
      }
      return prev;
    });
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      if (prev > 1) {
        return prev - 0.1;
      }
      return prev;
    });
  };

  // const handleClose = () => {
  //   setIsVisible(false);
  //   const injectedScript = document.querySelector('script[src*="react-tree-index.js"]');
  //   console.log("THIS IS THE INJECTED SCRIPT", injectedScript)
  //   if (injectedScript) {
  //     console.log("REMOVING INJECTED SCRIPT");
  //     injectedScript.remove();
  //   }
  //   const root = document.getElementById("react-tree-root");
  //   if (root) {
  //     console.log("REMOVING ROOT")
  //     root.remove();
  //   }
  // };

  // if (!isVisible) {
  //   return null
  // };

  if (isMinimized) {
    return (
      <div
        className='minimized-popup'
        style={{
          height: "30px",
          width: "250px",
          position: "fixed",
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        ref={popupRef}>
        <Header
          handleMouseDown={handleMouseDown}
          // setIsVisible={setIsVisible}
          handleClose={handleClose}
          handleMinimize={handleMinimize}
          isMinimized={isMinimized}
        />
      </div>
    );
  }

  return (
    <div
      className='fullscreen-popup'
      ref={popupRef}
      style={{ position: "fixed", left: `${position.x}px`, top: `${position.y}px` }}>
      <Header
        isDragging={isDragging}
        handleMouseDown={handleMouseDown}
        // setIsVisible={setIsVisible}
        handleClose={handleClose}
        handleMinimize={handleMinimize}
        isMinimized={isMinimized}
      />
      <div className='fullscreen-content'>
        {tree && <Tree tree={tree} zoom={zoom} />}
        <div className='zoom-buttons'>
          <button onClick={handleZoomIn}>
            <ZoomInIcon />
          </button>
          <button onClick={handleZoomOut}>
            <ZoomOutIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
