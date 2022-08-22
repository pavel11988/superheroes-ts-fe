// import libs
import { useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { toggleModalEditOpen } from "../../../redux/global/globalSlice";
import { AppDispatch } from "../../../redux/store";

// components
import superheroesOperations from "../../../redux/superheroes/superheroOperations";
import Loader from "../../Loader/Loader";
import Icon from "../../Icon/Icon";

// styled components
import {
  ButtonChange,
  ButtonDelete,
  ButtonsContainer,
  ButtonWrapper,
} from "./Controllers.styled";

// interfaces
import ISuperheroDB from "../../../interfaces/superherodb.interface";
import IState from "../../../interfaces/state.interface";

interface IProps {
  superhero: ISuperheroDB;
}

type ClickFunc = (event: React.MouseEvent<HTMLButtonElement>) => void;

const Controllers = ({ superhero }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const status = useSelector((state: IState) => state.superheroes.status);
  const currentPage = useSelector((state: IState) => state.superheroes.page);
  const limit = useSelector((state: IState) => state.superheroes.limit);
  const superheroes = useSelector(
    (state: IState) => state.superheroes.superheroes
  );
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const onDelete: ClickFunc = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setLoadingDelete(true);
    await dispatch(superheroesOperations.deleteSuperhero(superhero._id));

    let page = currentPage;
    if (superheroes.length === 1 && currentPage > 0) {
      page = currentPage - 1;
    }

    await dispatch(superheroesOperations.listSuperheroes({ page, limit }));
    setLoadingDelete(false);
  };

  const onEdit: ClickFunc = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setLoadingEdit(true);
    await dispatch(superheroesOperations.getSuperheroById(superhero._id));
    dispatch(toggleModalEditOpen(true));
    setLoadingEdit(false);
  };

  const PENDING_DELETE = status === "pending" && loadingDelete === true;
  const PENDING_EDIT = status === "pending" && loadingEdit === true;
  const RESOLVED_DELETE = status === "resolved" || loadingDelete === false;
  const RESOLVED_EDIT = status === "resolved" || loadingEdit === false;

  return (
    <ButtonsContainer>
      <ButtonWrapper>
        {PENDING_DELETE && <Loader color={"white"} />}
        {RESOLVED_DELETE && (
          <ButtonDelete type="submit" onClick={onDelete}>
            <Icon
              id={"#icon-delete"}
              width={20}
              height={20}
              color={"#f9f9f9"}
            />
          </ButtonDelete>
        )}
      </ButtonWrapper>

      <ButtonWrapper>
        {PENDING_EDIT && <Loader color={"white"} />}
        {RESOLVED_EDIT && (
          <ButtonChange type="submit" onClick={onEdit}>
            <Icon id={"#icon-edit"} width={20} height={20} color={"#f9f9f9"} />
          </ButtonChange>
        )}
      </ButtonWrapper>
    </ButtonsContainer>
  );
};

export default Controllers;
