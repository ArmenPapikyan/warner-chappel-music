import {
    TrackAction,
    TrackActionTypes,
    TracksState,
    BodyState,
    BodyActionType,
} from "../../types/track";


const initialState: TracksState = {
    tracks: [],
    error: '',
    loading: false
}
const trackFilterBodyInitialState: BodyState = {
    body: {
        search: "",
        skip: 0,
        take: 10
    }
}

export const trackReducer = (state = initialState, action: TrackAction): TracksState => {
    switch (action.type) {
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return {...state, error: action.payload, loading: false}
        case TrackActionTypes.FETCH_TRACKS_REQ:
            return {
                ...state,
                error: '',
                loading: true
            }
        case TrackActionTypes.FETCH_TRACKS_RES:
            return {
                error: '',
                tracks: action.payload,
                loading: false
            }
        default:
            return state
    }
}


export const trackFilterBody = (state = trackFilterBodyInitialState, action: TrackAction) => {
    switch (action.type) {
        case BodyActionType.BODY_ACTION:
            return {
                ...state,
                body: action.body
            }
        default:
            return state
    }
}