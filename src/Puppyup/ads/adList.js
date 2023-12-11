import * as client from "./client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css"
import sample from "./sample.jpg";
import { useSelector } from "react-redux";
import { BsTrash3Fill, BsPencil, BsPlusCircleFill, BsFillCheckCircleFill } from "react-icons/bs";

function AdList() {
  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState({ title: "", shortDescription: "", price: "", condition: "", brand: "", shippingCost: "", shippingFrom: "" });

  const { currentUser } = useSelector((state) => state.userReducer);

  const fetchProducts = async () => {
    const productsList = await client.findAllProducts();
    setProducts(productsList);
  };
  const createProduct = async () => {
    try {
      const newProduct = await client.createProduct(product);
      setProducts([newProduct, ...products]);
    } catch (err) {
      console.log(err);
    }
  };

  const selectProduct = async (productId) => {
    try {
      const selectedProduct = await client.findProductById(productId);
      setProduct(selectedProduct);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async () => {
    try {
      await client.updateProduct(product._id, product);
      setProducts(products.map((v) => (v._id === product._id ? product : v)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await client.deleteProduct(productId);
      fetchProducts();
   } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mx-3 my-3" style={{ maxWidth: "100%" }}>
        <>
          <h3>Ads</h3>
          <div className="table-container table-responsive" style={{ maxWidth: '100%' }}>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Short Description</th>
                  <th>Seller</th>
                  <th>Price</th>
                  <th>Condition</th>
                  <th>Brand</th>
                  <th>Shipping Cost</th>
                  <th>Shipping From</th>
                  {/* <th>Action</th> */}
                </tr>
                {currentUser && currentUser.role === "VENDOR" && 
                <tr>
                  <td>
                    <input className="form-control" readOnly/>
                  </td>
                  <td>
                    <input className="form-control" value={product.title} onChange={(e) => setProduct({ ...product, title: e.target.value })} />
                  </td>
                  <td>
                    <input className="form-control" value={product.shortDescription} onChange={(e) => setProduct({ ...product, shortDescription: e.target.value })} />
                  </td>
                  <td>
                  <input className="form-control" readOnly/>
                  </td>
                  <td>
                    <input className="form-control" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                  </td>
                  <td>
                    <input className="form-control" value={product.condition} onChange={(e) => setProduct({ ...product, condition: e.target.value })} />
                  </td>
                  <td>
                    <input className="form-control" value={product.brand} onChange={(e) => setProduct({ ...product, brand: e.target.value })} />
                  </td>
                  <td>
                    <input className="form-control" value={product.shippingCost} onChange={(e) => setProduct({ ...product, shippingCost: e.target.value })} />
                  </td>
                  <td>
                    <input className="form-control" value={product.shippingFrom} onChange={(e) => setProduct({ ...product, shippingFrom: e.target.value })} />
                  </td>
                  <td className="text-nowrap">
                    <BsFillCheckCircleFill onClick={updateProduct} className="me-2 text-success fs-1 text" />
                    <BsPlusCircleFill className="text-primary fs-1 text" onClick={createProduct} />
                  </td>
                </tr>
                }
              </thead>
              <tbody>
                {products && products.map((product) => (
                  <>
                    <tr key={product._id}>
                      <td><img className="sample-image" src={sample} alt=""/></td>
                      <td>{product.title}</td>
                      <td>{product.shortDescription}</td>
                      <td>{product.seller}</td>
                      <td>$ {product.price}</td>
                      <td>{product.condition}</td>
                      <td>{product.brand}</td>
                      <td>$ {product.shippingCost}</td>
                      <td>{product.shippingFrom}</td>
                      {currentUser && currentUser.role ==="VENDOR" && currentUser._id === product.seller &&
                        <td className="text-nowrap">
                          <button className="btn btn-warning me-2">
                            <BsPencil onClick={() => selectProduct(product._id)} />
                          </button>
                          <button className="me-2 btn btn-danger" onClick={() => deleteProduct(product._id)}>
                            <BsTrash3Fill />
                          </button>
                        </td>
                      }
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </>
    </div>
  );
}

export default AdList;