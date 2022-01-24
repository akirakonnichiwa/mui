import * as React from "react";
import Post from "../components/Post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/getPosts";
import Grid from "@mui/material/Grid";
import { getUsers } from "../actions/getUsers";

function Posts() {
  const { posts } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="posts">
      <Grid container spacing={3} justifyContent="center">
        {posts.data.map((item) => (
          <Grid item xl={4} lg={4} md={6} sm={8} xs={12} key={item.id}>
            <Post
              key={item.id}
              title={item.title}
              body={item.body}
              userId={item.userId}
              id={item.id}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Posts;
