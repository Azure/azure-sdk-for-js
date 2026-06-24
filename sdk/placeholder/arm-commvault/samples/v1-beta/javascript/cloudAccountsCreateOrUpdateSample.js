// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a CloudAccount
 *
 * @summary create a CloudAccount
 * x-ms-original-file: 2026-07-03-preview/CloudAccounts_CreateOrUpdate_MaximumSet_Gen.json
 */
async function cloudAccountsCreateOrUpdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.cloudAccounts.createOrUpdate(
    "rgcommvault",
    "sample-cloudAccountName",
    {
      properties: {
        marketplace: {
          subscriptionId: "tblwyuznrazgchhfczgtlaifwamndt",
          saasResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-commvault/providers/Microsoft.SaaS/resources/commvault-saas",
          offerDetails: {
            publisherId: "npghpdbgiohslbbeihxdwucejb",
            offerId: "recofyvhkddgkuvducosjstenmy",
            planId: "pqoyqqavjh",
            planName: "hwcltkdvndwfmmnthzwvocujri",
            termUnit: "wzrzqyfzrpqhy",
            termId: "avpgkctrkwdmudsz",
          },
        },
        user: {
          firstName: "mpiviyooskqkyjqqpgnkderu",
          lastName: "ppkcvfjylquebr",
          emailAddress: "user@example.com",
          upn: "frlpmyk",
          phoneNumber: "mpunfyfckyzpqxotsmclzk",
        },
        backupAdminOnCcaCreate: {
          id: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
          displayName: "Tenant Admins",
          entityType: "Group",
        },
        multiPersonAuthorizationOnCcaCreate: {
          id: "11111111-2222-3333-4444-555555555555",
          displayName: "John Smith",
          entityType: "User",
        },
      },
      identity: { type: "None", userAssignedIdentities: {} },
      tags: {},
      location: "sxzmmidsfbba",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a CloudAccount
 *
 * @summary create a CloudAccount
 * x-ms-original-file: 2026-07-03-preview/CloudAccounts_CreateOrUpdate_MinimumSet_Gen.json
 */
async function cloudAccountsCreateOrUpdateMinimumSetCCACreateWithCreateOnlyRoleBootstrapFieldsOmitted() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.cloudAccounts.createOrUpdate(
    "rgcommvault",
    "sample-cloudAccountName",
    {
      properties: {
        marketplace: {
          subscriptionId: "tblwyuznrazgchhfczgtlaifwamndt",
          offerDetails: {
            publisherId: "npghpdbgiohslbbeihxdwucejb",
            offerId: "recofyvhkddgkuvducosjstenmy",
            planId: "pqoyqqavjh",
            planName: "hwcltkdvndwfmmnthzwvocujri",
            termUnit: "wzrzqyfzrpqhy",
            termId: "avpgkctrkwdmudsz",
          },
        },
        user: {
          firstName: "John",
          lastName: "Doe",
          emailAddress: "john.doe@contoso.com",
          upn: "john.doe@contoso.com",
          phoneNumber: "1234567890",
        },
      },
      identity: { type: "None", userAssignedIdentities: {} },
      tags: {},
      location: "eastus",
    },
  );
  console.log(result);
}

async function main() {
  await cloudAccountsCreateOrUpdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
  await cloudAccountsCreateOrUpdateMinimumSetCCACreateWithCreateOnlyRoleBootstrapFieldsOmitted();
}

main().catch(console.error);
