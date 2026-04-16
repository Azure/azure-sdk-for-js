// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get properties of a partner namespace.
 *
 * @summary get properties of a partner namespace.
 * x-ms-original-file: 2025-07-15-preview/PartnerNamespaces_Get.json
 */
async function partnerNamespacesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerNamespaces.get("examplerg", "examplePartnerNamespaceName1");
  console.log(result);
}

async function main() {
  await partnerNamespacesGet();
}

main().catch(console.error);
