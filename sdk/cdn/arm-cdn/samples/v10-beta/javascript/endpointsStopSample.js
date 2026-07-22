// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops an existing running CDN endpoint.
 *
 * @summary stops an existing running CDN endpoint.
 * x-ms-original-file: 2025-12-01/Endpoints_Stop.json
 */
async function endpointsStop() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.endpoints.stop("RG", "profile1", "endpoint1");
  console.log(result);
}

async function main() {
  await endpointsStop();
}

main().catch(console.error);
