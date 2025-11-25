import React from "react";
import { useAppSelector } from "../store";
import { selectUserById } from "../features/users/store/users";

export const PostAuthor = ({ userId }: { userId: string }) => {
  const author = useAppSelector((state) => selectUserById(state, userId));

  return <span>by {author ? author.name : "Unknown author"}</span>;
};