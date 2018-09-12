import React from 'react';


const AddFactory = ({term, onInputChange, onAddFactory}) => {
    return (
        <div>
            <input
                value = {term}
                onChange={event => onInputChange(event.target.value)} />
            <button className="btn btn-primary" onClick={() => onAddFactory()}>Add Factory</button>
        </div>
    )
};

export default AddFactory;