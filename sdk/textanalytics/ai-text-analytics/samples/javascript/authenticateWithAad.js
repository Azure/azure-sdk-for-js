// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use Azure Active Directory (RBAC) to authenticate
 * a TextAnalyticsClient
 */

const { TextAnalyticsClient } = require("@azure/ai-text-analytics");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set this environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive services endpoint>";

async function main() {
  console.log("== Azure Active Directory Authentication Sample ==");

  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();

  const client = new TextAnalyticsClient(endpoint, credential);

  const [result] = await client.detectLanguage(["hello world"]);

  if (!result.error) {
    console.log(`Primary language detected as ${result.primaryLanguage.name}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
