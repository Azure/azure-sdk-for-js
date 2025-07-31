// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to authorization rules for a WCF relay.
 *
 * @summary authorization rules for a WCF relay.
 * x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleListAll.json
 */
async function relayAuthorizationRuleListAll() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.wcfRelays.listAuthorizationRules(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-Wcf-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await relayAuthorizationRuleListAll();
}

main().catch(console.error);
