import { Posts } from '../features/posts/types';
import { useAddReactionMutation } from "../features/api/apiSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export const ReactionButtons = ({ post }: { post: Posts }) => {
  const [addReaction] = useAddReactionMutation();
  
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          addReaction({ postId: post.id, reaction: name })
        }
      >
        {emoji} {post.reactions[name as keyof typeof post.reactions]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
}
;