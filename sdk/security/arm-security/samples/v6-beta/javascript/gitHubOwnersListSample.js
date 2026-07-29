// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a list of GitHub owners onboarded to the connector.
 *
 * @summary returns a list of GitHub owners onboarded to the connector.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/ListGitHubOwners_example.json
 */
async function listGitHubOwners() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.gitHubOwners.list("myRg", "mySecurityConnectorName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listGitHubOwners();
}

main().catch(console.error);
