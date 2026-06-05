// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete existing partner namespace.
 *
 * @summary delete existing partner namespace.
 * x-ms-original-file: 2025-07-15-preview/PartnerNamespaces_Delete.json
 */
async function partnerNamespacesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.partnerNamespaces.delete("examplerg", "examplePartnerNamespaceName1");
}

async function main() {
  await partnerNamespacesDelete();
}

main().catch(console.error);
