const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/invoices", (req, res, next) => {
    const invoice = req.body;
    console.log(invoice);
    res.status(201).json({
        message: 'Invoice added successfully!'
    });
});

app.get('/invoices', (req, res, next) => {
    const invoices = [
        { id: '1', title: 'Rent', amount: 599 },
        { id: '2', title: 'Bills', amount: 399 },
        { id: '3', title: 'PayPal', amount: 1200 }
    ];

    res.status(200).json({
        message: 'Invoces fetched successfully!',
        invoices: invoices
    });
});

module.exports = app;
