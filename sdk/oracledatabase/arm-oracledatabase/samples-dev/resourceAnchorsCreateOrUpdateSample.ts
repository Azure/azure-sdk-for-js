// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ResourceAnchor
 *
 * @summary create a ResourceAnchor
 * x-ms-original-file: 2025-09-01/ResourceAnchors_CreateOrUpdate_MaximumSet_Gen.json
 */
async function resourceAnchorsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.resourceAnchors.createOrUpdate("rgopenapi", "resourceanchor1", {
    properties: { linkedCompartmentId: "ocid1.autonomousdatabase.oc1..aaaaa3klq" },
    tags: { key236: "wbucrnidikivbujndfk" },
    location: "at",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await resourceAnchorsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
