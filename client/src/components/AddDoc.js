import React from 'react';


const AddDoc= ({term, onInputChange, onAddDoc}) => {
    return (
        <div>
            <input
                value = {term}
                onChange={event => onInputChange(event.target.value)} />
            <button className="btn btn-primary" onClick={() => onAddDoc()}>Add Document</button>
        </div>
    )
};

export default AddDoc;