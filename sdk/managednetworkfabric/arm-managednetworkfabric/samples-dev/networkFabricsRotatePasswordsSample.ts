// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates new passwords, then updates the Terminal Server and Network Devices to use the new passwords.
 *
 * Note that disabled devices cannot be updated and must be resynchronized with the new passwords once they are enabled.
 *
 * Fails if any of the devices could not be updated with the new password.
 * Failed devices should be resynchronized with the new passwords once possible.
 *
 * @summary creates new passwords, then updates the Terminal Server and Network Devices to use the new passwords.
 *
 * Note that disabled devices cannot be updated and must be resynchronized with the new passwords once they are enabled.
 *
 * Fails if any of the devices could not be updated with the new password.
 * Failed devices should be resynchronized with the new passwords once possible.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_RotatePasswords.json
 */
async function successfulPasswordRotationForTheTerminalServerAndAllNetworkDevices(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.rotatePasswords("example-rg", "example-fabric");
  console.log(result);
}

/**
 * This sample demonstrates how to creates new passwords, then updates the Terminal Server and Network Devices to use the new passwords.
 *
 * Note that disabled devices cannot be updated and must be resynchronized with the new passwords once they are enabled.
 *
 * Fails if any of the devices could not be updated with the new password.
 * Failed devices should be resynchronized with the new passwords once possible.
 *
 * @summary creates new passwords, then updates the Terminal Server and Network Devices to use the new passwords.
 *
 * Note that disabled devices cannot be updated and must be resynchronized with the new passwords once they are enabled.
 *
 * Fails if any of the devices could not be updated with the new password.
 * Failed devices should be resynchronized with the new passwords once possible.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_RotatePasswords_Error.json
 */
async function totalFailureToRotatePasswords(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.rotatePasswords("example-rg", "example-fabric");
  console.log(result);
}

/**
 * This sample demonstrates how to creates new passwords, then updates the Terminal Server and Network Devices to use the new passwords.
 *
 * Note that disabled devices cannot be updated and must be resynchronized with the new passwords once they are enabled.
 *
 * Fails if any of the devices could not be updated with the new password.
 * Failed devices should be resynchronized with the new passwords once possible.
 *
 * @summary creates new passwords, then updates the Terminal Server and Network Devices to use the new passwords.
 *
 * Note that disabled devices cannot be updated and must be resynchronized with the new passwords once they are enabled.
 *
 * Fails if any of the devices could not be updated with the new password.
 * Failed devices should be resynchronized with the new passwords once possible.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_RotatePasswords_PartialSuccess.json
 */
async function partialFailureToRotatePasswordsForSomeDevices(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.rotatePasswords("example-rg", "example-fabric");
  console.log(result);
}

async function main(): Promise<void> {
  await successfulPasswordRotationForTheTerminalServerAndAllNetworkDevices();
  await totalFailureToRotatePasswords();
  await partialFailureToRotatePasswordsForSomeDevices();
}

main().catch(console.error);
