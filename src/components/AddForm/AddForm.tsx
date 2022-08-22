// import libs
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

// redux
import superheroesOperations from "../../redux/superheroes/superheroOperations";
// import { FuncDispatch } from "../../redux/store";

// styled components
import {
  ButtonAdd,
  ButtonClose,
  ErrorMessage,
  Field,
  FieldContainer,
  Form,
  FormContainer,
  Label,
  Title,
} from "./AddForm.styled";

// components
import Loader from "../Loader/Loader";
import { toggleModalAddOpen } from "../../redux/global/globalSlice";
import Icon from "../Icon/Icon";
import { AppDispatch } from "../../redux/store";
import IState from "../../interfaces/state.interface";
import IAddSuperhero from "../../interfaces/addSuperhero.interface";

type FormValues = {
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
};

const AddForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    const { nickname, realName, originDescription, superpowers, catchPhrase } =
      data;
    const superhero: IAddSuperhero = {
      nickname,
      real_name: realName,
      origin_description: originDescription,
      superpowers: superpowers,
      catch_phrase: catchPhrase,
    };

    await dispatch(superheroesOperations.addSuperhero(superhero)); // add new super hero
    await dispatch(superheroesOperations.listSuperheroes({})); // refresh list hero
    await dispatch(toggleModalAddOpen(false));
  };

  const status = useSelector((state: IState) => state.superheroes.status);
  const PENDING = status === "pending";
  const RESOLVED = status === "resolved";

  return (
    <FormContainer>
      <ButtonClose
        type="button"
        onClick={() => {
          dispatch(toggleModalAddOpen(false));
        }}
      >
        <Icon id={"#icon-cross"} width={20} height={20} color={"#f9f9f9"} />
      </ButtonClose>
      <Title>Add new Superhero</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FieldContainer>
          <Label>
            Nickname:
            <Field
              {...register("nickname", {
                required: "Field is required.",
                minLength: {
                  value: 3,
                  message: "Minimum length 3 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Maximum length 15 characters",
                },
              })}
            />
          </Label>
          <ErrorMessage>
            {errors?.nickname && <p>{errors?.nickname?.message || "Error!"}</p>}
          </ErrorMessage>
        </FieldContainer>

        <FieldContainer>
          <Label>
            Real Name:
            <Field
              {...register("realName", {
                required: "Field is required.",
                minLength: {
                  value: 3,
                  message: "Minimum length 3 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Maximum length 15 characters",
                },
              })}
            />
          </Label>
          <ErrorMessage>
            {errors?.realName && <p>{errors?.realName?.message || "Error!"}</p>}
          </ErrorMessage>
        </FieldContainer>

        <FieldContainer>
          <Label>
            Description:
            <Field
              {...register("originDescription", {
                required: "Field is required.",
                minLength: {
                  value: 10,
                  message: "Minimum length 10 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Maximum length 50 characters",
                },
              })}
            />
          </Label>
          <ErrorMessage>
            {errors?.originDescription && (
              <p>{errors?.originDescription?.message || "Error!"}</p>
            )}
          </ErrorMessage>
        </FieldContainer>
        <FieldContainer>
          <Label>
            Superpowers:
            <Field
              {...register("superpowers", {
                required: "Field is required.",
                minLength: {
                  value: 3,
                  message: "Minimum length 3 characters",
                },
                maxLength: {
                  value: 25,
                  message: "Maximum length 25 characters",
                },
              })}
            />
          </Label>
          <ErrorMessage>
            {errors?.superpowers && (
              <p>{errors?.superpowers?.message || "Error!"}</p>
            )}
          </ErrorMessage>
        </FieldContainer>

        <FieldContainer>
          <Label>
            Catch phrase:
            <Field
              {...register("catchPhrase", {
                required: "Field is required.",
                minLength: {
                  value: 3,
                  message: "Minimum length 3 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Maximum length 15 characters",
                },
              })}
            />
          </Label>
          <ErrorMessage>
            {errors?.catchPhrase && (
              <p>{errors?.catchPhrase?.message || "Error!"}</p>
            )}
          </ErrorMessage>
        </FieldContainer>

        {PENDING && <Loader color="white" />}
        {RESOLVED && (
          <ButtonAdd type="submit" value="Add" disabled={!isValid} />
        )}
      </Form>
    </FormContainer>
  );
};

export default AddForm;
