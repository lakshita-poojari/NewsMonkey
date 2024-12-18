import React, { useState, useEffect } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFL = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  useEffect(() => {
    document.title = `RED - ${capitalizeFL(props.category)}`;
    fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (pageNum) => {
    setLoading(true);
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${props.pageNum}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };


  // const nxtclick = async () => {
  //   console.log("Next");
  //   if (page + 1 <= Math.ceil(totalResults / 12)) {
  //     setLoading(true);
  //     await fetchData(page + 1);
  //     setPage(page + 1);
  //     setLoading(false);
  //   }
  // };

  // const prevclick = async () => {
  //   console.log("Previous");
  //   if (page > 1) {
  //     setLoading(true);
  //     await fetchData(page - 1);
  //     setPage(page - 1);
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <h1 className="text-center" style={{ margin: "35px 0px" }}>
        RED-Top {capitalizeFL(props.category)} Headlines
      </h1>
      <hr />
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={() => fetchData(page + 1)}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row my-3">
            {articles.map((element) => (
              <div className="col-md-3 my-3" key={element.url}>
                <NewsItems
                  title={element.title}
                  description={element.description}
                  imgurl={element.urlToImage}
                  url={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={prevclick}
        >
          &larr; Previous
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / 12)}
          type="button"
          className="btn btn-dark"
          onClick={nxtclick}
        >
          Next &rarr;
        </button>
      </div> */}
    </>
  );
}

News.defaultProps = {
  country: "in",
  pageSize: 12,
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string.isRequired,
  apikey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
