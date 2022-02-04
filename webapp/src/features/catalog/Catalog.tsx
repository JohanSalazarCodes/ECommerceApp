
import { useEffect } from 'react';

import ProductList from './ProductList';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppSelector, useAppDispatch } from '../../app/store/configureStore';
import { productSelectors, fetchProductsAsync } from './catalogSlice';



export default function Catalog() {

  const products = useAppSelector(productSelectors.selectAll);
  const {productsLoaded, status} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
   
    if (!productsLoaded) {dispatch(fetchProductsAsync());}
  }, [dispatch, productsLoaded]);

  if (status.includes('pending')) return <LoadingComponent message='Loading products...'/>

  return (
    <>
      <ProductList products={products} />
    </>
  )
}