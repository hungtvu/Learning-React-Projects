import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

// Import custom components
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// Browser API KEY for Youtube
const API_KEY = 'AIzaSyCoiCnCcS9g2AoEzRp809OyeXBlDkqa4MQ';

// Create a new component. This component is a class base component to handle data from youtube search
class App extends Component
{
  constructor(props) {
    super(props);

    this.state = { selectedVideo: null, videos: [] };
    this.videoSearch('surfboards')
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) =>  { // Fat arrow '(data) =>' same as function(data)
      this.setState({ videos: videos, selectedVideo: videos[0] });
    });
  }

  render() {
    // lodash makes it so that this function can only be ran after 300 ms
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
    <div>
      <SearchBar onSearchTermChange={videoSearch} />
      <VideoDetail video={this.state.selectedVideo} />
      <VideoList
        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
        videos={this.state.videos} />
    </div>
    );
  }
}

// Take this component's generated HTML and put it on the page (in the DOM)
// Render the app component into a specific location
ReactDOM.render(<App />, document.querySelector('.container'));
