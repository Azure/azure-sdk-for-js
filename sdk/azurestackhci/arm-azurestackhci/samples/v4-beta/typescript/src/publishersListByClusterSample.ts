/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List Publishers available for the HCI Cluster.
 *
 * @summary List Publishers available for the HCI Cluster.
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/ListPublishersByCluster.json
 */
async function listPublisherResourcesByHciCluster() {
  const subscriptionId =
    process.env["AZURESTACKHCI_SUBSCRIPTION_ID"] ||
    "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName =
    process.env["AZURESTACKHCI_RESOURCE_GROUP"] || "test-rg";
  const clusterName = "myCluster";
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.publishers.listByCluster(
    resourceGroupName,
    clusterName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  listPublisherResourcesByHciCluster();
}

main().catch(console.error);