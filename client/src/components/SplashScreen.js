import { useContext } from 'react';
import AuthContext from '../auth'
import Copyright from './Copyright'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
//
import { GlobalStoreContext } from '../store'

export default function SplashScreen() {
    return (
        <div id="splash-screen">
        <Typography component="h1" variant="h4" color="black" fontWeight='bold' align='center'>
            Welcome to Top5Lister
        </Typography>
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '10vh' }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Button
                variant="contained"
                href="/login/"
                sx={{ mt: 3, mb: 2 }}
                style={{maxWidth: '250px',  minWidth: '250px'}}
              >
                Login
              </Button>
              <Button
                variant="contained"
                href="/register/"
                sx={{ mt: 3, mb: 2 }}
                style={{maxWidth: '250px',  minWidth: '250px'}}
              >
                Create Account
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{maxWidth: '250px',  minWidth: '250px'}}
              >
                Continue As Guest
              </Button>
            </Box>
        </Grid>
        <Typography component="h1" variant="h5" color="black" fontWeight='bold' align='center'>
            This is a web application that you can list your top 5 favorite things and find other users that have same interests
          </Typography>
          <Typography component="h1" variant="h6" color="black" align='center'>
            Developer @Shugui Chen
          </Typography>
      </div>
    )
}