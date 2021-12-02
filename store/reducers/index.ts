import {combineReducers} from "redux";
import {HYDRATE} from "next-redux-wrapper";
import {trackReducer, trackFilterBody} from "./track";


const rootReducer = combineReducers({
    track: trackReducer,
    body: trackFilterBody
})

export const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        }
        if (state.count) nextState.count = state.count
        return nextState
    } else {
        return rootReducer(state, action)
    }
}

export type RootState = ReturnType<typeof rootReducer>
