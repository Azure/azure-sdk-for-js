// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkSecurityManagementClient } from "@azure/arm-networksecurity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a mitigation under a protected resource.
 *
 * @summary gets a mitigation under a protected resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_Get.json
 */
async function getMitigation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShieldMitigations.get(
    "myResourceGroup",
    "myNeuroShield",
    "vm-01",
    "mitigation-01",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a mitigation under a protected resource.
 *
 * @summary gets a mitigation under a protected resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_Get_Failed.json
 */
async function getMitigationFailedStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShieldMitigations.get(
    "myResourceGroup",
    "myNeuroShield",
    "vm-01",
    "mitigation-01",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a mitigation under a protected resource.
 *
 * @summary gets a mitigation under a protected resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_Get_InProgress.json
 */
async function getMitigationInProgressStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShieldMitigations.get(
    "myResourceGroup",
    "myNeuroShield",
    "vm-01",
    "mitigation-01",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a mitigation under a protected resource.
 *
 * @summary gets a mitigation under a protected resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_Get_Queued.json
 */
async function getMitigationQueuedStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShieldMitigations.get(
    "myResourceGroup",
    "myNeuroShield",
    "vm-01",
    "mitigation-01",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a mitigation under a protected resource.
 *
 * @summary gets a mitigation under a protected resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldMitigations_Get_Succeeded.json
 */
async function getMitigationSucceededStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShieldMitigations.get(
    "myResourceGroup",
    "myNeuroShield",
    "vm-01",
    "mitigation-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getMitigation();
  await getMitigationFailedStatus();
  await getMitigationInProgressStatus();
  await getMitigationQueuedStatus();
  await getMitigationSucceededStatus();
}

main().catch(console.error);
