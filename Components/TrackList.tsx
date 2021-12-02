import React, {useEffect, useState} from "react";
import TrackItem from "./TrackItem";
import {ITrack} from "../types/track";

interface TrackListProps {
    tracks: ITrack[],
    loading: boolean,
    highlight: Array<string | RegExp>
}

const TrackList: React.FC<TrackListProps> = ({tracks, loading, highlight}) => {
    return (
        <>
            {tracks.map(track =>
                <TrackItem
                    key={track.id}
                    track={track}
                    highlight={highlight}
                />
            )}
        </>
    )
}
export default TrackList