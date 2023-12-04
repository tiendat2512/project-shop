import { Image } from 'antd'
import React from 'react'
import { WrapperSliderStyle } from './Stylded'

const SlideComponent = ({arrImages}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoPlay:true,
    autoPlaySpeed:3000
  }
  return (
    <WrapperSliderStyle {...settings}>
      {arrImages.map((image) => {
        return(
          <Image key={image} src={image} alt = "slider" autoPlay={true} preview={false} width='100%' />
        )
      })}

    </WrapperSliderStyle>
  )
}

export default SlideComponent