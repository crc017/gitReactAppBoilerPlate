
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const db = require('./model');
const mongoose = require('mongoose');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/Root'
);

// Put all API endpoints under '/api'
app.get('/api/test', (req, res) => {
  const fakeData = {
    status: 'ok',
    code: 200,
  };
  res.json(fakeData);
});

//get all Factories API
app.get('/api/getFactories', (req, res) => {
  db.Factory.find().then((doc) => {
    res.status(200).json(doc);
  })
});

//create Factory API
app.post('/api/createFactory', (req, res) => {
  db.Factory.create({
    factory: {
      name: req.body.factoryName
    },
      children: []
  }).then((doc) => {
    res.send(doc)
  }, (e) => {
        res.send(e);
        
  });
});

//get a single factory by id
app.post('/api/getAFactory', (req,res) => {
  db.Factory.findById(req.body.factoryId,
    (err) => {
      if(err) return handleUnexpectedError(err);
    }).then((doc) => res.send(doc))
});

//update Factory API
app.post('/api/updateFactory', (req, res) => {
  db.Factory.findByIdAndUpdate(
    req.body.factoryId,
    {factory: {
      name: req.body.name,
      childUpperLimit: req.body.upper,
      childLowerLimit: req.body.lower
      }
    },
    {
      new: true
    }).then((result) => {
      res.send(result);
  }, (e) => {res.send(e)})
});

//add child API
app.post('/api/createChild', (req, res) => {
  console.log(req.body.factoryId);
  var saveChild = (newChild) => {
    children.push(newChild);
  };
  //generate random number for new entry into children array
  var getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max - min)) + min;
    
  }//req.body.newChild;

  
  db.Factory.findById(
    req.body.factoryId,(err, doc) => {
      if(err) return handleUnexpectedError(err);
      if(doc.children.length >= 15)  return res.send('Too many child entries.')
    doc.update(
      {$push: 
        {children: {
          $each: [{number: getRandomInt(doc.factory.childLowerLimit, doc.factory.childUpperLimit)}],
          $positon: 0,
          $slice: 15 
          }
        }
      },
      (err, newDoc) => {
        if(err) return handleUnexpectedError(err);
        res.send(newDoc);
      }
    )
});

});


//delete factory API
app.delete('/api/deleteFactory', (req, res) => {
  db.Factory.findByIdAndRemove(
    req.body.factoryId,
    ).then((doc) => res.send(doc)), 
  (e) => {res.send(e)};
});

//delete child API
app.delete('/api/deleteChild', (req, res) => {
  var child = db.Factory.children[req.body.childNumber];
  db.Factory.findByIdAndUpdate(
      req.body.factoryId,
      {$pull: {children: {
        _id: req.body.childId
      }
      }},
      { new: true,
        runValidators: true}
  ).then((doc) => {
    res.send(doc);
  }, (e) => {
    res.send('Something went wrong with deleting the child node.. :(');
  }) 
});

//catchall
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});



const handleUnexpectedError = (err, req, res, next) => {
  console.log('Unexpected error: ' + JSON.stringify(err));
  res.json({status: 500});
}
app.use(handleUnexpectedError);

module.exports = app;

