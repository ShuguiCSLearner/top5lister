import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

function CommentCard(props){
    const { comment } = props;

    return(
        <ListItem xs={{background:'#D4AF37'}}>
            <Typography>{comment}</Typography>
        </ListItem>
    )
}

export default CommentCard;