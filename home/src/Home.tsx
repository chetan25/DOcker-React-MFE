import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const Home = () => {
    return <div>
       <h2>Hello From Remote Home Page</h2>
       <div>
          <Typography
              variant="h6"
              color="inherit"
              noWrap
              component={RouterLink}
              to="/home/about"
            >
              About
            </Typography>
        </div>
    </div>
}

export default Home;