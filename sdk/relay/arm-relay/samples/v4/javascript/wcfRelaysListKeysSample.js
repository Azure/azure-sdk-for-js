// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to primary and secondary connection strings to the WCF relay.
 *
 * @summary primary and secondary connection strings to the WCF relay.
 * x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleListKey.json
 */
async function relayAuthorizationRuleListKeyJson() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.wcfRelays.listKeys(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-wcf-01",
    "example-RelayAuthRules-01",
  );
  console.log(result);
}

async function main() {
  await relayAuthorizationRuleListKeyJson();
}

main().catch(console.error);
