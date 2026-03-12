// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a desktop.
 *
 * @summary Update a desktop.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/Desktop_Update.json
 */

import type { DesktopPatch, DesktopsUpdateOptionalParams } from "@azure/arm-desktopvirtualization";
import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function desktopUpdate(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const applicationGroupName = "applicationGroup1";
  const desktopName = "SessionDesktop";
  const desktop: DesktopPatch = {
    description: "des1",
    friendlyName: "friendly",
  };
  const options: DesktopsUpdateOptionalParams = { desktop };
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const result = await client.desktops.update(
    resourceGroupName,
    applicationGroupName,
    desktopName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await desktopUpdate();
}

main().catch(console.error);
