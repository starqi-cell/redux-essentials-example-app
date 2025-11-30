import React, { useMemo } from 'react'
import { Spinner } from '../../../componments/Spinner';
import { Link } from "react-router-dom";
import { PostAuthor } from "../../../componments/PostAuthor";
import { TimeAgo } from "../../../componments/TimeAgo";
import { ReactionButtons } from "../../../componments/ReactionButtons";
import { useGetPostsQuery } from "../../api/apiSlice";
import classnames from "classnames";

type Post = {
  id: string;
  title: string;
  user: string;
  date: string;
  content: string;
  reactions: {
    thumbsUp: number;
    hooray: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
  [key: string]: any;
};

interface PostExcerptProps {
  post: Post;
}

// highlight-next-line
let PostExcerpt = ({ post }: PostExcerptProps) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

export const PostsList = () => {
  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    // highlight-next-line
    refetch,
  } = useGetPostsQuery('');

  // highlight-start
  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice();
    // Sort posts in descending chronological order
    sortedPosts.sort((a: Post, b: Post) => b.date.localeCompare(a.date));
    return sortedPosts;
  }, [posts]);
  // highlight-end

  let content;

  if (isLoading) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    // highlight-start
    const renderedPosts = sortedPosts.map((post: Post) => (
      <PostExcerpt key={post.id} post={post} />
    ));

    const containerClassname = classnames("posts-container", {
      disabled: isFetching,
    });

    content = <div className={containerClassname}>{renderedPosts}</div>;
    // highlight-end
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <section className="posts-list">
      <button onClick={refetch}>更新帖子</button>
      {content}
    </section>
  );
};

export default PostsList;