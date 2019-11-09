/* This file holds all the constants that contain action types. Some people call this file "constants.js". We can change the value of action type, and also see all the action types in one place. */

export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
/* This will run on success (REGISTER_SUCCESS), 
because we've successfully loaded the user. */
export const USER_LOADED = 'USER_LOADED';
/* If something goes wrong, if the token doesn't
match or whatever. */
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILES = 'GET_PROFILES';
export const GET_REPOS = 'GET_REPOS';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export const PROFILE_ERROR = 'PROFILE_ERROR';
/* The account will be deleted on the server. And this is basically a side effect from that. */
export const ACCOUNT_DELETED = 'ACCOUNT_DELETED';
export const GET_POSTS = 'GET_POSTS';
export const POST_ERROR = 'POST_ERROR';
/* We want the "UPDATE_LIKES" action type to fire off whether we like or unlike a post. */
export const UPDATE_LIKES = 'UPDATE_LIKES';