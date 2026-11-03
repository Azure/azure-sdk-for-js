// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to selected regulatory compliance control details and state
 *
 * @summary selected regulatory compliance control details and state
 * x-ms-original-file: 2019-01-01-preview/RegulatoryCompliance/getRegulatoryComplianceControl_example.json
 */
async function getSelectedRegulatoryComplianceControlDetailsAndState(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.regulatoryComplianceControls.get("PCI-DSS-3.2", "1.1");
  console.log(result);
}

async function main(): Promise<void> {
  await getSelectedRegulatoryComplianceControlDetailsAndState();
}

main().catch(console.error);
