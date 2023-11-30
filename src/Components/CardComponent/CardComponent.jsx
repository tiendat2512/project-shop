import { Card } from 'antd'
import React from 'react'
import { StyleNameProduct, WrapperCarStyle, WrapperDiscount, WrapperPrice, WrapperReportText, WrapperStyleTextSell } from './style';
import { StarFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-detail/${id}`)
    }
    return (
        <WrapperCarStyle
            hoverable
            headStyle={{ width: '200px', height: '200px' }}
            style={{ width: 200 }}
            cover={<img alt="example" src={image} />}
            onClick={() => countInStock !== 0 && handleDetailsProduct(id)}
            disabled={countInStock === 0}
        >
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>{rating}</span><StarFilled style={{ fontSize: '15px', color: 'yellow' }} />
                </span>
                <WrapperStyleTextSell> | {selled || 1000} đã bán</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPrice>
                {price?.toLocaleString()} VND
                <WrapperDiscount>
                    - {discount || 5}%
                </WrapperDiscount>
            </WrapperPrice>

        </WrapperCarStyle>

    )
}

export default CardComponent