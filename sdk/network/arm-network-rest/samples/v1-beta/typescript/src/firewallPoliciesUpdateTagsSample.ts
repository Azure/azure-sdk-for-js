// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  FirewallPoliciesUpdateTagsParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Updates tags of a Azure Firewall Policy resource.
 *
 * @summary Updates tags of a Azure Firewall Policy resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/FirewallPolicyPatch.json
 */
async function updateFirewallPolicyTags() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const firewallPolicyName = "firewallPolicy";
  const options: FirewallPoliciesUpdateTagsParameters = {
    body: { tags: { key1: "value1", key2: "value2" } },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}",
      subscriptionId,
      resourceGroupName,
      firewallPolicyName
    )
    .patch(options);
  console.log(result);
}

updateFirewallPolicyTags().catch(console.error);
