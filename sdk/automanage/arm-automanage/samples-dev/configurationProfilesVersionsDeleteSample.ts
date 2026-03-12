// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a configuration profile version
 *
 * @summary Delete a configuration profile version
 * x-ms-original-file: specification/automanage/resource-manager/Microsoft.Automanage/stable/2022-05-04/examples/deleteConfigurationProfileVersion.json
 */

import { AutomanageClient } from "@azure/arm-automanage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAConfigurationProfileVersion(): Promise<void> {
  const subscriptionId = process.env["AUTOMANAGE_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["AUTOMANAGE_RESOURCE_GROUP"] || "rg";
  const configurationProfileName = "customConfigurationProfile";
  const versionName = "version1";
  const credential = new DefaultAzureCredential();
  const client = new AutomanageClient(credential, subscriptionId);
  const result = await client.configurationProfilesVersions.delete(
    resourceGroupName,
    configurationProfileName,
    versionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAConfigurationProfileVersion();
}

main().catch(console.error);
