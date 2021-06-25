import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

const ZoomLightBox = ({image, onClose, title}) =>{

    return(
        <div className='bg-yellow-500 text-white'>       
          <Lightbox image={image} onClose={onClose} title={title}/>
      </div>
    )
}
export default ZoomLightBox;