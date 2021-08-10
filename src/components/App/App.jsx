import { Route, Switch } from 'react-router';
import { Login, Signup, Chat } from 'components';

export const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Chat} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  );
};
