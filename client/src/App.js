import React, { Component } from 'react';
import logo from './logo.svg';
import API from './assets/API';
import Root from './components/Root';
import AddFactory from './components/AddFactory';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: [],
      factories: [],
      term: 'A New Factory',
      message:''
    };

  }

  componentDidMount() {
    this.runGetTest();
    this.runGetFactories();
  }



  runGetTest = () => {
    API.getTest()
    .then(res => this.setState({info: res.data}))
    .catch(err => console.log(err))
  }

  runGetFactories = () => {
    API.getFactories()
    .then((res) => {this.setState({factories: res.data})
           console.log("factory call data", res.data);   
    })
    .catch(err => console.log(err))
  }

  runCreateFactory = () => {
    API.createFactory(this.state.term)
    .then((res) => {
      this.runGetFactories()
      console.log('message', res.data)})
    .catch(err => console.log('message', err))
  }

  runCreateChild = (factoryId) => {
    API.createChild(factoryId)
    .then((res) => {
      if(res){console.log('create child message', res)}
      this.runGetFactories()
    })
    .catch(err => console.log('message', err))
  }

  runUpdateFactory = (factoryId, name, upper, lower) => {
    API.updateFactory(factoryId, name, upper, lower)
    .then((res) => {
      console.log(res)
      this.runGetFactories()
    })
  }

  runDeleteFactory = (factoryId) => {
    API.deleteFactory(factoryId)
    .then((res) => {
      console.log(res)
      if(res){this.runGetFactories()}
      
    })
  
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Passport Challenge</h1>
        </header>
        <AddFactory 
          term={this.state.term}
          onInputChange={term => this.setState({term}, this.runGetFactories())}
          onAddFactory={() =>  this.runCreateFactory()}
          />
        <h1>Root</h1>
        <Root
          factories={this.state.factories}
          onModFactory={(factoryId, name, upper, lower)=> this.runUpdateFactory(factoryId, name, upper, lower)}
          onAddChild={(factoryId) => this.runCreateChild(factoryId)}
          onDeleteFactory={(factoryId) => this.runDeleteFactory(factoryId)}
          />
          <p>by Ryan Cox</p>
        {console.log("term:", this.state.term)}
      </div>
    );
  }
}

export default App;
