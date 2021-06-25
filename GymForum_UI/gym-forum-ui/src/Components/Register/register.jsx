import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Avatar,
  AppBar,
  createMuiTheme,
  Grid,
  makeStyles,
  Paper,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import {motion} from 'framer-motion'
import React, { useState, useEffect } from "react";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";
import { registerUserWithEmail } from "../../Services/authentication.service";

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  appBar: {
    backgroundColor: "#000",
    color: "#fff",
  },
  bgPaper: {
    backgroundColor: "#000",
    color: "#fff",
    marginTop: "80px",
    width: "25vw",
    height: "auto",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: '10px'
  },
  avatar: {
    margin: "10px",
    backgroundColor: "#1F2833",
    
  },
  textField: {
    marginBottom: "10px",
    width: "80%",
  },
  buttonDiv:{
    marginBottom: '10px',
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
  formControl: {
    margin: theme.spacing(1),
    width: "80%",
    textAlign:'left'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  anchor: {
    textDecoration: "none",
    color: "#fff",
    cursor: "pointer",
    "&:hover": {
      color: "#4FA29E",
    },
  },
}));

const initialValues = {
  name: "",
  email: "",
  password: "",
  confPassword: "",
  designation: "",
  experience: "",
};

const Register = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#1F2833";
  }, []);
  const history = useHistory();
  const [values, setValues] = useState(initialValues);

  const classes = useStyles();

  const handleOnChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (values.email === "" ||
    values.password === "" ||
    values.name === "" ||
    values.confPassword === "" ||
    values.designation === "" ||
    values.experience === ""
    ) {
      alert("Fields cannot be empty");
    }
    else if(!pattern.test(values.email)){
      alert('Invalid email format')

    } 
    else if(values.password.length < 6)
    {
      alert('Password must be atleast 6 characters long')
    }
    else if (values.password !== values.confPassword) {
      alert('passwords do not match')
    } else {
      const user = {
        UserName : values.name,
        UserEmail: values.email,
        UserPassword: values.password,
        UserDesignation: values.designation,
        UserExperience: values.experience
      }

      registerUserWithEmail(user).then(data=>{
        if(data.userId === -1)
        {
          alert('This email is already linked with an account');
        }
        else
        {
          alert('Registered Successfully!');
          // storing user's id in the local storage
          localStorage.setItem('userId',data.userId);
          history.push('/UserDashboard');
        }
      });
    

      // Send this user object to the service method so it can be used with axios
    }
  };

  const fadeDown = {
    hidden: {opacity: 0, y: -350},
    visible :{opacity: 1, y:1}
  }

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
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
        variants={fadeDown}
        initial="hidden"
        animate="visible"
        transition={{duration:1.3}}
        
        >
        <Paper className={classes.bgPaper} elevation={10}>
          <Avatar className={classes.avatar}>
            <LockIcon style={{ color: "#66FCF1" }} />
          </Avatar>
          <Typography>
            <h4 style={{ margin: "0px" }}>User Registration</h4>
          </Typography>
          <TextField
            className={classes.textField}
            variant="outlined"
            type="name"
            name="name"
            value={values.name}
            onChange={handleOnChange}
            margin="dense"
            placeholder="Enter Name"
            required
            label="Name"
          />

          <TextField
            className={classes.textField}
            variant="outlined"
            type="email"
            name="email"
            value={values.email}
            onChange={handleOnChange}
            margin="dense"
            placeholder="Enter Email"
            required
            label="Email"
          />
          <TextField
            className={classes.textField}
            variant="outlined"
            name="password"
            type="password"
            value={values.password}
            onChange={handleOnChange}
            margin="dense"
            helperText="at least 6 characters"
            placeholder="Enter Password"
            required
            label="Password"
          />
          <TextField
            className={classes.textField}
            variant="outlined"
            name="confPassword"
            type="password"
            value={values.confPassword}
            onChange={handleOnChange}
            margin="dense"
            placeholder="Confirm Password"
            required
            label="Confirm Password"
          />
          <FormControl
            required
            margin="dense"
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel
              style={{ backgroundColor: "#000" }}
              id="demo-simple-select-outlined-label"
            >
              Designation
            </InputLabel>
            <Select
              name="designation"
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={values.designation}
              onChange={handleOnChange}
              label="Designation"
            >
              
              <MenuItem value={"Certified Trainer"}>Certified Trainer</MenuItem>
              <MenuItem value={"Regular Gym Goer"}>Regular Gym Goer</MenuItem>
              <MenuItem value={"Certified Nutritionist"}>
                Certified Nutritionist
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            className={classes.textField}
            variant="outlined"
            name="experience"
            type="number"
            value={values.experience}
            onChange={handleOnChange}
            margin="dense"
            placeholder="Experience in years"
            required
            label="Experience"
          />
          <motion.div
          className={classes.buttonDiv}
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.9}}>
          <Button className={classes.button} onClick={handleOnClick}>
            Register
          </Button>
          </motion.div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography>Already have an account ? |</Typography>
            <a className={classes.anchor} href="/Login">
              <Typography style={{ marginLeft: "3px" }}>Log In</Typography>
            </a>
          </div>
        </Paper>
        </motion.div>
      </ThemeProvider>
    </div>
  );
};

export default Register;
