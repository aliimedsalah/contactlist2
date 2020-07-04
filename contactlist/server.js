const express = require('express');
const assert = require('assert');
const { MongoClient, ObjectID } = require('mongodb');

const app = express();
app.use(express.json());

const mongoURI="mongodb+srv://medsalah:1234@cluster0.phb4l.mongodb.net/<dbname>?retryWrites=true&w=majority";
const dataBase = 'liste-contacte';
MongoClient.connect(mongoURI, { useUnifiedTopology: true }, (err, client) => {
    assert.equal(err, null, 'connection to database failed');
    const db = client.db(dataBase);
    //post
    app.post('/add_contacte', (req, res) => {
        let newContact = req.body;
        db.collection('contactes').insertOne(newContact, (err, data) => {
          err ? console.log('cannot add contact') : res.send(data);
        });
      
      });
//get
app.get('/contactes', (req, res) => {
    db.collection('contactes')
      .find()
      .toArray((err, data) => {
        err ? console.log('cannot get contacts') : res.send(data);
      });
    });
    //delete
    app.delete('/delete_contacte/:id', (req, res) => {
        let contact = req.params.id;
        db.collection('contactes').findOneAndDelete(
          { _id: ObjectID(contact) },
          (err, data) =>
            err
              ? console.log('cannot delete contact')
              : res.send('contact deleted ')
        );
      });


//edit
app.put('/edit_contacte/:id', (req, res) => {
    let contact = req.params.id;
    db.collection('contactes').findOneAndUpdate(
      { _id: ObjectID(contact) },
      { $set: req.body },
      (err, data) =>
        err
          ? console.log('cannot modifie contact')
          : res.send('contact modified')
    );
  });

})
  
    
    
















const port = process.env.port || 5000;

app.listen(port, (err) => {
  err ? console.log('error') : console.log(`server is running on ${port}...`);
});