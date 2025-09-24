// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Gets all legal agreements that user needs to accept before purchasing a domain.
 *
 * @summary Description for Gets all legal agreements that user needs to accept before purchasing a domain.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.DomainRegistration/stable/2024-11-01/examples/ListTopLevelDomainAgreements.json
 */

import {
  TopLevelDomainAgreementOption,
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listTopLevelDomainAgreements(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const name = "in";
  const agreementOption: TopLevelDomainAgreementOption = {
    forTransfer: false,
    includePrivacy: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
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
