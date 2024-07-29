import React from 'react';
import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import SendIcon from '@mui/icons-material/Send';
import { Post } from '../types';

interface PostListProps {
  posts: Post[];
}

const useStyles = makeStyles<Theme>((theme) => ({
  cardActionContainer: {
    display: 'flex',
  },
  commentFieldContainer: {
    flexGrow: 1,
  },
  addCommentField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '24px',
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  commentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  commentContainer: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '12px',
  },
}));

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [expanded, setExpanded] = React.useState<{ [key: number]: boolean }>({});

  const classes = useStyles();

  const handleSeeMoreClick = (postId: number) => {
    setExpanded((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  interface ExpandMoreProps extends ButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <Button {...other} />;
  })(() => ({
    margin: 'auto',
  }));
  return (
    <>
      {posts.map((post) => (
        <Card key={post.id} variant="outlined" className={classes.postContainer}>
          <CardHeader
            title={post.user.name}
            subheader={post.user.company.name}
            avatar={<Avatar src={`https://robohash.org/${post.user.name}`} />}
          />
          <CardContent>
            <Typography variant="h4">{post.title}</Typography>
            <Typography variant="body2">{post.body}</Typography>
          </CardContent>
          <Divider variant="middle" />
          <CardContent>
            <Box className={classes.cardActionContainer}>
              <CardActions className={classes.commentFieldContainer}>
                <TextField
                  className={classes.addCommentField}
                  variant="outlined"
                  color="primary"
                  size="small"
                  placeholder="Add your comments here..."
                  InputProps={{
                    endAdornment: (
                      <IconButton color="primary">
                        <SendIcon sx={{ fontSize: '18px' }} />
                      </IconButton>
                    ),
                  }}
                  fullWidth
                />
              </CardActions>
              <CardActions>
                <ExpandMore
                  expand={expanded[post.id] || false}
                  onClick={() => handleSeeMoreClick(post.id)}
                  // endIcon={expanded[post.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  size="small"
                  aria-expanded={expanded[post.id] || false}
                  aria-label="see more"
                >
                  See Comments
                </ExpandMore>
              </CardActions>
            </Box>
            <Collapse in={expanded[post.id]}>
              <List className={classes.commentsContainer}>
                {post.comments.data.map((comment) => (
                  <ListItem
                    key={`post${post.id}_com${comment.id}`}
                    className={classes.commentContainer}
                  >
                    <ListItemAvatar>
                      <Avatar src={`https://robohash.org/${comment.email}`} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.email}
                      secondary={
                        <Typography variant="body2" component="span">
                          {comment.body}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default PostList;
