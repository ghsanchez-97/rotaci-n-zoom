import React from "react";
import "./App.css";
import src from "./iden.jpeg";
import {
  BiRotateLeft,
  BiRotateRight,
  // BiZoomIn,
  // BiZoomOut,
} from "react-icons/bi";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

function App() {
  const [rotats, setRotats] = React.useState(0);
  const [image, setImage] = React.useState();
  const [visible, setVisible] = React.useState(false)
  const [zoomInOut, setZoomInOut] = React.useState(1);
  const [isPanning, setPanning] = React.useState(false);
  const [position, setPosition] = React.useState({
    oldX: 0,
    oldY: 0,
    x: 0,
    y: 0,
    z: 1,
  });

  const containerRef = React.useRef();
  const ref = React.useRef(null);

  const onLoad = (e) => {
    setImage({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight,
    });
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    setPanning(true);
    setPosition({
      ...position,
      oldX: e.clientX,
      oldY: e.clientY,
    });
  };

  const onWheel = (e) => {
    if (e.deltaY) {
      const sign = Math.sign(e.deltaY) / 10;
      const scal = 1 - sign;
      const rect = containerRef.current.getBoundingClientRect();

      setPosition({
        ...position,
        x: position.x * scal - (rect.width / 2 - e.clientX + rect.x) * sign,
        y:
          position.y * scal -
          ((image.height * rect.width) / image.width / 2 - e.clientY + rect.y) *
            sign,
        z: position.z * scal,
      });
    }
  };

  React.useEffect(() => {
    ref.current.style.transform = `scale(${zoomInOut})`;
  }, [zoomInOut]);

  React.useEffect(() => {
    const rotates = () => {
      document.querySelector(
        ".rotates"
      ).style.transform = `rotate(${rotats}deg)`;
    };
    rotates();
  }, [rotats]);

  React.useEffect(() => {
    const mouseup = () => {
      setPanning(false);
    };

    const mousemove = (e) => {
      if (isPanning) {
        setPosition({
          ...position,
          x: position.x + e.clientX - position.oldX,
          y: position.y + e.clientY - position.oldY,
          oldX: e.clientX,
          oldY: e.clientY,
        });
      }
    };

    window.addEventListener("mouseup", mouseup);
    window.addEventListener("mousemove", mousemove);

    return () => {
      window.removeEventListener("mouseup", mouseup);
      window.removeEventListener("mousemove", mousemove);
    };
  });

  return (
    <div className="App">
      <h1 className="text-7xl">Hello Zoom</h1>

      <div className="bg-red-500 my-4">
        <div className="flex justify-center">
          <div>
            <div className="my-6">
              <button
                className="button rotateleft bg-white p-2 rounded"
                onClick={() => setRotats((prev) => prev - 90)}
              >
                <BiRotateLeft className="text-3xl" />
              </button>
              <button
                className="button rotatright bg-white p-2 rounded"
                onClick={() => setRotats((prev) => prev + 90)}
              >
                <BiRotateRight className="text-3xl" />
              </button>
            </div>
            <input
              type="range"
              value={zoomInOut}
              min={1}
              max={5}
              step={0.1}
              onChange={(e) => setZoomInOut(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onWheel={onWheel}
        className="PanAndZoomImage-container flex"
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${position.z})`,
          }}
        >
          <img
            ref={ref}
            src={src}
            alt="Prueba"
            className="rotates mb-4 w-2/4 PanAndZoomImage-image"
            onLoad={onLoad}
          />
        </div>
      </div>

      <div className='bg-yellow-500 text-white'>
        <button onClick={() => setVisible(true)} className='py-4 bg-white text-black px-4 my-4'>Show</button>
        {visible === true ?
          <Lightbox image={src} onClose={() => setVisible(false)}/>
          :null
        }
      </div>
    </div>
  );
}

export default App;
