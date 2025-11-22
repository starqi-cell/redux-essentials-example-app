import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { postUpdated } from "./postsSlice";
import { useAppSelector, useAppDispatch } from "../../store";

const EditPostForm = () => {
  const { postId } = useParams<{ postId: string }>();


  const post = useAppSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );
  if (!post) {
    return (
      <section>
        <h2>页面未找到！</h2>
      </section>
    );
  }
  
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function onTitleChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }
  function onContentChanged(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
      navigate(`/posts/${postId}`);
    }
  };

  return (
    <section>
      <h2>编辑文章</h2>
      <form>
        <label htmlFor="postTitle">文章标题：</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
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
      </form>
      <button type="button" onClick={onSavePostClicked}>
        保存文章
      </button>
    </section>
  );
};

export default EditPostForm;    