// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks if specified API source exists.
 *
 * @summary checks if specified API source exists.
 * x-ms-original-file: 2024-06-01-preview/ApiSources_Head.json
 */
async function apiSourcesHead() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.apiSources.head("contoso-resources", "contoso", "default", "contoso-api-management");
}

async function main() {
  await apiSourcesHead();
}

main().catch(console.error);
