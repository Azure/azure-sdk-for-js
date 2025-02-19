// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a PublicCloudConnector
 *
 * @summary update a PublicCloudConnector
 * x-ms-original-file: 2024-12-01/PublicCloudConnectors_Update.json
 */
async function publicCloudConnectorsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ACC4579-DB34-4C2F-8F8C-25061168F342";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.publicCloudConnectors.PublicCloudConnectors_update(
    "rgpublicCloud",
    "svtirlbyqpepbzyessjenlueeznhg",
    {
      tags: {},
      properties: { awsCloudProfile: { excludedAccounts: ["zrbtd"] } },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await publicCloudConnectorsUpdate();
}

main().catch(console.error);
