import React, {Component} from 'react';

class Search extends Component {
    // constructor(props) {
    //     super(props);
    //     this.textInput = React.createRef();
    //     // this.focusTextInput = this.focusTextInput.bind(this);
    // }

    // focusTextInput() {
    //     if (this.textInput) {
    //         this.textInput.current.focus();
    //     }
    // }

    componentDidMount() {
        if (this.input) {
            this.input.focus();
        }
        // this.textInput.current.focus()
        // this.focusTextInput();
    }

    render() {
        const {
            value,
            onChange,
            onSubmit,
            children
        } = this.props;
        return (
            // <div className={"Search " + this.props.name}>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"            
                        value={value}
                        onChange={onChange}
                        ref={el => this.input = el}
                        // ref={this.textInput}
                    />
                    <button type="submit">
                        {children}
                    </button>
                </form>
            // </div> 
        );
    }
}

// const Search = ({value, onChange, onSubmit, children}) =>
//     // <div className="Search">
//         <form onSubmit={onSubmit}>
//             <input
//                 type="text"
//                 value={value}
//                 onChange={onChange}
//             />
//             <button type="submit">
//                 {children}
//             </button>
//         </form>
    // </div>

export default Search;