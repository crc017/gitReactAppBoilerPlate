const db = require("../models");



//create Factory 
db.Factory
          .create(result)
          .then(function(dbUser) {
            
            res.send("DB Get Complete ---- User data Logged");
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });


db.Factory.save().then((doc) => {
        console.log('Saved factory', doc)
    }, (e) => {
            if(e.errors['children']){
              console.log(e.errors['children'].message);
            }else if(e.errors['factory']){
              console.log(e.errors['factory'].message)
            } else(console.log('Unable to save.'))
            
    }
);