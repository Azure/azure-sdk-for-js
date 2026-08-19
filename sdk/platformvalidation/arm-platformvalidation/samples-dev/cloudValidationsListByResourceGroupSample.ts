// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationClient } from "@azure/arm-platformvalidation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list cloud validations by resource group
 *
 * @summary list cloud validations by resource group
 * x-ms-original-file: 2026-07-01-preview/CloudValidations_ListByResourceGroup_MaximumSet_Gen.json
 */
async function cloudValidationsListByResourceGroupMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudValidations.listByResourceGroup("rgvalidate")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list cloud validations by resource group
 *
 * @summary list cloud validations by resource group
 * x-ms-original-file: 2026-07-01-preview/CloudValidations_ListByResourceGroup_MinimumSet_Gen.json
 */
async function cloudValidationsListByResourceGroupMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7BB14EC4-B6DC-4C0C-807F-C3562C790F07";
  const client = new PlatformValidationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cloudValidations.listByResourceGroup("rgplatformvalidation")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cloudValidationsListByResourceGroupMaximumSet();
  await cloudValidationsListByResourceGroupMinimumSet();
}

main().catch(console.error);
