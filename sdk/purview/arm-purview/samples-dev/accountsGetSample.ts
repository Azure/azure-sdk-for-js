// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get an account
 *
 * @summary Get an account
 * x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_Get.json
 */

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

async function accountsGet(): Promise<void> {
  const subscriptionId = "12345678-1234-1234-12345678abc";
  const resourceGroupName = "SampleResourceGroup";
  const accountName = "account1";
  const credential = new DefaultAzureCredential();
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.accounts.get(resourceGroupName, accountName);
  console.log(result);
}

accountsGet().catch(console.error);
