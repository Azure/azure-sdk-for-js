// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a FHIR Service resource with the specified parameters.
 *
 * @summary creates or updates a FHIR Service resource with the specified parameters.
 * x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_Create.json
 */
async function createOrUpdateAFhirService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.fhirServices.createOrUpdate("testRG", "workspace1", "fhirservice1", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/subid/resourcegroups/testRG/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-mi":
          {},
      },
    },
    kind: "fhir-R4",
    location: "westus",
    acrConfiguration: { loginServers: ["test1.azurecr.io"] },
    authenticationConfiguration: {
      audience: "https://azurehealthcareapis.com",
      authority: "https://login.microsoftonline.com/abfde7b2-df0f-47e6-aabf-2462b07508dc",
      smartIdentityProviders: [
        {
          applications: [
            {
              allowedDataActions: ["Read"],
              audience: "22222222-2222-2222-2222-222222222222",
              clientId: "22222222-2222-2222-2222-222222222222",
            },
          ],
          authority: "https://login.b2clogin.com/11111111-1111-1111-1111-111111111111/v2.0",
        },
      ],
      smartProxyEnabled: true,
    },
    corsConfiguration: {
      allowCredentials: false,
      headers: ["*"],
      maxAge: 1440,
      methods: ["DELETE", "GET", "OPTIONS", "PATCH", "POST", "PUT"],
      origins: ["*"],
    },
    encryption: {
      customerManagedKeyEncryption: {
        keyEncryptionKeyUrl: "https://mykeyvault.vault.azure.net/keys/myEncryptionKey/myKeyVersion",
      },
    },
    exportConfiguration: { storageAccountName: "existingStorageAccount" },
    implementationGuidesConfiguration: { usCoreMissingData: false },
    importConfiguration: {
      enabled: false,
      initialImportMode: false,
      integrationDataStore: "existingStorageAccount",
    },
    tags: { additionalProp1: "string", additionalProp2: "string", additionalProp3: "string" },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAFhirService();
}

main().catch(console.error);
