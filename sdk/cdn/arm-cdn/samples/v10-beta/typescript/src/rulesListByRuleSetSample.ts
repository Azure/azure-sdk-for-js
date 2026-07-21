// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the existing delivery rules within a rule set.
 *
 * @summary lists all of the existing delivery rules within a rule set.
 * x-ms-original-file: 2025-12-01/Rules_ListByRuleSet.json
 */
async function rulesListByRuleSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.rules.listByRuleSet("RG", "profile1", "ruleSet1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await rulesListByRuleSet();
}

main().catch(console.error);
