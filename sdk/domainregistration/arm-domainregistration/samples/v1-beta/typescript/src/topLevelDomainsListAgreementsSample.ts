// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  TopLevelDomainAgreementOption} from "@azure/arm-domainregistration";
import {
  DomainRegistrationManagementClient,
} from "@azure/arm-domainregistration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Gets all legal agreements that user needs to accept before purchasing a domain.
 *
 * @summary Description for Gets all legal agreements that user needs to accept before purchasing a domain.
 * x-ms-original-file: specification/domainregistration/resource-manager/Microsoft.DomainRegistration/DomainRegistration/stable/2024-11-01/examples/ListTopLevelDomainAgreements.json
 */
async function listTopLevelDomainAgreements(): Promise<void> {
  const subscriptionId =
    process.env["DOMAINREGISTRATION_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const name = "in";
  const agreementOption: TopLevelDomainAgreementOption = {
    forTransfer: false,
    includePrivacy: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new DomainRegistrationManagementClient(
    credential,
    subscriptionId,
  );
  const resArray = new Array();
  for await (const item of client.topLevelDomains.listAgreements(
    name,
    agreementOption,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listTopLevelDomainAgreements();
}

main().catch(console.error);
