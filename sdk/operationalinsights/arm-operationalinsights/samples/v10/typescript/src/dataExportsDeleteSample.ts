// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified data export in a given workspace..
 *
 * @summary Deletes the specified data export in a given workspace..
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/DataExportDelete.json
 */
async function dataExportDelete(): Promise<void> {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-00000000000";
  const resourceGroupName =
    process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "RgTest1";
  const workspaceName = "DeWnTest1234";
  const dataExportName = "export1";
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.dataExports.delete(
    resourceGroupName,
    workspaceName,
    dataExportName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dataExportDelete();
}

main().catch(console.error);
