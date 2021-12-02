import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'
import { useContext } from 'react';
import { GlobalStoreContext } from '../store';


const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER", 
    ERROR_MODAL: "ERROR_MODAL", 
    ERROR_MODAL_DISAPPEAR: "ERROR_MODAL_DISAPPEAR", 
    LOGOUT_USER: "LOGOUT_USER"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: false,
        msg: null
    });
    const history = useHistory();
    const { store } = useContext(GlobalStoreContext); 
    
    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: false,
                    msg: null
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: false,
                    msg: null
                })
            }
            case AuthActionType.LOGIN_USER: { 
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: false,
                    msg: null
                })
            }case AuthActionType.ERROR_MODAL: { 
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: payload.error,
                    msg: payload.msg
                })
            }
            case AuthActionType.ERROR_MODAL_DISAPPEAR: { 
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: payload.error,
                    msg: payload.msg
                })
            }
            case AuthActionType.LOGOUT_USER:{
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: false,
                    msg: null
                })
            }
            default:
                return auth;
        }
    }
    auth.handleClose = async function (){ 
        authReducer({
            type: AuthActionType.ERROR_MODAL_DISAPPEAR,
            payload: {
                error: false,
                msg: null
            }
        });
    }


    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.logoutUser = async function (store) {     
        try{
            const response = await api.logoutUser();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGOUT_USER,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
                history.push("/");
                store.closeCurrentList();
            }
        }catch(err){
            console.log(err);
        }
    }

    auth.loginUser = async function(userData, store){ 
        try{
            const response = await api.loginUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }
        catch (err){
            authReducer({
                type: AuthActionType.ERROR_MODAL,
                payload: {
                    error: true,
                    msg: err.response.data.errorMessage
                }
            });
        }
    }

    auth.registerUser = async function(userData, store) { 
        try{
            const response = await api.registerUser(userData);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }
        catch (err){
            authReducer({
                type: AuthActionType.ERROR_MODAL,
                payload: {
                    error: true,
                    msg: err.response.data.errorMessage
                }
            });
        }
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };