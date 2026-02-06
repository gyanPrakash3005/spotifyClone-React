import React, { useEffect } from "react";
import "./Footer.css";
import {
    PlayCircleOutline,
    SkipPrevious,
    SkipNext,
    PlaylistPlay,
    Shuffle,
    Repeat,
    VolumeDown,
} from "@mui/icons-material";
import { Grid, Slider } from "@mui/material";
import { useDataLayerValue } from "../../context/DataLayer";

function Footer({ spotify }) {
    const [{ token, item, playing }, dispatch] = useDataLayerValue();

    useEffect(() => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
            console.log(r);

            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: r.is_playing,
            });
        });
    }, [spotify]);

    return (
        <div className="footer">
            <div className="footer__left">
                <img
                    className="footer__albumLogo"
                    src={item?.album.images[0].url}
                    alt={item?.name}
                />
                {item ? (
                    <div className="footer__songInfo">
                        <h4>{item.name}</h4>
                        <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
                    </div>
                ) : (
                    <div className="footer__songInfo">
                        <h4>No song is playing</h4>
                        <p>...</p>
                    </div>
                )}
            </div>
            <div className="footer__center">
                <Shuffle className="footer__green" />
                <SkipPrevious className="footer__icon" />
                <PlayCircleOutline fontSize="large" className="footer__icon" />
                <SkipNext className="footer__icon" />
                <Repeat className="footer__green" />
            </div>
            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlay />
                    </Grid>
                    <Grid item>
                        <VolumeDown />
                    </Grid>
                    <Grid item xs>
                        <Slider />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Footer;