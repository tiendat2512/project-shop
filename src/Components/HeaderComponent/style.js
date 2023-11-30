import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
  padding :10px 120px;
  background-color: rgb(26,148,255);
  gap:16px;
  flex-wrap:nowrap;

  padding: 10px 0;
 
  

`
export const WrapperHeaderTestHeader = styled.span`
    font-size:18px;
    color:white;
    font-weight:bold ;
   

  
`
export const WrapperHeaderAccount = styled.div`
   display :flex;
   align-item: center;
   padding: 0 20px;
   color:white;
   gap:10px;

`
export const WrapperTextHeaderSmall = styled.span`
 font-size:12px;
 color:white;
 white-space:nowrap
`
export const WrapperContentPopup = styled.p`
cursor:pointer;
&:hover{
  color:rgb(26,148,255);
}
`
export const WrapperLinkText = styled.a`
 color:white;
 text-decoration:none
 
`