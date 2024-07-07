/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 600;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function OrderHistoryRow({
  order_history: { id: OrderHistoryId, booking_id, cart, amount },
}) {
  return (
    <Table.Row>
      <Stacked>
        <span>{OrderHistoryId}</span>
      </Stacked>

      <Stacked>
        <span>{booking_id}</span>
      </Stacked>

      <Stacked>
        {/* Render each item in the cart */}
        {cart.map((item, index) => (
          <div key={index}>
            <span>{item.name}</span> - Quantity: <span>{item.quantity}</span> -
            Total Price: <span>{formatCurrency(item.totalPrice)}</span>
          </div>
        ))}
      </Stacked>

      <Amount>
        <span>{formatCurrency(amount)}</span>
      </Amount>
    </Table.Row>
  );
}

export default OrderHistoryRow;
