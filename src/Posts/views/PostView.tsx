import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { getPosts } from '../queries';
import PostList from '../components/PostList';
import { GetPostsData, GetPostsVars, Post } from '../types';
import Spinner from '../../Spinner';

const PostsView: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const { loading, error, data, fetchMore } = useQuery<GetPostsData, GetPostsVars>(getPosts, {
    variables: {
      options: { paginate: { page, limit: 5 } },
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true, // Important for showing loading state while fetching more data
  });

  useEffect(() => {
    if (data) {
      setPosts((prevPosts) => [...prevPosts, ...data.posts.data]);
      setHasMore(data.posts.data.length > 0);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (!loading && hasMore) {
          setLoadingMore(true);
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchMore({
        variables: {
          options: { paginate: { page, limit: 5 } },
        },
      });
    }
  }, [page, fetchMore]);

  if (loading && page === 1) return <Spinner isLoading={true} />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <PostList posts={posts} />
      {hasMore && <Spinner isLoading={loadingMore} />}
    </>
  );
};

export default PostsView;
