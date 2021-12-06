import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_ITEM_EDIT_INACTIVE: "SET_ITEM_EDIT_INACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_INACTIVE: "SET_LIST_NAME_EDIT_INACTIVE",
    CHANGE_ALLUSER_SCREEN: "CHANGE_ALLUSER_SCREEN",
    CHANGE_ONEUSER_SCREEN: "CHANGE_ONEUSER_SCREEN",
    CHANGE_COMMUNITYLIST_SCREEN: "CHANGE_COMMUNITYLIST_SCREEN",
    CHANGE_FILTER_TYPE: "CHANGE_FILTER_TYPE",
    SEARCH_TEXT: "SEARCH_TEXT"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null,
        pageNumber: 0,                 // 1: home , 2: allList, 3: user, 4: community
        filter: 1,                     // 1: New Date, 2: Old Date, 3: View, 4: Most Like, 5: Most Dislike
        text: ""
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    pageNumber: 1,
                    filter: 1,
                    text: store.text
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    pageNumber: 1,
                    filter: store.filter,
                    text: store.text
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    pageNumber: 1,
                    filter: store.filter,
                    text: store.text
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    pageNumber: 1,
                    filter: store.filter,
                    text: store.text
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload,
                    pageNumber: 1,
                    filter: store.filter,
                    text: store.text
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    pageNumber: 1,
                    filter: store.filter,
                    text: store.text
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    pageNumber: 1,
                    filter: store.filter,
                    text: store.text
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: true,
                    listMarkedForDeletion: null,
                    pageNumber: 1,
                    filter: store.filter,
                    text: store.text
                });
            }
            // END EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_INACTIVE: {     // my item proof design
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    pageNumber: 1,
                    filter: store.filter,
                    text: store.text
                });
            }                                                       
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    pageNumber: 1,
                    filter: store.filter,
                    text: store.text
                });
            }
            // END EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_INACTIVE: {   // my list proof design
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    pageNumber: 1,
                    filter: store.filter,
                    text: store.text
                });
            }
            case GlobalStoreActionType.CHANGE_ALLUSER_SCREEN: {   // my list proof design
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    pageNumber: 2,
                    filter: store.filter,
                    text: store.text
                });
            }
            case GlobalStoreActionType.CHANGE_ONEUSER_SCREEN: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    pageNumber: 3,
                    filter: store.filter,
                    text: store.text
                });
            }
            case GlobalStoreActionType.CHANGE_FILTER_TYPE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: store.isListNameEditActive,
                    isItemEditActive: store.isItemEditActive,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    pageNumber: store.pageNumber,
                    filter: payload,
                    text: store.text
                })
            }
            case GlobalStoreActionType.SEARCH_TEXT: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: store.isListNameEditActive,
                    isItemEditActive: store.isItemEditActive,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    pageNumber: store.pageNumber,
                    filter: store.filter,
                    text: payload
                })
            }
            default:
                return store;
        }
    }
    // store.loadIdNamePairs = async function () { // = {pageNumber: 1}
    //     console.log(store.pageNumber);
    //     const response = await api.getTop5ListPairs();
    //     if (response.data.success) {
    //         let pairsArray = response.data.idNamePairs;
    //         storeReducer({
    //             type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
    //             payload: pairsArray
    //         });
    //     }
    //     else {
    //         console.log("API FAILED TO GET THE LIST PAIRS");
    //     }
    // }
    store.changeFilter = function(input){
        storeReducer({
            type: GlobalStoreActionType.CHANGE_FILTER_TYPE,
            payload: input
        })
    }
    store.enterSearchText = function(input){
        storeReducer({
            type: GlobalStoreActionType.SEARCH_TEXT,
            payload: input
        })
    }

    store.loadAllIdNamePairs = async function (){
        const response = await api.getAllTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
                type: GlobalStoreActionType.CHANGE_ALLUSER_SCREEN,
                payload: pairsArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }
    store.loadOneIdNamePairs = async function (){
        const response = await api.getAllTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
                type: GlobalStoreActionType.CHANGE_ONEUSER_SCREEN,
                payload: pairsArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs(top5List) {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: pairsArray,
                                    top5List: top5List
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }
    store.searchText = function (){
        console.log("undone");
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
        history.push("/");
    }
    store.likeListAction = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            let newLikeList = top5List.likeList;
            newLikeList.push(auth.user.email);
            top5List.likeList = newLikeList;
            top5List.like = top5List.like + 1;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    if(store.pageNumber === 1){
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                    else if(store.pageNumber === 2){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ALLUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                    else if(store.pageNumber === 3){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ONEUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                }
            }
            updateList(top5List);
        }
    }
    store.unlikeListAction = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            let newLikeList = top5List.likeList;
            let removedIndex = newLikeList.indexOf(auth.user.email);
            newLikeList.splice(removedIndex, 1);
            top5List.likeList = newLikeList;
            top5List.like = top5List.like - 1;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    if(store.pageNumber === 1){
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                    else if(store.pageNumber === 2){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ALLUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                    else if(store.pageNumber === 3){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ONEUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                }
            }
            updateList(top5List);
        }
    }
    store.dislikeListAction = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            let newDislikeList = top5List.dislikeList;
            newDislikeList.push(auth.user.email);
            top5List.dislikeList = newDislikeList;
            top5List.dislike = top5List.dislike + 1;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    if(store.pageNumber === 1){
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                    else if(store.pageNumber === 2){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ALLUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                    else if(store.pageNumber === 3){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ONEUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                }
            }
            updateList(top5List);
        }
    }
    store.undislikeListAction = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            let newDislikeList = top5List.dislikeList;
            let removedIndex = newDislikeList.indexOf(auth.user.email);
            newDislikeList.splice(removedIndex, 1);
            top5List.dislikeList = newDislikeList;
            top5List.dislike = top5List.dislike - 1;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    if(store.pageNumber === 1){
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                    else if(store.pageNumber === 2){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ALLUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                    else if(store.pageNumber === 3){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ONEUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                }
            }
            updateList(top5List);
        }
    }

    store.likeAndUndislikeListAction = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            let newLikeList = top5List.likeList;
            newLikeList.push(auth.user.email);
            top5List.likeList = newLikeList;
            top5List.like = top5List.like + 1;
            let newDislikeList = top5List.dislikeList;
            let removedIndex = newDislikeList.indexOf(auth.user.email);
            newDislikeList.splice(removedIndex, 1);
            top5List.dislikeList = newDislikeList;
            top5List.dislike = top5List.dislike - 1;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    if(store.pageNumber === 1){
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                    else if(store.pageNumber === 2){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ALLUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                    else if(store.pageNumber === 3){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ONEUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                }
            }
            updateList(top5List);
        }
    }
    store.dislikeAndUnlikeListAction = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            let newDislikeList = top5List.dislikeList;
            newDislikeList.push(auth.user.email);
            top5List.dislikeList = newDislikeList;
            top5List.dislike = top5List.dislike + 1;
            let newLikeList = top5List.likeList;
            let removedIndex = newLikeList.indexOf(auth.user.email);
            newLikeList.splice(removedIndex, 1);
            top5List.likeList = newLikeList;
            top5List.like = top5List.like - 1;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    if(store.pageNumber === 1){
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                    else if(store.pageNumber === 2){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ALLUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                    else if(store.pageNumber === 3){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ONEUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                }
            }
            updateList(top5List);
        }
    }
    store.sendComment = async function (id, comment) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            let newCommentList = top5List.comments;
            newCommentList.unshift(comment);
            top5List.comments = newCommentList;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    if(store.pageNumber === 1){
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                    else if(store.pageNumber === 2){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ALLUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                    else if(store.pageNumber === 3){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ONEUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                }
            }
            updateList(top5List);
        }
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["?", "?", "?", "?", "?"],
            ownerEmail: auth.user.email,
            ownerName: auth.user.firstName + " "+ auth.user.lastName,
            view: 0,
            like: 0,
            likeList: [],
            dislike: 0,
            dislikeList: [],
            comments: [],
            hasPublished: false,
            publishDate: new Date()
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () { // = {pageNumber: 1}
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: pairsArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }
    store.handleDeleteList = async function () {    
        store.deleteMarkedList();
        store.unmarkListForDeletion();
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadIdNamePairs();
            history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;

            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                history.push("/top5list/" + top5List._id);
            }
        }
    }

    // store.moveItem = function (start, end) {
    //     start -= 1;
    //     end -= 1;
    //     if (start < end) {
    //         let temp = store.currentList.items[start];
    //         for (let i = start; i < end; i++) {
    //             store.currentList.items[i] = store.currentList.items[i + 1];
    //         }
    //         store.currentList.items[end] = temp;
    //     }
    //     else if (start > end) {
    //         let temp = store.currentList.items[start];
    //         for (let i = start; i > end; i--) {
    //             store.currentList.items[i] = store.currentList.items[i - 1];
    //         }
    //         store.currentList.items[end] = temp;
    //     }

    //     // NOW MAKE IT OFFICIAL
    //     store.updateCurrentList();
    // }

    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        store.updateCurrentList();
    }

    store.saveList = async function (listName, itemName1, itemName2, itemName3, itemName4, itemName5){
        let response = await api.getTop5ListById(store.currentList._id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = listName;
            top5List.items[0] = itemName1;
            top5List.items[1] = itemName2;
            top5List.items[2] = itemName3;
            top5List.items[3] = itemName4;
            top5List.items[4] = itemName5;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    if(store.pageNumber === 1){
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                    else if(store.pageNumber === 2){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ALLUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                    else if(store.pageNumber === 3){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ONEUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                }
            }
            updateList(top5List);
        }
        store.closeCurrentList();
    }
    
    store.publishList = async function (listName, itemName1, itemName2, itemName3, itemName4, itemName5){
        let response = await api.getTop5ListById(store.currentList._id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = listName;
            top5List.items[0] = itemName1;
            top5List.items[1] = itemName2;
            top5List.items[2] = itemName3;
            top5List.items[3] = itemName4;
            top5List.items[4] = itemName5;
            top5List.hasPublished = true;
            let publishing = new Date();
            top5List.publishDate = publishing;
            top5List.publishDateFormat = publishing.toLocaleString('default', {month:'short'}) + " " + publishing.getDate() + ", " + publishing.getFullYear();
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    if(store.pageNumber === 1){
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                    else if(store.pageNumber === 2){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ALLUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                    else if(store.pageNumber === 3){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ONEUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                }
            }
            updateList(top5List);
        }
        store.closeCurrentList();
    }
// let publishing = new Date();
            // top5List.publishDate = publishing;
            // top5List.publishDateFormat = publishing.toLocaleString('default', {month:'short'}) + " " + publishing.getDate() + ", " + publishing.getFullYear();
    // Increment the view of the list by 1
    store.incrementView = async function (id){
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.view = top5List.view+1;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    if(store.pageNumber === 1){
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                                    payload: pairsArray
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                    else if(store.pageNumber === 2){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ALLUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                    else if(store.pageNumber === 3){
                        async function getAllListPairs(top5List){
                            response = await api.getAllTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_ONEUSER_SCREEN,
                                    payload: pairsArray
                                });
                            }
                        }
                        getAllListPairs(top5List);
                    }
                }
            }
            updateList(top5List);
        }
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }


    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }
    // THIS FUNCTION DISABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditInactive = function () {                     // my foolproof design
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_INACTIVE,
            payload: null
        })
    }
    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }
    //THIS FUNCTION DISABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditInactive = function (){
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_INACTIVE,
            payload: null
        });
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };