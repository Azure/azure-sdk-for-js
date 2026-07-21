// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainServicesResourceProvider } = require("@azure/arm-domainservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the Update Domain Service operation can be used to update the existing deployment. The update call only supports the properties listed in the PATCH body.
 *
 * @summary the Update Domain Service operation can be used to update the existing deployment. The update call only supports the properties listed in the PATCH body.
 * x-ms-original-file: 2025-10-01-preview/UpdateDomainService.json
 */
async function updateDomainService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  const result = await client.domainServices.update("TestResourceGroup", "TestDomainService.com", {
    configDiagnostics: {
      lastExecuted: new Date("05 May 2021 12:00:23 GMT"),
      validatorResults: [
        {
          issues: [{ descriptionParams: [], id: "AADDS-CFG-DIAG-I20" }],
          replicaSetSubnetDisplayName: "West US/aadds-subnet",
          status: "Warning",
          validatorId: "AADDS-CFG-DIAG-V06",
        },
      ],
    },
    domainSecuritySettings: {
      ntlmV1: "Enabled",
      syncNtlmPasswords: "Enabled",
      syncOnPremSamAccountName: "Disabled",
      tlsV1: "Disabled",
    },
    filteredSync: "Enabled",
    ldapsSettings: {
      externalAccess: "Enabled",
      ldaps: "Enabled",
      pfxCertificate: "MIIDPDCCAiSgAwIBAgIQQUI9P6tq2p9OFIJa7DLNvTANBgkqhkiG9w0BAQsFADAgMR4w...",
      pfxCertificatePassword: "<pfxCertificatePassword>",
    },
    notificationSettings: {
      additionalRecipients: ["jicha@microsoft.com", "caalmont@microsoft.com"],
      notifyDcAdmins: "Enabled",
      notifyGlobalAdmins: "Enabled",
    },
    replicaSets: [
      {
        location: "West US",
        subnetId:
          "/subscriptions/1639790a-76a2-4ac4-98d9-8562f5dfcb4d/resourceGroups/TestNetworkResourceGroup/providers/Microsoft.Network/virtualNetworks/TestVnetWUS/subnets/TestSubnetWUS",
      },
      {
        location: "East US",
        subnetId:
          "/subscriptions/1639790a-76a2-4ac4-98d9-8562f5dfcb4d/resourceGroups/TestNetworkResourceGroup/providers/Microsoft.Network/virtualNetworks/TestVnetEUS/subnets/TestSubnetEUS",
      },
    ],
  });
  console.log(result);
}

async function main() {
  await updateDomainService();
}

main().catch(console.error);
