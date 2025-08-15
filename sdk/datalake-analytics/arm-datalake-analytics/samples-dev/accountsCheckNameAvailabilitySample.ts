// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CheckNameAvailabilityParameters } from "@azure/arm-datalake-analytics";
import { DataLakeAnalyticsAccountManagementClient } from "@azure/arm-datalake-analytics";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Checks whether the specified account name is available or taken.
 *
 * @summary Checks whether the specified account name is available or taken.
 * x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/Accounts_CheckNameAvailability.json
 */
async function checksWhetherTheSpecifiedAccountNameIsAvailableOrTaken(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const location = "EastUS2";
  const parameters: CheckNameAvailabilityParameters = {
    name: "contosoadla",
    type: "Microsoft.DataLakeAnalytics/accounts",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataLakeAnalyticsAccountManagementClient(credential, subscriptionId);
  const result = await client.accounts.checkNameAvailability(location, parameters);
  console.log(result);
}

checksWhetherTheSpecifiedAccountNameIsAvailableOrTaken().catch(console.error);
