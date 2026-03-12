// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to gets the all private endpoint connections proxies.
 *
 * @summary gets the all private endpoint connections proxies.
 * x-ms-original-file: 2024-09-01/PrivateEndpointConnectionProxy_List.json
 */

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

async function listsThePrivateEndpointConnectionProxy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnectionProxies.list(
    "rgswagger_2024-09-01",
    "4",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsThePrivateEndpointConnectionProxy();
}

main().catch(console.error);
