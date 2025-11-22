import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../store";

const SinglePostPage = () => {
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

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/edit/${post.id}`} className="button muted-button">
            Edit Post
        </Link>
            <Link to="/" className="button muted-button">
                Back to Posts
            </Link>
      </article>
    </section>
  );
};

export default SinglePostPage;