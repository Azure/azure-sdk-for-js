// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private endpoint connection proxy details.
 *
 * @summary gets the private endpoint connection proxy details.
 * x-ms-original-file: 2024-09-01/PrivateEndpointConnectionProxy_Get.json
 */
async function getPrivateEndpointConnectionProxy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.privateEndpointConnectionProxies.get(
    "rgswagger_2024-09-01",
    "4",
    "d",
  );
  console.log(result);
}

async function main() {
  await getPrivateEndpointConnectionProxy();
}

main().catch(console.error);
