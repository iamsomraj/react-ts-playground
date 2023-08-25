import { useEffect, useState } from 'react';

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function HelloWorld() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setPosts(data);
        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const loaderContent = <div>Loading...</div>;
  if (loading) {
    return loaderContent;
  }

  const errorContent = <div>Error occured when we were fetching your details</div>;
  if (error) {
    return errorContent;
  }

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{ padding: '2rem' }}>
          <strong>{post.title}</strong>
          <p>{post.body}</p>
          <span>Written By : {post.userId}</span>
        </div>
      ))}
    </div>
  );
}
