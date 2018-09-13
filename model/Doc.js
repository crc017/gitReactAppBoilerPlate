const mongoose = require('mongoose');
const Schema = mongoose.Schema;
;


const documentSchema = new Schema({
  field: {
    name: {
    type: String,
    required: true
    }
  }
  
});


const Doc = mongoose.model('documentCollection', documentSchema);


module.exports = Doc;