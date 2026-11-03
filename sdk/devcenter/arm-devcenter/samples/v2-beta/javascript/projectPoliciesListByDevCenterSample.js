// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all project policies in the dev center.
 *
 * @summary lists all project policies in the dev center.
 * x-ms-original-file: 2026-01-01-preview/ProjectPolicies_ListByDevCenter.json
 */
async function projectPoliciesListByDevCenter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58ffff1";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projectPolicies.listByDevCenter("rg1", "Contoso")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await projectPoliciesListByDevCenter();
}

main().catch(console.error);
