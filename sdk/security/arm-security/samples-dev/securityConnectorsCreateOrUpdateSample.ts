// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a security connector. If a security connector is already created and a subsequent request is issued for the same security connector id, then it will be updated.
 *
 * @summary creates or updates a security connector. If a security connector is already created and a subsequent request is issued for the same security connector id, then it will be updated.
 * x-ms-original-file: 2024-08-01-preview/SecurityConnectors/PutSecurityConnector_example.json
 */
async function createOrUpdateASecurityConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a5caac9c-5c04-49af-b3d0-e204f40345d5";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.securityConnectors.createOrUpdate(
    "exampleResourceGroup",
    "exampleSecurityConnectorName",
    {
      etag: "etag value (must be supplied for update)",
      location: "Central US",
      environmentData: { environmentType: "AwsAccount", scanInterval: 4 },
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

async function main(): Promise<void> {
  await createOrUpdateASecurityConnector();
}

main().catch(console.error);
