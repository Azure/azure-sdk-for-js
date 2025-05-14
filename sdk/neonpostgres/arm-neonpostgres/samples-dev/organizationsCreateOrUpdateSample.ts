// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a OrganizationResource
 *
 * @summary create a OrganizationResource
 * x-ms-original-file: 2025-03-01/Organizations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function organizationsCreateOrUpdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.organizations.createOrUpdate(
    "rgneon",
    "contoso-org",
    {
      properties: {
        marketplaceDetails: {
          subscriptionId: "xfahbbbzwlcwhhjbxarnwfcy",
          subscriptionStatus: "PendingFulfillmentStart",
          offerDetails: {
            publisherId: "eibghzuyqsksouwlgqphhmuxeqeigf",
            offerId: "qscggwfdnippiwrrnmuscg",
            planId: "sveqoxtdwxutxmtniuufyrdu",
            planName: "t",
            termUnit: "jnxhyql",
            termId: "uptombvymytfonj",
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
          organizationId: "hzejhmftwsruhwspvtwoy",
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
          regionId: "tlcltldfrnxh",
          storage: 7,
          pgVersion: 10,
          historyRetention: 7,
          defaultEndpointSettings: {
            autoscalingLimitMinCu: 26,
            autoscalingLimitMaxCu: 20,
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
                attributes: [
                  { name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" },
                ],
                branchId: "wxbojkmdgaggkfiwqfakdkbyztm",
                permissions: ["myucqecpjriewzohxvadgkhiudnyx"],
                isSuperUser: true,
              },
            ],
            databases: [
              {
                entityName: "entity-name",
                attributes: [
                  { name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" },
                ],
                branchId: "orfdwdmzvfvlnrgussvcvoek",
                ownerName: "odmbeg",
              },
            ],
            endpoints: [
              {
                entityName: "entity-name",
                attributes: [
                  { name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" },
                ],
                projectId: "rtvdeeflqzlrpfzhjqhcsfbldw",
                branchId: "rzsyrhpfbydxtfkpaa",
                endpointType: "read_only",
              },
            ],
          },
          roles: [
            {
              entityName: "entity-name",
              attributes: [
                { name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" },
              ],
              branchId: "wxbojkmdgaggkfiwqfakdkbyztm",
              permissions: ["myucqecpjriewzohxvadgkhiudnyx"],
              isSuperUser: true,
            },
          ],
          databases: [
            {
              entityName: "entity-name",
              attributes: [
                { name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" },
              ],
              branchId: "orfdwdmzvfvlnrgussvcvoek",
              ownerName: "odmbeg",
            },
          ],
          endpoints: [
            {
              entityName: "entity-name",
              attributes: [
                { name: "trhvzyvaqy", value: "evpkgsskyavybxwwssm" },
              ],
              projectId: "rtvdeeflqzlrpfzhjqhcsfbldw",
              branchId: "rzsyrhpfbydxtfkpaa",
              endpointType: "read_only",
            },
          ],
        },
      },
      tags: {},
      location: "kcdph",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsCreateOrUpdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
