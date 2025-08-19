// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Supported regulatory compliance details state for selected standard
 *
 * @summary Supported regulatory compliance details state for selected standard
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2019-01-01-preview/examples/RegulatoryCompliance/getRegulatoryComplianceStandard_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getSelectedRegulatoryComplianceStandardDetailsAndState(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const regulatoryComplianceStandardName = "PCI-DSS-3.2";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.regulatoryComplianceStandards.get(regulatoryComplianceStandardName);
  console.log(result);
}

async function main(): Promise<void> {
  await getSelectedRegulatoryComplianceStandardDetailsAndState();
}

main().catch(console.error);
