const getIsModalAddOpen = (state) => state.global.isModalAddOpen;
const getIsModalEditOpen = (state) => state.global.isModalEditOpen;
const getIsModalImageOpen = (state) => state.global.isModalImageOpen;
const getImage = (state) => state.global.isImage;

const globalSelectors = {
  getIsModalAddOpen,
  getIsModalEditOpen,
  getIsModalImageOpen,
  getImage,
};

export default globalSelectors;
