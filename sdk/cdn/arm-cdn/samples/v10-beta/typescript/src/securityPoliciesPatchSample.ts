// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing security policy within a profile.
 *
 * @summary updates an existing security policy within a profile.
 * x-ms-original-file: 2025-12-01/SecurityPolicies_Patch.json
 */
async function securityPoliciesPatch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.securityPolicies.patch("RG", "profile1", "securityPolicy1", {
    parameters: {
      type: "WebApplicationFirewall",
      associations: [
        {
          domains: [
            {
              id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.Cdn/profiles/profile1/customdomains/testdomain1",
            },
            {
              id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.Cdn/profiles/profile1/customdomains/testdomain2",
            },
          ],
          patternsToMatch: ["/*"],
        },
      ],
      wafPolicy: {
        id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.Network/frontdoorwebapplicationfirewallpolicies/wafTest",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await securityPoliciesPatch();
}

main().catch(console.error);
