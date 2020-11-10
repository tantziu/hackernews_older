import './App.css';
import axios from 'axios';
import Button, {ButtonWithLoading} from './components/Button';
// import Loading from './components/Loading';
import React, {Component} from 'react';
import Search from './components/Search';
import Table from './components/Table';

// import Currency from './components/Currency';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const updateSearchTopStoriesState = (hits, page) => (prevState) => {
  const {searchKey, results} = prevState;

  const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];

  const updatedHits = [...oldHits, ...hits];

  return {
    results: {
      ...results,
      [searchKey]: {hits: updatedHits, page}
    },
    isLoading: false
  };
};


class App extends Component {
_isMounted = false;

  constructor(props) {
    super();
    this.state = {
      results: null,
      searchKey: '',
      isLoading: false,
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

    this.setState(updateSearchTopStoriesState(hits, page));
  }


  fetchSearchTopStories(searchTerm, page = 0) {
    // fetch(url)
    //   .then(response => response.json())
    //   .then(result => {this.setSearchTopStories(result)})
    //   .catch(error => this.setState({error}));
    this.setState({isLoading: true});
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;

    axios(url)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({error}));
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
    this._isMounted = true;

    // this.setState({isLoading: true});
    const {searchTerm} = this.state;
    this.setState({searchKey: searchTerm});
    this.fetchSearchTopStories(searchTerm);
    
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
      isLoading
    } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      
      <div className="page">
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
            {/* // isLoading
            //   ? <Loading />
            //   : <Button onClick={() => this.fetchSearchTopStories(searchKey, page+1)}>
            //       More
            //       </Button>      */}
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page+1)}
          >
            More
          </ButtonWithLoading>  
        </div>
      </div>  
    )    
  }
}

export default App;

export {
  Button,
  Search,
  Table,
};