// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates an environment type.
 *
 * @summary Creates or updates an environment type.
 * x-ms-original-file: specification/devcenter/resource-manager/Microsoft.DevCenter/stable/2024-02-01/examples/EnvironmentTypes_Put.json
 */

import type { EnvironmentType } from "@azure/arm-devcenter";
import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function environmentTypesCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["DEVCENTER_SUBSCRIPTION_ID"] || "0ac520ee-14c0-480f-b6c9-0a90c58ffff";
  const resourceGroupName = process.env["DEVCENTER_RESOURCE_GROUP"] || "rg1";
  const devCenterName = "Contoso";
  const environmentTypeName = "DevTest";
  const body: EnvironmentType = {
    displayName: "Dev",
    tags: { owner: "superuser" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.environmentTypes.createOrUpdate(
    resourceGroupName,
    devCenterName,
    environmentTypeName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await environmentTypesCreateOrUpdate();
}

main().catch(console.error);
