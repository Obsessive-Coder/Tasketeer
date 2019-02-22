import React from 'react';

export default function CompleteButton(props) {
    const { className, children } = props;

    return (
        <button
            className={`btn btn-outline-success rounded-0 ` + className}
        >
            {children}
        </button>
    );
};