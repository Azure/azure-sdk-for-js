// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a project with specified name. Supports partial updates, for example only tags can be provided.
 *
 * @summary Update a project with specified name. Supports partial updates, for example only tags can be provided.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/Projects_Update.json
 */

import type { Project, ProjectsUpdateOptionalParams } from "@azure/arm-migrate";
import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function projectsUpdate(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "6393a73f-8d55-47ef-b6dd-179b3e0c7910";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "abgoyal-westEurope";
  const projectName = "abGoyalProject2";
  const project: Project = {
    eTag: "",
    location: "West Europe",
    properties: {
      assessmentSolutionId:
        "/subscriptions/6393a73f-8d55-47ef-b6dd-179b3e0c7910/resourcegroups/abgoyal-westeurope/providers/microsoft.migrate/migrateprojects/abgoyalweselfhost/Solutions/Servers-Assessment-ServerAssessment",
      customerWorkspaceId: undefined,
      customerWorkspaceLocation: undefined,
      projectStatus: "Active",
    },
    tags: {},
  };
  const options: ProjectsUpdateOptionalParams = { project };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.projects.update(resourceGroupName, projectName, options);
  console.log(result);
}

async function main(): Promise<void> {
  await projectsUpdate();
}

main().catch(console.error);
