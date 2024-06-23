import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 16,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("hello i am a constructor from news component");

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async componentDidMount() {
    this.fetchNews();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.setState({ page: 1, articles: [] }, this.fetchNews);
    }
  }

  fetchNews = async () => {
    try {
      const { country, category, pageSize } = this.props;
      const { page } = this.state;
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=f10a7f633e814671b6fabd41ccc2babb&page=${page}&pageSize=${pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);

      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }

      let parseData = await data.json();

      this.setState({
        articles: parseData.articles,
        loading: false,
        totalResults: parseData.totalResults
      });

      console.log(parseData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 }, async () => {
      await this.fetchNews();
    });
  }

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 }, async () => {
      await this.fetchNews();
    });
  }

  handleNextClick = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.setState({ page: this.state.page + 1 }, async () => {
        await this.fetchNews();
      });
    }
  }

  render() {
    const { articles, loading } = this.state;

    return (
      <div className='container my-3'>
        <div className="container d-flex justify-content-between">
          <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePreviousClick}>
            &larr; Previous
          </button>
          <button type="button" onClick={this.handleNextClick} className="btn btn-dark">
            Next &rarr;
          </button>
        </div>
        <h1 className='text-center my-3'>
          NewsMonkey - Top Headlines from {this.capitalizeFirstLetter(this.props.category)} Category
        </h1>
        {loading && <h4>Loading...</h4>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className="row">
            {!loading && articles && articles.map((element) => (
              <div className="col-md-3" key={element.url}>
                <NewsItem
                  title={element.title && element.title.length >= 45 ? element.title.slice(0, 45) + "..." : element.title}
                  description={element.description && element.description.length >= 60 ? element.description.slice(0, 60) + "..." : element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
          <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePreviousClick}>
            &larr; Previous
          </button>
          <button type="button" disabled={this.state.page + 1 >= Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} className="btn btn-dark">
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
