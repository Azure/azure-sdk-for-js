// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specified API version
 *
 * @summary deletes specified API version
 * x-ms-original-file: 2024-06-01-preview/ApiVersions_Delete.json
 */
async function apiVersionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.apiVersions.delete(
    "contoso-resources",
    "contoso",
    "default",
    "echo-api",
    "2023-01-01",
  );
}

async function main() {
  await apiVersionsDelete();
}

main().catch(console.error);
