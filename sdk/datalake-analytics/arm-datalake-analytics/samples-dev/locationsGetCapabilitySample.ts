// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataLakeAnalyticsAccountManagementClient } from "@azure/arm-datalake-analytics";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets subscription-level properties and limits for Data Lake Analytics specified by resource location.
 *
 * @summary Gets subscription-level properties and limits for Data Lake Analytics specified by resource location.
 * x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/Locations_GetCapability.json
 */
async function getsSubscriptionLevelPropertiesAndLimitsForDataLakeAnalyticsSpecifiedByResourceLocation(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const location = "EastUS2";
  const credential = new DefaultAzureCredential();
  const client = new DataLakeAnalyticsAccountManagementClient(credential, subscriptionId);
  const result = await client.locations.getCapability(location);
  console.log(result);
}

getsSubscriptionLevelPropertiesAndLimitsForDataLakeAnalyticsSpecifiedByResourceLocation().catch(
  console.error,
);
