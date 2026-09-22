// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a monitored GitLab Project resource for a given fully-qualified group name and project name.
 *
 * @summary returns a monitored GitLab Project resource for a given fully-qualified group name and project name.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/GetGitLabProjects_example.json
 */
async function getGitLabProjects() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.gitLabProjects.get(
    "myRg",
    "mySecurityConnectorName",
    "myGitLabGroup$mySubGroup",
    "myGitLabProject",
  );
  console.log(result);
}

async function main() {
  await getGitLabProjects();
}

main().catch(console.error);
