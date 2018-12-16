import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    };
  }

  search (term) {
    $.ajax({
      method: 'POST',
      url: '/repos',
      contentType: 'application/json',
      data: JSON.stringify({ username: term }),
      success: (repos) => {
        this.getRepos();
      },
      error: () => console.log('Error in POSTing from search component!')
    });
  }

  getRepos() {
    $.ajax({
      method: 'GET',
      url: '/repos',
      contentType: 'application/json',
      success: (repos) => {
        this.updateRepos(repos)
      },
      error: () => console.log('Error in GETting repos after updated database.')
    });
  }

  updateRepos(repos) {
    let allRepos = repos;
    this.setState({
      repos: allRepos || []
    });
  }

  componentDidMount() {
    this.getRepos();
  }

  render () {
    return (<div style={{fontFamily: 'Arial'}}>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));