// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a resource type.
 *
 * @summary creates or updates a resource type.
 * x-ms-original-file: 2024-09-01/DirectResourceTypeRegistrations_CreateOrUpdate.json
 */
async function directResourceTypeRegistrationsCreateOrUpdateJson(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.resourceTypeRegistrations.createOrUpdate(
    "Microsoft.Contoso",
    "employees",
    {
      properties: {
        addResourceListTargetLocations: true,
        additionalOptions: "ProtectedAsyncOperationPolling",
        allowEmptyRoleAssignments: false,
        allowedResourceNames: [{ name: "name1", getActionVerb: "list" }, { name: "name2" }],
        allowedTemplateDeploymentReferenceActions: ["ListKeys", "ListSAS"],
        apiProfiles: [
          { apiVersion: "2018-02-01", profileVersion: "2018-03-01-hybrid" },
          { apiVersion: "2016-06-01", profileVersion: "2019-03-01-hybrid" },
        ],
        asyncTimeoutRules: [
          { actionName: "Microsoft.ClassicCompute/domainNames/write", timeout: "PT12H" },
        ],
        availabilityZoneRule: { availabilityZonePolicy: "MultiZoned" },
        capacityRule: { capacityPolicy: "Restricted", skuAlias: "incorrectAlias" },
        commonApiVersions: ["2021-01-01"],
        dstsConfiguration: { serviceDnsName: "prds.sparta.azure.com", serviceName: "prds-shim" },
        endpoints: [
          {
            apiVersions: ["2020-06-01-preview"],
            locations: ["West US", "East US", "North Europe"],
            requiredFeatures: ["<feature flag>"],
          },
        ],
        groupingTag: "groupingTag",
        legacyName: "legacyName",
        legacyNames: ["legacyName"],
        legacyPolicy: {
          disallowedConditions: [
            {
              disallowedLegacyOperations: ["Create", "Delete"],
              feature: "Microsoft.RP/ArmOnlyJobCollections",
            },
          ],
          disallowedLegacyOperations: ["Create"],
        },
        linkedOperationRules: [
          { linkedAction: "Blocked", linkedOperation: "CrossSubscriptionResourceMove" },
          { linkedAction: "Validate", linkedOperation: "CrossResourceGroupResourceMove" },
        ],
        management: {
          authorizationOwners: ["RPAAS-PlatformServiceAdministrator"],
          incidentContactEmail: "helpme@contoso.com",
          incidentRoutingService: "",
          incidentRoutingTeam: "",
          manifestOwners: ["SPARTA-PlatformServiceAdministrator"],
          resourceAccessPolicy: "NotSpecified",
          serviceTreeInfos: [
            {
              componentId: "d1b7d8ba-05e2-48e6-90d6-d781b99c6e69",
              readiness: "InDevelopment",
              serviceId: "d1b7d8ba-05e2-48e6-90d6-d781b99c6e69",
            },
          ],
        },
        manifestLink: "https://azure.com",
        marketplaceOptions: { addOnPlanConversionAllowed: true },
        metadata: {},
        notifications: [
          { notificationType: "SubscriptionNotification", skipNotifications: "Disabled" },
        ],
        openApiConfiguration: { validation: { allowNoncompliantCollectionResponse: true } },
        policyExecutionType: "BypassPolicies",
        regionality: "Regional",
        requestHeaderOptions: { optOutHeaders: "SystemDataCreatedByLastModifiedBy" },
        resourceCache: { enableResourceCache: true, resourceCacheExpirationTimespan: "PT2M" },
        resourceConcurrencyControlOptions: {
          patch: { policy: "SynchronizeBeginExtension" },
          post: { policy: "SynchronizeBeginExtension" },
          put: { policy: "SynchronizeBeginExtension" },
        },
        resourceGraphConfiguration: { apiVersion: "2019-01-01", enabled: true },
        resourceManagementOptions: {
          batchProvisioningSupport: { supportedOperations: "Get, Delete" },
          deleteDependencies: [{ linkedProperty: "properties.edgeProfile.subscription.id" }],
        },
        resourceQueryManagement: { filterOption: "EnableSubscriptionFilterOnTenant" },
        resourceTypeCommonAttributeManagement: { commonApiVersionsMergeMode: "Merge" },
        routingRule: { hostResourceType: "servers/databases" },
        routingType: "Default",
        supportsTags: true,
        swaggerSpecifications: [
          {
            apiVersions: ["2020-06-01-preview"],
            swaggerSpecFolderUri:
              "https://github.com/Azure/azure-rest-api-specs/blob/feature/azure/contoso/specification/contoso/resource-manager/Microsoft.SampleRP/",
          },
        ],
        templateDeploymentPolicy: {
          capabilities: "Preflight",
          preflightNotifications: "None",
          preflightOptions: "ValidationRequests, DeploymentRequests",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a resource type.
 *
 * @summary creates or updates a resource type.
 * x-ms-original-file: 2024-09-01/ResourceTypeRegistrations_CreateOrUpdate.json
 */
async function resourceTypeRegistrationsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.resourceTypeRegistrations.createOrUpdate(
    "Microsoft.Contoso",
    "employees",
    {
      properties: {
        crossTenantTokenValidation: "EnsureSecureValidation",
        endpoints: [
          {
            apiVersions: ["2020-06-01-preview"],
            locations: ["West US", "East US", "North Europe"],
            requiredFeatures: ["<feature flag>"],
          },
        ],
        management: {
          authorizationOwners: ["RPAAS-PlatformServiceAdministrator"],
          incidentContactEmail: "helpme@contoso.com",
          incidentRoutingService: "",
          incidentRoutingTeam: "",
          manifestOwners: ["SPARTA-PlatformServiceAdministrator"],
          resourceAccessPolicy: "NotSpecified",
          serviceTreeInfos: [
            {
              componentId: "d1b7d8ba-05e2-48e6-90d6-d781b99c6e69",
              readiness: "InDevelopment",
              serviceId: "d1b7d8ba-05e2-48e6-90d6-d781b99c6e69",
            },
          ],
        },
        metadata: {},
        notifications: [
          { notificationType: "SubscriptionNotification", skipNotifications: "Disabled" },
        ],
        openApiConfiguration: { validation: { allowNoncompliantCollectionResponse: true } },
        regionality: "Regional",
        requestHeaderOptions: { optOutHeaders: "SystemDataCreatedByLastModifiedBy" },
        resourceConcurrencyControlOptions: {
          patch: { policy: "SynchronizeBeginExtension" },
          post: { policy: "SynchronizeBeginExtension" },
          put: { policy: "SynchronizeBeginExtension" },
        },
        resourceGraphConfiguration: { apiVersion: "2019-01-01", enabled: true },
        routingType: "Default",
        swaggerSpecifications: [
          {
            apiVersions: ["2020-06-01-preview"],
            swaggerSpecFolderUri:
              "https://github.com/Azure/azure-rest-api-specs/blob/feature/azure/contoso/specification/contoso/resource-manager/Microsoft.SampleRP/",
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await directResourceTypeRegistrationsCreateOrUpdateJson();
  await resourceTypeRegistrationsCreateOrUpdate();
}

main().catch(console.error);
