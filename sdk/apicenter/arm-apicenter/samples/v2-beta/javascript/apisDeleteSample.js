// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specified API.
 *
 * @summary deletes specified API.
 * x-ms-original-file: 2024-06-01-preview/Apis_Delete.json
 */
async function apisDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.apis.delete("contoso-resources", "contoso", "default", "echo-api");
}

async function main() {
  await apisDelete();
}

main().catch(console.error);
