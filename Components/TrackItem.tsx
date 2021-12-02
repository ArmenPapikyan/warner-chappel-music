import React from "react";
import Styles from "../pages/Styles/TrackItem.module.scss";
import {BsInfoCircle} from "react-icons/bs";
import {useRouter} from "next/router";
import {ITrack} from "../types/track";
import Highlighter from "react-highlight-words";

interface TrackItemProps {
    track: ITrack,
    highlight:Array<string|RegExp>
}

const TrackItem: React.FC<TrackItemProps> = ({track, highlight}) => {
    const router = useRouter()
    return (
        <div className={`${Styles.item} bg-black col-md-12 ${Styles.trackItem}`}
             onClick={() => router.push('/track/' + track.id)}>
            <div>
                <p className="fw-bold">

                    <Highlighter
                        highlightClassName={Styles.highlightItem}
                        searchWords={highlight}
                        autoEscape={true}
                        textToHighlight={track.title}
                    />
                    <span className="opacity-50">
                        <Highlighter
                            highlightClassName={Styles.highlightItem}
                            searchWords={highlight}
                            autoEscape={true}
                            textToHighlight={track.artist}
                        />
                    </span>
                </p>
                <p>
                    {track.writers.map((writer) => {
                        return (
                            <span key={writer}>
                                <Highlighter
                                    highlightClassName={Styles.highlightItem}
                                    searchWords={highlight}
                                    autoEscape={true}
                                    textToHighlight={writer}
                                />

                            </span>
                        )
                    })}
                </p>
            </div>
            <BsInfoCircle color="white"/>
        </div>
    )
}
export default TrackItem;