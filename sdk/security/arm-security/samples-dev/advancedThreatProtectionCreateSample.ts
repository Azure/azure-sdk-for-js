// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates the Advanced Threat Protection settings on a specified resource.
 *
 * @summary Creates or updates the Advanced Threat Protection settings on a specified resource.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2019-01-01/examples/AdvancedThreatProtection/PutAdvancedThreatProtectionSettings_example.json
 */

import type { AdvancedThreatProtectionSetting } from "@azure/arm-security";
import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createsOrUpdatesTheAdvancedThreatProtectionSettingsOnASpecifiedResource(): Promise<void> {
  const resourceId =
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/SampleRG/providers/Microsoft.Storage/storageAccounts/samplestorageaccount";
  const advancedThreatProtectionSetting: AdvancedThreatProtectionSetting = {
    name: "current",
    type: "Microsoft.Security/advancedThreatProtectionSettings",
    id: "/subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/SampleRG/providers/Microsoft.Storage/storageAccounts/samplestorageaccount/providers/Microsoft.Security/advancedThreatProtectionSettings/current",
    isEnabled: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.advancedThreatProtection.create(
    resourceId,
    advancedThreatProtectionSetting,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesTheAdvancedThreatProtectionSettingsOnASpecifiedResource();
}

main().catch(console.error);
