// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainRegistrationManagementClient } from "@azure/arm-domainregistration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Gets all legal agreements that user needs to accept before purchasing a domain.
 *
 * @summary description for Gets all legal agreements that user needs to accept before purchasing a domain.
 * x-ms-original-file: 2024-11-01/ListTopLevelDomainAgreements.json
 */
async function listTopLevelDomainAgreements(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.topLevelDomains.listAgreements("in", {
    forTransfer: false,
    includePrivacy: true,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTopLevelDomainAgreements();
}

main().catch(console.error);
