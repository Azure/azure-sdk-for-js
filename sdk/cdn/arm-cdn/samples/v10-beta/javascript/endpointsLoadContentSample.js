// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to pre-loads a content to CDN. Available for Verizon Profiles.
 *
 * @summary pre-loads a content to CDN. Available for Verizon Profiles.
 * x-ms-original-file: 2025-12-01/Endpoints_LoadContent.json
 */
async function endpointsLoadContent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.endpoints.loadContent("RG", "profile1", "endpoint1", { contentPaths: ["/folder1"] });
}

async function main() {
  await endpointsLoadContent();
}

main().catch(console.error);
