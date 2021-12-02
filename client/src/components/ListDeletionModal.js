import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { GlobalStoreContext } from '../store';

import { useContext } from 'react';
import AuthContext from '../auth';
const style = {
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3,
};
export default function ListDeletionModal(){     
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const ListName = store.listMarkedForDeletion ? store.listMarkedForDeletion.name : "";
    return(
        <Modal
            open={store.listMarkedForDeletion}
            onClose={!store.listMarkedForDeletion}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
            <Typography align='center'>
                <Box sx={style}>
                    <Alert severity="info"> Delete {ListName}? </Alert>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={store.handleDeleteList}
                    >
                        Confirm
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={store.unmarkListForDeletion}
                    >
                        Cancel
                    </Button>
                </Box>
            </Typography>
        </Modal>
    )
}