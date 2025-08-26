// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Onboard given subscriptions to Microsoft.AppComplianceAutomation provider.
 *
 * @summary Onboard given subscriptions to Microsoft.AppComplianceAutomation provider.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Onboard.json
 */

import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function onboard(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.providerActions.beginOnboardAndWait({
    subscriptionIds: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001",
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await onboard();
}

main().catch(console.error);
