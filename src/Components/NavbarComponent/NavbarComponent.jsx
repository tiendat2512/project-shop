import React from 'react'
import { WrapperContentValue, WrapperLabelText, WrapperTextPrice, WrapperTextValue } from './styled'
import { Checkbox, Rate } from 'antd'

const NavbarComponent = () => {
  const onChange = () => { }
  const renderContent = (type, options) => {
    switch (type) {
      case 'text':
        return options.map((option) => {
          return (
            <WrapperTextValue>{option}</WrapperTextValue>

          )
        })
      case 'checkbox':
        return (
          <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
            {options.map((option) => {
              return (
                <Checkbox value={option.value}>{option.lable}</Checkbox>
              )
            })}
            
         </Checkbox.Group >

        )
      case 'star':
        return options.map((option) => {
          return (
            <>
            <div style={{display:'flex',gap:'4px'}}>

            <Rate style={{fontSize:'12px'}} disabled defaultValue={option} />
            <span>{`Tu ${option} sao`}</span>
            </div>
            </>
          )})
      case 'price':
        return options.map((option) => {
          return (
            <WrapperTextPrice >
              {option}
            </WrapperTextPrice>

            
          )})
      default:
        return {}
    }
  }
  return (
    <div style={{background:'white'}}> 
      <WrapperLabelText>Label</WrapperLabelText>
      <WrapperContentValue>
        {renderContent('text', ['Tu Lanh', 'TV', 'May Giat'])}

      </WrapperContentValue>
      <WrapperContentValue>
        {renderContent('checkbox', [
          { value: 'a', lable: 'A' },
          { value: 'b', lable: 'B' }
        ])}
      </WrapperContentValue>
      <WrapperContentValue>
        {renderContent('star', [3, 4, 5])}
      </WrapperContentValue>
      <WrapperContentValue>
        {renderContent('price', ['duoi 40.000', 'tren 50.000'])}
      </WrapperContentValue>


    </div>
  )
}

export default NavbarComponent