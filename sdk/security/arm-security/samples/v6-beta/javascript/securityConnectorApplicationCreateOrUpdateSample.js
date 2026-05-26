// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or update a security Application on the given security connector.
 *
 * @summary creates or update a security Application on the given security connector.
 * x-ms-original-file: 2022-07-01-preview/Applications/PutSecurityConnectorApplication_example.json
 */
async function createApplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.securityConnectorApplication.createOrUpdate(
    "gcpResourceGroup",
    "gcpconnector",
    "ad9a8e26-29d9-4829-bb30-e597a58cdbb8",
    {
      description: "An application on critical GCP recommendations",
      conditionSets: [
        { conditions: [{ operator: "contains", property: "$.Id", value: "-prod-" }] },
      ],
      displayName: "GCP Admin's application",
      sourceResourceType: "Assessments",
    },
  );
  console.log(result);
}

async function main() {
  await createApplication();
}

main().catch(console.error);
