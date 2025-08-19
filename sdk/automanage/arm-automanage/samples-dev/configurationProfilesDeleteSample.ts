// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomanageClient } from "@azure/arm-automanage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete a configuration profile
 *
 * @summary Delete a configuration profile
 * x-ms-original-file: specification/automanage/resource-manager/Microsoft.Automanage/stable/2022-05-04/examples/deleteConfigurationProfile.json
 */
async function deleteAConfigurationProfile(): Promise<void> {
  const subscriptionId = process.env["AUTOMANAGE_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["AUTOMANAGE_RESOURCE_GROUP"] || "rg";
  const configurationProfileName = "customConfigurationProfile";
  const credential = new DefaultAzureCredential();
  const client = new AutomanageClient(credential, subscriptionId);
  const result = await client.configurationProfiles.delete(
    resourceGroupName,
    configurationProfileName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAConfigurationProfile();
}

main().catch(console.error);
