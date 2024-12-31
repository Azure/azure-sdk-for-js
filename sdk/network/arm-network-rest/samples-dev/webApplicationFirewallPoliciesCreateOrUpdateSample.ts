// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  WebApplicationFirewallPoliciesCreateOrUpdateParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or update policy with specified rule set name within a resource group.
 *
 * @summary Creates or update policy with specified rule set name within a resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/WafPolicyCreateOrUpdate.json
 */
async function createsOrUpdatesAWafPolicyWithinAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const policyName = "Policy1";
  const options: WebApplicationFirewallPoliciesCreateOrUpdateParameters = {
    body: {
      location: "WestUs",
      properties: {
        customRules: [
          {
            name: "Rule1",
            action: "Block",
            matchConditions: [
              {
                matchValues: ["192.168.1.0/24", "10.0.0.0/24"],
                matchVariables: [{ selector: undefined, variableName: "RemoteAddr" }],
                operator: "IPMatch",
              },
            ],
            priority: 1,
            ruleType: "MatchRule",
          },
          {
            name: "Rule2",
            action: "Block",
            matchConditions: [
              {
                matchValues: ["192.168.1.0/24"],
                matchVariables: [{ selector: undefined, variableName: "RemoteAddr" }],
                operator: "IPMatch",
              },
              {
                matchValues: ["Windows"],
                matchVariables: [{ selector: "UserAgent", variableName: "RequestHeaders" }],
                operator: "Contains",
              },
            ],
            priority: 2,
            ruleType: "MatchRule",
          },
        ],
        managedRules: {
          exclusions: [
            {
              exclusionManagedRuleSets: [
                {
                  ruleGroups: [
                    {
                      ruleGroupName: "REQUEST-930-APPLICATION-ATTACK-LFI",
                      rules: [{ ruleId: "930120" }],
                    },
                    { ruleGroupName: "REQUEST-932-APPLICATION-ATTACK-RCE" },
                  ],
                  ruleSetType: "OWASP",
                  ruleSetVersion: "3.2",
                },
              ],
              matchVariable: "RequestArgNames",
              selector: "hello",
              selectorMatchOperator: "StartsWith",
            },
            {
              exclusionManagedRuleSets: [
                { ruleGroups: [], ruleSetType: "OWASP", ruleSetVersion: "3.1" },
              ],
              matchVariable: "RequestArgNames",
              selector: "hello",
              selectorMatchOperator: "EndsWith",
            },
            {
              matchVariable: "RequestArgNames",
              selector: "test",
              selectorMatchOperator: "StartsWith",
            },
            {
              matchVariable: "RequestArgValues",
              selector: "test",
              selectorMatchOperator: "StartsWith",
            },
          ],
          managedRuleSets: [
            {
              ruleGroupOverrides: [
                {
                  ruleGroupName: "REQUEST-931-APPLICATION-ATTACK-RFI",
                  rules: [
                    { action: "Log", ruleId: "931120", state: "Enabled" },
                    {
                      action: "AnomalyScoring",
                      ruleId: "931130",
                      state: "Disabled",
                    },
                  ],
                },
              ],
              ruleSetType: "OWASP",
              ruleSetVersion: "3.2",
            },
          ],
        },
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ApplicationGatewayWebApplicationFirewallPolicies/{policyName}",
      subscriptionId,
      resourceGroupName,
      policyName,
    )
    .put(options);
  console.log(result);
}

createsOrUpdatesAWafPolicyWithinAResourceGroup().catch(console.error);
