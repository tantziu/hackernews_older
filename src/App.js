import './App.css';
import Button from './components/Button'
import React, {Component} from 'react';
import Search from './components/Search';
import Table from './components/Table';
// import logo from './logo.svg';
// import Currency from './components/Currency';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';


class App extends Component {
  constructor(props) {
    super();
    this.state = {
      results: null,
      searchKey: '',
      // isLoading: false,
      searchTerm: DEFAULT_QUERY,
      error: null,
    };
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const {hits, page} = result;
    const {searchKey, results} = this.state;

    // const oldHits = page !== 0 ? this.state.result.hits : []
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];
    const updatedHits = [...oldHits, ...hits];
  
    this.setState({
      results: {
        ...results, 
        [searchKey]: {hits: updatedHits, page}
      }
    });
  }

  fetchSearchTopStories(searchTerm, page=0) {
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
    fetch(url)
      .then(response => response.json())
      .then(result => {this.setSearchTopStories(result)})
      .catch(error => this.setState({error}));
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  onSearchSubmit(event) {
    const {searchTerm} = this.state;
    this.setState({searchKey: searchTerm});

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    
    event.preventDefault();
  }
  
  onDismiss(id) {
    const {searchKey, results} = this.state;
    const {hits, page} = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      // result: Object.assign({}, this.state.result, updatedHits)
      results: {
        ...results,
        [searchKey]: {hits:updatedHits, page}
      }
    });
  }

  componentDidMount() {
    // this.setState({isLoading: true});
    const {searchTerm} = this.state;
    this.setState({searchKey: searchTerm});
    this.fetchSearchTopStories(searchTerm);
    
  }

  render() {
    console.log("States", this.state);
    const {searchTerm, results, searchKey, error} = this.state;
    const page = (results && results.page && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    // if (!result) {return null;}

    // if (isLoading) {
    //   return <p>Loading...</p>
    // }

    return (
      
      <div className="page">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React now
          </a>

          <p>
              {userService.getUserName(user)}
          </p>

          <TitleList languageList={list}/>
        </header> */}
        <div className="interactions">
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search  
          </Search>
        </div>

        {error
          ? <div className="interactions">
              <p>Something went wrong.</p>  
            </div>
          : <Table 
              list={list}
              onDismiss={this.onDismiss}
          />
        }

        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page+1)}>
            More
          </Button>
        </div>
      </div>  
    )    
  }
}

export default App;
