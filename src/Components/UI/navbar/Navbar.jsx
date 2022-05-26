import {React, useContext} from 'react';
import { Link } from 'react-router-dom';
import MyButton from "../button/MyButton";
import { AuthContext } from '../../../context';

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const logout = (e) => {
    localStorage.removeItem("auth");
    setIsAuth(false);
  }

  if (isAuth) return (
    <nav className="navbar">
      <div className="navbar__links">
        <Link to="/about">О сайте</Link>
        <Link to="/posts">Посты</Link>
        <MyButton onClick={logout}>Выйти</MyButton>
      </div>
    </nav>
  );

  return;
}

export default Navbar