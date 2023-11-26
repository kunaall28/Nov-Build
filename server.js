const express = require("express");

const app = express();
app.use(express.json());

const port = 8081;  //local port no.

const toDoList = ["learn","apply things","succeed"];

//http://127.0.0.1:8081/todos
app.get("/todos",(req, res) => {
    // res.writehead(200)
    // res.write(toDoList)
    res.status(200).send(toDoList);
});

app.post("/todos",(req, res) => {
    let newToDoItem = req.body.name;
    toDoList.push(newToDoItem);
    res.status(200).send({message: "Task Added Successfully"});
});

app.delete("/todos",(req,res) => {
    const deleteThisItem = req.body.name;

    toDoList.find((elem, index) => {
        if (elem === deleteThisItem){
            toDoList.splice(index, 1);
        }
        res.status(202).send({"message": `Deleted Item ${req.body.name}`});
    });
});

app.all("*", (req,res) => {
    res.status(501).send();
});

app.listen(port, ()=>{
    console.log(`NodeJS Server Started Running on Port ${port}`)
})
