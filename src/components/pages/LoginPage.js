import React, {useState, useEffect} from 'react';
import '../styles/LoginPage.css'
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {Login} from "../../services/actions";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token = useSelector(state => state.token);
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect( () => {
        if(!!token){
            history.push('/')
        }
    }, [history, token]);


    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;
        if (name ==='UserEmail'){
            setEmail(value);
        }else if(name ==='UserPass'){
            setPassword(value);
        }
    };

    return(
      <div className='form-signin'>
          <h1
              className="h3 mb-3 font-weight-normal">
              Please sign in
          </h1>
          <input
              className="form-control"
              placeholder="Email address"
              name='UserEmail'
              value={email}
              onChange={(event)=> onChangeHandler(event)}
              required
              autoFocus>
          </input>
          <input
              type="password"
              className="form-control"
              placeholder="Password"
              name='UserPass'
              value={password}
              onChange={(event)=> onChangeHandler(event)}
              required>
          </input>
          <button
              className="btn btn-lg btn-primary btn-block"
              onClick={()=> dispatch(Login(email,password))}
          >
              Sign in
          </button>
      </div>
  )
};

export default LoginPage;