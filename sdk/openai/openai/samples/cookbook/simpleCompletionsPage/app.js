const path = require("node:path");
const express = require("express");
const { AzureOpenAI } = require("openai");
const { getBearerTokenProvider, DefaultAzureCredential } = require("@azure/identity");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index");
});

const azureADTokenProvider = getBearerTokenProvider(
  new DefaultAzureCredential(),
  "https://cognitiveservices.azure.com/.default"
);

app.post("/api/completions", async (req, res) => {
  const openAI = new AzureOpenAI({
    endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT,
    azureADTokenProvider,
    apiVersion: "2024-07-01-preview",
  });

  const prompt = req.body.prompt;

  console.log("Submitting completions for prompt:", prompt);
  const completions = await openAI.completions.create({ prompt });

  res.json({ completions });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
