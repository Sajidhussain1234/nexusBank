import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => { 

 const {pathname} = useLocation();

 // Conditionally render footer content - On login and signup paht footer content will not show, On all other pathname footer will show. 
  if (pathname === "/login") return null;
  if (pathname === '/signup') return null;

  return (
    <>
      <footer className="text-center text-lg-start bg-light">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span className='fw-bold'>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href="https://www.facebook.com" className="me-4 text-reset" target="_blank">

              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" className="me-4 text-reset" target="_blank">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" className="me-4 text-reset" target="_blank">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com" className="me-4 text-reset" target="_blank">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </section>
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">NEXUS BANK
                </h6>
                <p>
                  Nexus bank is a financial institution that is licensed to accept checking and savings deposits and make loans.
                </p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                <h6 className="text-uppercase fw-bold mb-4">
                  ABOUT US
                </h6>
                <p>
                  <a href="/" className="text-reset">History</a>
                </p>
                <p>
                  <a href="/" className="text-reset">Code of Ethics</a>
                </p>
                <p>
                  <a href="/" className="text-reset">Awards</a>
                </p>
                <p>
                  <a href="/" className="text-reset">Our Values</a>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  USEFULL LINKS
                </h6>
                <p>
                  <a href="/" className="text-reset">Asset mangament</a>
                </p>
                <p>
                  <a href="/" className="text-reset">Currency Exchange</a>
                </p>
                <p>
                  <a href="/" className="text-reset">Timing for SSC & DSC</a>
                </p>
                <p>
                  <a href="/" className="text-reset">Much More</a>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p> Nexus Bank, Main branch Joher Town, Lahore.</p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  info@nexusbank.com
                </p>
                <p><i className="fas fa-phone me-3"></i> + 42 234 567 88</p>
              </div>
            </div>
          </div>
        </section>

        {/* Copyright */}
        <div className="text-center p-4" style={{ backgroundColor: "##cbd1cc" }}>
          © 2023 Copyright:
          <a className="text-reset fw-bold" href="http://localhost:3000/">nexusbank.com</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;


