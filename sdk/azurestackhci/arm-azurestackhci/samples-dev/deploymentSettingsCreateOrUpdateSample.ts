/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { DeploymentSetting } from "@azure/arm-azurestackhci";
import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a DeploymentSetting
 *
 * @summary Create a DeploymentSetting
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/PutDeploymentSettings.json
 */
async function createDeploymentSettings(): Promise<void> {
  const subscriptionId =
    process.env["AZURESTACKHCI_SUBSCRIPTION_ID"] || "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const resourceGroupName = process.env["AZURESTACKHCI_RESOURCE_GROUP"] || "test-rg";
  const clusterName = "myCluster";
  const deploymentSettingsName = "default";
  const resource: DeploymentSetting = {
    arcNodeResourceIds: [
      "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-1",
      "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-2",
    ],
    deploymentConfiguration: {
      scaleUnits: [
        {
          deploymentData: {
            adouPath: "OU=ms169,DC=ASZ1PLab8,DC=nttest,DC=microsoft,DC=com",
            cluster: {
              name: "testHCICluster",
              azureServiceEndpoint: "core.windows.net",
              cloudAccountName: "myasestoragacct",
              witnessPath: "Cloud",
              witnessType: "Cloud",
            },
            domainFqdn: "ASZ1PLab8.nttest.microsoft.com",
            hostNetwork: {
              enableStorageAutoIp: false,
              intents: [
                {
                  name: "Compute_Management",
                  adapter: ["Port2"],
                  adapterPropertyOverrides: {
                    jumboPacket: "1514",
                    networkDirect: "Enabled",
                    networkDirectTechnology: "iWARP",
                  },
                  overrideAdapterProperty: false,
                  overrideQosPolicy: false,
                  overrideVirtualSwitchConfiguration: false,
                  qosPolicyOverrides: {
                    bandwidthPercentageSMB: "50",
                    priorityValue8021ActionCluster: "7",
                    priorityValue8021ActionSMB: "3",
                  },
                  trafficType: ["Compute", "Management"],
                  virtualSwitchConfigurationOverrides: {
                    enableIov: "True",
                    loadBalancingAlgorithm: "HyperVPort",
                  },
                },
              ],
              storageConnectivitySwitchless: true,
              storageNetworks: [
                {
                  name: "Storage1Network",
                  networkAdapterName: "Port3",
                  storageAdapterIPInfo: [
                    {
                      ipv4Address: "10.57.48.60",
                      physicalNode: "string",
                      subnetMask: "255.255.248.0",
                    },
                  ],
                  vlanId: "5",
                },
              ],
            },
            infrastructureNetwork: [
              {
                dnsServers: ["10.57.50.90"],
                gateway: "255.255.248.0",
                ipPools: [
                  {
                    endingAddress: "10.57.48.66",
                    startingAddress: "10.57.48.60",
                  },
                ],
                subnetMask: "255.255.248.0",
              },
            ],
            namingPrefix: "ms169",
            observability: {
              episodicDataUpload: true,
              euLocation: false,
              streamingDataClient: true,
            },
            optionalServices: { customLocation: "customLocationName" },
            physicalNodes: [
              { name: "ms169host", ipv4Address: "10.57.51.224" },
              { name: "ms154host", ipv4Address: "10.57.53.236" },
            ],
            sdnIntegration: {
              networkController: {
                macAddressPoolStart: "00-0D-3A-1B-C7-21",
                macAddressPoolStop: "00-0D-3A-1B-C7-29",
                networkVirtualizationEnabled: true,
              },
            },
            secrets: [
              {
                eceSecretName: "BMCAdminUserCred",
                secretLocation:
                  "https://sclusterkvnirhci35.vault.azure.net/secrets/cluster-34232342-BmcAdminUser-f5bcc1d9-23af-4ae9-aca1-041d0f593a63/9276354aabfc492fa9b2cdbefb54ae4b",
                secretName: "cluster1-BmcAdminUser-f5bcc1d9-23af-4ae9-aca1-041d0f593a63",
              },
              {
                eceSecretName: "AzureStackLCMUserCredential",
                secretLocation:
                  "https://sclusterkvnirhci35.vault.azure.net/secrets/cluster-34232342-AzureStackLCMUserCredential-f5bcc1d9-23af-4ae9-aca1-041d0f593a63/9276354aabfc492fa9b2cdbefb54ae4c",
                secretName:
                  "cluster2-AzureStackLCMUserCredential-f5bcc1d9-23af-4ae9-aca1-041d0f593a63",
              },
            ],
            secretsLocation:
              "/subscriptions/db4e2fdb-6d80-4e6e-b7cd-xxxxxxx/resourceGroups/test-rg/providers/Microsoft.KeyVault/vaults/abcd123",
            securitySettings: {
              bitlockerBootVolume: true,
              bitlockerDataVolumes: true,
              credentialGuardEnforced: false,
              driftControlEnforced: true,
              drtmProtection: true,
              hvciProtection: true,
              sideChannelMitigationEnforced: true,
              smbClusterEncryption: false,
              smbSigningEnforced: true,
              wdacEnforced: true,
            },
            storage: { configurationMode: "Express" },
          },
          sbePartnerInfo: {
            credentialList: [
              {
                eceSecretName: "DownloadConnectorCred",
                secretLocation:
                  "https://sclusterkvnirhci35.vault.azure.net/secrets/cluster-34232342-DownloadConnectorCred-f5bcc1d9-23af-4ae9-aca1-041d0f593a63/9276354aabfc492fa9b2cdbefb54ae4b",
                secretName: "cluster1-DownloadConnectorCred-f5bcc1d9-23af-4ae9-aca1-041d0f593a63",
              },
            ],
            partnerProperties: [
              { name: "EnableBMCIpV6", value: "false" },
              { name: "PhoneHomePort", value: "1653" },
              { name: "BMCSecurityState", value: "HighSecurity" },
            ],
            sbeDeploymentInfo: {
              family: "Gen5",
              publisher: "Contoso",
              sbeManifestCreationDate: new Date("2023-07-25T02:40:33Z"),
              sbeManifestSource: "default",
              version: "4.0.2309.13",
            },
          },
        },
      ],
      version: "string",
    },
    deploymentMode: "Deploy",
    operationType: "ClusterProvisioning",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.deploymentSettings.beginCreateOrUpdateAndWait(
    resourceGroupName,
    clusterName,
    deploymentSettingsName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createDeploymentSettings();
}

main().catch(console.error);
