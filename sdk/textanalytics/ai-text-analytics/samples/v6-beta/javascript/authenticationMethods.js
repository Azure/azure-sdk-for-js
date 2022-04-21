// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use either an Azure Active Directory (RBAC)
 * or an API Key to authenticate a TextAnalysisClient.
 *
 * @summary authenticates a service client using both Azure Active Directory
 * and an API key
 */

// To use an API Key, import `AzureKeyCredential` from the Text Analytics package
const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

// To use Azure AD, import `DefaultAzureCredential` from the `@azure/identity` package
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set this environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive language service endpoint>";

async function useAad() {
  console.log("-- Azure Active Directory --");

  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();

  const client = new TextAnalysisClient(endpoint, credential);

  const [result] = await client.analyze("LanguageDetection", ["hello world"]);

  if (!result.error) {
    console.log(`Primary language detected as ${result.primaryLanguage.name}`);
  }
}

async function useApiKey() {
  console.log("-- API Key --");

  // If using an API Key, you will need to set this environment variable
  const apiKey = process.env["LANGUAGE_API_KEY"] || "<api key>";

  const credential = new AzureKeyCredential(apiKey);

  const client = new TextAnalysisClient(endpoint, credential);

  const [result] = await client.analyze("LanguageDetection", ["hello world"]);

  if (!result.error) {
    console.log(`Primary language detected as ${result.primaryLanguage.name}`);
  }
}

async function main() {
  console.log("== Client Authentication Methods Sample ==");

  await useAad();

  await useApiKey();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
