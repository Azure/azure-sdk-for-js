// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to asynchronously updates a partner namespace with the specified parameters.
 *
 * @summary asynchronously updates a partner namespace with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/PartnerNamespaces_Update.json
 */
async function partnerNamespacesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerNamespaces.update(
    "examplerg",
    "examplePartnerNamespaceName1",
    { tags: { tag1: "value1" } },
  );
  console.log(result);
}

async function main() {
  await partnerNamespacesUpdate();
}

main().catch(console.error);
