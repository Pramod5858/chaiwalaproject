const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const cors = require("cors");

const route = require('./Route/index');

const port = 5500;
const hostname = "localhost";
//const dbUrl = "mongodb://127.0.0.1:27017/chaiwala";
const atlasUrl = "mongodb+srv://chaiwalauser:PXIHaR0QmikfU2e8@cluster0.dznj06x.mongodb.net/chaiwalaShop?retryWrites=true&w=majority";

// project Name = chaiwala
// link= 'mongodb+srv://chaiwalauser:<password>@cluster0.dznj06x.mongodb.net/?retryWrites=true&w=majority'
// username=chaiwalauser
// password=PXIHaR0QmikfU2e8
// database name= chaiwalaShop

const app = express();

// app.use(
//     cors({
//         origin: "http://localhost:5500/chaiwala",
//         credentials:true,
//     })
// )

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/',route);
mongoose.connect(atlasUrl, {useNewUrlParser:true, useUnifiedTopology:true})
.then(
    res=>{
        app.listen(port, hostname, ()=>{
            console.log(`Server is connected ${hostname}:${port}`);
        })
    }
)
.catch(err=>console.log(err))
    





