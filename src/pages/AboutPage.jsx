import React from 'react';
import { Footer, Navbar } from "../components";

const AboutPage = () => {
  const styles = {
   
    card: {
      borderRadius: '10px',
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Animation on hover
    },
    cardHover: {
      transform: 'scale(1.05)', // Scale effect
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow effect
    },
    cardImage: {
      width: '100%',
      height: '400px',
      objectFit: 'cover',
    },
    cardBody: {
      padding: '10px',
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/thumb_back/fh260/back_our/20190628/ourmid/pngtree-mysterious-black-gold-bar-line-background-material-image_275375.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
       
          padding: "20px",
          overflow: "hidden",
        }}
      >
      <div className="container my-3 py-3 " style={{color:'white'}}>
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
          We, at The RUR, have always been firm believers of fashion for all.
          But somewhere in the midst of bringing luxury designers to every girl
          next door, we forget that there are those in the world who don’t even
          have the luxury of comfortable clothing.
          <br /><br />
          So here we are, pushing the boundaries to believe in clothing for all;
          and we’d like your support in our initiative to help those in need to
          be able to lead a deservedly comfortable life.
          <br /><br />
          Browse through our display of an exquisite collection of outfits
          available to rent for a cause as the proceeds from these outfits will
          be shared with our NGO partners.
        </p>

        <h2 className="text-center py-4">Our Collections</h2>
        <div className="row">
          {[
            {
              title: "Men's Clothing",
              img: "https://i.pinimg.com/736x/2d/a8/3f/2da83f48cd9a189fc81f2ba2ca176b17.jpg",
              alt: "Men's Clothing"
            },
            {
              title: "Women's Clothing",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoQ5C0sKjn4pxIm9eTiua_FWjBQ3qT6bCTzBiKCNB6eDG3BhaizqWOg55wZHZdyGrco3k&usqp=CAU",
              alt: "Women's Clothing"
            },
            {
              title: "Party Wears",
              img: "https://www.newyorkdress.com/cdn/shop/products/CD0188_burgundy_34fab41f-b337-4374-a48d-efd9cfa6db9f-550984_600x.jpg?v=1681464235",
              alt: "Party Wears"
            },
            {
              title: "Bridals",
              img: "https://assets.vogue.in/photos/63f5b8739238109c471cacc3/2:3/w_1920,c_limit/331933077_509900481333249_8117711599807702610_n.jpg",
              alt: "Bridals"
            },
          ].map((item, index) => (
            <div className="col-md-3 col-sm-6 mb-3 px-3" key={index}>
              <div
                className="card h-100"
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = styles.cardHover.transform;
                  e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img
                  className="card-img-top img-fluid"
                  src={item.img}
                  alt={item.alt}
                  style={styles.cardImage}
                />
                <div className="card-body" style={styles.cardBody}>
                  <h5 className="card-title text-center">{item.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
