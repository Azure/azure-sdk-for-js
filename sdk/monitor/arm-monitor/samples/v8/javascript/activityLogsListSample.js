// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provides the list of records from the activity logs.
 *
 * @summary provides the list of records from the activity logs.
 * x-ms-original-file: 2015-04-01/GetActivityLogsFiltered.json
 */
async function getActivityLogsWithFilter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "089bd33f-d4ec-47fe-8ba5-0753aa5c5b33";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.activityLogs.list(
    "eventTimestamp ge '2015-01-21T20:00:00Z' and eventTimestamp le '2015-01-23T20:00:00Z' and resourceGroupName eq 'MSSupportGroup'",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to provides the list of records from the activity logs.
 *
 * @summary provides the list of records from the activity logs.
 * x-ms-original-file: 2015-04-01/GetActivityLogsFilteredAndSelected.json
 */
async function getActivityLogsWithFilterAndSelect() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "089bd33f-d4ec-47fe-8ba5-0753aa5c5b33";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.activityLogs.list(
    "eventTimestamp ge '2015-01-21T20:00:00Z' and eventTimestamp le '2015-01-23T20:00:00Z' and resourceGroupName eq 'MSSupportGroup'",
    {
      select:
        "eventName,id,resourceGroupName,resourceProviderName,operationName,status,eventTimestamp,correlationId,submissionTimestamp,level",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getActivityLogsWithFilter();
  await getActivityLogsWithFilterAndSelect();
}

main().catch(console.error);
