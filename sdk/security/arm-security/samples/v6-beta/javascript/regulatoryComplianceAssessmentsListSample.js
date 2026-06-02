// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to details and state of assessments mapped to selected regulatory compliance control
 *
 * @summary details and state of assessments mapped to selected regulatory compliance control
 * x-ms-original-file: 2019-01-01-preview/RegulatoryCompliance/getRegulatoryComplianceAssessmentList_example.json
 */
async function getAllAssessmentsMappedToSelectedRegulatoryComplianceControl() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.regulatoryComplianceAssessments.list("PCI-DSS-3.2", "1.1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllAssessmentsMappedToSelectedRegulatoryComplianceControl();
}

main().catch(console.error);
