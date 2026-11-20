// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MigrateClient } = require("@azure/arm-migratecontainerappsassessments");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a AssessedWebApplication
 *
 * @summary get a AssessedWebApplication
 * x-ms-original-file: 2025-09-09-preview/AssessedWebApplicationOperations_Get_MaximumSet_Gen.json
 */
async function assessedWebApplicationOperationsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "572C3D3F-425D-4AE8-A935-72631EADDE56";
  const client = new MigrateClient(credential, subscriptionId);
  const result = await client.assessedWebApplicationOperations.get(
    "rgcontainerAppsAssessments",
    "testProject",
    "testcontainerAppsAssessment",
    "webapp",
  );
  console.log(result);
}

async function main() {
  await assessedWebApplicationOperationsGetMaximumSet();
}

main().catch(console.error);
