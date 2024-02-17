

export default function ProductCard() {
    return (
        <li>
            <div className="skeleton" style="height: 200px; width: 200px;" ></div>

            <p>Title: </p>
            <p>Price: </p>
            <p>Sale Price: </p>
            <p>Color: </p>
            <p>Variation: </p>
            <p>Stock: </p>
            <p>Message: </p>

            <p>
                <input 
                    type="number" 
                    min="1"
                />
                <button>Add to cart</button>
            </p>
        </li>
    );
};
