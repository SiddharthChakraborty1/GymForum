import {Avatar, AppBar, createMuiTheme, Grid, makeStyles, Paper, TextField, ThemeProvider, Toolbar, Typography, Button } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import LockIcon from '@material-ui/icons/Lock';
import {motion} from 'framer-motion'
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
    buttonDiv:{
        margin: '10px',
        borderRadius: '5px',
        backgroundColor: '#4FA29E',
        color: '#000',
        width: '80%',
        '&:hover':{
            backgroundColor:'#fff',
            color: '#000'
        }
    },
    button:{
        color:'#000',
        width: '100%'   

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
        var pattern = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
          );
        if(values.email === '' || values.password === '')
        {
            alert('Fields cannot be empty');
        }
        else if(!pattern.test(values.email)){
            alert('Invalid email format')

        }
        else if(values.password.length < 6)
        {
            alert('Invalid password length')
        }
        else
        {
            const loginObj = {
                Email: values.email,
                Password: values.password
            }
            // send this loginObj to the service method where it can be used with axios
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
             <motion.div
             initial={{opacity: 0, y: -350}}
             animate={{opacity: 1, y: 0}}
             transition={{duration: 1.3}}>
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
                <motion.div
                className={classes.buttonDiv}
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.9}}
                
                >
                <Button className={classes.button}  onClick={handleOnClick}> Log In</Button>
                </motion.div>
                 <div style={{display: 'flex', flexDirection: 'row'}}>
                 <Typography >
                     Don't have an account ?  |
                 </Typography>
                 <a className={classes.anchor} href='/Register'><Typography
                 style={{marginLeft:'3px'}}>Register</Typography></a>
                 </div>
            </Paper>
            </motion.div>   
            </ThemeProvider>
            
        </div>
    )
}

export default Login
