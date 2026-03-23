// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about the specified pool.
 *
 * @summary gets information about the specified pool.
 * x-ms-original-file: 2025-06-01/PoolGet.json
 */
async function getPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.get("default-azurebatch-japaneast", "sampleacct", "testpool");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about the specified pool.
 *
 * @summary gets information about the specified pool.
 * x-ms-original-file: 2025-06-01/PoolGet_AcceleratedNetworking.json
 */
async function getPoolAcceleratedNetworking(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.get("default-azurebatch-japaneast", "sampleacct", "testpool");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about the specified pool.
 *
 * @summary gets information about the specified pool.
 * x-ms-original-file: 2025-06-01/PoolGet_SecurityProfile.json
 */
async function getPoolSecurityProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.get("default-azurebatch-japaneast", "sampleacct", "testpool");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about the specified pool.
 *
 * @summary gets information about the specified pool.
 * x-ms-original-file: 2025-06-01/PoolGet_UpgradePolicy.json
 */
async function getPoolUpgradePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.get("default-azurebatch-japaneast", "sampleacct", "testpool");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about the specified pool.
 *
 * @summary gets information about the specified pool.
 * x-ms-original-file: 2025-06-01/PoolGet_VirtualMachineConfiguration_Extensions.json
 */
async function getPoolVirtualMachineConfigurationExtensions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.get("default-azurebatch-japaneast", "sampleacct", "testpool");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about the specified pool.
 *
 * @summary gets information about the specified pool.
 * x-ms-original-file: 2025-06-01/PoolGet_VirtualMachineConfiguration_MangedOSDisk.json
 */
async function getPoolVirtualMachineConfigurationOSDisk(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.get("default-azurebatch-japaneast", "sampleacct", "testpool");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about the specified pool.
 *
 * @summary gets information about the specified pool.
 * x-ms-original-file: 2025-06-01/PoolGet_VirtualMachineConfiguration_ServiceArtifactReference.json
 */
async function getPoolVirtualMachineConfigurationServiceArtifactReference(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.get("default-azurebatch-japaneast", "sampleacct", "testpool");
  console.log(result);
}

async function main(): Promise<void> {
  await getPool();
  await getPoolAcceleratedNetworking();
  await getPoolSecurityProfile();
  await getPoolUpgradePolicy();
  await getPoolVirtualMachineConfigurationExtensions();
  await getPoolVirtualMachineConfigurationOSDisk();
  await getPoolVirtualMachineConfigurationServiceArtifactReference();
}

main().catch(console.error);
