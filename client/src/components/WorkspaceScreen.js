import { useContext, useEffect } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'


import AddIcon from '@mui/icons-material/Add';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import FunctionsIcon from '@mui/icons-material/Functions';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { bgcolor } from '@mui/system';
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


    // let editItems = "";
    // if (store.currentList) {
    //     editItems = 
    //         <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
    //             {
    //                 store.currentList.items.map((item, index) => (
    //                     <Top5Item 
    //                         key={'top5-item-' + (index+1)}
    //                         text={item}
    //                         index={index} 
    //                     />
    //                 ))
    //             }
    //         </List>;
    // }

    // header
    let homeButton = 
    <div id="top5-homebutton">
    <Button 
        color="primary" 
        aria-label="close"
        id="home-list-button"
        size="large"
        disabled={true}
    >
        <HomeOutlinedIcon style={{ fontSize: 50 ,color:'grey', borderColor: "green", borderStyle: "solid"}}/>
    </Button>
    </div>

let groupsButton =
    <div id="top5-groupsbutton">
    <Button 
        color="primary" 
        aria-label="close"
        id="all-list-button"
        size="large"
        disabled={true}
    >
        <GroupsOutlinedIcon style={{ fontSize: 50 ,color:'grey'}}/>
    </Button>
    </div>

let personButton =
    <div id="top5-personbutton">
    <Button 
        color="primary" 
        aria-label="close"
        id="user-list-button"
        size="large"
        disabled={true}
    >
        <PersonOutlineOutlinedIcon style={{ fontSize: 50 ,color:'grey'}}/>
    </Button>
    </div>

let sigmaButton =
    <div id="top5-sigmabutton">
    <Button 
        color="primary" 
        aria-label="close"
        id="community-list-button"
        size="large"
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
    let save = true;
    function toggleSave(){
        save = false;
        console.log("publishing");
    }


    const handleSubmit = (event) => {
        console.log("submit")
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let listName = formData.get('list-name-textfield');
        let itemName1 = formData.get('item-name1-textfield');
        let itemName2 = formData.get('item-name2-textfield');
        let itemName3 = formData.get('item-name3-textfield');
        let itemName4 = formData.get('item-name4-textfield');
        let itemName5 = formData.get('item-name5-textfield');
        if(listName === "" || itemName1 === "" || itemName2 === "" || itemName3 === "" || itemName4 === "" || itemName5 === "" ){
            console.log("empty")
        }
        else{
            if(save === true){  //save list
                store.saveList(listName, itemName1, itemName2, itemName3, itemName4, itemName5);
            }
            else{  //publish list
                store.publishList(listName, itemName1, itemName2, itemName3, itemName4, itemName5);
            }
        }
    }
    let displayWorkSpace = "Loading"
    if(store.currentList){
        displayWorkSpace =
            <div id="top5-workspace">
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <div id="top5-workspace-textfield-part2">
                        <div className="list-name-corresponding-list" xs={3} md={6}>
                            <TextField
                            name="list-name-textfield"
                            id="list-name-textfield"
                            required
                            fullWidth
                            defaultValue={store.currentList.name}
                            inputProps={{style: {fontSize:26}}}
                            />
                        </div>
                        <div id="save-button">
                            <Button variant="outlined" style={{maxWidth: '67px',  minWidth: '67px'}} type="submit">
                                Save
                            </Button>
                        </div>
                        <div id="publish-button">
                            <Button variant="outlined" style={{maxWidth: '67px',  minWidth: '67px'}} type="submit" onClick={toggleSave}>
                                Publish
                            </Button>
                        </div>
                    </div>
                    <div id="top5-workspace-textfield">
                        <Grid container spacing={1}>
                            {/* <Grid item className="list-name-corresponding-list" xs={3} md={6} mx={3} my = {1.5}>
                                <TextField
                                name="list-name-textfield"
                                id="list-name-textfield"
                                required
                                fullWidth
                                defaultValue={store.currentList.name}
                                inputProps={{style: {fontSize:26}}}
                                />
                            </Grid> 
                            <Grid item xs={3} md={5}>
                            </Grid>
                            */}
                            <Grid item xs={3} md={1} mx={2}>
                                <div className="item-number-border"><Typography variant="h2" style={{fontSize: 53, borderRadius: 5, border: 1}}>1.</Typography></div>
                            </Grid>
                            <Grid item xs={3} md={10}>
                                <div className="item-number-corresponding-item">
                                    <TextField 
                                    name="item-name1-textfield"
                                    id="item-name1-textfield"
                                    required
                                    fullWidth
                                    defaultValue={store.currentList.items[0]} 
                                    inputProps={{style: {fontSize: 22}}}/>
                                </div>
                            </Grid>
                            <Grid item xs={3} md={1} mx={2} >
                                <div className="item-number-border"><Typography variant="h2" style={{fontSize: 53, borderRadius: 5, border: 1}}>2.</Typography></div>
                            </Grid>
                            <Grid item xs={3} md={10}>
                                <div className="item-number-corresponding-item">
                                    <TextField 
                                    name="item-name2-textfield"
                                    id="item-name2-textfield"
                                    required
                                    fullWidth
                                    defaultValue={store.currentList.items[1]} 
                                    inputProps={{style: {fontSize: 22}}}/>
                                </div>
                            </Grid>
                            <Grid item xs={3} md={1} mx={2}>
                                <div className="item-number-border"><Typography variant="h2" style={{fontSize: 53}}>3.</Typography></div>
                            </Grid>
                            <Grid item xs={3} md={10}>
                                <div className="item-number-corresponding-item">
                                    <TextField 
                                    name="item-name3-textfield"
                                    id="item-name3-textfield"
                                    required
                                    fullWidth
                                    defaultValue={store.currentList.items[2]} 
                                    inputProps={{style: {fontSize: 22}}}/>
                                </div>
                            </Grid>
                            <Grid item xs={3} md={1} mx={2}>
                                <div className="item-number-border"><Typography variant="h2" style={{fontSize: 53}}>4.</Typography></div>
                            </Grid>
                            <Grid item xs={3} md={10}>
                                <div className="item-number-corresponding-item">
                                    <TextField 
                                    name="item-name4-textfield"
                                    id="item-name4-textfield"
                                    required
                                    fullWidth
                                    defaultValue={store.currentList.items[3]} 
                                    inputProps={{style: {fontSize: 22}}}/>
                                </div>
                            </Grid>
                            <Grid item xs={3} md={1} mx={2}>
                                <div className="item-number-border"><Typography variant="h2" style={{fontSize: 57}}>5.</Typography></div>
                            </Grid>
                            <Grid item xs={3} md={10}>
                                <div className="item-number-corresponding-item">
                                    <TextField 
                                    name="item-name5-textfield"
                                    id="item-name5-textfield"
                                    required
                                    fullWidth
                                    defaultValue={store.currentList.items[4]} 
                                    inputProps={{style: {fontSize: 22}}}/>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </div>
    }
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
            {displayWorkSpace}    

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