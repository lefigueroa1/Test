import { useState } from 'react'
import axios from 'axios'
import Button from "@material-ui/core/Button"
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import { Link } from 'react-router-dom'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { colors } from '@material-ui/core'



function CreateRoomPage() {
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  const csrftoken = getCookie('csrftoken');
  axios.defaults.headers.common["X-CSRFToken"]=csrftoken

  let defaultVotes = 2;

  let [guestCanPause, setGuestCanPause] = useState(true);
  let [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  
  const handleVotesChange = (e)=> {
    setVotesToSkip(e.target.value)
  };

  const handleGuestCanPauseChange = (e) => {
    if (e.target.value === "true"){
      return setGuestCanPause(true)
    }
    else if(e.target.value ==="false"){
      return setGuestCanPause(false)
    }
  }

  const handleRoomButtonPressed = async() =>{
    let myResponse = await axios.post("/create_room/" , {"votes_to_skip":votesToSkip, "guest_can_pause":guestCanPause })
    console.log(myResponse.data['code'])
    let code = myResponse.data['code']
    window.location.href = `/room/${code}`

  }

  
  // const signIn=async()=>{
  //   let email = document.getElementById("signInEmail").value
  //   let password = document.getElementById("signInPassword").value
  //   let myResponse=await axios.post('signIn/', {'email': email, 'password':password})
  //   console.log(myResponse.data)
  //   if (myResponse.data["sign_in"] == true){
  //       window.location.reload()
  //     }
  // }
console.log(window.location)

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component='h4' variant='h4'>
            Create A Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component='fieldset'>
            <FormHelperText>
              <div align='center' class="textWhite">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup row defaultValue="true" onChange={handleGuestCanPauseChange}>
              <FormControlLabel value="true" control={<Radio color="primary"/>} label="Play/Pause" labelPlacement="bottom"/>
              <FormControlLabel value="false" control={<Radio color="secondary"/>} label="No Control" labelPlacement="bottom"/>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center" >
          <FormControl >
            <TextField 
            required={true}
            type='number' 
            onChange={handleVotesChange}
            defaultValue={defaultVotes}
            inputProps={{
              min: 1,
              style: {color: 'white', textAlign: "center"}
            }}/>
            <FormHelperText>
              <div align='center' class="textWhite">
                Votes Required To Skip song
              </div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center" >
          <Button color='primary' variant='contained' onClick={handleRoomButtonPressed}>Create A Room</Button>
        </Grid>
        <Grid item xs={12} align="center" >
          <Button color='secondary' variant='contained' to="/" component={Link}>Back</Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default CreateRoomPage