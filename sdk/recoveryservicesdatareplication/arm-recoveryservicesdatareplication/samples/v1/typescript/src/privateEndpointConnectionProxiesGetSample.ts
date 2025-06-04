// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private endpoint connection proxy details.
 *
 * @summary gets the private endpoint connection proxy details.
 * x-ms-original-file: 2024-09-01/PrivateEndpointConnectionProxy_Get.json
 */
async function getPrivateEndpointConnectionProxy(): Promise<void> {
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

async function main(): Promise<void> {
  await getPrivateEndpointConnectionProxy();
}

main().catch(console.error);
