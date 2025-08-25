// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Purges data in an Application Insights component by a set of user-defined filters.

In order to manage system resources, purge requests are throttled at 50 requests per hour. You should batch the execution of purge requests by sending a single command whose predicate includes all user identities that require purging. Use the in operator to specify multiple identities. You should run the query prior to using for a purge request to verify that the results are expected.
Note: this operation is intended for Classic resources, for  workspace-based Application Insights resource please run purge operation (directly on the workspace)(  https://learn.microsoft.com/rest/api/loganalytics/workspace-purge/purge) , scoped to specific resource id.
 *
 * @summary Purges data in an Application Insights component by a set of user-defined filters.

In order to manage system resources, purge requests are throttled at 50 requests per hour. You should batch the execution of purge requests by sending a single command whose predicate includes all user identities that require purging. Use the in operator to specify multiple identities. You should run the query prior to using for a purge request to verify that the results are expected.
Note: this operation is intended for Classic resources, for  workspace-based Application Insights resource please run purge operation (directly on the workspace)(  https://learn.microsoft.com/rest/api/loganalytics/workspace-purge/purge) , scoped to specific resource id.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2020-02-02/examples/ComponentsPurge.json
 */

import {
  ComponentPurgeBody,
  ApplicationInsightsManagementClient,
} from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function componentPurge(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-00000000000";
  const resourceGroupName =
    process.env["APPLICATIONINSIGHTS_RESOURCE_GROUP"] || "OIAutoRest5123";
  const resourceName = "aztest5048";
  const body: ComponentPurgeBody = {
    filters: [
      { column: "TimeGenerated", operator: ">", value: "2017-09-01T00:00:00" },
    ],
    table: "Heartbeat",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.components.purge(
    resourceGroupName,
    resourceName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await componentPurge();
}

main().catch(console.error);
