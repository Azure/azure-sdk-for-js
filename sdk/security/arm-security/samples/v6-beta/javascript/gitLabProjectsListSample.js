// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of GitLab projects that are directly owned by given group and onboarded to the connector.
 *
 * @summary gets a list of GitLab projects that are directly owned by given group and onboarded to the connector.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/ListGitLabProjects_example.json
 */
async function listGitLabProjects() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.gitLabProjects.list(
    "myRg",
    "mySecurityConnectorName",
    "myGitLabGroup$mySubGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listGitLabProjects();
}

main().catch(console.error);
