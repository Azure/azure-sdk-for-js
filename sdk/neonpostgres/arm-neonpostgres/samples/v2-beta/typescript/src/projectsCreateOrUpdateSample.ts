// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Project
 *
 * @summary create a Project
 * x-ms-original-file: 2025-06-23-preview/Projects_CreateOrUpdate_MaximumSet_Gen.json
 */
async function projectsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.projects.createOrUpdate("rgneon", "myOrganization", "myProject", {
    properties: {
      entityName: "myProject",
      attributes: [{ name: "environment", value: "development" }],
      regionId: "westus",
      storage: 22,
      pgVersion: 14,
      historyRetention: 3,
      defaultEndpointSettings: {
        autoscalingLimitMinCu: 3,
        autoscalingLimitMaxCu: 28,
      },
      branch: {
        entityName: "main",
        attributes: [{ name: "environment", value: "development" }],
        projectId: "project-123",
        parentId: "main-branch",
        roles: [
          {
            entityName: "read_only_role",
            attributes: [{ name: "environment", value: "development" }],
            branchId: "branch-123",
            permissions: ["SELECT"],
            isSuperUser: true,
          },
        ],
        databases: [
          {
            entityName: "appdb",
            attributes: [{ name: "environment", value: "development" }],
            branchId: "branch-123",
            ownerName: "postgres",
          },
        ],
        endpoints: [
          {
            entityName: "primary-endpoint",
            attributes: [{ name: "environment", value: "development" }],
            projectId: "project-123",
            branchId: "branch-123",
            endpointType: "read_write",
            size: { autoscalingLimitMinCu: 1, autoscalingLimitMaxCu: 4 },
          },
        ],
      },
      roles: [
        {
          entityName: "admin_role",
          attributes: [{ name: "environment", value: "development" }],
          branchId: "branch-123",
          permissions: ["ALL"],
          isSuperUser: true,
        },
      ],
      databases: [
        {
          entityName: "postgres",
          attributes: [{ name: "environment", value: "development" }],
          branchId: "branch-123",
          ownerName: "postgres",
        },
      ],
      endpoints: [
        {
          entityName: "readonly-endpoint",
          attributes: [{ name: "environment", value: "development" }],
          projectId: "project-123",
          branchId: "branch-123",
          endpointType: "read_only",
          size: { autoscalingLimitMinCu: 1, autoscalingLimitMaxCu: 2 },
        },
      ],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await projectsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
