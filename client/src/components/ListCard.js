import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
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
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        else{
            store.setIsListNameEditInactive();
        }
        setEditActive(newActive);
    }

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
    //     console.log(idNamePair);
    //     setText(event.target.value);
    // }

    let likeNumber = <Typography variant="h5">l#</Typography>
    let dislikeNumber = <Typography variant="h5">d#</Typography>
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
        <IconButton>
            <Typography>By: Who</Typography>
        </IconButton>
    let viewText =
        <IconButton>
            <Typography>View: list.view</Typography>
        </IconButton>
    let editButton = 
        <IconButton onClick={(event) => {handleLoadList(event, idNamePair._id)}}>
            <Typography>Edit</Typography>
        </IconButton>
    let expandButton = 
        <IconButton onClick={(event)=> {console.log("Expand")}}>
            <ExpandMoreIcon/>
        </IconButton>

    let cardElement =
        <ListItem
            //disabled={store.isListNameEditActive}
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            button
            style={{
                fontSize: '10pt',
                width: '100%'
            }}
        >
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
                    <Grid item xs={6} md={1}>
                        {deleteButton}
                    </Grid>
                    <Grid item xs={6} md={12}>
                        {authorText}
                    </Grid>
                    <Grid item xs={6} md={7}>
                        {editButton}
                    </Grid>
                    <Grid item xs={6} md={4}>
                        {viewText}
                    </Grid>
                    <Grid item xs={6} md={1}>
                        {expandButton}
                    </Grid>
                </Grid>
                {/* <Box sx={{ p: 0 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='like' //</Box>disabled={store.isListNameEditActive}
                    >
                        <ThumbUpIcon style={{fontSize:'24pt'}} />
                    </IconButton>
                </Box> */}
                {/* <Box sx={{ p: 0 }}>
                    <Typography variant="h5">{likeNumber}</Typography>
                </Box> */}
                {/* <Box sx={{ p: 1 }}>
                    <Typography variant="h5"> &nbsp;&nbsp;&nbsp;</Typography>
                </Box> */}
                {/* <Box sx={{ p: 0 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='dislike' //</Box>disabled={store.isListNameEditActive}
                    >
                        <ThumbDownIcon style={{fontSize:'24pt'}} />
                    </IconButton>
                </Box> */}
                {/* <Box sx={{ p: 0 }}>
                    <Typography variant="h5">{dislikeNumber}</Typography>
                </Box> */}
                {/* <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete' //disabled={store.isListNameEditActive}
                    >
                        <DeleteIcon style={{fontSize:'24pt'}} />
                    </IconButton>
                </Box> */}
        </ListItem>

    // if (editActive) {
    //     cardElement =
    //         <TextField
    //             margin="normal"
    //             required
    //             fullWidth
    //             id={"list-" + idNamePair._id}
    //             label="Top 5 List Name"
    //             name="name"
    //             autoComplete="Top 5 List Name"
    //             className='list-card'
    //             onKeyPress={handleKeyPress}
    //             onChange={handleUpdateText}
    //             defaultValue={idNamePair.name}
    //             inputProps={{style: {fontSize: 48}}}
    //             InputLabelProps={{style: {fontSize: 24}}}
    //             autoFocus
    //         />
    // }
    return (
        cardElement
    );
}

export default ListCard;