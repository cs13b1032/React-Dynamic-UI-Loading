import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AlbumService from "../services/Album";
import Divider from "@material-ui/core/Divider";
import Album from "./Album";
import Paper from "@material-ui/core/Paper";
import "react-toggle/style.css";
import { BottomScrollListener } from "react-bottom-scroll-listener";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "lightGrey",
    marginLeft: "1%",
    marginTop: "15px",
    width: "98%",
    height: "100%"
  },
  paper: {
    padding: theme.spacing(2),
    margin: `auto`,
    textAlign: "left",
    marginLeft: "15px",
    marginRight: "15px",
    marginTop: "15px",
  },
}));

export default function Page(props) {
  const classes = useStyles();
  const [numberOfAlbums, setNumberOfAlbums] = React.useState(0);
  const [albumsData, setAlbumData] = React.useState([]);
  const [albumRange, setAlbumRange] = React.useState([0, 4]);

  const fetchAlbumsData = () => {
    AlbumService.getAlbums().then(
      (response) => {
        setAlbumData(response.data);
        setNumberOfAlbums(response.data.length);
      },
      (error) => {
        // notify the error
      }
    );
  };

  const handleOnDocumentBottom = () => {
    setAlbumRange([0,albumRange[1]+5])
  };

  React.useEffect(() => {
    fetchAlbumsData();
  }, []);

  const createAlbums = () => {
    let albumsArrayDiv = [];
    if (albumsData.length > albumRange[1] + 1) {
      for (let i = albumRange[0]; i < albumRange[1] + 1; i++) {
        const albumData = albumsData[i];
        albumsArrayDiv.push(
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <b>{albumData.title}</b>
              <div></div>
              <p>
                id: {albumData.id}, userid: {albumData.userId}
              </p>
              <Divider />
              <Album getData={true} albumData={albumData} />
            </Paper>
          </Grid>
        );
      }
    }
    return albumsArrayDiv;
  };

  return (
    <div className={classes.root}>
      <div className="scroll-box">
        <Grid container spacing={3}>
          {createAlbums()}
        </Grid>
        <BottomScrollListener onBottom={handleOnDocumentBottom} />
      </div>
    </div>
  );
}
