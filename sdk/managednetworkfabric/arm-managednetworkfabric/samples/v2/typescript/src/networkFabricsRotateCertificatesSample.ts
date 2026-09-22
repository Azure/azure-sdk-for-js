// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates new certificates, then updates the Network Devices to use the new certificates. Note that disabled devices cannot be updated and must be resynchronized with the new certificates once they are enabled.
 *
 * @summary creates new certificates, then updates the Network Devices to use the new certificates. Note that disabled devices cannot be updated and must be resynchronized with the new certificates once they are enabled.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_RotateCertificates.json
 */
async function successfulCertificateRotationForAllNetworkDevices(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.rotateCertificates("example-rg", "example-fabric");
  console.log(result);
}

/**
 * This sample demonstrates how to creates new certificates, then updates the Network Devices to use the new certificates. Note that disabled devices cannot be updated and must be resynchronized with the new certificates once they are enabled.
 *
 * @summary creates new certificates, then updates the Network Devices to use the new certificates. Note that disabled devices cannot be updated and must be resynchronized with the new certificates once they are enabled.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_RotateCertificates_Error.json
 */
async function totalFailureToRotateCertificates(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.rotateCertificates("example-rg", "example-fabric");
  console.log(result);
}

/**
 * This sample demonstrates how to creates new certificates, then updates the Network Devices to use the new certificates. Note that disabled devices cannot be updated and must be resynchronized with the new certificates once they are enabled.
 *
 * @summary creates new certificates, then updates the Network Devices to use the new certificates. Note that disabled devices cannot be updated and must be resynchronized with the new certificates once they are enabled.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_RotateCertificates_PartialSuccess.json
 */
async function partialFailureToRotateCertificatesForSomeDevices(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.rotateCertificates("example-rg", "example-fabric");
  console.log(result);
}

async function main(): Promise<void> {
  await successfulCertificateRotationForAllNetworkDevices();
  await totalFailureToRotateCertificates();
  await partialFailureToRotateCertificatesForSomeDevices();
}

main().catch(console.error);
