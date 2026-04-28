// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the data of supported operating systems by SRS.
 *
 * @summary gets the data of supported operating systems by SRS.
 * x-ms-original-file: 2025-08-01/SupportedOperatingSystems_Get.json
 */
async function getsTheDataOfSupportedOperatingSystemsBySRS() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.supportedOperatingSystems.get("resourceGroupPS1", "vault1");
  console.log(result);
}

async function main() {
  await getsTheDataOfSupportedOperatingSystemsBySRS();
}

main().catch(console.error);
