import React, { useEffect, useState, useRef } from "react";
import PostList from "../Components/PostList";
import PostForm from "../Components/PostForm";
import PostFilter from "../Components/PostFilter";
import MyModal from "../Components/UI/modal/MyModal";
import MyButton from "../Components/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../Components/UI/loader/Loader";
import useFetching from "../hooks/useFetching";
import { getPagesCount } from "../utils/pages";
import Pagination from "../Components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../Components/UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort: "",query: ""});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPagesCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div>
      <MyButton style={{marginTop: "15px"}} onClick={() => setModal(true)}>
        Добавить пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: "15px 0"}} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {
        postError &&
          <h1>Ошибка загрузки: {postError}</h1>
      }
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options={[
          {value: 5, name: "5"},
          {value: 10, name: "10"},
          {value: 25, name: "25"},
          {value: -1, name: "Показать все"},
        ]}
      />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
      <div ref={lastElement} style={{height: "20px", background: "teal"}}></div>
      {isPostsLoading &&
        <div style={{
          display: "flex",
          justifyContent: "center",
          martinTop: "20px",
        }}><Loader /></div>
      }
      <Pagination
        totalPages={totalPages}
        page={page}
        changePage={changePage}
      />
    </div>
  );
}

export default Posts;

