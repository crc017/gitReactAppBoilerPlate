import React from 'react';
import Factory from './Factory';

const factoryStyle = {
    margin: 'auto',
    border: '5px solid black',
    padding: '25px'
  };

const Root = (props) => {

    const factoryList = props.factories.map((factory) => {
        return <Factory
            onModFactory={props.onModFactory} 
            onAddChild={props.onAddChild}
            onDeleteFactory={props.onDeleteFactory}
            key={factory._id}
            factory={factory} />
    })
    return(
        <div className="col-md-6" style={factoryStyle}>
        {factoryList}
        </div>
    )
}

export default Root;
