import {useState, useEffect, createContext} from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState([]); // array para guardar los libros
    const [totalQuantity , setTotalQuantity] = useState(0); //cantidad de libros en el carrito
    const [totalAmount , setTotalAmount] = useState(); //precio total del carrito

    useEffect(()=>{
        let totalQuantity=0;
        let totalAmount=0;

        cart.forEach(book => {
            totalQuantity += book.quantity;
            totalAmount+=book.price*book.quantity;
        })
        setTotalQuantity(totalQuantity);
        setTotalAmount(totalAmount);
    },[cart])


    const addBook =(bookToAdd)=>{
        if(!isInCart(bookToAdd.id)){
            setCart([...cart,bookToAdd]);
        }else{
            console.log(`This book is alredy in the cart, idBook:${bookToAdd.id}`)
        };
    };

    const removeBook = (id) => {
        console.log(`Remove idBook:${id}`);
        const cartWithoutBook = cart.filter(book => book.id !== id);
        setCart(cartWithoutBook);
    };

    const clearCart = ()=> {
        console.log(`clean cart`)
        setCart([]);
    }

    const isInCart = (id)=>{
        return cart.some(book => book.id === id);
    };

    return(
        <CartContext.Provider value={{
            cart,
            totalQuantity,
            addBook,
            removeBook,
            clearCart,
            isInCart,
            totalAmount,
        }}>
            {/*toda la app tendra acceso a las variables*/}
            {children}
        </CartContext.Provider>
    )
}


export default CartContext;