import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './AuthForm.module.css';
import {withRouter} from 'react-router-dom'


class AuthForm extends Component{

  assignToken(token) {
    this.props.login(token);
  }

  state = {
    isLogin: true,
    email: '',
    password: '',
    error:''
  }

  switchAuthModeHandler = () => {
    this.setState({isLogin: !this.state.isLogin, error: ''});
  };

  emailChangeHandler = (event) => {
    this.setState({email: event.target.value});
  }

  passwordChangeHandler = (event) => {
    this.setState({password: event.target.value});
  }

  authenticate = (event) => {
    event.preventDefault();
    console.log(this.props.token)
    var url;
    if(this.state.isLogin)
      url = 'https://easyloan-api-by-arnab.herokuapp.com/login'
    else  
      url = 'https://easyloan-api-by-arnab.herokuapp.com/signup'

    fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(res => res.json())
    .then((result) => {
      console.log(result)
      if(result.errors){
        console.log(result);
        this.setState({error: 'Authentication failed'})
      }
      else if(result.code === 11000){
        this.setState({error: 'Email aldready registered'})
      }
      else 
      {
        this.setState({error: ''})
        this.assignToken(result.token);
        this.props.history.push('/loanApply')
      }
    })
    .catch((e) => {
      console.log(e);
      this.setState({error: 'Authentication failed'})
    })

  }

  render () {
    return (
      <section className={classes.auth}>
         <p>{this.state.error}</p>
        <h1>{this.state.isLogin ? 'Login' : 'Sign Up'}</h1>
        <form>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required onChange={this.emailChangeHandler}/>
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input type='password' id='password' required onChange={this.passwordChangeHandler}/>
          </div>
          <div className={classes.actions}>
            <button onClick={this.authenticate}>{this.state.isLogin ? 'Login' : 'Create Account'}</button>
            <button
              type='button'
              className={classes.toggle}
              onClick={this.switchAuthModeHandler}
            >
              {this.state.isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
    );
  }
};

const mapStateToProps = (state) => {
  return { token: state.token };
}

const mapDispatchToProps = dispatch => {
  return  {
    login: (token) => dispatch({ type: 'login', token: token})
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthForm));
