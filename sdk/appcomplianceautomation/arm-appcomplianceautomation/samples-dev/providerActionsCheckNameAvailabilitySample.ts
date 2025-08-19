// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Check if the given name is available for a report.
 *
 * @summary Check if the given name is available for a report.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_CheckNameAvailability.json
 */

import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reportCheckNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.providerActions.checkNameAvailability({
    name: "reportABC",
    type: "Microsoft.AppComplianceAutomation/reports",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await reportCheckNameAvailability();
}

main().catch(console.error);
