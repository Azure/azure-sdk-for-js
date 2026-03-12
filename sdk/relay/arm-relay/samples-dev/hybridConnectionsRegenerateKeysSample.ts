// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Regenerates the primary or secondary connection strings to the hybrid connection.
 *
 * @summary Regenerates the primary or secondary connection strings to the hybrid connection.
 * x-ms-original-file: specification/relay/resource-manager/Microsoft.Relay/stable/2017-04-01/examples/HybridConnection/RelayHybridConnectionAuthorizationRuleRegenrateKey.json
 */

import type { RegenerateAccessKeyParameters } from "@azure/arm-relay";
import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function relayHybridConnectionAuthorizationRuleRegenrateKey(): Promise<void> {
  const subscriptionId =
    process.env["RELAY_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["RELAY_RESOURCE_GROUP"] || "resourcegroup";
  const namespaceName = "example-RelayNamespace-01";
  const hybridConnectionName = "example-Relay-Hybrid-01";
  const authorizationRuleName = "example-RelayAuthRules-01";
  const parameters: RegenerateAccessKeyParameters = { keyType: "PrimaryKey" };
  const credential = new DefaultAzureCredential();
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.hybridConnections.regenerateKeys(
    resourceGroupName,
    namespaceName,
    hybridConnectionName,
    authorizationRuleName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await relayHybridConnectionAuthorizationRuleRegenrateKey();
}

main().catch(console.error);
