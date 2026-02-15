import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json()); // usamos o middleware json para trabalharmos com json

export default app;
