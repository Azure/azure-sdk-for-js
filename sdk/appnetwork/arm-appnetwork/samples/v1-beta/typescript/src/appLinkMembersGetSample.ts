// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppLinkClient } from "@azure/arm-appnetwork";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an AppLinkMember.
 *
 * @summary get an AppLinkMember.
 * x-ms-original-file: 2025-08-01-preview/AppLinkMembers_Get.json
 */
async function appLinkMembersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new AppLinkClient(credential, subscriptionId);
  const result = await client.appLinkMembers.get("test_rg", "applink-test-01", "member-01");
  console.log(result);
}

async function main(): Promise<void> {
  await appLinkMembersGet();
}

main().catch(console.error);
