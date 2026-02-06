import React from "react";
import { Search, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "./Header.css";
import { Avatar } from "@mui/material";
import { useDataLayerValue } from "../../context/DataLayer";

function Header({ spotify }) {
    const [{ user }, dispatch] = useDataLayerValue();

    const handleSearch = (e) => {
        const query = e.target.value;
        if (query) {
            spotify.searchTracks(query).then((response) => {
                dispatch({
                    type: "SET_SEARCH_RESULTS",
                    search_results: response,
                });
                dispatch({
                    type: "SET_VIEW",
                    view: "search",
                });
            });
        } else {
            dispatch({
                type: "SET_VIEW",
                view: "home",
            });
        }
    };

    return (
        <div className="header">
            <div className="header__left">
                <div className="header__history">
                    <ArrowBackIos className="header__historyIcon" />
                    <ArrowForwardIos className="header__historyIcon" />
                </div>
                <div className="header__search">
                    <Search />
                    <input
                        placeholder="Search for Artists, Songs, or Albums"
                        type="text"
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <div className="header__right">
                <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
                <h4>{user?.display_name}</h4>
            </div>
        </div>
    );
}

export default Header;