import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { addCart, delCart } from "../redux/action";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">Your Cart is Empty</h4>
          <Link to="/" className="btn btn-outline-dark mx-4 btn-animated">
            <i className="fa fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const addItem = (product) => {
    dispatch(addCart(product));
  };

  const removeItem = (product) => {
    dispatch(delCart(product));
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4 card-animated">
                <div className="card-header py-3">
                  <h5 className="mb-0">Item List</h5>
                </div>
                <div className="card-body">
                  {state.map((item) => (
                    <div key={item.id} className="item-animated">
                      <div className="row d-flex align-items-center">
                        <div className="col-lg-3 col-md-12">
                          <div className="bg-image rounded" data-mdb-ripple-color="light">
                            <img
                              src={item.image}
                              alt={item.title}
                              width={100}
                              height={75}
                              className="w-100"
                            />
                          </div>
                        </div>
                        <div className="col-lg-5 col-md-6">
                          <p><strong>{item.title}</strong></p>
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                            <button className="btn px-3 btn-animated" onClick={() => removeItem(item)}>
                              <i className="fas fa-minus"></i>
                            </button>
                            <p className="mx-5">{item.qty}</p>
                            <button className="btn px-3 btn-animated" onClick={() => addItem(item)}>
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                          <p className="text-start text-md-center">
                            <strong>
                              <span className="text-muted">{item.qty}</span> x ${item.price}
                            </strong>
                          </p>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 card-animated">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems}) <span>${Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping <span>${shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div><strong>Total amount</strong></div>
                      <span><strong>${Math.round(subtotal + shipping)}</strong></span>
                    </li>
                  </ul>
                  <Link to="/checkout" className="btn btn-dark btn-lg btn-block btn-animated">
                    Go to checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/gold-brown-leaves-light-purple-background-with-copy-space_1000823-66559.jpg?w=1060')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          padding: "20px",
          overflow: "hidden",
        }}
      >
        <style>
          {`
            /* Fade In Animation for Cart Items */
            .item-animated {
              animation: fadeIn 1s ease-in;
            }

            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            /* Slide In Animation for the Cart Summary */
            .card-animated {
              animation: slideIn 0.5s ease-out;
            }

            @keyframes slideIn {
              from {
                transform: translateX(100%);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }

            /* Button Hover Effects */
            .btn-animated {
              transition: all 0.3s ease;
            }

            .btn-animated:hover {
              transform: scale(1.05);
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
          `}
        </style>

        <div className="container my-3 py-3">
          <h1 className="text-center">Cart</h1>
          <hr />
          {state.length > 0 ? <ShowCart /> : <EmptyCart />}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Cart;
