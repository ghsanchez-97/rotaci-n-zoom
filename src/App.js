import React from "react";
import ZoomCode from "./Components/zoom-code/zoom.code";
import ZoomRange from "./Components/zoom-range/zoom-range";
import ZoomLightBox from "./Components/zoom-ligh/zoom.lightbox";

function App() {
  const [show, setShow] = React.useState(false);
  return (
    <React.Fragment>
      <div className="bg-yellow-600 py-4 flex justify-center">
        <button
          className="text-3xl shadow-2xl font-extrabold cursor-default text-white"
          onClick={() => setShow(true)}
        >
          Presione aqui
        </button>
        {show === true ? (
          <ZoomLightBox
            image={'https://images.unsplash.com/photo-1611175345675-f78f6c34388b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'}
            alt={"Test"}
            onClose={() => setShow(false)}
          />
        ) : null}
      </div>
      <div className="flex bg-red-500 w-full justify-evenly">
        <ZoomCode
          img={
            "https://images.unsplash.com/photo-1624557446444-74a041ea28ac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          }
          alt={"Test"}
        />
        <ZoomRange
          image={
            "https://images.unsplash.com/photo-1599636647429-8cbd70bead58?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          }
          alt={"Test"}
        />
      </div>
    </React.Fragment>
  );
}

export default App;
