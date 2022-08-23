// libs
import { useState } from "react";
import toast from "react-hot-toast";

// redux
import { useDispatch, useSelector } from "react-redux";
import superheroesOperations from "../../../redux/superheroes/superheroOperations";
import { AppDispatch } from "../../../redux/store";

// components
import Icon from "../../Icon/Icon";

// styled components
import {
  ButtonUpload,
  ErrorContainer,
  ErrorMessage,
  InputContainer,
  Label,
  UploadContainer,
  UploadInput,
} from "./Uploader.styled";

// interfaces
import IState from "../../../interfaces/state.interface";
import ISuperheroDB from "../../../interfaces/superherodb.interface";

interface IProps {
  superhero: ISuperheroDB;
}

type IImage = null | Blob;

type ClickFunc = (event: React.MouseEvent<HTMLButtonElement>) => void;
// type InputFunc = (event: React.MouseEvent<HTMLInputElement>) => void;

const Uploader = ({ superhero }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const currentPage = useSelector((state: IState) => state.superheroes.page);
  const currentLimit = useSelector((state: IState) => state.superheroes.limit);

  const [image, setImage] = useState<IImage>(null);
  const [arrayIsFull, setArrayIsFull] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const notifyError = (message: string) => toast.error(message);

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const target = event.target as HTMLInputElement;
    const newImage = target?.files?.[0];

    setUploadError(false);

    if (!newImage) {
      setImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(newImage);
    fileReader.onload = (event) => {
      let image: any = new Image();
      image.src = event.target?.result;
      image.onload = function () {
        const isError =
          image.width < 70 || image.height < 70 || newImage.size > 5120000;
        setUploadError(isError);
        if (!isError) {
          setImage(newImage);
        } else {
          setImage(null);
        }
      };
    };
  };

  const onUploadImage: ClickFunc = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const formdata = new FormData();
    await formdata.append("image", image as Blob);
    const data = {
      superheroId: superhero._id,
      formData: formdata,
    };

    if (superhero.images.length === 6) {
      setArrayIsFull(true);
      notifyError("Maximum 6 images");
      return;
    }

    await dispatch(superheroesOperations.addSuperheroImage(data));
    await dispatch(
      superheroesOperations.listSuperheroes({
        page: currentPage,
        limit: currentLimit,
      })
    );
    setImage(null);
  };

  const DISABLED_BUTTON_UPLOAD =
    !image || uploadError === true || arrayIsFull === true;
  const UPLOAD_ERROR = uploadError === true;

  return (
    <UploadContainer>
      <ButtonUpload
        type="submit"
        onClick={onUploadImage}
        disabled={DISABLED_BUTTON_UPLOAD}
      >
        <Icon id={"#icon-upload"} width={20} height={20} color={"#f9f9f9"} />
      </ButtonUpload>
      <InputContainer>
        <Label>Select a image</Label>
        <UploadInput
          name="images"
          type="file"
          accept=".png, .jpeg, .jpg"
          onChange={handleImage}
        />
      </InputContainer>
      {UPLOAD_ERROR && (
        <ErrorContainer>
          <ErrorMessage>
            Error! The image size should be smaller 5 MB and resolution more
            than 70x70 pixels
          </ErrorMessage>
        </ErrorContainer>
      )}
    </UploadContainer>
  );
};

export default Uploader;
