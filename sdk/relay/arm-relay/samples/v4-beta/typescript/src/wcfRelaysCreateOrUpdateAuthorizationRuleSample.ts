// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an authorization rule for a WCF relay.
 *
 * @summary creates or updates an authorization rule for a WCF relay.
 * x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleCreate.json
 */
async function relayAuthorizationRuleCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.wcfRelays.createOrUpdateAuthorizationRule(
    "resourcegroup",
    "example-RelayNamespace-01",
    "example-Relay-wcf-01",
    "example-RelayAuthRules-01",
    { properties: { rights: ["Listen", "Send"] } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await relayAuthorizationRuleCreate();
}

main().catch(console.error);
