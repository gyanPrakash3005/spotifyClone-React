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
    PauseCircleOutline,
    Mic,
    QueueMusic,
    DevicesOther
} from "@mui/icons-material";
import { Grid, Slider } from "@mui/material";
import { useDataLayerValue } from "../../context/DataLayer";

function Footer({ spotify }) {
    const [{ token, item, playing }, dispatch] = useDataLayerValue();

    useEffect(() => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: r.is_playing,
            });
        });
    }, [spotify, dispatch]);

    const handlePlayPause = () => {
        if (playing) {
            spotify.pause();
            dispatch({
                type: "SET_PLAYING",
                playing: false,
            });
        } else {
            spotify.play();
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        }
    };

    const handleSkipNext = () => {
        spotify.skipToNext();
        spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        });
    };

    const handleSkipPrevious = () => {
        spotify.skipToPrevious();
        spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        });
    };

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
                <div className="footer__controls">
                    <Shuffle className="footer__green" />
                    <SkipPrevious onClick={handleSkipPrevious} className="footer__icon" />
                    {playing ? (
                        <PauseCircleOutline
                            onClick={handlePlayPause}
                            fontSize="large"
                            className="footer__icon"
                        />
                    ) : (
                        <PlayCircleOutline
                            onClick={handlePlayPause}
                            fontSize="large"
                            className="footer__icon"
                        />
                    )}
                    <SkipNext onClick={handleSkipNext} className="footer__icon" />
                    <Repeat className="footer__green" />
                </div>
                <div className="footer__playbackBar">
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <Slider size="small" />
                        </Grid>
                    </Grid>
                </div>
            </div>

            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <Mic className="footer__icon_small" />
                    </Grid>
                    <Grid item>
                        <QueueMusic className="footer__icon_small" />
                    </Grid>
                    <Grid item>
                        <DevicesOther className="footer__icon_small" />
                    </Grid>
                    <Grid item>
                        <VolumeDown />
                    </Grid>
                    <Grid item xs>
                        <Slider size="small" />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Footer;