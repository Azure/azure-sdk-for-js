// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to If a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version.
 *
 * @summary If a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version.
 * x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ListUpgradableVersionsMinMax_example.json
 */

import type {
  UpgradableVersionsDescription,
  ClustersListUpgradableVersionsOptionalParams,
} from "@azure/arm-servicefabric";
import { ServiceFabricManagementClient } from "@azure/arm-servicefabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getMinimumAndMaximumCodeVersions(): Promise<void> {
  const subscriptionId =
    process.env["SERVICEFABRIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SERVICEFABRIC_RESOURCE_GROUP"] || "resRg";
  const clusterName = "myCluster";
  const credential = new DefaultAzureCredential();
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.clusters.listUpgradableVersions(resourceGroupName, clusterName);
  console.log(result);
}

/**
 * This sample demonstrates how to If a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version.
 *
 * @summary If a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version.
 * x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ListUpgradableVersionsPath_example.json
 */
async function getUpgradePath(): Promise<void> {
  const subscriptionId =
    process.env["SERVICEFABRIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SERVICEFABRIC_RESOURCE_GROUP"] || "resRg";
  const clusterName = "myCluster";
  const versionsDescription: UpgradableVersionsDescription = {
    targetVersion: "7.2.432.9590",
  };
  const options: ClustersListUpgradableVersionsOptionalParams = {
    versionsDescription,
  };
  const credential = new DefaultAzureCredential();
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.clusters.listUpgradableVersions(
    resourceGroupName,
    clusterName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getMinimumAndMaximumCodeVersions();
  await getUpgradePath();
}

main().catch(console.error);
