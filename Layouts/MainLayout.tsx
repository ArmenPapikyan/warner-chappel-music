import React from "react";
import Head from "next/head";
import Styles from '../pages/Styles/MainLayout.module.scss'

interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps>
    = ({
           children,
           title,
           description,
           keywords
       }) => {
    return (
        <>
            <Head>
                <title>{title || 'WARNER CHAPPEL MUSIC'}</title>
                <meta name="description"
                      content={`WARNER CHAPPEL MUSIC DESCRIPTION`}/>
                <meta name="keywords" content={keywords || "MUSIC, TRACKS, ARTISTS"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <main className={Styles.main}>
                <div className="container bg-dark my-container  pb-5">
                    <div className="row">
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}
export default MainLayout;