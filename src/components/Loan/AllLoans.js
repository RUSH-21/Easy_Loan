import React , {Component} from 'react';
import Loan from './Loan';
import classes from './AllLoans.module.css';

class AllLoans extends Component {

    state = {
        loanData: []
    }

    componentDidMount() {

        fetch('https://easyloan-api-by-arnab.herokuapp.com/loan',{
            method: 'GET',
            headers: {
                accept: 'application/json',
            }})
            .then(result => result.json())
            .then(data => this.setState({loanData: data}));
                         
    }


    render(){

        return (
            <section className={classes.loanHeader}>
            <h1>Loans</h1>
            <div className={classes.loans}>
                {this.state.loanData.map(loan => (<Loan 
                    amount={loan.amount}
                    start_date={loan.start_date} 
                    expiry_date={loan.expiry_date}
                    email={loan.email}
                    address={loan.address}
                    type={loan.type}
                    emi={loan.emi}
                    name={loan.name}
                    contact={loan.contact}
                />))}
            </div>
            </section>
        );
    }
};

export default AllLoans;
