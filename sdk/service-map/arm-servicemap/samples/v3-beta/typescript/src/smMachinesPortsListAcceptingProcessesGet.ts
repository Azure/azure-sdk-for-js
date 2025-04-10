/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Returns a collection of processes accepting on the specified port
 *
 * @summary Returns a collection of processes accepting on the specified port
 * x-ms-original-file: specification/service-map/resource-manager/Microsoft.OperationalInsights/preview/2015-11-01-preview/examples/Machines/Ports/SMMachinesPortsListAcceptingProcessesGet.json
 */
import { ServiceMap } from "@azure/arm-servicemap";
import { DefaultAzureCredential } from "@azure/identity";

async function smMachinesPortsListAcceptingProcessesGet(): Promise<void> {
  const subscriptionId = "63BE4E24-FDF0-4E9C-9342-6A5D5A359722";
  const resourceGroupName = "rg-sm";
  const workspaceName = "D6F79F14-E563-469B-84B5-9286D2803B2F";
  const machineName = "m-1bc28d72-0e81-4aff-b1e3-ae12e8da155e";
  const portName = "b-c0a80101_8000";
  const startTime = new Date("2018-01-08T18:37:39.936Z");
  const endTime = new Date("2018-01-08T18:37:54.936Z");
  const options = { startTime: startTime, endTime: endTime };
  const credential = new DefaultAzureCredential();
  const client = new ServiceMap(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.ports.listAcceptingProcesses(
    resourceGroupName,
    workspaceName,
    machineName,
    portName,
    options
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

smMachinesPortsListAcceptingProcessesGet().catch(console.error);
