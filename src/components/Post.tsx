import styles from './Post.module.css';
import { TPost } from '../App';

type Props = {
  post: TPost;
};

const Post = (props: Props) => {
  return <div className={styles.post}>{props.post.title}</div>;
};

export default Post;
