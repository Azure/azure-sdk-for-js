// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Entity resources by HealthModel
 *
 * @summary list Entity resources by HealthModel
 * x-ms-original-file: 2025-05-01-preview/Entities_ListByHealthModel.json
 */
async function entitiesListByHealthModel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.entities.listByHealthModel(
    "rgopenapi",
    "gPWT6GP85xRV248L7LhNRTD--2Yc73wu-5Qk-0tS",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await entitiesListByHealthModel();
}

main().catch(console.error);
