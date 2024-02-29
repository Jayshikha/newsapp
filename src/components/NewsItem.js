import React, { Component } from 'react'

export class NewsItem extends Component {
  constructor(){
    super();
    console.log("Hello I am a constructor")
  }
  
  render() {
   let  { title, description, imageUrl, newsUrl,author,date , source} = this.props;
    return (
      <div className='my-3'>
       <div className="card">
       <span className="positi
       on-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '50%', zIndex: '1', position:'relative'}}> {source}  </span>
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title"> {title}</h5>
    <p className="card-text">{description}</p>
    <a href={newsUrl} className="btn btn-primary btn-dark">
    <p className="card-text" style={{height: "5px"}}><small className="text-muted">By {!author? "unknown" : author} on{new Date (date).toGMTString}</small></p>
      Read More
    </a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
