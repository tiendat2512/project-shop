import styled from "styled-components";
import ButtonComponent from "../../Components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
display:flex;
align -item:center;
gap: 24px;
justify-content: flex-start;
height:20px


`
export const WrapperButtonMore = styled(ButtonComponent)`
   &:hover{
    color:#fff;
    background:rgb(13,92,182);
    span{
        color:#fff;
    }
    width:100%;
    text-align:center;
    color: #9255FD;
   cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'};

`
export const WrapperProduct =styled.div`
 display: flex;
 padding-left:6px;
 gap:14px;
 margin-top:20px;
 flex-wrap:wrap;
`