// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Selected regulatory compliance control details and state
 *
 * @summary Selected regulatory compliance control details and state
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2019-01-01-preview/examples/RegulatoryCompliance/getRegulatoryComplianceControl_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getSelectedRegulatoryComplianceControlDetailsAndState(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const regulatoryComplianceStandardName = "PCI-DSS-3.2";
  const regulatoryComplianceControlName = "1.1";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.regulatoryComplianceControls.get(
    regulatoryComplianceStandardName,
    regulatoryComplianceControlName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSelectedRegulatoryComplianceControlDetailsAndState();
}

main().catch(console.error);
