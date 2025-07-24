// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to organization Validate proxy resource
 *
 * @summary organization Validate proxy resource
 * x-ms-original-file: 2024-07-01/Validations_ValidateOrganizations.json
 */
async function validationsValidateOrganizations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.validations.validateOrganization(
    "myResourceGroup",
    "myOrganization",
    {
      location: "West US",
      properties: {
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
          aadEmail: "abc@microsoft.com",
          emailAddress: "abc@microsoft.com",
          firstName: "string",
          lastName: "string",
          userPrincipalName: "abc@microsoft.com",
        },
      },
      tags: { Environment: "Dev" },
    },
  );
  console.log(result);
}

async function main() {
  await validationsValidateOrganizations();
}

main().catch(console.error);
