// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppLinkClient } = require("@azure/arm-appnetwork");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to remove a member from an Azure Kubernetes Application Network resource.
 *
 * @summary remove a member from an Azure Kubernetes Application Network resource.
 * x-ms-original-file: 2026-08-01-preview/AppLinkMembers_Delete.json
 */
async function appLinkMembersDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new AppLinkClient(credential, subscriptionId);
  await client.appLinkMembers.delete("test_rg", "applink-test-01", "member-01");
}

async function main() {
  await appLinkMembersDelete();
}

main().catch(console.error);
