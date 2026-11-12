// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the provider registration.
 *
 * @summary creates or updates the provider registration.
 * x-ms-original-file: 2025-10-01/DirectProviderRegistrations_CreateOrUpdate.json
 */
async function directProviderRegistrationsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.providerRegistrations.createOrUpdate("Microsoft.Contoso", {
    kind: "Direct",
    properties: {
      providerType: "Internal",
      providerVersion: "2.0",
      serviceName: "root",
      services: [{ serviceName: "tags", status: "Inactive" }],
      management: {
        incidentRoutingService: "Contoso Resource Provider",
        incidentRoutingTeam: "Contoso Triage",
        incidentContactEmail: "helpme@contoso.com",
      },
      capabilities: [
        { quotaId: "CSP_2015-05-01", effect: "Allow" },
        { quotaId: "CSP_MG_2017-12-01", effect: "Allow" },
      ],
      notificationSettings: {
        subscriberSettings: [
          {
            filterRules: [
              {
                filterQuery:
                  "Resources | where event.eventType in ('Microsoft.Network/IpAddresses/write', 'Microsoft.KeyVault/vaults/move/action')",
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
              },
            ],
          },
        ],
      },
      notificationOptions: "EmitSpendingLimit",
      resourceHydrationAccounts: [
        {
          subscriptionId: "e4eae963-2d15-43e6-a097-98bd75b33edd",
          accountName: "classichydrationprodsn01",
        },
        {
          subscriptionId: "69e69ecb-e69c-41d4-99b8-87dd12781067",
          accountName: "classichydrationprodch01",
        },
      ],
      managementGroupGlobalNotificationEndpoints: [
        { endpointUri: "{your_management_group_notification_endpoint}" },
      ],
      optionalFeatures: ["Microsoft.Resources/PlatformSubscription"],
      resourceGroupLockOptionDuringMove: { blockActionVerb: "Action" },
      responseOptions: { serviceClientOptionsType: "DisableAutomaticDecompression" },
      legacyNamespace: "legacyNamespace",
      legacyRegistrations: ["legacyRegistration"],
      customManifestVersion: "2.0",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the provider registration.
 *
 * @summary creates or updates the provider registration.
 * x-ms-original-file: 2025-10-01/ProviderRegistrations_CreateOrUpdate.json
 */
async function providerRegistrationsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.providerRegistrations.createOrUpdate("Microsoft.Contoso", {
    properties: {
      providerType: "Internal",
      providerVersion: "2.0",
      serviceName: "root",
      services: [{ serviceName: "tags", status: "Inactive" }],
      crossTenantTokenValidation: "EnsureSecureValidation",
      management: {
        incidentRoutingService: "Contoso Resource Provider",
        incidentRoutingTeam: "Contoso Triage",
        incidentContactEmail: "helpme@contoso.com",
        expeditedRolloutSubmitters: ["Contoso-PlatformServiceOperator"],
        expeditedRolloutMetadata: { enabled: false, expeditedRolloutIntent: "Hotfix" },
        errorResponseMessageOptions: { serverFailureResponseMessageType: "OutageReporting" },
        canaryManifestOwners: ["Contoso-PlatformServiceAdmin"],
        pcCode: "P1234",
        profitCenterProgramId: "1234",
      },
      capabilities: [
        { quotaId: "CSP_2015-05-01", effect: "Allow" },
        { quotaId: "CSP_MG_2017-12-01", effect: "Allow" },
      ],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await directProviderRegistrationsCreateOrUpdate();
  await providerRegistrationsCreateOrUpdate();
}

main().catch(console.error);
