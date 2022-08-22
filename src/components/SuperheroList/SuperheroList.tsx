// redux
import { useSelector } from "react-redux";

// components
import Superhero from "../Superhero/Superhero";

// styled components
import { List } from "./SuperheroList.styled";

// interface
import IState from "../../interfaces/state.interface";

const SuperheroList = () => {
  const superheroes = useSelector(
    (state: IState) => state.superheroes.superheroes
  );

  return (
    <List>
      {superheroes.map((superhero) => (
        <Superhero key={superhero.id} superhero={superhero} />
      ))}
    </List>
  );
};

export default SuperheroList;
