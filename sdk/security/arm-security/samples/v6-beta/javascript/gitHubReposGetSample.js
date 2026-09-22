// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a monitored GitHub repository.
 *
 * @summary returns a monitored GitHub repository.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/GetGitHubRepos_example.json
 */
async function getGitHubRepos() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.gitHubRepos.get(
    "myRg",
    "mySecurityConnectorName",
    "myGitHubOwner",
    "myGitHubRepo",
  );
  console.log(result);
}

async function main() {
  await getGitHubRepos();
}

main().catch(console.error);
