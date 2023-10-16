import "./styles.css";
import { useState, useEffect, useCallback } from "react";
import { Box, Grid } from "@mui/material";
import { users as USER_DATA } from './data';
import { USER } from './types';
import UserCard from './UserCard';
import Search from './Search';

const generateRandomString = () => {
    const str = "ABCDEF123456";
    let randStr = "";
    for(let i=0; i< str.length; i++) {
        randStr = randStr+ str.charAt(Math.floor(Math.random() * str.length))
    }
    return randStr;

}
const UsersComponent = () => {
    const [users, setUsers] = useState<Array<USER>>([]);
    const [deletedUsers, setDeletedUsers] = useState<Array<USER>>([]);

    const sortdata = useCallback((users: Array<USER>): Array<USER> => {
        return users.sort((a, b) => {
            if (a.age === b.age) {
                if (a.companyName < b.companyName) {
                    return -1;
                }
                if (a.companyName > b.companyName) {
                    return 1;
                }
                return 0;
            }
            return a.age - b.age;
        })
    }, [])

    useEffect(() => {
        const fData = USER_DATA.filter(el => el.age >= 18)
            .map(({ company, age, username, address }) => ({ id: generateRandomString(), age, username, address, companyName: company.name}));

        setUsers(sortdata(fData));
        console.log({fData})
    }, [setUsers, sortdata]);


    const removeUser = (id: string) => {
        const userIndex = users.findIndex(el => el.id === id);
        if (userIndex != -1) {
            setDeletedUsers([...deletedUsers, users[userIndex]]);
            users.splice(userIndex, 1)
            setUsers(users);
        }
    }

    const restoreUser = (id: string) => {
        const userIndex = deletedUsers.findIndex(el => el.id === id);
        if (userIndex != -1) {
            setUsers(sortdata([...users, deletedUsers[userIndex]]));
            deletedUsers.splice(userIndex, 1)
            setDeletedUsers(deletedUsers)
        }
    }

    return (
        <>
            <Search users={users} deletedUsers={deletedUsers} restoreUser={restoreUser}></Search>
            <Grid container spacing={3}>
                {users && users.length && users.map(el =>  
                    <Grid key={`drid-${el.id}`} item xs={4}><UserCard key={`card-${el.id}`} removeUser={removeUser} user={el}></UserCard> </Grid>)}
            </Grid>
        </>
    )


}

export default UsersComponent;