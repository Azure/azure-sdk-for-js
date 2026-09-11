// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a PublicCloudConnector
 *
 * @summary get a PublicCloudConnector
 * x-ms-original-file: 2027-01-01/PublicCloudConnectors_Get_MaximumSet_Gen.json
 */
async function publicCloudConnectorsGetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ACC4579-DB34-4C2F-8F8C-25061168F342";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.publicCloudConnectors.get("rghybridconnectivity", "abc");
  console.log(result);
}

async function main(): Promise<void> {
  await publicCloudConnectorsGetGeneratedByMaximumSetRule();
}

main().catch(console.error);
