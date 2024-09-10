import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Set the document title
  useEffect(() => {
    document.title = capitalizeFirstLetter(props.category) + " - NewsMonkey";
  }, [props.category]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updatePage = async () => {
    props.changeProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    
    let data = await fetch(url);
    props.changeProgress(30);
    
    let parsedData = await data.json();
    props.changeProgress(70);
    
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    
    props.changeProgress(100);
  };

  // Fetch data when the component mounts or when the page changes
  useEffect(() => {
    updatePage();
  }, [page]);

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  return (
    <div>
      
      <div className="container" >
        <h1 className='text-center' style={{ marginTop: "100px" }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row ">
              {articles.map((element) => (
                <div key={element.url} className="col-md-4 my-3">
                  <NewsItem 
                    title={element.title ? element.title.slice(0, 30) + "..." : "title is null"} 
                    description={element.description ? element.description.slice(0, 45) + "..." : "description is null "} 
                    imageUrl={element.urlToImage === null ? "https://thehill.com/wp-content/uploads/sites/2/2024/08/AP24212607861912-e1724766429192.jpg?w=1280" : element.urlToImage} 
                    newsUrl={element.url} 
                    author={element.author} 
                    date={element.publishedAt} 
                    source={element.source.name} 
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

News.defaultProps = {
  pageSize: "5",
  country: "in",
  category: "science"
};

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
};

export default News;
