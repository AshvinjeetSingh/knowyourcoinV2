import React from 'react'
import {Skeleton } from "antd";

const Loader = () => {
    return (
        <>
            <Skeleton paragraph={{ rows: 24 }} active/>
        </>
    )
}

export default Loader
