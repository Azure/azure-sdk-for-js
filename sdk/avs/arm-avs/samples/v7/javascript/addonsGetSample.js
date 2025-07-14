// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Addon
 *
 * @summary get a Addon
 * x-ms-original-file: 2024-09-01/Addons_Get_ArcReg.json
 */
async function addonsGetArcReg() {
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
 * x-ms-original-file: 2024-09-01/Addons_Get_HCX.json
 */
async function addonsGetHCX() {
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
 * x-ms-original-file: 2024-09-01/Addons_Get_HCX_With_Networks.json
 */
async function addonsGetHCXWithNetworks() {
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
 * x-ms-original-file: 2024-09-01/Addons_Get_SRM.json
 */
async function addonsGetSRM() {
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
 * x-ms-original-file: 2024-09-01/Addons_Get_VR.json
 */
async function addonsGetVR() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.addons.get("group1", "cloud1", "vr");
  console.log(result);
}

async function main() {
  await addonsGetArcReg();
  await addonsGetHCX();
  await addonsGetHCXWithNetworks();
  await addonsGetSRM();
  await addonsGetVR();
}

main().catch(console.error);
