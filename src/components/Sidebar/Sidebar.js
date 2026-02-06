import React from "react";
import "./Sidebar.css";
import SidebarOption from "../SidebarOption/SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { LibraryMusic } from "@mui/icons-material";
import { useDataLayerValue } from "../../context/DataLayer";

function Sidebar() {
    const [{ playlists }, dispatch] = useDataLayerValue();

    return (
        <div className="sidebar">
            <img
                className="sidebar__logo"
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                alt="Spotify logo"
            />

            <SidebarOption title="Home" Icon={HomeIcon} />
            <SidebarOption title="Search" Icon={SearchIcon} />
            <SidebarOption title="Your Library" Icon={LibraryMusic} />
            <br />
            <strong className="sidebar__title">PLAYLISTS</strong>
            <hr />
            {playlists?.items?.map((playlist) => (
                <SidebarOption title={playlist.name} />
            ))}
        </div>
    );
}

export default Sidebar;