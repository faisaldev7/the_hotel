import OrderHistoryRow from "./OrderHistoryRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useOrderHistories } from "./useOrderHistories";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function OrderHistoryTable() {
  const { isLoading, order_histories, count } = useOrderHistories();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="1.2fr 1.2fr 3.5fr 1.4fr">
        <Table.Header>
          <div>Order ID</div>
          <div>Booking ID</div>
          <div>Cart</div>
          <div>Amount</div>
        </Table.Header>

        <Table.Body
          data={order_histories}
          render={(order_history) => (
            <OrderHistoryRow
              key={order_history.id}
              order_history={order_history}
            />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default OrderHistoryTable;
