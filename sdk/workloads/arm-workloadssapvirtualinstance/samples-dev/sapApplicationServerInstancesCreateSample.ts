// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to puts the SAP Application Server Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error.
 *
 * @summary puts the SAP Application Server Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error.
 * x-ms-original-file: 2024-09-01/SapApplicationServerInstances_Create.json
 */
async function sapApplicationServerInstancesCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapApplicationServerInstances.create("test-rg", "X00", "app01", {
    location: "westcentralus",
    properties: {},
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to puts the SAP Application Server Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error.
 *
 * @summary puts the SAP Application Server Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error.
 * x-ms-original-file: 2024-09-01/SapApplicationServerInstances_CreateForHaWithAvailabilitySet.json
 */
async function createSAPApplicationServerInstancesForHASystemWithAvailabilitySet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapApplicationServerInstances.create("test-rg", "X00", "app01", {
    location: "westcentralus",
    properties: {},
    tags: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await sapApplicationServerInstancesCreate();
  await createSAPApplicationServerInstancesForHASystemWithAvailabilitySet();
}

main().catch(console.error);
