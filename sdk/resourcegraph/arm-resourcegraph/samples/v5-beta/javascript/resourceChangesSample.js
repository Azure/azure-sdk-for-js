// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceGraphClient } = require("@azure/arm-resourcegraph");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list changes to a resource for a given time interval.
 *
 * @summary list changes to a resource for a given time interval.
 * x-ms-original-file: 2020-09-01-preview/ResourceChanges.json
 */
async function basicQuery() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resourceChanges({
    interval: {
      end: new Date("2018-10-31T12:09:03.141Z"),
      start: new Date("2018-10-30T12:09:03.141Z"),
    },
    resourceIds: [
      "/subscriptions/4d962866-1e3f-47f2-bd18-450c08f914c1/resourceGroups/MyResourceGroup/providers/Microsoft.Storage/storageAccounts/mystorageaccount",
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to list changes to a resource for a given time interval.
 *
 * @summary list changes to a resource for a given time interval.
 * x-ms-original-file: 2020-09-01-preview/ResourceChangesFirstPage.json
 */
async function firstPageQuery() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resourceChanges({
    top: 2,
    interval: {
      end: new Date("2018-10-31T12:09:03.141Z"),
      start: new Date("2018-10-30T12:09:03.141Z"),
    },
    resourceIds: [
      "/subscriptions/4d962866-1e3f-47f2-bd18-450c08f914c1/resourceGroups/MyResourceGroup/providers/Microsoft.Storage/storageAccounts/mystorageaccount",
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to list changes to a resource for a given time interval.
 *
 * @summary list changes to a resource for a given time interval.
 * x-ms-original-file: 2020-09-01-preview/ResourceChangesNextPage.json
 */
async function nextPageQuery() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resourceChanges({
    skipToken: "ew0KICAiJGlkIjogIjEiLA0KICAiRW5kVGltZSI6ICJcL0RhdGUoMTU1MDc0NT",
    top: 2,
    interval: {
      end: new Date("2018-10-31T12:09:03.141Z"),
      start: new Date("2018-10-30T12:09:03.141Z"),
    },
    resourceIds: [
      "/subscriptions/4d962866-1e3f-47f2-bd18-450c08f914c1/resourceGroups/MyResourceGroup/providers/Microsoft.Storage/storageAccounts/mystorageaccount",
    ],
  });
  console.log(result);
}

async function main() {
  await basicQuery();
  await firstPageQuery();
  await nextPageQuery();
}

main().catch(console.error);
