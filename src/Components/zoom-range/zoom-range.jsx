import React from "react";
import "./style.css";

const ZoomRange = ({ image, alt }) => {
  const [zoomInOut, setZoomInOut] = React.useState(1);

  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current.style.transform = `scale(${zoomInOut})`;
  }, [zoomInOut]);

  return (
    <React.Fragment>
      <div className="my-4 space-y-4">
        <div className="my-6 flow-root mx-8">
          <div className="flex my-6 space-x-4 justify-center">
            <input
              type="range"
              value={zoomInOut}
              min={1}
              max={5}
              step={0.1}
              onChange={(e) => setZoomInOut(e.target.value)}
            />
          </div>
          <div className="PanAndZoomImage-container flex">
            <img
              ref={ref}
              src={image}
              alt={alt}
              className="rotates mb-4 w-2/4 PanAndZoomImage-image"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ZoomRange;
