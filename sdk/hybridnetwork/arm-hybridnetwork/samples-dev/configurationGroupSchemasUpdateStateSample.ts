// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update configuration group schema state.
 *
 * @summary Update configuration group schema state.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/ConfigurationGroupSchemaVersionUpdateState.json
 */

import type { ConfigurationGroupSchemaVersionUpdateState } from "@azure/arm-hybridnetwork";
import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateNetworkServiceDesignVersionState(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg1";
  const publisherName = "testPublisher";
  const configurationGroupSchemaName = "testConfigurationGroupSchema";
  const parameters: ConfigurationGroupSchemaVersionUpdateState = {
    versionState: "Active",
  };
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.configurationGroupSchemas.beginUpdateStateAndWait(
    resourceGroupName,
    publisherName,
    configurationGroupSchemaName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateNetworkServiceDesignVersionState();
}

main().catch(console.error);
