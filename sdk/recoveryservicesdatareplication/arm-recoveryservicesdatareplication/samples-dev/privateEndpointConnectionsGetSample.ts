// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private endpoint connection details.
 *
 * @summary gets the private endpoint connection details.
 * x-ms-original-file: 2024-09-01/PrivateEndpointConnection_Get.json
 */
async function getsThePrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get("rgswagger_2024-09-01", "4", "vbkm");
  console.log(result);
}

async function main(): Promise<void> {
  await getsThePrivateEndpointConnection();
}

main().catch(console.error);
