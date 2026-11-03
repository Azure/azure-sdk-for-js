// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to geoDR Failover
 *
 * @summary geoDR Failover
 * x-ms-original-file: 2026-01-01/NameSpaces/EHNamespaceFailover.json
 */
async function nameSpaceCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "SampleSubscription";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.failover(
    "ResurceGroupSample",
    "NamespaceGeoDRFailoverSample",
    { force: true, primaryLocation: "centralus" },
  );
  console.log(result);
}

async function main() {
  await nameSpaceCreate();
}

main().catch(console.error);
