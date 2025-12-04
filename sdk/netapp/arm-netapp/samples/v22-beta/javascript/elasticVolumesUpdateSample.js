// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch the specified elastic volume
 *
 * @summary patch the specified elastic volume
 * x-ms-original-file: 2025-09-01-preview/ElasticVolumes_Update.json
 */
async function elasticVolumesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticVolumes.update("myRG", "account1", "pool1", "volume1", {
    properties: {
      exportPolicy: {
        rules: [
          {
            ruleIndex: 1,
            unixAccessRule: "ReadOnly",
            nfsv3: "Enabled",
            nfsv4: "Disabled",
            allowedClients: ["0.0.0.0/0"],
            rootAccess: "Disabled",
          },
        ],
      },
      dataProtection: {
        snapshot: {
          snapshotPolicyResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/elasticAccounts/account1/elasticSnapshotPolicies/policy1",
        },
      },
    },
  });
  console.log(result);
}

async function main() {
  await elasticVolumesUpdate();
}

main().catch(console.error);
