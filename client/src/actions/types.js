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