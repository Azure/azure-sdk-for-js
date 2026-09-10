// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BlockClient } = require("@azure/arm-purestorageblock");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to activate the SaaS resource
 *
 * @summary activate the SaaS resource
 * x-ms-original-file: 2026-05-01-preview/SaaSOperationGroup_ActivateSaaS_MaximumSet.json
 */
async function saaSOperationGroupActivateResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.saaSOperationGroup.activateResource({
    saasGuid: "12345678-1234-5678-1234-567812345678",
    publisherId: "purestorage1234567890",
  });
  console.log(result);
}

async function main() {
  await saaSOperationGroupActivateResource();
}

main().catch(console.error);
