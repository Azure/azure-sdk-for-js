// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to extends Software Assurance Benefit to a cluster
 *
 * @summary extends Software Assurance Benefit to a cluster
 * x-ms-original-file: 2025-12-01-preview/ExtendSoftwareAssuranceBenefit.json
 */
async function createClusterIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusters.extendSoftwareAssuranceBenefit("test-rg", "myCluster", {
    properties: { softwareAssuranceIntent: "Enable" },
  });
  console.log(result);
}

async function main() {
  await createClusterIdentity();
}

main().catch(console.error);
