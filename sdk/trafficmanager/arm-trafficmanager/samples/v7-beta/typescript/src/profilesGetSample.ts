// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TrafficManagerManagementClient } from "@azure/arm-trafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Traffic Manager profile.
 *
 * @summary gets a Traffic Manager profile.
 * x-ms-original-file: 2024-04-01-preview/Profile-GET-WithEndpoints.json
 */
async function profileGETWithEndpoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.get(
    "azuresdkfornetautoresttrafficmanager1323",
    "azuresdkfornetautoresttrafficmanager3880",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a Traffic Manager profile.
 *
 * @summary gets a Traffic Manager profile.
 * x-ms-original-file: 2024-04-01-preview/Profile-GET-WithEndpointsAndRecordType.json
 */
async function profileGETWithEndpointsAndRecordType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.get(
    "azuresdkfornetautoresttrafficmanager1323",
    "azuresdkfornetautoresttrafficmanager3880",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a Traffic Manager profile.
 *
 * @summary gets a Traffic Manager profile.
 * x-ms-original-file: 2024-04-01-preview/Profile-GET-WithTrafficViewDisabled.json
 */
async function profileGETWithTrafficViewDisabled(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.get(
    "azuresdkfornetautoresttrafficmanager1323",
    "azuresdkfornetautoresttrafficmanager3880",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a Traffic Manager profile.
 *
 * @summary gets a Traffic Manager profile.
 * x-ms-original-file: 2024-04-01-preview/Profile-GET-WithTrafficViewEnabled.json
 */
async function profileGETWithTrafficViewEnabled(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.profiles.get(
    "azuresdkfornetautoresttrafficmanager1323",
    "azuresdkfornetautoresttrafficmanager3880",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await profileGETWithEndpoints();
  await profileGETWithEndpointsAndRecordType();
  await profileGETWithTrafficViewDisabled();
  await profileGETWithTrafficViewEnabled();
}

main().catch(console.error);
