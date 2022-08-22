// redux
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IState from "../../interfaces/state.interface";
import { AppDispatch } from "../../redux/store";
import superheroesOperations from "../../redux/superheroes/superheroOperations";

// styled components
import {
  ListNumbers,
  PageButton,
  PageNumber,
  PaginationContainer,
  CurrentPageButton,
} from "./Pagination.styled";

interface IProps {
  totalPages: number;
}

// interface ListRequest {
//   numberPage?: number;
//   limit?: number;
// }

type ClickFunc = (event: React.MouseEvent<HTMLInputElement>) => void;

const Pagination = ({ totalPages }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const limit = useSelector((state: IState) => state.superheroes.limit);
  const currentPage = useSelector((state: IState) => state.superheroes.page);

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i);
  }

  const handleClick: ClickFunc = async (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const page = Number(event.currentTarget.name);
    await dispatch(superheroesOperations.listSuperheroes({ page, limit }));
  };

  return (
    <PaginationContainer>
      <ListNumbers>
        {pageNumbers.map((pageNumber) => (
          <PageNumber key={pageNumber}>
            {currentPage === pageNumber && (
              <CurrentPageButton
                type="button"
                name={`${pageNumber}`}
                onClick={() => handleClick}
              >
                {pageNumber}
              </CurrentPageButton>
            )}
            {currentPage !== pageNumber && (
              <PageButton
                type="button"
                name={`${pageNumber}`}
                onClick={() => handleClick}
              >
                {pageNumber}
              </PageButton>
            )}
          </PageNumber>
        ))}
      </ListNumbers>
    </PaginationContainer>
  );
};

export default Pagination;
