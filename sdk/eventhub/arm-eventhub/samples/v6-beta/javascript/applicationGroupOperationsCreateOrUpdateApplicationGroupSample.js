// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an ApplicationGroup for a Namespace.
 *
 * @summary creates or updates an ApplicationGroup for a Namespace.
 * x-ms-original-file: 2026-01-01/ApplicationGroup/ApplicationGroupCreate.json
 */
async function applicationGroupCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.applicationGroupOperations.createOrUpdateApplicationGroup(
    "contosotest",
    "contoso-ua-test-eh-system-1",
    "appGroup1",
    {
      clientAppGroupIdentifier: "SASKeyName=KeyName",
      isEnabled: true,
      policies: [
        {
          name: "ThrottlingPolicy1",
          type: "ThrottlingPolicy",
          metricId: "IncomingMessages",
          rateLimitThreshold: 7912,
        },
        {
          name: "ThrottlingPolicy2",
          type: "ThrottlingPolicy",
          metricId: "IncomingBytes",
          rateLimitThreshold: 3951729,
        },
        {
          name: "ThrottlingPolicy3",
          type: "ThrottlingPolicy",
          metricId: "OutgoingBytes",
          rateLimitThreshold: 245175,
        },
      ],
    },
  );
  console.log(result);
}

async function main() {
  await applicationGroupCreate();
}

main().catch(console.error);
