const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var childLimit = (val) => {
  return val.length <= 15;
};

const childSchema = new Schema({
  number: { 
    type: Number
  }
});

const factorySchema = new Schema({
  factory: {
    name: {
    type: String,
    required: true,
    }
  },
  children: [{
    childSchema,
    validate: [childLimit, 'You have reached your limit of child nodes for this factory.']
  }]
});

const Factory = mongoose.model('Root', factorySchema);

// var Factory = mongoose.model('Root', {
//   factory: {
//     name: {
//       type: String,
//       required: true
//     }
//   },
//   children: [{
//     type: Number
//     // maxlength: [15, 'Cannot exceed 15 child nodes :(']
//     // validate: [childLimit, 'Cannot have more than 15'] 
//   }]

// });



var newFactory = new Factory({
  factory: {
    name: 'My first Factory'
  },
  children: [145,335,445,180,220,660, 7, 8, 9, 10, 11, 12, 13]
});

// newFactory.validate();

newFactory.save().then((doc) => {
  console.log('Saved factory', doc)
}, (e) => {
  if(e.errors['children']){
    console.log(e.errors['children'].message);
  }else if(e.errors['factory']){
    console.log(e.errors['factory'].message)
  } else(console.log('Unable to save.'))
  
});




module.exports = {mongoose};
