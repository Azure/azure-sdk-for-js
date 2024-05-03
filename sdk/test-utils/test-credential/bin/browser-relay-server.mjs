#!/usr/bin/env node

import { DefaultAzureCredential } from "@azure/identity";
import express from "express";

const app = express();

const credential = new DefaultAzureCredential();

function isValidScopes(scopes) {
  return (
    typeof scopes === "string" ||
    (Array.isArray(scopes) && scopes.every((scope) => typeof scope === "string"))
  );
}

app.use(express.json());

app.put("/token", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "PUT");

  const { scopes, options } = req.body;

  if (!isValidScopes(scopes)) {
    res.status(400).send("Scopes must be provided, and must be a string or an array of strings.");
    return;
  }

  try {
    const token = await credential.getToken(scopes, options);
    res.send(token);
  } catch (e) {
    res.status(500).send("Could not retrieve token. Check logs for more information.");
    console.log(e);
  }
});

app.listen(4343, "localhost");
