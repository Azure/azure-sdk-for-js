// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a EdgeMachineJob
 *
 * @summary create a EdgeMachineJob
 * x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_CreateOrUpdate_CollectLog.json
 */
async function edgeMachineJobsCreateOrUpdateCollectLog() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineJobs.createOrUpdate(
    "ArcInstance-rg",
    "machine1",
    "triggerLogCollection",
    { properties: { jobType: "EdgeMachineJobProperties", deploymentMode: "Validate" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a EdgeMachineJob
 *
 * @summary create a EdgeMachineJob
 * x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_CreateOrUpdate_DownloadOs.json
 */
async function edgeMachineJobsCreateOrUpdateDownloadOs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineJobs.createOrUpdate(
    "ArcInstance-rg",
    "machine1",
    "DownloadOs",
    {
      properties: {
        jobType: "DownloadOs",
        deploymentMode: "Deploy",
        downloadRequest: {
          target: "AzureLinux",
          osProfile: {
            osName: "AzureLinux",
            osType: "AzureLinux",
            osVersion: "3.0",
            osImageLocation: "https://aka.ms/aep/azlinux3.0",
            vsrVersion: "1.0.0",
            imageHash: "sha256:a8b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1",
            gpgPubKey:
              "LS0tLS1CRUdJTiBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0tXG5WZXJzaW9uOiBHbnVQRyB2MlxuXG5tUUVOQkZYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYXG4tLS0tLUVORCBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0t",
          },
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a EdgeMachineJob
 *
 * @summary create a EdgeMachineJob
 * x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_CreateOrUpdate_ProvisionOs.json
 */
async function edgeMachineJobsCreateOrUpdateProvisionOs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineJobs.createOrUpdate(
    "ArcInstance-rg",
    "machine1",
    "ProvisionOs",
    {
      properties: {
        provisioningRequest: {
          osProfile: {
            osName: "AzureLinux",
            osType: "AzureLinux",
            osVersion: "3.0",
            osImageLocation: "https://aka.ms/aep/azlinux3.0",
            vsrVersion: "1.0.0",
            imageHash: "sha256:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
            gpgPubKey:
              "LS0tLS1CRUdJTiBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0tXG5WZXJzaW9uOiBHbnVQRyB2MlxuXG5tUUVOQkZYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYXG4tLS0tLUVORCBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0t",
            operationType: "Provision",
          },
          userDetails: [
            {
              userName: "edgeuser",
              secretType: "KeyVault",
              secretLocation:
                "https://bhukumar-test-kv.vault.azure.net/secrets/edgeuser/7b2d7db11bad4e1599cb6a0f4d2b2e00",
              sshPubKey: ["ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC7... edgeuser@example.com"],
            },
          ],
          onboardingConfiguration: {
            resourceId:
              "/subscriptions/ff0aa6da-20f8-44fe-9aee-381c8e8a4aeb/resourceGroups/bhukumar-test-rg/providers/Microsoft.HybridCompute/machines/bkumar-t1",
            location: "eastus",
            tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
            arcVirtualMachineId: "634b9db8-83e1-46ed-b391-c1614e2d0097",
            type: "HybridComputeMachine",
          },
          deviceConfiguration: {
            network: {
              networkAdapters: [
                {
                  ipAssignmentType: "Automatic",
                  ipAddress: "",
                  ipAddressRange: { startIp: "", endIp: "" },
                  gateway: "",
                  subnetMask: "",
                  dnsAddressArray: ["8.8.8.8"],
                  vlanId: "0",
                },
              ],
            },
            hostName: "634b9db8-83e1-46ed-b391-c1614e2d0097",
            webProxy: { connectionUri: "https://microsoft.com/a", port: "", bypassList: [] },
            time: { primaryTimeServer: "", secondaryTimeServer: "", timeZone: "UTC" },
            storage: { partitionSize: "30GB" },
          },
          target: "AzureLinux",
          customConfiguration:
            "eyJjdXN0b21Db25maWciOiAiZXhhbXBsZSBiYXNlNjQgZW5jb2RlZCBjb25maWcifQ==",
        },
        jobType: "ProvisionOs",
        deploymentMode: "Deploy",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a EdgeMachineJob
 *
 * @summary create a EdgeMachineJob
 * x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_CreateOrUpdate_RemoteSupport.json
 */
async function edgeMachineJobsCreateOrUpdateRemoteSupport() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineJobs.createOrUpdate(
    "ArcInstance-rg",
    "machine1",
    "RemoteSupport",
    {
      properties: {
        jobType: "RemoteSupport",
        accessLevel: "Diagnostics",
        type: "Enable",
        expirationTimestamp: new Date("2024-01-29T10:43:27.9471574Z"),
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a EdgeMachineJob
 *
 * @summary create a EdgeMachineJob
 * x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_CreateOrUpdate_UpdateOs.json
 */
async function edgeMachineJobsCreateOrUpdateUpdateOs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineJobs.createOrUpdate(
    "ArcInstance-rg",
    "machine1",
    "UpdateOs",
    {
      properties: {
        provisioningRequest: {
          osProfile: {
            osName: "AzureLinux",
            osType: "AzureLinux",
            osVersion: "3.1",
            osImageLocation: "https://aka.ms/aep/azlinux3.1",
            vsrVersion: "1.1.0",
            imageHash: "sha256:b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678",
            gpgPubKey:
              "LS0tLS1CRUdJTiBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0tXG5WZXJzaW9uOiBHbnVQRyB2MlxuXG5tUUVOQkZYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYXG4tLS0tLUVORCBQR1AgUFVCTElDIEtFWSBCTE9DSy0tLS0t",
            operationType: "Update",
          },
          userDetails: [
            {
              userName: "edgeuser",
              secretType: "KeyVault",
              secretLocation:
                "https://bhukumar-test-kv.vault.azure.net/secrets/edgeuser/7b2d7db11bad4e1599cb6a0f4d2b2e00",
              sshPubKey: ["ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC7... edgeuser@example.com"],
            },
          ],
          onboardingConfiguration: {
            resourceId:
              "/subscriptions/ff0aa6da-20f8-44fe-9aee-381c8e8a4aeb/resourceGroups/bhukumar-test-rg/providers/Microsoft.HybridCompute/machines/bkumar-t1",
            location: "eastus",
            tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
            arcVirtualMachineId: "634b9db8-83e1-46ed-b391-c1614e2d0097",
            type: "HybridComputeMachine",
          },
          deviceConfiguration: {
            network: {
              networkAdapters: [
                {
                  ipAssignmentType: "Automatic",
                  ipAddress: "",
                  ipAddressRange: { startIp: "", endIp: "" },
                  gateway: "",
                  subnetMask: "",
                  dnsAddressArray: ["8.8.8.8"],
                  vlanId: "0",
                },
              ],
            },
            hostName: "634b9db8-83e1-46ed-b391-c1614e2d0097",
            webProxy: { connectionUri: "https://microsoft.com/a", port: "", bypassList: [] },
            time: { primaryTimeServer: "", secondaryTimeServer: "", timeZone: "UTC" },
          },
          target: "AzureLinux",
          customConfiguration:
            "eyJjdXN0b21Db25maWciOiAiZXhhbXBsZSBiYXNlNjQgZW5jb2RlZCBjb25maWcifQ==",
        },
        jobType: "ProvisionOs",
        deploymentMode: "Deploy",
      },
    },
  );
  console.log(result);
}

async function main() {
  await edgeMachineJobsCreateOrUpdateCollectLog();
  await edgeMachineJobsCreateOrUpdateDownloadOs();
  await edgeMachineJobsCreateOrUpdateProvisionOs();
  await edgeMachineJobsCreateOrUpdateRemoteSupport();
  await edgeMachineJobsCreateOrUpdateUpdateOs();
}

main().catch(console.error);
