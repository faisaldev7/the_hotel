/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-labels */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";

import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateBooking } from "./useCreateBooking";
import { useEditBooking } from "./useEditBooking";
import Heading from "../../ui/Heading";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";
import { useCabins } from "../cabins/useCabins";
import { useGuests } from "../guests/useGuests";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function CreateBooking({ onCloseModal }) {
  const { isLoading: isLoadingCabins, cabins } = useCabins();
  const { isLoading: isLoadingGuests, guests } = useGuests();
  const { isLoading, booking } = useBooking();
  const { isCreating, createBooking } = useCreateBooking();
  const { isEditing, editBooking } = useEditBooking();

  const { id: editId, ...editValues } = booking || {};

  const isEditSession = booking && booking?.id;

  const { register, handleSubmit, reset, formState, setValue } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  if (isLoading || isLoadingCabins || isLoadingGuests) return <Spinner />;

  const { errors } = formState;

  const isWorking =
    isCreating || isEditing || isLoadingGuests || isLoadingCabins;

  function onSubmit(data) {
    if (booking && booking?.id)
      editBooking(
        { newBookingData: { ...data }, id: editId },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    else
      createBooking(
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
        {isEditSession ? "Edit booking" : "Add new booking"}
      </Heading>
      <Form onSubmit={handleSubmit(onSubmit)} type="regular">
        <FormRow label="Status" error={errors?.status?.message}>
          <StyledSelect {...register("status")} defaultValue={booking?.status}>
            <option value="checked-out">Checked out</option>
            <option value="checked-in">Checked in</option>
            <option value="unconfirmed">Unconfirmed</option>
          </StyledSelect>
        </FormRow>
        <FormRow label="Cabin" error={errors?.cabinId?.message}>
          <StyledSelect
            {...register("cabinId")}
            defaultValue={booking?.cabinId}
          >
            {cabins.map((cabin) => (
              <option key={cabin.id} value={cabin.id}>
                {cabin.name}
              </option>
            ))}
          </StyledSelect>
        </FormRow>
        <FormRow label="Guest" error={errors?.guestId?.message}>
          <StyledSelect
            {...register("guestId")}
            defaultValue={booking?.guestId}
            disabled={isWorking}
          >
            {guests.map((guest) => (
              <option key={guest.id} value={guest.id}>
                {guest.fullName}
              </option>
            ))}
          </StyledSelect>
        </FormRow>
        <FormRow label="No of Nights" error={errors?.numNights?.message}>
          <Input
            type="number"
            disabled={isWorking}
            defaultValue={booking?.numNights}
            id="numNights"
            {...register("numNights", { required: "This field is required" })}
          />
        </FormRow>
        <FormRow label="No of Guests" error={errors?.numGuests?.message}>
          <Input
            type="number"
            disabled={isWorking}
            defaultValue={booking?.numGuests}
            id="numGuests"
            {...register("numGuests", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Start Date" error={errors?.startDate?.message}>
          <Input
            type="date"
            disabled={isWorking}
            id="startDate"
            defaultValue={booking?.startDate}
            {...register("startDate", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="End Date" error={errors?.endDate?.message}>
          <Input
            type="date"
            disabled={isWorking}
            id="endDate"
            defaultValue={booking?.endDate}
            {...register("endDate", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Breakfast" error={errors?.hasBreakfast?.message}>
          <StyledSelect
            {...register("hasBreakfast")}
            defaultValue={booking?.hasBreakfast}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </StyledSelect>
        </FormRow>

        <FormRow label="Payment Complete" error={errors?.isPaid?.message}>
          <StyledSelect {...register("isPaid")} defaultValue={booking?.isPaid}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </StyledSelect>
        </FormRow>

        <FormRow label="Cabin Price" error={errors?.cabinPrice?.message}>
          <Input
            type="float"
            disabled={isWorking}
            defaultValue={booking?.cabinPrice}
            id="cabinPrice"
            {...register("cabinPrice", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Extra Price" error={errors?.extrasPrice?.message}>
          <Input
            type="float"
            disabled={isWorking}
            defaultValue={booking?.extrasPrice}
            id="extrasPrice"
            {...register("extrasPrice", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Total Price" error={errors?.totalPrice?.message}>
          <Input
            type="float"
            disabled={isWorking}
            defaultValue={booking?.totalPrice}
            id="totalPrice"
            {...register("totalPrice", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Observations" error={errors?.observations?.message}>
          <Input
            type="text"
            disabled={isWorking}
            id="observations"
            defaultValue={booking?.observations}
            {...register("observations")}
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
            {isEditSession ? "Edit booking" : "Create new booking"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateBooking;
