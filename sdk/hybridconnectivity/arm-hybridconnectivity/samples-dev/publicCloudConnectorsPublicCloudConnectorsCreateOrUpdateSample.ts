// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a PublicCloudConnector
 *
 * @summary create a PublicCloudConnector
 * x-ms-original-file: 2024-12-01/PublicCloudConnectors_CreateOrUpdate.json
 */
async function publicCloudConnectorsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ACC4579-DB34-4C2F-8F8C-25061168F342";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.publicCloudConnectors.PublicCloudConnectors_createOrUpdate(
    "rgpublicCloud",
    "advjwoakdusalamomg",
    {
      properties: {
        awsCloudProfile: {
          accountId: "snbnuxckevyqpm",
          excludedAccounts: ["rwgqpukglvbqmogqcliqolucp"],
          isOrganizationalAccount: true,
        },
        hostType: "AWS",
      },
      tags: {},
      location: "jpiglusfxynfcewcjwvvnn",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await publicCloudConnectorsCreateOrUpdate();
}

main().catch(console.error);
