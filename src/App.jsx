import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

export default function App () {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
      <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <Link to="/basic">
              <CardMedia
                component="img"
                height="140"
                image="https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png"
                alt="basic sphere mesh"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Basic Demo (WIP)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <Link to="/procedurally-generated">
              <CardMedia
                component="img"
                height="140"
                image="https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png"
                alt="procedurally generated"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Procedurally Generated Map
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <Link to="/blender-lighthouse">
              <CardMedia
                component="img"
                height="140"
                image="https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png"
                alt="lighthouse made in blender"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Blender Lighthouse
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}
