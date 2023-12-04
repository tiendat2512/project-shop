import AdminPage from "../Pages/AdminPage/AdminPage";
import DetailsOrderPage from "../Pages/DetailsOrderPage/DetailsOrder";
import Homepage from "../Pages/HomePage/Homepage";
import MyOrderPage from "../Pages/MyOrder/MyOrder";
import NotFoundpage from "../Pages/NotfoundPage/NotFoundpage";
import OrderPage from "../Pages/OrderPage/OrderPage";
import OrderSucess from "../Pages/OrderSucess/OrderSucess";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";
import ProductPage from "../Pages/ProductPage/ProductPage";
import Profilepage from "../Pages/Profile/Profilepage";
import SignInPage from "../Pages/SignInPage/SignInPage";
import SignUpPage from "../Pages/SignUpPage/SignUpPage";
import TypeProductpage from "../Pages/TypeProductPage/TypeProductpage";

export const routes = [
    {
        path:'/',
        page:Homepage,
        isShowHeader: true
    },
    {
        path:'/product',
        page:ProductPage,
        isShowHeader: true
    },
    {
        path:'/order',
        page:OrderPage,
        isShowHeader: true
    },
    {
        path:'/my-order',
        page: MyOrderPage,
        isShowHeader: true
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
        path:'/sign-in',
        page:SignInPage,
        isShowHeader: false
    },
    {
        path:'/sign-up',
        page:SignUpPage,
        isShowHeader: false
    },
    {
        path:'/product-detail/:id',
        page:ProductDetail,
        isShowHeader: true
    },
    {
        path:'/product/:type',
        page:TypeProductpage,
        isShowHeader: true
    },
    {
        path:'/profile',
        page:Profilepage,
        isShowHeader: true
    },
    {
        path:'/payment',
        page:PaymentPage,
        isShowHeader: true
    },
    {
        path:'/order-success',
        page:OrderSucess,
        isShowHeader: true
    },
    {
        path:'/system/admin',
        page:AdminPage,
        isShowHeader: false,
        isPrivate:true
    },
    {
        path:'*',
        page:NotFoundpage,
      
    }

    
]
