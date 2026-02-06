import React from "react";
import "./Body.css";
import Header from "../Header/Header";
import { useDataLayerValue } from "../../context/DataLayer";
import { PlayCircleFilled, Favorite, MoreHoriz } from "@mui/icons-material";
import SongRow from "../SongRow/SongRow";

function Body({ spotify }) {
    const [{ discover_weekly, view, search_results }, dispatch] = useDataLayerValue();

    return (
        <div className="body">
            <Header spotify={spotify} />

            {view === "search" ? (
                <div className="body__songs">
                    <h2>Search Results</h2>
                    {search_results?.tracks?.items.map(item => (
                        <SongRow track={item} key={item.id} />
                    ))}
                </div>
            ) : (
                <>
                    <div className="body__info">
                        <img src={discover_weekly?.images[0]?.url} alt="" />
                        <div className="body__infoText">
                            <strong>PLAYLIST</strong>
                            <h2>Discover Weekly</h2>
                            <p>{discover_weekly?.description}</p>
                        </div>
                    </div>
                    <div className="body__songs">
                        <div className="body__icons">
                            <PlayCircleFilled className="body__shuffle" />
                            <Favorite fontSize="large" />
                            <MoreHoriz />
                        </div>
                        {discover_weekly?.tracks.items.map((item) => (
                            <SongRow track={item.track} added_at={item.added_at} key={item.track.id} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Body;