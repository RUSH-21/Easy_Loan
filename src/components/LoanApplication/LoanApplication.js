import LoanForm from './LoanForm';
import classes from './LoanApplication.module.css';

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>Loan Application</h1>
      <LoanForm />
    </section>
  );
};

export default UserProfile;
