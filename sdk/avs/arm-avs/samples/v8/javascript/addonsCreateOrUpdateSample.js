// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Addon
 *
 * @summary create a Addon
 * x-ms-original-file: 2025-09-01/Addons_CreateOrUpdate_ArcReg.json
 */
async function addonsCreateOrUpdateArcReg() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.addons.createOrUpdate("group1", "cloud1", "arc", {
    properties: {
      addonType: "Arc",
      vCenter:
        "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg_test/providers/Microsoft.ConnectedVMwarevSphere/VCenters/test-vcenter",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a Addon
 *
 * @summary create a Addon
 * x-ms-original-file: 2025-09-01/Addons_CreateOrUpdate_HCX.json
 */
async function addonsCreateOrUpdateHCX() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.addons.createOrUpdate("group1", "cloud1", "hcx", {
    properties: { addonType: "HCX", offer: "VMware MaaS Cloud Provider (Enterprise)" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a Addon
 *
 * @summary create a Addon
 * x-ms-original-file: 2025-09-01/Addons_CreateOrUpdate_HCX_With_Networks.json
 */
async function addonsCreateOrUpdateHCXWithNetworks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.addons.createOrUpdate("group1", "cloud1", "hcx", {
    properties: {
      addonType: "HCX",
      offer: "VMware MaaS Cloud Provider (Enterprise)",
      managementNetwork: "10.3.1.0/24",
      uplinkNetwork: "10.3.2.0/24",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a Addon
 *
 * @summary create a Addon
 * x-ms-original-file: 2025-09-01/Addons_CreateOrUpdate_SRM.json
 */
async function addonsCreateOrUpdateSRM() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.addons.createOrUpdate("group1", "cloud1", "srm", {
    properties: { addonType: "SRM", licenseKey: "41915178-A8FF-4A4D-B683-6D735AF5E3F5" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a Addon
 *
 * @summary create a Addon
 * x-ms-original-file: 2025-09-01/Addons_CreateOrUpdate_VR.json
 */
async function addonsCreateOrUpdateVR() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.addons.createOrUpdate("group1", "cloud1", "vr", {
    properties: { addonType: "VR", vrsCount: 1 },
  });
  console.log(result);
}

async function main() {
  await addonsCreateOrUpdateArcReg();
  await addonsCreateOrUpdateHCX();
  await addonsCreateOrUpdateHCXWithNetworks();
  await addonsCreateOrUpdateSRM();
  await addonsCreateOrUpdateVR();
}

main().catch(console.error);
