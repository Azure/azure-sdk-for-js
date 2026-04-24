// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists of all the topics in a clusters
 *
 * @summary lists of all the topics in a clusters
 * x-ms-original-file: 2025-08-18-preview/Topics_List_MaximumSet_Gen.json
 */
async function topicsListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.topics.list(
    "rgconfluent",
    "zkei",
    "cvgvhjgrodfwwhxkm",
    "majpwlefqsjqpfezvkvd",
    { pageSize: 28, pageToken: "nqtivttbasuwnkum" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await topicsListMaximumSet();
}

main().catch(console.error);
