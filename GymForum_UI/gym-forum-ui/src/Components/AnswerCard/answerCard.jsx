import React, { useState, useEffect } from "react";
import {
  Paper,
  ThemeProvider,
  makeStyles,
  Typography,
  Grid,
  IconButton,
  Button,
} from "@material-ui/core";
import { getUserByUserId, updateAnswer } from "../../Services/upload.service";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";


const useStyles = makeStyles((theme) => ({
  answerBgPaper: {
    backgroundColor: "#fff",
    color: "#000",
    display: "flex",
    width: "60vw",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    margin: "10px",

    padding: "10px",
  },
  button:{
      backgroundColor: '#000',
      color: '#fff',

      
      margin: '10px',
      '&:hover':{
    backgroundColor: '#145DA0',
    color: '#fff'
      }
  },
  gridItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flexStart",
  },
  answerTypography: {
    width: "100%",
  },
}));

export const AnswerCard = (props) => {
  const [user, setUser] = useState({});
  const [upvoteCount, setUpvoteCount] = useState(props.answer.answerUpvotes);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [downvoteCount, setDownvoteCount] = useState(props.answer.answerDownvotes);
  useEffect(() => {
    console.log("answer");
    console.log(props.answer);
    console.log(props.answer.answerUserId);
    // getting user data from the answer user id
    getUserByUserId(props.answer.answerUserId).then((data) => {
      console.log(data);
      setUser(data);
    });
    
  }, []);

  useEffect(()=>{
    setVoteCounts()
  },[upvoteCount, downvoteCount])

  // the following function will change the vote counts of the answer in the database

  const setVoteCounts = ()=>{
      const answer = {
        AnswerId: props.answer.answerId,
        AnswerPostId: props.answer.answerPostId,
        AnswerUserId: props.answer.answerUserId,
        AnswerText: props.answer.answerText,
        AnswerUpvotes: upvoteCount,
        AnswerDownvotes: downvoteCount,
        AnswerUploadDate: props.answer.answerUploadDate,
        AnswerApproved: props.answer.answerApproved
        
      }
      updateAnswer(answer).then(data=>{
          console.log(data)
      })

      // send this object to the service method to update the answer in the database
  }

  // the following function will store the upvote/ downvote given by the user

  const handleVote = (e) => {
      
    e.preventDefault();

    if (e.target.name === "upvoteButton") {
       
        if(downvoted)
        {
            setDownvoteCount(downvoteCount -1)
            setDownvoted(false)
            setUpvoteCount(upvoteCount +1)
            setUpvoted(true)
           
            
        }
      else if (upvoted) {
        setUpvoteCount(upvoteCount - 1);
        setUpvoted(false);
        
      } else {
        setUpvoteCount(upvoteCount + 1);
        setUpvoted(true);
        
      }
    } else if (e.target.name === "downvoteButton") {
        
        if(upvoted)
        {
            setUpvoteCount(upvoteCount - 1)
            setUpvoted(false)
            setDownvoteCount(downvoteCount +1)
            setDownvoted(true)
           
            
        }
      else if (downvoted) {
        setDownvoteCount(downvoteCount - 1);
        setDownvoted(false);
      } else {
        setDownvoteCount(downvoteCount + 1);
        setDownvoted(true);
        
      }
      
    }
    
  };
  const classes = useStyles();
  let dates = props.answer.answerUploadDate.split("T")[0];
  let dateArray = dates.split("-");

  return (
    <div>
      <ThemeProvider>
        <Paper className={classes.answerBgPaper} elevation={10}>
          <Grid container>
            <Grid item xs={12} className={classes.gridItem}>
              {user.userName} answered on{" "}
              {dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0]}
            </Grid>
            <hr />
            <Grid className={classes.answerTypography} item xs={12}>
              <Typography align="left">{props.answer.answerText}</Typography>
            </Grid>
            <hr />
            <Grid className={classes.answerTypography} item xs = {12}>
               <Typography align='left'>
               <Button name='upvoteButton' onClick={handleVote} className={classes.button}>
                upvote
                </Button>
                Upvotes : {upvoteCount}  | <Button name='downvoteButton' onClick = {handleVote} className={classes.button}>
                downvote</Button>  Downvotes: {downvoteCount}
               </Typography>
            </Grid>
            
            
          </Grid>

          
        </Paper>
      </ThemeProvider>
    </div>
  );
};
