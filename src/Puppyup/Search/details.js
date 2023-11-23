import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as client from "./client";

function Details() {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();
  console.log(itemId)

  const fetchItem = async () => {
    const item = await client.findItemById(itemId);
    console.log(itemId);
    setItem(item);
  };
  
  useEffect(() => {
    fetchItem();

  }, []);

  return (
    <div style={{maxWidth: '1300px'}}>
      {item && (
        <div className="wd-detail px-2 py-2">
            <div>
                <img
                src={item.image.imageUrl}
                alt=""
                />
            </div>
            <div className="mx-5 my-2 flex-grow-1">
                <h4 className="py-2">{item.title}</h4>
                <div>{item.shortDescription}</div>
                <br/>
                <div>Price: $ {item.price.value}</div>
                <br/>
                <div>Condition: {item.condition}</div>
                <br/>
                <div>Brand: {item.brand}</div>
                <br/>
                <div>Shipping Cost: $ {item.shippingOptions[0].shippingCost.value}</div>
                <br/>
                <div>Shipping From: {item.itemLocation.city},{' '}{item.itemLocation.stateOrProvince}</div>

            </div>
          
        </div>
      )}
    </div>
    
  );


}

export default Details;