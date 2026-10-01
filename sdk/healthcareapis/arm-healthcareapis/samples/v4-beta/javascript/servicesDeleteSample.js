// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a service instance.
 *
 * @summary delete a service instance.
 * x-ms-original-file: 2025-04-01-preview/legacy/ServiceDelete.json
 */
async function deleteService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  await client.services.delete("rg1", "service1");
}

async function main() {
  await deleteService();
}

main().catch(console.error);
