// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Addon
 *
 * @summary get a Addon
 * x-ms-original-file: 2025-09-01/Addons_Get_ArcReg.json
 */
async function addonsGetArcReg(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.addons.get("group1", "cloud1", "arc");
  console.log(result);
}

/**
 * This sample demonstrates how to get a Addon
 *
 * @summary get a Addon
 * x-ms-original-file: 2025-09-01/Addons_Get_HCX.json
 */
async function addonsGetHCX(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.addons.get("group1", "cloud1", "hcx");
  console.log(result);
}

/**
 * This sample demonstrates how to get a Addon
 *
 * @summary get a Addon
 * x-ms-original-file: 2025-09-01/Addons_Get_HCX_With_Networks.json
 */
async function addonsGetHCXWithNetworks(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.addons.get("group1", "cloud1", "hcx");
  console.log(result);
}

/**
 * This sample demonstrates how to get a Addon
 *
 * @summary get a Addon
 * x-ms-original-file: 2025-09-01/Addons_Get_SRM.json
 */
async function addonsGetSRM(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.addons.get("group1", "cloud1", "srm");
  console.log(result);
}

/**
 * This sample demonstrates how to get a Addon
 *
 * @summary get a Addon
 * x-ms-original-file: 2025-09-01/Addons_Get_VR.json
 */
async function addonsGetVR(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.addons.get("group1", "cloud1", "vr");
  console.log(result);
}

async function main(): Promise<void> {
  await addonsGetArcReg();
  await addonsGetHCX();
  await addonsGetHCXWithNetworks();
  await addonsGetSRM();
  await addonsGetVR();
}

main().catch(console.error);
