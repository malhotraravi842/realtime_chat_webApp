import { Route, Switch, useHistory } from 'react-router';
import { Login, Signup, Chat } from 'components';
import { useAuth, useResolved } from 'hooks';
import { useEffect } from 'react';
import { ChatProvider } from 'context/ChatContext';

export const App = () => {
  const history = useHistory();
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);

  useEffect(() => {
    if (authResolved) {
      history.push(!!authUser ? '/' : '/login');
    }
  }, [authResolved, authUser, history]);

  return authResolved ? (
    <ChatProvider authUser={authUser}>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Chat} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </ChatProvider>
  ) : (
    <div>Loading...</div>
  );
};
