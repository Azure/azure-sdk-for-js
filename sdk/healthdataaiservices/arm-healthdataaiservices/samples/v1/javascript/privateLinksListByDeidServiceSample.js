// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthDataAIServicesClient } = require("@azure/arm-healthdataaiservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list private links on the given resource
 *
 * @summary list private links on the given resource
 * x-ms-original-file: 2024-09-20/PrivateLinks_ListByDeidService_MaximumSet_Gen.json
 */
async function privateLinksListByDeidServiceGeneratedByMaximumSetRuleStable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F21BB31B-C214-42C0-ACF0-DACCA05D3011";
  const client = new HealthDataAIServicesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.privateLinks.listByDeidService("rgopenapi", "deidTest")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  privateLinksListByDeidServiceGeneratedByMaximumSetRuleStable();
}

main().catch(console.error);
