// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AtlasClient } = require("@azure/arm-mongodbatlas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a OrganizationResource
 *
 * @summary update a OrganizationResource
 * x-ms-original-file: 2025-06-01/Organizations_Update_MaximumSet_Gen.json
 */
async function organizationsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "422A4D59-A5BC-4DBB-8831-EC666633F64F";
  const client = new AtlasClient(credential, subscriptionId);
  const result = await client.organizations.update("rgopenapi", "U.1-:7", {
    tags: {},
    properties: {
      user: {
        firstName: "btyhwmlbzzihjfimviefebg",
        lastName: "xx",
        emailAddress: ".K_@e7N-g1.xjqnbPs",
        upn: "mxtbogd",
        phoneNumber: "isvc",
        companyName: "oztteysco",
      },
      partnerProperties: {
        organizationId: "vugtqrobendjkinziswxlqueouo",
        redirectUrl: "cbxwtehraetlluocdihfgchvjzockn",
        organizationName: "U.1-:7",
      },
    },
    identity: { type: "None", userAssignedIdentities: {} },
  });
  console.log(result);
}

async function main() {
  await organizationsUpdateMaximumSet();
}

main().catch(console.error);
