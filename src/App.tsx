import styles from './App.module.css';
import { useEffect, useMemo, useState } from 'react';
import Post from './components/Post';

export type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function App() {
  const itemsPerPage = 10;
  const [page, setPage] = useState<number>(0);
  const [posts, setPosts] = useState<TPost[]>([]);
  const total = useMemo(() => {
    return posts.length;
  }, [posts]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Error occured while fetching posts!');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  const getPostsByPage = () => {
    const starting = itemsPerPage * page;
    const ending = itemsPerPage * page + 10;
    return posts.slice(starting, ending + 1);
  };

  const postWrapper = getPostsByPage().map((post) => (
    <Post
      key={post.id}
      post={post}
    />
  ));

  const middlePageBtns = () => {
    const maxPage = Math.floor(total / itemsPerPage);

    return Array(maxPage)
      .fill(0)
      .map((_item, index) => (
        <button
          key={index}
          className={`${styles.button} ${page === index ? styles.selected : ''}`}
          onClick={() => {
            setPage(index);
          }}>
          {index + 1}
        </button>
      ));
  };

  const pagination = (
    <div className={styles.page}>
      <button
        className={styles.button}
        onClick={() => {
          setPage((prev) => {
            const newPage = prev - 1;
            return newPage < 0 ? 0 : newPage;
          });
        }}>
        Prev
      </button>
      {middlePageBtns()}
      <button
        className={styles.button}
        onClick={() => {
          setPage((prev) => {
            const newPage = prev + 1;
            const maxPage = Math.floor(total / itemsPerPage);
            return newPage >= maxPage ? maxPage - 1 : newPage;
          });
        }}>
        Next
      </button>
    </div>
  );

  return (
    <div className={styles.container}>
      {postWrapper}
      {pagination}
    </div>
  );
}

export default App;
