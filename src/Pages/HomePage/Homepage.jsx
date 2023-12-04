import React, { useEffect, useRef, useState } from 'react'
import { TypeProducts } from '../../Components/TypeProducts/TypeProducts'
import { WrapperButtonMore, WrapperProduct, WrapperTypeProduct } from './styled'
import SlideComponent from '../../Components/SliderComponent/SlideComponent'
import slider1 from '../../img/tải xuống.webp'
import slider2 from '../../img/slider2.webp'
import slider3 from '../../img/slider3.webp'
import CardComponent from '../../Components/CardComponent/CardComponent'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../Services/ProductService'
import { useSelector } from 'react-redux'
import Loading from '../../Components/LoadingComponent/Loading'
import { useDebounceHooks } from '../../Hooks/useDebounce'
const Homepage = () => {
  const searchProduct = useSelector((state) => state.product.search)
  const [pending, setPending] = useState(false)
  const [limit, setLimit] = useState(6)
  const [typeProducts,setTypeProducts]=useState([])
  const searchDebounce = useDebounceHooks(searchProduct, 1000)

  const fetchProductAll = async (context) => {
    try {
      const limit = context?.queryKey && context?.queryKey[1]
      const search = context?.queryKey && context?.queryKey[2]
      const res = await ProductService.getAllProducts(search, limit);
      return res

    } catch (error) {
      throw new Error('Error fetching products');
    }
  };
  const fetchAllTypeProduct = async()=>{
    const res = await ProductService.getAllTypeProduct()
    if(res.status === 'OK'){
      setTypeProducts(res?.data)

    }
  }


  const { isPending, data: products, isPreviousData } = useQuery({
    queryKey: ['product', limit, searchDebounce],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true
  });

  useEffect(()=>{
    fetchAllTypeProduct()
  },[])

 
  return (
    <>
      <Loading isLoading={isPending}>
        <div style={{ padding: '0 120px' }}>
          <WrapperTypeProduct style={{ paddingTop: '10px' }}>
            {typeProducts?.map((item) => {
              return (
                <TypeProducts name={item} key={item} />
              )
            })}
          </WrapperTypeProduct>
        </div>
        <div className='body' style={{ width: '100%', backgroundColor: '#efefef', }}>
          <div id="container" >
            <div id="container" style={{ backgroundColor: '#efefef', padding: '0 120px', height: '2000px' }}>
              <SlideComponent arrImages={[slider1, slider2, slider3]} />
              <WrapperProduct >
                {products?.data?.map((product) => {
                  return (
                    <CardComponent
                      key={product._id}
                      countInStock={product.countInStock}
                      description={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      type={product.type}
                      selled={product.selled}
                      discount={product.discount}
                      id={product._id}
                    />
                  )
                })}

              </WrapperProduct>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>

                < WrapperButtonMore textbutton={isPreviousData ? 'Đang Tải ...' : "Xem thêm"}  type="outline" styleButton={{
                  border: `1px solid ${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`,
                  color:  `${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`,
                  width: '240px',
                  height: '38px',
                  boderRadius: '4px',

                }}
                  disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                  styleTextButton={{ fontWeight: '500',color: products?.total === products?.data?.length && '#fff' }}
                  onClick={() => setLimit((prev) => prev + 6)} />
              </div>
            </div>
          </div>

        </div>
      </Loading>
    </>
  )
}

export default Homepage