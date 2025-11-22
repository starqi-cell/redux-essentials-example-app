import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

import routes from './router'
import { Suspense } from 'react'

import { Navbar } from "./components/Navbar";
import PostsList from "./features/posts/postsList";
import AddPostForm from "./features/posts/addPostForm";
import EditPostForm from "./features/posts/editPostForm";

// highlight-next-line


function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="App">
        <AddPostForm />

        <Suspense fallback={<div>Loading...</div>}>
          {useRoutes(routes)}
        </Suspense>
      </div>
      </div>
  );
}

export default App;