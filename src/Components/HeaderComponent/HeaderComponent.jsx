import React, { useEffect, useState } from 'react';
import { Badge, Col, Popover } from 'antd';
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperHeaderTestHeader, WrapperLinkText, WrapperTextHeaderSmall } from './style';
import {
  CaretDownOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from '@ant-design/icons';
import ButttonInputSearch from '../ButtonInputComponent/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../Services/UserService'
import { resetUser } from '../../Redux/Slice/UserSlide'
import Loading from '../LoadingComponent/Loading';
import { searchProduct } from '../../Redux/Slice/ProductSlice';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [search, setSearch] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)

  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const order = useSelector((state) => state.order)

  useEffect(() => {
    setLoading(true)
    setUserName(user.name)
    setUserAvatar(user.avatar)
    setLoading(false)
  }, [user.name, user.avatar])



  const handleClickNavigate = (type) => {
    if (type === 'profile') {
      navigate('/profile')
    } else if (type === 'admin') {
      navigate('/system/admin')
    } else if (type === 'my-order') {
      navigate('/my-order', {
        state: {
          id: user?.id,
          token: user?.access_token
        }
      })
    } else {
      hanldeLogOut()
      
    }
    setIsOpenPopup(false)
  }

  const hanldeLogOut = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    localStorage.removeItem('access_token')
    
    setLoading(false)
  }

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (

        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
    </div>
  );
  const handleNavigateLogin = () => {
    navigate('/sign-in')
   

  }
  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))

  }
  return (
    <div style={{ heiht: '100%', width: '100%', display: 'flex', background: 'rgb(26,148,255)', justifyContent: 'center' }} >
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }} >
        <Col span={5} style={{ textAlign: 'center' }}>
          <WrapperHeaderTestHeader >
            <WrapperLinkText href="/">SHOP</WrapperLinkText>
          </WrapperHeaderTestHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>

            <ButttonInputSearch
              size="large"
              bordered={false}
              textbutton="Tìm kiếm"
              placeholder="input search text"
              onChange={onSearch}
            // backgroundColorButton="#5a20c1"
            />
          </Col>
        )}

        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
          <Loading isLoading={loading}>
            <WrapperHeaderAccount >
              {userAvatar ? (
                <img src={userAvatar} alt="avatar" style={{
                  height: '30px',
                  width: '30px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />

              )}

              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup} >
                    <div style={{ cursor: 'pointer' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user.email}</div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                  <WrapperTextHeaderSmall>Đăng Nhập/Đăng Ký</WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
          {!isHiddenCart && (
            <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
              <Badge  count={ order?.orderItems?.length} size='small'>
                <ShoppingCartOutlined style={{ fontSize: '30px', color: 'white' }} />

              </Badge>
              <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
            </div>

          )}


        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent