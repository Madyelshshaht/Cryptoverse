import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Title = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const cointTimeStamp = [];


    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history?.[i]?.price)
        cointTimeStamp.push(new Date(coinHistory?.data?.history?.[i]?.timestamp).toLocaleDateString())
    }

    const data = {
        labels: cointTimeStamp,
        datasets: [
            {
                label: ' Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071db',
                borderColor: '#0071db'
            }
        ]
    };

    const options = {
        scales: {
            yAxis: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <>
            {/* info of Chart */}
            <Row className="chart-header">
                <Title level={2} className="chart-title">
                    {coinName} Price Chart
                </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">
                        Change: {coinHistory?.data?.change}
                    </Title>
                    <Title level={5} className="current-price">
                        Current {coinName} Price : ${currentPrice}
                    </Title>
                </Col>
            </Row>
            {/* chart Design */}
            <Line data={data} options={options} />
        </>
    );
};

export default LineChart;
