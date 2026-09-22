// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates all Network Devices to use the latest certificates. Does not generate new certificates. Allows network devices missed during a previous certificate rotation to be brought back into sync.
 *
 * @summary updates all Network Devices to use the latest certificates. Does not generate new certificates. Allows network devices missed during a previous certificate rotation to be brought back into sync.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_ResyncCertificates.json
 */
async function successfulCertificateResyncForAllNetworkDevices() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.resyncCertificates("example-rg", "example-fabric");
  console.log(result);
}

/**
 * This sample demonstrates how to updates all Network Devices to use the latest certificates. Does not generate new certificates. Allows network devices missed during a previous certificate rotation to be brought back into sync.
 *
 * @summary updates all Network Devices to use the latest certificates. Does not generate new certificates. Allows network devices missed during a previous certificate rotation to be brought back into sync.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_ResyncCertificates_Error.json
 */
async function totalFailureToResyncCertificates() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.resyncCertificates("example-rg", "example-fabric");
  console.log(result);
}

/**
 * This sample demonstrates how to updates all Network Devices to use the latest certificates. Does not generate new certificates. Allows network devices missed during a previous certificate rotation to be brought back into sync.
 *
 * @summary updates all Network Devices to use the latest certificates. Does not generate new certificates. Allows network devices missed during a previous certificate rotation to be brought back into sync.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_ResyncCertificates_PartialSuccess.json
 */
async function partialFailureToResyncCertificatesForSomeDevices() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.resyncCertificates("example-rg", "example-fabric");
  console.log(result);
}

async function main() {
  await successfulCertificateResyncForAllNetworkDevices();
  await totalFailureToResyncCertificates();
  await partialFailureToResyncCertificatesForSomeDevices();
}

main().catch(console.error);
