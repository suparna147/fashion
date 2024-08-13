import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCart } from "../redux/action";

const Products = () => {
  const [data, setData] = useState([
    {
      id: 1,
      title: "Blue Textured Sherwani",
      category: "men's clothing",
      image: "https://medias.utsavfashion.com/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/p/r/printed-velvet-sherwani-in-teal-blue-v1-mly1550.jpg",
      price: 3999.99,
      description: "Electric blue sherwani with black texture and matching pocket square. There are no pants with it.",
    },
    {
      id: 2,
      title: "Samiya tulle gown",
      category: "Women's clothing",
      image: "https://dollyjstudio.com/cdn/shop/files/1271_1_800x.jpg?v=1713945555",
      price: 5979.99,
      description: "Grey tulle gown with elegant zardozi embroidery.",
    },
    {
      id: 3,
      title: "Catherine Cocktail Gown",
      category: "Women's clothing",
      image: "https://dollyjstudio.com/cdn/shop/files/1152_1_800x.jpg?v=1713944240",
      price: 4199.99,
      description: "Catherine Cocktail Gown in elegant maroon color",
    },
    {
      id: 4,
      title: "classic suit",
      category: "Men's Clothing",
      image: "https://suvidhafashion.com/cdn/shop/files/EX0321-49995.jpg?v=1701168974&width=500",
      price: 2499.99,
      description: "class men hand embroided groom suit ",
    },
    {
      id: 5,
      title: "elegant navy blue suit",
      category: "men's clothing",
      image: "https://mediaslide-europe.storage.googleapis.com/uno/pictures/2927/53751/large-1574424864-d9022392c07e8036a6d4c06be8d74921.jpg?v=1574424920",
      price: 5289.99,
      description: "elegant navy blue groom suit",
    },
    {
      id: 6,
      title: "Red Bridal Lehanga",
      category: "women's clothing",
      image: "https://shreefashionwear.com/cdn/shop/products/Customised_Handcrafted_Red_Bridal_Lehenga_Choli_Resham_Work_SF674SD.jpg?v=1642455961",
      price: 2109.99,
      description: "Customised Handcrafted Red Bridal Lehenga Choli Resham Work",
    },
    {
      id: 7,
      title: "Classic men's Sharwani",
      category: "Men's clothing",
      image: "https://www.hindustantimes.com/web-stories/rohit-sarafs-dashing-looks-_NIhWu_ewcu5636kYeFz/assets/7.jpeg",
      price: 2109.99,
      description: "Customised Handcrafted sharwani",
    }, {
      id: 8,
      title: "Ball gown",
      category: "bride",
      image: "https://i.pinimg.com/474x/12/71/88/127188b66eb6fbd3e1cbaafaea5e56ea.jpg",
      price: 2109.99,
      description: "Customised rose designed ball gown pink",
    }, {
      id: 9,
      title: "stunning green suit",
      category: "party",
      image: "https://i.pinimg.com/736x/bb/4b/e3/bb4be3c39ba9343573f407b1af493d4a.jpg",
      price: 2109.99,
      description: "stunning satin green suit that shawn wearing",
    }, {
      id: 10,
      title: "Rainbow Bridal Lehanga",
      category: "bride",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/11/357686477/NZ/RK/GH/86953051/new-party-wear-designer-lehenga-choli.jpeg",
      price: 2109.99,
      description: "Customised Handcrafted Red Bridal Lehenga Choli Resham Work",
    }, {
      id: 11,
      title: "hero fiennes",
      category: "party",
      image: "https://wwd.com/wp-content/uploads/2019/03/hero-fiennes-002.jpg",
      price: 2109.99,
      description: "classic beigh coat suit",
    }, {
      id: 12,
      title: "party wear lehanga",
      category: "women's clothing",
      image: "https://i.pinimg.com/736x/98/7e/9e/987e9ee60dc267f74da8830f6b791e3f.jpg",
      price: 2109.99,
      description: "fashionable lehanga choli for party",
    },
  ]);

  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={75} width={400} />
        </div>
        {[...Array(6)].map((_, index) => (
          <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4" key={index}>
            <Skeleton height={400} />
          </div>
        ))}
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>
            All
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("men's clothing")}>
            Mens
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("women's clothing")}>
            Womens
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("party")}>
            Party
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("bride")}>
            Bridals
          </button>
        </div>

        {filter.map((product) => {
          return (
            <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt={product.title}
                  height={600}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}/Day</li>
                </ul>
                <div className="card-body">
                  <Link to={"/Cart"} className="btn btn-dark m-1">
                    Buy Now
                  </Link>
                  <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;