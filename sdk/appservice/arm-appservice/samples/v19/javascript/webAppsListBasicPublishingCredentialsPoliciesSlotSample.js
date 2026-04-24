// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Returns whether Scm basic auth is allowed and whether Ftp is allowed for a given site.
 *
 * @summary description for Returns whether Scm basic auth is allowed and whether Ftp is allowed for a given site.
 * x-ms-original-file: 2025-05-01/ListPublishingCredentialsPoliciesSlot.json
 */
async function listPublishingCredentialsPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "3fb8d758-2e2c-42e9-a528-a8acdfe87237";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webApps.listBasicPublishingCredentialsPoliciesSlot(
    "testrg123",
    "testsite",
    "staging",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPublishingCredentialsPolicies();
}

main().catch(console.error);
