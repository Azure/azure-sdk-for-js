// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get open request approval details
 *
 * @summary get open request approval details
 * x-ms-original-file: 2025-01-01/GetRequestApproval.json
 */
async function getApprovalRequest() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.getRequestApproval(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "marketplacetestthirdparty.md-test-third-party-2",
  );
  console.log(result);
}

async function main() {
  await getApprovalRequest();
}

main().catch(console.error);
