// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get whois information for a single domain name
 *
 * @summary get whois information for a single domain name
 * x-ms-original-file: 2025-07-01-preview/enrichment/GetWhoisWithWorkspaceByDomainName.json
 */
async function getWhoisInformationForASingleDomainName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.listWhoisByDomain("myRg", "myWorkspace", "main", {
    domain: "microsoft.com",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getWhoisInformationForASingleDomainName();
}

main().catch(console.error);
