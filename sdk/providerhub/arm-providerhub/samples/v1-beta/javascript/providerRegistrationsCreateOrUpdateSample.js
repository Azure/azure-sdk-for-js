// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the provider registration.
 *
 * @summary creates or updates the provider registration.
 * x-ms-original-file: 2024-09-01/DirectProviderRegistrations_CreateOrUpdate.json
 */
async function directProviderRegistrationsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.providerRegistrations.createOrUpdate("Microsoft.Contoso", {
    kind: "Direct",
    properties: {
      capabilities: [
        { effect: "Allow", quotaId: "CSP_2015-05-01" },
        { effect: "Allow", quotaId: "CSP_MG_2017-12-01" },
      ],
      customManifestVersion: "2.0",
      dstsConfiguration: { serviceDnsName: "prds.sparta.azure.com", serviceName: "prds-shim" },
      legacyNamespace: "legacyNamespace",
      legacyRegistrations: ["legacyRegistration"],
      management: {
        incidentContactEmail: "helpme@contoso.com",
        incidentRoutingService: "Contoso Resource Provider",
        incidentRoutingTeam: "Contoso Triage",
        serviceTreeInfos: [
          {
            componentId: "d1b7d8ba-05e2-48e6-90d6-d781b99c6e69",
            readiness: "InDevelopment",
            serviceId: "d1b7d8ba-05e2-48e6-90d6-d781b99c6e69",
          },
        ],
      },
      managementGroupGlobalNotificationEndpoints: [
        { endpointUri: "{your_management_group_notification_endpoint}" },
      ],
      notificationOptions: "EmitSpendingLimit",
      notificationSettings: {
        subscriberSettings: [
          {
            filterRules: [
              {
                endpointInformation: [
                  {
                    endpoint: "https://userrp.azure.com/arnnotify",
                    endpointType: "Webhook",
                    schemaVersion: "3.0",
                  },
                  {
                    endpoint: "https://userrp.azure.com/arnnotify",
                    endpointType: "Eventhub",
                    schemaVersion: "3.0",
                  },
                ],
                filterQuery:
                  "Resources | where event.eventType in ('Microsoft.Network/IpAddresses/write', 'Microsoft.KeyVault/vaults/move/action')",
              },
            ],
          },
        ],
      },
      optionalFeatures: ["Microsoft.Resources/PlatformSubscription"],
      providerType: "Internal",
      providerVersion: "2.0",
      resourceGroupLockOptionDuringMove: { blockActionVerb: "Action" },
      resourceHydrationAccounts: [
        {
          accountName: "classichydrationprodsn01",
          subscriptionId: "e4eae963-2d15-43e6-a097-98bd75b33edd",
        },
        {
          accountName: "classichydrationprodch01",
          subscriptionId: "69e69ecb-e69c-41d4-99b8-87dd12781067",
        },
      ],
      responseOptions: { serviceClientOptionsType: "DisableAutomaticDecompression" },
      serviceName: "root",
      services: [{ serviceName: "tags", status: "Inactive" }],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the provider registration.
 *
 * @summary creates or updates the provider registration.
 * x-ms-original-file: 2024-09-01/ProviderRegistrations_CreateOrUpdate.json
 */
async function providerRegistrationsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.providerRegistrations.createOrUpdate("Microsoft.Contoso", {
    properties: {
      capabilities: [
        { effect: "Allow", quotaId: "CSP_2015-05-01" },
        { effect: "Allow", quotaId: "CSP_MG_2017-12-01" },
      ],
      crossTenantTokenValidation: "EnsureSecureValidation",
      management: {
        canaryManifestOwners: ["SPARTA-PlatformServiceAdmin"],
        errorResponseMessageOptions: { serverFailureResponseMessageType: "OutageReporting" },
        expeditedRolloutMetadata: { enabled: false, expeditedRolloutIntent: "Hotfix" },
        expeditedRolloutSubmitters: ["SPARTA-PlatformServiceOperator"],
        incidentContactEmail: "helpme@contoso.com",
        incidentRoutingService: "Contoso Resource Provider",
        incidentRoutingTeam: "Contoso Triage",
        pcCode: "P1234",
        profitCenterProgramId: "1234",
        serviceTreeInfos: [
          {
            componentId: "d1b7d8ba-05e2-48e6-90d6-d781b99c6e69",
            readiness: "InDevelopment",
            serviceId: "d1b7d8ba-05e2-48e6-90d6-d781b99c6e69",
          },
        ],
      },
      providerType: "Internal",
      providerVersion: "2.0",
      serviceName: "root",
      services: [{ serviceName: "tags", status: "Inactive" }],
    },
  });
  console.log(result);
}

async function main() {
  await directProviderRegistrationsCreateOrUpdate();
  await providerRegistrationsCreateOrUpdate();
}

main().catch(console.error);
