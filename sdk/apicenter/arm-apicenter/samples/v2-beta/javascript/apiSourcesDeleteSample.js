// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specified API source.
 *
 * @summary deletes specified API source.
 * x-ms-original-file: 2024-06-01-preview/ApiSources_Delete.json
 */
async function apiSourcesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.apiSources.delete(
    "contoso-resources",
    "contoso",
    "default",
    "contoso-api-management",
  );
}

async function main() {
  await apiSourcesDelete();
}

main().catch(console.error);
