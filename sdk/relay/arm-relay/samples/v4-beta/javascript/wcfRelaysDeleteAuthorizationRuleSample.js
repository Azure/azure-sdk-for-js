// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a WCF relay authorization rule.
 *
 * @summary deletes a WCF relay authorization rule.
 * x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleDelete.json
 */
async function relayAuthorizationRuleDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  await client.wcfRelays.deleteAuthorizationRule(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-wcf-01",
    "example-RelayAuthRules-01",
  );
}

async function main() {
  await relayAuthorizationRuleDelete();
}

main().catch(console.error);
