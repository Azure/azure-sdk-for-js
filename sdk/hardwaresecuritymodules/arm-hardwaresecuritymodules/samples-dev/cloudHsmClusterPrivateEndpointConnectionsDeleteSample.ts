// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to deletes the private endpoint connection for the Cloud Hsm Cluster.
 *
 * @summary deletes the private endpoint connection for the Cloud Hsm Cluster.
 * x-ms-original-file: 2025-03-31/CloudHsmClusterPrivateEndpointConnection_Delete_MaximumSet_Gen.json
 */

import { AzureDedicatedHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";

async function cloudHsmClusterPrivateEndpointConnectionDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  await client.cloudHsmClusterPrivateEndpointConnections.delete(
    "rgcloudhsm",
    "chsm1",
    "sample-pec",
  );
}

async function main(): Promise<void> {
  await cloudHsmClusterPrivateEndpointConnectionDeleteMaximumSetGen();
}

main().catch(console.error);
