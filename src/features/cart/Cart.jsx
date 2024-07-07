// import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'
import {clearCart} from '../cart/cartSlice'
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cart = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  if(!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menus">
        &larr; Back to menu
      </LinkButton>

      <h2 className="mt-7 text-2xl font-semibold">Your cart</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button onClick={() => navigate("/orders/new")} type='primary'>Order</Button>
        <Button type='secondary' onClick={() => dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
