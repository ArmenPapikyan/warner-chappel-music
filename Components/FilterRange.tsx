import React from "react";
import {Range, getTrackBackground} from "react-range";
import Styles from '../pages/Styles/FilterRange.module.scss'

const STEP = 1;
const MIN = 1970;
const MAX = 2021;

interface FilterRangeProps {
    values: number[],
    setValues: (values: number[]) => void,
    removeYear: (values: React.MouseEvent<HTMLButtonElement>) => void
}

const FilterRange: React.FC<FilterRangeProps> = ({values, setValues, removeYear}) => {

    return (
        <>
            <div style={{textAlign: 'right'}}>
                CREATION YEAR
            </div>
            <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => setValues(values)}
                renderTrack={({props, children}) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: '36px',
                            display: 'flex',
                            width: '100%'
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                height: '5px',
                                width: '100%',
                                borderRadius: '4px',
                                background: getTrackBackground({
                                    values,
                                    colors: ['#646464', '#caa45e', '#646464'],
                                    min: MIN,
                                    max: MAX,
                                }),
                                alignSelf: 'center'
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({index, props, isDragged}) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '15px',
                            width: '15px',
                            borderRadius: '50%',
                            backgroundColor: '#383838',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: '28px',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '10px',
                                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                                padding: '4px',
                                borderRadius: '4px',
                                backgroundColor: '#1e1e1e',
                                boxShadow: 'rgb(0 0 0 / 17%) 1px 1px 1px 1px'
                            }}
                        >
                            {values[index]}
                        </div>
                        <div
                            style={{
                                height: '9px',
                                width: '9px',
                                borderRadius: '50%',
                                backgroundColor: isDragged ? '#fff' : '#fff'
                            }}
                        />
                    </div>
                )}
            />
            <div className={Styles.filterRangeBtnGroup}>
                <button className={Styles.filterBtn} onClick={(values) => removeYear(values)}>
                    CLEAR
                </button>
                {/*<button className={`${Styles.filterBtn} ${Styles.withBorder}`}>*/}
                {/*    APPLY*/}
                {/*</button>*/}
            </div>
        </>
    )
}
export default FilterRange;