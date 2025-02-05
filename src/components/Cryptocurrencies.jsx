import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../Services/CryptoApi';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

    const [cryptos, setcryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    console.log(cryptos);

    useEffect(() => {
        const filterData = cryptosList?.data?.coins.filter((coin) => {
            return (
                coin.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }
        );
        setcryptos(filterData);
    },
        [cryptosList, searchTerm]);
        if(isFetching) return <Loader />;
    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input placeholder='Search Cryptocurrency' onChange={(e) => { setSearchTerm(e.target.value) }} />
                </div>
            )
            }
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {
                    cryptos?.map((currency) => {
                        return (
                            <Col sx={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                                <Link to={`/crypto/${currency.uuid}`}>
                                    <Card
                                        title={`${currency.rank} . ${currency.name}`}
                                        extra={<img className='crypto-image' src={currency.iconUrl} alt='..'/>}
                                        hoverable
                                        
                                    >
                                        <p>Price : {millify(currency.price)} </p>
                                        <p>Market Cap : {millify(currency.marketCap)} </p>
                                        <p>Daily Change : {millify(currency.change)} </p>
                                    </Card>
                                </Link>
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
}

export default Cryptocurrencies
