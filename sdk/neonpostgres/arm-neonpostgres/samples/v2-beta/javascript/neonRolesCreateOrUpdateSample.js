// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a NeonRole
 *
 * @summary create a NeonRole
 * x-ms-original-file: 2025-06-23-preview/NeonRoles_CreateOrUpdate_MaximumSet_Gen.json
 */
async function neonRolesCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.neonRoles.createOrUpdate(
    "rgneon",
    "myOrganization",
    "myProject",
    "feature",
    "read_only_role",
    {
      properties: {
        entityName: "PostgresReadOnlyRole",
        attributes: [{ name: "on", value: "qzp" }],
        branchId: "tnmwjbftrvfpepgeytoeqsyhyz",
        permissions: ["cgubrzxkomlxoqdua"],
        isSuperUser: true,
      },
    },
  );
  console.log(result);
}

async function main() {
  await neonRolesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
