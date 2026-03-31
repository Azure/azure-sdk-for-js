// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or update policy with specified rule set name within a resource group.
 *
 * @summary creates or update policy with specified rule set name within a resource group.
 * x-ms-original-file: 2025-05-01/WafPolicyCreateOrUpdate.json
 */
async function createsOrUpdatesAWAFPolicyWithinAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.webApplicationFirewallPolicies.createOrUpdate("rg1", "Policy1", {
    location: "WestUs",
    customRules: [
      {
        name: "Rule1",
        action: "Block",
        matchConditions: [
          {
            matchValues: ["192.168.1.0/24", "10.0.0.0/24"],
            matchVariables: [{ variableName: "RemoteAddr" }],
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
            matchVariables: [{ variableName: "RemoteAddr" }],
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
      {
        name: "RateLimitRule3",
        action: "Block",
        groupByUserSession: [{ groupByVariables: [{ variableName: "ClientAddr" }] }],
        matchConditions: [
          {
            matchValues: ["192.168.1.0/24", "10.0.0.0/24"],
            matchVariables: [{ variableName: "RemoteAddr" }],
            negationConditon: true,
            operator: "IPMatch",
          },
        ],
        priority: 3,
        rateLimitDuration: "OneMin",
        rateLimitThreshold: 10,
        ruleType: "RateLimitRule",
      },
      {
        name: "Rule4",
        action: "JSChallenge",
        matchConditions: [
          {
            matchValues: ["192.168.1.0/24"],
            matchVariables: [{ variableName: "RemoteAddr" }],
            operator: "IPMatch",
          },
          {
            matchValues: ["Bot"],
            matchVariables: [{ selector: "UserAgent", variableName: "RequestHeaders" }],
            operator: "Contains",
          },
        ],
        priority: 4,
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
        { matchVariable: "RequestArgNames", selector: "test", selectorMatchOperator: "StartsWith" },
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
                { action: "AnomalyScoring", ruleId: "931130", state: "Disabled" },
              ],
            },
          ],
          ruleSetType: "OWASP",
          ruleSetVersion: "3.2",
        },
        {
          ruleGroupOverrides: [
            {
              ruleGroupName: "UnknownBots",
              rules: [{ action: "JSChallenge", ruleId: "300700", state: "Enabled" }],
            },
          ],
          ruleSetType: "Microsoft_BotManagerRuleSet",
          ruleSetVersion: "1.0",
        },
        {
          ruleGroupOverrides: [
            {
              ruleGroupName: "ExcessiveRequests",
              rules: [{ action: "Block", ruleId: "500100", sensitivity: "High", state: "Enabled" }],
            },
          ],
          ruleSetType: "Microsoft_HTTPDDoSRuleSet",
          ruleSetVersion: "1.0",
        },
      ],
      exceptions: [
        {
          exceptionManagedRuleSets: [{ ruleSetType: "OWASP", ruleSetVersion: "3.2" }],
          matchVariable: "RequestURI",
          valueMatchOperator: "Contains",
          values: ["health", "account/images", "default.aspx"],
        },
        {
          exceptionManagedRuleSets: [
            {
              ruleGroups: [{ ruleGroupName: "REQUEST-932-APPLICATION-ATTACK-RCE" }],
              ruleSetType: "OWASP",
              ruleSetVersion: "3.2",
            },
          ],
          matchVariable: "RequestHeader",
          selector: "User-Agent",
          selectorMatchOperator: "StartsWith",
          valueMatchOperator: "Contains",
          values: ["Mozilla/5.0", "Chrome/122.0.0.0"],
        },
        {
          exceptionManagedRuleSets: [
            {
              ruleGroups: [{ ruleGroupName: "BadBots", rules: [{ ruleId: "100100" }] }],
              ruleSetType: "Microsoft_BotManagerRuleSet",
              ruleSetVersion: "1.0",
            },
          ],
          matchVariable: "RemoteAddr",
          valueMatchOperator: "IPMatch",
          values: ["1.2.3.4", "10.0.0.1/6"],
        },
      ],
    },
    policySettings: {
      jsChallengeCookieExpirationInMins: 100,
      logScrubbing: {
        scrubbingRules: [
          {
            matchVariable: "RequestArgNames",
            selector: "test",
            selectorMatchOperator: "Equals",
            state: "Enabled",
          },
          {
            matchVariable: "RequestIPAddress",
            selectorMatchOperator: "EqualsAny",
            state: "Enabled",
          },
        ],
        state: "Enabled",
      },
    },
  });
  console.log(result);
}

async function main() {
  await createsOrUpdatesAWAFPolicyWithinAResourceGroup();
}

main().catch(console.error);
