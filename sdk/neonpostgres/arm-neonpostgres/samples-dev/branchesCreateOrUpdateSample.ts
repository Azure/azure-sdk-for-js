// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Branch
 *
 * @summary create a Branch
 * x-ms-original-file: 2025-03-01/Branches_CreateOrUpdate_MaximumSet_Gen.json
 */
async function branchesCreateOrUpdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.branches.createOrUpdate(
    "rgneon",
    "contoso-org",
    "sample-resource",
    "sample-resource",
    {
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
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await branchesCreateOrUpdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
