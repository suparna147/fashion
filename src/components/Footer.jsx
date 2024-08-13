import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  position: relative;
  padding: 2rem 0;
  text-align: center;
  background: url('/path/to/your/image/footer-bg.jpg') no-repeat center center;
  background-size: cover;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    z-index: 0;
  }

  .container {
    position: relative;
    z-index: 1;
  }

  .footer-top {
    margin-bottom: 2rem;

    h5 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }

    .email-signup {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.5rem;

      input {
        padding: 0.5rem;
        margin-right: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      button {
        padding: 0.5rem 1rem;
        border: none;
        background-color: #000;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
      }
    }

    p {
      margin: 0;
    }
  }

  .footer-links {
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;

    .footer-column {
      h6 {
        font-size: 1rem;
        margin-bottom: 0.5rem;
      }

      ul {
        list-style-type: none;
        padding: 0;

        li {
          margin-bottom: 0.5rem;

          a {
            color: #000;
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

  .footer-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      margin: 0;
    }

    .social-icons {
      a {
        margin: 0 0.5rem;
        color: #000;
        font-size: 1.25rem;
        text-decoration: none;

        &:hover {
          color: #007bff;
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper className="footer  footer-light bg-light mb-0 text-center">
      <div className="container">
        <div className="footer-top pb-5">
          <h5>TAKE 15% OFF YOUR FIRST ORDER!</h5>
          <div className="email-signup">
            <input type="email" placeholder="Your email address" />
            <button>Sign Up</button>
          </div>
          <p>
            BY ENTERING YOUR EMAIL ADDRESS YOU AGREE TO RECEIVE MARKETING EMAILS FROM US. UNSUBSCRIBE AT ANY TIME.
          </p>
        </div>
        <div className="footer-links row pb-5">
          <div className="footer-column col-md-3">
            <h6>ACCOUNT</h6>
            <ul>
              <li><a href="#">My Account</a></li>
              <li><a href="#">Check Order</a></li>
            </ul>
          </div>
          <div className="footer-column col-md-3">
            <h6>ABOUT US</h6>
            <ul>
              <li><a href="#">About Our Company</a></li>
              <li><a href="#">Affiliate Program</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className="footer-column col-md-3">
            <h6>CUSTOMER SERVICE</h6>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Popular FAQs</a></li>
              <li><a href="#">Find My Order</a></li>
            </ul>
          </div>
          <div className="footer-column col-md-3">
            <h6>LEGAL</h6>
            <ul>
              <li><a href="#">Terms and Conditions of Sale</a></li>
              <li><a href="#">Privacy Notice</a></li>
              <li><a href="#">Do Not Sell My Personal Information</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom d-flex flex-column align-items-center justify-content-center pb-5">
          <p>© 2024 Fashion Rental Clothing. All Rights Reserved.</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-tiktok"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-snapchat"></i></a>
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
