import React from 'react';
import VideoListItem from './video_list_item';

// props videos was passed from the parent, App, class
const VideoList = (props) =>
{
  // map returns a new array
  // videoItems = [<VideoListItem video=]
  const videoItems = props.videos.map((video) => {
    return (
      <VideoListItem
        onVideoSelect={props.onVideoSelect}
        key={video.etag}
        video={video} />
    );
  });

  return (
    <ul className="col-md-4 list-group">
      {videoItems}
    </ul>
  );
};

export default VideoList;
