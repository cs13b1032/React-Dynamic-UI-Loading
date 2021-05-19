import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AlbumService from "../services/Album";
import Divider from "@material-ui/core/Divider";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    maxWidth: 400,
    margin: `auto`,
    textAlign: "left",
    marginLeft: "15px",
    marginRight: "15px",
    marginTop: "15px",
    inlineSize: "min-content",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Album(props) {
  const classes = useStyles();
  const [photosData, setPhotosData] = React.useState([]);
  const [numberofPhotos, setNumberOfPhotos] = React.useState([]);
  const [photosRange, setPhotosRange] = React.useState([0, 4]);
  const [forwardEnable, setForwardEnable] = React.useState(true);
  const [backwardEnable, setBackwardEnable] = React.useState(false);

  const fetchPhotosData = () => {
    //use promise.all
    AlbumService.getPhotos(props.albumData.id).then(
      (response) => {
        setPhotosData(response.data);
        setNumberOfPhotos(response.data.length);
      },
      (error) => {
        // notify the error
      }
    );
  };

  const createPhotos = () => {
    let photosArrayDiv = [];
    if (photosData.length > photosRange[1] + 1) {
      for (let i = photosRange[0]; i < photosRange[1] + 1; i++) {
        const photoData = photosData[i];
        photosArrayDiv.push(
          <div>
            <div class="inline">
              <img
                style={{ "text-align": "center" }}
                src={photoData.thumbnailUrl}
                alt="new"
              />
              {photoData.title}
              <p style={{ "text-align": "center" }}>id: {photoData.id}</p>
            </div>
          </div>
        );
      }
    }
    return photosArrayDiv;
  };

  React.useEffect(() => {
    fetchPhotosData();
  }, []);

  const handleMovePhotosForward = () => (event) => {
    if (numberofPhotos - photosRange[1] >= 5) {
      setPhotosRange([photosRange[0] + 5, photosRange[1] + 5]);
      if (photosRange[1] + 5 == numberofPhotos) {
        setForwardEnable(false);
      }
      setBackwardEnable(true);
    } else if (
      numberofPhotos - photosRange[1] < 5 &&
      numberofPhotos - photosRange[1] > 0
    ) {
      setPhotosRange([
        photosRange[0] + (numberofPhotos - photosRange[1]),
        photosRange[1] + (numberofPhotos - photosRange[1]),
      ]);

      setForwardEnable(false);
      setBackwardEnable(true);
    } else {
      setForwardEnable(false);
      if (photosRange[0] == 0) {
        setBackwardEnable(false);
      } else {
        setBackwardEnable(true);
      }
    }
  };

  const handleMovePhotosBackward = () => (event) => {
    if (photosRange[0] > 5) {
      setPhotosRange([photosRange[0] - 5, photosRange[1] - 5]);
    } else {
      setPhotosRange([0, 4]);
      setBackwardEnable(false);
    }
  };

  return (
    <div>
      <Grid item xs={12}>
        {backwardEnable ? (
          <Button
            className={classes.button}
            onClick={handleMovePhotosBackward()}
            disabled={!backwardEnable}
          >
            <ArrowBackIosIcon />
          </Button>
        ) : (
          ""
        )}

        <Paper className={classes.paper}>{createPhotos()}</Paper>
        <Button
          className={classes.button}
          onClick={handleMovePhotosForward()}
          disabled={!forwardEnable}
        >
          <ArrowForwardIosIcon />
        </Button>
      </Grid>
    </div>
  );
}
