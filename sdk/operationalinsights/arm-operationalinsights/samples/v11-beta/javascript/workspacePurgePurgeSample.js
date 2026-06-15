// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to purges data in an Log Analytics workspace by a set of user-defined filters.
 *
 * In order to manage system resources, purge requests are throttled at 50 requests per hour. You should batch the execution of purge requests by sending a single command whose predicate includes all user identities that require purging. Use the in operator to specify multiple identities. You should run the query prior to using for a purge request to verify that the results are expected.
 * Log Analytics only supports purge operations required for compliance with GDPR. The Log Analytics product team reserves the right to reject requests for purge operations that are not for the purpose of GDPR compliance. In the event of a dispute, please create a support ticket
 *
 * @summary purges data in an Log Analytics workspace by a set of user-defined filters.
 *
 * In order to manage system resources, purge requests are throttled at 50 requests per hour. You should batch the execution of purge requests by sending a single command whose predicate includes all user identities that require purging. Use the in operator to specify multiple identities. You should run the query prior to using for a purge request to verify that the results are expected.
 * Log Analytics only supports purge operations required for compliance with GDPR. The Log Analytics product team reserves the right to reject requests for purge operations that are not for the purpose of GDPR compliance. In the event of a dispute, please create a support ticket
 * x-ms-original-file: 2025-07-01/WorkspacesPurge.json
 */
async function workspacePurge() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.workspacePurge.purge("OIAutoRest5123", "aztest5048", {
    filters: [{ column: "TimeGenerated", operator: ">", value: "2017-09-01T00:00:00" }],
    table: "Heartbeat",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to purges data in an Log Analytics workspace by a set of user-defined filters.
 *
 * In order to manage system resources, purge requests are throttled at 50 requests per hour. You should batch the execution of purge requests by sending a single command whose predicate includes all user identities that require purging. Use the in operator to specify multiple identities. You should run the query prior to using for a purge request to verify that the results are expected.
 * Log Analytics only supports purge operations required for compliance with GDPR. The Log Analytics product team reserves the right to reject requests for purge operations that are not for the purpose of GDPR compliance. In the event of a dispute, please create a support ticket
 *
 * @summary purges data in an Log Analytics workspace by a set of user-defined filters.
 *
 * In order to manage system resources, purge requests are throttled at 50 requests per hour. You should batch the execution of purge requests by sending a single command whose predicate includes all user identities that require purging. Use the in operator to specify multiple identities. You should run the query prior to using for a purge request to verify that the results are expected.
 * Log Analytics only supports purge operations required for compliance with GDPR. The Log Analytics product team reserves the right to reject requests for purge operations that are not for the purpose of GDPR compliance. In the event of a dispute, please create a support ticket
 * x-ms-original-file: 2025-07-01/WorkspacesPurgeResourceId.json
 */
async function workspacePurgeResourceId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.workspacePurge.purge("OIAutoRest5123", "aztest5048", {
    filters: [
      {
        column: "_ResourceId",
        operator: "==",
        value:
          "/subscriptions/12341234-1234-1234-1234-123412341234/resourceGroups/SomeResourceGroup/providers/microsoft.insights/components/AppInsightResource",
      },
    ],
    table: "Heartbeat",
  });
  console.log(result);
}

async function main() {
  await workspacePurge();
  await workspacePurgeResourceId();
}

main().catch(console.error);
