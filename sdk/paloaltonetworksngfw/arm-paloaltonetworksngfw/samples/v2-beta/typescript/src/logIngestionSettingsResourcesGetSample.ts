// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the Log Ingestion Settings for a firewall. Live read from the partner. Returns 200 OK with the current settings, or 404 when log ingestion has not been configured.
 *
 * @summary get the Log Ingestion Settings for a firewall. Live read from the partner. Returns 200 OK with the current settings, or 404 when log ingestion has not been configured.
 * x-ms-original-file: 2026-07-29-preview/LogIngestionSettingsResources_Get_MaximumSet_Gen.json
 */
async function logIngestionSettingsResourcesGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.logIngestionSettingsResources.get("firewall-rg", "firewall1");
  console.log(result);
}

/**
 * This sample demonstrates how to get the Log Ingestion Settings for a firewall. Live read from the partner. Returns 200 OK with the current settings, or 404 when log ingestion has not been configured.
 *
 * @summary get the Log Ingestion Settings for a firewall. Live read from the partner. Returns 200 OK with the current settings, or 404 when log ingestion has not been configured.
 * x-ms-original-file: 2026-07-29-preview/LogIngestionSettingsResources_Get_MinimumSet_Gen.json
 */
async function logIngestionSettingsResourcesGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.logIngestionSettingsResources.get("firewall-rg", "firewall1");
  console.log(result);
}

async function main(): Promise<void> {
  await logIngestionSettingsResourcesGetMaximumSetGen();
  await logIngestionSettingsResourcesGetMinimumSetGen();
}

main().catch(console.error);
