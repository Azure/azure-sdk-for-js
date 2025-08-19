// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates Account.
 *
 * @summary Creates or updates Account.
 * x-ms-original-file: specification/deviceupdate/resource-manager/Microsoft.DeviceUpdate/stable/2023-07-01/examples/Accounts/Accounts_Create.json
 */

import type { Account } from "@azure/arm-deviceupdate";
import { DeviceUpdate } from "@azure/arm-deviceupdate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createsOrUpdatesAccount(): Promise<void> {
  const subscriptionId =
    process.env["DEVICEUPDATE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DEVICEUPDATE_RESOURCE_GROUP"] || "test-rg";
  const accountName = "contoso";
  const account: Account = {
    encryption: {
      keyVaultKeyUri: "https://contoso.vault.azure.net/keys/contoso",
      userAssignedIdentity:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1",
    },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000000000000000000000000000/resourceGroups/testRg/providers/MicrosoftManagedIdentity/userAssignedIdentities/id1":
          {},
      },
    },
    location: "westus2",
  };
  const credential = new DefaultAzureCredential();
  const client = new DeviceUpdate(credential, subscriptionId);
  const result = await client.accounts.beginCreateAndWait(resourceGroupName, accountName, account);
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesAccount();
}

main().catch(console.error);
