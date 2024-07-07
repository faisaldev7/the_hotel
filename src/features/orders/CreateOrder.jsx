/* eslint-disable no-unused-vars */
import EmptyCart from "../cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";
import { useBookings } from "../bookings/useBookings";
import Button from "../../ui/Button";

import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import styled from "styled-components";
import Form from "../../ui/Form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEditBooking } from "../bookings/useEditBooking";
import { useCreateOrderHistory } from "../order_histories/useCreateOrderHistory";

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

function CreateOrder() {
  const { isLoading, bookings, count } = useBookings();

  const cart = useSelector((state) => state.cart.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalCartPrice = useSelector(getTotalCartPrice);

  const { register, handleSubmit, reset, formState } = useForm({});

  const { isEditing, editBooking } = useEditBooking();

  const { createOrderHistory } = useCreateOrderHistory();

  if (isLoading || isEditing) return <Spinner />;

  if (!cart.length) return <EmptyCart />;

  const { errors } = formState;

  function onSubmit(data) {
    const selectedBooking = bookings.find(
      (booking) => parseInt(booking.id) === parseInt(data.bookingId),
    );

    if (selectedBooking.status !== "checked-in") {
      toast.error(
        `Order cannot be created for ${selectedBooking.status} booking`,
      );
    } else {
      const newTotalPrice = selectedBooking.totalPrice + totalCartPrice;
      const newBreakfastPrice = selectedBooking.breakfastPrice + totalCartPrice;

      editBooking(
        {
          newBookingData: {
            totalPrice: newTotalPrice,
            breakfastPrice: newBreakfastPrice,
          },
          id: data.bookingId,
        },
        {
          onSuccess: () => {
            createOrderHistory({
              booking_id: data.bookingId,
              cart: cart,
              amount: totalCartPrice,
            });
            reset();
            dispatch(clearCart());
          },
        },
      );
    }
  }

  return (
    <>
      <div className="px-4 py-6">
        <h2 className="mb-8 text-2xl font-semibold">
          Ready to order? Lets go!
        </h2>
        <Form onSubmit={handleSubmit(onSubmit)} type="regular">
          <FormRow
            label="Booking ID"
            id="bookingId"
            error={errors?.bookingId?.message}
          >
            <StyledSelect
              {...register("bookingId", {
                required: "This field is required",
              })}
            >
              {bookings.map((booking) => (
                <option key={booking.id} value={booking.id}>
                  {booking.id}
                </option>
              ))}
            </StyledSelect>
          </FormRow>

          <FormRow>
            {/* type is an HTML attribute! */}
            <Button onClick={() => navigate("/menus")} type="primary">
              Cancel
            </Button>
            <Button disabled={isLoading}>
              Create new Order of {formatCurrency(totalCartPrice)}
            </Button>
          </FormRow>
        </Form>
      </div>
    </>
  );
}

export default CreateOrder;
