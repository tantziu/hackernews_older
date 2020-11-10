import Button from './Button';
import classNames from 'classnames';
import React from 'react';

const Sort = ({
    sortKey, 
    activeSortKey,
    onSort, 
    children
}) => {
    const sortClass = classNames(
        'button-inline',
        {'button-active': sortKey === activeSortKey}
    );

    return(
        <Button 
            onClick={() => onSort(sortKey)}
            className={sortClass}
        >
            {children}
        </Button>
    )
}

export default Sort;
