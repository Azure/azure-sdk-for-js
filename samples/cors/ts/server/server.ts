import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

// Pull in azure credentials from a .env file
// For more information on dotenv please refer to https://www.npmjs.com/package/dotenv
dotenv.config();

const PORT = process.env.PORT || 4000;

if (!process.env.AZURE_KEYVAULT_NAME) {
  throw new Error("AZURE_KEYVAULT_NAME is missing or empty in .env file");
}
const KEYVAULT_URI = `https://${process.env.AZURE_KEYVAULT_NAME}.vault.azure.net/`;
const client = new SecretClient(KEYVAULT_URI, new DefaultAzureCredential());

const app = express();

// Apply a CORS policy that will allow CORS requests from http://localhost:1234
// (the default port parcel will serve the client from)
const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:1234",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Add a single API endpoint that the client can call to fetch a secret.
// For this simple example we're exposing access to a single secret called
// `test` to anyone that calls this API endpoint. In a production application
// you would want to secure this endpoint in a way that makes sense for your
// application needs.
app.get("/api/secret", async (_req, res) => {
  const secretVal = await client.getSecret("test");
  res.json({ value: secretVal.value });
});

client
  .setSecret("test", "I am a secret!")
  .then(() => {
    console.log("Secret 'test' uploaded");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error uploading secret to KeyVault", err);
  });
