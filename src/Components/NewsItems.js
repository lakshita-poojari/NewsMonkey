import React from 'react'


const NewsItems=(props)=>  {
    let {title,description,imgurl,url,date,author,source} = props;


    return (
      <div style = {{background: 'black'}}>
            <div className="card">
                <img src={!imgurl?"https://ichef.bbci.co.uk/news/1024/branded_news/BCF2/production/_131807384_bd4f6fb00e1da23f02c7b29ce323e7b75d34649226_81_2097_11802097x1180.jpg" : imgurl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h4 className="text-center"><span className="badge text-bg-dark my-2">{source}</span></h4>
                    <hr />
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <h6><p className="card-text" style= {{color: '#94323c'}}><small className="">By {!author?"Unknown":author} at {new Date(date).toGMTString()}</small></p></h6>  
                    <a href={url} target= '-blank' className="btn btn-sm btn-secondary" style= {{background: '#3d6080'}}>Read more</a>
                </div>
        </div>
      </div>
    )
  }
export default NewsItems
