/* eslint-disable no-unused-vars */
import MenuItem from "../features/menus/MenuItem";
import { useMenus } from "../features/menus/useMenus";
import Heading from "../ui/Heading";
import FoodRow from "../ui/FoodRow";
import Spinner from "../ui/Spinner";
import LinkButton from "../ui/LinkButton";

function Menus() {
  const { isLoading, menus, count } = useMenus();

  if (isLoading) return <Spinner />;

  return (
    <>
      <FoodRow type="horizontal">
        <div className="flex grow justify-between">
          <div>
            <Heading as="h1">Menu</Heading>
          </div>
          <div className="mt-6 flex justify-normal pr-12">
            <LinkButton to="/order_histories">Order History</LinkButton>
          </div>
        </div>
        <ul className="mt-10 divide-y divide-stone-200 px-10">
          {menus.map((item) => (
            <MenuItem item={item} key={item.id} />
          ))}
        </ul>
      </FoodRow>
    </>
  );
}

export default Menus;
