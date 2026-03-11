// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AlertsManagementClient } from "@azure/arm-alertprocessingrules";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all alert processing rules in a resource group.
 *
 * @summary list all alert processing rules in a resource group.
 * x-ms-original-file: 2021-08-08/AlertProcessingRules_List_ResourceGroup.json
 */
async function getAlertProcessingRulesResourceGroupWide(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1e3ff1c0-771a-4119-a03b-be82a51e232d";
  const client = new AlertsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.alertProcessingRules.listByResourceGroup("alertscorrelationrg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAlertProcessingRulesResourceGroupWide();
}

main().catch(console.error);
