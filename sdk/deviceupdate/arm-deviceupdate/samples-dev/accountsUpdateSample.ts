// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates account's patchable properties
 *
 * @summary Updates account's patchable properties
 * x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/stable/2023-07-01/examples/Accounts/Accounts_Update.json
 */

import type { AccountUpdate } from "@azure/arm-deviceupdate";
import { DeviceUpdate } from "@azure/arm-deviceupdate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updatesAccount(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEUPDATE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DEVICEUPDATE_RESOURCE_GROUP"] || "test-rg";
  const accountName = "contoso";
  const accountUpdatePayload: AccountUpdate = { tags: { tagKey: "tagValue" } };
  const credential = new DefaultAzureCredential();
  const client = new DeviceUpdate(credential, subscriptionId);
  const result = await client.accounts.beginUpdateAndWait(
    resourceGroupName,
    accountName,
    accountUpdatePayload,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updatesAccount();
}

main().catch(console.error);
