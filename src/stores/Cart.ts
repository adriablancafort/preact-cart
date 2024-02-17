import { atom } from 'nanostores';
import type { CartItem } from '../types/CartItem';
import type { ProductCard } from '../types/ProductCard';
import { setLocalEncript, getLocalEncript } from './LocalEncript';

export const isCartOpen = atom(getLocalEncript('isCartOpen') || false);
export const numberOfItems = atom(getLocalEncript('numberOfItems') || 0);
export const cartSubtotal = atom(getLocalEncript('cartSubtotal') || 0);
export const cartItems = atom<CartItem[]>(getLocalEncript('cartItems') || []);

export function addToCart(product: ProductCard, quantity: number) {

    const item: CartItem = {
        id: product.id,
        url: product.url,
        image: product.image,
        title: product.title,
        color: product.color,
        variation: product.variation,
        price: product.price,
        quantity: quantity,
        salePrice: product.salePrice,
        stock: product.stock,
        message: product.message
    };

    const currentCartItems = cartItems.get();
    const existingItem = currentCartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        currentCartItems.unshift(item);
    }

    cartItems.set(currentCartItems);
    setLocalEncript('cartItems', cartItems.get());

    numberOfItems.set(numberOfItems.get() + quantity);
    setLocalEncript('numberOfItems', numberOfItems.get());

    cartSubtotal.set(parseFloat((cartSubtotal.get() + quantity * item.price).toFixed(2)));
    setLocalEncript('cartSubtotal', cartSubtotal.get());

    if (currentCartItems.length === 1) {
        isCartOpen.set(true);
        setLocalEncript('isCartOpen', true);
    }
}

export function deleteFromCart(item: CartItem) {
    const currentCartItems = cartItems.get();
    const existingItem = currentCartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
        const updatedCartItems = currentCartItems.filter((cartItem) => cartItem.id !== item.id);

        cartItems.set(updatedCartItems);
        setLocalEncript('cartItems', cartItems.get());

        numberOfItems.set(numberOfItems.get() - existingItem.quantity);
        setLocalEncript('numberOfItems', numberOfItems.get());

        cartSubtotal.set(parseFloat((cartSubtotal.get() - existingItem.quantity * existingItem.price).toFixed(2)));
        setLocalEncript('cartSubtotal', cartSubtotal.get());

        if (updatedCartItems.length === 0) {
            isCartOpen.set(false);
            setLocalEncript('isCartOpen', false);
        }
    }
}

export function updateQuantity(item: CartItem, quantity: number) {
    const currentCartItems = cartItems.get();
    const existingItem = currentCartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
        const quantityDifference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;

        cartItems.set(currentCartItems);
        setLocalEncript('cartItems', cartItems.get());

        numberOfItems.set(numberOfItems.get() + quantityDifference);
        setLocalEncript('numberOfItems', numberOfItems.get());

        cartSubtotal.set(parseFloat((cartSubtotal.get() + quantityDifference * existingItem.price).toFixed(2)));
        setLocalEncript('cartSubtotal', cartSubtotal.get());
    }
}