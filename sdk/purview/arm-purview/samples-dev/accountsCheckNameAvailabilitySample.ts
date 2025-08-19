// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks if account name is available.
 *
 * @summary Checks if account name is available.
 * x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_CheckNameAvailability.json
 */

import type { CheckNameAvailabilityRequest } from "@azure/arm-purview";
import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

async function accountsCheckNameAvailability(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const checkNameAvailabilityRequest: CheckNameAvailabilityRequest = {
    name: "account1",
    type: "Microsoft.Purview/accounts",
  };
  const credential = new DefaultAzureCredential();
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.accounts.checkNameAvailability(checkNameAvailabilityRequest);
  console.log(result);
}

accountsCheckNameAvailability().catch(console.error);
