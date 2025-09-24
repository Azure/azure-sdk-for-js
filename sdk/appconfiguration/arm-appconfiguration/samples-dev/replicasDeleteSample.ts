// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a replica.
 *
 * @summary Deletes a replica.
 * x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/stable/2024-06-01/examples/ConfigurationStoresDeleteReplica.json
 */

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function replicasDelete(): Promise<void> {
  const subscriptionId =
    process.env["APPCONFIGURATION_SUBSCRIPTION_ID"] ||
    "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const resourceGroupName =
    process.env["APPCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroup";
  const configStoreName = "contoso";
  const replicaName = "myReplicaEus";
  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.replicas.beginDeleteAndWait(
    resourceGroupName,
    configStoreName,
    replicaName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await replicasDelete();
}

main().catch(console.error);
