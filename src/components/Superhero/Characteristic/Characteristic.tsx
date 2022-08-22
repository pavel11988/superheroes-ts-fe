// styled components
import {
  CatchPhrase,
  CharacteristicContainer,
  Superpowers,
  Descriprion,
} from "./Characteristic.styled";

// interfaces
import ISuperheroDB from "../../../interfaces/superherodb.interface";

interface IProps {
  superhero: ISuperheroDB;
}

const Characteristic = ({ superhero }: IProps) => {
  const { origin_description, superpowers, catch_phrase } = superhero;
  return (
    <CharacteristicContainer>
      <Descriprion>
        <span>Description</span>: {origin_description}
      </Descriprion>
      <Superpowers>
        <span>Superpowers:</span> {superpowers}
      </Superpowers>
      <CatchPhrase>
        <span>Catch phrase:</span> {catch_phrase}
      </CatchPhrase>
    </CharacteristicContainer>
  );
};

export default Characteristic;
