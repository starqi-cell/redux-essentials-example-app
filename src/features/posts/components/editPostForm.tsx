import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetPostQuery, useEditPostMutation } from "../../api/apiSlice";

const EditPostForm = () => {
  const { postId } = useParams<{ postId: string }>();

  const { data: post } = useGetPostQuery(postId!);
  const [updatePost, { isLoading }] = useEditPostMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const navigate = useNavigate();

  if (!post) {
    return (
      <section>
        <h2>Loading...</h2>
      </section>
    );
  }

  function onTitleChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }
  function onContentChanged(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  const onSavePostClicked = async () => {
    if (title && content) {
      await updatePost({ id: postId, title, content });
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
          className="textarea-style"
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