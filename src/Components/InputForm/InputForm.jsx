
import React from 'react'
import { WrapperInput } from './Stylde'

const InputForm = (props) => {
    const { placeholder = 'Nhap text', value, ...rests } = props
    const handleOnchangeInput = (e) => {
        props.onChange(e.target.value)
    }

    return (
        <>
            <WrapperInput placeholder={placeholder} valueinput={props.value} {...rests} onChange={handleOnchangeInput} />
        </>

    )
}

export default InputForm