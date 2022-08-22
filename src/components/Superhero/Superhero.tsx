// components
import Characteristic from "./Characteristic/Characteristic";
import Avatar from "./Avatar/Avatar";
import Gallery from "./Gallery/Gallery";
import Uploader from "./Uploader/Uploader";
import Controllers from "./Controllers/Controllers";

//styled components
import { Card, Nickname, RealName } from "./Superhero.styled";
import ISuperheroDB from "../../interfaces/superherodb.interface";

interface IProps {
  superhero: ISuperheroDB;
}

const Superhero = ({ superhero }: IProps) => {
  const { nickname, real_name } = superhero;
  return (
    <Card>
      <Avatar superhero={superhero} />
      <Nickname>{nickname}</Nickname>
      <RealName>{real_name}</RealName>
      <Characteristic superhero={superhero} />
      <Gallery superhero={superhero} />
      <Uploader superhero={superhero} />
      <Controllers superhero={superhero} />
    </Card>
  );
};

export default Superhero;
