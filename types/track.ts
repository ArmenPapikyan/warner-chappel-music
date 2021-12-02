export interface IBody {
    search: string,
    skip: number
    take: number,
}

export interface ITrack {
    id: string;
    title: string;
    artist: string;
    creationYear: number,
    writers: Array<string>,
    loading: boolean,
    error: string
}

export interface TracksState {
    tracks: ITrack[];
    error: string;
    loading: boolean
}

export interface BodyState {
    body: IBody
}

export enum BodyActionType {
    BODY_ACTION = 'BODY_ACTION',
}

interface AddBodyAction {
    type: BodyActionType.BODY_ACTION,
    body: IBody
}



export enum TrackActionTypes {
    FETCH_TRACKS_REQ = 'FETCH_TRACKS_REQ',
    FETCH_TRACKS_RES = 'FETCH_TRACKS_RES',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
}

interface FetchTracksActionReq {
    type: TrackActionTypes.FETCH_TRACKS_REQ;
    payload: [];
}






interface FetchTracksActionRes {
    type: TrackActionTypes.FETCH_TRACKS_RES;
    payload: ITrack[];
}


interface FetchTracksErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR;
    payload: string
}

export type TrackAction =
    FetchTracksActionReq
    | FetchTracksActionRes
    | FetchTracksErrorAction
    | AddBodyAction
