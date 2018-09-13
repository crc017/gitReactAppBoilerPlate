import React from 'react';
import Doc from './Doc';

const docStyle = {
    margin: 'auto',
    border: '5px solid black',
    padding: '25px'
  };

const Collection = (props) => {

    const docList = props.collection.map((doc) => {
        return <Doc
            onModDoc={props.onModDoc} 
            onDeleteDoc={props.onDeleteDoc}
            key={doc._id}
            doc={doc} />
    })
    return(
        <div className="col-md-6" style={docStyle}>
        {docList}
        </div>
    )
}

export default Collection;
