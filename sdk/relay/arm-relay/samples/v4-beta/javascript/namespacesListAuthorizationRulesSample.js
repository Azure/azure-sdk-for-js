// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to authorization rules for a namespace.
 *
 * @summary authorization rules for a namespace.
 * x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceAuthorizationRuleListAll.json
 */
async function relayNameSpaceAuthorizationRuleListAll() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaces.listAuthorizationRules(
    "resourcegroup",
    "example-RelayNamespace-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await relayNameSpaceAuthorizationRuleListAll();
}

main().catch(console.error);
