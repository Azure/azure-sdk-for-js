// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets an AuthorizationRule for a Namespace by rule name.
 *
 * @summary Gets an AuthorizationRule for a Namespace by rule name.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/stable/2017-04-01/examples/disasterRecoveryConfigs/EHAliasAuthorizationRuleGet.json
 */
async function nameSpaceAuthorizationRuleGet(): Promise<void> {
  const subscriptionId = process.env["EVENTHUB_SUBSCRIPTION_ID"] || "exampleSubscriptionId";
  const resourceGroupName = process.env["EVENTHUB_RESOURCE_GROUP"] || "exampleResourceGroup";
  const namespaceName = "sdk-Namespace-9080";
  const alias = "sdk-DisasterRecovery-4879";
  const authorizationRuleName = "sdk-Authrules-4879";
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.disasterRecoveryConfigs.getAuthorizationRule(
    resourceGroupName,
    namespaceName,
    alias,
    authorizationRuleName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceAuthorizationRuleGet();
}

main().catch(console.error);
