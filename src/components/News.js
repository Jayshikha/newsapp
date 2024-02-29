import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps= {
   country: "in",
   pageSize:16,
   category:"general"
  }

  static propTypes = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category: PropTypes.string,
  }
 articles = []
 capitalizeFirstLetter =(string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
 }
 constructor(props){
  super(props);
  console.log("hello i am a constroctor from news  component");

  this.state = {
    articles : [],
    loading: false,
    page: 1
  }
  document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
 }
 async componentDidMount() {
  try {
    let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f10a7f633e814671b6fabd41ccc2babb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
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

handlePreviousClick= async ()=>{
  console.log("I am previous");
  try {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f10a7f633e814671b6fabd41ccc2babb&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);

    if (!data.ok) {
      throw new Error(`HTTP error! Status: ${data.status}`);
    }

    let parseData = await data.json();

    this.setState({
      articles: parseData.articles,
      loading: false,
      page: this.state.page - 1,
    });

    console.log(parseData);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

 handleNextClick=async()=>{

  console.log("I am Next");
  if(this.state.page +1 <Math.ceil(this.state.totalResults/this.props.pageSize)){  
  try {

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f10a7f633e814671b6fabd41ccc2babb&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);

    if (!data.ok) {
      throw new Error(`HTTP error! Status: ${data.status}`);
    }

    let parseData = await data.json();

    this.setState({
      articles: parseData.articles,
      loading: false,
      page: this.state.page +1,
    });

    console.log(parseData);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  }
}
 render() {
  const { articles } = this.state;

  return (
    <div className='container my-3'>
          <div className="container d-flex justify-content-between">

<button type="button" className="btn btn-dark" disabled={this.state.page<=1} onClick={this.handlePreviousClick}>&larr;      Previous</button>
<button type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>

</div>
      <h1 className='text-center my-3'>NewsMonkey - Top Headlines from {this.capitalizeFirstLetter(this.props.category)} Category</h1>
{/* {this.state.loading&&<Spinner/>} */}

      <div className="row">
        {!this.state.loading && articles && articles.map((element) => (
          <div className="col-md-3" key={element.url}>
            <NewsItem
              title={
                element.title && element.title.length >= 45
                  ? element.title.slice(0, 45) + "..."
                  : element.title
              }
              description={
                element.description && element.description.length >= 60
                  ? element.description.slice(0, 60) + "..."
                  : element.description
              }
              imageUrl={element.urlToImage}
              newsUrl={element.url}
              author ={element.author}
              date={element.publishedAt}
              source={element.source.name}
            />
          </div>
        ))}
      </div>
      <div className="container d-flex justify-content-between">

      <button type="button" className="btn btn-dark" disabled={this.state.page<=1} onClick={this.handlePreviousClick}>&larr;      Previous</button>
      <button type="button" disabled={this.state.page +1 >=Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>

      </div>
    </div>
  );
}
}

export default News
