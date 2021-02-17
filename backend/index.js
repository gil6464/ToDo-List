// const {days} = require('./myModule');
// const {readFileSync} = require('fs');
// const http = require('http');
// console.log(http);
// const {x} = require('./myModule');
// const fromModule = require('./myModule');

// console.log(days);
// console.log(fromModule);
// console.log(x);
//  

// console.log(data); 

// const server = http.createServer(function(request, response){
//     if(request.url === '/task'){
//         const data = readFileSync('./task.html', 
//             {encoding:'utf8', flag:'r'});
//         response.write(data);
//         response.end();
//     }
//     if(request.url === '/notTask'){
//         const data = readFileSync('./notTask.html', 
//             {encoding:'utf8', flag:'r'});
//         response.write(data);
//         response.end();
//     }
//     if(request.method === 'POST'){
//         response.write('post method');
//         response.end();
//     }
//     response.end();
// });
// server.listen(3001);

// GET myapi.com:3001/tasks - יחזיר את כל הTASKS
// GET myapi.com:3001/task/123 - יחזיר את המשימה שהאיידי הוא 123
// POST myapi.com:3001/task/ - שולחים משימה חדשה
// PUT myapi.com:3001/task/ - מעדכנים
// DELETE myapi.com:3001/task/ - מוחקים משימה


const express = require('express');
console.log(express);
// const app = express();
// app.use(express.json()); // כשמקבלים בבאדי ג'ייסון אז הוא הופך לאובייקט

// const {readFileSync} = require('fs');
// let tasks = [
//     {
//         id: '4fw34y',
//         title: 'doing node-express task',
//         dueDate: '18.02.2021',
//         category: 'programming stuying',
//         isDone: false,
//     },
//     {
//         id: 'er5776e',
//         title: 'watching node lecture',
//         dueDate: '18.02.2021',
//         category: 'programming stuying',
//         isDone: false,
//     },
//     {
//         id: 'a46s5e6s5u',
//         title: 'watching express lecture',
//         dueDate: '18.02.2021',
//         category: 'programming stuying',
//         isDone: false,
//     },
// ];

// app.get('/tasks', (req, res)=>{
//     res.send(tasks)
// });

// app.get('/task/:id', (req, res)=>{
//     const id = req.params.id;
//     const data = readFileSync('./'+id+'.JSON', 
//             {encoding:'utf8', flag:'r'});
//     res.send(data);
// for(let task of tasks){
//     if(task.id === id){
//         res.send(task);
//     }
// }
// });

// app.post('/task',(req, res)=>{
//     tasks.push(req.body);
//     res.send('ok');
// });

// app.put('/task',(req, res)=>{
//     for(let i = 0; i< tasks.length; i++){
//         if(tasks[i].id === req.body.id){
//            tasks[i] = req.body;
//         res.send(req.body);
//         }
//     }
// });

// app.delete('/task',(req, res)=>{
//     for(let i = 0; i< tasks.length; i++){
//         if(tasks[i].id === req.body.id){
//            tasks.splice(i, 1);
//             res.send('removed');
//         }
//     }
// });

// app.listen(3000);