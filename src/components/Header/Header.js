import React from 'react';
import {Link} from "react-router-dom";
import '../styles/Header.css'
import {useSelector} from "react-redux";

const AddButton = () => {

    let token = useSelector(state => state.token);
    if(!!token){

        return (
            <ul className="d-flex menu">
                <li>
                    <Link to="/add_new">
                        <button
                            className="btn btn-success">
                            + ADD NEW PRODUCT
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/login">
                        <button
                            className="btn btn-primary">
                            LOGIN
                        </button>
                    </Link>
                </li>
            </ul>);
    } else {
        return (
            <ul className="d-flex menu">
                <li>
                    <Link to="/login">
                        <button
                            className="btn btn-primary">
                            LOGIN
                        </button>
                    </Link>
                </li>
            </ul>);
    }
};
const Header = () => {

    return(
        <div className='header d-flex'>
          <h3 className='text-monospace'>
              <Link to="/">
                  MyCatalog.com
              </Link>
          </h3>
          <AddButton/>
        </div>
    );
};

export default Header;