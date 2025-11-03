// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to geoDR Failover
 *
 * @summary geoDR Failover
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/SBNamespaceFailover.json
 */
async function nameSpaceCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.namespaces.failover(
    "ResurceGroupSample",
    "NamespaceGeoDRFailoverSample",
    { properties: { force: true, primaryLocation: "centralus" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceCreate();
}

main().catch(console.error);
