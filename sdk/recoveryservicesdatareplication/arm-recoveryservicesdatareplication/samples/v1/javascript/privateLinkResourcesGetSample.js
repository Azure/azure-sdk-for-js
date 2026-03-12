// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of site recovery private link resource.
 *
 * @summary gets the details of site recovery private link resource.
 * x-ms-original-file: 2024-09-01/PrivateLinkResource_Get.json
 */
async function getPrivateLinkResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.privateLinkResources.get("rgswagger_2024-09-01", "4", "d");
  console.log(result);
}

async function main() {
  await getPrivateLinkResource();
}

main().catch(console.error);
