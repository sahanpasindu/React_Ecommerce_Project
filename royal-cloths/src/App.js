import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    //https://reactjs.org/docs/components-and-props.html

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const useRef = await createUserProfileDocument(userAuth);

        useRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <React.Fragment>
            <div>
              <Route exact path="/" component={HomePage} />
              <Route path="/shop" component={ShopPage} />
              {/* https://reactrouter.com/web/api/Redirect */}
              {
                <Route
                  path="/signin"
                  render={() =>
                    this.props.currentUser ? (
                      <Redirect to="/" />
                    ) : (
                      <SignInAndSignUpPage />
                    )
                  }
                />
              }
            </div>
          </React.Fragment>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

/*
  mapStateToProps?: (state, ownProps?) => Object
  If a mapStateToProps function is specified, the new wrapper component will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called. The results of mapStateToProps must be a plain object, which will be merged into the wrapped component’s props. If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps

  state - If your mapStateToProps function is declared as taking one parameter, it will be called whenever the store state changes, and given the store state as the only parameter.

  eg: const mapStateToProps = state => ({ todos: state.todos })
*/

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

/* 
  mapDispatchToProps?: Object | (dispatch, ownProps?) => Object

  Conventionally called mapDispatchToProps, this second parameter to connect() may either be an object, a function, or not supplied.
*/

/* 
The mapDispatchToProps function will be called with dispatch as the first argument. You will normally make use of this by returning new functions that call dispatch() inside themselves, and either pass in a plain action object directly or pass in the result of an action creator.

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    reset: () => dispatch({ type: 'RESET' })
  }
}
*/

//The connect() function connects a React component to a Redux store.
// It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.

export default connect(mapStateToProps, mapDispatchToProps)(App);

// The mapStateToProps and mapDispatchToProps deals with your Redux store’s state and dispatch, respectively. state and dispatch will be supplied to your mapStateToProps or mapDispatchToProps functions as the first argument.
