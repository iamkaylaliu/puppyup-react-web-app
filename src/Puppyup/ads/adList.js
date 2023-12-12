import * as client from "./client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css"
import sample from "./sample.jpg";
import { useSelector } from "react-redux";
import { findAllUsers } from "../users/client";
import { BsTrash3Fill, BsPencil, BsPlusCircleFill, BsFillCheckCircleFill } from "react-icons/bs";

function AdList() {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [product, setProduct] = useState({ title: "", seller: "", shortDescription: "", price: "", condition: "", brand: "", shippingCost: "", shippingFrom: "" });

  const { currentUser } = useSelector((state) => state.userReducer);

  const fetchProducts = async () => {
    const productsList = await client.findAllProducts();
    console.log(productsList);
    const allUsers = await findAllUsers();
    const vendors = allUsers.filter(user => user.role === "VENDOR");
    setSellers(vendors);
    const sellersMap = new Map(vendors.map(seller => [seller._id, seller.username]));
    const productsWithSellerName = productsList.map(product => {
      const sellerName = product.seller ? sellersMap.get(product.seller) : '';
      return { ...product, sellerName };
    });
    setProducts(productsWithSellerName);
  };

  const createProduct = async () => {
    try {
      
      const newProduct = await client.createProduct({...product, seller:currentUser._id});
      const sellersMap = new Map(sellers.map(seller => [seller._id, seller.username]));
      const getModifiedProduct = (newProduct) => {
        const sellerName = newProduct.seller ? sellersMap.get(newProduct.seller) : '';
        return { ...newProduct, sellerName };
      };
      const modifiedProduct = getModifiedProduct(newProduct);
      setProducts([ ...products, modifiedProduct]);
    } catch (err) {
      console.log(err);
    }
  };

  const selectProduct = async (productId) => {
    try {
      const selectedProduct = products.find((p) => p._id === productId);
      setProduct(selectedProduct);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async () => {
    try {
      const sellerId = sellers.filter(seller => seller.username === product.sellerName).map(filterdSeller => filterdSeller._id);
      const modifiedProduct = {...product, seller: sellerId[0] ? sellerId[0] : null }
      console.log("abc", modifiedProduct.sellerName)
      await client.updateProduct(product._id, modifiedProduct );
      fetchProducts();
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
                  <input className="form-control" readOnly value={product.sellerName}  onChange={(e) => setProduct({ ...product, sellerName: e.target.value })} />
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
                      <td><Link to ={`/Puppyup/Profile/users/${product.seller}`} >{product.sellerName}</Link></td>
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