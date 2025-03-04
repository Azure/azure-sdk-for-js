// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a OrganizationResource
 *
 * @summary update a OrganizationResource
 * x-ms-original-file: 2024-08-01-preview/Organizations_Update_MaximumSet_Gen.json
 */
async function organizationsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1178323D-8270-4757-B639-D528B6266487";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.organizations.update("rgneon", "eRY-J_:", {
    location: "upxxgikyqrbnv",
    properties: {
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
        organizationId: "njyoqflcmfwzfsqe",
        organizationName: "J:.._3P",
        singleSignOnProperties: {
          singleSignOnState: "Initial",
          enterpriseAppId: "fpibacregjfncfdsojs",
          singleSignOnUrl: "tmojh",
          aadDomains: ["kndszgrwzbvvlssvkej"],
        },
      },
      marketplaceDetails: {
        offerDetails: {
          publisherId: "",
          offerId: "",
          planId: ""
        }
      }
    },
    tags: { key8990: "wuvaontoqyttxtikvvahdegcfdfkz" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  organizationsUpdate();
}

main().catch(console.error);
