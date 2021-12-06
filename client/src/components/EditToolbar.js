import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }  
    return (
        <div id="edit-toolbar">
            {/* <Button 
                disabled = {store.isItemEditActive}
                id='undo-button'
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button 
                 disabled = {store.isItemEditActive}
                id='redo-button'
                variant="contained">
                    <RedoIcon />
            </Button> 
            <Button
                disabled = {store.isItemEditActive}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button>*/}
        </div>
    )
}

export default EditToolbar;