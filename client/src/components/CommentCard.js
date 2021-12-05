import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

function CommentCard(props){
    const { comment } = props;
    let commentCard = 
        <ListItem style={{background:'#d4af37', borderColor: 'black', borderRadius: 10, marginTop: '5pt'}}>
            <Typography>{comment}</Typography>
        </ListItem>
    return(
        commentCard
    )
}

export default CommentCard;