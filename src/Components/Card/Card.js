import React from 'react';

export const Card = ({name,description,power}) => {
    return (
        <div>
            <h1> {name}</h1>
            <p>powers:{ power}</p>
            <p> {description}</p>
        </div>
    )
}
