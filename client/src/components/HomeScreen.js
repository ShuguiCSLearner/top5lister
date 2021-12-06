import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import ListCard from './ListCard.js'
import { Button, Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import FunctionsIcon from '@mui/icons-material/Functions';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


import List from '@mui/material/List';
import ListDeletionModal from './ListDeletionModal';
import { borderColor } from '@mui/system'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const { auth } = useContext(AuthContext);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleNewDateFilter(){
        setAnchorEl(null);
        store.changeFilter(1);
        console.log("sort by new date");
    }
    function handleOldDateFilter(){
        setAnchorEl(null);
        store.changeFilter(2);
        console.log("sort by old date");
    }
    function handleMostViewFilter(){
        setAnchorEl(null);
        store.changeFilter(3);
        console.log("sort by most view");
    }
    function handleMostLikeFilter(){
        setAnchorEl(null);
        store.changeFilter(4);
        console.log("sort by most like");
    }
    function handleMostDislikeFilter(){
        setAnchorEl(null);
        store.changeFilter(5);
        console.log("sort by most dislike");
    }
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
            <MenuItem onClick={handleNewDateFilter}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleOldDateFilter}>Publish Date (Oldest)</MenuItem>
            <MenuItem onClick={handleMostViewFilter}>View</MenuItem>
            <MenuItem onClick={handleMostLikeFilter}>Likes</MenuItem>
            <MenuItem onClick={handleMostDislikeFilter}>Dislike</MenuItem>
        </Menu>)      

    useEffect(() => {
        store.closeCurrentList();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    function handleHomeScreenLoading(){
        auth.loadingScreen(1, store);
        store.loadIdNamePairs();
    }
    function handleAllUserScreenLoading(){
        auth.loadingScreen(2, store);
        store.loadAllIdNamePairs();
    }
    function handleOneUserScreenLoading(){
        auth.loadingScreen(3, store);
        store.loadOneIdNamePairs();
    }
    function handleCommunityScreenLoading(){
        auth.loadingScreen(4, store);
        store.loadCommunityIdNamePairs();
    }
    let listCard = "";
    if(store.filter === 1){ // New
        console.log("store.filter: ", store.filter)
        store.idNamePairs.sort(function(x, y){return new Date(y.publishDate) - new Date(x.publishDate)})
        if(store.pageNumber === 1){
            if(store.text === ""){
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
            else{
                let startWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase().startsWith(store.text.toLowerCase()));
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        startWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
        else if(store.pageNumber === 2){
            if(store.text === ""){
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
            else{
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase() === store.text.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
        else if(store.pageNumber === 3){
            if(store.text === ""){
                let emptyList = [];
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        emptyList.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
            else{
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.ownerName.toLowerCase() === store.text.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
        else if(store.pageNumber === 4){
            if(store.text === ""){
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
            else{
                let startWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase().startsWith(store.text.toLowerCase()));
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        startWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
    }
    if(store.filter === 2){ // Old
        store.idNamePairs.sort(function(x, y){return new Date(x.publishDate) - new Date(y.publishDate)})
        if(store.pageNumber === 1){
            if(store.text === ""){
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
            else{
                let startWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase().startsWith(store.text.toLowerCase()));
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        startWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
        else if(store.pageNumber === 2){
            if(store.text === ""){
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
            else{
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase() === store.text.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
        else if(store.pageNumber === 3){
            if(store.text === ""){
                let emptyList = [];
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        emptyList.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
            else{
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.ownerName.toLowerCase() === store.text.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
        else if(store.pageNumber === 4){
            if(store.text === ""){
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
            else{
                let startWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase().startsWith(store.text.toLowerCase()));
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        startWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
    }
    if(store.filter === 3){ // Most View
        store.idNamePairs.sort(function(x, y){return y.view - x.view})
        if(store.pageNumber === 1){
            if(store.text === ""){
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
            else{
                let startWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase().startsWith(store.text.toLowerCase()));
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        startWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
        else if(store.pageNumber === 2){
            if(store.text === ""){
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
            else{
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase() === store.text.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
        else if(store.pageNumber === 3){
            if(store.text === ""){
                let emptyList = [];
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        emptyList.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
            else{
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.ownerName.toLowerCase() === store.text.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
        else if(store.pageNumber === 4){
            if(store.text === ""){
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
            else{
                let startWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase().startsWith(store.text.toLowerCase()));
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        startWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
    }
    if(store.filter === 4){ // Most Like
        store.idNamePairs.sort(function(x, y){return y.like - x.like})
        if(store.pageNumber === 1){
            if(store.text === ""){
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
            else{
                let startWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase().startsWith(store.text.toLowerCase()));
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        startWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
        else if(store.pageNumber === 2){
            if(store.text === ""){
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
            else{
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase() === store.text.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
        else if(store.pageNumber === 3){
            if(store.text === ""){
                let emptyList = [];
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        emptyList.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
            else{
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.ownerName.toLowerCase() === store.text.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
        else if(store.pageNumber === 4){
            if(store.text === ""){
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
            else{
                let startWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase().startsWith(store.text.toLowerCase()));
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        startWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
    }
    if(store.filter === 5){ // Most Dislike
        store.idNamePairs.sort(function(x, y){return y.dislike - x.dislike})
        if(store.pageNumber === 1){
            if(store.text === ""){
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
            else{
                let startWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase().startsWith(store.text.toLowerCase()));
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        startWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
        else if(store.pageNumber === 2){
            if(store.text === ""){
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
            else{
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase() === store.text.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
        else if(store.pageNumber === 3){
            if(store.text === ""){
                let emptyList = [];
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        emptyList.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
            else{
                let exactWithidNamePairs = store.idNamePairs.filter(e => e.ownerName.toLowerCase() === store.text.toLowerCase());
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        exactWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
        else if(store.pageNumber === 4){
            if(store.text === ""){
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
            else{
                let startWithidNamePairs = store.idNamePairs.filter(e => e.name.toLowerCase().startsWith(store.text.toLowerCase()));
                listCard = 
                    <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
                    {
                        startWithidNamePairs.map((pair) => (
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                            />
                        ))
                    }
                    </List>;
            }
        }
    }
    // if (store) {
    //     listCard = 
    //         <List sx={{ width: '90%', left: '5%', bgcolor: '#e6e6e6' }}>
    //         {
    //             store.idNamePairs.map((pair) => (
    //                 <ListCard
    //                     key={pair._id}
    //                     idNamePair={pair}
    //                     selected={false}
    //                 />
    //             ))
    //         }
    //         </List>;
    // }
    let statusBar = 
        <div id="top5-statusbar">
        <IconButton 
            color="primary"
            aria-label="add"
            id="add-list-button"
            size="large"
            onClick={handleCreateNewList}
            disabled={auth.pageNumber !== 1}
        >
            <AddIcon style={{ fontSize: 80 ,color: auth.pageNumber !== 1 ? 'grey' : 'black'}}/>
        </IconButton>
        <Typography variant="h2" style={{color: auth.pageNumber !== 1 ? 'grey' : 'black'}}>Your Lists</Typography>
        </div>

    let homeButtonColor = auth.pageNumber === 1 ? "green" : "#e6e6e6"
    let groupsButtonColor = auth.pageNumber === 2 ? "green" : "#e6e6e6"
    let personButtonColor = auth.pageNumber === 3 ? "green" : "#e6e6e6"
    let sigmaButtonColor = auth.pageNumber === 4 ? "green" : "#e6e6e6"
    let homeButton = 
        <div id="top5-homebutton">
        <Button 
            color="primary" 
            aria-label="close"
            id="home-list-button"
            size="large"
            onClick={handleHomeScreenLoading}
        >
            <HomeOutlinedIcon style={{ fontSize: 50 ,color: "black", borderStyle: "solid", borderColor: homeButtonColor}}/>
        </Button>
        </div>

    let groupsButton =
        <div id="top5-groupsbutton">
        <Button 
            color="primary" 
            aria-label="close"
            id="all-list-button"
            size="large"
            onClick={handleAllUserScreenLoading}
        >
            <GroupsOutlinedIcon style={{ fontSize: 50 ,color: "black", borderStyle: "solid", borderColor: groupsButtonColor}}/>
        </Button>
        </div>

    let personButton =
        <div id="top5-personbutton">
        <Button 
            color="primary" 
            aria-label="close"
            id="user-list-button"
            size="large"
            onClick={handleOneUserScreenLoading}
        >
            <PersonOutlineOutlinedIcon style={{ fontSize: 50 ,color: "black", borderStyle: "solid", borderColor: personButtonColor}}/>
        </Button>
        </div>

    let sigmaButton =
        <div id="top5-sigmabutton">
        <Button 
            color="primary" 
            aria-label="close"
            id="community-list-button"
            size="large"
            onClick={handleCommunityScreenLoading}
        >
            <FunctionsIcon style={{ fontSize: 50 ,color: "black", borderStyle: "solid", borderColor: sigmaButtonColor}}/>
        </Button>
        </div>

    let searchBar =
        <div id="top5-searchbar">
        <TextField
          id="seach-bar"
          label="Search"
          style={{width: 600}}
          onKeyPress={(e)=>{if(e.key === "Enter"){store.enterSearchText(e.target.value)}}}
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