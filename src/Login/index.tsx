import React, { useEffect } from 'react';
import { useQuery, QueryResult } from '@apollo/client';
import { authenticateEmail } from './queries';
import { AuthenticateEmailData, QueryOptions } from './types';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const { login, loggedInUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      navigate('/');
      return;
    }
  }, [loggedInUser]);

  const { refetch }: QueryResult<AuthenticateEmailData, QueryOptions> = useQuery(
    authenticateEmail,
    {
      skip: true,
      variables: {
        options: {
          search: {
            q: email,
          },
        },
      },
      onCompleted: (response) => {
        if (response.users.data.length > 0) {
          const queriedEmail = response.users.data[0].email;
          if (queriedEmail === email) {
            login(email);
            navigate('/');
          }
        } else {
          console.error('No user found in database');
        }
      },
      onError: (error) => {
        console.error('Error:', error);
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await refetch({
        options: {
          search: {
            q: email,
          },
        },
      });
    } catch (error) {
      console.error('Query error:', error);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
