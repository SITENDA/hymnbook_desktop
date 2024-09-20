import {createSlice} from "@reduxjs/toolkit";
import {initialState} from "../../util/initials";

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAll: (state, action) => {
            state = {
                ...initialState
            }
        },
        setItem: (state, action) => {
            const {key, value} = action.payload;
            const trimmedValue = trimIfString(value); // Assuming `trimIfString` trims strings.

            if (typeof trimmedValue === 'string' || typeof trimmedValue === 'number' || typeof trimmedValue === 'boolean') {
                // For primitive values, directly assign to state
                state[key] = trimmedValue;
                if (key === "title") {
                    state.searchTerm = "";
                }
            } else if (typeof trimmedValue === 'object' && trimmedValue !== null) {
                // If the value is an object, assign its keys to the corresponding state object
                // This will overwrite the state object's keys with those of the new object.
                state[key] = {
                    ...state[key], // Keep the existing keys if any
                    ...trimmedValue // Overwrite or set new values from the provided object
                };
            } else {
                console.error("Unsupported value type in setItem.");
            }
        },
        setObjectItem: (state, action) => {
            const {key, innerKey, value} = action.payload;
            const objectInState = state[key];
            objectInState[innerKey] = trimIfString(value);
        },
    },
})


const trimIfString = (item) => {
    return typeof item === 'string' ? item.trim() : item;
}

export const {
    resetAll,
    setItem,
    setObjectItem,
} = authSlice.actions

export const selectCurrentTitle                 = (state) => state.auth.title
export const selectSearchTerm                   = (state) => state.auth.searchTerm;
export const selectIsDarkTheme                  = (state) => state.auth.isDarkTheme;

export default authSlice.reducer
