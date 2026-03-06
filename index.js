const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todoRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/todos',todoRouter);
app.use('/auth',authRoutes);


app.listen(3000,()=>{
    console.log("server running at port 3000");
})
