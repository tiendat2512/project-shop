import React, { useEffect, useState } from 'react'
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent'
import CardComponent from '../../Components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavBar, WrapperProduct } from './styled'
import { useLocation } from 'react-router-dom'
import * as ProductServices from '../../Services/ProductService'
import Loading from '../../Components/LoadingComponent/Loading'
import { useSelector } from 'react-redux'
import { useDebounceHooks } from '../../Hooks/useDebounce'

const TypeProductpage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounceHooks(searchProduct, 500)
    const { state } = useLocation()
    const [products, setProducts] = useState([])
    const [pending, setPending] = useState(false)
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    })
    const fetchProductType = async (type, page, limit) => {
        setPending(true)
        const res = await ProductServices.getProductType(type, page, limit)
        if (res?.status === 'ok') {
            setPending(false)
            setProducts(res?.data)
            setPanigate({ ...panigate, total: res?.totalPage })
        } else {
            setPending(false)
        }
    }
    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit)
        }
    }, [state, panigate.page, panigate.limit])
    const onChange = ({ current, pageSize }) => {
        console.log({ current, pageSize });
        setPanigate({ ...panigate, page: current - 1, limit: pageSize })
    }
    return (
        <Loading isLoading={pending}>
            <div style={{ width: '100%', background: '#efefef', height: 'calc(100vh - 64px)' }}>
                <div style={{ width: '1270px', margin: '0 auto', height: '100%' }}>
                    <Row style={{ padding: '0 120px', background: '#efefef', flexWrap: 'nowrap', paddingTop: '20px' }}>

                        <WrapperNavBar span={4} >
                            <NavbarComponent />
                        </WrapperNavBar>
                        <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <WrapperProduct >
                                {products?.filter((pro)=>{
                                    if(searchDebounce===''){
                                        return pro
                                    }else if(pro?.name.toLowcase()?.includes(searchDebounce.toUpperCase())){
                                        return pro
                                    }
                                })?.map((product) => {
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
                                            id={product._id} />
                                    )

                                })}
                            </WrapperProduct>
                            <Pagination defaultCurrent={panigate.page + 1} total={panigate.total} onChange={onChange} style={{ textAlign: 'center', marginTop: '50px' }} />
                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>

    )
}

export default TypeProductpage