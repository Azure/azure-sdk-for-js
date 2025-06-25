// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OnlineExperimentationClient } from "@azure/arm-onlineexperimentation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private endpoint connection details for an online experimentation workspace resource.
 *
 * @summary gets the private endpoint connection details for an online experimentation workspace resource.
 * x-ms-original-file: 2025-08-01-preview/PrivateEndpointConnection_Get.json
 */
async function getsThePrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "2025-08-01-preview",
    "res9871",
    "expworkspace3",
    "connection1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsThePrivateEndpointConnection();
}

main().catch(console.error);
