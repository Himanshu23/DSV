import "./styles.css";
import { TextField, Box, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { useState, useEffect,   } from "react";
import { USER } from './types';
import React from 'react';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

type UserCardProps = {
    users: Array<USER>,
    deletedUsers: Array<USER>,
    restoreUser: (id: string) => void;
};
const Search = ({ users, deletedUsers, restoreUser }: UserCardProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Array<USER>>([]);
    const [deletedSearchResults, setSearchDeletedResults] = useState<Array<USER>>([]);

    const matchUsers = (users: Array<USER>, searchTerm: string) => {
        const regexp = new RegExp(searchTerm, 'i');
        return users.filter((el: USER) => regexp.test(el.username))
    }
    useEffect(() => {
        const serchTearmTimer = setTimeout(() => {
          console.log("Executing Custom function")
            if (searchTerm) {
                setSearchResults(matchUsers(users, searchTerm));
                setSearchDeletedResults(matchUsers(deletedUsers, searchTerm));
            } else {
                setSearchResults([])
            }
        }, 500);
        return () => clearTimeout(serchTearmTimer)
    }, [searchTerm, users, deletedUsers, setSearchResults, setSearchDeletedResults])

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
    }

    return (
        <>
            <p>Search for a user</p>
            <TextField
                sx={{ width: "30%" , marginBlockEnd: "2px" }}
                defaultValue={searchTerm}
                onChange={handleInputChange}
            />

            <Box display="flex"  justifyContent="center">
                {searchTerm && <List sx={{width: "100%", maxWidth: "30%", bgcolor: 'background.paper' }}>
                    {searchResults && searchResults.length > 0 && searchResults.map(el => <ListItem key={el.id}> <ListItemText primary={el.username} /></ListItem>)}
                    {deletedSearchResults && deletedSearchResults.length > 0 && deletedSearchResults.map(el => <ListItem key={el.id} secondaryAction={
                        <IconButton aria-label="comment" onClick={() => restoreUser(el.id)}>
                            <SettingsBackupRestoreIcon />
                        </IconButton>
                    }> <ListItemText primary={el.username} /></ListItem>)}

                    {(searchResults.length <= 0 && deletedSearchResults.length <= 0) && <ListItem> <ListItemText primary="No Results" /></ListItem>}
                </List>}
            </Box>
        </>
    )
}

export default Search; 