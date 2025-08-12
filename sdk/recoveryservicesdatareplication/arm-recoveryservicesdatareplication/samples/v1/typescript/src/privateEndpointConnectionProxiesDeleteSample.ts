// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the operation to track the deletion of private endpoint connection proxy.
 *
 * @summary returns the operation to track the deletion of private endpoint connection proxy.
 * x-ms-original-file: 2024-09-01/PrivateEndpointConnectionProxy_Delete.json
 */
async function deletesThePrivateEndpointProxyConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  await client.privateEndpointConnectionProxies.delete("rgswagger_2024-09-01", "4", "d");
}

async function main(): Promise<void> {
  await deletesThePrivateEndpointProxyConnection();
}

main().catch(console.error);
