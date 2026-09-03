// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CommunicationServiceManagementClient } = require("@azure/arm-communication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to operation to update an existing Domains resource.
 *
 * @summary operation to update an existing Domains resource.
 * x-ms-original-file: 2026-03-18/domains/update.json
 */
async function updateDomainsResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11112222-3333-4444-5555-666677778888";
  const client = new CommunicationServiceManagementClient(credential, subscriptionId);
  const result = await client.domains.update(
    "MyResourceGroup",
    "MyEmailServiceResource",
    "mydomain.com",
    { userEngagementTracking: "Enabled" },
  );
  console.log(result);
}

async function main() {
  await updateDomainsResource();
}

main().catch(console.error);
