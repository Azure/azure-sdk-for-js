// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the managed application definition.
 *
 * @summary Deletes the managed application definition.
 * x-ms-original-file: specification/solutions/resource-manager/Microsoft.Solutions/stable/2021-07-01/examples/deleteApplicationDefinition.json
 */

import { ApplicationClient } from "@azure/arm-managedapplications";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteManagedApplicationDefinition(): Promise<void> {
  const subscriptionId = process.env["MANAGEDAPPLICATIONS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["MANAGEDAPPLICATIONS_RESOURCE_GROUP"] || "rg";
  const applicationDefinitionName = "myManagedApplicationDef";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationClient(credential, subscriptionId);
  const result = await client.applicationDefinitions.delete(
    resourceGroupName,
    applicationDefinitionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteManagedApplicationDefinition();
}

main().catch(console.error);
