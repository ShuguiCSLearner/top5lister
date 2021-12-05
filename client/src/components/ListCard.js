import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Grid from '@mui/material/Grid';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [hasExpand, setHasExpand] = useState(false);
    const { idNamePair } = props;

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }
    // function handleToggleEdit(event) {
    //     event.stopPropagation();
    //     toggleEdit();
    // }

    // function toggleEdit() {
    //     let newActive = !editActive;
    //     if (newActive) {
    //         store.setIsListNameEditActive();
    //     }
    //     else{
    //         store.setIsListNameEditInactive();
    //     }
    //     setEditActive(newActive);
    // }
    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    // function handleKeyPress(event) {
    //     if (event.code === "Enter") {
    //         let id = event.target.id.substring("list-".length);
    //         store.changeListName(id, text);
    //         toggleEdit();
    //     }
    // }
    // function handleUpdateText(event) {
    //     setText(event.target.value);
    // }

    let likeNumber = <Typography variant="h5">{idNamePair.like}</Typography>
    let dislikeNumber = <Typography variant="h5">{idNamePair.dislike}</Typography>
    let thumbUpButton = 
        <IconButton onClick={()=>{console.log("like")}} aria-label='like' //</Box>disabled={store.isListNameEditActive}
        >
            <ThumbUpIcon style={{fontSize:'24pt'}} />
            {likeNumber}
        </IconButton>
    let thumbDownButton = 
        <IconButton onClick={()=>{console.log("dislike")}} aria-label='dislike' //</Box>disabled={store.isListNameEditActive}
        >
            <ThumbDownIcon style={{fontSize:'24pt'}} />
            {dislikeNumber}
        </IconButton>
    let deleteButton = 
        <IconButton onClick={(event) => {
            handleDeleteList(event, idNamePair._id)
        }} aria-label='delete' //disabled={store.isListNameEditActive}
        >
            <DeleteIcon style={{fontSize:'24pt'}} />
        </IconButton>
    let authorText =  
        <div>
            <Typography display="inline" sx={{my: 0, mx: 0}}>By:&nbsp;</Typography>
            <Typography display="inline" sx={{color: 'blue', textDecorationLine: "underline"}}>{idNamePair.ownerName}</Typography>
        </div>
    let viewText =
        <div>
            <Typography display="inline" sx={{my: 0, mx: 0}}>View:&nbsp;</Typography>
            <Typography display="inline" sx={{color: '#b6424d'}}>{idNamePair.view}</Typography>
        </div>
    let editButton = 
        <div>
            <Typography display="inline" sx={{my: 0, mx: 0, color:'red', cursor: "pointer", textDecorationLine: "underline"}} onClick={(event) => {handleLoadList(event, idNamePair._id)}}>Edit</Typography>
            <Typography display="inline"></Typography>
        </div>
    if(idNamePair.hasPublished === true){
        editButton = 
        <div>
            <Typography display="inline" sx={{my: 0, mx: 0}}>Published: </Typography>
            <Typography display="inline" sx={{color: '#6db665'}}>{idNamePair.publishDate}</Typography>
        </div>
    }
    let expandButton = 
        <IconButton onClick={(event)=> {setHasExpand(true); }}>
            <ExpandMoreIcon/>
        </IconButton>
    if(hasExpand){
        expandButton = 
        <IconButton onClick={(event)=> {setHasExpand(false); }}>
            <ExpandLessIcon/>
        </IconButton>
    }
    // This variable below control the color of the list card based on whether list has been publish or not 
    let displayListCardColor = idNamePair.hasPublished ? '#d4d4f5' : '#fffff1'

    let cardElementCollapse =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '10px', display: 'flex', p: 1, borderRadius: 5, border: 1, borderColor: 'grey',fontSize: '10pt',width: '100%',
            background:displayListCardColor}}>
                {/* <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box> */}
                <Grid container spacing={0}>
                    <Grid item xs={3} md={9}>
                        <Typography variant="h4"> {idNamePair.name}</Typography>
                    </Grid>
                    <Grid item xs={3} md={1}>
                        {thumbUpButton}
                    </Grid>
                    <Grid item xs={3} md={1}>
                        {thumbDownButton}
                    </Grid>
                    <Grid item xs={3} md={1}>
                        {deleteButton}
                    </Grid>
                    <Grid item xs={3} md={12}>
                        {authorText}
                    </Grid>
                    <Grid item xs={3} md={7}>
                        {editButton}
                    </Grid>
                    <Grid item xs={3} md={4}>
                        {viewText}
                    </Grid>
                    <Grid item xs={3} md={1}>
                        {expandButton}
                    </Grid>
                </Grid>
        </ListItem>
    let cardElement = cardElementCollapse
    if(hasExpand){
        cardElement = 
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '10px', display: 'flex', p: 1, borderRadius: 5, border: 1, borderColor: 'grey',fontSize: '10pt',width: '100%',
            background:displayListCardColor}}>
            <Grid container spacing={0}>
                <Grid item xs={3} md={9}>
                    <Typography variant="h4"> {idNamePair.name}</Typography>
                </Grid>
                <Grid item xs={3} md={1}>
                    {thumbUpButton}
                </Grid>
                <Grid item xs={3} md={1}>
                    {thumbDownButton}
                </Grid>
                <Grid item xs={3} md={1}>
                    {deleteButton}
                </Grid>
                <Grid item xs={100} md={12}>
                    {authorText}
                </Grid>
                <Grid item xs={100} md={6}>
                    list item board area
                </Grid>
                <Grid item xs={3} md={6}>
                    comment area
                </Grid>
                <Grid item xs={3} md={7}>
                    {editButton}
                </Grid>
                <Grid item xs={3} md={4}>
                    {viewText}
                </Grid>
                <Grid item xs={3} md={1}>
                    {expandButton}
                </Grid>
            </Grid>
        </ListItem>
    }


    return (
        cardElement
    );
}

export default ListCard;