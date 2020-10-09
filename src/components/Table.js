import Button from './Button';
import React from 'react';

// function isSearched(searchTerm) {
//     return function(item) {
//       return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//     }
// }

// class Table extends React.Component {
//     render() {
//         const {list, pattern, onDismiss} = this.props;

//         return (
//             <div className="Table">
//                 {list.filter(isSearched(pattern)).map(item => {
//                     const onHandleDismiss = () =>
//                     onDismiss(item.objectID);
//                     return (
//                         <div key={item.objectID}>
//                             <span>
//                                 <a className="App-link" target="_blank" href={item.url} rel="noopener noreferrer">{item.title}</a>
//                             </span>
//                             <span>{item.author}</span>
//                             <span>{item.num_comments}</span>
//                             <span>{item.points}</span>
//                             <span>
//                             <Button onClick={onHandleDismiss}> 
//                                 Dismiss
//                             </Button>
//                             </span>
//                         </div>
//                     )
//                 })}
//             </div>
//         );
//     }
// }
const largeColumn = {
    width: '40%',
};

const midColumn = {
    width: '30%',
};

const smallColumn = {
    width: '10%',
};

const Table = ({list, onDismiss}) => 
    <div className='table'>
        {list.map(item => 
            <div key={item.objectID} className="table-row">
                <span style={largeColumn}>
                    <a href={item.url}>{item.title}</a>
                </span>
                <span style={midColumn}>
                    {item.author}
                </span>
                <span style={smallColumn}>
                    {item.num_comments}
                </span>
                <span style={smallColumn}>
                    {item.points}
                </span>
                <span style={smallColumn }>
                    <Button 
                        onClick={() => onDismiss(item.objectID)}
                        className="button-inline"
                    > 
                        Dismiss
                    </Button>
                </span>
            </div>  
        )}
    </div> 

export default Table;