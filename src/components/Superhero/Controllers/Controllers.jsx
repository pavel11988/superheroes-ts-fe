// import libs
import { useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

// components
import { ReactComponent as DeleteIcon } from "../../../images/delete.svg";
import { ReactComponent as EditIcon } from "../../../images/edit.svg";
import superheroesOperations from "../../../redux/superheroes/superheroOperations";
import Loader from "../../Loader/Loader";

// styled components
import {
  ButtonChange,
  ButtonDelete,
  ButtonsContainer,
  ButtonWrapper,
} from "./Controllers.styled";
import { toggleModalEditOpen } from "../../../redux/global/globalSlice";

const Controllers = ({ superhero }) => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.superheroes.status);
  const currentPage = useSelector((state) => state.superheroes.page);
  const currentLimit = useSelector((state) => state.superheroes.limit);
  const superheroes = useSelector((state) => state.superheroes.superheroes);

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const onDelete = async (event) => {
    event.preventDefault();
    setLoadingDelete(true);
    await dispatch(superheroesOperations.deleteSuperhero(superhero._id));

    let reqPage = currentPage;
    if (superheroes.length === 1 && currentPage > 0) {
      reqPage = currentPage - 1;
    }

    await dispatch(
      superheroesOperations.listSuperheroes(reqPage, currentLimit)
    );
    setLoadingDelete(false);
  };

  const onEdit = async (event) => {
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
            {<DeleteIcon fill={"#ede9e9"} />}
          </ButtonDelete>
        )}
      </ButtonWrapper>

      <ButtonWrapper>
        {PENDING_EDIT && <Loader color={"white"} />}
        {RESOLVED_EDIT && (
          <ButtonChange type="submit" onClick={onEdit}>
            {<EditIcon fill={"#ede9e9"} />}
          </ButtonChange>
        )}
      </ButtonWrapper>
    </ButtonsContainer>
  );
};

export default Controllers;
