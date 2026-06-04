// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a security connector
 *
 * @summary updates a security connector
 * x-ms-original-file: 2024-08-01-preview/SecurityConnectors/PatchSecurityConnector_example.json
 */
async function updateASecurityConnector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a5caac9c-5c04-49af-b3d0-e204f40345d5";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.securityConnectors.update(
    "exampleResourceGroup",
    "exampleSecurityConnectorName",
    {
      etag: "etag value (must be supplied for update)",
      location: "Central US",
      environmentData: { environmentType: "AwsAccount" },
      environmentName: "AWS",
      hierarchyIdentifier: "exampleHierarchyId",
      offerings: [
        {
          nativeCloudConnection: { cloudRoleArn: "arn:aws:iam::00000000:role/ASCMonitor" },
          offeringType: "CspmMonitorAws",
        },
      ],
      tags: {},
    },
  );
  console.log(result);
}

async function main() {
  await updateASecurityConnector();
}

main().catch(console.error);
