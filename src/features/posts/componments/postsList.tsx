import React, { useEffect } from 'react'
import { Spinner } from '../../../components/Spinner';
import { useAppSelector,useAppDispatch } from "../../../store";
import { Link } from "react-router-dom";
import { PostAuthor } from "../../../components/PostAuthor";
import { TimeAgo } from "../../../components/Timeago";
import { ReactionButtons } from "../../../components/ReactionButtons";
import { fetchPosts } from "../store/posts";
import { selectAllPosts } from '../store/posts';
import { Posts } from '../store/posts';

const PostExcerpt = ({ post } : { post: Posts }) => {
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
  )
}

const PostsList = () => {
  const posts = useAppSelector(selectAllPosts);
  const dispatch = useAppDispatch();

  const postStatus = useAppSelector((state) => state.posts.state);
  const error = useAppSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle')
    dispatch(fetchPosts());
  }, [postStatus, dispatch]);

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  let content

    if (postStatus === 'loading') {
      content = <Spinner text="Loading..." />
    } else if (postStatus === 'succeeded') {
      // Sort posts in reverse chronological order by datetime string
      const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date))

      content = orderedPosts.map(post => (
        <PostExcerpt key={post.id} post={post} />
      ))
    } else if (postStatus === 'failed') {
      content = <div>{error}</div>
    }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList
