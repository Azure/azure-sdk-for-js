// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the environment.
 *
 * @summary deletes the environment.
 * x-ms-original-file: 2024-06-01-preview/Environments_Delete.json
 */
async function environmentsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.environments.delete("contoso-resources", "contoso", "default", "public");
}

async function main() {
  await environmentsDelete();
}

main().catch(console.error);
