import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Posts from "./components/posts/Posts";
import AddPost from "./components/posts/AddPost";
import EditPost from "./components/posts/EditPost";
import EditComment from "./components/comments/EditComment";
import Header from "./components/layout/Header";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import Test from "./components/test/Test";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "./context";

class App extends React.Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Blog post" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Posts} />
                <Route exact path="/about" component={About} />
                <Route exact path="/test" component={Test} />
                <Route exact path="/post/add" component={AddPost} />
                <Route exact path="/post/edit/:id" component={EditPost} />
                <Route exact path="/comment/edit/:id" component={EditComment} />
                <Route exact path="" component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
