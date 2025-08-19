// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the problem classifications (categories) available for a specific Azure service. Always use the service and problem classifications obtained programmatically. This practice ensures that you always have the most recent set of service and problem classification Ids.
 *
 * @summary Lists all the problem classifications (categories) available for a specific Azure service. Always use the service and problem classifications obtained programmatically. This practice ensures that you always have the most recent set of service and problem classification Ids.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/ListProblemClassifications.json
 */

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsListOfProblemClassificationsForAServiceForWhichASupportTicketCanBeCreated(): Promise<void> {
  const serviceName = "service_guid";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const resArray = new Array();
  for await (const item of client.problemClassifications.list(serviceName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getsListOfProblemClassificationsForAServiceForWhichASupportTicketCanBeCreated();
}

main().catch(console.error);
