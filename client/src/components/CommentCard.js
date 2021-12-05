import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

function CommentCard(props){
    const { comment } = props;
    let index = comment.indexOf("-!-");
    let userName = comment.substring(0,index);
    let commentText = comment.substring(index+3);
    let commentCard = 
        <ListItem style={{background:'#d4af37', borderColor: 'black', borderRadius: 10, marginTop: '5pt'}}>
            <div>
                <Typography sx={{color: 'blue', textDecorationLine: "underline"}}>{userName}</Typography>
                <Typography>{commentText}</Typography>
            </div>
        </ListItem>
    return(
        commentCard
    )
}

export default CommentCard;