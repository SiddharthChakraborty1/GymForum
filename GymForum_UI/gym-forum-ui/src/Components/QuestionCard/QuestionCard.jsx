import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, createMuiTheme, ThemeProvider, TextField, Button, Grid} from '@material-ui/core'
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { palette } from '@material-ui/system';
import { getAnswersByPostId, getUserByUserId, uploadAnswer } from '../../Services/upload.service';
import {AnswerCard} from '../AnswerCard/answerCard'
import './QuestionCard.css'

const themes = createMuiTheme({
  palette: {
    type: 'dark'
  }
})
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#000',
    width : '100%',
    height: 'auto',
    borderRadius: '10px'
  },
  bgPaper:{
    marginTop: '40px',
    borderRadius: '10px',
    width: '70vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'

  },
  button:{
    backgroundColor: '#145DA0',
    color: '#fff',
    padding: '0px',
    minWidth: '250px',
    height: '30px',
    marginBottom: '10px',
    '&:hover':{
      backgroundColor: '#fff',
      color:'#000'
    }

  },
  textField: {
    width: '80%',
    marginBottom: '10px'

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  typography: {
    textAlign: 'left',
    fontSize: '20px'
   
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    margin: '5px',
    borderRadius: '10px'
  },

}));

export default function QuestionCard(props) {
  const [answer, setAnswer] = useState('');
  const [userName, setUserName] = useState('');
  const [answerList, setAnswerList] = useState([]);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  useEffect(()=>{
    let posterId = props.post.postUserId;
    getUserByUserId(posterId).then(data=>{
      console.log(data);
      setUserName(data.userName)
    })

    getAnswersByPostId(props.post.postId).then(data=>{
      setAnswerList(data);
      console.log(answerList);
    })

  },[])

  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOnCLick =(e)=>{
    e.preventDefault();
    if(answer.length == 0)
    {
      alert('Cannot post an empty answer')
    }
    else{
      // write code to post the answer
      const answerObj = {
        AnswerPostId: props.post.postId,
        AnswerUserId: localStorage.getItem('userId'),
        AnswerText: answer,
        AnswerUpvotes: 0,
        AnswerDownvotes: 0,
        AnswerUploadDate: new Date().toISOString(),
        AnswerApproved: 0
      }
      // send this object to service method to post the answer
      uploadAnswer(answerObj).then(data=>{
        setAnswer("");
        console.log(data);
      })
    }

  }
  

  return (
   <ThemeProvider theme={themes}>
      <Paper
    className={classes.bgPaper}
     elevation={10}>
      <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="User Name" className={classes.avatar}>
            S
          </Avatar>
        }
        
        title={'Asked By: '+userName}
        subheader={'Uploaded On: '+props.post.postUploadDate.split('T')[0]}
      />
     
      <CardContent>
        <Typography className={classes.typography} variant="subtitle1"  component="p">
         {props.post.postText}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
      
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show Answers"
        
        >
          <ExpandMoreIcon />
          
        </IconButton>
        <Typography style={{fontSize: '12px'}}>{expanded? 'Hide Answers': 'Show Answers'}</Typography>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className = {classes.cardContent}>
        <Typography style={{color: '#000'}} className={classes.typography} variant="subtitle1"  component="p">
         Answers  
        </Typography>
          
          {answerList.map(element=>(
            <AnswerCard answer={element} />
          ))}
          
        </CardContent>
      </Collapse>
      <Grid container>
      <Grid item xs={12}>
      <TextField 
      className={classes.textField}
      multiline
      variant='outlined'
      placeholder='Write your answer'
      label='Answer this question'
      value={answer}
      onChange={e=>{e.preventDefault();
      setAnswer(e.target.value)}}
      margin='dense' />
      </Grid>

      <Grid item xs={12}>
      <Button onClick={handleOnCLick} margin='dense' className={classes.button}>Submit</Button>
  
      </Grid>
      </Grid>
    
    </Card>
    </Paper>
   </ThemeProvider>
  );
}
