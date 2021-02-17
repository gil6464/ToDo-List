const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
const uuid = require('uuid');

app.get('/v3/b/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const binContent = JSON.parse(fs.readFileSync(`./bins/${id}.json`, 
        {encoding:'utf8', flag:'r'}));
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
    const {body} = req;
    const binId = uuid.v4();
    body.id = binId;
    try {
    fs.writeFileSync(`./backend/bins/${binId}.json`, JSON.stringify(body, null , 4))
    res.status(200).send({
        "record": req.body,
        "metadata": {
          "id": binId,
          "createdAt": new Date().toISOString(),
          "private": false
        }
    });
    } catch(e) { 
        res.status(500).json({ message: "Error!", error: e})
    }
})

app.delete('/v3/b/:id', (req, res) => {
    const binId = req.params.id;
    try {
        fs.unlinkSync(`${__dirname}/bins/${binId}.json`)
        res.send("deleted")
    } catch(e) {
        res.status(404).send("bin not found")
    }
})

app.get('/v3/b/',(req, res) => {
    let listBins = [];

   const allBins = fs.readdirSync('./backend/bins');
    console.log(allBins);
   for (let bin of allBins) {
       const raw = fs.readFileSync(`./backend/bins/${bin}`);
       listBins.push(JSON.parse(raw));
    }

    res.send(listBins);
});

app.listen(3000, () => {
    console.log("app is running on port 3000")
});
