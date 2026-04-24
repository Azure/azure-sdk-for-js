// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AdminRuleCollectionsDeleteOptionalParams} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes an admin rule collection.
 *
 * @summary Deletes an admin rule collection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerAdminRuleCollectionDelete.json
 */
async function deletesAnAdminRuleCollection(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestSecurityConfig";
  const ruleCollectionName = "testRuleCollection";
  const force = false;
  const options: AdminRuleCollectionsDeleteOptionalParams = { force };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.adminRuleCollections.beginDeleteAndWait(
    resourceGroupName,
    networkManagerName,
    configurationName,
    ruleCollectionName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deletesAnAdminRuleCollection();
}

main().catch(console.error);
