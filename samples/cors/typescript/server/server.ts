import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

dotenv.config();
console.log(process.env.AZURE_CLIENT_SECRET);

const credential = new DefaultAzureCredential();
const vaultName = process.env.AZURE_KEY_VAULT_NAME;

const keyvaultUrl = `https://${vaultName}.vault.azure.net`;
const client = new SecretClient(keyvaultUrl, credential);

const app = express();
app.use(cors());

app.get("/api/keyvault", async (req, res) => {
  const secretVal = await client.getSecret("test");
  res.json({ value: secretVal.value });
});
app.listen(4000, () => {
  console.log("Server running on port 4000");
});
