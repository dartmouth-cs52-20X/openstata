import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlayArrow from '@material-ui/icons/PlayArrow';

export default function RunButton(props) {
  const { onClick, loading } = props;

  if (loading) {
    return (
      <Button variant="contained"
        onClick={onClick}
        disabled={loading}
        color="primary"
        size="small"
      >
        <CircularProgress color="secondary" size={28} />
      </Button>
    );
  } else {
    return (
      <Button variant="contained"
        onClick={onClick}
        disabled={loading}
        color="primary"
        size="small"
      >
        Run Code
        <PlayArrow />
      </Button>
    );
  }
}

export function UploadButton(props) {
  const { onClick, loading } = props;
  return (
    <Button variant="contained"
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
