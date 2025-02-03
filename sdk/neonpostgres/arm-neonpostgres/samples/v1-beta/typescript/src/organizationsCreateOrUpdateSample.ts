// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a OrganizationResource
 *
 * @summary create a OrganizationResource
 * x-ms-original-file: 2024-08-01-preview/Organizations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function organizationsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1178323D-8270-4757-B639-D528B6266487";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.organizations.createOrUpdate("rgneon", "XB-.:", {
    properties: {
      marketplaceDetails: {
        subscriptionId: "yxmkfivp",
        subscriptionStatus: "PendingFulfillmentStart",
        offerDetails: {
          publisherId: "hporaxnopmolttlnkbarw",
          offerId: "bunyeeupoedueofwrzej",
          planId: "nlbfiwtslenfwek",
          planName: "ljbmgpkfqklaufacbpml",
          termUnit: "qbcq",
          termId: "aedlchikwqckuploswthvshe",
        },
      },
      userDetails: {
        firstName: "buwwe",
        lastName: "escynjpynkoox",
        emailAddress: "3i_%@w8-y.H-p.tvj.dG",
        upn: "fwedjamgwwrotcjaucuzdwycfjdqn",
        phoneNumber: "dlrqoowumy",
      },
      companyDetails: {
        companyName: "uxn",
        country: "lpajqzptqchuko",
        officeAddress: "chpkrlpmfslmawgunjxdllzcrctykq",
        businessPhone: "hbeb",
        domain: "krjldeakhwiepvs",
        numberOfEmployees: 23,
      },
      partnerOrganizationProperties: {
        organizationId: "nrhvoqzulowcunhmvwfgjcaibvwcl",
        organizationName: "2__.-",
        singleSignOnProperties: {
          singleSignOnState: "Initial",
          enterpriseAppId: "fpibacregjfncfdsojs",
          singleSignOnUrl: "tmojh",
          aadDomains: ["kndszgrwzbvvlssvkej"],
        },
      },
    },
    tags: { key2099: "omjjymaqtrqzksxszhzgyl" },
    location: "upxxgikyqrbnv",
  });
  console.log(result);
}

async function main() {
  organizationsCreateOrUpdate();
}

main().catch(console.error);
