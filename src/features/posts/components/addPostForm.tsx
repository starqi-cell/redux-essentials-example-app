import React, { useState } from "react";
import { useAppSelector } from "../../../store";
import { selectAllUsers } from '../../users/store/users';

import { Spinner } from "../../../componments/Spinner";
import { useAddNewPostMutation } from "../../api/apiSlice";




const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  // highlight-next-line
  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const users = useAppSelector(selectAllUsers);




  const canSave = [title, content, userId].every(Boolean) && !isLoading;
  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        // highlight-next-line
        await addNewPost({ title, content, user: userId }).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      }
    }
  };

  function onTitleChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }
  function onContentChanged(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }
  function onUserIdChanged(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(e.target.value);
  }
  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value);

    const usersOptions = users.map((user: { id: string; name: string }) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));

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
        <label htmlFor="userId">作者:</label>
        <select id="userId" name="userId" value={userId} onChange={onUserIdChanged}>
          <option value="">请选择作者</option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">内容：</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>保存文章</button>
      </form>
    </section>
  );
};


export default AddPostForm 