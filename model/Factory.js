const mongoose = require('mongoose');
const Schema = mongoose.Schema;
;

var childLimit = (val) => {
  return val.length <= 15;
};

const childSchema = new Schema({
  number: Number
});

const factorySchema = new Schema({
  factory: {
    name: {
    type: String,
    required: true,
    },
    childLowerLimit: {
      type: Number,
      default: 0,
      required: true
    },
    childUpperLimit: {
      type: Number,
      default: 100,
      required: true
    }
  },
  children: [
      childSchema
  ]
  
});


const Factory = mongoose.model('Root', factorySchema);


module.exports = Factory;