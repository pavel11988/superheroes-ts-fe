// config
import { BASE_URL, IMAGES } from "../../../config";

// redux
import { useDispatch, useSelector } from "react-redux";
import superheroesOperations from "../../../redux/superheroes/superheroOperations";
import {
  setImage,
  toggleModalImageOpen,
} from "../../../redux/global/globalSlice";
import { AppDispatch } from "../../../redux/store";

// components
import Icon from "../../Icon/Icon";

// styled components
import {
  GalleryContainer,
  GalleryList,
  GalleryItem,
  GalleryImage,
  ImageButtonsContainer,
  ImageButton,
} from "./Gallery.styled";

// interfaces
import ISuperheroDB from "../../../interfaces/superherodb.interface";
import IState from "../../../interfaces/state.interface";
import IImage from "../../../interfaces/image.interface";

interface IProps {
  superhero: ISuperheroDB;
}
interface IData {
  superhero: ISuperheroDB;
  image: IImage;
}

const Gallery = ({ superhero }: IProps) => {
  const dispacth = useDispatch<AppDispatch>();
  const currentPage = useSelector((state: IState) => state.superheroes.page);
  const currentLimit = useSelector((state: IState) => state.superheroes.limit);

  const { images } = superhero;

  const openImage = async (image: IImage) => {
    await dispacth(setImage(image));
    await dispacth(toggleModalImageOpen(true));
  };

  const deleteImage = async (data: IData) => {
    await dispacth(superheroesOperations.deleteSuperheroImage(data));
    await dispacth(
      superheroesOperations.listSuperheroes({
        page: currentPage,
        limit: currentLimit,
      })
    );
  };

  const GALLERY_CLEAR = images.length === 0;
  const GALLERY_USER = images.length > 0;

  return (
    <GalleryContainer>
      <p>Gallery:</p>

      {GALLERY_CLEAR && <span> Gallery clear...</span>}

      {GALLERY_USER && (
        <GalleryList>
          {images.map((image) => (
            <GalleryItem key={image.id}>
              <GalleryImage
                src={`${BASE_URL}/${IMAGES}/${image.id}.${image.extension}`}
                alt={`${superhero._id}_${image.id}`}
              />
              <ImageButtonsContainer>
                <ImageButton
                  type="submit"
                  name="zoom"
                  onClick={() => {
                    openImage(image);
                  }}
                >
                  <Icon
                    id={"#icon-zoom"}
                    width={23}
                    height={23}
                    color={"#ecffac"}
                  />
                </ImageButton>

                <ImageButton
                  type="submit"
                  name="delete"
                  onClick={() => {
                    deleteImage({ superhero, image });
                  }}
                >
                  <Icon
                    id={"#icon-delete"}
                    width={23}
                    height={23}
                    color={"#ff5959"}
                  />
                </ImageButton>
              </ImageButtonsContainer>
            </GalleryItem>
          ))}
        </GalleryList>
      )}
    </GalleryContainer>
  );
};

export default Gallery;
