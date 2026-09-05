// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a resource type.
 *
 * @summary creates or updates a resource type.
 * x-ms-original-file: 2025-10-01/DirectResourceTypeRegistrations_CreateOrUpdate.json
 */
async function directResourceTypeRegistrationsCreateOrUpdateJson() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.resourceTypeRegistrations.createOrUpdate(
    "Microsoft.Contoso",
    "employees",
    {
      properties: {
        routingType: "Default",
        regionality: "Regional",
        additionalOptions: "ProtectedAsyncOperationPolling",
        endpoints: [
          {
            apiVersions: ["2020-06-01-preview"],
            locations: ["West US", "East US", "North Europe"],
            requiredFeatures: ["<feature flag>"],
          },
        ],
        resourceConcurrencyControlOptions: {
          put: { policy: "SynchronizeBeginExtension" },
          patch: { policy: "SynchronizeBeginExtension" },
          post: { policy: "SynchronizeBeginExtension" },
        },
        swaggerSpecifications: [
          {
            apiVersions: ["2020-06-01-preview"],
            swaggerSpecFolderUri:
              "https://github.com/Azure/azure-rest-api-specs/blob/feature/azure/contoso/specification/contoso/resource-manager/Microsoft.SampleRP/",
          },
        ],
        resourceGraphConfiguration: { enabled: true, apiVersion: "2019-01-01" },
        management: {
          manifestOwners: ["Contoso-PlatformServiceAdministrator"],
          authorizationOwners: ["RPAAS-PlatformServiceAdministrator"],
          incidentRoutingService: "",
          incidentRoutingTeam: "",
          incidentContactEmail: "helpme@contoso.com",
          resourceAccessPolicy: "NotSpecified",
        },
        metadata: {},
        notifications: [
          { notificationType: "SubscriptionNotification", skipNotifications: "Disabled" },
        ],
        openApiConfiguration: { validation: { allowNoncompliantCollectionResponse: true } },
        requestHeaderOptions: { optOutHeaders: "SystemDataCreatedByLastModifiedBy" },
        privateEndpointConfiguration: {
          minApiVersion: "2022-10-01",
          groupConnectivityInformation: [
            {
              groupId: "Sql",
              requiredMembers: ["Sql_Member"],
              requiredZoneNames: ["Zone"],
              redirectMapId: "test",
            },
          ],
        },
        templateDeploymentPolicy: {
          capabilities: "Preflight",
          preflightOptions: "ValidationRequests, DeploymentRequests",
          preflightNotifications: "None",
        },
        allowEmptyRoleAssignments: false,
        policyExecutionType: "BypassPolicies",
        availabilityZoneRule: { availabilityZonePolicy: "MultiZoned" },
        asyncTimeoutRules: [
          { actionName: "Microsoft.ClassicCompute/domainNames/write", timeout: "PT12H" },
        ],
        commonApiVersions: ["2021-01-01"],
        apiProfiles: [
          { profileVersion: "2018-03-01-hybrid", apiVersion: "2018-02-01" },
          { profileVersion: "2019-03-01-hybrid", apiVersion: "2016-06-01" },
        ],
        linkedOperationRules: [
          { linkedOperation: "CrossSubscriptionResourceMove", linkedAction: "Blocked" },
          { linkedOperation: "CrossResourceGroupResourceMove", linkedAction: "Validate" },
        ],
        legacyName: "legacyName",
        legacyNames: ["legacyName"],
        allowedTemplateDeploymentReferenceActions: ["ListKeys", "ListSAS"],
        legacyPolicy: {
          disallowedLegacyOperations: ["Create"],
          disallowedConditions: [
            {
              disallowedLegacyOperations: ["Create", "Delete"],
              feature: "Microsoft.RP/ArmOnlyJobCollections",
            },
          ],
        },
        manifestLink: "https://azure.com",
        capacityRule: { capacityPolicy: "Restricted", skuAlias: "incorrectAlias" },
        marketplaceOptions: { addOnPlanConversionAllowed: true },
        allowedResourceNames: [{ name: "name1", getActionVerb: "list" }, { name: "name2" }],
        resourceCache: { enableResourceCache: true, resourceCacheExpirationTimespan: "PT2M" },
        resourceQueryManagement: { filterOption: "EnableSubscriptionFilterOnTenant" },
        supportsTags: true,
        resourceManagementOptions: {
          batchProvisioningSupport: { supportedOperations: "Get, Delete" },
          deleteDependencies: [{ linkedProperty: "properties.edgeProfile.subscription.id" }],
        },
        groupingTag: "groupingTag",
        addResourceListTargetLocations: true,
        resourceTypeCommonAttributeManagement: { commonApiVersionsMergeMode: "Merge" },
        routingRule: { hostResourceType: "servers/databases" },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a resource type.
 *
 * @summary creates or updates a resource type.
 * x-ms-original-file: 2025-10-01/ResourceTypeRegistrations_CreateOrUpdate.json
 */
async function resourceTypeRegistrationsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.resourceTypeRegistrations.createOrUpdate(
    "Microsoft.Contoso",
    "employees",
    {
      properties: {
        routingType: "Default",
        regionality: "Regional",
        crossTenantTokenValidation: "EnsureSecureValidation",
        endpoints: [
          {
            apiVersions: ["2020-06-01-preview"],
            locations: ["West US", "East US", "North Europe"],
            requiredFeatures: ["<feature flag>"],
          },
        ],
        resourceConcurrencyControlOptions: {
          put: { policy: "SynchronizeBeginExtension" },
          patch: { policy: "SynchronizeBeginExtension" },
          post: { policy: "SynchronizeBeginExtension" },
        },
        swaggerSpecifications: [
          {
            apiVersions: ["2020-06-01-preview"],
            swaggerSpecFolderUri:
              "https://github.com/Azure/azure-rest-api-specs/blob/feature/azure/contoso/specification/contoso/resource-manager/Microsoft.SampleRP/",
          },
        ],
        resourceGraphConfiguration: { enabled: true, apiVersion: "2019-01-01" },
        management: {
          manifestOwners: ["Contoso-PlatformServiceAdministrator"],
          authorizationOwners: ["RPAAS-PlatformServiceAdministrator"],
          incidentRoutingService: "",
          incidentRoutingTeam: "",
          incidentContactEmail: "helpme@contoso.com",
          resourceAccessPolicy: "NotSpecified",
        },
        metadata: {},
        notifications: [
          { notificationType: "SubscriptionNotification", skipNotifications: "Disabled" },
        ],
        openApiConfiguration: { validation: { allowNoncompliantCollectionResponse: true } },
        requestHeaderOptions: { optOutHeaders: "SystemDataCreatedByLastModifiedBy" },
        throttlingRules: [
          {
            action: "Microsoft.Foo/checkNameAvailability/write",
            metrics: [{ type: "NumberOfRequests", bucketSize: "XLarge", limit: 1 }],
          },
        ],
        privateEndpointConfiguration: {
          minApiVersion: "2022-10-01",
          groupConnectivityInformation: [
            {
              groupId: "Sql",
              requiredMembers: ["Sql_Member"],
              requiredZoneNames: ["Zone"],
              redirectMapId: "test",
            },
          ],
        },
        writeLock: { state: "Enabled" },
        marketplaceType: "ProviderHub",
        resourceManagementOptions: {
          batchProvisioningSupport: {
            maxBatchSize: 10,
            actionConfigurations: [
              { authorizationAction: "Microsoft.Contoso/authorize", maxBatchSize: 5 },
            ],
            batchContractVersion: "2020-06-01-preview",
            maxNestedBatchSize: 5,
            requiredFeatures: ["Microsoft.Contoso/feature1"],
            supportedOperations: "Get",
          },
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await directResourceTypeRegistrationsCreateOrUpdateJson();
  await resourceTypeRegistrationsCreateOrUpdate();
}

main().catch(console.error);
