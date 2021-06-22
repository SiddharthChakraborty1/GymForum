import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {useHistory} from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button, Grid } from "@material-ui/core";
import QuestionCard from "../QuestionCard/QuestionCard";
import { getPosts } from "../../Services/upload.service";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    backgroundColor: "#000",
    color: "#fff",
    justifyContent: 'center'
  },
  gridItem:{
    marginLeft: '10px'
  },
  button:{
      color: '#fff',
      borderColor: '#fff',
      '&:hover':{
          backgroundColor: '#fff',
          color: '#000'

        
      }
  },
}));

export default function DenseAppBar() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    document.body.style.backgroundColor = "#1F2833";
    if(localStorage.getItem('userId') == null)
    {
      history.push('/')
    }
    else{
      // write code to get the list of posts
      getPosts().then(data=>{
        console.log(data);
        setPosts(data);
      })
    }
  }, []);

  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar variant="dense">
          <Grid container>
           
            <Grid item>
              <Typography variant="h6" color="inherit">
                Gym Forum
              </Typography>
            </Grid>
            <Grid item sm></Grid>
            <Grid item className={classes.gridItem}>
              <Button onClick={e=>{history.push('/Post')}} className={classes.button} variant = 'outlined'>Ask Question</Button>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Button onClick={e=>{
                e.preventDefault();
                localStorage.removeItem('userId');
                history.push('/')}} className={classes.button} variant = 'outlined'>Log Out</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {posts.map(element=>(
        <QuestionCard key={element.postId} post={element}/>
      ))}
      
        
    </div>
  );
}
