import React from 'react';
import ChildElement from './ChildElement';
import AddChild from './AddChild';


const defaultStyle = {
    margin: 'auto',
    padding: '20px'
};
const factoryStyle = {
    margin: 'auto',
    border: '5px solid blue',
    padding: '10px'
};

const Factory = (props) => {
    console.log('Roots to factory');
    console.log('Factory Props', props);
    const childNodes = props.factory.children.map((child) => {
        return <ChildElement
            // onChildSelect={onChildSelect}
            key={child._id}
            child={child} />
    })

    var factoryId = props.factory._id;
    var factoryName = props.factory.factory.name;
    var upperLimit = props.factory.factory.childUpperLimit;
    var lowerLimit = props.factory.factory.childLowerLimit;
    var onModFactory = props.onModFactory;
    var onDeleteFactory = props.onDeleteFactory;
    
    return (
        <div style={factoryStyle}
        // onClick={() => onFactorySelect(factory)} 
        >
            <div className="factory-list">
                <div className="row" style={defaultStyle}>
                    <div className="col-md-10 row" style={defaultStyle}>
                            <strong>Factory Name:</strong>
                            <input onChange={event => onModFactory(factoryId, event.target.value, upperLimit, lowerLimit )} className="form-control" type="string" placeholder={factoryName} id="example-number-input"/>
                    </div>1
                    <div className="col-md-6">
                        <form className="form-group col-md-10 row" >
                            Upper Limit
                            <input onChange={event => onModFactory(factoryId, factoryName, event.target.value, lowerLimit)} className="form-control" type="number" placeholder={upperLimit} id="example-number-input"/>
                        </form>
                        <form className="form-group col-md-10 row">
                            Lower Limit
                            <input onChange={event => onModFactory(factoryId, factoryName, upperLimit, event.target.value)} className="form-control" type="number" placeholder={lowerLimit} id="example-number-input"/>
                        </form>
                    </div>
                </div>
               <div>Children:</div>
                <ol className="justify-content-right" style={defaultStyle}>
                    {childNodes}
                </ol>
                <AddChild 
                    onAddChild = {props.onAddChild}
                    childrenLength = {props.factory.children.length}
                    factoryId = {props.factory._id}
                />    
            </div>
            <button className="btn btn-danger" onClick={() => onDeleteFactory(factoryId)}>Delete Factory</button>
        </div>
    )

}

export default Factory;