// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to supported regulatory compliance details state for selected standard
 *
 * @summary supported regulatory compliance details state for selected standard
 * x-ms-original-file: 2019-01-01-preview/RegulatoryCompliance/getRegulatoryComplianceStandard_example.json
 */
async function getSelectedRegulatoryComplianceStandardDetailsAndState(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.regulatoryComplianceStandards.get("PCI-DSS-3.2");
  console.log(result);
}

async function main(): Promise<void> {
  await getSelectedRegulatoryComplianceStandardDetailsAndState();
}

main().catch(console.error);
