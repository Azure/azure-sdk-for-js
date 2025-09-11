// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Branch
 *
 * @summary create a Branch
 * x-ms-original-file: 2025-06-23-preview/Branches_CreateOrUpdate_MaximumSet_Gen.json
 */
async function branchesCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.branches.createOrUpdate(
    "rgneon",
    "myOrganization",
    "myProject",
    "feature",
    {
      properties: {
        entityName: "FeatureBranch",
        attributes: [{ name: "on", value: "qzp" }],
        projectId: "cxhihpayn",
        parentId: "parent-123abc",
        roleName: "lwlafskrxvggwnfu",
        databaseName: "zxqetv",
        roles: [
          {
            entityName: "AdminRole",
            attributes: [{ name: "on", value: "qzp" }],
            branchId: "tnmwjbftrvfpepgeytoeqsyhyz",
            permissions: ["cgubrzxkomlxoqdua"],
            isSuperUser: true,
          },
        ],
        databases: [
          {
            entityName: "MainDatabase",
            attributes: [{ name: "on", value: "qzp" }],
            branchId: "sllrohrmwkgzre",
            ownerName: "rjpysakvuicrlwvzcbmp",
          },
        ],
        endpoints: [
          {
            entityName: "PrimaryEndpoint",
            attributes: [{ name: "on", value: "qzp" }],
            projectId: "vwwhykqyr",
            branchId: "blclbeuzvywzagbuvdo",
            endpointType: "read_only",
            size: { autoscalingLimitMinCu: 3, autoscalingLimitMaxCu: 14 },
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await branchesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
