// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing delivery rule within a rule set.
 *
 * @summary updates an existing delivery rule within a rule set.
 * x-ms-original-file: 2025-12-01/Rules_Update.json
 */
async function rulesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.rules.update("RG", "profile1", "ruleSet1", "rule1", {
    actions: [
      {
        name: "ModifyResponseHeader",
        parameters: {
          headerAction: "Overwrite",
          headerName: "X-CDN",
          typeName: "DeliveryRuleHeaderActionParameters",
          value: "MSFT",
        },
      },
    ],
    order: 1,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await rulesUpdate();
}

main().catch(console.error);
