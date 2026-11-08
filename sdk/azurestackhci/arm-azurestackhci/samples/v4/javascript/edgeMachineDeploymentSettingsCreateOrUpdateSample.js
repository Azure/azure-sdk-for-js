// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an Edge Machine Deployment Setting.
 *
 * @summary create or update an Edge Machine Deployment Setting.
 * x-ms-original-file: 2026-10-01/EdgeMachineDeploymentSettings_CreateOrUpdate.json
 */
async function edgeMachineDeploymentSettingsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineDeploymentSettings.createOrUpdate(
    "test-rg",
    "EdgeMachine01",
    "default",
    {
      properties: {
        deploymentConfiguration: {
          version: "10.2.0.0",
          scaleUnits: [
            {
              deploymentData: {
                storageType: "SANISCSI",
                iScsiConfig: {
                  iScsiNetworkConfig: {
                    adapterProperties: { jumboPacket: 9014 },
                    adapterIPConfig: [
                      {
                        networkAdapterName: "iSCSI-A",
                        vlanId: 401,
                        addressPrefix: "10.10.50.0/24",
                        targetPortalAddresses: [{ ipAddress: "10.0.0.1", nextHop: "10.10.50.1" }],
                      },
                    ],
                  },
                  chapSettings: { chapType: "Bidirectional" },
                  initiatorIqn: "iqn.2025-01.com.example:storage-target",
                },
                secrets: [
                  {
                    secretName: "n42r2202-cl-IscsiChapSecret",
                    eceSecretName: "chapCredential",
                    secretLocation:
                      "https://n42r2202clkv.vault.azure.net/secrets/n42r2202-cl-IscsiChapSecret",
                  },
                ],
              },
            },
          ],
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await edgeMachineDeploymentSettingsCreateOrUpdate();
}

main().catch(console.error);
