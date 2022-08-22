import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, API_SUPERHEROES } from "../../config";
import toast from "react-hot-toast";
import IAddSuperhero from "../../interfaces/addSuperhero.interface";
import IImage from "../../interfaces/image.interface";
const notifySuccess = (message: string) => toast.success(message);
const notifyError = (message: string) => toast.error(message);

type ListData = { page?: number; limit?: number };

const listSuperheroes = createAsyncThunk(
  "superheroes/listSuperheroes",
  async ({ page, limit }: ListData) => {
    const currentPage = page ? page : 1;
    const limitHeroes = limit ? limit : 5;
    try {
      const { data } = await axios.get(
        `${BASE_URL}/${API_SUPERHEROES}?page=${currentPage}&limit=${limitHeroes}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const addSuperhero = createAsyncThunk(
  "superheroes/addSuperhero",
  async (newSupehero: IAddSuperhero) => {
    try {
      await axios.post(`${BASE_URL}/${API_SUPERHEROES}`, newSupehero);
      notifySuccess("Superhero is created");
    } catch (error) {
      notifyError("Error adding superhero");
      throw error;
    }
  }
);

const deleteSuperhero = createAsyncThunk(
  "superheroes/deleteSuperhero",
  async (superheroId: string) => {
    try {
      await axios.delete(`${BASE_URL}/${API_SUPERHEROES}/${superheroId}`);
      notifySuccess("Superhero is removed");
    } catch (error) {
      notifyError("Error deleting superhero");
      throw error;
    }
  }
);

const getSuperheroById = createAsyncThunk(
  "superheroes/getSuperheroById",
  async (superheroId: string) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/${API_SUPERHEROES}/${superheroId}`
      );
      return data;
    } catch (error) {
      notifyError(`Not found superhero`);
      throw error;
    }
  }
);

type UpdateSuperheroData = {
  superheroId: string;
  updatedSuperhero: IAddSuperhero;
};

const updateSuperhero = createAsyncThunk(
  "superheroes/changeSuperhero",
  async ({ superheroId, updatedSuperhero }: UpdateSuperheroData) => {
    try {
      await axios.put(
        `${BASE_URL}/${API_SUPERHEROES}/${superheroId}`,
        updatedSuperhero
      );
      notifySuccess("Superhero is updated");
    } catch (error) {
      notifyError("Error changed superhero");
      throw error;
    }
  }
);

interface IAddImageData {
  superheroId: string;
  formData: {};
}

const addSuperheroImage = createAsyncThunk(
  "superheroes/addSuperheroImage",
  async (data: IAddImageData) => {
    try {
      await axios.patch(
        `${BASE_URL}/${API_SUPERHEROES}/${data.superheroId}`,
        data.formData
      );
      notifySuccess("New image added");
    } catch (error) {
      notifyError("Error add image");
      throw error;
    }
  }
);

interface IDeleteImageData {
  // template
  superhero: {
    _id: string;
    avatar: string;
    nickname: string;
    real_name: string;
    origin_description: string;
    superpowers: string;
    catch_phrase: string;
  };
  image: IImage;
}

const deleteSuperheroImage = createAsyncThunk(
  "superheroes/deleteSuperheroImage",
  async (data: IDeleteImageData) => {
    const superheroId = data.superhero._id;
    const imageId = data.image.id;
    try {
      await axios.delete(
        `${BASE_URL}/${API_SUPERHEROES}/${superheroId}/${imageId}`
      );
      notifySuccess("Image removed");
    } catch (error) {
      notifyError("Image deletion error");
      throw error;
    }
  }
);

const superheroesOperations = {
  listSuperheroes,
  addSuperhero,
  deleteSuperhero,
  getSuperheroById,
  updateSuperhero,
  addSuperheroImage,
  deleteSuperheroImage,
};

export default superheroesOperations;
