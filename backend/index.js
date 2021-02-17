const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json())

app.get('/v3/b/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const binContent = fs.readFileSync(`./bins/${id}.json`, 
        {encoding:'utf8', flag:'r'});
        console.log(binContent);
        res.send(binContent);
    } catch(e) {
        res.status(422).json({"message": `Invalid Record: ${id}`});
    } 
})

app.put('/v3/b/:id', (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const binExist = fs.existsSync('./bins/${id}.json');

    if(!binExist) {
        res.status(404).json({
            "message" : "Bin not found",
            "success" : false
        });
        return;
    }
    fs.writeFileSync(`./bins/${id}.json`, JSON.stringify(body, null , 4));
    const successMessage = {
        success : true,
        data : body,
        "version" : 1,
        "parentId" : id
    }
    res.send(successMessage);
    
})

app.post('/v3/b/', (req, res) => {
    const {body} = req.body;
    const id = uuid.v4;
    body.id = id;
    fs.writeFileSync(`./backend/bins/${id}.json`, JSON.stringify(body, null , 4),
    (err) => {
        if (err) {
            res.send("error");
        } else {
            res.send(body)
        }   
    });
})

app.listen(3000, () => {
    console.log("app is running on port 3000")
});

    
      (err) => {
        if (err) {
          res.send("error");
        } else {
          res.send(body);
        }
      }
    );
  });