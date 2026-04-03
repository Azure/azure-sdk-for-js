// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppLinkClient } from "@azure/arm-appnetwork";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an AppLinkMember.
 *
 * @summary update an AppLinkMember.
 * x-ms-original-file: 2025-08-01-preview/AppLinkMembers_Update.json
 */
async function appLinkMembersUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new AppLinkClient(credential, subscriptionId);
  const result = await client.appLinkMembers.update("test_rg", "applink-test-01", "member-01", {
    tags: { key7952: "updated_tag_value" },
    properties: {
      upgradeProfile: { mode: "SelfManaged", selfManagedUpgradeProfile: { version: "1.26" } },
      connectivityProfile: { eastWestGateway: { visibility: "Internal" } },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await appLinkMembersUpdate();
}

main().catch(console.error);
