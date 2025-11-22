import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

import routes from './router'
import { Suspense } from 'react'

import { Navbar } from "./components/Navbar";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/addPostForm";

// highlight-next-line


function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="App">
        <AddPostForm />
        <PostsList />
        <Suspense fallback={<div>Loading...</div>}>
    
        </Suspense>
      </div>
      </div>
  );
}

export default App;