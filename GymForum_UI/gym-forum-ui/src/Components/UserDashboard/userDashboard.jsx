import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {useHistory} from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Button, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    backgroundColor: "#000",
    color: "#fff",
    justifyContent: 'center'
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
  useEffect(() => {
    document.body.style.backgroundColor = "#1F2833";
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
            <Grid item>
              <Button onClick={e=>{history.push('/Post')}} className={classes.button} variant = 'outlined'>Ask Question</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
