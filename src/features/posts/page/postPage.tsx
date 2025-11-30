import React from "react";
import { Link,useParams } from "react-router-dom";

// highlight-start
import { Spinner } from "../../../componments/Spinner";
import { useGetPostQuery } from "../../api/apiSlice";
// highlight-end

import { PostAuthor } from "../../../componments/PostAuthor";
import { TimeAgo } from "../../../componments/TimeAgo";
import { ReactionButtons } from "../../../componments/ReactionButtons";

export const SinglePostPage = () => {
  const { postId } = useParams<{ postId: string }>();

  // highlight-next-line
  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId);

  let content;
  // highlight-start
  if (isFetching) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    // highlight-end
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    );
  }

  return <section>{content}</section>;
};

export default SinglePostPage;