/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

function UpdateItemQuantity({ id, currentQuantity }) {
    const base =
    'inline-block text-xl rounded-full bg-indigo-700 font-bold uppercase tracking-wide text-stone-100 transition-colors duration-300 hover:bg-indigo-800 focus:bg-indigo-300 focus:outline-none focus:ring focus:ring-indigo-400 focus:ring-offset-2 disabled:cursor-not-allowed';
    
    const dispatch = useDispatch();

  return (
    <div className="flex gap-2 mb-4 md:gap-3">
      <button
        className={`${base} px-2.5 py-1 md:px-3.5 md:py-2 text-sm`}
        onClick={() => dispatch(decreaseItemQuantity(id))}
      >
        -
      </button>
      
      <span className="text-xl font-medium mt-2">{currentQuantity}</span>
      <button
        className={`${base} px-2.5 py-1 md:px-3.5 md:py-2 text-sm`}
        onClick={() => dispatch(increaseItemQuantity(id))}
      >
        +
      </button>
    </div>
  );
}

export default UpdateItemQuantity;
