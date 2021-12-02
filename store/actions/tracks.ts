import {Dispatch} from "react";
import {TrackAction, TrackActionTypes, BodyActionType} from "../../types/track";
import instance from "../../Services/api"

export const fetchTracks = (body: object) => {
    return (dispatch: Dispatch<TrackAction>) => {
        dispatch({
            type: TrackActionTypes.FETCH_TRACKS_REQ,
            payload: []
        });
        return instance
            .post(`/works/search`, body)
            .then((response) => {
                return dispatch({
                    type: TrackActionTypes.FETCH_TRACKS_RES,
                    payload: response.data.results
                });
            })
            .catch(() => {
                dispatch({
                    type: TrackActionTypes.FETCH_TRACKS_ERROR,
                    payload: 'ERROR'
                })
            });
    };
};
export const setSearchBody = (search: string, skip: number,take: number ) => {
    return (dispatch: Dispatch<TrackAction>) => {
        dispatch({
            type: BodyActionType.BODY_ACTION,
            body: {
                search: search,
                take: take,
                skip: skip
            }
        })
        return Promise.resolve();
    }
}