// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to GeoDR Failover
 *
 * @summary GeoDR Failover
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/preview/2024-05-01-preview/examples/NameSpaces/EHNamespaceFailover.json
 */

import { FailOver, EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function nameSpaceCreate(): Promise<void> {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "SampleSubscription";
  const resourceGroupName =
    process.env["EVENTHUB_RESOURCE_GROUP"] || "ResurceGroupSample";
  const namespaceName = "NamespaceGeoDRFailoverSample";
  const parameters: FailOver = { force: true, primaryLocation: "centralus" };
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.beginFailoverAndWait(
    resourceGroupName,
    namespaceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceCreate();
}

main().catch(console.error);
