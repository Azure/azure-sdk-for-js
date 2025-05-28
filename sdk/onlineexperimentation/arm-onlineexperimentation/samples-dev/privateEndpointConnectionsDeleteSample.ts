// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OnlineExperimentationClient } from "@azure/arm-onlineexperimentation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes private endpoint connection for an online experimentation workspace resource.
 *
 * @summary deletes private endpoint connection for an online experimentation workspace resource.
 * x-ms-original-file: 2025-08-01-preview/PrivateEndpointConnection_Delete.json
 */
async function deletesThePrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "res9871",
    "expworkspace3",
    "sdwqtfhigjirrzhpbmqtzgs",
  );
}

async function main(): Promise<void> {
  await deletesThePrivateEndpointConnection();
}

main().catch(console.error);
