// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the resource overview status.
 *
 * @summary Get the resource overview status.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_GetOverviewStatus.json
 */

import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reportGetOverviewStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.providerActions.getOverviewStatus({
    type: "Microsoft.AppComplianceAutomation/reports",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await reportGetOverviewStatus();
}

main().catch(console.error);
