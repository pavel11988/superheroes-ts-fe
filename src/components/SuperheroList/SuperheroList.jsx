// redux
import { useSelector } from "react-redux";
import IState from "../../interfaces/state.interface";

// components
import Superhero from "../Superhero/Superhero";

// styled components
import { List } from "./SuperheroList.styled";

// interface
// import IImage from "../../interfaces/image.interface";

// type StateFunction = (value: boolean | null) => void;

// interface IProps {
//   setImageToImageModal: Function
//   setViewImageModal: Function;
//   setViewEditForm:  Function;
// }

// interface ISuperhero {
//   id: string;
//   avatar: string;
//   nickname: string;
//   real_name: string;
//   origin_description: string;
//   superpowers: string;
//   catch_phrase: string;
// }

const SuperheroList = ({
  setViewEditForm,
  setViewImageModal,
  setImageToImageModal,
}) => {
  const superheroes = useSelector((state) => state.superheroes.superheroes);

  return (
    <List>
      {superheroes.map((superhero) => (
        <Superhero
          key={superhero._id}
          superhero={superhero}
          setViewEditForm={setViewEditForm}
          setViewImageModal={setViewImageModal}
          setImageToImageModal={setImageToImageModal}
        />
      ))}
    </List>
  );
};

export default SuperheroList;
