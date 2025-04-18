// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a OrganizationResource
 *
 * @summary update a OrganizationResource
 * x-ms-original-file: 2025-03-01/Organizations_Update_MaximumSet_Gen.json
 */
async function organizationsUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.organizations.update("rgneon", "test-org", {
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
        firstName: "zhelh",
        lastName: "zbdhouyeozylnerrc",
        emailAddress: "test@contoso.com",
        upn: "mixcikvxlnhkfugetqlngz",
        phoneNumber: "zmejenytglrmjnt",
      },
      companyDetails: {
        companyName: "xtul",
        country: "ycmyjdcpyjieemfrthfyxdlvn",
        officeAddress: "icirtoqmmozijk",
        businessPhone: "hucxvzcvpaupqjkgb",
        domain: "snoshqumfsthyofpnrsgyjhszvgtj",
        numberOfEmployees: 12,
      },
      partnerOrganizationProperties: {
        organizationId: "fynmpcbivqkwqdfhrmsyusjd",
        organizationName: "entity-name",
        singleSignOnProperties: {
          singleSignOnState: "Initial",
          enterpriseAppId: "urtjzjfr",
          singleSignOnUrl: "gcmlwvtxcsjozitm",
          aadDomains: ["mdzbelaiphukhe"],
        },
      },
      projectProperties: {
        entityName: "entity-name",
        attributes: [{ name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" }],
        regionId: "vxvmjwuttpiakirzdf",
        storage: 23,
        pgVersion: 16,
        historyRetention: 16,
        defaultEndpointSettings: {
          autoscalingLimitMinCu: 8,
          autoscalingLimitMaxCu: 4,
        },
        branch: {
          entityName: "entity-name",
          attributes: [{ name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" }],
          projectId: "oik",
          parentId: "entity-id",
          roleName: "qrrairsupyosxnqotdwhbpc",
          databaseName: "duhxebzhd",
          roles: [
            {
              entityName: "entity-name",
              attributes: [{ name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" }],
              branchId: "wxbojkmdgaggkfiwqfakdkbyztm",
              permissions: ["myucqecpjriewzohxvadgkhiudnyx"],
              isSuperUser: true,
            },
          ],
          databases: [
            {
              entityName: "entity-name",
              attributes: [{ name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" }],
              branchId: "orfdwdmzvfvlnrgussvcvoek",
              ownerName: "odmbeg",
            },
          ],
          endpoints: [
            {
              entityName: "entity-name",
              attributes: [{ name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" }],
              projectId: "rtvdeeflqzlrpfzhjqhcsfbldw",
              branchId: "rzsyrhpfbydxtfkpaa",
              endpointType: "read_only",
            },
          ],
        },
        roles: [
          {
            entityName: "entity-name",
            attributes: [{ name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" }],
            branchId: "wxbojkmdgaggkfiwqfakdkbyztm",
            permissions: ["myucqecpjriewzohxvadgkhiudnyx"],
            isSuperUser: true,
          },
        ],
        databases: [
          {
            entityName: "entity-name",
            attributes: [{ name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" }],
            branchId: "orfdwdmzvfvlnrgussvcvoek",
            ownerName: "odmbeg",
          },
        ],
        endpoints: [
          {
            entityName: "entity-name",
            attributes: [{ name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" }],
            projectId: "rtvdeeflqzlrpfzhjqhcsfbldw",
            branchId: "rzsyrhpfbydxtfkpaa",
            endpointType: "read_only",
          },
        ],
      },
    },
    tags: { key609: "qyosjypklxtiamqebd" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsUpdateMaximumSet();
}

main().catch(console.error);
