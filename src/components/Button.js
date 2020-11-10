import PropTypes from 'prop-types';
import Loading from './Loading';
import React from 'react';

const Button = ({
    className='',
    onClick,
    children,
}) =>
    <button
        type="button"
        className={className}
        onClick={onClick}
    >
        {children}
    </button>


const withLoading = (Component) => ({isLoading, ...rest}) =>
    isLoading
    ? <Loading />
    : <Component {...rest} />

export const ButtonWithLoading = withLoading(Button);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Button
// export export ButtonWithLoading
