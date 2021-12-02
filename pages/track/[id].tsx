import React, {useState} from "react";
import MainLayout from "../../Layouts/MainLayout";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import instance from "../../Services/api";

function Track({singleTrack}: any) {
    const router = useRouter()
    return (
        <div>
            <MainLayout title={singleTrack.title}>
                <div className="col-md-12">
                    <p style={{color:"#debc5b",cursor:"pointer"}} className="pt-6 pb-5 fw-bold fz-small" onClick={router.back}>BACK TO SEARCH RESULT</p>
                    {singleTrack.title && <h5 className="pb-2 fw-bold">{singleTrack.title.toUpperCase()}</h5>}
                    <ul className="pb-5">
                        {singleTrack.writers.map((el: string) => {
                            return (
                                <li className="d-inline-block" key={el}>
                                    <p >{el.toUpperCase()}</p>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="row">
                        <div className="col-md-3">
                            <p className="fw-bold opacity-50 fz-small mb-2">ASSOCIATED ARTISTS</p>
                            <p>{singleTrack.artist.toUpperCase()}</p>
                        </div>
                        <div className="col-md-3">
                            <p className="fw-bold opacity-50 fz-small mb-2">WWW CODE</p>
                            <p>{singleTrack.code}</p>
                        </div>
                        <div className="col-md-3">
                            <p className="fw-bold opacity-50 fz-small mb-2">ISWC</p>
                            {singleTrack.iswc.map((el:string)=>{
                                return (
                                    <p key={el}>{el}</p>
                                )
                            })}
                        </div>
                        <div className="col-md-3">
                            <p className="fw-bold opacity-50 fz-small mb-2">CREATION YEAR</p>
                            <p>{singleTrack.creationYear}</p>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </div>
    )
}

export default Track
export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const res = () => {
        return instance
            .get(`/works/${params?.id}`).then((response) => {
                console.log(response)
                return response.data
            })
    }

    return {
        props: {
            singleTrack: await res()
        }
    }
}