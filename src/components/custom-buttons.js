import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Typography from '@material-ui/core/Typography';

export default function RunButton(props) {
  const { onClick, loading, logMode } = props;

  if (loading) {
    return (
      <IconButton
        variant="contained"
        onClick={onClick}
        disabled={loading}
        color="primary"
        size="small"
        className="run-btn"
      >
        <CircularProgress color="secondary" size={28} />
      </IconButton>
    );
  } else {
    return (
      <IconButton
        variant="contained"
        onClick={onClick}
        disabled={loading || logMode}
        color="primary"
        size="small"
        className="run-btn"
      >
        <Typography varient="body1">Run Code</Typography>
        <PlayArrow />
      </IconButton>
    );
  }
}

export function UploadButton(props) {
  const { onClick, loading } = props;
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={loading}
      color="primary"
      size="small"
    >
      {loading && <CircularProgress color="primary" size={24} />}
      {!loading && 'Upload'}
    </Button>
  );
}
