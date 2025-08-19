// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Regenerates the secondary policy key of the specified authorization policy.
 *
 * @summary Regenerates the secondary policy key of the specified authorization policy.
 * x-ms-original-file: specification/customer-insights/resource-manager/Microsoft.CustomerInsights/stable/2017-04-26/examples/AuthorizationPoliciesRegenerateSecondaryKey.json
 */

import { CustomerInsightsManagementClient } from "@azure/arm-customerinsights";
import { DefaultAzureCredential } from "@azure/identity";

async function authorizationPoliciesRegenerateSecondaryKey(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "TestHubRG";
  const hubName = "azSdkTestHub";
  const authorizationPolicyName = "testPolicy4222";
  const credential = new DefaultAzureCredential();
  const client = new CustomerInsightsManagementClient(credential, subscriptionId);
  const result = await client.authorizationPolicies.regenerateSecondaryKey(
    resourceGroupName,
    hubName,
    authorizationPolicyName,
  );
  console.log(result);
}

authorizationPoliciesRegenerateSecondaryKey().catch(console.error);
