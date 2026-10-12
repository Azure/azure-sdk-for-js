// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvaultcontentstore");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resolve the token to get the SaaS resource ID and activate the SaaS resource
 *
 * @summary resolve the token to get the SaaS resource ID and activate the SaaS resource
 * x-ms-original-file: 2026-09-30/SaaSOperationGroup_ActivateResource_MaximumSet_Gen.json
 */
async function saaSOperationGroupActivateResourceMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.saaSOperationGroup.activateResource({
    saasGuid: "55555555-6666-7777-8888-999999999999",
    publisherId: "contoso-publisher",
    activateSaaSRequestParam: {
      saasResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-commvault/providers/Microsoft.SaaS/resources/commvault-saas",
      user: {
        firstName: "John",
        lastName: "Smith",
        emailAddress: "john.smith@contoso.com",
        upn: "john.smith@contoso.com",
        phoneNumber: "+1-555-0101",
      },
      company: {
        jobTitle: "Security Administrator",
        companyName: "Contoso",
        website: "https://www.contoso.com",
        street: "1 Microsoft Way",
        city: "Redmond",
        country: "USA",
        postalCode: "98052",
        state: "WA",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to resolve the token to get the SaaS resource ID and activate the SaaS resource
 *
 * @summary resolve the token to get the SaaS resource ID and activate the SaaS resource
 * x-ms-original-file: 2026-09-30/SaaSOperationGroup_ActivateResource_MinimumSet_Gen.json
 */
async function saaSOperationGroupActivateResourceMaximumSetGeneratedByMaximumSetRuleGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.saaSOperationGroup.activateResource({
    saasGuid: "55555555-6666-7777-8888-999999999999",
  });
  console.log(result);
}

async function main() {
  await saaSOperationGroupActivateResourceMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
  await saaSOperationGroupActivateResourceMaximumSetGeneratedByMaximumSetRuleGeneratedByMinimumSetRule();
}

main().catch(console.error);
