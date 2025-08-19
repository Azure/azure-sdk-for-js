// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ApplicationGroupPatch,
  ApplicationGroupsUpdateOptionalParams,
} from "@azure/arm-desktopvirtualization";
import { DesktopVirtualizationAPIClient } from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update an applicationGroup.
 *
 * @summary Update an applicationGroup.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/stable/2024-04-03/examples/ApplicationGroup_Update.json
 */
async function applicationGroupsUpdate(): Promise<void> {
  const subscriptionId =
    process.env["DESKTOPVIRTUALIZATION_SUBSCRIPTION_ID"] || "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const resourceGroupName = process.env["DESKTOPVIRTUALIZATION_RESOURCE_GROUP"] || "resourceGroup1";
  const applicationGroupName = "applicationGroup1";
  const applicationGroup: ApplicationGroupPatch = {
    description: "des1",
    friendlyName: "friendly",
    showInFeed: true,
    tags: { tag1: "value1", tag2: "value2" },
  };
  const options: ApplicationGroupsUpdateOptionalParams = { applicationGroup };
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const result = await client.applicationGroups.update(
    resourceGroupName,
    applicationGroupName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await applicationGroupsUpdate();
}

main().catch(console.error);
