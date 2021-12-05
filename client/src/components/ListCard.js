import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import { Button } from '@mui/material';

import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Grid from '@mui/material/Grid';
import CommentCard from './CommentCard';

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

    function handleLike(){
        if(idNamePair.likeList.indexOf(auth.user.email) === -1 && idNamePair.dislikeList.indexOf(auth.user.email) === -1){
            store.likeListAction(idNamePair._id);
        }
        else if(idNamePair.likeList.indexOf(auth.user.email) === -1 && idNamePair.dislikeList.indexOf(auth.user.email) !== -1){
            store.likeAndUndislikeListAction(idNamePair._id);
        }
        else{
            store.unlikeListAction(idNamePair._id);
        }
    }
    function handleDislike(){
        if(idNamePair.dislikeList.indexOf(auth.user.email) === -1 && idNamePair.likeList.indexOf(auth.user.email) === -1){
            store.dislikeListAction(idNamePair._id);
        }
        else if(idNamePair.dislikeList.indexOf(auth.user.email) === -1 && idNamePair.likeList.indexOf(auth.user.email) !== -1){
            store.dislikeAndUnlikeListAction(idNamePair._id);
        }
        else{
            store.undislikeListAction(idNamePair._id);
        }
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    let likeButtonColor = "black"
    if(idNamePair.likeList.indexOf(auth.user.email) !== -1){
        likeButtonColor = "red"
    }
    let dislikeButtonColor = "black"
    if(idNamePair.dislikeList.indexOf(auth.user.email) !== -1){
        dislikeButtonColor = "red"
    }

    let likeNumber = <Typography variant="h5">{idNamePair.like}</Typography>
    let dislikeNumber = <Typography variant="h5">{idNamePair.dislike}</Typography>
    let thumbUpButton = 
        <IconButton onClick={handleLike} aria-label='like' //</Box>disabled={store.isListNameEditActive}
        >
            <ThumbUpIcon style={{fontSize:'24pt', color: likeButtonColor}} />
        </IconButton>
    let thumbDownButton = 
        <IconButton onClick={handleDislike} aria-label='dislike' //</Box>disabled={store.isListNameEditActive}
        >
            <ThumbDownIcon style={{fontSize:'24pt', color: dislikeButtonColor}} />
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
        <IconButton onClick={handleExpandMore}>
            <ExpandMoreIcon/>
        </IconButton>
    let itemListBoard =
        <div id="itemListBoard">
            <div className = 'item-list-board-item'>1. {idNamePair.items[0]}</div>
            <div className = 'item-list-board-item'>2. {idNamePair.items[1]}</div>
            <div className = 'item-list-board-item'>3. {idNamePair.items[2]}</div>
            <div className = 'item-list-board-item'>4. {idNamePair.items[3]}</div>
            <div className = 'item-list-board-item'>5. {idNamePair.items[4]}</div>
        </div>
        //     </Grid>
        // </Grid>
    
    let commentBoard =
        <div id = "commentBoard">
            <div id = "commentBoardComment">
                <List sx={{ width: '90%', left: '5%', bgcolor: '#d4d4f5'}}>
                {
                    idNamePair.comments.map((comment) => (
                        <CommentCard
                            comment={comment}
                        />
                    ))
                }
                </List>
            </div>
            <div id = "commentBoardTextField">
                <TextField
                    name="send-comment-textfield"
                    id="send-comment-textfile"
                    label="Add Comment"
                    required
                    fullWidth
                    inputProps={{style: {fontSize:12}}}
                    onKeyPress={(e)=>{if(e.key === "Enter" && e.target.value != ""){store.sendComment(idNamePair._id, auth.user.firstName + " " + auth.user.lastName + "-!-" + e.target.value); e.target.value = ""}}}
                />
            </div>
        </div>
    if(hasExpand){
        expandButton = 
        <IconButton onClick={(event)=> {setHasExpand(false); }}>
            <ExpandLessIcon/>
        </IconButton>
    }
    // This variable below control the color of the list card based on whether list has been publish or not 
    let displayListCardColor = idNamePair.hasPublished ? '#d4d4f5' : '#fffff1'
    //increment view + 1
    function handleExpandMore(event){
        setHasExpand(true);
        if(idNamePair.hasPublished){
            store.incrementView(idNamePair._id);
            console.log("auth", auth)
        }
    }

    let cardElementCollapse =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '10px', display: 'flex', p: 1, borderRadius: 5, border: 1, borderColor: 'grey',fontSize: '10pt',width: '100%',
            background:displayListCardColor}}>
                {/* <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box> */}
                <Grid container spacing={0}>
                    <Grid item xs={3} md={8}>
                        <Typography variant="h4"> {idNamePair.name}</Typography>
                    </Grid>
                    <Grid item xs={3} md={0.5}>
                        {thumbUpButton}
                    </Grid>
                    <Grid item xs={3} md={1} mt={1}>
                        {likeNumber}
                    </Grid>
                    <Grid item xs={3} md={0.5}>
                        {thumbDownButton}
                    </Grid>
                    <Grid item xs={3} md={1} mt={1}>
                        {dislikeNumber}
                    </Grid>
                    <Grid item xs={3} md={1}>
                        {deleteButton}
                    </Grid>
                    <Grid item xs={3} md={12}>
                        {authorText}
                    </Grid>
                    <Grid item xs={3} md={8}>
                        {editButton}
                    </Grid>
                    <Grid item xs={3} md={3}>
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
                <Grid item xs={3} md={8}>
                    <Typography variant="h4"> {idNamePair.name}</Typography>
                </Grid>
                <Grid item xs={3} md={0.5}>
                    {thumbUpButton}
                </Grid>
                <Grid item xs={3} md={1} mt={1}>
                    {likeNumber}
                </Grid>
                <Grid item xs={3} md={0.5}>
                    {thumbDownButton}
                </Grid>
                <Grid item xs={3} md={1} mt={1}>
                    {dislikeNumber}
                </Grid>
                <Grid item xs={3} md={1}>
                    {deleteButton}
                </Grid>
                <Grid item xs={3} md={12}>
                    {authorText}
                </Grid>
                <Grid item xs={3} md={6}>
                    {itemListBoard}
                </Grid>
                <Grid item xs={3} md={6}>
                    {commentBoard}
                </Grid>
                <Grid item xs={3} md={8}>
                    {editButton}
                </Grid>
                <Grid item xs={3} md={3}>
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