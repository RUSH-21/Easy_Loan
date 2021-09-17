import React, { Component } from  'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './MainNavigation.module.css';

class MainNavigation extends Component {


  state = {
    error:''
  }


  logoutUser() {
    this.props.logout();
  }

  
  render() {


    const navElement = this.props.token === '' ? <Link to='/'>Login</Link> : <Link to='/' onClick={this.logoutUser.bind(this)} >Logout </Link>

    return (
      <header className={classes.header}>
        <Link to='/'>
          <div className={classes.logo}>Easy Loan</div>
        </Link>
        <nav>
          <ul>
            <li class={classes.smallElements}>
              {navElement}
            </li>
            <li class={classes.smallElements}>
              <Link to='/loans'>Loans</Link>
            </li>
            <li>
              <Link to='/loanApply'><button>Apply for Loan</button></Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
};

const mapStateToProps = (state) => {
  return { token: state.token };
}

const mapDispatchToProps = dispatch => {
  return  {
    logout: () => dispatch({ type: 'logout'})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainNavigation);
