// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieve a list of all available Elastic versions for a specified region, helping you choose the best version for your deployment.
 *
 * @summary Retrieve a list of all available Elastic versions for a specified region, helping you choose the best version for your deployment.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/ElasticVersions_List.json
 */
async function elasticVersionsList() {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const region = "myregion";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticVersions.list(region)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await elasticVersionsList();
}

main().catch(console.error);
