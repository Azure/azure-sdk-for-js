// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create Organization resource
 *
 * @summary create Organization resource
 * x-ms-original-file: 2024-07-01/Organization_Create.json
 */
async function organizationCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.create("myResourceGroup", "myOrganization", {
    body: {
      location: "West US",
      properties: {
        linkOrganization: { token: "string" },
        offerDetail: {
          id: "string",
          planId: "string",
          planName: "string",
          privateOfferId: "string",
          privateOfferIds: ["string"],
          publisherId: "string",
          termUnit: "string",
        },
        userDetail: {
          aadEmail: "contoso@microsoft.com",
          emailAddress: "contoso@microsoft.com",
          firstName: "string",
          lastName: "string",
          userPrincipalName: "contoso@microsoft.com",
        },
      },
      tags: { Environment: "Dev" },
    },
  });
  console.log(result);
}

async function main() {
  await organizationCreate();
}

main().catch(console.error);
