import React, {useEffect, useState, useRef} from "react";
import MainLayout from "../Layouts/MainLayout";
import TrackList from "../Components/TrackList";
import Filter from "../Components/Filter";
import Loader from "../Components/Loader";
import {fetchTracks, setSearchBody} from "../store/actions/tracks";
import {NextThunkDispatch, wrapper} from "../store";
import {useSelectorsFromType} from "../hooks/useSelectorsFromType";
import Styles from "./Styles/MainLayout.module.scss"
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

const TAKE_COUNT = 10
const Index = () => {
    let router = useRouter()
    const {tracks, error} = useSelectorsFromType(state => state.track)
    const {loading} = useSelectorsFromType(state => state.track)
    const {body} = useSelectorsFromType(state => state.body)
    const [rangeValues, setRangeValues] = React.useState([1970, 2021]);
    const [rangeTracks, setRangeTracks] = useState<any>(tracks)


    const dispatch = useDispatch() as NextThunkDispatch
    let take = Number(router?.query?.take) || TAKE_COUNT
    let search = router?.query?.search?.toString() || ""
    const loadMore = async () => {
        take = take + TAKE_COUNT
        let filterBody = {
            search: search,
            skip: take - TAKE_COUNT,
            take: TAKE_COUNT
        }
        await dispatch(await fetchTracks(filterBody)).then((res) => {
            router.push({
                pathname: '/',
                query: {
                    search: search,
                    skip: 0,
                    take: take
                }
            })
        })
    }
    const setValues = (values: any) => {
        setRangeTracks(tracks.filter(t => t.creationYear >= values[0] && t.creationYear <= values[1]))
        setRangeValues(values)
    }
    const removeYear = () => {
        setRangeValues([1970, 2021])
        setRangeTracks(tracks)
    }
    const handClick = async () => {
        await dispatch(await fetchTracks(body)).then((res) => {
            router.push({
                pathname: '/',
                query: {
                    search: body.search,
                    skip: 0,
                    take: body.take
                }
            })
        })
    }
    useEffect(() => {
        setRangeTracks(tracks)
    }, [tracks])
    return (
        <div>
            <MainLayout>
                {loading && <Loader/>}
                <Filter search={body.search} year_from={1970} year_to={2021}
                        result={rangeTracks.length}
                        loading={loading} setValues={setValues} rangeValues={rangeValues} removeYear={removeYear}
                        handClick={handClick}/>
                {!rangeTracks.length ? 'NO DATA' :
                    <>
                        <TrackList tracks={rangeTracks} loading={loading} highlight={[body.search]}/>
                        <button onClick={loadMore} className={Styles.loadMoreBtn}>
                            {loading ? '...' : 'LOAD MORE'}
                        </button>
                    </>}

            </MainLayout>
        </div>
    )
}

export default Index
export const getServerSideProps = wrapper.getServerSideProps(async ({store, ...props}) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTracks({
        search: props?.query?.search || "",
        skip: Number(props?.query?.skip) || 0,
        take: Number(props?.query?.take) || 10
    }))
    await dispatch(await setSearchBody(props?.query?.search?.toString() || "", Number(props?.query?.skip) || 0, Number(props?.query?.take) || 10))
})
