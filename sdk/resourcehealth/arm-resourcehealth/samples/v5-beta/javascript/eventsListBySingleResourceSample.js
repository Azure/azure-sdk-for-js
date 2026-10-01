// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftResourceHealth } = require("@azure/arm-resourcehealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists current service health events for given resource.
 *
 * @summary lists current service health events for given resource.
 * x-ms-original-file: 2025-05-01/Events_ListBySingleResource.json
 */
async function listEventsBySingleResource() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const resArray = new Array();
  for await (const item of client.events.listBySingleResource(
    "subscriptions/4abcdefgh-ijkl-mnop-qrstuvwxyz/resourceGroups/rhctestenv/providers/Microsoft.Compute/virtualMachines/rhctestenvV1PI",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listEventsBySingleResource();
}

main().catch(console.error);
