// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a private link resource for the durable task scheduler
 *
 * @summary get a private link resource for the durable task scheduler
 * x-ms-original-file: 2026-02-01/PrivateLinkResources_Get_MaximumSet_Gen.json
 */
async function privateLinkResourcesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "851A7597-D699-45CC-899B-7487A5B3B775";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.schedulers.getPrivateLink(
    "rgdurabletask",
    "testscheduler",
    "ulbdiqhrmwnkejje",
  );
  console.log(result);
}

async function main() {
  await privateLinkResourcesGetMaximumSet();
}

main().catch(console.error);
