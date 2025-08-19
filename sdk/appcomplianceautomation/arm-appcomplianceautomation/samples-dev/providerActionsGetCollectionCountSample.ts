// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the count of reports.
 *
 * @summary Get the count of reports.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_GetCollectionCount.json
 */

import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reportGetCollectionCount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.providerActions.getCollectionCount({
    type: "Microsoft.AppComplianceAutomation/reports",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await reportGetCollectionCount();
}

main().catch(console.error);
