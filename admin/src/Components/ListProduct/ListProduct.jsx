// import React from 'react'
// import './ListProduct.css'
// import cross_icon from '../../assets/cross_icon.png'
// import { useState } from 'react'
// import { useEffect } from 'react'

// const ListProduct = () => {
//   const [allproducts,setallproducts]=useState([]);

//   const fetchInfo=async()=>{
//     await fetch('http://localhost:3001/allproducts')
//     .then((res)=>res.json())
//     .then((data)=>{setallproducts(data)});
//   }

//   useEffect(()=>{
//     fetchInfo();

//   },[])
//   return (
//     <div className='list-product'>
//       <h1>All Products List</h1>
//       <div className="listproduct-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Old Price</p>
//         <p>New Price</p>
//         <p>Category</p>
//         <p>Remove</p>
//       </div>
//       <div className="listproduct-allproducts">
//         <hr/>
//         {allproducts.map((product, index) => {
//   console.log("Product Image URL:", product.image); // This will show the image URL in the console
//   return<>(
//     <div key={index} className="listproduct-format-main listproduct-format">
//       <img src={product.image} alt={product.name} className="listproduct-product-icon" />
//       <p>{product.name}</p>
//       <p>${product.old_price}</p>
//       <p>${product.new_price}</p>
//       <p>{product.category}</p>
//       <img className="listproduct-remove-icon" src={cross_icon} alt="remove" />
//     </div>
//     <hr/>
//     </> 
//   );
// })}


//       </div>
      
//     </div>
//   )
// }

// export default ListProduct


import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const res = await fetch('http://localhost:3001/allproducts');
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    try {
      await fetch('http://localhost:3001/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
      await fetchInfo();
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  return (
    <div className='list-product'>
      <h1>All Products List</h1>

      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className="listproduct-format-main listproduct-format">
              <img src={product.image} alt={product.name} className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>Rs {product.old_price}</p>
              <p>Rs {product.new_price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => remove_product(product.id)}
                className="listproduct-remove-icon"
                src={cross_icon}
                alt="remove"
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
