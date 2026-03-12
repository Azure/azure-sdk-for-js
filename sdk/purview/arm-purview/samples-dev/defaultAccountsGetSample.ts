// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the default account for the scope.
 *
 * @summary Get the default account for the scope.
 * x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/DefaultAccounts_Get.json
 */

import type { DefaultAccountsGetOptionalParams } from "@azure/arm-purview";
import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

async function defaultAccountsGet(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const scopeTenantId = "11733A4E-BA84-46FF-91D1-AFF1A3215A90";
  const scopeType = "Tenant";
  const scope = "11733A4E-BA84-46FF-91D1-AFF1A3215A90";
  const options: DefaultAccountsGetOptionalParams = { scope };
  const credential = new DefaultAzureCredential();
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.defaultAccounts.get(scopeTenantId, scopeType, options);
  console.log(result);
}

defaultAccountsGet().catch(console.error);
