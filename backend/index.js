const express = require('express');
const path = require('path');
const app = express();
const imageRouter = require('./routers/images.js');

app.use(express.json());
app.use(imageRouter);
app.use("/images", express.static(path.resolve(__dirname,"./static/images")));
app.use("/worlds", express.static(path.resolve(__dirname,"./static/worlds")));

app.get("/",(req,res)=>{
    res.send("Hello world");
})
app.listen(8080,()=>{
    console.log("Server started on port 8080");
})