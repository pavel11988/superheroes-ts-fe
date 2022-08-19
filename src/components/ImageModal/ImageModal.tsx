// libs
import PropTypes from "prop-types";

// config
import { BASE_URL, IMAGES } from "../../config";
import Icon from "../Icon/Icon";

// interfaces 
import IImage from "../../interfaces/image.interface";

// styled components
import { Button, ModalContainer } from "./ImageModal.styled";

// type setFunc = (value: boolean | null) => void;

interface IProps {
  setImageToImageModal: Function;
  setViewImageModal: Function;
  imageToImageModal: IImage | null;
}

const ImageModal = ({
  setImageToImageModal,
  imageToImageModal,
  setViewImageModal,
}: IProps) => {
  const handleClose = () => {
    setViewImageModal(false);
    setImageToImageModal(null);
  };

  console.log(imageToImageModal);

  return (
    <ModalContainer>
      <Button type="submit" onClick={handleClose}>
        <Icon id={"#icon-cross"} width={20} height={20} color={"#f9f9f9"} />
      </Button>

      <img
        src={`${BASE_URL}/${IMAGES}/${imageToImageModal?.id}.${imageToImageModal?.extension}`}
        alt={`${imageToImageModal?.id}`}
      />
    </ModalContainer>
  );
};

ImageModal.propTypes = {
  setImageToImageModal: PropTypes.func.isRequired,
  imageToImageModal: PropTypes.object.isRequired,
  setViewImageModal: PropTypes.func.isRequired,
};

export default ImageModal;
