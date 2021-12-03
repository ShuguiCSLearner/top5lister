import { useContext, useEffect } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'


import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import FunctionsIcon from '@mui/icons-material/Functions';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';
import { Button } from '@mui/material';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {                                   
        let url = window.location.href;
        let indexBeforeURL = url.lastIndexOf("/");
        let loadingListID = url.substring(indexBeforeURL+1);
        store.setCurrentList(loadingListID);
    }, []);

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
    }

    // header
    let homeButton = 
    <div id="top5-homebutton">
    <Button 
        color="primary" 
        aria-label="close"
        id="home-list-button"
        size="large"
        // onClick={handleCreateNewList}
        disabled={true}
    >
        <HomeIcon style={{ fontSize: 50 ,color:'grey'}}/>
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
        disabled={true}
    >
        <GroupsIcon style={{ fontSize: 50 ,color:'grey'}}/>
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
        disabled={true}
    >
        <PersonIcon style={{ fontSize: 50 ,color:'grey'}}/>
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
        disabled={true}
    >
        <FunctionsIcon style={{ fontSize: 50 ,color:'grey'}}/>
    </Button>
    </div>

let searchBar =
    <div id="top5-searchbar">
    <TextField
      id="seach-bar"
      label="Search"
      style={{width: 600}}
      disabled={true}
    />
    </div>

let sortByText = 
    <div id="top5-sortText">
        <Typography variant="h5" color="textSecondary">Sort By</Typography>
    </div>

let sortByButton = 
    <div id="top5-sortbutton">
    <Button 
        color="primary" 
        aria-label="sort"
        id="community-list-button"
        size="large"
        disabled={true}
    >
        <SortIcon style={{ fontSize: 50 ,color:'grey'}}/>
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
            
            </div>
            <div id="top5-workspace">
                <div id="workspace-edit">
                    <div id="edit-numbering">
                        <div className="item-number"><Typography variant="h3">1.</Typography></div>
                        <div className="item-number"><Typography variant="h3">2.</Typography></div>
                        <div className="item-number"><Typography variant="h3">3.</Typography></div>
                        <div className="item-number"><Typography variant="h3">4.</Typography></div>
                        <div className="item-number"><Typography variant="h3">5.</Typography></div>
                    </div>
                    {editItems}
                </div>
            </div>
            <div id="top5-statusbar">
                <IconButton 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    size="large"
                    disabled={true}
                >
                    <AddIcon style={{ fontSize: 80 ,color:'grey'}}/>
                </IconButton>
                <Typography variant="h2" color="textSecondary">Your Lists</Typography>
            </div>
        </div>
    )
}

export default WorkspaceScreen;