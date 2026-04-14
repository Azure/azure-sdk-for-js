// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppLinkClient } = require("@azure/arm-appnetwork");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list UpgradeHistory resources by AppLinkMember.
 *
 * @summary list UpgradeHistory resources by AppLinkMember.
 * x-ms-original-file: 2025-08-01-preview/UpgradeHistories_ListByAppLinkMember.json
 */
async function upgradeHistoriesListByAppLinkMember() {
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

async function main() {
  await upgradeHistoriesListByAppLinkMember();
}

main().catch(console.error);
