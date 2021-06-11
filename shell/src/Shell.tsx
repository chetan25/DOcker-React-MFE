import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const Home = () => {
  let location = useLocation();
  console.log(location);
  
    return <div>
        Welcome Shell Page
        <div>
          <Typography
              variant="h6"
              color="inherit"
              noWrap
              component={RouterLink}
              to="/home"
            >
              Home
            </Typography>
        </div>
    </div>
}

export default Home;