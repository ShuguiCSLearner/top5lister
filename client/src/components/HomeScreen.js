import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Button, Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import FunctionsIcon from '@mui/icons-material/Functions';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


import List from '@mui/material/List';
import ListDeletionModal from './ListDeletionModal';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const menuId = 'sort-by-menu';
    const sortByMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Publish Date (Oldest)</MenuItem>
            <MenuItem onClick={handleMenuClose}>View</MenuItem>
            <MenuItem onClick={handleMenuClose}>Likes</MenuItem>
            <MenuItem onClick={handleMenuClose}>Dislike</MenuItem>
        </Menu>)      

    useEffect(() => {
        store.closeCurrentList();
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    let statusBar = 
        <div id="top5-statusbar">
        <IconButton 
            color="primary" 
            aria-label="add"
            id="add-list-button"
            size="large"
            onClick={handleCreateNewList}
        >
            <AddIcon style={{ fontSize: 80 ,color:'black'}}/>
        </IconButton>
        <Typography variant="h2">Your Lists</Typography>
        </div>

    let homeButton = 
        <div id="top5-homebutton">
        <Button 
            color="primary" 
            aria-label="close"
            id="home-list-button"
            size="large"
            // onClick={handleCreateNewList}
        >
            <HomeIcon style={{ fontSize: 50 ,color:'black'}}/>
        </Button>
        </div>

    let groupsButton =
        <div id="top5-groupsbutton">
        <Button 
            color="primary" 
            aria-label="close"
            id="all-list-button"
            size="large"
            // onClick={handleCreateNewList}
        >
            <GroupsIcon style={{ fontSize: 50 ,color:'black'}}/>
        </Button>
        </div>

    let personButton =
        <div id="top5-personbutton">
        <Button 
            color="primary" 
            aria-label="close"
            id="user-list-button"
            size="large"
            // onClick={handleCreateNewList}
        >
            <PersonIcon style={{ fontSize: 50 ,color:'black'}}/>
        </Button>
        </div>

    let sigmaButton =
        <div id="top5-sigmabutton">
        <Button 
            color="primary" 
            aria-label="close"
            id="community-list-button"
            size="large"
            // onClick={handleCreateNewList}
        >
            <FunctionsIcon style={{ fontSize: 50 ,color:'black'}}/>
        </Button>
        </div>

    let searchBar =
        <div id="top5-searchbar">
        <TextField
          id="seach-bar"
          label="Search"
          style={{width: 600}}
        />
        </div>

    let sortByText = 
        <div id="top5-sortText">
            <Typography variant="h5">Sort By</Typography>
        </div>

    let sortByButton = 
        <div id="top5-sortbutton">
        <Button 
            color="primary" 
            aria-label="sort"
            id="community-list-button"
            size="large"
            onClick={handleProfileMenuOpen}
        >
            <SortIcon style={{ fontSize: 50 ,color:'black'}}/>
        </Button>
        </div>

    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
            {homeButton}
            {groupsButton}
            {personButton}
            {sigmaButton}
            {searchBar}
            {sortByText}
            {sortByButton}
            {sortByMenu}
            
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            {statusBar}
            <ListDeletionModal/>
        </div>)
}

export default HomeScreen;