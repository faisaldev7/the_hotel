import GuestRow from "./GuestRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useGuests } from "./useGuests";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function GuestTable() {
  const { isLoading, guests, count } = useGuests();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="2fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Name</div>
          <div>Email</div>
          <div>Nationality</div>
          <div>National ID</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={guests}
          render={(guest) => <GuestRow key={guest.id} guest={guest} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestTable;
