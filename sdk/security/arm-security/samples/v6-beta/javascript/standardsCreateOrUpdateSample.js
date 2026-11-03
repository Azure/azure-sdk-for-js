// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a security standard on the given scope.  Available only for custom standards.  Will create/update the required standard definitions.
 *
 * @summary create a security standard on the given scope.  Available only for custom standards.  Will create/update the required standard definitions.
 * x-ms-original-file: 2021-08-01-preview/Standards/PutStandard_example.json
 */
async function createASecurityStandardOnASpecifiedScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.standards.createOrUpdate(
    "myResourceGroup",
    "8bb8be0a-6010-4789-812f-e4d661c4ed0e",
    {
      description: "description of Azure Test Security Standard 1",
      category: "SecurityCenter",
      components: [
        { key: "1195afff-c881-495e-9bc5-1486211ae03f" },
        { key: "dbd0cb49-b563-45e7-9724-889e799fa648" },
      ],
      displayName: "Azure Test Security Standard 1",
      supportedClouds: ["GCP"],
    },
  );
  console.log(result);
}

async function main() {
  await createASecurityStandardOnASpecifiedScope();
}

main().catch(console.error);
