// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to supported regulatory compliance details and state for selected assessment
 *
 * @summary supported regulatory compliance details and state for selected assessment
 * x-ms-original-file: 2019-01-01-preview/RegulatoryCompliance/getRegulatoryComplianceAssessment_example.json
 */
async function getSelectedRegulatoryComplianceAssessmentDetailsAndState() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.regulatoryComplianceAssessments.get(
    "PCI-DSS-3.2",
    "1.1",
    "968548cb-02b3-8cd2-11f8-0cf64ab1a347",
  );
  console.log(result);
}

async function main() {
  await getSelectedRegulatoryComplianceAssessmentDetailsAndState();
}

main().catch(console.error);
