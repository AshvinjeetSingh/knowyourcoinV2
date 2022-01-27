import { Space, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='Footer-design'>
            
        <Space>
          <Link to="/">Home</Link>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          <Link to="/news">News</Link>
        </Space>
        <a href="https://knowyourcoin.netlify.app/">Know your coin V1</a>
        <Typography.Title
          level={5}
          style={{ color: "white", textAlign: "center" }}
        >
          Copyright © {new Date().getFullYear()}
        </Typography.Title>

        </div>
    )
}

export default Footer
