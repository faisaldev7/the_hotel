import GuestTable from "../features/guests/GuestTable";
import Button from "../ui/Button";
// import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useNavigate } from "react-router-dom";

function Guests() {
  const navigate = useNavigate();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All guests</Heading>
        {/* <BookingTableOperations /> */}
      </Row>
      <GuestTable />
      <Button onClick={() => navigate(`/guests/new`)}>Add guest</Button>
    </>
  );
}

export default Guests;
