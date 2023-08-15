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
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setLoading(false);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const loaderContent = <div>Loading...</div>;
  if (loading) {
    return loaderContent;
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
