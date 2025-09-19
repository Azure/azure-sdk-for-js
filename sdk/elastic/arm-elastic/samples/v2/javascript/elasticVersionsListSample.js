// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a list of all available Elastic versions for a specified region, helping you choose the best version for your deployment.
 *
 * @summary retrieve a list of all available Elastic versions for a specified region, helping you choose the best version for your deployment.
 * x-ms-original-file: 2025-06-01/ElasticVersions_List.json
 */
async function elasticVersionsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticVersions.list("myregion")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await elasticVersionsList();
}

main().catch(console.error);
