// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Project } from "@azure/arm-devcenter";
import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a project.
 *
 * @summary Creates or updates a project.
 * x-ms-original-file: specification/devcenter/resource-manager/Microsoft.DevCenter/stable/2024-02-01/examples/Projects_Put.json
 */
async function projectsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["DEVCENTER_SUBSCRIPTION_ID"] || "0ac520ee-14c0-480f-b6c9-0a90c58ffff";
  const resourceGroupName = process.env["DEVCENTER_RESOURCE_GROUP"] || "rg1";
  const projectName = "DevProject";
  const body: Project = {
    description: "This is my first project.",
    devCenterId:
      "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff/resourceGroups/rg1/providers/Microsoft.DevCenter/devcenters/Contoso",
    displayName: "Dev",
    location: "centralus",
    tags: { costCenter: "R&D" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projects.beginCreateOrUpdateAndWait(
    resourceGroupName,
    projectName,
    body,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a project.
 *
 * @summary Creates or updates a project.
 * x-ms-original-file: specification/devcenter/resource-manager/Microsoft.DevCenter/stable/2024-02-01/examples/Projects_PutWithMaxDevBoxPerUser.json
 */
async function projectsCreateOrUpdateWithLimitsPerDev(): Promise<void> {
  const subscriptionId =
    process.env["DEVCENTER_SUBSCRIPTION_ID"] || "0ac520ee-14c0-480f-b6c9-0a90c58ffff";
  const resourceGroupName = process.env["DEVCENTER_RESOURCE_GROUP"] || "rg1";
  const projectName = "DevProject";
  const body: Project = {
    description: "This is my first project.",
    devCenterId:
      "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff/resourceGroups/rg1/providers/Microsoft.DevCenter/devcenters/Contoso",
    location: "centralus",
    maxDevBoxesPerUser: 3,
    tags: { costCenter: "R&D" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projects.beginCreateOrUpdateAndWait(
    resourceGroupName,
    projectName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await projectsCreateOrUpdate();
  await projectsCreateOrUpdateWithLimitsPerDev();
}

main().catch(console.error);
