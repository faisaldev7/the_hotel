/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import styled from "styled-components";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

function MenuItem({ item }) {
  const { id, name, unitPrice, soldOut, image } = item;

  const dispatch = useDispatch();

  const currentQuantity = useSelector(getCurrentQuantityById(id));

  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    console.log(id);
    const newItem = {
      id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-6 py-6">
      <Img
        src={image}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-bold">{name}</p>
        <div className="mt-auto flex flex-grow items-center justify-between">
          {!soldOut ? (
            <p className="text-xl font-medium text-stone-700">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-xl font-semibold uppercase text-stone-600">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="mr-10  flex items-end gap-3 sm:gap-8">
              <UpdateItemQuantity id={id} currentQuantity={currentQuantity} />
              <DeleteItem id={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button type="primary" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
