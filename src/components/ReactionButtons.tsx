import React from "react";
import { Posts } from '../features/posts/store/posts';
import { useAppDispatch, useAppSelector } from "../store";
import { reactionAdded } from '../features/posts/store/posts';


const reactionEmoji = {
  thumbsUp: "👍",
  tada: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export const ReactionButtons = ({ post }: { post: Posts }) => {
  const dispatch = useAppDispatch();
  
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        // highlight-start
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
        // highlight-end
      >
        {emoji} {post.reactions[name as keyof typeof post.reactions]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
}
;