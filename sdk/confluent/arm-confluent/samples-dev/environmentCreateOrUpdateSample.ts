// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create confluent environment
 *
 * @summary create confluent environment
 * x-ms-original-file: 2025-08-18-preview/Environment_CreateOrUpdate_MaximumSet_Gen.json
 */
async function environmentCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.environment.createOrUpdate(
    "rgconfluent",
    "uf",
    "diycvbfypirqvomdkt",
    {
      body: {
        kind: "qhwbkvelujjbojvhrgiikildjdrqox",
        streamGovernanceConfig: { package: "ESSENTIALS" },
        metadata: {
          self: "bnbnbarlsvfifpzcnsnplf",
          resourceName: "ciadqmxlpgllibvkz",
          createdTimestamp: "ouqjivxfggaxzrsmxm",
          updatedTimestamp: "ctrngbppcxdpzmp",
          deletedTimestamp: "gn",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await environmentCreateOrUpdateMaximumSet();
}

main().catch(console.error);
