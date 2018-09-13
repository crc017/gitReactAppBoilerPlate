import React, { Component } from 'react';
import logo from './logo.svg';
import API from './assets/API';
import Collection from './components/Collection';
import AddDoc from './components/AddDoc';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: [],
      collection: [],
      term: 'A New Document',
      message:''
    };

  }

  componentDidMount() {
    this.runGetTest();
    this.runGetCollection();
  }



  runGetTest = () => {
    API.getTest()
    .then(res => this.setState({info: res.data}))
    .catch(err => console.log(err))
  }

  runGetCollection = () => {
    API.getCollection()
    .then((res) => {this.setState({collection: res.data})
           console.log("doc call data", res.data);   
    })
    .catch(err => console.log(err))
  }

  runCreateDoc = () => {
    API.createDoc(this.state.term)
    .then((res) => {
      this.runGetCollection()
      console.log('message', res.data)})
    .catch(err => console.log('message', err))
  }

  runUpdateDoc = (docId, name) => {
    API.updateDoc(docId, name)
    .then((res) => {
      console.log(res)
      this.runGetCollection()
    })
  }

  runDeleteDoc = (docId) => {
    API.deleteDoc(docId)
    .then((res) => {
      console.log(res)
      if(res){this.runGetCollection()}
      
    })
  
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">BOILER PLATE!!!!</h1>
        </header>
        <AddDoc 
          term={this.state.term}
          onInputChange={term => this.setState({term}, this.runGetCollection())}
          onAddDoc={() =>  this.runCreateDoc()}
          />
        <h1>Root</h1>
        <Collection
          collection={this.state.collection}
          onModDoc={(docId, name)=> this.runUpdateDoc(docId, name)}
          onDeleteDoc={(docId) => this.runDeleteDoc(docId)}
          />
          <p>by Ryan Cox</p>
        {console.log("term:", this.state.term)}
      </div>
    );
  }
}

export default App;
