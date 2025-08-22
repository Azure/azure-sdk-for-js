// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to update a Branch
 *
 * @summary update a Branch
 * x-ms-original-file: 2025-03-01/Branches_Update_MaximumSet_Gen.json
 */

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

async function branchesUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.branches.update("rgneon", "test-org", "entity-name", "entity-name", {
    properties: {
      entityName: "entity-name",
      attributes: [{ name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" }],
      projectId: "oik",
      parentId: "entity-id",
      roleName: "qrrairsupyosxnqotdwhbpc",
      databaseName: "duhxebzhd",
      roles: [
        {
          entityName: "entity-name",
          attributes: [{ name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" }],
          branchId: "wxbojkmdgaggkfiwqfakdkbyztm",
          permissions: ["myucqecpjriewzohxvadgkhiudnyx"],
          isSuperUser: true,
        },
      ],
      databases: [
        {
          entityName: "entity-name",
          attributes: [{ name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" }],
          branchId: "orfdwdmzvfvlnrgussvcvoek",
          ownerName: "odmbeg",
        },
      ],
      endpoints: [
        {
          entityName: "entity-name",
          attributes: [{ name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" }],
          projectId: "rtvdeeflqzlrpfzhjqhcsfbldw",
          branchId: "rzsyrhpfbydxtfkpaa",
          endpointType: "read_only",
        },
      ],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await branchesUpdateMaximumSet();
}

main().catch(console.error);
