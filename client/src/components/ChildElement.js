import React from 'react';

const ChildElement = ({child}) => {
    if(!child) {
        return <div> Loading... </div>
    }

    return (
         <li className="col-md-8">{child.number}</li>
    )
};

export default ChildElement;