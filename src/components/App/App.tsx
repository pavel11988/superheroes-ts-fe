// libs
import Modal from "react-modal";
import { Toaster } from "react-hot-toast";

// hooks:
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux
import superheroesOperations from "../../redux/superheroes/superheroOperations";
import { AppDispatch } from "../../redux/store";

// components:
import AddForm from "../AddForm/AddForm";
import EditForm from "../EditForm/EditForm";
import Pagination from "../Pagination/Pagination";
import SuperheroList from "../SuperheroList/SuperheroList";
import Icon from "../Icon/Icon";

// styled components
import { AddButton, AppContainer, ListContainer, Title } from "./App.styled";
import ImageModal from "../ImageModal/ImageModal";

// interface
import IState from "../../interfaces/state.interface";
import globalSelectors from "../../redux/global/globalSelectors";
import { toggleModalAddOpen } from "../../redux/global/globalSlice";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  overlay: {
    backgroundColor: "#0404015a",
  },
};

Modal.setAppElement("#root");

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const viewAddForm = useSelector(globalSelectors.getIsModalAddOpen);
  const viewEditForm = useSelector(globalSelectors.getIsModalEditOpen);
  const viewImageModal = useSelector(globalSelectors.getIsModalImageOpen);
  const imageToImageModal = useSelector(globalSelectors.getImage);

  const totalPages = useSelector(
    (state: IState) => state.superheroes.totalPages
  );
  const page = useSelector((state: IState) => state.superheroes.page);

  useEffect(() => {
    dispatch(superheroesOperations.listSuperheroes({}));
  }, [dispatch]);

  const VIEW_MODAL_IMAGE =
    viewImageModal === true && imageToImageModal !== null;
  const VIEW_ADD_FORM = viewAddForm === true;
  const VIEW_EDIT_FORM = viewEditForm === true;

  return (
    <AppContainer>
      <Title>Create your own superhero squad!</Title>

      <ListContainer>
        {page === 1 && (
          <AddButton
            type="button"
            onClick={() => {
              dispatch(toggleModalAddOpen(true));
            }}
          >
            <Icon id={"#icon-add"} width={20} height={20} color={"#f9f9f9"} />
          </AddButton>
        )}

        <SuperheroList />
      </ListContainer>

      {totalPages > 1 && <Pagination totalPages={totalPages} />}

      <Modal isOpen={VIEW_EDIT_FORM} style={modalStyles}>
        {viewEditForm && <EditForm />}
      </Modal>

      <Modal isOpen={VIEW_ADD_FORM} style={modalStyles}>
        {viewAddForm && <AddForm />}
      </Modal>

      <Modal isOpen={VIEW_MODAL_IMAGE} style={modalStyles}>
        {viewImageModal && imageToImageModal && <ImageModal />}
      </Modal>

      <Toaster position="top-right" reverseOrder={false} />
    </AppContainer>
  );
};

export default App;
