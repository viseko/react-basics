import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import Loader from '../Components/UI/loader/Loader';
import useFetching from '../hooks/useFetching';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Страница поста c id = {params.id}</h1>
      {isLoading
        ? <Loader />
        : <div>
            <h2 style={{textAlign: "center", marginTop: "20px"}}>{post.id}. {post.title}</h2>
            <p>{post.body}</p>
          </div>
      }
      <h2 style={{marginTop: "30px"}}>Комментарии ({comments.length})</h2>
      {
        isCommentsLoading
          ? <Loader />
          : <div>
              {comments.map((comm, i) => {
                return (
                  <div key={i} style={{marginTop: "10px"}}>
                    <h3>{comm.email}</h3>
                    <div>{comm.body}</div>
                  </div>
                )
              })}
            </div>
      }
    </div>
  )
}

export default PostIdPage