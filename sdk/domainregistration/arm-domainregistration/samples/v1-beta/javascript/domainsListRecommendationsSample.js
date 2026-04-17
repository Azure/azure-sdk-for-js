// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get domain name recommendations based on keywords.
 *
 * @summary description for Get domain name recommendations based on keywords.
 * x-ms-original-file: 2024-11-01/ListDomainRecommendations.json
 */
async function listDomainRecommendations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.domains.listRecommendations({
    keywords: "example1",
    maxDomainRecommendations: 10,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDomainRecommendations();
}

main().catch(console.error);
