// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a project environment type.
 *
 * @summary Deletes a project environment type.
 * x-ms-original-file: specification/devcenter/resource-manager/Microsoft.DevCenter/stable/2024-02-01/examples/ProjectEnvironmentTypes_Delete.json
 */

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function projectEnvironmentTypesDelete(): Promise<void> {
  const subscriptionId =
    process.env["DEVCENTER_SUBSCRIPTION_ID"] || "0ac520ee-14c0-480f-b6c9-0a90c58ffff";
  const resourceGroupName = process.env["DEVCENTER_RESOURCE_GROUP"] || "rg1";
  const projectName = "ContosoProj";
  const environmentTypeName = "DevTest";
  const credential = new DefaultAzureCredential();
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectEnvironmentTypes.delete(
    resourceGroupName,
    projectName,
    environmentTypeName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await projectEnvironmentTypesDelete();
}

main().catch(console.error);
