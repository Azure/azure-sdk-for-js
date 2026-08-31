// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainServicesResourceProvider } = require("@azure/arm-domainservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the Create Domain Service operation creates a new domain service with the specified parameters. If the specific service already exists, then any patchable properties will be updated and any immutable properties will remain unchanged.
 *
 * @summary the Create Domain Service operation creates a new domain service with the specified parameters. If the specific service already exists, then any patchable properties will be updated and any immutable properties will remain unchanged.
 * x-ms-original-file: 2025-10-01-preview/CreateDomainService.json
 */
async function createDomainService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1639790a-76a2-4ac4-98d9-8562f5dfcb4d";
  const client = new DomainServicesResourceProvider(credential, subscriptionId);
  const result = await client.domainServices.createOrUpdate(
    "TestResourceGroup",
    "TestDomainService.com",
    {
      domainName: "TestDomainService.com",
      domainSecuritySettings: {
        ntlmV1: "Enabled",
        syncNtlmPasswords: "Enabled",
        syncOnPremSamAccountName: "Enabled",
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
      ],
    },
  );
  console.log(result);
}

async function main() {
  await createDomainService();
}

main().catch(console.error);
