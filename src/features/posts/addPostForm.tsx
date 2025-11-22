import React, { useState } from "react";
import { useAppDispatch } from "../../store";
import { addPost } from "./postsSlice";
import { nanoid } from "@reduxjs/toolkit";



const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

    const dispatch = useAppDispatch();

  function onTitleChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }
  function onContentChanged(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }
  function handleSubmit() {
    if (title && content) {
      dispatch(addPost({
        id: nanoid(),
        title,
        content,
      }));
      setTitle("");
      setContent("");
    }
  }

  return (
    <section>
      <h2>添加新文章</h2>
      <form>
        <label htmlFor="postTitle">文章标题:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">内容：</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={handleSubmit}>保存文章</button>
      </form>
    </section>
  );
};

export default AddPostForm 