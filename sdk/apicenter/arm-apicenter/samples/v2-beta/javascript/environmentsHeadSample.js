// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks if specified environment exists.
 *
 * @summary checks if specified environment exists.
 * x-ms-original-file: 2024-06-01-preview/Environments_Head.json
 */
async function environmentsHead() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.environments.head("contoso-resources", "contoso", "default", "public");
}

async function main() {
  await environmentsHead();
}

main().catch(console.error);
