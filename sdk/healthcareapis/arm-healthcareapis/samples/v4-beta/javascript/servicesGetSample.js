// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the metadata of a service instance.
 *
 * @summary get the metadata of a service instance.
 * x-ms-original-file: 2025-04-01-preview/legacy/ServiceGet.json
 */
async function getMetadata() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.services.get("rg1", "service1");
  console.log(result);
}

/**
 * This sample demonstrates how to get the metadata of a service instance.
 *
 * @summary get the metadata of a service instance.
 * x-ms-original-file: 2025-04-01-preview/legacy/ServiceGetInDataSovereignRegionWithCmkEnabled.json
 */
async function getMetadataForCMKEnabledServiceInDataSovereignRegion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.services.get("rg1", "service1");
  console.log(result);
}

async function main() {
  await getMetadata();
  await getMetadataForCMKEnabledServiceInDataSovereignRegion();
}

main().catch(console.error);
