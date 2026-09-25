// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete (clear) the Log Ingestion Settings for a firewall. SYNC — soft-clears the DCR destination on the partner (logs have no partner delete API). Returns 200 on success or 204 when nothing is configured.
 *
 * @summary delete (clear) the Log Ingestion Settings for a firewall. SYNC — soft-clears the DCR destination on the partner (logs have no partner delete API). Returns 200 on success or 204 when nothing is configured.
 * x-ms-original-file: 2026-07-29-preview/LogIngestionSettingsResources_Delete_MaximumSet_Gen.json
 */
async function logIngestionSettingsResourcesDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.logIngestionSettingsResources.delete("firewall-rg", "firewall1");
}

/**
 * This sample demonstrates how to delete (clear) the Log Ingestion Settings for a firewall. SYNC — soft-clears the DCR destination on the partner (logs have no partner delete API). Returns 200 on success or 204 when nothing is configured.
 *
 * @summary delete (clear) the Log Ingestion Settings for a firewall. SYNC — soft-clears the DCR destination on the partner (logs have no partner delete API). Returns 200 on success or 204 when nothing is configured.
 * x-ms-original-file: 2026-07-29-preview/LogIngestionSettingsResources_Delete_MinimumSet_Gen.json
 */
async function logIngestionSettingsResourcesDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.logIngestionSettingsResources.delete("firewall-rg", "firewall1");
}

async function main() {
  await logIngestionSettingsResourcesDeleteMaximumSetGen();
  await logIngestionSettingsResourcesDeleteMinimumSetGen();
}

main().catch(console.error);
