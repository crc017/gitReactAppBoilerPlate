
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const db = require('./model');
const app = express();

//set helmet headers
app.use(helmet());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set mongoose promise library and connect mongodb 
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/documentCollection'
);


//-----------------------------------------------------------------------//
//-----------------------------------------------------------------------//
//-----------------------------API ENDPOINTS-----------------------------//



// Put all API endpoints under '/api'
//Test GET API
app.get('/api/test', (req, res) => {
  const fakeData = {
    status: 'ok',
    code: 200,
  };
  res.json(fakeData);
});

//get all of Document Collection API
app.get('/api/getCollection', (req, res) => {
  db.Doc.find().then((doc) => {
    res.status(200).json(doc);
  })
});

//get a single Document by id API
app.get('/api/getDoc', (req,res) => {
  db.Doc.findById(req.body.docId,
    (err) => {
      if(err) return err;
    }).then((doc) => res.send(doc))
});

//create Document API
app.post('/api/createDoc', (req, res) => {
  db.Doc.create({
    field: {
      name: req.body.fieldName
    }
  }).then((doc) => {
    res.send(doc)
  }, (e) => {
        res.send(e);
        
  });
});

//find by id and update Doc API
app.post('/api/updateDoc', (req, res) => {
  db.Doc.findByIdAndUpdate(
    req.body.docId,
    {field: {
      name: req.body.fieldName,
      }
    },
    {
      new: true
    }).then((result) => {
      res.send(result);
  }, (e) => {res.send(e)})
});


//delete Document API
app.delete('/api/deleteDoc', (req, res) => {
  db.Doc.findByIdAndRemove(
    req.body.docId,
    ).then((doc) => res.send(doc)), 
  (e) => {res.send(e)};
});

//below code used for deleting a child component within an array (with a dedicated Schema)
// app.delete('/api/deleteChild', (req, res) => {
//   
//   db.Doc.findByIdAndUpdate(
//       req.body.fieldId,
//       {$pull: {children: {
//         _id: req.body.childId
//       }
//       }},
//       { new: true,
//         runValidators: true}
//   ).then((doc) => {
//     res.send(doc);
//   }, (e) => {
//     res.send('Something went wrong with deleting the child node.. :(');
//   }) 
// });

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

