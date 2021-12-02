import React, {useRef, useState} from "react";
import Styles from '../pages/Styles/Filter.module.scss'
import {HiSortDescending} from "react-icons/hi";
import {BsFilterRight, BsSearch} from "react-icons/bs";
import FilterRange from "./FilterRange";
import {Overlay} from "react-bootstrap";
import FilterSort from "./FilterSort";
import {useDispatch} from "react-redux";
import {NextThunkDispatch} from "../store";
import {fetchTracks, setSearchBody} from "../store/actions/tracks";
import {useSelectorsFromType} from "../hooks/useSelectorsFromType";
import {useRouter} from "next/router";

interface FilterProps {
    search: string,
    year_from: number,
    year_to: number,
    result: number,
    setValues: (values: number[]) => void,
    rangeValues: Array<number>,
    removeYear: () => void,
    handClick: () => void,
    loading: boolean,
}

const Filter: React.FC<FilterProps> = ({
                                           search,
                                           year_from,
                                           year_to,
                                           result,
                                           setValues,
                                           rangeValues,
                                           removeYear,
                                           handClick,
                                           loading
                                       }) => {
    let router = useRouter()
    let input = useRef<HTMLInputElement>(null)
    const [showYearFilter, setShowYearFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const targetForYearFilter = useRef(null);
    const targetForSort = useRef(null);
    const [query, setSearch] = useState<string>('')
    const dispatch = useDispatch() as NextThunkDispatch
    const {body} = useSelectorsFromType(state => state.body)

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value.length) {
            setSearch(e.target.value)
        }
        await dispatch(await setSearchBody(e.target.value, body.skip, body.take))
    }
    const removeSearch = async () => {
        if (input.current) {
            setSearch('')
            input.current.value = ''
        }
        await dispatch(await fetchTracks(body)).then((res) => {
            router.push({
                pathname: '/',
                query: {
                    search: '',
                    skip: 0,
                    take: body.take
                }
            })
        })
    }


    return (
        <div className={`col-md-12 ${Styles.stickyFilter} bg-dark pb-4 pt-6`}>
            <div className="row">
                <div className="col-md-6">
                    {result ? <p>SEARCH RESULTS ({result})</p> : ('')}
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                    <div className={Styles.input}>
                        <input ref={input} type="search" onChange={handleChange}/>
                        <BsSearch color="#debc5b" onClick={handClick}/>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-9">
                    <div className="d-inline-block me-2">
                        {query ? <span onClick={removeSearch} className={Styles.searchQuery}>{query} <span
                            className={Styles.removeTag}/></span> : body.search ?
                            <span onClick={removeSearch} className={Styles.searchQuery}>{body.search} <span
                                className={Styles.removeTag}/></span> : ''}
                    </div>
                    <div className="d-inline-block">
                        {(rangeValues[0] !== 1970 || rangeValues[1] !== 2021) ?
                            <span onClick={removeYear}
                                  className={Styles.searchQuery}>Creation Year: {rangeValues[0]} - {rangeValues[1]}
                                <span
                                    className={Styles.removeTag}/></span> : ''}
                    </div>
                </div>
                <div className="col-md-3 d-flex justify-content-end">
                    <div className={Styles.filterItem} ref={targetForSort}>
                        <HiSortDescending color="#debc5b" onClick={() => {
                            setShowSort(!showSort)
                            setShowYearFilter(false)
                        }}/>
                    </div>
                    <div className={Styles.filterItem} ref={targetForYearFilter}>
                        <BsFilterRight color="#debc5b" onClick={() => {
                            setShowYearFilter(!showYearFilter)
                            setShowSort(false)
                        }}/>
                    </div>
                    <Overlay target={targetForYearFilter.current} show={showYearFilter} placement="bottom-end">
                        {({placement, arrowProps, show: _show, popper, ...props}) => (
                            <div  {...props} style={{
                                backgroundColor: ' #1e1e1e',
                                color: 'white',
                                borderRadius: 3,
                                width: '230px',
                                height: '150px',
                                padding: '25px 25px 0 25px',
                                marginTop: '15px',
                                ...props.style,
                            }}>
                                <FilterRange setValues={setValues} values={rangeValues} removeYear={removeYear}/>
                            </div>
                        )}
                    </Overlay>
                    <Overlay target={targetForSort.current} show={showSort} placement="bottom-end">
                        {({placement, arrowProps, show: _show, popper, ...props}) => (
                            <div  {...props} style={{
                                backgroundColor: ' #1e1e1e',
                                color: 'white',
                                borderRadius: 3,
                                width: '230px',
                                height: '80px',
                                padding: '25px 25px 0 25px',
                                marginTop: '15px',
                                ...props.style,
                            }}>
                                <FilterSort/>
                            </div>
                        )}
                    </Overlay>
                </div>
            </div>
        </div>
    )
}
export default Filter;