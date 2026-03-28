// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists report records by geography.
 *
 * @summary lists report records by geography.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetReportsByGeo.json
 */
async function apiManagementGetReportsByGeo(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.reports.listByGeo(
    "rg1",
    "apimService1",
    "timestamp ge datetime'2017-06-01T00:00:00' and timestamp le datetime'2017-06-04T00:00:00'",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementGetReportsByGeo();
}

main().catch(console.error);
