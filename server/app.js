const express = require("express");
const cors = require("cors");
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("data.json"), "utf-8");

// Create an Express app
const app = express();

// Tell the app to listen to JSON bodies on POST requests
app.use(express.json());

// Add 'headers' to each response, saying that we're okay with sharing resources with others
app.use(cors());

// Set up a route
app.get("/", (req, res) => {
    res.send("Welcome to the Ice Cream API!");
})

app.get("/flavours", (req, res) => {
    res.json(data);
})

app.post("/flavours", (req, res) => {

    console.log(req.body);

    data.data.push(req.body)
    fs.writeFileSync("data.json", JSON.stringify(data));

    res.json({
        success: true
    });

})

app.get("/flavours/:id", (req, res) => {
    
    // Extract the parameter from the URL
    const id = req.params.id;

    // Filter the data for the ice cream with that id
    const filteredData = data.filter(f => f["id"] == id);

    if (filteredData.length == 1) {
        res.json({
            flavour: filteredData[0]
        })

        // Checks if it can be json, stringifies it, tells the client that it's a particular type
        // and sends it as the body

    } else {
        res.status(404).json({
            error: "No such ice cream"
        })
    }
})

app.post("/flavours", (req, res) => {

    const newFlavour = req.body;
    newFlavour["id"] = data.length + 1;
    data.push(newFlavour);

    res.status(201).json({
        success: true,
        flavour: newFlavour
    })
})

module.exports = app;