import React, { useEffect, useState } from 'react'
import { WrapperContainerRight, WrapperContainerleft, Wrappertextline } from './Styled'
import InputForm from '../../Components/InputForm/InputForm'
import ButtonComponent from '../../Components/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import imageLogo from '../../img/logo-login.png'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../Services/UserService'
import { useMutationHooks } from '../../Hooks/UseMutation'
import Loading from '../../Components/LoadingComponent/Loading'
import * as message from '../../Components/Message/Message'
const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }


  const mutation = useMutationHooks(
    data => UserService.signUpUser(data)
  )

  const { data, isPending, isError, isSuccess } = mutation

  useEffect(() => {
    if (isSuccess) {
      message.success()
      handleNavigateSignIn()
    }else if(isError){
      message.error()
    }

  }, [isError, isSuccess])

  const navigate = useNavigate()

  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  }
  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword })
  }

  return (
  
    <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center', backgroundColor: '#ccc', height: '100vh' }}>

      <div style={{ width: '800px', height: '445px', borderRadius: '6px', backgroundColor: 'white', display: 'flex' }}>
        <WrapperContainerleft>
          <h1>Xin Chao</h1>
          <p style={{ fontSize: '20px' }}>Lap tai khoan </p>
          <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm placeholder="password" style={{ marginBottom: '10px' }} type={isShowPassword ? "text" : "password"}
              value={password} onChange={handleOnchangePassword}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowConfirmPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm placeholder="confirm password" type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword} onChange={handleOnchangeConfirmPassword}
            />
          </div>
          {data?.status === 'Err' && <span>{data?.message}</span>}
          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length || !confirmPassword.length}
              onClick={handleSignUp}

              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px'
              }}
              // onClick={handleAddOrderProduct}
              textbutton={' Dang Ky '}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </Loading>
          {/* {errorLimitOrder && <div style={{ color: 'red' }}>San pham het hang</div>} */}

          <p>Ban da co tai khoan? <Wrappertextline onClick={handleNavigateSignIn}>Dang Nhap</Wrappertextline></p>
        </WrapperContainerleft>

        <WrapperContainerRight>

          <Image src={imageLogo} preview={false} alt="iamge-logo" height="203px" width="203px" />
          <h4>Mua Sam Tai Shop</h4>

        </WrapperContainerRight>
      </div>
    </div>
  )
}

export default SignUpPage