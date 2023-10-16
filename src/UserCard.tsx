import "./styles.css";
import { Button, Card, Typography, CardContent, CardActions, Box   } from "@mui/material";
import {USER } from './types';

type UserCardProps = {
 user: USER,
 removeUser: (id: string) => void,
};

const UserCard = ({user, removeUser}:UserCardProps) => {
    return (
      <Card  key={user.id}>
        <CardContent>
          <Typography variant="h5" color="text.primary">
             {`${user.username}, ${user.age}`}
          </Typography>
          <Typography variant="h6" component="div">
            {user.companyName}
          </Typography>
          <Typography color="text.secondary">
          <p>{`${user.address.street}, ${user.address.city},Zip code-${user.address.zipcode}`}</p>
          </Typography>
        </CardContent>
        <CardActions>
          <Box justifyContent="center"  mb={3} width="100%">
            <Button
                variant="contained"
                onClick={() => removeUser(user.id)}> Remove  </Button>
          </Box>
        </CardActions>
      </Card>
    );
  }

  export default UserCard;