import React from 'react';


const AddChild = ({childrenLength, onAddChild, factoryId} ) => {
    if(childrenLength < 15 && childrenLength !== 0) {
        return (
            <div>
                
                <button onClick={() => onAddChild(factoryId)}>Add Child</button>
            </div>
        )
    }
    
    if(childrenLength >= 15) {
    return <p> No more children can be added. </p>
    }

    return(<div>
            <p>None</p>
            <button onClick={() => onAddChild(factoryId)}>Add Child</button>
    </div>)

};

export default AddChild;