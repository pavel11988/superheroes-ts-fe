// config
import { BASE_URL, IMAGES } from "../../config";
import Icon from "../Icon/Icon";

// styled components
import { Button, ModalContainer } from "./ImageModal.styled";
import { useDispatch, useSelector } from "react-redux";
import globalSelectors from "../../redux/global/globalSelectors";
import { setImage, toggleModalImageOpen } from "../../redux/global/globalSlice";

const ImageModal = () => {
  const dispatch = useDispatch();
  const imageToImageModal = useSelector(globalSelectors.getImage);

  const handleClose = async () => {
    await dispatch(toggleModalImageOpen(false));
    await dispatch(setImage(null));
  };

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

export default ImageModal;
