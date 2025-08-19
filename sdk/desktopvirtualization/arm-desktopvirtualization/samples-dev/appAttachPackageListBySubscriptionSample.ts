// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List App Attach packages in subscription.
 *
 * @summary List App Attach packages in subscription.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/AppAttachPackage_ListBySubscription.json
 */

import type { AppAttachPackageListBySubscriptionOptionalParams } from "@azure/arm-desktopvirtualization";
import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function appAttachPackageListBySubscription(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const filter = "HostPoolName eq 'hostpool1'";
  const options: AppAttachPackageListBySubscriptionOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appAttachPackageOperations.listBySubscription(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await appAttachPackageListBySubscription();
}

main().catch(console.error);
