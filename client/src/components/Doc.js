import React from 'react';



const defaultStyle = {
    margin: 'auto',
    padding: '20px'
};
const docStyle = {
    margin: 'auto',
    border: '5px solid blue',
    padding: '10px'
};

const Doc = (props) => {
    console.log('Doc Props', props);

    var docId = props.doc._id;
    var fieldName = props.doc.field.name;
    var onModDoc = props.onModDoc;
    var onDeleteDoc = props.onDeleteDoc;
    
    return (
        <div style={docStyle}
        >
            <div className="factory-list">
                <div className="row" style={defaultStyle}>
                    <div className="col-md-10 row" style={defaultStyle}>
                            <strong>Document Name:</strong>
                            <input onChange={event => onModDoc(docId, event.target.value)} className="form-control" type="string" placeholder={fieldName} id="example-number-input"/>
                    </div>
                </div>  
            </div>
            <button className="btn btn-danger" onClick={() => onDeleteDoc(docId)}>Delete Document</button>
        </div>
    )

}

export default Doc;