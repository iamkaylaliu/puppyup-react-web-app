import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../index.css"
import "./index.css"

function Search() {
  const { search } = useParams();
  console.log('aaa', search)
  const [searchTerm, setSearchTerm] = useState(search || "dog treat");
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  const fetchItems = async (search) => {
    const results = await client.findItems(search);
    console.log(search);
    setResults(results);
    setSearchTerm(search);
  };

  useEffect(() => {
    if (search) {
      fetchItems(search);
    }
  }, [search]);

  return (
    <div className="wd-search">
      <h3 className="px-2 py-2">Search for your best fur-iend!</h3>
      <div className="row px-2 py-2">
        <div className="col">
          <input
          type="text"
          className="form-control w-50"
          placeholder="Search..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        </div>
        <div className="col flex-grow-1 text-left">
          <button
          onClick={() => navigate(`/Puppyup/MarketPlace/${searchTerm}`)}
          className="btn btn-primary mx-2"
        >
          Search
        </button>
        </div>
      </div>
      
      <div className="px-2 py-2 wd-search d-flex flex-row flex-wrap">
      <div className="row ms-0 me-0">
        {results &&
          results.itemSummaries.map((item, index) => (
            <div key={index} className="card wd-card-width">
              <Link to={`/Puppyup/MarketPlace/details/${item.itemId}`}>
                
                <img
                  src={item.image.imageUrl}
                  alt={item.title}
                />
                <div className="card-body">
                {item.title}
                </div>
                </Link>
                <div className="card-body">$ {item.price.value}<br/>
                </div>
            </div>
          ))}
      </div>
              
      </div>
      {/* <pre>{JSON.stringify(results, null, 2)}</pre> */}
    </div>
  );
}

export default Search;