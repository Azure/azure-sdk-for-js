// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to get all licenses of a non-Azure machine
 *
 * @summary the operation to get all licenses of a non-Azure machine
 * x-ms-original-file: 2025-09-16-preview/license/License_ListBySubscription.json
 */
async function listLicensesBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.licenses.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listLicensesBySubscription();
}

main().catch(console.error);
