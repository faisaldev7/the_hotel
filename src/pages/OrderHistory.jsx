import OrderHistoryTable from "../features/order_histories/OrderHistoryTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function OrderHistory() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Order History</Heading>
      </Row>
      <OrderHistoryTable />
    </>
  );
}

export default OrderHistory;
