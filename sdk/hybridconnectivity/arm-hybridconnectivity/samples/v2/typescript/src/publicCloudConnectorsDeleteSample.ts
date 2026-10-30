// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a PublicCloudConnector
 *
 * @summary delete a PublicCloudConnector
 * x-ms-original-file: 2027-01-01/PublicCloudConnectors_Delete_MaximumSet_Gen.json
 */
async function publicCloudConnectorsDeleteGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ACC4579-DB34-4C2F-8F8C-25061168F342";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  await client.publicCloudConnectors.delete("rghybridconnectivity", "abc");
}

async function main(): Promise<void> {
  await publicCloudConnectorsDeleteGeneratedByMaximumSetRule();
}

main().catch(console.error);
