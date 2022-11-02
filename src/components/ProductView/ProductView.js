import { useState, useEffect } from 'react';
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import './ProductView.css'

function ProductView({ products }) {

  // TODO: Replace with state variable
  // localStorage.setItem() // getItem()
  const opened = localStorage.getItem('sideOpen')
  const product = localStorage.getItem('selectedProduct')

  const [sideOpen, setSideOpen] = useState(opened && opened === 'true')
  const [selectedProduct, setSelectedProduct] = useState(product ? products.find(p => p.id === Number(product)) : '')

  useEffect(() => {
    if(selectedProduct){
      localStorage.setItem('selectedProduct', selectedProduct.id)
      setSideOpen(true)
    }
  }, [selectedProduct])

  useEffect(() => {
    localStorage.setItem('sideOpen', sideOpen)
    if(!sideOpen) {
      localStorage.setItem('selectedProduct', null)
      setSelectedProduct()
    }
  }, [sideOpen])

  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map(item =>
            <ProductListItem
              key={item.id}
              product={item}
              onClick={() => setSelectedProduct(item)}
              isSelected={selectedProduct && item.id === selectedProduct.id}
            />
          )}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div className="product-side-panel-toggle"
               onClick={() => setSideOpen(!sideOpen)}>
            {sideOpen ? '>' : '<'}
          </div>
        </div>
        <ProductDetails visible={sideOpen} product={selectedProduct} />
      </div>
    </div>
  );
}

export default ProductView;
