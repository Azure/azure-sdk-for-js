// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Query triggers.
 *
 * @summary Query triggers.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/Triggers_QueryByFactory.json
 */

import {
  TriggerFilterParameters,
  DataFactoryManagementClient,
} from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function triggersQueryByFactory(): Promise<void> {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName =
    process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const filterParameters: TriggerFilterParameters = {
    parentTriggerName: "exampleTrigger",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.triggers.queryByFactory(
    resourceGroupName,
    factoryName,
    filterParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await triggersQueryByFactory();
}

main().catch(console.error);
