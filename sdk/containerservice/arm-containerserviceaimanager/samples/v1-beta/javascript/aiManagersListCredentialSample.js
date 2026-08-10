// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the credentials of an AI Manager.
 *
 * @summary lists the credentials of an AI Manager.
 * x-ms-original-file: 2026-05-02-preview/AIManagers_ListCredential.json
 */
async function listsTheCredentialsOfAnAIManager() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.aiManagers.listCredential("rg1", "aimanager1");
  console.log(result);
}

async function main() {
  await listsTheCredentialsOfAnAIManager();
}

main().catch(console.error);
