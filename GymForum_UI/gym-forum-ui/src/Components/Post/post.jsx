import React, { useState, useEfect, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Button,
  makeStyles,
  Paper,
  TextField,
  createMuiTheme,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  ThemeProvider,
  Checkbox,
  FormHelperText,
  Avatar,
} from "@material-ui/core";
import {motion} from 'framer-motion';
import { useHistory } from "react-router-dom";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";

const themes = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#66FCF1",
    },
  },
});

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
    justifyContent: "center",
  },
  bgPaper: {
    display: "flex",
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: '10px',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "70vw",
    height: "auto",
    paddingBottom: '10px',
    marginTop: "50px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    width: "70%",
  },
  avatar: {
    backgroundColor: "#1F2833",
    margin: "10px",
  },
  navButton:{
    color: '#fff',
    borderColor: '#fff',
    '&:hover':{
        backgroundColor: '#fff',
        color: '#000'

      
    }
},
  formControl: {},
  forms: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flexStart",
    marginLeft: "0px",
  },
  buttonDiv: {
    margin: "10px",
    borderRadius: "5px",
    backgroundColor: "#4FA29E",
    color: "#000",
    width: "auto",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#000",
    },
  },
  button: {
    color: "#000",
    width: "100%",
  },
}));

const Post = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#1F2833";
  }, []);
  const [checked, setChecked] = useState(false);
  const [question, setQuestion] = useState('');

  const classes = useStyles();
  const history = useHistory();

  const handleChecked = (e) => {
    e.preventDefault();
    setChecked(!checked);
  };

  const handleOnClick =(e) =>{
      e.preventDefault();
      if(question.length == 0)
      {
          alert('Cannot upload blank question')
      }
      else if(question.length < 20)
      {
          alert('Question might be too short, add more details')
      }
  }
  return (
    <div>
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
              <Button
                onClick={(e) => {
                  history.push("/UserDashboard");
                }}
                className={classes.navButton}
                variant="outlined"
              >
                Back to feed
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <div className={classes.container}>
        <ThemeProvider theme={themes}>
          <Paper elevation={10} className={classes.bgPaper}>
            <Avatar className={classes.avatar}>
              <ContactSupportIcon style={{ color: "#66FCF1" }} />
            </Avatar>
            <Typography variant='h4'>Question</Typography>
            <TextField
              variant="outlined"
              name='question'
              
              value={question}
              onChange={(e)=>{setQuestion(e.target.value)}}
              margin="dense"
              multiline
              className={classes.textField}
              label="Ask Your Question"
              placeholder="Sum it up in 500 characters"
              inputProps = {{
                  maxLength: 500,
              }}
              
            />

            <div className={classes.forms}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleChecked}
                        checked={checked}
                        name="checked"
                      />
                    }
                    label="Ask anonymously"
                  />
                </FormGroup>
                <FormHelperText>
                  Your name will not be displayed with the question
                </FormHelperText>
              </FormControl>
            </div>
            <motion.div
            className={classes.buttonDiv}
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.9}}>
            <Button onClick={handleOnClick} className={classes.button}>Upload Question</Button>
            </motion.div>
          </Paper>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Post;
