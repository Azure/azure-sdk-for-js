// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Scenario: schema contract source probes for @azure/provisioning-webpubsub.
 * provisioning API: @azure/provisioning-webpubsub/types.
 * Source contracts: exact-version Microsoft Learn/Bicep reference.
 * Typecheck command: pnpm run typecheck
 */

import type {
  ApplicationFirewallSettingsInput,
  ChatSettingsInput,
  CustomCertificatePropertiesInput,
  EventHandlerInput,
  GroupPresenceEventFiltersInput,
  LiveTraceCategoryInput,
  LiveTraceConfigurationInput,
  ManagedIdentityInput,
  ManagedIdentitySettingsInput,
  PrivateEndpointInput,
  PrivateLinkServiceConnectionStateInput,
  ReplicaPropertiesInput,
  ResourceLogCategoryInput,
  ResourceLogConfigurationInput,
  ResourceReferenceInput,
  ResourceSkuInput,
  SharedPrivateLinkResourcePropertiesInput,
  UpstreamAuthSettingsInput,
  WebPubSubHubPropertiesInput,
  WebPubSubPropertiesInput,
  WebPubSubTlsSettingsInput,
} from "@azure/provisioning-webpubsub/types";

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub -> ApplicationFirewallSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub?pivots=deployment-language-bicep
export const applicationFirewallSettingsWebpubsub57c1e19f93467dee2bffFromBicep: ApplicationFirewallSettingsInput =
  {
    clientConnectionCountRules: [],
    clientTrafficControlRules: [],
    maxClientConnectionLifetimeInSeconds: 0,
  };

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub/hubs -> ChatSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub/hubs?pivots=deployment-language-bicep
export const chatSettingsWebpubsubHubs64ecbb55d87c37e58304FromBicep: ChatSettingsInput = {
  mode: "string",
};

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub/customCertificates -> CustomCertificatePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub/customcertificates?pivots=deployment-language-bicep
export const customCertificatePropertiesWebpubsubCustomcertificatesaadbcdd0bb6dbd528406FromBicep: CustomCertificatePropertiesInput =
  {
    keyVaultBaseUri: "string",
    keyVaultSecretName: "string",
    keyVaultSecretVersion: "string",
  };

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub/hubs -> EventHandlerInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub/hubs?pivots=deployment-language-bicep
export const eventHandlerWebpubsubHubs64ecbb55d80c92da7f11FromBicep: EventHandlerInput = {
  systemEvents: [],
  urlTemplate: "string",
  userEventPattern: "string",
};

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub/hubs -> GroupPresenceEventFiltersInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub/hubs?pivots=deployment-language-bicep
export const groupPresenceEventFiltersWebpubsubHubs64ecbb55d82dc491a44fFromBicep: GroupPresenceEventFiltersInput =
  {
    eventNames: [],
    groupFilters: [],
  };

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub -> LiveTraceCategoryInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub?pivots=deployment-language-bicep
export const liveTraceCategoryWebpubsub57c1e19f930fffb6cb6aFromBicep: LiveTraceCategoryInput = {
  enabled: "string",
  name: "string",
};

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub -> LiveTraceConfigurationInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub?pivots=deployment-language-bicep
export const liveTraceConfigurationWebpubsub57c1e19f93813e653bc4FromBicep: LiveTraceConfigurationInput =
  {
    categories: [],
    enabled: "string",
  };

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub -> ManagedIdentityInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub?pivots=deployment-language-bicep
export const managedIdentityWebpubsub57c1e19f93ebdee6ea2eFromBicep: ManagedIdentityInput = {
  type: "None",
};

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub/hubs -> ManagedIdentitySettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub/hubs?pivots=deployment-language-bicep
export const managedIdentitySettingsWebpubsubHubs64ecbb55d8565d24b8aeFromBicep: ManagedIdentitySettingsInput =
  {
    resource: "string",
  };

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub/privateEndpointConnections -> PrivateEndpointInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub/privateendpointconnections?pivots=deployment-language-bicep
export const privateEndpointWebpubsubPrivateendpointconnectionsd7b39e11dbb773c0f02eFromBicep: PrivateEndpointInput =
  {
    id: "string",
  };

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub/privateEndpointConnections -> PrivateLinkServiceConnectionStateInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub/privateendpointconnections?pivots=deployment-language-bicep
export const privateLinkServiceConnectionStateWebpubsubPrivateendpointconnectionsd7b39e11dbed8069bebaFromBicep: PrivateLinkServiceConnectionStateInput =
  {
    actionsRequired: "string",
    description: "string",
    status: "Approved",
  };

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub/replicas -> ReplicaPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub/replicas?pivots=deployment-language-bicep
export const replicaPropertiesWebpubsubReplicas0dd86db97b2add8bda05FromBicep: ReplicaPropertiesInput =
  {
    regionEndpointEnabled: "string",
    resourceStopped: "string",
  };

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub -> ResourceLogCategoryInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub?pivots=deployment-language-bicep
export const resourceLogCategoryWebpubsub57c1e19f93a97767b452FromBicep: ResourceLogCategoryInput = {
  enabled: "string",
  name: "string",
};

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub -> ResourceLogConfigurationInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub?pivots=deployment-language-bicep
export const resourceLogConfigurationWebpubsub57c1e19f93a817101acfFromBicep: ResourceLogConfigurationInput =
  {
    categories: [],
  };

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub/customDomains -> ResourceReferenceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub/customdomains?pivots=deployment-language-bicep
export const resourceReferenceWebpubsubCustomdomains67b4c1c5d35c6b38093fFromBicep: ResourceReferenceInput =
  {
    id: "string",
  };

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub/hubs -> ResourceReferenceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub/hubs?pivots=deployment-language-bicep
export const resourceReferenceWebpubsubHubs64ecbb55d8f5531329d5FromBicep: ResourceReferenceInput = {
  id: "string",
};

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub/persistentStorages -> ResourceReferenceInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub/persistentstorages?pivots=deployment-language-bicep
export const resourceReferenceWebpubsubPersistentstorages49cf19f493c50c7ffca3FromBicep: ResourceReferenceInput =
  {
    id: "string",
  };

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub -> ResourceSkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub?pivots=deployment-language-bicep
export const resourceSkuWebpubsub57c1e19f93a3221af684FromBicep: ResourceSkuInput = {
  capacity: 0,
  name: "string",
  tier: "Basic",
};

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub/replicas -> ResourceSkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub/replicas?pivots=deployment-language-bicep
export const resourceSkuWebpubsubReplicas0dd86db97bd761466e39FromBicep: ResourceSkuInput = {
  capacity: 0,
  name: "string",
  tier: "Basic",
};

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub/replicas/sharedPrivateLinkResources -> SharedPrivateLinkResourcePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub/replicas/sharedprivatelinkresources?pivots=deployment-language-bicep
export const sharedPrivateLinkResourcePropertiesWebpubsubReplicasSharedprivatelinkresources4e81917adcda4ed35864FromBicep: SharedPrivateLinkResourcePropertiesInput =
  {
    fqdns: [],
    groupId: "string",
    privateLinkResourceId: "string",
    requestMessage: "string",
  };

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub/sharedPrivateLinkResources -> SharedPrivateLinkResourcePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub/sharedprivatelinkresources?pivots=deployment-language-bicep
export const sharedPrivateLinkResourcePropertiesWebpubsubSharedprivatelinkresourcescb55118d0410653e5859FromBicep: SharedPrivateLinkResourcePropertiesInput =
  {
    fqdns: [],
    groupId: "string",
    privateLinkResourceId: "string",
    requestMessage: "string",
  };

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub/hubs -> UpstreamAuthSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub/hubs?pivots=deployment-language-bicep
export const upstreamAuthSettingsWebpubsubHubs64ecbb55d84adf542a30FromBicep: UpstreamAuthSettingsInput =
  {
    type: "ManagedIdentity",
  };

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub/hubs -> WebPubSubHubPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub/hubs?pivots=deployment-language-bicep
export const webPubSubHubPropertiesWebpubsubHubs64ecbb55d88c9a69e004FromBicep: WebPubSubHubPropertiesInput =
  {
    anonymousConnectPolicy: "string",
    eventHandlers: [],
    eventListeners: [],
    webSocketKeepAliveIntervalInSeconds: 0,
  };

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub -> WebPubSubPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub?pivots=deployment-language-bicep
export const webPubSubPropertiesWebpubsub57c1e19f93dba62dc8c9FromBicep: WebPubSubPropertiesInput = {
  disableAadAuth: true,
  disableLocalAuth: true,
  publicNetworkAccess: "string",
  regionEndpointEnabled: "string",
  resourceStopped: "string",
};

// Accepted Bicep contract: Microsoft.SignalRService/webPubSub -> WebPubSubTlsSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub?pivots=deployment-language-bicep
export const webPubSubTlsSettingsWebpubsub57c1e19f93f71eb5e59fFromBicep: WebPubSubTlsSettingsInput =
  {
    clientCertEnabled: true,
  };

// Bicep baseline: Microsoft.SignalRService/webPubSub.properties.networkACLs (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub?pivots=deployment-language-bicep
// provisioning input: WebPubSubPropertiesInput.networkACLs
export const webPubSubPropertiesWithNetworkACLsWebpubsub57c1e19f9315b8fd4388FromBicep: WebPubSubPropertiesInput =
  {
    networkAcLs: {},
  };

// Bicep baseline: Microsoft.SignalRService/webPubSub.properties.socketIO (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.signalrservice/2025-12-01-preview/webpubsub?pivots=deployment-language-bicep
// provisioning input: WebPubSubPropertiesInput.socketIO
export const webPubSubPropertiesWithSocketIOWebpubsub57c1e19f93ef3c406fecFromBicep: WebPubSubPropertiesInput =
  {
    socketIo: {},
  };
