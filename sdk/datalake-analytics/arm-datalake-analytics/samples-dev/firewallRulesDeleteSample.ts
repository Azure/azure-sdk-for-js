// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specified firewall rule from the specified Data Lake Analytics account
 *
 * @summary Deletes the specified firewall rule from the specified Data Lake Analytics account
 * x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/FirewallRules_Delete.json
 */

import { DataLakeAnalyticsAccountManagementClient } from "@azure/arm-datalake-analytics";
import { DefaultAzureCredential } from "@azure/identity";

async function deletesTheSpecifiedFirewallRule(): Promise<void> {
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = "contosorg";
  const accountName = "contosoadla";
  const firewallRuleName = "test_rule";
  const credential = new DefaultAzureCredential();
  const client = new DataLakeAnalyticsAccountManagementClient(credential, subscriptionId);
  const result = await client.firewallRules.delete(
    resourceGroupName,
    accountName,
    firewallRuleName,
  );
  console.log(result);
}

deletesTheSpecifiedFirewallRule().catch(console.error);
