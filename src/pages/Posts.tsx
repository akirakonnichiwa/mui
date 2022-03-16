import * as React from "react";
import {useEffect, useState} from "react";
import Post from "../components/Post";
import {useDispatch, useSelector} from "react-redux";
import {addPost, getPosts} from "../actions/posts.action";
import Grid from "@mui/material/Grid";
import {getUsers} from "../actions/getUsers";
import {Autocomplete, TextField, Theme, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Button from "@mui/material/Button";
import {RootState} from "../store/preloadedState";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        [theme.breakpoints.up("md")]: {
            justifyContent: "start",
        },
    },
}));


function Posts() {
    const {posts, users} = useSelector((state: RootState) => state);
    const [author, setAuthor] = useState(null);
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyles();


    useEffect(() => {
        dispatch(getUsers());
        dispatch(getPosts());
    }, [dispatch]);

    useEffect(() => {
        const newUsers = users.data.map(item => ({label: item.username, id: item.id}));
        return setOptions(newUsers);
    }, [users.data]);

    function handleChangeAuthor(e, newValue) {
        setAuthor(newValue);
    }

    function handleChangeBody(e) {
        setBody(e.target.value)
    }

    function handleChangeTitle(e) {
        setTitle(e.target.value)
    }

    function createPost() {
        dispatch(addPost({body, title, userId: author.id}));
    }

    return (<div className="posts">

            <form>
                <Grid
                    container
                    justifyContent={"center"}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        justifyContent={"center"}
                        position={"absolute"}
                        mb={3}
                    >
                        Posts
                    </Typography>
                    <Grid item m={2} pt={5}>
                        <Autocomplete
                            value={author}
                            onChange={handleChangeAuthor}
                            getOptionLabel={(option) => option.label || ''}
                            disablePortal
                            id="combo-box-demo"
                            options={options}
                            sx={{width: 300}}
                            renderInput={(params) => <TextField {...params} label="Author"/>}
                        />
                    </Grid>
                    <Grid item m={2} pt={5}>
                        <TextField
                            value={title}
                            onChange={handleChangeTitle}
                            id="outlined-basic1"
                            label="Title"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item m={2} pt={5}>
                        <TextField
                            value={body}
                            onChange={handleChangeBody}
                            id="outlined-basic2"
                            label="Body"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item m={2} pt={6}>
                        <Button variant="contained" disabled={!title || !body || !author} onClick={createPost}
                              size="large">ADD POST</Button>
                    </Grid>

                </Grid>
                <Grid
                    container
                    spacing={3}
                    justifyContent={"center"}
                    className={classes.root}
                >
                    {posts.data.map((item) => (<Grid item xl={4} lg={4} md={6} sm={8} xs={12} mt={4} key={item.id}>
                        <Post
                            key={item.id}
                            title={item.title}
                            body={item.body}
                            userId={item.userId}
                            id={item.id}
                        />
                    </Grid>))}
                </Grid>
            </form>
        </div>
    );
}

export default Posts;
