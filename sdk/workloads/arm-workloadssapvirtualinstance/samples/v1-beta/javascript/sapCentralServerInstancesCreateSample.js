// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadsClient } = require("@azure/arm-workloadssapvirtualinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error.
 *
 * @summary creates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error.
 * x-ms-original-file: 2024-09-01/SapCentralInstances_Create.json
 */
async function sapCentralServerInstancesCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapCentralServerInstances.create("test-rg", "X00", "centralServer", {
    location: "westcentralus",
    properties: {},
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error.
 *
 * @summary creates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error.
 * x-ms-original-file: 2024-09-01/SapCentralInstances_CreateForHaWithAvailabilitySet.json
 */
async function createSAPCentralInstancesForHASystemWithAvailabilitySet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapCentralServerInstances.create("test-rg", "X00", "centralServer", {
    location: "westcentralus",
    properties: {},
    tags: {},
  });
  console.log(result);
}

async function main() {
  await sapCentralServerInstancesCreate();
  await createSAPCentralInstancesForHASystemWithAvailabilitySet();
}

main().catch(console.error);
