import { Link } from "react-router-dom"
import {useSelector} from 'react-redux'
import {getTotalCartPrice, getTotalCartQuantity} from './cartSlice'
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity)
  const totalCartPrice = useSelector(getTotalCartPrice)

  if (!totalCartQuantity) return null

  return (
    <div className="flex items-center justify-between bg-indigo-800 px-4 py-4 text-sm text-stone-200 uppercase sm:px-6 md:text-base">
      <p className="space-x-4 text-stone-300 font-semibold sm:space-x-6">
        <span>{totalCartQuantity} items</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
       <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
