// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to authorization rule for a namespace by name.
 *
 * @summary authorization rule for a namespace by name.
 * x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceAuthorizationRuleGet.json
 */
async function relayNameSpaceAuthorizationRuleGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.namespaces.getAuthorizationRule(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-RelayAuthRules-01",
  );
  console.log(result);
}

async function main() {
  await relayNameSpaceAuthorizationRuleGet();
}

main().catch(console.error);
