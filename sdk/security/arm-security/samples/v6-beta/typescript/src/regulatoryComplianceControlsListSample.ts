// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to all supported regulatory compliance controls details and state for selected standard
 *
 * @summary all supported regulatory compliance controls details and state for selected standard
 * x-ms-original-file: 2019-01-01-preview/RegulatoryCompliance/getRegulatoryComplianceControlList_example.json
 */
async function getAllRegulatoryComplianceControlsDetailsAndStateForSelectedStandard(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.regulatoryComplianceControls.list("PCI-DSS-3.2")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllRegulatoryComplianceControlsDetailsAndStateForSelectedStandard();
}

main().catch(console.error);
