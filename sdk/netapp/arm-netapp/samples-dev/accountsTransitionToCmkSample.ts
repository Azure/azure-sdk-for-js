// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Transitions all volumes in a VNet to a different encryption key source (Microsoft-managed key or Azure Key Vault). Operation fails if targeted volumes share encryption sibling set with volumes from another account.
 *
 * @summary Transitions all volumes in a VNet to a different encryption key source (Microsoft-managed key or Azure Key Vault). Operation fails if targeted volumes share encryption sibling set with volumes from another account.
 * x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2025-06-01/examples/Accounts_TransitionEncryptionKey.json
 */

import {
  EncryptionTransitionRequest,
  AccountsTransitionToCmkOptionalParams,
  NetAppManagementClient,
} from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function accountsMigrateEncryptionKey(): Promise<void> {
  const subscriptionId =
    process.env["NETAPP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETAPP_RESOURCE_GROUP"] || "myRG";
  const accountName = "account1";
  const body: EncryptionTransitionRequest = {
    privateEndpointId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Network/privateEndpoints/privip1",
    virtualNetworkId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Network/virtualNetworks/vnet1",
  };
  const options: AccountsTransitionToCmkOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.accounts.beginTransitionToCmkAndWait(
    resourceGroupName,
    accountName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await accountsMigrateEncryptionKey();
}

main().catch(console.error);
