// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations.
 *
 * @summary Obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations.
 * x-ms-original-file: specification/advisor/resource-manager/Microsoft.Advisor/stable/2020-01-01/examples/ListRecommendations.json
 */

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function listRecommendations() {
  const subscriptionId = process.env["ADVISOR_SUBSCRIPTION_ID"] || "subscriptionId";
  const top = 10;
  const options = { top };
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recommendations.list(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listRecommendations();
}

main().catch(console.error);
