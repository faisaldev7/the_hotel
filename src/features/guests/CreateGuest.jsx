/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";

import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateGuest } from "./useCreateGuest";
import { useEditGuest } from "./useEditGuest";
import Heading from "../../ui/Heading";
import { useGuest } from "./useGuest";
import Spinner from "../../ui/Spinner";

function CreateGuest({ onCloseModal }) {
  const { isLoading, guest } = useGuest();
  const { isCreating, createGuest } = useCreateGuest();
  const { isEditing, editGuest } = useEditGuest();

  const { id: editId, ...editValues } = guest || {};

  const isEditSession = guest && guest.id;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  if (isLoading) return <Spinner />;

  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession)
      editGuest(
        { newGuestData: { ...data }, id: editId },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    else
      createGuest(
        { ...data },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
  }

  return (
    <>
      <Heading as="h1">
        {isEditSession ? "Edit guest" : "Add new guest"}
      </Heading>
      <Form onSubmit={handleSubmit(onSubmit)} type="regular">
        <FormRow label="Guest name" error={errors?.fullName?.message}>
          <Input
            type="text"
            disabled={isWorking}
            id="fullName"
            defaultValue={guest?.fullName}
            {...register("fullName", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Email" error={errors?.email?.message}>
          <Input
            type="text"
            disabled={isWorking}
            id="email"
            defaultValue={guest?.email}
            {...register("email", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Nationality" error={errors?.nationality?.message}>
          <Input
            type="text"
            id="nationality"
            disabled={isWorking}
            defaultValue={guest?.nationality}
            {...register("nationality", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="National ID" error={errors?.nationalId?.message}>
          <Input
            type="number"
            disabled={isWorking}
            defaultValue={guest?.nationalId}
            id="nationalId"
            {...register("nationalId", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? "Edit guest" : "Create new guest"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateGuest;
