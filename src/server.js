require("dotenv/config");
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const instance = axios.create({
    baseURL: "https://demo.vnda.com.br/api/v2/",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.TOKEN}`,
    },
});

app.get("/users", async (req, res) => {
    console.log("get users");
    const respo = await instance.get("users");
    return res.json(respo.data);
});

app.get("/users/:id", async (req, res) => {
    console.log("get users id");
    const { id } = req.params;
    const respo = await instance.get(`users/${id}`);
    return res.json(respo.data);
});

app.post("/users/:id/deactivate", async (req, res) => {
    console.log("post deactivate");
    const { id } = req.params;
    await instance.post(`users/${id}/deactivate`);
    return res.send("ok");
});

app.post("/users", async (req, res) => {
    console.log("post users");
    console.log(req.body);
    await instance.post("users", req.body);
    return res.send("created");
});

app.put("/users/:id", async (req, res) => {
    console.log("put users id");
    const { id } = req.params;
    console.log(req.body);
    await instance.put(`users/${id}`, req.body);
    return res.send("updated");
});

app.listen(process.env.PORT || 3333);
