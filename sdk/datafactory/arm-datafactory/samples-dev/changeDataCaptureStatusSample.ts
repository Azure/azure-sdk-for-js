// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the current status for the change data capture resource.
 *
 * @summary Gets the current status for the change data capture resource.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/ChangeDataCapture_Status.json
 */

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function changeDataCaptureStart(): Promise<void> {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName =
    process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const changeDataCaptureName = "exampleChangeDataCapture";
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.changeDataCapture.status(
    resourceGroupName,
    factoryName,
    changeDataCaptureName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await changeDataCaptureStart();
}

main().catch(console.error);
