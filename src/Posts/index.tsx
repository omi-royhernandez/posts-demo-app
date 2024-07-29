import { Box, Paper, Theme } from '@mui/material';
import PostsView from './views/PostView';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles<Theme>((theme) => ({
  postContainer: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    width: '65%',
    margin: '24px auto',
    maxWidth: '780px',
  },
}));

const Component = () => {
  const classes = useStyles();
  return (
    <Box className={classes.postContainer} component={Paper} elevation={12} variant="elevation">
      <PostsView />
    </Box>
  );
};

export default Component;
