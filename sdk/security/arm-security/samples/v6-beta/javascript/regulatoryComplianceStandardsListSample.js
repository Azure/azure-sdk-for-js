// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to supported regulatory compliance standards details and state
 *
 * @summary supported regulatory compliance standards details and state
 * x-ms-original-file: 2019-01-01-preview/RegulatoryCompliance/getRegulatoryComplianceStandardList_example.json
 */
async function getAllSupportedRegulatoryComplianceStandardsDetailsAndState() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.regulatoryComplianceStandards.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllSupportedRegulatoryComplianceStandardsDetailsAndState();
}

main().catch(console.error);
