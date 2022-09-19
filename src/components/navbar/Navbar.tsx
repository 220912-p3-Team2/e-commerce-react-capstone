import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../global-style/globalStyles';
import {lightTheme, darkTheme} from '../dark-mode/Theme';
import { useDarkMode } from "../dark-mode/useDarkMode";
import Toggler from "../dark-mode/Toggler";
import { apiGetCurrentUser } from "../../remote/e-commerce-api/authService";
import { eCommerceApiResponse } from "../../remote/e-commerce-api/eCommerceClient";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;


const Navbar = () => {
  const {cart,setCart} = useContext(CartContext);
  const navigate = useNavigate();
  const [user, setUser] = useState<eCommerceApiResponse>();
  
  async function getUser() {
    let usr = await apiGetCurrentUser();
    setUser(usr);
  }

  useEffect(() => {
    getUser();
  }, []);

  // const [theme, setTheme] = useState('light');
  // const themeToggler = () => {
  // theme === 'light' ? setTheme('dark') : setTheme('light')
  // }

  const [theme, themeToggler] = useDarkMode();
  
  const themeMode = theme === 'light' ? lightTheme: darkTheme;
  

  const cartTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].quantity;
    }
    return total;
  }

  return (
    <Container>
      <Wrapper>
        <Left>
        <Logo onClick={() => {navigate('/')}}>Revature Swag Shop</Logo>
        </Left>
        <Right>
          <ThemeProvider theme={themeMode}>
            <>
            <GlobalStyles/>
            <Toggler theme={theme} toggleTheme={themeToggler} />
            </>
          </ThemeProvider>
          {!(user === undefined || user.payload.admin != true) && <MenuItem onClick={() => {navigate('/admin/products')}}>EDIT PRODUCTS</MenuItem>}
          <MenuItem onClick={() => {navigate('/register')}}>REGISTER</MenuItem>
          <MenuItem onClick={() => {navigate('/login')}}>SIGN IN</MenuItem>
          <MenuItem onClick={() => {navigate('/orders')}}>ORDERS</MenuItem>
          <MenuItem onClick={() => {navigate('/cart')}}>
            <Badge badgeContent={cartTotal()} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
