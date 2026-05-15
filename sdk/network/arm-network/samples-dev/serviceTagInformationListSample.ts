// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of service tag information resources with pagination.
 *
 * @summary gets a list of service tag information resources with pagination.
 * x-ms-original-file: 2025-05-01/ServiceTagInformationListResult.json
 */
async function getListOfServiceTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serviceTagInformation.list("westeurope")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of service tag information resources with pagination.
 *
 * @summary gets a list of service tag information resources with pagination.
 * x-ms-original-file: 2025-05-01/ServiceTagInformationListResultWithNoAddressPrefixes.json
 */
async function getListOfServiceTagsWithNoAddressPrefixes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serviceTagInformation.list("westeurope", {
    noAddressPrefixes: true,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of service tag information resources with pagination.
 *
 * @summary gets a list of service tag information resources with pagination.
 * x-ms-original-file: 2025-05-01/ServiceTagInformationListResultWithTagname.json
 */
async function getListOfServiceTagsWithTagName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serviceTagInformation.list("westeurope", {
    tagName: "ApiManagement",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getListOfServiceTags();
  await getListOfServiceTagsWithNoAddressPrefixes();
  await getListOfServiceTagsWithTagName();
}

main().catch(console.error);
