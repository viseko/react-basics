import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PostItem from "./PostItem";

const PostList = ({posts, remove, title = "Список постов"}) => {

  if (!posts.length) {
    return <h1 style={{textAlign: "center"}}>Посты не найдены</h1>;
  }

  return (
    <div className="post-list">
      <h1 style={{textAlign: "center"}}>{title}</h1>
      <TransitionGroup>
        {
          posts.map((post, index) => 
            <CSSTransition
              key={post.id}
              timeout={500}
              classNames="post"
            >
              <PostItem remove={remove} number={index + 1} key={post.id} post={post} />
            </CSSTransition>
          )
        }
      </TransitionGroup>
    </div>
  );
}

export default PostList;