// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update policy with specified rule set name within a resource group.
 *
 * @summary create or update policy with specified rule set name within a resource group.
 * x-ms-original-file: 2025-12-01/WafPolicyCreateOrUpdate.json
 */
async function createsSpecificPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.policies.createOrUpdate("rg1", "MicrosoftCdnWafPolicy", {
    location: "WestUs",
    customRules: {
      rules: [
        {
          name: "CustomRule1",
          action: "Block",
          enabledState: "Enabled",
          matchConditions: [
            {
              matchValue: ["CH"],
              matchVariable: "RemoteAddr",
              negateCondition: false,
              operator: "GeoMatch",
              transforms: [],
            },
            {
              matchValue: ["windows"],
              matchVariable: "RequestHeader",
              negateCondition: false,
              operator: "Contains",
              selector: "UserAgent",
              transforms: [],
            },
            {
              matchValue: ["<?php", "?>"],
              matchVariable: "QueryString",
              negateCondition: false,
              operator: "Contains",
              selector: "search",
              transforms: ["UrlDecode", "Lowercase"],
            },
          ],
          priority: 2,
        },
      ],
    },
    managedRules: {
      managedRuleSets: [
        {
          ruleGroupOverrides: [
            {
              ruleGroupName: "Group1",
              rules: [
                { action: "Redirect", enabledState: "Enabled", ruleId: "GROUP1-0001" },
                { enabledState: "Disabled", ruleId: "GROUP1-0002" },
              ],
            },
          ],
          ruleSetType: "DefaultRuleSet",
          ruleSetVersion: "preview-1.0",
        },
      ],
    },
    policySettings: {
      defaultCustomBlockResponseBody:
        "PGh0bWw+CjxoZWFkZXI+PHRpdGxlPkhlbGxvPC90aXRsZT48L2hlYWRlcj4KPGJvZHk+CkhlbGxvIHdvcmxkCjwvYm9keT4KPC9odG1sPg==",
      defaultCustomBlockResponseStatusCode: 200,
      defaultRedirectUrl: "http://www.bing.com",
    },
    rateLimitRules: {
      rules: [
        {
          name: "RateLimitRule1",
          action: "Block",
          enabledState: "Enabled",
          matchConditions: [
            {
              matchValue: ["192.168.1.0/24", "10.0.0.0/24"],
              matchVariable: "RemoteAddr",
              negateCondition: false,
              operator: "IPMatch",
              transforms: [],
            },
          ],
          priority: 1,
          rateLimitDurationInMinutes: 0,
          rateLimitThreshold: 1000,
        },
      ],
    },
    sku: { name: "Standard_Microsoft" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createsSpecificPolicy();
}

main().catch(console.error);
