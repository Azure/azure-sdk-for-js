// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specified hybrid configuration group value.
 *
 * @summary Deletes the specified hybrid configuration group value.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/ConfigurationGroupValueDelete.json
 */

import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteHybridConfigurationGroupResource(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg1";
  const configurationGroupValueName = "testConfigurationGroupValue";
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.configurationGroupValues.beginDeleteAndWait(
    resourceGroupName,
    configurationGroupValueName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteHybridConfigurationGroupResource();
}

main().catch(console.error);
