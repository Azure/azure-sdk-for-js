// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists report records by Time.
 *
 * @summary lists report records by Time.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetReportsByTime.json
 */
async function apiManagementGetReportsByTime() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.reports.listByTime(
    "rg1",
    "apimService1",
    "timestamp ge datetime'2017-06-01T00:00:00' and timestamp le datetime'2017-06-04T00:00:00'",
    "PT15M",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementGetReportsByTime();
}

main().catch(console.error);
