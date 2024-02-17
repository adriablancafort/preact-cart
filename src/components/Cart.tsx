import { useStore } from '@nanostores/preact';
import { isCartOpen, numberOfItems, cartSubtotal, cartItems } from '../stores/Cart';
import  CartItem  from './CartItem';

export default function Cart() {
    const $isCartOpen = useStore(isCartOpen);
    const $numberOfItems = useStore(numberOfItems);
    const $cartSubtotal = useStore(cartSubtotal);
    const $cartItems = useStore(cartItems);

    return $isCartOpen ? (
        <aside>
            <p>Number of items: {$numberOfItems}</p>
            <p>Cart subtotal: ${$cartSubtotal.toFixed(2)}</p>
            <ul>
                {$cartItems.map((item) => (
                    item && <CartItem key={item.id} item={item} />
                ))}
            </ul>
        </aside>
    ) : null;
}