// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the problem classifications (categories) available for a specific Azure service. Always use the service and problem classifications obtained programmatically. This practice ensures that you always have the most recent set of service and problem classification Ids.
 *
 * @summary lists all the problem classifications (categories) available for a specific Azure service. Always use the service and problem classifications obtained programmatically. This practice ensures that you always have the most recent set of service and problem classification Ids.
 * x-ms-original-file: 2026-07-01/ListProblemClassifications.json
 */
async function getsListOfProblemClassificationsForAServiceForWhichASupportTicketCanBeCreated() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const resArray = new Array();
  for await (const item of client.problemClassifications.list("service_guid")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsListOfProblemClassificationsForAServiceForWhichASupportTicketCanBeCreated();
}

main().catch(console.error);
