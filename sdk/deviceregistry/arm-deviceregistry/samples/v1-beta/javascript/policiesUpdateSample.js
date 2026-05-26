// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Policy
 *
 * @summary update a Policy
 * x-ms-original-file: 2026-03-01-preview/Update_Policies.json
 */
async function updatePolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.policies.update("rgdeviceregistry", "mynamespace", "mypolicy", {
    properties: { certificate: { leafCertificateConfiguration: { validityPeriodInDays: 10 } } },
  });
  console.log(result);
}

async function main() {
  await updatePolicies();
}

main().catch(console.error);
