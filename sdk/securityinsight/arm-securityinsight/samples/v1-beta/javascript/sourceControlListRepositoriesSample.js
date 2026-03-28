// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of repositories metadata.
 *
 * @summary gets a list of repositories metadata.
 * x-ms-original-file: 2025-07-01-preview/repositories/GetRepositories.json
 */
async function getRepositoryList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sourceControl.listRepositories("myRg", "myWorkspace", {
    repositoryAccess: {
      clientId: "54b3c2c0-1f48-4a1c-af9f-6399c3240b73",
      code: "939fd7c6caf754f4f41f",
      kind: "OAuth",
      state: "state",
    },
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getRepositoryList();
}

main().catch(console.error);
