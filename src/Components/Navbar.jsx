import React, { useState, useEffect ,useRef} from "react";
import { Button, Menu, Typography, Avatar} from "antd";
import { Link,useLocation} from "react-router-dom";
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";


const Navbar = () => {
  const location = useLocation()
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [locationVal,setLocationVal] =useState(location.pathname)
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        const rows = document.getElementById("menuItems");
        if (rows !== null && rows !== undefined) {
          rows.style.display = "block";
        }
        if (ref.current && !ref.current.contains(event.target)) {
          if (screenSize <= 800) {
            setActiveMenu(false)
          }
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const node = useRef(null);
  useOutsideAlerter(node);
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(()=>{
    if(locationVal!==location.pathname){
      if (screenSize <= 800) {
        setActiveMenu(false)
        setLocationVal(location.pathname)
      }
    }
  },[location])

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);


  return (
    <div className="nav-container menuItems" id="menuItems" ref={node}>
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title
          level={4}
          className="logo"
          style={{ marginBottom: "0" }}
        >
          <Link to="/">Know Your Coin</Link>
        </Typography.Title>
        <Button className="menu-control-container"  onClick={() => setActiveMenu(!activeMenu)}>
         {activeMenu ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>} 
        </Button>
      </div>
    {activeMenu &&   <Menu theme="dark">
        <Menu.Item icon={<HomeOutlined />} key={1}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />} key={2}>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />} key={5}>
          <Link to="/news">News</Link>
        </Menu.Item>
      </Menu>}
    </div>
  );
};

export default Navbar;
