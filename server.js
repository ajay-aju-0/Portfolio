const express = require('express');
// import express from 'express';

const dbConfig = require('./config/dbConfig');

const portfolioRoute = require('./routes/portfolioRoutes');

const cors = require("cors");

const path = require("path");
const { dir } = require('console');

require('dotenv').config();

const app = express();

app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ extended: true }));

app.use(cors());


app.use("/api/portfolio",portfolioRoute);

// Serve static files
app.use('/uploads', express.static('uploads'));


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.resolve(__dirname, "/client/dist")));

	// react app
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
}

const PORT = process.env.PORT || 5000  ;

app.listen(PORT, () => {
    console.log(`Server is running in PORT ${PORT}`);
});
