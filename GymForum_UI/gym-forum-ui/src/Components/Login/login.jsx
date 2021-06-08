import {Avatar, AppBar, createMuiTheme, Grid, makeStyles, Paper, TextField, ThemeProvider, Toolbar, Typography, Button } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import LockIcon from '@material-ui/icons/Lock';
import './login.css'

const themes = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main : "#66FCF1"
        }
    }
})

const useStyles = makeStyles(t=>({
    root:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    appBar: {
        backgroundColor: '#000',
        color: '#fff',
    },
    bgPaper: {
        backgroundColor: '#000',
        color: '#fff',
        marginTop:'100px',
        width: '25vw',
        height: '60vh',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    avatar:{
        margin: '10px',
        backgroundColor: "#1F2833"

    },
    textField: {
        margin: '10px',
        width: '80%'
    },
    button:{
        margin: '10px',
        backgroundColor: '#4FA29E',
        color: '#000',
        width: '80%',
        '&:hover':{
            backgroundColor:'#fff',
            color: '#000'
        }
    },
    anchor: {
        textDecoration: 'none',
        color: '#fff',
        cursor: 'pointer',
        '&:hover':{
            color: '#4FA29E'
        }

    }
}))

const initialValues= {
    email: '',
    password: '',
}


const Login = () => {
    useEffect(()=>{
        document.body.style.backgroundColor="#1F2833"
    },[])
    const [values, setValues] = useState(initialValues);

    const classes = useStyles();

    const handleOnChange=(e)=>{
        e.preventDefault();
        let {name, value} = e.target;
        setValues({
            ...values,
            [name]: value

        })
    }

    const handleOnClick=(e)=>{
        e.preventDefault();
        if(values.email === '' || values.password === '')
        {
            alert('Fields cannot be empty');
        }
        else if(/* give condition for email validation*/ false){

        }
        else
        {
            // call the service method to check if the user exists and log them in
            
            
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position='absolute' className={classes.appBar}>
                <Toolbar>
                    <Grid container>
                        <Grid item>
                           <Typography>
                               <h4>Gym Forum</h4>
                           </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <ThemeProvider theme={themes}>
            <Paper className={classes.bgPaper} elevation={10}>
                <Avatar className={classes.avatar}><LockIcon style={{color: '#66FCF1'}} /></Avatar>
                <Typography><h4 style={{margin: '0px'}}>User Login</h4></Typography>
                <TextField
                className={classes.textField}
                 variant='outlined'
                type='email'
                name='email'
                value={values.email}
                onChange={handleOnChange}
                 margin='dense'
                 placeholder='Enter Email'
                 required
                 label='Email'/>
                 <TextField
                className={classes.textField}
                 variant='outlined'
                 name='password'
                 type='password'
                 value={values.password}
                 onChange={handleOnChange}
                 margin='dense'
                 placeholder='Enter Password'
                 required
                 label='Password'/>
                 <Button className={classes.button} onClick={handleOnClick}> Log In</Button>
                 <div style={{display: 'flex', flexDirection: 'row'}}>
                 <Typography >
                     Don't have an account ?  |
                 </Typography>
                 <a className={classes.anchor} href='/Register'><Typography
                 style={{marginLeft:'3px'}}>Register</Typography></a>
                 </div>
            </Paper>
            </ThemeProvider>
            
        </div>
    )
}

export default Login
