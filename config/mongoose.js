const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0/contact_list_db');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"error ocuured"));

db.once('open',function(){
    console.log('successfull');
})

// mongoose.connect("mongodb://0.0.0.0:27017/contact_list_db",{
//     useNewUrlParser : true,
//     useUnifiedTopology : true,
//     // useCreateIndex : true
// })
// .then(()=>{
//     console.log("connection sucsussfull");
// })
// .catch((e)=>{
//     console.log(e);
// })