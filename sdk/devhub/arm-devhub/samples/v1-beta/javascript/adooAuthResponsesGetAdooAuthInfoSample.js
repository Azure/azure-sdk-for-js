// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeveloperHubServiceClient } = require("@azure/arm-devhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets ADOOAuth info used to authenticate users with ADO.
 *
 * @summary gets ADOOAuth info used to authenticate users with ADO.
 * x-ms-original-file: 2025-03-01-preview/ADOOAuthInfo.json
 */
async function adoOAuthInfo() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.adooAuthResponses.getAdooAuthInfo("eastus2euap", {
    parameters: { redirectUrl: "https://ms.portal.azure.com/aks" },
  });
  console.log(result);
}

async function main() {
  await adoOAuthInfo();
}

main().catch(console.error);
