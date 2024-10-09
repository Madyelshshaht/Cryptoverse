import React, { useState } from "react";
import { Select, Row, Col, Card, Avatar, Typography } from "antd";
import { BulbOutlined } from "@ant-design/icons";
import moment from "moment";
import { useGetCryptosNewsQuery } from "../Services/CryptosNewsApi";
import { useGetCryptosQuery } from "../Services/CryptoApi";
import Loader from "./Loader";
import { useGetFinanceNewsQuery } from "../Services/FinanceNewsApi";
const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = 'https://i.pinimg.com/564x/2f/be/f1/2fbef1fc7dc4c95bf53228bc3df37cb1.jpg';
const News = ({ limit }) => {
  const { data: FinanceNwes, isFetching } = useGetFinanceNewsQuery();
  console.log(FinanceNwes);
  const news = FinanceNwes?.data?.news;
  console.log("finance =", news)

  const newstodisplay = limit ? news?.slice(0, limit) : news;
  // const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  // const { data: CryptosNews, isFetching } = useGetCryptosNewsQuery();
  // const News = CryptosNews?.items;
  // console.log('news =', News);
  // const { data } = useGetCryptosQuery(100);
  if (isFetching) return <Loader />;
  return (
    <>
      <div className="header" style={{display: "flex" , justifyContent: "center" , alignItems: "center" , gap: "10px"}} >
        <Title level={1} className='home-title' style={{ textAlign: "center" }}>Latest News</Title>
        <BulbOutlined style={{fontSize: "30px" , marginTop: "-15px"}}/>
      </div>

      <Row gutter={[24, 24]} >
        {/* {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className=" select-news "
              placeholder="select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value='Cryptocurrency'>Cryptocurrency</Option>
              {data?.data?.coins?.map((coin) => (
                <Option value={coin.name}>{coin.name}</Option>
              )
              )}
            </Select>
          </Col>
        )} */}


        {newstodisplay?.map((news, i) => (
          <Col lg={8} sm={12} xs={24}>
            <Card hoverable className="news-card" key={i}>
              <a href={news.article_url} target="_blanck" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={5} >{news.article_title}</Title>
                  <img src={news.article_photo_url || demoImage} alt="" className="img" />
                </div>
                <p>{news.snippet?.length > 100 ? `${news.snippet.slice(0, 100)}...` : news.snippet}</p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.subnews?.[0].images?.thumbnailProxied || demoImage} alt="" />
                    <Text className="provider-name">{news?.source}</Text>
                  </div>
                  <Text>{moment(news.post_time_utc).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}

      </Row>
    </>
  )
};

export default News;


// {News?.map((news, i) => (
//   <Col lg={8} sm={12} xs={24}>
//     <Card hoverable className="news-card" key={i}>
//       <a href="https://fortune.com/2024/10/05/fed-rate-cuts-outlook-pause-november-fomc-meeting-jobs-report-economy-inflation/" target="_blanck" rel="noreferrer">
//         <div className="news-image-container">
//           <Title className="news-title" level={5} >{news.title}</Title>
//           <img src={news.images?.thumbnailProxied || demoImage} alt="" className="img" />
//         </div>
//         <p>{news.snippet?.length > 100 ? `${news.snippet.slice(0, 100)}...` : news.snippet}</p>
//         <div className="provider-container">
//           <div>
//             <Avatar src={news.subnews?.[0].images?.thumbnailProxied || demoImage} alt="" />
//             <Text className="provider-name">{news?.publisher}</Text>
//           </div>
//           <Text>{moment(news.timestamp).startOf('ss').fromNow()}</Text>
//           {/* <Text>{news.timestamp.slice(6, 8)}s</Text> */}
//         </div>
//       </a>
//     </Card>
//   </Col>
// ))}