// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to purges data in an Application Insights component by a set of user-defined filters.
 *
 * In order to manage system resources, purge requests are throttled at 50 requests per hour. You should batch the execution of purge requests by sending a single command whose predicate includes all user identities that require purging. Use the in operator to specify multiple identities. You should run the query prior to using for a purge request to verify that the results are expected.
 * Note: this operation is intended for Classic resources, for  workspace-based Application Insights resource please run purge operation (directly on the workspace)(https://docs.microsoft.com/en-us/rest/api/loganalytics/workspace-purge/purge) , scoped to specific resource id.
 *
 * @summary purges data in an Application Insights component by a set of user-defined filters.
 *
 * In order to manage system resources, purge requests are throttled at 50 requests per hour. You should batch the execution of purge requests by sending a single command whose predicate includes all user identities that require purging. Use the in operator to specify multiple identities. You should run the query prior to using for a purge request to verify that the results are expected.
 * Note: this operation is intended for Classic resources, for  workspace-based Application Insights resource please run purge operation (directly on the workspace)(https://docs.microsoft.com/en-us/rest/api/loganalytics/workspace-purge/purge) , scoped to specific resource id.
 * x-ms-original-file: 2020-02-02/ComponentsPurge.json
 */
async function componentPurge() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.components.purge("OIAutoRest5123", "aztest5048", {
    filters: [{ column: "TimeGenerated", operator: ">", value: "2017-09-01T00:00:00" }],
    table: "Heartbeat",
  });
  console.log(result);
}

async function main() {
  await componentPurge();
}

main().catch(console.error);
