// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List the authorization keys associated with this account.
 *
 * @summary List the authorization keys associated with this account.
 * x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_ListKeys.json
 */

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

async function accountsListKeys(): Promise<void> {
  const subscriptionId = "12345678-1234-1234-12345678abc";
  const resourceGroupName = "SampleResourceGroup";
  const accountName = "account1";
  const credential = new DefaultAzureCredential();
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.accounts.listKeys(resourceGroupName, accountName);
  console.log(result);
}

accountsListKeys().catch(console.error);
