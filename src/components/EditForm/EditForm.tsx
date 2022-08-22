// import libs
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// redux
import superheroesOperations from "../../redux/superheroes/superheroOperations";
import { toggleModalEditOpen } from "../../redux/global/globalSlice";

// components
import Loader from "../Loader/Loader";
import Icon from "../Icon/Icon";

// styled components
import {
  ButtonClose,
  ButtonUpdate,
  EditorContainer,
  ErrorMessage,
  Field,
  FieldContainer,
  Form,
  Label,
  Title,
} from "./EditForm.styled";
import IState from "../../interfaces/state.interface";
import { AppDispatch } from "../../redux/store";

type FormValues = {
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
};

const EditForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentSuperhero = useSelector(
    (state: IState) => state.superheroes.currentSuperhero
  );
  const page = useSelector((state: IState) => state.superheroes.page);
  const limit = useSelector((state: IState) => state.superheroes.limit);

  const { nickname, real_name, origin_description, superpowers, catch_phrase } =
    currentSuperhero;

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
    const updatedSuperhero = {
      nickname,
      real_name: realName,
      origin_description: originDescription,
      superpowers: superpowers,
      catch_phrase: catchPhrase,
    };
    const superheroId = currentSuperhero._id;

    await dispatch(
      superheroesOperations.updateSuperhero({ superheroId, updatedSuperhero })
    );

    await dispatch(superheroesOperations.listSuperheroes({ page, limit }));

    await dispatch(toggleModalEditOpen(false));
  };

  const status = useSelector((state: IState) => state.superheroes.status);
  const PENDING = status === "pending";
  const RESOLVED = status === "resolved";

  return (
    <EditorContainer>
      <ButtonClose
        type="button"
        onClick={() => {
          dispatch(toggleModalEditOpen(false));
        }}
      >
        <Icon id={"#icon-cross"} width={20} height={20} color={"#f9f9f9"} />
      </ButtonClose>

      <Title>Change Superhero</Title>

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
                value: nickname,
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
                value: real_name,
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
                value: origin_description,
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
                value: superpowers,
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
                value: catch_phrase,
              })}
            />
          </Label>
          <ErrorMessage>
            {errors?.catchPhrase && (
              <p>{errors?.catchPhrase?.message || "Error!"}</p>
            )}
          </ErrorMessage>
        </FieldContainer>
        <div>
          {PENDING && <Loader color={"white"} />}
          {RESOLVED && (
            <ButtonUpdate type="submit" value="Update" disabled={!isValid} />
          )}
        </div>
      </Form>
    </EditorContainer>
  );
};

export default EditForm;
