import React from 'react'
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, AutoComplete, Select } from "antd";

const CryptoCoinHome = (props) => {
    const{cryptos}=props
    return (
        <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link key={currency.id} to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    key={currency.id}
                  />
                }
                hoverable
              >
                <p>Price: {currency.price ? millify(currency.price) : "NA"}</p>
                <p>
                  Market Cap:{" "}
                  {currency.marketCap ? millify(currency.marketCap) : "NA"}
                </p>
                <p>
                  Daily Change:
                  <span className={currency.change < 0 ? "red" : "green"}>
                    {currency.change ? `${currency.change}%` : "NA"}
                  </span>{" "}
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    )
}

export default CryptoCoinHome