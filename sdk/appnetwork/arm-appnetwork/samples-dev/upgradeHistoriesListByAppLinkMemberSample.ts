// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppLinkClient } from "@azure/arm-appnetwork";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the upgrade history of an Azure Kubernetes Application Network member.
 *
 * @summary list the upgrade history of an Azure Kubernetes Application Network member.
 * x-ms-original-file: 2026-08-01-preview/UpgradeHistories_ListByAppLinkMember.json
 */
async function upgradeHistoriesListByAppLinkMember(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new AppLinkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.upgradeHistories.listByAppLinkMember(
    "test_rg",
    "applink-test-01",
    "member-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await upgradeHistoriesListByAppLinkMember();
}

main().catch(console.error);
