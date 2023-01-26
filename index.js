// const http = require('http');
// const fs = require('fs');
const port = 8000;
const express = require('express');
const path = require('path');

// function myFunc(req,res){
//     console.log(req.url);
//     res.writeHead(200,{'contenet-type':'text/html'});
//     fs.readFile('./index.html',(err,data)=>{
//         if(err){
//             console.log(err);
//             return;
//         }

//         res.end(data);
//     })
// }

// const server = http.createServer(myFunc);

const db = require('./config/mongoose')
const Contact = require('./models/contact')

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

let contactList = [
    {
        name : "ruchit",
        phone : "11111111"
    },
    {
        name : "deepika",
        phone : "2222222"
    },
    {
        name : "akash",
        phone : "3333333"
    }
    
]

app.get('/',function(req,res){
    Contact.find({},function(err,contact){
        if(err){
            console.log("error occured while fetching the contact from DB");
            return;
        }

        return res.render('home',{ 
            title:"ejs example",
            contact_list : contact
        });
    });
    
});

app.get('/practice',function(req,res){
    return res.render('practice',{ title:"practicing"});
})

app.get('/delete-contact/',function(req,res){
    let id = req.query.id;
    // let contactIndex = contactList.findIndex(contact=>contact.phone==phone);

    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    //     res.redirect('back');
    // }

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error occured while deleting the contact");
            return;
        }

       return res.redirect('back');
    })
})

app.post('/contact_list',function(req,res){
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // })
    // return res.redirect('back');

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("error occured in adding the contact in dB");
            return;
        }
        console.log("*******"+newContact+"********");
        return res.redirect('back');
    });
});


app.listen(port,(err)=>{
    if(err){
        console.log("error ocurred");
        return;
    }

    console.log(`server is running at port : ${port}`);
})
