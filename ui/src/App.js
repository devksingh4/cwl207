import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SearchIcon from '@mui/icons-material/Search';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import IconButton from '@mui/material/IconButton';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Built at the University of Illinois Urbana-Champaign. Copyright '}
      {new Date().getFullYear()}
      {'. All rights reserved.'}
    </Typography>
  );
}


const theme = createTheme();

export default function Album() {
  let [name, setName] = React.useState('');
  let [searchResults, setSearchResults] = React.useState([]);
  let [path, setPath] = React.useState([]);
  let [loading, setLoading] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Bachchan Number
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Compute the distance between Amitabh Bachchan and other Bollywood actors.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="column"
              spacing={2}
              justifyContent="center"
            >
              {path.length !== 0 ? 
                <>
                <h2>{path[path.length - 1]}'s Amitabh number is {path.length - 1}</h2>
                <h3>Path:</h3>
                <List disablePadding={true} component={Stack} direction="column" styles={{display: "flex", flexFlow: "row wrap"}}>
                  {path.map((value) => (
                    <ListItem disableGutters={true}>
                        {value}
                    </ListItem>
                  ))}
                </List>
                </>
              : null}
              <TextField 
                id="name"
                label="Enter Name"
                variant="standard"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}/>
              <LoadingButton 
              variant="contained"
              onClick={async () => {
                setLoading(true);
                fetch(`https://cwl207api.devksingh.com/person?query=${name}`).then(async (response) =>{
                  const resp = await response.json();
                  setSearchResults([]);
                  setSearchResults(resp);
                }).catch(() => {
                  alert("There was an error executing this query, please try again.");
                })
                setLoading(false);
              }}
              > {loading ? null : <><SearchIcon sx={{ mr: 2 }} /> Search</>}</LoadingButton>
            </Stack>
            <List sx={{ width: '100%'}}>
                {searchResults.map((value) => (
                  <ListItem key={value.id} onClick={(e) => {fetch(`https://cwl207api.devksingh.com/distance?root=nm0000821&target=${value.id}`).then(async (response) =>{
                    const resp = await response.json();
                    setPath([]);
                    setPath(resp);
                    console.log(resp)
                  }).catch(() => {
                    alert("We could not find a path for this actor. Please, try again.");
                  })}}>
                  <ListItemButton>
                    <ListItemText primary={value.name} secondary={value.id} />
                  </ListItemButton>
                  <ListItemAvatar onClick={(e) => {window.open(`https://imdb.com/name/${value.id}`); e.stopPropagation();}}>
                    <IconButton>
                      <AccountCircleSharpIcon />
                    </IconButton>
                  </ListItemAvatar>
                </ListItem>
              ))}
            </List>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}