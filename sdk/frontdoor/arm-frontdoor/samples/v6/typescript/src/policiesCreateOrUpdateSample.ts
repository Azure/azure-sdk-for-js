// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update policy with specified rule set name within a resource group.
 *
 * @summary create or update policy with specified rule set name within a resource group.
 * x-ms-original-file: 2025-10-01/WafPolicyCreateOrUpdate.json
 */
async function createsSpecificPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.policies.createOrUpdate("rg1", "Policy1", {
    location: "WestUs",
    customRules: {
      rules: [
        {
          name: "Rule1",
          action: "Block",
          matchConditions: [
            {
              matchValue: ["192.168.1.0/24", "10.0.0.0/24"],
              matchVariable: "RemoteAddr",
              operator: "IPMatch",
            },
          ],
          priority: 1,
          rateLimitThreshold: 1000,
          ruleType: "RateLimitRule",
        },
        {
          name: "Rule2",
          action: "Block",
          matchConditions: [
            { matchValue: ["CH"], matchVariable: "RemoteAddr", operator: "GeoMatch" },
            {
              matchValue: ["windows"],
              matchVariable: "RequestHeader",
              operator: "Contains",
              selector: "UserAgent",
              transforms: ["Lowercase"],
            },
          ],
          priority: 2,
          ruleType: "MatchRule",
        },
        {
          name: "Rule3",
          action: "CAPTCHA",
          matchConditions: [
            {
              matchValue: ["AzureBackup", "AzureBotService"],
              matchVariable: "RemoteAddr",
              operator: "ServiceTagMatch",
            },
          ],
          priority: 1,
          rateLimitThreshold: 1000,
          ruleType: "RateLimitRule",
        },
      ],
    },
    managedRules: {
      managedRuleSets: [
        {
          exclusions: [
            {
              matchVariable: "RequestHeaderNames",
              selector: "User-Agent",
              selectorMatchOperator: "Equals",
            },
          ],
          ruleGroupOverrides: [
            {
              exclusions: [
                {
                  matchVariable: "RequestCookieNames",
                  selector: "token",
                  selectorMatchOperator: "StartsWith",
                },
              ],
              ruleGroupName: "SQLI",
              rules: [
                {
                  action: "Redirect",
                  enabledState: "Enabled",
                  exclusions: [
                    {
                      matchVariable: "QueryStringArgNames",
                      selector: "query",
                      selectorMatchOperator: "Equals",
                    },
                  ],
                  ruleId: "942100",
                },
                { enabledState: "Disabled", ruleId: "942110" },
              ],
            },
          ],
          ruleSetAction: "Block",
          ruleSetType: "DefaultRuleSet",
          ruleSetVersion: "1.0",
        },
        {
          ruleGroupOverrides: [
            {
              ruleGroupName: "ExcessiveRequests",
              rules: [
                { action: "Block", enabledState: "Enabled", ruleId: "500100", sensitivity: "High" },
              ],
            },
          ],
          ruleSetType: "Microsoft_HTTPDDoSRuleSet",
          ruleSetVersion: "1.0",
        },
      ],
    },
    policySettings: {
      captchaExpirationInMinutes: 30,
      customBlockResponseBody:
        "PGh0bWw+CjxoZWFkZXI+PHRpdGxlPkhlbGxvPC90aXRsZT48L2hlYWRlcj4KPGJvZHk+CkhlbGxvIHdvcmxkCjwvYm9keT4KPC9odG1sPg==",
      customBlockResponseStatusCode: 429,
      enabledState: "Enabled",
      javascriptChallengeExpirationInMinutes: 30,
      scrubbingRules: [
        { matchVariable: "RequestIPAddress", selectorMatchOperator: "EqualsAny", state: "Enabled" },
      ],
      state: "Enabled",
      mode: "Prevention",
      redirectUrl: "http://www.bing.com",
      requestBodyCheck: "Disabled",
    },
    sku: { name: "Premium_AzureFrontDoor" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createsSpecificPolicy();
}

main().catch(console.error);
