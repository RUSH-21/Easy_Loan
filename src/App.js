import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LoanApplication from './components/LoanApplication/LoanApplication';
import AuthPage from './pages/AuthPage';
import LoansPage from './pages/LoansPage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <AuthPage />
        </Route>
        <Route path='/loanApply'>
          <LoanApplication />
        </Route>
        <Route path='/loans'>
          <LoansPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
