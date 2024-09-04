/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  ChangeDataCaptureResource,
  DataFactoryManagementClient,
} from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a change data capture resource.
 *
 * @summary Creates or updates a change data capture resource.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/ChangeDataCapture_Create.json
 */
async function changeDataCaptureCreate() {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName =
    process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const changeDataCaptureName = "exampleChangeDataCapture";
  const changeDataCapture: ChangeDataCaptureResource = {
    description:
      "Sample demo change data capture to transfer data from delimited (csv) to Azure SQL Database with automapped and non-automapped mappings.",
    allowVNetOverride: false,
    sourceConnectionsInfo: [],
    targetConnectionsInfo: [],
    policy: {}
  };
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.changeDataCapture.createOrUpdate(
    resourceGroupName,
    factoryName,
    changeDataCaptureName,
    changeDataCapture,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a change data capture resource.
 *
 * @summary Creates or updates a change data capture resource.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/ChangeDataCapture_Update.json
 */
async function changeDataCaptureUpdate() {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName =
    process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const changeDataCaptureName = "exampleChangeDataCapture";
  const changeDataCapture: ChangeDataCaptureResource = {
    description:
      "Sample demo change data capture to transfer data from delimited (csv) to Azure SQL Database. Updating table mappings.",
    allowVNetOverride: false,
    status: "Stopped",
    sourceConnectionsInfo: [],
    targetConnectionsInfo: [],
    policy: {}
  };
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.changeDataCapture.createOrUpdate(
    resourceGroupName,
    factoryName,
    changeDataCaptureName,
    changeDataCapture,
  );
  console.log(result);
}

async function main() {
  changeDataCaptureCreate();
  changeDataCaptureUpdate();
}

main().catch(console.error);