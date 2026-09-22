// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppLinkClient } from "@azure/arm-appnetwork";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AppLinkMember resources by AppLink.
 *
 * @summary list AppLinkMember resources by AppLink.
 * x-ms-original-file: 2025-08-01-preview/AppLinkMembers_ListByAppLink.json
 */
async function appLinkMembersListByAppLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new AppLinkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appLinkMembers.listByAppLink("test_rg", "applink-test-01")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await appLinkMembersListByAppLink();
}

main().catch(console.error);
