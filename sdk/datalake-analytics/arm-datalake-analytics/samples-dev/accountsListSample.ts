// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccountsListOptionalParams } from "@azure/arm-datalake-analytics";
import { DataLakeAnalyticsAccountManagementClient } from "@azure/arm-datalake-analytics";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets the first page of Data Lake Analytics accounts, if any, within the current subscription. This includes a link to the next page, if any.
 *
 * @summary Gets the first page of Data Lake Analytics accounts, if any, within the current subscription. This includes a link to the next page, if any.
 * x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/Accounts_List.json
 */
async function getsTheFirstPageOfDataLakeAnalyticsAccountsIfAnyWithinTheCurrentSubscriptionThisIncludesALinkToTheNextPageIfAny(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const filter = "test_filter";
  const top = 1;
  const skip = 1;
  const select = "test_select";
  const orderby = "test_orderby";
  const count = false;
  const options: AccountsListOptionalParams = {
    filter,
    top,
    skip,
    select,
    orderby,
    count,
  };
  const credential = new DefaultAzureCredential();
  const client = new DataLakeAnalyticsAccountManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accounts.list(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

getsTheFirstPageOfDataLakeAnalyticsAccountsIfAnyWithinTheCurrentSubscriptionThisIncludesALinkToTheNextPageIfAny().catch(
  console.error,
);
