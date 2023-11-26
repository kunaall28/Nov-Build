const http = require("http");

const port = 8081;  //local port no.

// HTTP Methods
/*
>> GET: Inorder to get data from server
>> POST: Inorder to push/transferring the data to the server
>> DELETE: to Delete the data from database
>> PATCH: Updating certain fields(minimal changes)
>> PUT: full update(completely)
*/

const toDoList = ["learn","apply things","succeed"];

http
    .createServer((req, res) => { //call back func
        const {method, url} = req;

        // console.log(method, url);

        if(url === "/todos"){
            if(method === "GET"){
                res.writeHead(200,{ "Content-Type": "text/html"});
                res.write(toDoList.toString());
            }else if(method === "POST"){
                let body = "";
                req
                .on('error',(err) =>{
                    console.log(err);
                })
                .on('data',(chunk)=>{
                    body += chunk;
                    // console.log(chunk);
                })
                .on('end',()=>{
                    body =JSON.parse(body);

                    let newToDo = toDoList;
                    newToDo.push(body.item);
                    console.log(newToDo);
                    // console.log("data: ",body)
                })
            }else if(method === "DELETE"){
                let body = '';
                req.on('error',(err) => {
                    console.error(err);
                }).on('data', (chunk) => {
                    body += chunk;
                }).on('end', () => {
                    body = JSON.parse(body);

                    let deleteThisItem = body.item;

                    for(let i=0;i<toDoList.length;i++){
                        if(toDoList[i] === deleteThisItem){
                           toDoList.splice(i, 1);
                            break;
                        }else{
                            console.error("Error: Match Not Found");
                            break;
                        }
                    }

                    // FIND METHOD
                    // toDoList.find((elem,index)=> {
                    //     if(elem === deleteThisItem){
                    //         toDoList.splice(index, 1);
                    //     }else{
                    //         console.error("Error: Match Not Found");
                    //     }
                    // });
                });
            }
            else{
                res.writeHead(501);
            }
        }else{
            res.writeHead(404);
        }
        res.end()
        // res.writeHead(200, { "Content-Type": "text/html"});
        // res.write("<h2>Hey Server Started and you can proceed </h2>");
        // res.end();
    })
    .listen(port, () => { //call back func
        console.log(`NodeJS Server started running on Port ${port}`);
    });


//http://localhost:8081/signin
//http://localhost:8081/signup
//http://localhost:8081/home
//http://localhost:8081/contact
//http://localhost:8081/about us
// here we can see the root of each address or link

