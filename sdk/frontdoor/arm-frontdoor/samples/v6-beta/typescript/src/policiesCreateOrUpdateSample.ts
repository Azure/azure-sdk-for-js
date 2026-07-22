// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update policy with specified rule set name within a resource group.
 *
 * @summary create or update policy with specified rule set name within a resource group.
 * x-ms-original-file: 2025-11-01/WafPolicyCreateOrUpdate.json
 */
async function createsSpecificPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.policies.createOrUpdate("rg1", "Policy1", {
    location: "WestUs",
    policySettings: {
      enabledState: "Enabled",
      mode: "Prevention",
      redirectUrl: "http://www.bing.com",
      customBlockResponseStatusCode: 429,
      customBlockResponseBody:
        "PGh0bWw+CjxoZWFkZXI+PHRpdGxlPkhlbGxvPC90aXRsZT48L2hlYWRlcj4KPGJvZHk+CkhlbGxvIHdvcmxkCjwvYm9keT4KPC9odG1sPg==",
      requestBodyCheck: "Disabled",
      javascriptChallengeExpirationInMinutes: 30,
      captchaExpirationInMinutes: 30,
      state: "Enabled",
      scrubbingRules: [
        { matchVariable: "RequestIPAddress", selectorMatchOperator: "EqualsAny", state: "Enabled" },
      ],
    },
    customRules: {
      rules: [
        {
          name: "Rule1",
          priority: 1,
          ruleType: "RateLimitRule",
          rateLimitThreshold: 1000,
          matchConditions: [
            {
              matchVariable: "RemoteAddr",
              operator: "IPMatch",
              matchValue: ["192.168.1.0/24", "10.0.0.0/24"],
            },
          ],
          action: "Block",
        },
        {
          name: "Rule2",
          priority: 2,
          ruleType: "MatchRule",
          matchConditions: [
            { matchVariable: "RemoteAddr", operator: "GeoMatch", matchValue: ["CH"] },
            {
              matchVariable: "RequestHeader",
              operator: "Contains",
              selector: "UserAgent",
              matchValue: ["windows"],
              transforms: ["Lowercase"],
            },
          ],
          action: "Block",
        },
        {
          name: "Rule3",
          priority: 1,
          ruleType: "RateLimitRule",
          rateLimitThreshold: 1000,
          matchConditions: [
            {
              matchVariable: "RemoteAddr",
              operator: "ServiceTagMatch",
              matchValue: ["AzureBackup", "AzureBotService"],
            },
          ],
          action: "CAPTCHA",
        },
      ],
    },
    managedRules: {
      managedRuleSets: [
        {
          ruleSetType: "Microsoft_DefaultRuleSet",
          ruleSetVersion: "2.2",
          ruleSetAction: "Block",
          exclusions: [
            {
              matchVariable: "RequestHeaderNames",
              selectorMatchOperator: "Equals",
              selector: "User-Agent",
            },
          ],
          ruleGroupOverrides: [
            {
              ruleGroupName: "SQLI",
              exclusions: [
                {
                  matchVariable: "RequestCookieNames",
                  selectorMatchOperator: "StartsWith",
                  selector: "token",
                },
              ],
              rules: [
                {
                  ruleId: "942100",
                  enabledState: "Enabled",
                  action: "Redirect",
                  exclusions: [
                    {
                      matchVariable: "QueryStringArgNames",
                      selectorMatchOperator: "Equals",
                      selector: "query",
                    },
                  ],
                },
                { ruleId: "942110", enabledState: "Disabled" },
              ],
            },
          ],
        },
        {
          ruleSetType: "Microsoft_HTTPDDoSRuleSet",
          ruleSetVersion: "1.0",
          ruleGroupOverrides: [
            {
              ruleGroupName: "ExcessiveRequests",
              rules: [
                { ruleId: "500100", enabledState: "Enabled", action: "Block", sensitivity: "High" },
              ],
            },
          ],
        },
      ],
      exceptionsList: {
        exceptions: [
          {
            matchVariable: "RequestHeaderNames",
            selectorMatchOperator: "Equals",
            selector: "User-Agent",
            valueMatchOperator: "Contains",
            matchValues: ["Mozilla"],
            scopes: [
              { ruleSetType: "Microsoft_DefaultRuleSet", ruleSetVersion: "2.2" },
              { ruleSetType: "Microsoft_HTTPDDoSRuleSet", ruleSetVersion: "1.0" },
            ],
          },
        ],
      },
    },
    sku: { name: "Premium_AzureFrontDoor" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createsSpecificPolicy();
}

main().catch(console.error);
