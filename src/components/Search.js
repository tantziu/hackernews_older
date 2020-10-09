import React from 'react';

// class Search extends React.Component {
//     render() {
//         const {value, onChange, children} = this.props;
//         return (
//             <div className={"Search " + this.props.name}>
//                 <form>
//                     {children} 
//                     <input 
//                         type="text"                    
//                         value={value}
//                         onChange={onChange}
//                     />
//                 </form>
//             </div>  
//         );
//     }
// }

const Search = ({value, onChange, onSubmit, children}) =>   
    // <div className="Search">
        <form onSubmit={onSubmit}>
            <input
                type="text"
                value={value}
                onChange={onChange}
            />
            <button type="submit">
                {children}
            </button>
        </form>
    // </div>

export default Search;