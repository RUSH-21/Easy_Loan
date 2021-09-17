import React , {Component} from 'react';
import { connect } from 'react-redux';
import classes from './LoanForm.module.css';
import {withRouter} from 'react-router-dom'

class ProfileForm extends Component {
  
  state = {
    name: '',
    address: '',
    contact: '',
    email: '',
    amount: '', 
    start_date: '',
    expiry_date: '',
    type: 'Fixed',
    error: ''
  }

  nameChangeHandler = (event) => {
    this.setState({name: event.target.value});
    console.log(this.state.name)
  }
  addressChangeHandler = (event) => {
    this.setState({address: event.target.value});
  }
  contactChangeHandler = (event) => {
    this.setState({contact: event.target.value});
  }
  emailChangeHandler = (event) => {
    this.setState({email: event.target.value});
  }
  amountChangeHandler = (event) => {
    this.setState({amount: event.target.value});
  }
  startDateChangeHandler = (event) => {
    this.setState({start_date: event.target.value});
  }
  expiryDateChangeHandler = (event) => {
    this.setState({expiry_date: event.target.value});
  }
  typeChangeHandler = (event) => {
    this.setState({type: event.target.value});
  }


  validate = () => {
    
   
    if(this.props.token === ''){
      this.setState({error: 'You are not logged in'});
      return false;
    }

    const {name, email, address, contact, amount, start_date, expiry_date, type} = this.state;

    var endDate = new Date(expiry_date);
    var startDate = new Date(start_date);
    const months = (endDate.getFullYear() - startDate.getFullYear())*12 + (endDate.getMonth() - startDate.getMonth())

    if(name === '' || email === '' || address === '' || contact === '' || amount === '' || start_date === '' || expiry_date === '' || type === ''){
      
      this.setState({error: 'Every field needs to be filled'});
      return false;

    }else if(contact.length !== 10){

      this.setState({error: 'Invalid Contact Number'});
      return false;

    }else if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
    
      this.setState({error: 'Invalid Email id'});
      return false;
    }
    else if(months < 2){

      this.setState({error: 'Minimum loan duration is 2 months'});
      return false;

    }
    else{

      this.setState({error: ''});
      return true;

    }

  }


  submitApplication = (event) => {
    const {name, email, address, contact, amount, start_date, expiry_date, type} = this.state;
    event.preventDefault();
    if(this.validate()){
      console.log(name + ' ' + email + ' ' + address + ' ' + contact + ' ' + amount + ' ' + start_date + ' ' + expiry_date + ' ' + type)
      fetch(
        'https://easyloan-api-by-arnab.herokuapp.com/loan',
        {
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            address,
            contact,
            amount,
            type,
            start_date: new Date(start_date),
            expiry_date: new Date(expiry_date)
          }),
          headers: {
            'Authorization': 'Bearer '+this.props.token,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => res.json())
      .then(result => {
        console.log(result)
        if(result.code === 11000)
          this.setState({error: 'Loan amount aldready present in system'});
        else{
          this.setState({error: ''});
          this.props.history.push('/loans')
        } 
      })
      .catch(e => {
        console.log('error');
        console.log(e)
        this.setState({error: 'An error occoured'});
      })
    }
  }

  render() {
    return (
      <form className={classes.form}>
        <p>{this.state.error}</p>
        <div className={classes.control}>

          <label htmlFor='applicant-name'>Applicant Name</label>
          <input type='text'  onChange={this.nameChangeHandler} required/>

          <label htmlFor='applicant-name'>Address</label>
          <input type='text'  onChange={this.addressChangeHandler} />

          <label htmlFor='applicant-name'>Contact Number</label>
          <input type='number'  onChange={this.contactChangeHandler}/>

          <label htmlFor='applicant-name'>Email</label>
          <input type='email'  onChange={this.emailChangeHandler} />

          <label htmlFor='applicant-name'>Loan Amount</label>
          <input type='number'  onChange={this.amountChangeHandler} />

          <label htmlFor='applicant-name'>Start Date</label>
          <input type='date'  onChange={this.startDateChangeHandler} />

          <label htmlFor='applicant-name'>Expiry Date</label>
          <input type='date'  onChange={this.expiryDateChangeHandler} />
          
          <label htmlFor='interest-type'>Interest Type</label>
          <select id="interest" name="interest-type" onChange={this.typeChangeHandler}>
            <option value="fixed">Fixed</option>
            <option value="floating">Floating</option>
          </select>

        </div>
        <div className={classes.action}>
          <button onClick={this.submitApplication}>Submit</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return { token: state.token };
}

export default withRouter(connect(mapStateToProps)(ProfileForm));


