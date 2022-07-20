
const express = require('express')
const dbConnect=require('./dbConnect')
const app=express();
app.use(express.json());
const path=require('path');
const dotenv= require('dotenv');
const userRoute=require('./routes/usersRoute')
const transactionRoute=require('./routes/transactionRoutes')
app.use('/api/user',userRoute);
app.use('/api/transactions',transactionRoute);
dotenv.config();
const port=process.env.PORT || 5000
__dirname=path.resolve()
if(process.env.NODE_ENV === 'production')
{
    app.use(express.static(path.join(__dirname,'/expensetracker/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'expensetracker/build/index.html'))
    })
}

app.listen(port, ()=>console.log(`example app on port ${port}!`))