// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and (de)serializers.
 * Disable this rule for deserializer functions which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Schema of the data property of an EventGridEvent for a Microsoft.ApiCenter.ApiDefinitionAdded event. */
export interface ApiCenterApiDefinitionAddedEventData {
  /** API definition title. */
  title: string;
  /** API definition description. */
  description?: string;
  /** API definition specification. */
  specification?: ApiCenterApiSpecification;
}

export function apiCenterApiDefinitionAddedEventDataDeserializer(
  item: any,
): ApiCenterApiDefinitionAddedEventData {
  return {
    title: item["title"],
    description: item["description"],
    specification: !item["specification"]
      ? item["specification"]
      : apiCenterApiSpecificationDeserializer(item["specification"]),
  };
}

/** API specification details. */
export interface ApiCenterApiSpecification {
  /** Specification name. */
  name: string;
  /** Specification version. */
  version?: string;
}

export function apiCenterApiSpecificationDeserializer(item: any): ApiCenterApiSpecification {
  return {
    name: item["name"],
    version: item["version"],
  };
}

/** Schema of the data property of an EventGridEvent for a Microsoft.ApiCenter.ApiDefinitionUpdated event. */
export interface ApiCenterApiDefinitionUpdatedEventData {
  /** API definition title. */
  title: string;
  /** API definition description. */
  description?: string;
  /** API definition specification. */
  specification?: ApiCenterApiSpecification;
}

export function apiCenterApiDefinitionUpdatedEventDataDeserializer(
  item: any,
): ApiCenterApiDefinitionUpdatedEventData {
  return {
    title: item["title"],
    description: item["description"],
    specification: !item["specification"]
      ? item["specification"]
      : apiCenterApiSpecificationDeserializer(item["specification"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.UserCreated event. */
export interface ApiManagementUserCreatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementUserCreatedEventDataDeserializer(
  item: any,
): ApiManagementUserCreatedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.UserUpdated event. */
export interface ApiManagementUserUpdatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementUserUpdatedEventDataDeserializer(
  item: any,
): ApiManagementUserUpdatedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.UserDeleted event. */
export interface ApiManagementUserDeletedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementUserDeletedEventDataDeserializer(
  item: any,
): ApiManagementUserDeletedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.SubscriptionCreated event. */
export interface ApiManagementSubscriptionCreatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementSubscriptionCreatedEventDataDeserializer(
  item: any,
): ApiManagementSubscriptionCreatedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.SubscriptionUpdated event. */
export interface ApiManagementSubscriptionUpdatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementSubscriptionUpdatedEventDataDeserializer(
  item: any,
): ApiManagementSubscriptionUpdatedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.SubscriptionDeleted event. */
export interface ApiManagementSubscriptionDeletedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementSubscriptionDeletedEventDataDeserializer(
  item: any,
): ApiManagementSubscriptionDeletedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.ProductCreated event. */
export interface ApiManagementProductCreatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementProductCreatedEventDataDeserializer(
  item: any,
): ApiManagementProductCreatedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.ProductUpdated event. */
export interface ApiManagementProductUpdatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementProductUpdatedEventDataDeserializer(
  item: any,
): ApiManagementProductUpdatedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.ProductDeleted event. */
export interface ApiManagementProductDeletedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementProductDeletedEventDataDeserializer(
  item: any,
): ApiManagementProductDeletedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.APICreated event. */
export interface ApiManagementApiCreatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementApiCreatedEventDataDeserializer(
  item: any,
): ApiManagementApiCreatedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.APIUpdated event. */
export interface ApiManagementApiUpdatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementApiUpdatedEventDataDeserializer(
  item: any,
): ApiManagementApiUpdatedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.APIDeleted event. */
export interface ApiManagementApiDeletedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementApiDeletedEventDataDeserializer(
  item: any,
): ApiManagementApiDeletedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.APIReleaseCreated event. */
export interface ApiManagementApiReleaseCreatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementApiReleaseCreatedEventDataDeserializer(
  item: any,
): ApiManagementApiReleaseCreatedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.APIReleaseUpdated event. */
export interface ApiManagementApiReleaseUpdatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementApiReleaseUpdatedEventDataDeserializer(
  item: any,
): ApiManagementApiReleaseUpdatedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.APIReleaseDeleted event. */
export interface ApiManagementApiReleaseDeletedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/<ResourceType>/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementApiReleaseDeletedEventDataDeserializer(
  item: any,
): ApiManagementApiReleaseDeletedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayCreated event. */
export interface ApiManagementGatewayCreatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementGatewayCreatedEventDataDeserializer(
  item: any,
): ApiManagementGatewayCreatedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayUpdated event. */
export interface ApiManagementGatewayUpdatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementGatewayUpdatedEventDataDeserializer(
  item: any,
): ApiManagementGatewayUpdatedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayDeleted event. */
export interface ApiManagementGatewayDeletedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementGatewayDeletedEventDataDeserializer(
  item: any,
): ApiManagementGatewayDeletedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayHostnameConfigurationCreated event. */
export interface ApiManagementGatewayHostnameConfigurationCreatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<GatewayName>/hostnameConfigurations/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementGatewayHostnameConfigurationCreatedEventDataDeserializer(
  item: any,
): ApiManagementGatewayHostnameConfigurationCreatedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayHostnameConfigurationUpdated event. */
export interface ApiManagementGatewayHostnameConfigurationUpdatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<GatewayName>/hostnameConfigurations/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementGatewayHostnameConfigurationUpdatedEventDataDeserializer(
  item: any,
): ApiManagementGatewayHostnameConfigurationUpdatedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayHostnameConfigurationDeleted event. */
export interface ApiManagementGatewayHostnameConfigurationDeletedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<GatewayName>/hostnameConfigurations/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementGatewayHostnameConfigurationDeletedEventDataDeserializer(
  item: any,
): ApiManagementGatewayHostnameConfigurationDeletedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayCertificateAuthorityCreated event. */
export interface ApiManagementGatewayCertificateAuthorityCreatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<GatewayName>/certificateAuthorities/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementGatewayCertificateAuthorityCreatedEventDataDeserializer(
  item: any,
): ApiManagementGatewayCertificateAuthorityCreatedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayCertificateAuthorityUpdated event. */
export interface ApiManagementGatewayCertificateAuthorityUpdatedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<GatewayName>/certificateAuthorities/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementGatewayCertificateAuthorityUpdatedEventDataDeserializer(
  item: any,
): ApiManagementGatewayCertificateAuthorityUpdatedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayCertificateAuthorityDeleted event. */
export interface ApiManagementGatewayCertificateAuthorityDeletedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<GatewayName>/certificateAuthorities/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementGatewayCertificateAuthorityDeletedEventDataDeserializer(
  item: any,
): ApiManagementGatewayCertificateAuthorityDeletedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayAPIAdded event. */
export interface ApiManagementGatewayApiAddedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<GatewayName>/apis/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementGatewayApiAddedEventDataDeserializer(
  item: any,
): ApiManagementGatewayApiAddedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayAPIRemoved event. */
export interface ApiManagementGatewayApiRemovedEventData {
  /** The fully qualified ID of the resource that the compliance state change is for, including the resource name and resource type. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateways/<GatewayName>/apis/<ResourceName>` */
  resourceUrl?: string;
}

export function apiManagementGatewayApiRemovedEventDataDeserializer(
  item: any,
): ApiManagementGatewayApiRemovedEventData {
  return {
    resourceUrl: item["resourceUri"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.CircuitBreaker.Opened event. */
export interface ApiManagementCircuitBreakerOpenedEventData {
  /** Name of the backend for which the circuit has opened. */
  backendName: string;
  /** Information related to the circuit breaker configured on the backend. */
  circuitBreaker: ApiManagementCircuitBreaker;
}

export function apiManagementCircuitBreakerOpenedEventDataDeserializer(
  item: any,
): ApiManagementCircuitBreakerOpenedEventData {
  return {
    backendName: item["backendName"],
    circuitBreaker: apiManagementCircuitBreakerDeserializer(item["circuitBreaker"]),
  };
}

/** Information related to the circuit breaker configured on the backend. */
export interface ApiManagementCircuitBreaker {
  /** Overview of all configured rules and respective details. */
  rules: Record<string, Record<string, any>>;
}

export function apiManagementCircuitBreakerDeserializer(item: any): ApiManagementCircuitBreaker {
  return {
    rules: item["rules"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.CircuitBreaker.Closed event. */
export interface ApiManagementCircuitBreakerClosedEventData {
  /** Name of the backend for which the circuit has closed. */
  backendName: string;
  /** Information related to the circuit breaker configured on the backend. */
  circuitBreaker: ApiManagementCircuitBreaker;
}

export function apiManagementCircuitBreakerClosedEventDataDeserializer(
  item: any,
): ApiManagementCircuitBreakerClosedEventData {
  return {
    backendName: item["backendName"],
    circuitBreaker: apiManagementCircuitBreakerDeserializer(item["circuitBreaker"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayTokenNearExpiry event. */
export interface ApiManagementGatewayTokenNearExpiryEventData {
  /** Information related to a given self-hosted gateway deployment. */
  gateway: ApiManagementGateway;
  /** Information related to a an expired gateway token for a self-hosted gateway deployment. */
  token: ApiManagementNearExpiryGatewayToken;
}

export function apiManagementGatewayTokenNearExpiryEventDataDeserializer(
  item: any,
): ApiManagementGatewayTokenNearExpiryEventData {
  return {
    gateway: apiManagementGatewayDeserializer(item["gatewayInfo"]),
    token: apiManagementNearExpiryGatewayTokenDeserializer(item["tokenInfo"]),
  };
}

/** Information related to a given self-hosted gateway deployment. */
export interface ApiManagementGateway {
  /** Id of Gateway that is used to deploy the gateway to get the configuration for. This is the ARM resource ID referenced in the Azure API Management instance. Uses the format, `/subscriptions/<SubscriptionID>/resourceGroups/<ResourceGroup>/Microsoft.ApiManagement/service/<ServiceName>/gateway/<GatewayName>` */
  gatewayId: string;
  /** Unique instance ID of the deployed gateway */
  instanceId: string;
}

export function apiManagementGatewayDeserializer(item: any): ApiManagementGateway {
  return {
    gatewayId: item["gatewayId"],
    instanceId: item["instanceId"],
  };
}

/** Information related to a gateway token that is near expiry for a self-hosted gateway deployment. */
export interface ApiManagementNearExpiryGatewayToken {
  /** Timestamp when the gateway token will expire. */
  expiresOn: Date;
}

export function apiManagementNearExpiryGatewayTokenDeserializer(
  item: any,
): ApiManagementNearExpiryGatewayToken {
  return {
    expiresOn: new Date(item["expiredAtUtc"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ApiManagement.GatewayTokenExpired event. */
export interface ApiManagementGatewayTokenExpiredEventData {
  /** Information related to a given self-hosted gateway deployment. */
  gateway: ApiManagementGateway;
  /** Information related to a an expired gateway token for a self-hosted gateway deployment. */
  token: ApiManagementExpiredGatewayToken;
}

export function apiManagementGatewayTokenExpiredEventDataDeserializer(
  item: any,
): ApiManagementGatewayTokenExpiredEventData {
  return {
    gateway: apiManagementGatewayDeserializer(item["gatewayInfo"]),
    token: apiManagementExpiredGatewayTokenDeserializer(item["tokenInfo"]),
  };
}

/** Information related to a gateway token that has expired for a self-hosted gateway deployment. */
export interface ApiManagementExpiredGatewayToken {
  /** Timestamp when the gateway token has expired. */
  expiresOn: Date;
}

export function apiManagementExpiredGatewayTokenDeserializer(
  item: any,
): ApiManagementExpiredGatewayToken {
  return {
    expiresOn: new Date(item["expiredAtUtc"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AppConfiguration.KeyValueModified event. */
export interface AppConfigurationKeyValueModifiedEventData {
  /** The key used to identify the key-value that was modified. */
  key: string;
  /** The label, if any, used to identify the key-value that was modified. */
  label: string | null;
  /** The etag representing the new state of the key-value. */
  etag: string;
  /** The sync token representing the server state after the event. */
  syncToken: string;
}

export function appConfigurationKeyValueModifiedEventDataDeserializer(
  item: any,
): AppConfigurationKeyValueModifiedEventData {
  return {
    key: item["key"],
    label: item["label"],
    etag: item["etag"],
    syncToken: item["syncToken"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AppConfiguration.KeyValueDeleted event. */
export interface AppConfigurationKeyValueDeletedEventData {
  /** The key used to identify the key-value that was deleted. */
  key: string;
  /** The label, if any, used to identify the key-value that was deleted. */
  label: string;
  /** The etag representing the key-value that was deleted. */
  etag: string;
  /** The sync token representing the server state after the event. */
  syncToken: string;
}

export function appConfigurationKeyValueDeletedEventDataDeserializer(
  item: any,
): AppConfigurationKeyValueDeletedEventData {
  return {
    key: item["key"],
    label: item["label"],
    etag: item["etag"],
    syncToken: item["syncToken"],
  };
}

/** Schema of common properties of snapshot events */
export interface AppConfigurationSnapshotEventData {
  /** The name of the snapshot. */
  name: string;
  /** The etag representing the new state of the snapshot. */
  etag: string;
  /** The sync token representing the server state after the event. */
  syncToken: string;
}

export function appConfigurationSnapshotEventDataDeserializer(
  item: any,
): AppConfigurationSnapshotEventData {
  return {
    name: item["name"],
    etag: item["etag"],
    syncToken: item["syncToken"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AppConfiguration.SnapshotCreated event. */
export interface AppConfigurationSnapshotCreatedEventData extends AppConfigurationSnapshotEventData {}

export function appConfigurationSnapshotCreatedEventDataDeserializer(
  item: any,
): AppConfigurationSnapshotCreatedEventData {
  return {
    name: item["name"],
    etag: item["etag"],
    syncToken: item["syncToken"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AppConfiguration.SnapshotModified event. */
export interface AppConfigurationSnapshotModifiedEventData extends AppConfigurationSnapshotEventData {}

export function appConfigurationSnapshotModifiedEventDataDeserializer(
  item: any,
): AppConfigurationSnapshotModifiedEventData {
  return {
    name: item["name"],
    etag: item["etag"],
    syncToken: item["syncToken"],
  };
}

/** Schema of the Data property of an EventGridEvent for Microsoft.AVS/privateClouds events. */
export interface AvsPrivateCloudEventData {
  /** Id of the operation that caused this event. */
  operationId: string;
}

export function avsPrivateCloudEventDataDeserializer(item: any): AvsPrivateCloudEventData {
  return {
    operationId: item["operationId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.PrivateCloudUpdating event. */
export interface AvsPrivateCloudUpdatingEventData extends AvsPrivateCloudEventData {}

export function avsPrivateCloudUpdatingEventDataDeserializer(
  item: any,
): AvsPrivateCloudUpdatingEventData {
  return {
    operationId: item["operationId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.PrivateCloudUpdated event. */
export interface AvsPrivateCloudUpdatedEventData extends AvsPrivateCloudEventData {}

export function avsPrivateCloudUpdatedEventDataDeserializer(
  item: any,
): AvsPrivateCloudUpdatedEventData {
  return {
    operationId: item["operationId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.PrivateCloudFailed event. */
export interface AvsPrivateCloudFailedEventData extends AvsPrivateCloudEventData {
  /** Failure reason of an event. */
  failureMessage?: string;
}

export function avsPrivateCloudFailedEventDataDeserializer(
  item: any,
): AvsPrivateCloudFailedEventData {
  return {
    operationId: item["operationId"],
    failureMessage: item["failureMessage"],
  };
}

/** Schema of the Data property of an EventGridEvent for Microsoft.AVS/clusters events. */
export interface AvsClusterEventData {
  /** Id of the operation that caused this event. */
  operationId: string;
  /** Hosts added to the cluster in this event, if any. */
  readonly addedHostNames?: string[];
  /** Hosts removed from the cluster in this event, if any. */
  readonly removedHostNames?: string[];
  /** Hosts in Maintenance mode in the cluster, if any. */
  readonly inMaintenanceHostNames?: string[];
}

export function avsClusterEventDataDeserializer(item: any): AvsClusterEventData {
  return {
    operationId: item["operationId"],
    addedHostNames: !item["addedHostNames"]
      ? item["addedHostNames"]
      : item["addedHostNames"].map((p: any) => {
          return p;
        }),
    removedHostNames: !item["removedHostNames"]
      ? item["removedHostNames"]
      : item["removedHostNames"].map((p: any) => {
          return p;
        }),
    inMaintenanceHostNames: !item["inMaintenanceHostNames"]
      ? item["inMaintenanceHostNames"]
      : item["inMaintenanceHostNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ClusterCreated event. */
export interface AvsClusterCreatedEventData extends AvsClusterEventData {}

export function avsClusterCreatedEventDataDeserializer(item: any): AvsClusterCreatedEventData {
  return {
    operationId: item["operationId"],
    addedHostNames: !item["addedHostNames"]
      ? item["addedHostNames"]
      : item["addedHostNames"].map((p: any) => {
          return p;
        }),
    removedHostNames: !item["removedHostNames"]
      ? item["removedHostNames"]
      : item["removedHostNames"].map((p: any) => {
          return p;
        }),
    inMaintenanceHostNames: !item["inMaintenanceHostNames"]
      ? item["inMaintenanceHostNames"]
      : item["inMaintenanceHostNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ClusterDeleted event. */
export interface AvsClusterDeletedEventData extends AvsClusterEventData {}

export function avsClusterDeletedEventDataDeserializer(item: any): AvsClusterDeletedEventData {
  return {
    operationId: item["operationId"],
    addedHostNames: !item["addedHostNames"]
      ? item["addedHostNames"]
      : item["addedHostNames"].map((p: any) => {
          return p;
        }),
    removedHostNames: !item["removedHostNames"]
      ? item["removedHostNames"]
      : item["removedHostNames"].map((p: any) => {
          return p;
        }),
    inMaintenanceHostNames: !item["inMaintenanceHostNames"]
      ? item["inMaintenanceHostNames"]
      : item["inMaintenanceHostNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ClusterUpdating event. */
export interface AvsClusterUpdatingEventData extends AvsClusterEventData {}

export function avsClusterUpdatingEventDataDeserializer(item: any): AvsClusterUpdatingEventData {
  return {
    operationId: item["operationId"],
    addedHostNames: !item["addedHostNames"]
      ? item["addedHostNames"]
      : item["addedHostNames"].map((p: any) => {
          return p;
        }),
    removedHostNames: !item["removedHostNames"]
      ? item["removedHostNames"]
      : item["removedHostNames"].map((p: any) => {
          return p;
        }),
    inMaintenanceHostNames: !item["inMaintenanceHostNames"]
      ? item["inMaintenanceHostNames"]
      : item["inMaintenanceHostNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ClusterUpdated event. */
export interface AvsClusterUpdatedEventData extends AvsClusterEventData {}

export function avsClusterUpdatedEventDataDeserializer(item: any): AvsClusterUpdatedEventData {
  return {
    operationId: item["operationId"],
    addedHostNames: !item["addedHostNames"]
      ? item["addedHostNames"]
      : item["addedHostNames"].map((p: any) => {
          return p;
        }),
    removedHostNames: !item["removedHostNames"]
      ? item["removedHostNames"]
      : item["removedHostNames"].map((p: any) => {
          return p;
        }),
    inMaintenanceHostNames: !item["inMaintenanceHostNames"]
      ? item["inMaintenanceHostNames"]
      : item["inMaintenanceHostNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ClusterFailed event. */
export interface AvsClusterFailedEventData extends AvsClusterEventData {
  /** Failure reason of an event. */
  failureMessage?: string;
}

export function avsClusterFailedEventDataDeserializer(item: any): AvsClusterFailedEventData {
  return {
    operationId: item["operationId"],
    addedHostNames: !item["addedHostNames"]
      ? item["addedHostNames"]
      : item["addedHostNames"].map((p: any) => {
          return p;
        }),
    removedHostNames: !item["removedHostNames"]
      ? item["removedHostNames"]
      : item["removedHostNames"].map((p: any) => {
          return p;
        }),
    inMaintenanceHostNames: !item["inMaintenanceHostNames"]
      ? item["inMaintenanceHostNames"]
      : item["inMaintenanceHostNames"].map((p: any) => {
          return p;
        }),
    failureMessage: item["failureMessage"],
  };
}

/** Schema of the Data property of an EventGridEvent for Microsoft.AVS/scriptExecutions events. */
export interface AvsScriptExecutionEventData {
  /** Id of the operation that caused this event. */
  operationId: string;
  /** Cmdlet referenced in the execution that caused this event. */
  cmdletId: string;
  /** Stdout outputs from the execution, if any. */
  readonly output?: string[];
}

export function avsScriptExecutionEventDataDeserializer(item: any): AvsScriptExecutionEventData {
  return {
    operationId: item["operationId"],
    cmdletId: item["cmdletId"],
    output: !item["output"]
      ? item["output"]
      : item["output"].map((p: any) => {
          return p;
        }),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ScriptExecutionStarted event. */
export interface AvsScriptExecutionStartedEventData extends AvsScriptExecutionEventData {}

export function avsScriptExecutionStartedEventDataDeserializer(
  item: any,
): AvsScriptExecutionStartedEventData {
  return {
    operationId: item["operationId"],
    cmdletId: item["cmdletId"],
    output: !item["output"]
      ? item["output"]
      : item["output"].map((p: any) => {
          return p;
        }),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ScriptExecutionFinished event. */
export interface AvsScriptExecutionFinishedEventData extends AvsScriptExecutionEventData {
  /** Named outputs of completed execution, if any. */
  readonly namedOutputs: Record<string, string>;
}

export function avsScriptExecutionFinishedEventDataDeserializer(
  item: any,
): AvsScriptExecutionFinishedEventData {
  return {
    operationId: item["operationId"],
    cmdletId: item["cmdletId"],
    output: !item["output"]
      ? item["output"]
      : item["output"].map((p: any) => {
          return p;
        }),
    namedOutputs: item["namedOutputs"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ScriptExecutionCancelled event. */
export interface AvsScriptExecutionCancelledEventData extends AvsScriptExecutionEventData {}

export function avsScriptExecutionCancelledEventDataDeserializer(
  item: any,
): AvsScriptExecutionCancelledEventData {
  return {
    operationId: item["operationId"],
    cmdletId: item["cmdletId"],
    output: !item["output"]
      ? item["output"]
      : item["output"].map((p: any) => {
          return p;
        }),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.AVS.ScriptExecutionFailed event. */
export interface AvsScriptExecutionFailedEventData extends AvsScriptExecutionEventData {
  /** Failure reason of an event. */
  failureMessage?: string;
}

export function avsScriptExecutionFailedEventDataDeserializer(
  item: any,
): AvsScriptExecutionFailedEventData {
  return {
    operationId: item["operationId"],
    cmdletId: item["cmdletId"],
    output: !item["output"]
      ? item["output"]
      : item["output"].map((p: any) => {
          return p;
        }),
    failureMessage: item["failureMessage"],
  };
}

/** Schema of the Data property of an EventGridEvent for an Microsoft.Communication.IncomingCall event */
export interface AcsIncomingCallEventData {
  /** The communication identifier of the target user. */
  toCommunicationIdentifier: CommunicationIdentifierModel;
  /** The communication identifier of the user who initiated the call. */
  fromCommunicationIdentifier: CommunicationIdentifierModel;
  /** The Id of the server call */
  serverCallId?: string;
  /** Display name of caller. */
  callerDisplayName?: string;
  /** Custom Context of Incoming Call */
  customContext: AcsIncomingCallCustomContext;
  /** Signed incoming call context. */
  incomingCallContext?: string;
  /** The communication identifier of the user on behalf of whom the call is made. */
  onBehalfOfCallee?: CommunicationIdentifierModel;
  /** CorrelationId (CallId). */
  correlationId?: string;
}

export function acsIncomingCallEventDataDeserializer(item: any): AcsIncomingCallEventData {
  return {
    toCommunicationIdentifier: communicationIdentifierModelDeserializer(item["to"]),
    fromCommunicationIdentifier: communicationIdentifierModelDeserializer(item["from"]),
    serverCallId: item["serverCallId"],
    callerDisplayName: item["callerDisplayName"],
    customContext: acsIncomingCallCustomContextDeserializer(item["customContext"]),
    incomingCallContext: item["incomingCallContext"],
    onBehalfOfCallee: !item["onBehalfOfCallee"]
      ? item["onBehalfOfCallee"]
      : communicationIdentifierModelDeserializer(item["onBehalfOfCallee"]),
    correlationId: item["correlationId"],
  };
}

/** Identifies a participant in Azure Communication services. A participant is, for example, a phone number or an Azure communication user. This model must be interpreted as a union: Apart from rawId, at most one further property may be set. */
export interface CommunicationIdentifierModel {
  /** The identifier kind. Only required in responses. */
  kind?: CommunicationIdentifierModelKind;
  /** Raw Id of the identifier. Optional in requests, required in responses. */
  rawId: string;
  /** The communication user. */
  communicationUser: CommunicationUserIdentifierModel;
  /** The phone number. */
  phoneNumber?: PhoneNumberIdentifierModel;
  /** The Microsoft Teams user. */
  microsoftTeamsUser?: MicrosoftTeamsUserIdentifierModel;
  /** The Microsoft Teams application. */
  microsoftTeamsApp?: MicrosoftTeamsAppIdentifierModel;
}

export function communicationIdentifierModelDeserializer(item: any): CommunicationIdentifierModel {
  return {
    kind: item["kind"],
    rawId: item["rawId"],
    communicationUser: communicationUserIdentifierModelDeserializer(item["communicationUser"]),
    phoneNumber: !item["phoneNumber"]
      ? item["phoneNumber"]
      : phoneNumberIdentifierModelDeserializer(item["phoneNumber"]),
    microsoftTeamsUser: !item["microsoftTeamsUser"]
      ? item["microsoftTeamsUser"]
      : microsoftTeamsUserIdentifierModelDeserializer(item["microsoftTeamsUser"]),
    microsoftTeamsApp: !item["microsoftTeamsApp"]
      ? item["microsoftTeamsApp"]
      : microsoftTeamsAppIdentifierModelDeserializer(item["microsoftTeamsApp"]),
  };
}

/** Communication model identifier kind */
export enum KnownCommunicationIdentifierModelKind {
  /** Unknown */
  Unknown = "unknown",
  /** Communication User */
  CommunicationUser = "communicationUser",
  /** Phone Number */
  PhoneNumber = "phoneNumber",
  /** Microsoft Teams User */
  MicrosoftTeamsUser = "microsoftTeamsUser",
  /** Microsoft Teams App */
  MicrosoftTeamsApp = "microsoftTeamsApp",
}

/**
 * Communication model identifier kind \
 * {@link KnownCommunicationIdentifierModelKind} can be used interchangeably with CommunicationIdentifierModelKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **unknown**: Unknown \
 * **communicationUser**: Communication User \
 * **phoneNumber**: Phone Number \
 * **microsoftTeamsUser**: Microsoft Teams User \
 * **microsoftTeamsApp**: Microsoft Teams App
 */
export type CommunicationIdentifierModelKind = string;

/** A user that got created with an Azure Communication Services resource. */
export interface CommunicationUserIdentifierModel {
  /** The Id of the communication user. */
  id: string;
}

export function communicationUserIdentifierModelDeserializer(
  item: any,
): CommunicationUserIdentifierModel {
  return {
    id: item["id"],
  };
}

/** A phone number. */
export interface PhoneNumberIdentifierModel {
  /** The phone number in E.164 format. */
  value: string;
}

export function phoneNumberIdentifierModelDeserializer(item: any): PhoneNumberIdentifierModel {
  return {
    value: item["value"],
  };
}

/** A Microsoft Teams user. */
export interface MicrosoftTeamsUserIdentifierModel {
  /** The Id of the Microsoft Teams user. If not anonymous, this is the AAD object Id of the user. */
  userId: string;
  /** True if the Microsoft Teams user is anonymous. By default false if missing. */
  isAnonymous?: boolean;
  /** The cloud that the Microsoft Teams user belongs to. By default 'public' if missing. */
  cloud: CommunicationCloudEnvironmentModel;
}

export function microsoftTeamsUserIdentifierModelDeserializer(
  item: any,
): MicrosoftTeamsUserIdentifierModel {
  return {
    userId: item["userId"],
    isAnonymous: item["isAnonymous"],
    cloud: item["cloud"],
  };
}

/** Communication cloud environment model. */
export enum KnownCommunicationCloudEnvironmentModel {
  /** Public */
  Public = "public",
  /** Dod */
  Dod = "dod",
  /** Gcch */
  Gcch = "gcch",
}

/**
 * Communication cloud environment model. \
 * {@link KnownCommunicationCloudEnvironmentModel} can be used interchangeably with CommunicationCloudEnvironmentModel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **public**: Public \
 * **dod**: Dod \
 * **gcch**: Gcch
 */
export type CommunicationCloudEnvironmentModel = string;

/** A Microsoft Teams application. */
export interface MicrosoftTeamsAppIdentifierModel {
  /** The Id of the Microsoft Teams application */
  appId: string;
  /** The cloud that the Microsoft Teams application belongs to. By default 'public' if missing. */
  cloud: CommunicationCloudEnvironmentModel;
}

export function microsoftTeamsAppIdentifierModelDeserializer(
  item: any,
): MicrosoftTeamsAppIdentifierModel {
  return {
    appId: item["appId"],
    cloud: item["cloud"],
  };
}

/** Custom Context of Incoming Call */
export interface AcsIncomingCallCustomContext {
  /** Sip Headers for incoming call */
  readonly sipHeaders: Record<string, string>;
  /** Voip Headers for incoming call */
  readonly voipHeaders: Record<string, string>;
}

export function acsIncomingCallCustomContextDeserializer(item: any): AcsIncomingCallCustomContext {
  return {
    sipHeaders: item["sipHeaders"],
    voipHeaders: item["voipHeaders"],
  };
}

/** Schema of the Data property of an EventGridEvent for an Microsoft.Communication.UserDisconnected event. */
export interface AcsUserDisconnectedEventData {
  /** The communication identifier of the user who was disconnected */
  userCommunicationIdentifier: CommunicationIdentifierModel;
}

export function acsUserDisconnectedEventDataDeserializer(item: any): AcsUserDisconnectedEventData {
  return {
    userCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["userCommunicationIdentifier"],
    ),
  };
}

/** Schema of common properties of all calling events */
export interface AcsCallingEvent {
  /** The call participant who initiated the call. */
  startedBy: AcsCallParticipant;
  /** The call id of the server */
  serverCallId: string;
  /** The group metadata */
  group?: AcsCallGroup;
  /** The room metadata */
  room?: AcsCallRoom;
  /** Is two-party in calling event. */
  isTwoParty?: boolean;
  /** The correlationId of calling event */
  correlationId: string;
  /** Is the calling event a room call. */
  isRoomsCall?: boolean;
}

export function acsCallingEventDeserializer(item: any): AcsCallingEvent {
  return {
    startedBy: acsCallParticipantDeserializer(item["startedBy"]),
    serverCallId: item["serverCallId"],
    group: !item["group"] ? item["group"] : acsCallGroupDeserializer(item["group"]),
    room: !item["room"] ? item["room"] : acsCallRoomDeserializer(item["room"]),
    isTwoParty: item["isTwoParty"],
    correlationId: item["correlationId"],
    isRoomsCall: item["isRoomsCall"],
  };
}

/** Schema of common properties of all participant event user */
export interface AcsCallParticipant {
  /** The communication identifier of the participant user */
  communicationIdentifier?: CommunicationIdentifierModel;
  /** The role of the participant */
  role?: AcsCallParticipantKind;
}

export function acsCallParticipantDeserializer(item: any): AcsCallParticipant {
  return {
    communicationIdentifier: !item["communicationIdentifier"]
      ? item["communicationIdentifier"]
      : communicationIdentifierModelDeserializer(item["communicationIdentifier"]),
    role: item["role"],
  };
}

/** Call participant kind. */
export enum KnownAcsCallParticipantKind {
  /** Attendee */
  Attendee = "Attendee",
  /** Presenter */
  Presenter = "Presenter",
  /** Organizer */
  Organizer = "Organizer",
  /** Consumer */
  Consumer = "Consumer",
  /** Collaborator */
  Collaborator = "Collaborator",
}

/**
 * Call participant kind. \
 * {@link KnownAcsCallParticipantKind} can be used interchangeably with AcsCallParticipantKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Attendee**: Attendee \
 * **Presenter**: Presenter \
 * **Organizer**: Organizer \
 * **Consumer**: Consumer \
 * **Collaborator**: Collaborator
 */
export type AcsCallParticipantKind = string;

/** Schema of calling event group properties */
export interface AcsCallGroup {
  /** Group Id. */
  id?: string;
}

export function acsCallGroupDeserializer(item: any): AcsCallGroup {
  return {
    id: item["id"],
  };
}

/** Schema of calling event room properties */
export interface AcsCallRoom {
  /** Room Id. */
  id?: string;
}

export function acsCallRoomDeserializer(item: any): AcsCallRoom {
  return {
    id: item["id"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.CallStarted event. */
export interface AcsCallStartedEventData extends AcsCallingEvent {}

export function acsCallStartedEventDataDeserializer(item: any): AcsCallStartedEventData {
  return {
    startedBy: acsCallParticipantDeserializer(item["startedBy"]),
    serverCallId: item["serverCallId"],
    group: !item["group"] ? item["group"] : acsCallGroupDeserializer(item["group"]),
    room: !item["room"] ? item["room"] : acsCallRoomDeserializer(item["room"]),
    isTwoParty: item["isTwoParty"],
    correlationId: item["correlationId"],
    isRoomsCall: item["isRoomsCall"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.CallEnded event. */
export interface AcsCallEndedEventData extends AcsCallingEvent {
  /** The communication identifier of the user who was disconnected */
  endedBy?: AcsCallEndedBy;
  /** The reason for ending the call. */
  reason?: AcsCallEndReason;
  /** Duration of the call in seconds. */
  callDurationInSeconds?: number;
}

export function acsCallEndedEventDataDeserializer(item: any): AcsCallEndedEventData {
  return {
    startedBy: acsCallParticipantDeserializer(item["startedBy"]),
    serverCallId: item["serverCallId"],
    group: !item["group"] ? item["group"] : acsCallGroupDeserializer(item["group"]),
    room: !item["room"] ? item["room"] : acsCallRoomDeserializer(item["room"]),
    isTwoParty: item["isTwoParty"],
    correlationId: item["correlationId"],
    isRoomsCall: item["isRoomsCall"],
    endedBy: !item["endedBy"] ? item["endedBy"] : acsCallEndedByDeserializer(item["endedBy"]),
    reason: !item["reason"] ? item["reason"] : acsCallEndReasonDeserializer(item["reason"]),
    callDurationInSeconds: item["callDurationInSeconds"],
  };
}

/** Schema of calling event ended by properties */
export interface AcsCallEndedBy {
  /** The communication identifier of the call ended by */
  communicationIdentifier: CommunicationIdentifierModel;
  /** The type of call ended by. */
  kind: AcsCallEndedByKind;
  /** The name of the call ended by. */
  name: string;
}

export function acsCallEndedByDeserializer(item: any): AcsCallEndedBy {
  return {
    communicationIdentifier: communicationIdentifierModelDeserializer(
      item["communicationIdentifier"],
    ),
    kind: item["type"],
    name: item["name"],
  };
}

/** Call ended participant kind. */
export enum KnownAcsCallEndedByKind {
  /** Participant */
  Participant = "Participant",
  /** MicrosoftInternal */
  MicrosoftInternal = "MicrosoftInternal",
}

/**
 * Call ended participant kind. \
 * {@link KnownAcsCallEndedByKind} can be used interchangeably with AcsCallEndedByKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Participant**: Participant \
 * **MicrosoftInternal**: MicrosoftInternal
 */
export type AcsCallEndedByKind = string;

/** Schema of calling event reason properties */
export interface AcsCallEndReason {
  /** Reason code for ending the call. */
  code?: number;
  /** Reason subcode for ending the call. */
  subCode?: number;
  /** Reason for the ending the call. */
  phrase?: string;
}

export function acsCallEndReasonDeserializer(item: any): AcsCallEndReason {
  return {
    code: item["code"],
    subCode: item["subCode"],
    phrase: item["phrase"],
  };
}

/** Schema of common properties of all participant events */
export interface AcsCallParticipantEvent extends AcsCallingEvent {
  /** The user of the call participant */
  user?: AcsCallParticipant;
  /** The display name of the participant. */
  displayName?: string;
  /** The id of the participant. */
  participantId?: string;
  /** The user agent of the participant. */
  userAgent?: string;
}

export function acsCallParticipantEventDeserializer(item: any): AcsCallParticipantEvent {
  return {
    startedBy: acsCallParticipantDeserializer(item["startedBy"]),
    serverCallId: item["serverCallId"],
    group: !item["group"] ? item["group"] : acsCallGroupDeserializer(item["group"]),
    room: !item["room"] ? item["room"] : acsCallRoomDeserializer(item["room"]),
    isTwoParty: item["isTwoParty"],
    correlationId: item["correlationId"],
    isRoomsCall: item["isRoomsCall"],
    user: !item["user"] ? item["user"] : acsCallParticipantDeserializer(item["user"]),
    displayName: item["displayName"],
    participantId: item["participantId"],
    userAgent: item["userAgent"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.CallParticipantAdded event. */
export interface AcsCallParticipantAddedEventData extends AcsCallParticipantEvent {}

export function acsCallParticipantAddedEventDataDeserializer(
  item: any,
): AcsCallParticipantAddedEventData {
  return {
    user: !item["user"] ? item["user"] : acsCallParticipantDeserializer(item["user"]),
    displayName: item["displayName"],
    participantId: item["participantId"],
    userAgent: item["userAgent"],
    startedBy: acsCallParticipantDeserializer(item["startedBy"]),
    serverCallId: item["serverCallId"],
    group: !item["group"] ? item["group"] : acsCallGroupDeserializer(item["group"]),
    room: !item["room"] ? item["room"] : acsCallRoomDeserializer(item["room"]),
    isTwoParty: item["isTwoParty"],
    correlationId: item["correlationId"],
    isRoomsCall: item["isRoomsCall"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.CallParticipantRemoved event. */
export interface AcsCallParticipantRemovedEventData extends AcsCallParticipantEvent {}

export function acsCallParticipantRemovedEventDataDeserializer(
  item: any,
): AcsCallParticipantRemovedEventData {
  return {
    user: !item["user"] ? item["user"] : acsCallParticipantDeserializer(item["user"]),
    displayName: item["displayName"],
    participantId: item["participantId"],
    userAgent: item["userAgent"],
    startedBy: acsCallParticipantDeserializer(item["startedBy"]),
    serverCallId: item["serverCallId"],
    group: !item["group"] ? item["group"] : acsCallGroupDeserializer(item["group"]),
    room: !item["room"] ? item["room"] : acsCallRoomDeserializer(item["room"]),
    isTwoParty: item["isTwoParty"],
    correlationId: item["correlationId"],
    isRoomsCall: item["isRoomsCall"],
  };
}

/** Schema of common properties of all thread-level chat events */
export interface AcsChatEventInThreadBase {
  /** The transaction id will be used as co-relation vector */
  transactionId?: string;
  /** The chat thread id */
  threadId: string;
}

export function acsChatEventInThreadBaseDeserializer(item: any): AcsChatEventInThreadBase {
  return {
    transactionId: item["transactionId"],
    threadId: item["threadId"],
  };
}

/** Schema of common properties of all chat events */
export interface AcsChatEventBase {
  /** The communication identifier of the target user */
  recipientCommunicationIdentifier: CommunicationIdentifierModel;
  /** The transaction id will be used as co-relation vector */
  transactionId?: string;
  /** The chat thread id */
  threadId: string;
}

export function acsChatEventBaseDeserializer(item: any): AcsChatEventBase {
  return {
    recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["recipientCommunicationIdentifier"],
    ),
    transactionId: item["transactionId"],
    threadId: item["threadId"],
  };
}

/** Schema of common properties of all chat message events */
export interface AcsChatMessageEventBase extends AcsChatEventBase {
  /** The chat message id */
  messageId: string;
  /** The communication identifier of the sender */
  senderCommunicationIdentifier: CommunicationIdentifierModel;
  /** The display name of the sender */
  senderDisplayName?: string;
  /** The original compose time of the message */
  composeTime: Date;
  /** The type of the message */
  type: string;
  /** The version of the message */
  version: number;
}

export function acsChatMessageEventBaseDeserializer(item: any): AcsChatMessageEventBase {
  return {
    recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["recipientCommunicationIdentifier"],
    ),
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    messageId: item["messageId"],
    senderCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["senderCommunicationIdentifier"],
    ),
    senderDisplayName: item["senderDisplayName"],
    composeTime: new Date(item["composeTime"]),
    type: item["type"],
    version: item["version"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatMessageReceived event. */
export interface AcsChatMessageReceivedEventData extends AcsChatMessageEventBase {
  /** The body of the chat message */
  messageBody: string;
  /** The chat message metadata */
  readonly metadata?: Record<string, string>;
}

export function acsChatMessageReceivedEventDataDeserializer(
  item: any,
): AcsChatMessageReceivedEventData {
  return {
    messageId: item["messageId"],
    senderCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["senderCommunicationIdentifier"],
    ),
    senderDisplayName: item["senderDisplayName"],
    composeTime: new Date(item["composeTime"]),
    type: item["type"],
    version: item["version"],
    recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["recipientCommunicationIdentifier"],
    ),
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    messageBody: item["messageBody"],
    metadata: item["metadata"],
  };
}

/** Schema of common properties of all thread-level chat message events */
export interface AcsChatMessageEventInThreadBase extends AcsChatEventInThreadBase {
  /** The chat message id */
  messageId: string;
  /** The communication identifier of the sender */
  senderCommunicationIdentifier: CommunicationIdentifierModel;
  /** The display name of the sender */
  senderDisplayName?: string;
  /** The original compose time of the message */
  composeTime: Date;
  /** The type of the message */
  type: string;
  /** The version of the message */
  version: number;
}

export function acsChatMessageEventInThreadBaseDeserializer(
  item: any,
): AcsChatMessageEventInThreadBase {
  return {
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    messageId: item["messageId"],
    senderCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["senderCommunicationIdentifier"],
    ),
    senderDisplayName: item["senderDisplayName"],
    composeTime: new Date(item["composeTime"]),
    type: item["type"],
    version: item["version"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatAzureBotCommandReceivedInThread event. */
export interface AcsChatAzureBotCommandReceivedInThreadEventData extends AcsChatMessageEventInThreadBase {
  /** The body of the chat message */
  messageBody: string;
  /** The chat message metadata */
  readonly metadata?: Record<string, string>;
}

export function acsChatAzureBotCommandReceivedInThreadEventDataDeserializer(
  item: any,
): AcsChatAzureBotCommandReceivedInThreadEventData {
  return {
    messageId: item["messageId"],
    senderCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["senderCommunicationIdentifier"],
    ),
    senderDisplayName: item["senderDisplayName"],
    composeTime: new Date(item["composeTime"]),
    type: item["type"],
    version: item["version"],
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    messageBody: item["messageBody"],
    metadata: item["metadata"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatTypingIndicatorReceivedInThread event. */
export interface AcsChatTypingIndicatorReceivedInThreadEventData extends AcsChatMessageEventInThreadBase {
  /** The body of the chat message */
  messageBody: string;
  /** The chat message metadata */
  readonly metadata?: Record<string, string>;
}

export function acsChatTypingIndicatorReceivedInThreadEventDataDeserializer(
  item: any,
): AcsChatTypingIndicatorReceivedInThreadEventData {
  return {
    messageId: item["messageId"],
    senderCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["senderCommunicationIdentifier"],
    ),
    senderDisplayName: item["senderDisplayName"],
    composeTime: new Date(item["composeTime"]),
    type: item["type"],
    version: item["version"],
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    messageBody: item["messageBody"],
    metadata: item["metadata"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatMessageReceivedInThread event. */
export interface AcsChatMessageReceivedInThreadEventData extends AcsChatMessageEventInThreadBase {
  /** The body of the chat message */
  messageBody: string;
  /** The chat message metadata */
  readonly metadata?: Record<string, string>;
}

export function acsChatMessageReceivedInThreadEventDataDeserializer(
  item: any,
): AcsChatMessageReceivedInThreadEventData {
  return {
    messageId: item["messageId"],
    senderCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["senderCommunicationIdentifier"],
    ),
    senderDisplayName: item["senderDisplayName"],
    composeTime: new Date(item["composeTime"]),
    type: item["type"],
    version: item["version"],
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    messageBody: item["messageBody"],
    metadata: item["metadata"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatMessageEdited event. */
export interface AcsChatMessageEditedEventData extends AcsChatMessageEventBase {
  /** The body of the chat message */
  messageBody: string;
  /** The chat message metadata */
  readonly metadata?: Record<string, string>;
  /** The time at which the message was edited */
  editTime: Date;
}

export function acsChatMessageEditedEventDataDeserializer(
  item: any,
): AcsChatMessageEditedEventData {
  return {
    messageId: item["messageId"],
    senderCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["senderCommunicationIdentifier"],
    ),
    senderDisplayName: item["senderDisplayName"],
    composeTime: new Date(item["composeTime"]),
    type: item["type"],
    version: item["version"],
    recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["recipientCommunicationIdentifier"],
    ),
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    messageBody: item["messageBody"],
    metadata: item["metadata"],
    editTime: new Date(item["editTime"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatMessageEditedInThread event. */
export interface AcsChatMessageEditedInThreadEventData extends AcsChatMessageEventInThreadBase {
  /** The body of the chat message */
  messageBody: string;
  /** The chat message metadata */
  readonly metadata?: Record<string, string>;
  /** The time at which the message was edited */
  editTime: Date;
}

export function acsChatMessageEditedInThreadEventDataDeserializer(
  item: any,
): AcsChatMessageEditedInThreadEventData {
  return {
    messageId: item["messageId"],
    senderCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["senderCommunicationIdentifier"],
    ),
    senderDisplayName: item["senderDisplayName"],
    composeTime: new Date(item["composeTime"]),
    type: item["type"],
    version: item["version"],
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    messageBody: item["messageBody"],
    metadata: item["metadata"],
    editTime: new Date(item["editTime"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatMessageDeleted event. */
export interface AcsChatMessageDeletedEventData extends AcsChatMessageEventBase {
  /** The time at which the message was deleted */
  deleteTime: Date;
}

export function acsChatMessageDeletedEventDataDeserializer(
  item: any,
): AcsChatMessageDeletedEventData {
  return {
    messageId: item["messageId"],
    senderCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["senderCommunicationIdentifier"],
    ),
    senderDisplayName: item["senderDisplayName"],
    composeTime: new Date(item["composeTime"]),
    type: item["type"],
    version: item["version"],
    recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["recipientCommunicationIdentifier"],
    ),
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    deleteTime: new Date(item["deleteTime"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatMessageDeletedInThread event. */
export interface AcsChatMessageDeletedInThreadEventData extends AcsChatMessageEventInThreadBase {
  /** The time at which the message was deleted */
  deleteTime: Date;
}

export function acsChatMessageDeletedInThreadEventDataDeserializer(
  item: any,
): AcsChatMessageDeletedInThreadEventData {
  return {
    messageId: item["messageId"],
    senderCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["senderCommunicationIdentifier"],
    ),
    senderDisplayName: item["senderDisplayName"],
    composeTime: new Date(item["composeTime"]),
    type: item["type"],
    version: item["version"],
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    deleteTime: new Date(item["deleteTime"]),
  };
}

/** Schema of the chat thread participant */
export interface AcsChatThreadParticipant {
  /** The name of the user */
  displayName?: string;
  /** The communication identifier of the user */
  participantCommunicationIdentifier: CommunicationIdentifierModel;
  /** The metadata of the user */
  readonly metadata?: Record<string, string>;
}

export function acsChatThreadParticipantDeserializer(item: any): AcsChatThreadParticipant {
  return {
    displayName: item["displayName"],
    participantCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["participantCommunicationIdentifier"],
    ),
    metadata: item["metadata"],
  };
}

/** Schema of common properties of all chat thread events */
export interface AcsChatThreadEventBase extends AcsChatEventBase {
  /** The original creation time of the thread */
  createTime: Date;
  /** The version of the thread */
  version?: number;
}

export function acsChatThreadEventBaseDeserializer(item: any): AcsChatThreadEventBase {
  return {
    recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["recipientCommunicationIdentifier"],
    ),
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    createTime: new Date(item["createTime"]),
    version: item["version"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatThreadCreatedWithUser event. */
export interface AcsChatThreadCreatedWithUserEventData extends AcsChatThreadEventBase {
  /** The communication identifier of the user who created the thread */
  createdByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The thread properties */
  properties: Record<string, any>;
  /** The thread metadata */
  readonly metadata?: Record<string, string>;
  /** The list of properties of participants who are part of the thread */
  readonly participants: AcsChatThreadParticipant[];
}

export function acsChatThreadCreatedWithUserEventDataDeserializer(
  item: any,
): AcsChatThreadCreatedWithUserEventData {
  return {
    createTime: new Date(item["createTime"]),
    version: item["version"],
    recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["recipientCommunicationIdentifier"],
    ),
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    createdByCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["createdByCommunicationIdentifier"],
    ),
    properties: item["properties"],
    metadata: item["metadata"],
    participants: acsChatThreadParticipantArrayDeserializer(item["participants"]),
  };
}

export function acsChatThreadParticipantArrayDeserializer(
  result: Array<AcsChatThreadParticipant>,
): any[] {
  return result.map((item) => {
    return acsChatThreadParticipantDeserializer(item);
  });
}

/** Schema of common properties of all chat thread events */
export interface AcsChatThreadEventInThreadBase extends AcsChatEventInThreadBase {
  /** The original creation time of the thread */
  createTime: Date;
  /** The version of the thread */
  version?: number;
}

export function acsChatThreadEventInThreadBaseDeserializer(
  item: any,
): AcsChatThreadEventInThreadBase {
  return {
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    createTime: new Date(item["createTime"]),
    version: item["version"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatThreadCreated event. */
export interface AcsChatThreadCreatedEventData extends AcsChatThreadEventInThreadBase {
  /** The communication identifier of the user who created the thread */
  createdByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The thread properties */
  properties: Record<string, any>;
  /** The thread metadata */
  readonly metadata?: Record<string, string>;
  /** The list of properties of participants who are part of the thread */
  readonly participants: AcsChatThreadParticipant[];
}

export function acsChatThreadCreatedEventDataDeserializer(
  item: any,
): AcsChatThreadCreatedEventData {
  return {
    createTime: new Date(item["createTime"]),
    version: item["version"],
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    createdByCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["createdByCommunicationIdentifier"],
    ),
    properties: item["properties"],
    metadata: item["metadata"],
    participants: acsChatThreadParticipantArrayDeserializer(item["participants"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatThreadWithUserDeleted event. */
export interface AcsChatThreadWithUserDeletedEventData extends AcsChatThreadEventBase {
  /** The communication identifier of the user who deleted the thread */
  deletedByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The deletion time of the thread */
  deleteTime: Date;
}

export function acsChatThreadWithUserDeletedEventDataDeserializer(
  item: any,
): AcsChatThreadWithUserDeletedEventData {
  return {
    createTime: new Date(item["createTime"]),
    version: item["version"],
    recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["recipientCommunicationIdentifier"],
    ),
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    deletedByCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["deletedByCommunicationIdentifier"],
    ),
    deleteTime: new Date(item["deleteTime"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatThreadDeleted event. */
export interface AcsChatThreadDeletedEventData extends AcsChatThreadEventInThreadBase {
  /** The communication identifier of the user who deleted the thread */
  deletedByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The deletion time of the thread */
  deleteTime: Date;
}

export function acsChatThreadDeletedEventDataDeserializer(
  item: any,
): AcsChatThreadDeletedEventData {
  return {
    createTime: new Date(item["createTime"]),
    version: item["version"],
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    deletedByCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["deletedByCommunicationIdentifier"],
    ),
    deleteTime: new Date(item["deleteTime"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatThreadPropertiesUpdatedPerUser event. */
export interface AcsChatThreadPropertiesUpdatedPerUserEventData extends AcsChatThreadEventBase {
  /** The communication identifier of the user who updated the thread properties */
  editedByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The time at which the properties of the thread were updated */
  editTime: Date;
  /** The thread metadata */
  readonly metadata?: Record<string, string>;
  /** The updated thread properties */
  properties: Record<string, any>;
}

export function acsChatThreadPropertiesUpdatedPerUserEventDataDeserializer(
  item: any,
): AcsChatThreadPropertiesUpdatedPerUserEventData {
  return {
    createTime: new Date(item["createTime"]),
    version: item["version"],
    recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["recipientCommunicationIdentifier"],
    ),
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    editedByCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["editedByCommunicationIdentifier"],
    ),
    editTime: new Date(item["editTime"]),
    metadata: item["metadata"],
    properties: item["properties"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatThreadPropertiesUpdated event. */
export interface AcsChatThreadPropertiesUpdatedEventData extends AcsChatThreadEventInThreadBase {
  /** The communication identifier of the user who updated the thread properties */
  editedByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The time at which the properties of the thread were updated */
  editTime: Date;
  /** The updated thread properties */
  properties: Record<string, any>;
  /** The thread metadata */
  readonly metadata: Record<string, string>;
}

export function acsChatThreadPropertiesUpdatedEventDataDeserializer(
  item: any,
): AcsChatThreadPropertiesUpdatedEventData {
  return {
    createTime: new Date(item["createTime"]),
    version: item["version"],
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    editedByCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["editedByCommunicationIdentifier"],
    ),
    editTime: new Date(item["editTime"]),
    properties: item["properties"],
    metadata: item["metadata"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatParticipantAddedToThreadWithUser event. */
export interface AcsChatParticipantAddedToThreadWithUserEventData extends AcsChatThreadEventBase {
  /** The time at which the user was added to the thread */
  time: Date;
  /** The communication identifier of the user who added the user */
  addedByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The details of the user who was added */
  participantAdded: AcsChatThreadParticipant;
}

export function acsChatParticipantAddedToThreadWithUserEventDataDeserializer(
  item: any,
): AcsChatParticipantAddedToThreadWithUserEventData {
  return {
    createTime: new Date(item["createTime"]),
    version: item["version"],
    recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["recipientCommunicationIdentifier"],
    ),
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    time: new Date(item["time"]),
    addedByCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["addedByCommunicationIdentifier"],
    ),
    participantAdded: acsChatThreadParticipantDeserializer(item["participantAdded"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatParticipantRemovedFromThreadWithUser event. */
export interface AcsChatParticipantRemovedFromThreadWithUserEventData extends AcsChatThreadEventBase {
  /** The time at which the user was removed to the thread */
  time: Date;
  /** The communication identifier of the user who removed the user */
  removedByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The details of the user who was removed */
  participantRemoved: AcsChatThreadParticipant;
}

export function acsChatParticipantRemovedFromThreadWithUserEventDataDeserializer(
  item: any,
): AcsChatParticipantRemovedFromThreadWithUserEventData {
  return {
    createTime: new Date(item["createTime"]),
    version: item["version"],
    recipientCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["recipientCommunicationIdentifier"],
    ),
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    time: new Date(item["time"]),
    removedByCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["removedByCommunicationIdentifier"],
    ),
    participantRemoved: acsChatThreadParticipantDeserializer(item["participantRemoved"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatThreadParticipantAdded event. */
export interface AcsChatParticipantAddedToThreadEventData extends AcsChatEventInThreadBase {
  /** The time at which the user was added to the thread */
  time: Date;
  /** The communication identifier of the user who added the user */
  addedByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The details of the user who was added */
  participantAdded: AcsChatThreadParticipant;
  /** The version of the thread */
  version?: number;
}

export function acsChatParticipantAddedToThreadEventDataDeserializer(
  item: any,
): AcsChatParticipantAddedToThreadEventData {
  return {
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    time: new Date(item["time"]),
    addedByCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["addedByCommunicationIdentifier"],
    ),
    participantAdded: acsChatThreadParticipantDeserializer(item["participantAdded"]),
    version: item["version"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.ChatThreadParticipantRemoved event. */
export interface AcsChatParticipantRemovedFromThreadEventData extends AcsChatEventInThreadBase {
  /** The time at which the user was removed to the thread */
  time: Date;
  /** The communication identifier of the user who removed the user */
  removedByCommunicationIdentifier: CommunicationIdentifierModel;
  /** The details of the user who was removed */
  participantRemoved: AcsChatThreadParticipant;
  /** The version of the thread */
  version?: number;
}

export function acsChatParticipantRemovedFromThreadEventDataDeserializer(
  item: any,
): AcsChatParticipantRemovedFromThreadEventData {
  return {
    transactionId: item["transactionId"],
    threadId: item["threadId"],
    time: new Date(item["time"]),
    removedByCommunicationIdentifier: communicationIdentifierModelDeserializer(
      item["removedByCommunicationIdentifier"],
    ),
    participantRemoved: acsChatThreadParticipantDeserializer(item["participantRemoved"]),
    version: item["version"],
  };
}

/** Schema of common properties of all SMS events */
export interface AcsSmsEventBase {
  /** The identity of the SMS message */
  messageId: string;
  /** The identity of SMS message sender */
  from: string;
  /** The identity of SMS message receiver */
  to: string;
}

export function acsSmsEventBaseDeserializer(item: any): AcsSmsEventBase {
  return {
    messageId: item["messageId"],
    from: item["from"],
    to: item["to"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.SMSDeliveryReportReceived event. */
export interface AcsSmsDeliveryReportReceivedEventData extends AcsSmsEventBase {
  /** Status of Delivery */
  deliveryStatus: string;
  /** Details about Delivery Status */
  deliveryStatusDetails: string;
  /** List of details of delivery attempts made */
  readonly deliveryAttempts: AcsSmsDeliveryAttempt[];
  /** The time at which the SMS delivery report was received */
  receivedTimestamp: Date;
  /** Customer Content */
  tag?: string;
}

export function acsSmsDeliveryReportReceivedEventDataDeserializer(
  item: any,
): AcsSmsDeliveryReportReceivedEventData {
  return {
    messageId: item["messageId"],
    from: item["from"],
    to: item["to"],
    deliveryStatus: item["deliveryStatus"],
    deliveryStatusDetails: item["deliveryStatusDetails"],
    deliveryAttempts: acsSmsDeliveryAttemptArrayDeserializer(item["deliveryAttempts"]),
    receivedTimestamp: new Date(item["receivedTimestamp"]),
    tag: item["tag"],
  };
}

export function acsSmsDeliveryAttemptArrayDeserializer(
  result: Array<AcsSmsDeliveryAttempt>,
): any[] {
  return result.map((item) => {
    return acsSmsDeliveryAttemptDeserializer(item);
  });
}

/** Schema for details of a delivery attempt */
export interface AcsSmsDeliveryAttempt {
  /** TimeStamp when delivery was attempted */
  timestamp: Date;
  /** Number of segments that were successfully delivered */
  segmentsSucceeded: number;
  /** Number of segments whose delivery failed */
  segmentsFailed: number;
}

export function acsSmsDeliveryAttemptDeserializer(item: any): AcsSmsDeliveryAttempt {
  return {
    timestamp: new Date(item["timestamp"]),
    segmentsSucceeded: item["segmentsSucceeded"],
    segmentsFailed: item["segmentsFailed"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.SMSReceived event. */
export interface AcsSmsReceivedEventData extends AcsSmsEventBase {
  /** The SMS content */
  message: string;
  /** The time at which the SMS was received */
  receivedTimestamp: Date;
  /** Number of segments in the message */
  segmentCount: number;
}

export function acsSmsReceivedEventDataDeserializer(item: any): AcsSmsReceivedEventData {
  return {
    messageId: item["messageId"],
    from: item["from"],
    to: item["to"],
    message: item["message"],
    receivedTimestamp: new Date(item["receivedTimestamp"]),
    segmentCount: item["segmentCount"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RecordingFileStatusUpdated event. */
export interface AcsRecordingFileStatusUpdatedEventData {
  /** The details of recording storage information */
  recordingStorageInfo: AcsRecordingStorageInfo;
  /** The time at which the recording started */
  recordingStartTime: Date;
  /** The recording duration in milliseconds */
  recordingDurationMs?: number;
  /** The recording content type- AudioVideo, or Audio */
  recordingContentType: AcsRecordingContentType;
  /** The recording  channel type - Mixed, Unmixed */
  recordingChannelType: AcsRecordingChannelType;
  /** The recording format type - Mp4, Mp3, Wav */
  recordingFormatType: AcsRecordingFormatType;
  /** The reason for ending recording session */
  sessionEndReason?: string;
}

export function acsRecordingFileStatusUpdatedEventDataDeserializer(
  item: any,
): AcsRecordingFileStatusUpdatedEventData {
  return {
    recordingStorageInfo: acsRecordingStorageInfoDeserializer(item["recordingStorageInfo"]),
    recordingStartTime: new Date(item["recordingStartTime"]),
    recordingDurationMs: item["recordingDurationMs"],
    recordingContentType: item["recordingContentType"],
    recordingChannelType: item["recordingChannelType"],
    recordingFormatType: item["recordingFormatType"],
    sessionEndReason: item["sessionEndReason"],
  };
}

/** Schema for all properties of Recording Storage Information. */
export interface AcsRecordingStorageInfo {
  /** List of details of recording chunks information */
  readonly recordingChunks: AcsRecordingChunkInfo[];
}

export function acsRecordingStorageInfoDeserializer(item: any): AcsRecordingStorageInfo {
  return {
    recordingChunks: acsRecordingChunkInfoArrayDeserializer(item["recordingChunks"]),
  };
}

export function acsRecordingChunkInfoArrayDeserializer(
  result: Array<AcsRecordingChunkInfo>,
): any[] {
  return result.map((item) => {
    return acsRecordingChunkInfoDeserializer(item);
  });
}

/** Schema for all properties of  Recording Chunk Information. */
export interface AcsRecordingChunkInfo {
  /** The documentId of the recording chunk */
  documentId?: string;
  /** The index of the recording chunk */
  index?: number;
  /** The reason for ending the recording chunk */
  endReason?: string;
  /** The location of the metadata for this chunk */
  metadataLocation?: string;
  /** The location of the content for this chunk */
  contentLocation?: string;
  /** The location to delete all chunk storage */
  deleteLocation?: string;
}

export function acsRecordingChunkInfoDeserializer(item: any): AcsRecordingChunkInfo {
  return {
    documentId: item["documentId"],
    index: item["index"],
    endReason: item["endReason"],
    metadataLocation: item["metadataLocation"],
    contentLocation: item["contentLocation"],
    deleteLocation: item["deleteLocation"],
  };
}

/** Recording content type */
export enum KnownAcsRecordingContentType {
  /** AudioVideo content type */
  AudioVideo = "AudioVideo",
  /** Audio content type */
  Audio = "Audio",
}

/**
 * Recording content type \
 * {@link KnownAcsRecordingContentType} can be used interchangeably with AcsRecordingContentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AudioVideo**: AudioVideo content type \
 * **Audio**: Audio content type
 */
export type AcsRecordingContentType = string;

/** Recording channel type */
export enum KnownAcsRecordingChannelType {
  /** Mixed channel type */
  Mixed = "Mixed",
  /** Unmixed channel type */
  Unmixed = "Unmixed",
}

/**
 * Recording channel type \
 * {@link KnownAcsRecordingChannelType} can be used interchangeably with AcsRecordingChannelType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Mixed**: Mixed channel type \
 * **Unmixed**: Unmixed channel type
 */
export type AcsRecordingChannelType = string;

/** Recording format type */
export enum KnownAcsRecordingFormatType {
  /** WAV format */
  Wav = "Wav",
  /** MP3 format */
  Mp3 = "Mp3",
  /** MP4 format */
  Mp4 = "Mp4",
}

/**
 * Recording format type \
 * {@link KnownAcsRecordingFormatType} can be used interchangeably with AcsRecordingFormatType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Wav**: WAV format \
 * **Mp3**: MP3 format \
 * **Mp4**: MP4 format
 */
export type AcsRecordingFormatType = string;

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.EmailDeliveryReportReceived event. */
export interface AcsEmailDeliveryReportReceivedEventData {
  /** The Sender Email Address */
  sender: string;
  /** The recipient Email Address */
  recipient: string;
  /** The Internet Message Id of the email that has been sent */
  internetMessageId: string;
  /** The Id of the email that has been sent */
  messageId?: string;
  /** The status of the email. Any value other than Delivered is considered failed. */
  status: AcsEmailDeliveryReportStatus;
  /** Detailed information about the status if any */
  deliveryStatusDetails: AcsEmailDeliveryReportStatusDetails;
  /** The time at which the email delivery report received timestamp */
  deliveryAttemptTimestamp: Date;
}

export function acsEmailDeliveryReportReceivedEventDataDeserializer(
  item: any,
): AcsEmailDeliveryReportReceivedEventData {
  return {
    sender: item["sender"],
    recipient: item["recipient"],
    internetMessageId: item["internetMessageId"],
    messageId: item["messageId"],
    status: item["status"],
    deliveryStatusDetails: acsEmailDeliveryReportStatusDetailsDeserializer(
      item["deliveryStatusDetails"],
    ),
    deliveryAttemptTimestamp: new Date(item["deliveryAttemptTimestamp"]),
  };
}

/** The status of the email. Any value other than Delivered is considered failed. */
export enum KnownAcsEmailDeliveryReportStatus {
  /** Hard bounce detected while sending the email */
  Bounced = "Bounced",
  /** The email was delivered */
  Delivered = "Delivered",
  /** The email failed to be delivered */
  Failed = "Failed",
  /** The message was identified as spam and was rejected or blocked (not quarantined). */
  FilteredSpam = "FilteredSpam",
  /** The message was quarantined (as spam, bulk mail, or phishing). For more information, see Quarantined email messages in EOP (EXCHANGE ONLINE PROTECTION). */
  Quarantined = "Quarantined",
  /** The email was suppressed */
  Suppressed = "Suppressed",
}

/**
 * The status of the email. Any value other than Delivered is considered failed. \
 * {@link KnownAcsEmailDeliveryReportStatus} can be used interchangeably with AcsEmailDeliveryReportStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Bounced**: Hard bounce detected while sending the email \
 * **Delivered**: The email was delivered \
 * **Failed**: The email failed to be delivered \
 * **FilteredSpam**: The message was identified as spam and was rejected or blocked (not quarantined). \
 * **Quarantined**: The message was quarantined (as spam, bulk mail, or phishing). For more information, see Quarantined email messages in EOP (EXCHANGE ONLINE PROTECTION). \
 * **Suppressed**: The email was suppressed
 */
export type AcsEmailDeliveryReportStatus = string;

/** Detailed information about the status if any */
export interface AcsEmailDeliveryReportStatusDetails {
  /** Detailed status message */
  statusMessage?: string;
  /** Recipient mail server host name */
  recipientMailServerHostName?: string;
}

export function acsEmailDeliveryReportStatusDetailsDeserializer(
  item: any,
): AcsEmailDeliveryReportStatusDetails {
  return {
    statusMessage: item["statusMessage"],
    recipientMailServerHostName: item["recipientMailServerHostName"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.EmailEngagementTrackingReportReceived event. */
export interface AcsEmailEngagementTrackingReportReceivedEventData {
  /** The Sender Email Address */
  sender?: string;
  /** The Recipient Email Address */
  recipient?: string;
  /** The Id of the email that has been sent */
  messageId?: string;
  /** The time at which the user interacted with the email */
  userActionTimestamp: Date;
  /** The context of the type of engagement user had with email */
  engagementContext?: string;
  /** The user agent interacting with the email */
  userAgent?: string;
  /** The type of engagement user have with email */
  engagement: AcsUserEngagement;
}

export function acsEmailEngagementTrackingReportReceivedEventDataDeserializer(
  item: any,
): AcsEmailEngagementTrackingReportReceivedEventData {
  return {
    sender: item["sender"],
    recipient: item["recipient"],
    messageId: item["messageId"],
    userActionTimestamp: new Date(item["userActionTimestamp"]),
    engagementContext: item["engagementContext"],
    userAgent: item["userAgent"],
    engagement: item["engagementType"],
  };
}

/** The type of engagement user have with email. */
export enum KnownAcsUserEngagement {
  /** View */
  View = "view",
  /** Click */
  Click = "click",
}

/**
 * The type of engagement user have with email. \
 * {@link KnownAcsUserEngagement} can be used interchangeably with AcsUserEngagement,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **view**: View \
 * **click**: Click
 */
export type AcsUserEngagement = string;

/** Schema of common properties of all Router events */
export interface AcsRouterEventData {
  /** Router Event Job ID */
  jobId: string;
  /** Router Event Channel Reference */
  channelReference?: string;
  /** Router Event Channel ID */
  channelId?: string;
}

export function acsRouterEventDataDeserializer(item: any): AcsRouterEventData {
  return {
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
  };
}

/** Schema of common properties of all Router Job events */
export interface AcsRouterJobEventData extends AcsRouterEventData {
  /** Router Job events Queue Id */
  queueId?: string;
  /** Router Job events Labels */
  readonly labels: Record<string, string>;
  /** Router Jobs events Tags */
  readonly tags: Record<string, string>;
}

export function acsRouterJobEventDataDeserializer(item: any): AcsRouterJobEventData {
  return {
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    queueId: item["queueId"],
    labels: item["labels"],
    tags: item["tags"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobCancelled event */
export interface AcsRouterJobCancelledEventData extends AcsRouterJobEventData {
  /** Router Job Note */
  note?: string;
  /** Router Job Disposition Code */
  dispositionCode?: string;
}

export function acsRouterJobCancelledEventDataDeserializer(
  item: any,
): AcsRouterJobCancelledEventData {
  return {
    queueId: item["queueId"],
    labels: item["labels"],
    tags: item["tags"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    note: item["note"],
    dispositionCode: item["dispositionCode"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobClassificationFailed event */
export interface AcsRouterJobClassificationFailedEventData extends AcsRouterJobEventData {
  /** Router Job Classification Policy Id */
  classificationPolicyId?: string;
  /** Router Job Classification Failed Errors */
  readonly errors: AcsRouterCommunicationError[];
}

export function acsRouterJobClassificationFailedEventDataDeserializer(
  item: any,
): AcsRouterJobClassificationFailedEventData {
  return {
    queueId: item["queueId"],
    labels: item["labels"],
    tags: item["tags"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    classificationPolicyId: item["classificationPolicyId"],
    errors: acsRouterCommunicationErrorArrayDeserializer(item["errors"]),
  };
}

export function acsRouterCommunicationErrorArrayDeserializer(
  result: Array<AcsRouterCommunicationError>,
): any[] {
  return result.map((item) => {
    return acsRouterCommunicationErrorDeserializer(item);
  });
}

/** Router Communication Error */
export interface AcsRouterCommunicationError {
  /** Router Communication Error Code */
  code?: string;
  /** Router Communication Error Message */
  message?: string;
  /** Router Communication Error Target */
  target?: string;
  /** Router Communication Inner Error */
  innererror: AcsRouterCommunicationError;
  /** List of Router Communication Errors */
  readonly details: AcsRouterCommunicationError[];
}

export function acsRouterCommunicationErrorDeserializer(item: any): AcsRouterCommunicationError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    innererror: acsRouterCommunicationErrorDeserializer(item["innererror"]),
    details: acsRouterCommunicationErrorArrayDeserializer(item["details"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobClassified event */
export interface AcsRouterJobClassifiedEventData extends AcsRouterJobEventData {
  /** Router Job Queue Info */
  queueDetails: AcsRouterQueueDetails;
  /** Router Job Classification Policy Id */
  classificationPolicyId?: string;
  /** Router Job Priority */
  priority?: number;
  /** Router Job Attached Worker Selector */
  readonly attachedWorkerSelectors: AcsRouterWorkerSelector[];
}

export function acsRouterJobClassifiedEventDataDeserializer(
  item: any,
): AcsRouterJobClassifiedEventData {
  return {
    queueId: item["queueId"],
    labels: item["labels"],
    tags: item["tags"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    queueDetails: acsRouterQueueDetailsDeserializer(item["queueDetails"]),
    classificationPolicyId: item["classificationPolicyId"],
    priority: item["priority"],
    attachedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(
      item["attachedWorkerSelectors"],
    ),
  };
}

/** Router Queue Details */
export interface AcsRouterQueueDetails {
  /** Router Queue Id */
  id?: string;
  /** Router Queue Name */
  name?: string;
  /** Router Queue Labels */
  readonly labels: Record<string, string>;
}

export function acsRouterQueueDetailsDeserializer(item: any): AcsRouterQueueDetails {
  return {
    id: item["id"],
    name: item["name"],
    labels: item["labels"],
  };
}

export function acsRouterWorkerSelectorArrayDeserializer(
  result: Array<AcsRouterWorkerSelector>,
): any[] {
  return result.map((item) => {
    return acsRouterWorkerSelectorDeserializer(item);
  });
}

/** Router Job Worker Selector */
export interface AcsRouterWorkerSelector {
  /** Router Job Worker Selector Key */
  key?: string;
  /** Router Job Worker Selector Label Operator */
  labelOperator: AcsRouterLabelOperator;
  /** Router Job Worker Selector Value */
  labelValue: any;
  /** Router Job Worker Selector Time to Live in Seconds */
  ttlSeconds: number;
  /** Router Job Worker Selector State */
  state: AcsRouterWorkerSelectorState;
  /** Router Job Worker Selector Expiration Time */
  expirationTime: Date;
}

export function acsRouterWorkerSelectorDeserializer(item: any): AcsRouterWorkerSelector {
  return {
    key: item["key"],
    labelOperator: item["labelOperator"],
    labelValue: item["value"],
    ttlSeconds: item["ttlSeconds"],
    state: item["state"],
    expirationTime: new Date(item["expirationTime"]),
  };
}

/** Router Job Worker Selector Label Operator */
export enum KnownAcsRouterLabelOperator {
  /** Router Label Operator Equal */
  Equal = "Equal",
  /** Router Label Operator Not Equal */
  NotEqual = "NotEqual",
  /** Router Label Operator Greater */
  Greater = "Greater",
  /** Router Label Operator Less */
  Less = "Less",
  /** Router Label Operator Greater than or equal */
  GreaterThanOrEqual = "GreaterThanOrEqual",
  /** Router Label Operator Less than or equal */
  LessThanOrEqual = "LessThanOrEqual",
}

/**
 * Router Job Worker Selector Label Operator \
 * {@link KnownAcsRouterLabelOperator} can be used interchangeably with AcsRouterLabelOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Equal**: Router Label Operator Equal \
 * **NotEqual**: Router Label Operator Not Equal \
 * **Greater**: Router Label Operator Greater \
 * **Less**: Router Label Operator Less \
 * **GreaterThanOrEqual**: Router Label Operator Greater than or equal \
 * **LessThanOrEqual**: Router Label Operator Less than or equal
 */
export type AcsRouterLabelOperator = string;

/** Router Worker Selector State */
export enum KnownAcsRouterWorkerSelectorState {
  /** Router Worker Selector State Active */
  Active = "active",
  /** Router Worker Selector State Expired */
  Expired = "expired",
}

/**
 * Router Worker Selector State \
 * {@link KnownAcsRouterWorkerSelectorState} can be used interchangeably with AcsRouterWorkerSelectorState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **active**: Router Worker Selector State Active \
 * **expired**: Router Worker Selector State Expired
 */
export type AcsRouterWorkerSelectorState = string;

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobClosed event */
export interface AcsRouterJobClosedEventData extends AcsRouterJobEventData {
  /** Router Job Closed Assignment Id */
  assignmentId?: string;
  /** Router Job Closed Worker Id */
  workerId?: string;
  /** Router Job Closed Disposition Code */
  dispositionCode?: string;
}

export function acsRouterJobClosedEventDataDeserializer(item: any): AcsRouterJobClosedEventData {
  return {
    queueId: item["queueId"],
    labels: item["labels"],
    tags: item["tags"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    assignmentId: item["assignmentId"],
    workerId: item["workerId"],
    dispositionCode: item["dispositionCode"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobCompleted event */
export interface AcsRouterJobCompletedEventData extends AcsRouterJobEventData {
  /** Router Job Completed Assignment Id */
  assignmentId?: string;
  /** Router Job Completed Worker Id */
  workerId?: string;
}

export function acsRouterJobCompletedEventDataDeserializer(
  item: any,
): AcsRouterJobCompletedEventData {
  return {
    queueId: item["queueId"],
    labels: item["labels"],
    tags: item["tags"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    assignmentId: item["assignmentId"],
    workerId: item["workerId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobDeleted event */
export interface AcsRouterJobDeletedEventData extends AcsRouterJobEventData {}

export function acsRouterJobDeletedEventDataDeserializer(item: any): AcsRouterJobDeletedEventData {
  return {
    queueId: item["queueId"],
    labels: item["labels"],
    tags: item["tags"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobExceptionTriggered event */
export interface AcsRouterJobExceptionTriggeredEventData extends AcsRouterJobEventData {
  /** Router Job Exception Triggered Rule Key */
  ruleKey?: string;
  /** Router Job Exception Triggered Rule Id */
  exceptionRuleId?: string;
}

export function acsRouterJobExceptionTriggeredEventDataDeserializer(
  item: any,
): AcsRouterJobExceptionTriggeredEventData {
  return {
    queueId: item["queueId"],
    labels: item["labels"],
    tags: item["tags"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    ruleKey: item["ruleKey"],
    exceptionRuleId: item["exceptionRuleId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobQueued event */
export interface AcsRouterJobQueuedEventData extends AcsRouterJobEventData {
  /** Router Job Priority */
  priority: number;
  /** Router Job Queued Attached Worker Selector */
  readonly attachedWorkerSelectors: AcsRouterWorkerSelector[];
  /** Router Job Queued Requested Worker Selector */
  readonly requestedWorkerSelectors: AcsRouterWorkerSelector[];
}

export function acsRouterJobQueuedEventDataDeserializer(item: any): AcsRouterJobQueuedEventData {
  return {
    queueId: item["queueId"],
    labels: item["labels"],
    tags: item["tags"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    priority: item["priority"],
    attachedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(
      item["attachedWorkerSelectors"],
    ),
    requestedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(
      item["requestedWorkerSelectors"],
    ),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobReceived event */
export interface AcsRouterJobReceivedEventData extends AcsRouterJobEventData {
  /** Router Job Received Job Status */
  jobStatus: AcsRouterJobStatus;
  /** Router Job Classification Policy Id */
  classificationPolicyId?: string;
  /** Router Job Priority */
  priority?: number;
  /** Router Job Received Requested Worker Selectors */
  readonly requestedWorkerSelectors: AcsRouterWorkerSelector[];
  /** Router Job Received Scheduled Time in UTC */
  scheduledOn: Date;
  /** Unavailable For Matching for Router Job Received */
  unavailableForMatching: boolean;
}

export function acsRouterJobReceivedEventDataDeserializer(
  item: any,
): AcsRouterJobReceivedEventData {
  return {
    queueId: item["queueId"],
    labels: item["labels"],
    tags: item["tags"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    jobStatus: item["jobStatus"],
    classificationPolicyId: item["classificationPolicyId"],
    priority: item["priority"],
    requestedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(
      item["requestedWorkerSelectors"],
    ),
    scheduledOn: new Date(item["scheduledOn"]),
    unavailableForMatching: item["unavailableForMatching"],
  };
}

/** Acs Router Job Status */
export enum KnownAcsRouterJobStatus {
  /** Router Job Status Pending Classification */
  PendingClassification = "PendingClassification",
  /** Router Job Status Queued */
  Queued = "Queued",
  /** Router Job Status Assigned */
  Assigned = "Assigned",
  /** Router Job Status Completed */
  Completed = "Completed",
  /** Router Job Status Closed */
  Closed = "Closed",
  /** Router Job Status Cancelled */
  Cancelled = "Cancelled",
  /** Router Job Status Classification Failed */
  ClassificationFailed = "ClassificationFailed",
  /** Router Job Status Created */
  Created = "Created",
  /** Router Job Status Pending Schedule */
  PendingSchedule = "PendingSchedule",
  /** Router Job Status Scheduled */
  Scheduled = "Scheduled",
  /** Router Job Status Schedule Failed */
  ScheduleFailed = "ScheduleFailed",
  /** Router Job Status Waiting For Activation */
  WaitingForActivation = "WaitingForActivation",
}

/**
 * Acs Router Job Status \
 * {@link KnownAcsRouterJobStatus} can be used interchangeably with AcsRouterJobStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PendingClassification**: Router Job Status Pending Classification \
 * **Queued**: Router Job Status Queued \
 * **Assigned**: Router Job Status Assigned \
 * **Completed**: Router Job Status Completed \
 * **Closed**: Router Job Status Closed \
 * **Cancelled**: Router Job Status Cancelled \
 * **ClassificationFailed**: Router Job Status Classification Failed \
 * **Created**: Router Job Status Created \
 * **PendingSchedule**: Router Job Status Pending Schedule \
 * **Scheduled**: Router Job Status Scheduled \
 * **ScheduleFailed**: Router Job Status Schedule Failed \
 * **WaitingForActivation**: Router Job Status Waiting For Activation
 */
export type AcsRouterJobStatus = string;

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobSchedulingFailed event */
export interface AcsRouterJobSchedulingFailedEventData extends AcsRouterJobEventData {
  /** Router Job Priority */
  priority: number;
  /** Router Job Scheduling Failed Attached Worker Selector Expired */
  readonly expiredAttachedWorkerSelectors: AcsRouterWorkerSelector[];
  /** Router Job Scheduling Failed Requested Worker Selector Expired */
  readonly expiredRequestedWorkerSelectors: AcsRouterWorkerSelector[];
  /** Router Job Scheduling Failed Scheduled Time in UTC */
  scheduledOn: Date;
  /** Router Job Scheduling Failed Reason */
  failureReason?: string;
}

export function acsRouterJobSchedulingFailedEventDataDeserializer(
  item: any,
): AcsRouterJobSchedulingFailedEventData {
  return {
    queueId: item["queueId"],
    labels: item["labels"],
    tags: item["tags"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    priority: item["priority"],
    expiredAttachedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(
      item["expiredAttachedWorkerSelectors"],
    ),
    expiredRequestedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(
      item["expiredRequestedWorkerSelectors"],
    ),
    scheduledOn: new Date(item["scheduledOn"]),
    failureReason: item["failureReason"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobUnassigned event */
export interface AcsRouterJobUnassignedEventData extends AcsRouterJobEventData {
  /** Router Job Unassigned Assignment Id */
  assignmentId?: string;
  /** Router Job Unassigned Worker Id */
  workerId?: string;
}

export function acsRouterJobUnassignedEventDataDeserializer(
  item: any,
): AcsRouterJobUnassignedEventData {
  return {
    queueId: item["queueId"],
    labels: item["labels"],
    tags: item["tags"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    assignmentId: item["assignmentId"],
    workerId: item["workerId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobWaitingForActivation event */
export interface AcsRouterJobWaitingForActivationEventData extends AcsRouterJobEventData {
  /** Router Job Waiting For Activation Priority */
  priority: number;
  /** Router Job Waiting For Activation Worker Selector Expired */
  readonly expiredAttachedWorkerSelectors: AcsRouterWorkerSelector[];
  /** Router Job Waiting For Activation Requested Worker Selector Expired */
  readonly expiredRequestedWorkerSelectors: AcsRouterWorkerSelector[];
  /** Router Job Waiting For Activation Scheduled Time in UTC */
  scheduledOn: Date;
  /** Router Job Waiting For Activation Unavailable For Matching */
  unavailableForMatching: boolean;
}

export function acsRouterJobWaitingForActivationEventDataDeserializer(
  item: any,
): AcsRouterJobWaitingForActivationEventData {
  return {
    queueId: item["queueId"],
    labels: item["labels"],
    tags: item["tags"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    priority: item["priority"],
    expiredAttachedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(
      item["expiredAttachedWorkerSelectors"],
    ),
    expiredRequestedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(
      item["expiredRequestedWorkerSelectors"],
    ),
    scheduledOn: new Date(item["scheduledOn"]),
    unavailableForMatching: item["unavailableForMatching"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterJobWorkerSelectorsExpired event */
export interface AcsRouterJobWorkerSelectorsExpiredEventData extends AcsRouterJobEventData {
  /** Router Job Worker Selectors Expired Requested Worker Selectors */
  readonly expiredRequestedWorkerSelectors: AcsRouterWorkerSelector[];
  /** Router Job Worker Selectors Expired Attached Worker Selectors */
  readonly expiredAttachedWorkerSelectors: AcsRouterWorkerSelector[];
}

export function acsRouterJobWorkerSelectorsExpiredEventDataDeserializer(
  item: any,
): AcsRouterJobWorkerSelectorsExpiredEventData {
  return {
    queueId: item["queueId"],
    labels: item["labels"],
    tags: item["tags"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    expiredRequestedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(
      item["expiredRequestedWorkerSelectors"],
    ),
    expiredAttachedWorkerSelectors: acsRouterWorkerSelectorArrayDeserializer(
      item["expiredAttachedWorkerSelectors"],
    ),
  };
}

/** Schema of common properties of all Router Worker events */
export interface AcsRouterWorkerEventData extends AcsRouterEventData {
  /** Router Worker events Worker Id */
  workerId?: string;
}

export function acsRouterWorkerEventDataDeserializer(item: any): AcsRouterWorkerEventData {
  return {
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    workerId: item["workerId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerDeleted event */
export interface AcsRouterWorkerDeletedEventData extends AcsRouterWorkerEventData {}

export function acsRouterWorkerDeletedEventDataDeserializer(
  item: any,
): AcsRouterWorkerDeletedEventData {
  return {
    workerId: item["workerId"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerDeregistered event */
export interface AcsRouterWorkerDeregisteredEventData {
  /** Router Worker Deregistered Worker Id */
  workerId?: string;
}

export function acsRouterWorkerDeregisteredEventDataDeserializer(
  item: any,
): AcsRouterWorkerDeregisteredEventData {
  return {
    workerId: item["workerId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerOfferAccepted event */
export interface AcsRouterWorkerOfferAcceptedEventData extends AcsRouterWorkerEventData {
  /** Router Worker Offer Accepted Queue Id */
  queueId?: string;
  /** Router Worker Offer Accepted Offer Id */
  offerId?: string;
  /** Router Worker Offer Accepted Assignment Id */
  assignmentId?: string;
  /** Router Worker Offer Accepted Job Priority */
  jobPriority?: number;
  /** Router Worker Offer Accepted Worker Labels */
  readonly workerLabels: Record<string, string>;
  /** Router Worker Offer Accepted Worker Tags */
  readonly workerTags: Record<string, string>;
  /** Router Worker Offer Accepted Job Labels */
  readonly jobLabels: Record<string, string>;
  /** Router Worker Offer Accepted Job Tags */
  readonly jobTags: Record<string, string>;
}

export function acsRouterWorkerOfferAcceptedEventDataDeserializer(
  item: any,
): AcsRouterWorkerOfferAcceptedEventData {
  return {
    workerId: item["workerId"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    queueId: item["queueId"],
    offerId: item["offerId"],
    assignmentId: item["assignmentId"],
    jobPriority: item["jobPriority"],
    workerLabels: item["workerLabels"],
    workerTags: item["workerTags"],
    jobLabels: item["jobLabels"],
    jobTags: item["jobTags"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerOfferDeclined event */
export interface AcsRouterWorkerOfferDeclinedEventData extends AcsRouterWorkerEventData {
  /** Router Worker Offer Declined Queue Id */
  queueId?: string;
  /** Router Worker Offer Declined Offer Id */
  offerId?: string;
}

export function acsRouterWorkerOfferDeclinedEventDataDeserializer(
  item: any,
): AcsRouterWorkerOfferDeclinedEventData {
  return {
    workerId: item["workerId"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    queueId: item["queueId"],
    offerId: item["offerId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerOfferExpired event */
export interface AcsRouterWorkerOfferExpiredEventData extends AcsRouterWorkerEventData {
  /** Router Worker Offer Expired Queue Id */
  queueId?: string;
  /** Router Worker Offer Expired Offer Id */
  offerId?: string;
}

export function acsRouterWorkerOfferExpiredEventDataDeserializer(
  item: any,
): AcsRouterWorkerOfferExpiredEventData {
  return {
    workerId: item["workerId"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    queueId: item["queueId"],
    offerId: item["offerId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerOfferIssued event */
export interface AcsRouterWorkerOfferIssuedEventData extends AcsRouterWorkerEventData {
  /** Router Worker Offer Issued Queue Id */
  queueId?: string;
  /** Router Worker Offer Issued Offer Id */
  offerId?: string;
  /** Router Worker Offer Issued Job Priority */
  jobPriority?: number;
  /** Router Worker Offer Issued Worker Labels */
  readonly workerLabels: Record<string, string>;
  /** Router Worker Offer Issued Time in UTC */
  offeredOn: Date;
  /** Router Worker Offer Issued Expiration Time in UTC */
  expiresOn: Date;
  /** Router Worker Offer Issued Worker Tags */
  readonly workerTags: Record<string, string>;
  /** Router Worker Offer Issued Job Labels */
  readonly jobLabels: Record<string, string>;
  /** Router Worker Offer Issued Job Tags */
  readonly jobTags: Record<string, string>;
}

export function acsRouterWorkerOfferIssuedEventDataDeserializer(
  item: any,
): AcsRouterWorkerOfferIssuedEventData {
  return {
    workerId: item["workerId"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    queueId: item["queueId"],
    offerId: item["offerId"],
    jobPriority: item["jobPriority"],
    workerLabels: item["workerLabels"],
    offeredOn: new Date(item["offeredOn"]),
    expiresOn: new Date(item["expiresOn"]),
    workerTags: item["workerTags"],
    jobLabels: item["jobLabels"],
    jobTags: item["jobTags"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerOfferRevoked event */
export interface AcsRouterWorkerOfferRevokedEventData extends AcsRouterWorkerEventData {
  /** Router Worker Offer Revoked Queue Id */
  queueId?: string;
  /** Router Worker Offer Revoked Offer Id */
  offerId?: string;
}

export function acsRouterWorkerOfferRevokedEventDataDeserializer(
  item: any,
): AcsRouterWorkerOfferRevokedEventData {
  return {
    workerId: item["workerId"],
    jobId: item["jobId"],
    channelReference: item["channelReference"],
    channelId: item["channelId"],
    queueId: item["queueId"],
    offerId: item["offerId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerRegistered event */
export interface AcsRouterWorkerRegisteredEventData {
  /** Router Worker Registered Worker Id */
  workerId?: string;
  /** Router Worker Registered Queue Info */
  readonly queueAssignments: AcsRouterQueueDetails[];
  /** Router Worker Registered Channel Configuration */
  readonly channelConfigurations: AcsRouterChannelConfiguration[];
  /** Router Worker Register Total Capacity */
  totalCapacity?: number;
  /** Router Worker Registered Labels */
  readonly labels: Record<string, string>;
  /** Router Worker Registered Tags */
  readonly tags: Record<string, string>;
}

export function acsRouterWorkerRegisteredEventDataDeserializer(
  item: any,
): AcsRouterWorkerRegisteredEventData {
  return {
    workerId: item["workerId"],
    queueAssignments: acsRouterQueueDetailsArrayDeserializer(item["queueAssignments"]),
    channelConfigurations: acsRouterChannelConfigurationArrayDeserializer(
      item["channelConfigurations"],
    ),
    totalCapacity: item["totalCapacity"],
    labels: item["labels"],
    tags: item["tags"],
  };
}

export function acsRouterQueueDetailsArrayDeserializer(
  result: Array<AcsRouterQueueDetails>,
): any[] {
  return result.map((item) => {
    return acsRouterQueueDetailsDeserializer(item);
  });
}

export function acsRouterChannelConfigurationArrayDeserializer(
  result: Array<AcsRouterChannelConfiguration>,
): any[] {
  return result.map((item) => {
    return acsRouterChannelConfigurationDeserializer(item);
  });
}

/** Router Channel Configuration */
export interface AcsRouterChannelConfiguration {
  /** Channel ID for Router Job */
  channelId?: string;
  /** Capacity Cost Per Job for Router Job */
  capacityCostPerJob?: number;
  /** Max Number of Jobs for Router Job */
  maxNumberOfJobs?: number;
}

export function acsRouterChannelConfigurationDeserializer(
  item: any,
): AcsRouterChannelConfiguration {
  return {
    channelId: item["channelId"],
    capacityCostPerJob: item["capacityCostPerJob"],
    maxNumberOfJobs: item["maxNumberOfJobs"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.RouterWorkerUpdated event. */
export interface AcsRouterWorkerUpdatedEventData {
  /** Router Worker Updated Worker Id */
  workerId?: string;
  /** Router Worker Updated Queue Info */
  readonly queueAssignments: AcsRouterQueueDetails[];
  /** Router Worker Updated Channel Configuration */
  readonly channelConfigurations: AcsRouterChannelConfiguration[];
  /** Router Worker Updated Total Capacity */
  totalCapacity?: number;
  /** Router Worker Updated Labels */
  readonly labels: Record<string, string>;
  /** Router Worker Updated Tags */
  readonly tags: Record<string, string>;
  /** Router Worker Properties Updated */
  readonly updatedWorkerProperties: AcsRouterUpdatedWorkerProperty[];
}

export function acsRouterWorkerUpdatedEventDataDeserializer(
  item: any,
): AcsRouterWorkerUpdatedEventData {
  return {
    workerId: item["workerId"],
    queueAssignments: acsRouterQueueDetailsArrayDeserializer(item["queueAssignments"]),
    channelConfigurations: acsRouterChannelConfigurationArrayDeserializer(
      item["channelConfigurations"],
    ),
    totalCapacity: item["totalCapacity"],
    labels: item["labels"],
    tags: item["tags"],
    updatedWorkerProperties: item["updatedWorkerProperties"].map((p: any) => {
      return p;
    }),
  };
}

/** Worker properties that can be updated */
export enum KnownAcsRouterUpdatedWorkerProperty {
  /** AvailableForOffers */
  AvailableForOffers = "AvailableForOffers",
  /** TotalCapacity */
  TotalCapacity = "TotalCapacity",
  /** QueueAssignments */
  QueueAssignments = "QueueAssignments",
  /** Labels */
  Labels = "Labels",
  /** Tags */
  Tags = "Tags",
  /** ChannelConfigurations */
  ChannelConfigurations = "ChannelConfigurations",
}

/**
 * Worker properties that can be updated \
 * {@link KnownAcsRouterUpdatedWorkerProperty} can be used interchangeably with AcsRouterUpdatedWorkerProperty,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AvailableForOffers**: AvailableForOffers \
 * **TotalCapacity**: TotalCapacity \
 * **QueueAssignments**: QueueAssignments \
 * **Labels**: Labels \
 * **Tags**: Tags \
 * **ChannelConfigurations**: ChannelConfigurations
 */
export type AcsRouterUpdatedWorkerProperty = string;

/** Schema of common properties of all chat thread events */
export interface AcsMessageEventData {
  /** The message sender */
  from: string;
  /** The message recipient */
  to: string;
  /** The time message was received */
  receivedTimeStamp: Date;
  /** The channel event error */
  error?: AcsMessageChannelEventError;
}

export function acsMessageEventDataDeserializer(item: any): AcsMessageEventData {
  return {
    from: item["from"],
    to: item["to"],
    receivedTimeStamp: new Date(item["receivedTimeStamp"]),
    error: !item["error"] ? item["error"] : acsMessageChannelEventErrorDeserializer(item["error"]),
  };
}

/** Message Channel Event Error */
export interface AcsMessageChannelEventError {
  /** The channel error code */
  channelCode?: string;
  /** The channel error message */
  channelMessage?: string;
}

export function acsMessageChannelEventErrorDeserializer(item: any): AcsMessageChannelEventError {
  return {
    channelCode: item["channelCode"],
    channelMessage: item["channelMessage"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.AdvancedMessageDeliveryStatusUpdated event. */
export interface AcsMessageDeliveryStatusUpdatedEventData extends AcsMessageEventData {
  /** The message id */
  messageId?: string;
  /** The updated message status */
  status: AcsMessageDeliveryStatus;
  /** The updated message channel type */
  channelKind: AcsMessageChannelKind;
}

export function acsMessageDeliveryStatusUpdatedEventDataDeserializer(
  item: any,
): AcsMessageDeliveryStatusUpdatedEventData {
  return {
    from: item["from"],
    to: item["to"],
    receivedTimeStamp: new Date(item["receivedTimeStamp"]),
    error: !item["error"] ? item["error"] : acsMessageChannelEventErrorDeserializer(item["error"]),
    messageId: item["messageId"],
    status: item["status"],
    channelKind: item["channelType"],
  };
}

/** Message delivery status */
export enum KnownAcsMessageDeliveryStatus {
  /** Read */
  Read = "read",
  /** Delivered */
  Delivered = "delivered",
  /** Failed */
  Failed = "failed",
  /** Sent */
  Sent = "sent",
  /** Warning */
  Warning = "warning",
  /** Unknown */
  Unknown = "unknown",
}

/**
 * Message delivery status \
 * {@link KnownAcsMessageDeliveryStatus} can be used interchangeably with AcsMessageDeliveryStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **read**: Read \
 * **delivered**: Delivered \
 * **failed**: Failed \
 * **sent**: Sent \
 * **warning**: Warning \
 * **unknown**: Unknown
 */
export type AcsMessageDeliveryStatus = string;

/** Message channel kind */
export enum KnownAcsMessageChannelKind {
  /** Updated message channel type is WhatsApp */
  Whatsapp = "whatsapp",
}

/**
 * Message channel kind \
 * {@link KnownAcsMessageChannelKind} can be used interchangeably with AcsMessageChannelKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **whatsapp**: Updated message channel type is WhatsApp
 */
export type AcsMessageChannelKind = string;

/** Schema of the Data property of an EventGridEvent for a Microsoft.Communication.AdvancedMessageReceived event. */
export interface AcsMessageReceivedEventData extends AcsMessageEventData {
  /** Optional. The message content */
  content?: string;
  /** Optional. Message ID. Format is Guid as string. */
  messageId?: string;
  /** Required. The message channel type */
  channelKind: AcsMessageChannelKind;
  /** Required. Whatsapp message type */
  messageType: string;
  /** Optional. The received message media content */
  mediaContent?: AcsMessageMediaContent;
  /** Optional. The received message reaction content */
  reaction?: AcsMessageReactionContent;
  /** Optional. The received message context */
  context?: AcsMessageContext;
  /** Optional. The received message button content */
  button?: AcsMessageButtonContent;
  /** Optional. The received message interactive content */
  interactiveContent?: AcsMessageInteractiveContent;
}

export function acsMessageReceivedEventDataDeserializer(item: any): AcsMessageReceivedEventData {
  return {
    from: item["from"],
    to: item["to"],
    receivedTimeStamp: new Date(item["receivedTimeStamp"]),
    error: !item["error"] ? item["error"] : acsMessageChannelEventErrorDeserializer(item["error"]),
    content: item["content"],
    messageId: item["messageId"],
    channelKind: item["channelType"],
    messageType: item["messageType"],
    mediaContent: !item["media"]
      ? item["media"]
      : acsMessageMediaContentDeserializer(item["media"]),
    reaction: !item["reaction"]
      ? item["reaction"]
      : acsMessageReactionContentDeserializer(item["reaction"]),
    context: !item["context"] ? item["context"] : acsMessageContextDeserializer(item["context"]),
    button: !item["button"] ? item["button"] : acsMessageButtonContentDeserializer(item["button"]),
    interactiveContent: !item["interactive"]
      ? item["interactive"]
      : acsMessageInteractiveContentDeserializer(item["interactive"]),
  };
}

/** Message Media Content */
export interface AcsMessageMediaContent {
  /** Required. The MIME type of the file this media represents */
  mimeType: string;
  /** Required. The media identifier */
  mediaId: string;
  /** Optional. The filename of the underlying media file as specified when uploaded */
  fileName?: string;
  /** Optional. The caption for the media object, if supported and provided */
  caption?: string;
  /** Optional. Set to true if the sticker is animated; false otherwise. */
  animated?: boolean;
}

export function acsMessageMediaContentDeserializer(item: any): AcsMessageMediaContent {
  return {
    mimeType: item["mimeType"],
    mediaId: item["id"],
    fileName: item["fileName"],
    caption: item["caption"],
    animated: item["animated"],
  };
}

/** Message Reaction Content */
export interface AcsMessageReactionContent {
  /** Required. WhatsApp message ID of the message that the emoji is applied to */
  messageId: string;
  /** Optional. Unicode escape sequence of the emoji. */
  emoji?: string;
}

export function acsMessageReactionContentDeserializer(item: any): AcsMessageReactionContent {
  return {
    messageId: item["messageId"],
    emoji: item["emoji"],
  };
}

/** Message Context */
export interface AcsMessageContext {
  /** The WhatsApp ID for the customer who replied to an inbound message. */
  from?: string;
  /** The message ID for the sent message for an inbound reply */
  messageId?: string;
}

export function acsMessageContextDeserializer(item: any): AcsMessageContext {
  return {
    from: item["from"],
    messageId: item["id"],
  };
}

/** Message Button Content */
export interface AcsMessageButtonContent {
  /** The Text of the button */
  text?: string;
  /** The Payload of the button which was clicked by the user, setup by the business */
  payload?: string;
}

export function acsMessageButtonContentDeserializer(item: any): AcsMessageButtonContent {
  return {
    text: item["text"],
    payload: item["payload"],
  };
}

/** Message Interactive Content */
export interface AcsMessageInteractiveContent {
  /** The Message interactive reply type */
  replyKind: AcsInteractiveReplyKind;
  /** The Message Sent when a customer clicks a button */
  buttonReply?: AcsMessageInteractiveButtonReplyContent;
  /** The Message Sent when a customer selects an item from a list */
  listReply?: AcsMessageInteractiveListReplyContent;
}

export function acsMessageInteractiveContentDeserializer(item: any): AcsMessageInteractiveContent {
  return {
    replyKind: item["type"],
    buttonReply: !item["buttonReply"]
      ? item["buttonReply"]
      : acsMessageInteractiveButtonReplyContentDeserializer(item["buttonReply"]),
    listReply: !item["listReply"]
      ? item["listReply"]
      : acsMessageInteractiveListReplyContentDeserializer(item["listReply"]),
  };
}

/** Interactive reply kind */
export enum KnownAcsInteractiveReplyKind {
  /** Messaged interactive reply type is ButtonReply */
  ButtonReply = "buttonReply",
  /** Messaged interactive reply type is ListReply */
  ListReply = "listReply",
  /** Messaged interactive reply type is Unknown */
  Unknown = "unknown",
}

/**
 * Interactive reply kind \
 * {@link KnownAcsInteractiveReplyKind} can be used interchangeably with AcsInteractiveReplyKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **buttonReply**: Messaged interactive reply type is ButtonReply \
 * **listReply**: Messaged interactive reply type is ListReply \
 * **unknown**: Messaged interactive reply type is Unknown
 */
export type AcsInteractiveReplyKind = string;

/** Message Interactive button reply content for a user to business message */
export interface AcsMessageInteractiveButtonReplyContent {
  /** The ID of the button */
  buttonId?: string;
  /** The title of the button */
  title?: string;
}

export function acsMessageInteractiveButtonReplyContentDeserializer(
  item: any,
): AcsMessageInteractiveButtonReplyContent {
  return {
    buttonId: item["id"],
    title: item["title"],
  };
}

/** Message Interactive list reply content for a user to business message */
export interface AcsMessageInteractiveListReplyContent {
  /** The ID of the selected list item */
  listItemId?: string;
  /** The title of the selected list item */
  title?: string;
  /** The description of the selected row */
  description?: string;
}

export function acsMessageInteractiveListReplyContentDeserializer(
  item: any,
): AcsMessageInteractiveListReplyContent {
  return {
    listItemId: item["id"],
    title: item["title"],
    description: item["description"],
  };
}

/** The content of the event request message. */
export interface ContainerRegistryEventData {
  /** The event ID. */
  id: string;
  /** The time at which the event occurred. */
  timestamp: Date;
  /** The action that encompasses the provided event. */
  action: string;
  /** The location of the event. */
  location: string;
  /** The target of the event. */
  target: ContainerRegistryEventTarget;
  /** The request that generated the event. */
  request?: ContainerRegistryEventRequest;
  /** The agent that initiated the event. For most situations, this could be from the authorization context of the request. */
  actor?: ContainerRegistryEventActor;
  /** The registry node that generated the event. Put differently, while the actor initiates the event, the source generates it. */
  source?: ContainerRegistryEventSource;
  /** The connected registry information if the event is generated by a connected registry. */
  connectedRegistry?: ContainerRegistryEventConnectedRegistry;
}

export function containerRegistryEventDataDeserializer(item: any): ContainerRegistryEventData {
  return {
    id: item["id"],
    timestamp: new Date(item["timestamp"]),
    action: item["action"],
    location: item["location"],
    target: containerRegistryEventTargetDeserializer(item["target"]),
    request: !item["request"]
      ? item["request"]
      : containerRegistryEventRequestDeserializer(item["request"]),
    actor: !item["actor"] ? item["actor"] : containerRegistryEventActorDeserializer(item["actor"]),
    source: !item["source"]
      ? item["source"]
      : containerRegistryEventSourceDeserializer(item["source"]),
    connectedRegistry: !item["connectedRegistry"]
      ? item["connectedRegistry"]
      : containerRegistryEventConnectedRegistryDeserializer(item["connectedRegistry"]),
  };
}

/** The target of the event. */
export interface ContainerRegistryEventTarget {
  /** The MIME type of the referenced object. */
  mediaType: string;
  /** The number of bytes of the content. Same as Length field. */
  size?: number;
  /** The digest of the content, as defined by the Registry V2 HTTP API Specification. */
  digest?: string;
  /** The number of bytes of the content. Same as Size field. */
  length?: number;
  /** The repository name. */
  repository: string;
  /** The direct URL to the content. */
  url?: string;
  /** The tag name. */
  tag?: string;
}

export function containerRegistryEventTargetDeserializer(item: any): ContainerRegistryEventTarget {
  return {
    mediaType: item["mediaType"],
    size: item["size"],
    digest: item["digest"],
    length: item["length"],
    repository: item["repository"],
    url: item["url"],
    tag: item["tag"],
  };
}

/** The request that generated the event. */
export interface ContainerRegistryEventRequest {
  /** The ID of the request that initiated the event. */
  id: string;
  /** The IP or hostname and possibly port of the client connection that initiated the event. This is the RemoteAddr from the standard http request. */
  addr?: string;
  /** The externally accessible hostname of the registry instance, as specified by the http host header on incoming requests. */
  host: string;
  /** The request method that generated the event. */
  method: string;
  /** The user agent header of the request. */
  useragent?: string;
}

export function containerRegistryEventRequestDeserializer(
  item: any,
): ContainerRegistryEventRequest {
  return {
    id: item["id"],
    addr: item["addr"],
    host: item["host"],
    method: item["method"],
    useragent: item["useragent"],
  };
}

/** The agent that initiated the event. For most situations, this could be from the authorization context of the request. */
export interface ContainerRegistryEventActor {
  /** The subject or username associated with the request context that generated the event. */
  name?: string;
}

export function containerRegistryEventActorDeserializer(item: any): ContainerRegistryEventActor {
  return {
    name: item["name"],
  };
}

/** The registry node that generated the event. Put differently, while the actor initiates the event, the source generates it. */
export interface ContainerRegistryEventSource {
  /** The IP or hostname and the port of the registry node that generated the event. Generally, this will be resolved by os.Hostname() along with the running port. */
  addr?: string;
  /** The running instance of an application. Changes after each restart. */
  instanceId?: string;
}

export function containerRegistryEventSourceDeserializer(item: any): ContainerRegistryEventSource {
  return {
    addr: item["addr"],
    instanceId: item["instanceID"],
  };
}

/** The connected registry information if the event is generated by a connected registry. */
export interface ContainerRegistryEventConnectedRegistry {
  /** The name of the connected registry that generated this event. */
  name: string;
}

export function containerRegistryEventConnectedRegistryDeserializer(
  item: any,
): ContainerRegistryEventConnectedRegistry {
  return {
    name: item["name"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerRegistry.ImagePushed event. */
export interface ContainerRegistryImagePushedEventData extends ContainerRegistryEventData {}

export function containerRegistryImagePushedEventDataDeserializer(
  item: any,
): ContainerRegistryImagePushedEventData {
  return {
    id: item["id"],
    timestamp: new Date(item["timestamp"]),
    action: item["action"],
    location: item["location"],
    target: containerRegistryEventTargetDeserializer(item["target"]),
    request: !item["request"]
      ? item["request"]
      : containerRegistryEventRequestDeserializer(item["request"]),
    actor: !item["actor"] ? item["actor"] : containerRegistryEventActorDeserializer(item["actor"]),
    source: !item["source"]
      ? item["source"]
      : containerRegistryEventSourceDeserializer(item["source"]),
    connectedRegistry: !item["connectedRegistry"]
      ? item["connectedRegistry"]
      : containerRegistryEventConnectedRegistryDeserializer(item["connectedRegistry"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerRegistry.ImageDeleted event. */
export interface ContainerRegistryImageDeletedEventData extends ContainerRegistryEventData {}

export function containerRegistryImageDeletedEventDataDeserializer(
  item: any,
): ContainerRegistryImageDeletedEventData {
  return {
    id: item["id"],
    timestamp: new Date(item["timestamp"]),
    action: item["action"],
    location: item["location"],
    target: containerRegistryEventTargetDeserializer(item["target"]),
    request: !item["request"]
      ? item["request"]
      : containerRegistryEventRequestDeserializer(item["request"]),
    actor: !item["actor"] ? item["actor"] : containerRegistryEventActorDeserializer(item["actor"]),
    source: !item["source"]
      ? item["source"]
      : containerRegistryEventSourceDeserializer(item["source"]),
    connectedRegistry: !item["connectedRegistry"]
      ? item["connectedRegistry"]
      : containerRegistryEventConnectedRegistryDeserializer(item["connectedRegistry"]),
  };
}

/** The content of the event request message. */
export interface ContainerRegistryArtifactEventData {
  /** The event ID. */
  id: string;
  /** The time at which the event occurred. */
  timestamp: Date;
  /** The action that encompasses the provided event. */
  action: string;
  /** The location of the event. */
  location: string;
  /** The target of the event. */
  target: ContainerRegistryArtifactEventTarget;
  /** The connected registry information if the event is generated by a connected registry. */
  connectedRegistry?: ContainerRegistryEventConnectedRegistry;
}

export function containerRegistryArtifactEventDataDeserializer(
  item: any,
): ContainerRegistryArtifactEventData {
  return {
    id: item["id"],
    timestamp: new Date(item["timestamp"]),
    action: item["action"],
    location: item["location"],
    target: containerRegistryArtifactEventTargetDeserializer(item["target"]),
    connectedRegistry: !item["connectedRegistry"]
      ? item["connectedRegistry"]
      : containerRegistryEventConnectedRegistryDeserializer(item["connectedRegistry"]),
  };
}

/** The target of the event. */
export interface ContainerRegistryArtifactEventTarget {
  /** The MIME type of the artifact. */
  mediaType: string;
  /** The size in bytes of the artifact. */
  size?: number;
  /** The digest of the artifact. */
  digest?: string;
  /** The repository name of the artifact. */
  repository: string;
  /** The tag of the artifact. */
  tag?: string;
  /** The name of the artifact. */
  name?: string;
  /** The version of the artifact. */
  version?: string;
}

export function containerRegistryArtifactEventTargetDeserializer(
  item: any,
): ContainerRegistryArtifactEventTarget {
  return {
    mediaType: item["mediaType"],
    size: item["size"],
    digest: item["digest"],
    repository: item["repository"],
    tag: item["tag"],
    name: item["name"],
    version: item["version"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerRegistry.ChartPushed event. */
export interface ContainerRegistryChartPushedEventData extends ContainerRegistryArtifactEventData {}

export function containerRegistryChartPushedEventDataDeserializer(
  item: any,
): ContainerRegistryChartPushedEventData {
  return {
    id: item["id"],
    timestamp: new Date(item["timestamp"]),
    action: item["action"],
    location: item["location"],
    target: containerRegistryArtifactEventTargetDeserializer(item["target"]),
    connectedRegistry: !item["connectedRegistry"]
      ? item["connectedRegistry"]
      : containerRegistryEventConnectedRegistryDeserializer(item["connectedRegistry"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerRegistry.ChartDeleted event. */
export interface ContainerRegistryChartDeletedEventData extends ContainerRegistryArtifactEventData {}

export function containerRegistryChartDeletedEventDataDeserializer(
  item: any,
): ContainerRegistryChartDeletedEventData {
  return {
    id: item["id"],
    timestamp: new Date(item["timestamp"]),
    action: item["action"],
    location: item["location"],
    target: containerRegistryArtifactEventTargetDeserializer(item["target"]),
    connectedRegistry: !item["connectedRegistry"]
      ? item["connectedRegistry"]
      : containerRegistryEventConnectedRegistryDeserializer(item["connectedRegistry"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerService.NewKubernetesVersionAvailable event */
export interface ContainerServiceNewKubernetesVersionAvailableEventData {
  /** The highest PATCH Kubernetes version for the highest MINOR version supported by ManagedCluster resource */
  latestSupportedKubernetesVersion: string;
  /** The highest PATCH Kubernetes version for the MINOR version considered stable for the ManagedCluster resource */
  latestStableKubernetesVersion: string;
  /** The highest PATCH Kubernetes version for the lowest applicable MINOR version available for the ManagedCluster resource */
  lowestMinorKubernetesVersion: string;
  /** The highest PATCH Kubernetes version considered preview for the ManagedCluster resource. There might not be any version in preview at the time of publishing the event */
  latestPreviewKubernetesVersion?: string;
}

export function containerServiceNewKubernetesVersionAvailableEventDataDeserializer(
  item: any,
): ContainerServiceNewKubernetesVersionAvailableEventData {
  return {
    latestSupportedKubernetesVersion: item["latestSupportedKubernetesVersion"],
    latestStableKubernetesVersion: item["latestStableKubernetesVersion"],
    lowestMinorKubernetesVersion: item["lowestMinorKubernetesVersion"],
    latestPreviewKubernetesVersion: item["latestPreviewKubernetesVersion"],
  };
}

/** Schema of common properties of cluster support events */
export interface ContainerServiceClusterSupportEventData {
  /** The Kubernetes version of the ManagedCluster resource */
  kubernetesVersion: string;
}

export function containerServiceClusterSupportEventDataDeserializer(
  item: any,
): ContainerServiceClusterSupportEventData {
  return {
    kubernetesVersion: item["kubernetesVersion"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerService.ClusterSupportEnded event */
export interface ContainerServiceClusterSupportEndedEventData extends ContainerServiceClusterSupportEventData {}

export function containerServiceClusterSupportEndedEventDataDeserializer(
  item: any,
): ContainerServiceClusterSupportEndedEventData {
  return {
    kubernetesVersion: item["kubernetesVersion"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerService.ClusterSupportEnding event */
export interface ContainerServiceClusterSupportEndingEventData extends ContainerServiceClusterSupportEventData {}

export function containerServiceClusterSupportEndingEventDataDeserializer(
  item: any,
): ContainerServiceClusterSupportEndingEventData {
  return {
    kubernetesVersion: item["kubernetesVersion"],
  };
}

/** Schema of common properties of node pool rolling events */
export interface ContainerServiceNodePoolRollingEventData {
  /** The name of the node pool in the ManagedCluster resource */
  nodePoolName: string;
}

export function containerServiceNodePoolRollingEventDataDeserializer(
  item: any,
): ContainerServiceNodePoolRollingEventData {
  return {
    nodePoolName: item["nodePoolName"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerService.NodePoolRollingStarted event */
export interface ContainerServiceNodePoolRollingStartedEventData extends ContainerServiceNodePoolRollingEventData {}

export function containerServiceNodePoolRollingStartedEventDataDeserializer(
  item: any,
): ContainerServiceNodePoolRollingStartedEventData {
  return {
    nodePoolName: item["nodePoolName"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerService.NodePoolRollingSucceeded event */
export interface ContainerServiceNodePoolRollingSucceededEventData extends ContainerServiceNodePoolRollingEventData {}

export function containerServiceNodePoolRollingSucceededEventDataDeserializer(
  item: any,
): ContainerServiceNodePoolRollingSucceededEventData {
  return {
    nodePoolName: item["nodePoolName"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ContainerService.NodePoolRollingFailed event */
export interface ContainerServiceNodePoolRollingFailedEventData extends ContainerServiceNodePoolRollingEventData {}

export function containerServiceNodePoolRollingFailedEventDataDeserializer(
  item: any,
): ContainerServiceNodePoolRollingFailedEventData {
  return {
    nodePoolName: item["nodePoolName"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.DataBox.CopyStarted event. */
export interface DataBoxCopyStartedEventData {
  /** Serial Number of the device associated with the event. The list is comma separated if more than one serial number is associated. */
  serialNumber: string;
  /** Name of the current Stage */
  stageName: DataBoxStageName;
  /** The time at which the stage happened. */
  stageTime: Date;
}

export function dataBoxCopyStartedEventDataDeserializer(item: any): DataBoxCopyStartedEventData {
  return {
    serialNumber: item["serialNumber"],
    stageName: item["stageName"],
    stageTime: new Date(item["stageTime"]),
  };
}

/** Schema of DataBox Stage Name enumeration. */
export enum KnownDataBoxStageName {
  /** Copy has started */
  CopyStarted = "CopyStarted",
  /** Copy has completed */
  CopyCompleted = "CopyCompleted",
  /** Order has been completed */
  OrderCompleted = "OrderCompleted",
}

/**
 * Schema of DataBox Stage Name enumeration. \
 * {@link KnownDataBoxStageName} can be used interchangeably with DataBoxStageName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CopyStarted**: Copy has started \
 * **CopyCompleted**: Copy has completed \
 * **OrderCompleted**: Order has been completed
 */
export type DataBoxStageName = string;

/** Schema of the Data property of an EventGridEvent for a Microsoft.DataBox.CopyCompleted event. */
export interface DataBoxCopyCompletedEventData {
  /** Serial Number of the device associated with the event. The list is comma separated if more than one serial number is associated. */
  serialNumber: string;
  /** Name of the current Stage */
  stageName: DataBoxStageName;
  /** The time at which the stage happened. */
  stageTime: Date;
}

export function dataBoxCopyCompletedEventDataDeserializer(
  item: any,
): DataBoxCopyCompletedEventData {
  return {
    serialNumber: item["serialNumber"],
    stageName: item["stageName"],
    stageTime: new Date(item["stageTime"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.DataBox.OrderCompleted event. */
export interface DataBoxOrderCompletedEventData {
  /** Serial Number of the device associated with the event. The list is comma separated if more than one serial number is associated. */
  serialNumber: string;
  /** Name of the current Stage */
  stageName: DataBoxStageName;
  /** The time at which the stage happened. */
  stageTime: Date;
}

export function dataBoxOrderCompletedEventDataDeserializer(
  item: any,
): DataBoxOrderCompletedEventData {
  return {
    serialNumber: item["serialNumber"],
    stageName: item["stageName"],
    stageTime: new Date(item["stageTime"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Edge.SolutionVersionPublished event. */
export interface EdgeSolutionVersionPublishedEventData {
  /** A GUID to uniquely track External Solution Validation */
  externalValidationId: string;
  /** ARM ID of the Target resource */
  targetId: string;
  /** ARM ID of the Solution Template resource */
  solutionTemplateId: string;
  /** ARM ID of the Solution Template Version resource */
  solutionTemplateVersionId: string;
  /** ARM ID of the Solution Version resource */
  solutionVersionId: string;
  /** API Version supported for the resources */
  apiVersion: string;
  /** Direct URL to callback for updating validation status */
  callbackUrl: string;
}

export function edgeSolutionVersionPublishedEventDataDeserializer(
  item: any,
): EdgeSolutionVersionPublishedEventData {
  return {
    externalValidationId: item["externalValidationId"],
    targetId: item["targetId"],
    solutionTemplateId: item["solutionTemplateId"],
    solutionTemplateVersionId: item["solutionTemplateVersionId"],
    solutionVersionId: item["solutionVersionId"],
    apiVersion: item["apiVersion"],
    callbackUrl: item["callbackUrl"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.EventHub.CaptureFileCreated event. */
export interface EventHubCaptureFileCreatedEventData {
  /** The path to the capture file. */
  fileUrl: string;
  /** The file type of the capture file. */
  fileType: string;
  /** The shard ID. */
  partitionId: string;
  /** The file size. */
  sizeInBytes: number;
  /** The number of events in the file. */
  eventCount: number;
  /** The smallest sequence number from the queue. */
  firstSequenceNumber: number;
  /** The last sequence number from the queue. */
  lastSequenceNumber: number;
  /** The first time from the queue. */
  firstEnqueueTime: Date;
  /** The last time from the queue. */
  lastEnqueueTime: Date;
}

export function eventHubCaptureFileCreatedEventDataDeserializer(
  item: any,
): EventHubCaptureFileCreatedEventData {
  return {
    fileUrl: item["fileUrl"],
    fileType: item["fileType"],
    partitionId: item["partitionId"],
    sizeInBytes: item["sizeInBytes"],
    eventCount: item["eventCount"],
    firstSequenceNumber: item["firstSequenceNumber"],
    lastSequenceNumber: item["lastSequenceNumber"],
    firstEnqueueTime: new Date(item["firstEnqueueTime"]),
    lastEnqueueTime: new Date(item["lastEnqueueTime"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Geofence event (GeofenceEntered, GeofenceExited, GeofenceResult). */
export interface MapsGeofenceEvent {
  /** Lists of the geometry ID of the geofence which is expired relative to the user time in the request. */
  readonly expiredGeofenceGeometryId: string[];
  /** Lists the fence geometries that either fully contain the coordinate position or have an overlap with the searchBuffer around the fence. */
  readonly geometries: MapsGeofenceGeometry[];
  /** Lists of the geometry ID of the geofence which is in invalid period relative to the user time in the request. */
  readonly invalidPeriodGeofenceGeometryId: string[];
  /** True if at least one event is published to the Azure Maps event subscriber, false if no event is published to the Azure Maps event subscriber. */
  isEventPublished: boolean;
}

export function mapsGeofenceEventDeserializer(item: any): MapsGeofenceEvent {
  return {
    expiredGeofenceGeometryId: item["expiredGeofenceGeometryId"].map((p: any) => {
      return p;
    }),
    geometries: mapsGeofenceGeometryArrayDeserializer(item["geometries"]),
    invalidPeriodGeofenceGeometryId: item["invalidPeriodGeofenceGeometryId"].map((p: any) => {
      return p;
    }),
    isEventPublished: item["isEventPublished"],
  };
}

export function mapsGeofenceGeometryArrayDeserializer(result: Array<MapsGeofenceGeometry>): any[] {
  return result.map((item) => {
    return mapsGeofenceGeometryDeserializer(item);
  });
}

/** The geofence geometry. */
export interface MapsGeofenceGeometry {
  /** ID of the device. */
  deviceId: string;
  /** Distance from the coordinate to the closest border of the geofence. Positive means the coordinate is outside of the geofence. If the coordinate is outside of the geofence, but more than the value of searchBuffer away from the closest geofence border, then the value is 999. Negative means the coordinate is inside of the geofence. If the coordinate is inside the polygon, but more than the value of searchBuffer away from the closest geofencing border,then the value is -999. A value of 999 means that there is great confidence the coordinate is well outside the geofence. A value of -999 means that there is great confidence the coordinate is well within the geofence. */
  distance: number;
  /** The unique ID for the geofence geometry. */
  geometryId: string;
  /** Latitude of the nearest point of the geometry. */
  nearestLat: number;
  /** Longitude of the nearest point of the geometry. */
  nearestLon: number;
  /** The unique id returned from user upload service when uploading a geofence. Will not be included in geofencing post API. */
  udId?: string;
}

export function mapsGeofenceGeometryDeserializer(item: any): MapsGeofenceGeometry {
  return {
    deviceId: item["deviceId"],
    distance: item["distance"],
    geometryId: item["geometryId"],
    nearestLat: item["nearestLat"],
    nearestLon: item["nearestLon"],
    udId: item["udId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Maps.GeofenceEntered event. */
export interface MapsGeofenceEnteredEventData extends MapsGeofenceEvent {}

export function mapsGeofenceEnteredEventDataDeserializer(item: any): MapsGeofenceEnteredEventData {
  return {
    expiredGeofenceGeometryId: item["expiredGeofenceGeometryId"].map((p: any) => {
      return p;
    }),
    geometries: mapsGeofenceGeometryArrayDeserializer(item["geometries"]),
    invalidPeriodGeofenceGeometryId: item["invalidPeriodGeofenceGeometryId"].map((p: any) => {
      return p;
    }),
    isEventPublished: item["isEventPublished"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Maps.GeofenceExited event. */
export interface MapsGeofenceExitedEventData extends MapsGeofenceEvent {}

export function mapsGeofenceExitedEventDataDeserializer(item: any): MapsGeofenceExitedEventData {
  return {
    expiredGeofenceGeometryId: item["expiredGeofenceGeometryId"].map((p: any) => {
      return p;
    }),
    geometries: mapsGeofenceGeometryArrayDeserializer(item["geometries"]),
    invalidPeriodGeofenceGeometryId: item["invalidPeriodGeofenceGeometryId"].map((p: any) => {
      return p;
    }),
    isEventPublished: item["isEventPublished"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Maps.GeofenceResult event. */
export interface MapsGeofenceResultEventData extends MapsGeofenceEvent {}

export function mapsGeofenceResultEventDataDeserializer(item: any): MapsGeofenceResultEventData {
  return {
    expiredGeofenceGeometryId: item["expiredGeofenceGeometryId"].map((p: any) => {
      return p;
    }),
    geometries: mapsGeofenceGeometryArrayDeserializer(item["geometries"]),
    invalidPeriodGeofenceGeometryId: item["invalidPeriodGeofenceGeometryId"].map((p: any) => {
      return p;
    }),
    isEventPublished: item["isEventPublished"],
  };
}

/** Schema of the Data property of an EventGridEvent for a device life cycle event (DeviceCreated, DeviceDeleted). */
export interface DeviceLifeCycleEvent {
  /** The unique identifier of the device. This case-sensitive string can be up to 128 characters long, and supports ASCII 7-bit alphanumeric characters plus the following special characters: - : . + % _ &#35; * ? ! ( ) , = `@` ; $ '. */
  deviceId: string;
  /** Name of the IoT Hub where the device was created or deleted. */
  hubName: string;
  /** Information about the device twin, which is the cloud representation of application device metadata. */
  twin: DeviceTwinInfo;
}

export function deviceLifeCycleEventDeserializer(item: any): DeviceLifeCycleEvent {
  return {
    deviceId: item["deviceId"],
    hubName: item["hubName"],
    twin: deviceTwinInfoDeserializer(item["twin"]),
  };
}

/** Information about the device twin, which is the cloud representation of application device metadata. */
export interface DeviceTwinInfo {
  /** Authentication type used for this device: either SAS, SelfSigned, or CertificateAuthority. */
  authenticationType: string;
  /** Count of cloud to device messages sent to this device. */
  cloudToDeviceMessageCount: number;
  /** Whether the device is connected or disconnected. */
  connectionState: string;
  /** The unique identifier of the device twin. */
  deviceId: string;
  /** A piece of information that describes the content of the device twin. Each etag is guaranteed to be unique per device twin. */
  etag: string;
  /** The ISO8601 timestamp of the last activity. */
  lastActivityTime: string;
  /** Properties JSON element. */
  properties: DeviceTwinInfoProperties;
  /** Whether the device twin is enabled or disabled. */
  status: string;
  /** The ISO8601 timestamp of the last device twin status update. */
  statusUpdateTime: string;
  /** An integer that is incremented by one each time the device twin is updated. */
  version: number;
  /** The thumbprint is a unique value for the x509 certificate, commonly used to find a particular certificate in a certificate store. The thumbprint is dynamically generated using the SHA1 algorithm, and does not physically exist in the certificate. */
  x509Thumbprint: DeviceTwinInfoX509Thumbprint;
}

export function deviceTwinInfoDeserializer(item: any): DeviceTwinInfo {
  return {
    authenticationType: item["authenticationType"],
    cloudToDeviceMessageCount: item["cloudToDeviceMessageCount"],
    connectionState: item["connectionState"],
    deviceId: item["deviceId"],
    etag: item["etag"],
    lastActivityTime: item["lastActivityTime"],
    properties: deviceTwinInfoPropertiesDeserializer(item["properties"]),
    status: item["status"],
    statusUpdateTime: item["statusUpdateTime"],
    version: item["version"],
    x509Thumbprint: deviceTwinInfoX509ThumbprintDeserializer(item["x509Thumbprint"]),
  };
}

/** Properties JSON element. */
export interface DeviceTwinInfoProperties {
  /** A portion of the properties that can be written only by the application back-end, and read by the device. */
  desired: DeviceTwin;
  /** A portion of the properties that can be written only by the device, and read by the application back-end. */
  reported: DeviceTwin;
}

export function deviceTwinInfoPropertiesDeserializer(item: any): DeviceTwinInfoProperties {
  return {
    desired: deviceTwinDeserializer(item["desired"]),
    reported: deviceTwinDeserializer(item["reported"]),
  };
}

/** A portion of the properties that can be written only by the application back-end, and read by the device. */
export interface DeviceTwin {
  /** Metadata information for the properties JSON document. */
  metadata: DeviceTwinMetadata;
  /** Version of device twin properties. */
  version: number;
}

export function deviceTwinDeserializer(item: any): DeviceTwin {
  return {
    metadata: deviceTwinMetadataDeserializer(item["metadata"]),
    version: item["version"],
  };
}

/** Metadata information for the properties JSON document. */
export interface DeviceTwinMetadata {
  /** The ISO8601 timestamp of the last time the properties were updated. */
  lastUpdated: string;
}

export function deviceTwinMetadataDeserializer(item: any): DeviceTwinMetadata {
  return {
    lastUpdated: item["lastUpdated"],
  };
}

/** The thumbprint is a unique value for the x509 certificate, commonly used to find a particular certificate in a certificate store. The thumbprint is dynamically generated using the SHA1 algorithm, and does not physically exist in the certificate. */
export interface DeviceTwinInfoX509Thumbprint {
  /** Primary thumbprint for the x509 certificate. */
  primaryThumbprint: string;
  /** Secondary thumbprint for the x509 certificate. */
  secondaryThumbprint: string;
}

export function deviceTwinInfoX509ThumbprintDeserializer(item: any): DeviceTwinInfoX509Thumbprint {
  return {
    primaryThumbprint: item["primaryThumbprint"],
    secondaryThumbprint: item["secondaryThumbprint"],
  };
}

/** Schema of the Data property of an EventGridEvent for a device connection state event (DeviceConnected, DeviceDisconnected). */
export interface DeviceConnectionStateEvent {
  /** The unique identifier of the device. This case-sensitive string can be up to 128 characters long, and supports ASCII 7-bit alphanumeric characters plus the following special characters: - : . + % _ &#35; * ? ! ( ) , = `@` ; $ '. */
  deviceId: string;
  /** The unique identifier of the module. This case-sensitive string can be up to 128 characters long, and supports ASCII 7-bit alphanumeric characters plus the following special characters: - : . + % _ &#35; * ? ! ( ) , = `@` ; $ '. */
  moduleId?: string;
  /** Name of the IoT Hub where the device was created or deleted. */
  hubName: string;
  /** Information about the device connection state event. */
  deviceConnectionStateEventInfo: DeviceConnectionStateEventInfo;
}

export function deviceConnectionStateEventDeserializer(item: any): DeviceConnectionStateEvent {
  return {
    deviceId: item["deviceId"],
    moduleId: item["moduleId"],
    hubName: item["hubName"],
    deviceConnectionStateEventInfo: deviceConnectionStateEventInfoDeserializer(
      item["deviceConnectionStateEventInfo"],
    ),
  };
}

/** Information about the device connection state event. */
export interface DeviceConnectionStateEventInfo {
  /** Sequence number is string representation of a hexadecimal number. string compare can be used to identify the larger number because both in ASCII and HEX numbers come after alphabets. If you are converting the string to hex, then the number is a 256 bit number. */
  sequenceNumber: string;
}

export function deviceConnectionStateEventInfoDeserializer(
  item: any,
): DeviceConnectionStateEventInfo {
  return {
    sequenceNumber: item["sequenceNumber"],
  };
}

/** Schema of the Data property of an EventGridEvent for a device telemetry event (DeviceTelemetry). */
export interface DeviceTelemetryEvent {
  /** The content of the message from the device. */
  body: Record<string, any>;
  /** Application properties are user-defined strings that can be added to the message. These fields are optional. */
  readonly properties: Record<string, string>;
  /** System properties help identify contents and source of the messages. */
  readonly systemProperties: Record<string, string>;
}

export function deviceTelemetryEventDeserializer(item: any): DeviceTelemetryEvent {
  return {
    body: item["body"],
    properties: item["properties"],
    systemProperties: item["systemProperties"],
  };
}

/** Event data for Microsoft.Devices.DeviceCreated event. */
export interface IotHubDeviceCreatedEventData extends DeviceLifeCycleEvent {}

export function iotHubDeviceCreatedEventDataDeserializer(item: any): IotHubDeviceCreatedEventData {
  return {
    deviceId: item["deviceId"],
    hubName: item["hubName"],
    twin: deviceTwinInfoDeserializer(item["twin"]),
  };
}

/** Event data for Microsoft.Devices.DeviceDeleted event. */
export interface IotHubDeviceDeletedEventData extends DeviceLifeCycleEvent {}

export function iotHubDeviceDeletedEventDataDeserializer(item: any): IotHubDeviceDeletedEventData {
  return {
    deviceId: item["deviceId"],
    hubName: item["hubName"],
    twin: deviceTwinInfoDeserializer(item["twin"]),
  };
}

/** Event data for Microsoft.Devices.DeviceConnected event. */
export interface IotHubDeviceConnectedEventData extends DeviceConnectionStateEvent {}

export function iotHubDeviceConnectedEventDataDeserializer(
  item: any,
): IotHubDeviceConnectedEventData {
  return {
    deviceId: item["deviceId"],
    moduleId: item["moduleId"],
    hubName: item["hubName"],
    deviceConnectionStateEventInfo: deviceConnectionStateEventInfoDeserializer(
      item["deviceConnectionStateEventInfo"],
    ),
  };
}

/** Event data for Microsoft.Devices.DeviceDisconnected event. */
export interface IotHubDeviceDisconnectedEventData extends DeviceConnectionStateEvent {}

export function iotHubDeviceDisconnectedEventDataDeserializer(
  item: any,
): IotHubDeviceDisconnectedEventData {
  return {
    deviceId: item["deviceId"],
    moduleId: item["moduleId"],
    hubName: item["hubName"],
    deviceConnectionStateEventInfo: deviceConnectionStateEventInfoDeserializer(
      item["deviceConnectionStateEventInfo"],
    ),
  };
}

/** Event data for Microsoft.Devices.DeviceTelemetry event. */
export interface IotHubDeviceTelemetryEventData extends DeviceTelemetryEvent {}

export function iotHubDeviceTelemetryEventDataDeserializer(
  item: any,
): IotHubDeviceTelemetryEventData {
  return {
    body: item["body"],
    properties: item["properties"],
    systemProperties: item["systemProperties"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.HealthcareApis.FhirResourceCreated event. */
export interface HealthcareFhirResourceCreatedEventData {
  /** Type of HL7 FHIR resource. */
  fhirResourceType: HealthcareFhirResourceType;
  /** Domain name of FHIR account for this resource. */
  fhirServiceHostName: string;
  /** Id of HL7 FHIR resource. */
  fhirResourceId: string;
  /** VersionId of HL7 FHIR resource. It changes when the resource is created, updated, or deleted(soft-deletion). */
  fhirResourceVersionId: number;
}

export function healthcareFhirResourceCreatedEventDataDeserializer(
  item: any,
): HealthcareFhirResourceCreatedEventData {
  return {
    fhirResourceType: item["resourceType"],
    fhirServiceHostName: item["resourceFhirAccount"],
    fhirResourceId: item["resourceFhirId"],
    fhirResourceVersionId: item["resourceVersionId"],
  };
}

/** Schema of FHIR resource type enumeration. */
export enum KnownHealthcareFhirResourceType {
  /** The FHIR resource type defined in STU3 and R4. */
  Account = "Account",
  /** The FHIR resource type defined in STU3 and R4. */
  ActivityDefinition = "ActivityDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  AdverseEvent = "AdverseEvent",
  /** The FHIR resource type defined in STU3 and R4. */
  AllergyIntolerance = "AllergyIntolerance",
  /** The FHIR resource type defined in STU3 and R4. */
  Appointment = "Appointment",
  /** The FHIR resource type defined in STU3 and R4. */
  AppointmentResponse = "AppointmentResponse",
  /** The FHIR resource type defined in STU3 and R4. */
  AuditEvent = "AuditEvent",
  /** The FHIR resource type defined in STU3 and R4. */
  Basic = "Basic",
  /** The FHIR resource type defined in STU3 and R4. */
  Binary = "Binary",
  /** The FHIR resource type defined in R4. */
  BiologicallyDerivedProduct = "BiologicallyDerivedProduct",
  /** The FHIR resource type defined in STU3. */
  BodySite = "BodySite",
  /** The FHIR resource type defined in R4. */
  BodyStructure = "BodyStructure",
  /** The FHIR resource type defined in STU3 and R4. */
  Bundle = "Bundle",
  /** The FHIR resource type defined in STU3 and R4. */
  CapabilityStatement = "CapabilityStatement",
  /** The FHIR resource type defined in STU3 and R4. */
  CarePlan = "CarePlan",
  /** The FHIR resource type defined in STU3 and R4. */
  CareTeam = "CareTeam",
  /** The FHIR resource type defined in R4. */
  CatalogEntry = "CatalogEntry",
  /** The FHIR resource type defined in STU3 and R4. */
  ChargeItem = "ChargeItem",
  /** The FHIR resource type defined in R4. */
  ChargeItemDefinition = "ChargeItemDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  Claim = "Claim",
  /** The FHIR resource type defined in STU3 and R4. */
  ClaimResponse = "ClaimResponse",
  /** The FHIR resource type defined in STU3 and R4. */
  ClinicalImpression = "ClinicalImpression",
  /** The FHIR resource type defined in STU3 and R4. */
  CodeSystem = "CodeSystem",
  /** The FHIR resource type defined in STU3 and R4. */
  Communication = "Communication",
  /** The FHIR resource type defined in STU3 and R4. */
  CommunicationRequest = "CommunicationRequest",
  /** The FHIR resource type defined in STU3 and R4. */
  CompartmentDefinition = "CompartmentDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  Composition = "Composition",
  /** The FHIR resource type defined in STU3 and R4. */
  ConceptMap = "ConceptMap",
  /** The FHIR resource type defined in STU3 and R4. */
  Condition = "Condition",
  /** The FHIR resource type defined in STU3 and R4. */
  Consent = "Consent",
  /** The FHIR resource type defined in STU3 and R4. */
  Contract = "Contract",
  /** The FHIR resource type defined in STU3 and R4. */
  Coverage = "Coverage",
  /** The FHIR resource type defined in R4. */
  CoverageEligibilityRequest = "CoverageEligibilityRequest",
  /** The FHIR resource type defined in R4. */
  CoverageEligibilityResponse = "CoverageEligibilityResponse",
  /** The FHIR resource type defined in STU3. */
  DataElement = "DataElement",
  /** The FHIR resource type defined in STU3 and R4. */
  DetectedIssue = "DetectedIssue",
  /** The FHIR resource type defined in STU3 and R4. */
  Device = "Device",
  /** The FHIR resource type defined in STU3. */
  DeviceComponent = "DeviceComponent",
  /** The FHIR resource type defined in R4. */
  DeviceDefinition = "DeviceDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  DeviceMetric = "DeviceMetric",
  /** The FHIR resource type defined in STU3 and R4. */
  DeviceRequest = "DeviceRequest",
  /** The FHIR resource type defined in STU3 and R4. */
  DeviceUseStatement = "DeviceUseStatement",
  /** The FHIR resource type defined in STU3 and R4. */
  DiagnosticReport = "DiagnosticReport",
  /** The FHIR resource type defined in STU3 and R4. */
  DocumentManifest = "DocumentManifest",
  /** The FHIR resource type defined in STU3 and R4. */
  DocumentReference = "DocumentReference",
  /** The FHIR resource type defined in STU3 and R4. */
  DomainResource = "DomainResource",
  /** The FHIR resource type defined in R4. */
  EffectEvidenceSynthesis = "EffectEvidenceSynthesis",
  /** The FHIR resource type defined in STU3. */
  EligibilityRequest = "EligibilityRequest",
  /** The FHIR resource type defined in STU3. */
  EligibilityResponse = "EligibilityResponse",
  /** The FHIR resource type defined in STU3 and R4. */
  Encounter = "Encounter",
  /** The FHIR resource type defined in STU3 and R4. */
  Endpoint = "Endpoint",
  /** The FHIR resource type defined in STU3 and R4. */
  EnrollmentRequest = "EnrollmentRequest",
  /** The FHIR resource type defined in STU3 and R4. */
  EnrollmentResponse = "EnrollmentResponse",
  /** The FHIR resource type defined in STU3 and R4. */
  EpisodeOfCare = "EpisodeOfCare",
  /** The FHIR resource type defined in R4. */
  EventDefinition = "EventDefinition",
  /** The FHIR resource type defined in R4. */
  Evidence = "Evidence",
  /** The FHIR resource type defined in R4. */
  EvidenceVariable = "EvidenceVariable",
  /** The FHIR resource type defined in R4. */
  ExampleScenario = "ExampleScenario",
  /** The FHIR resource type defined in STU3. */
  ExpansionProfile = "ExpansionProfile",
  /** The FHIR resource type defined in STU3 and R4. */
  ExplanationOfBenefit = "ExplanationOfBenefit",
  /** The FHIR resource type defined in STU3 and R4. */
  FamilyMemberHistory = "FamilyMemberHistory",
  /** The FHIR resource type defined in STU3 and R4. */
  Flag = "Flag",
  /** The FHIR resource type defined in STU3 and R4. */
  Goal = "Goal",
  /** The FHIR resource type defined in STU3 and R4. */
  GraphDefinition = "GraphDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  Group = "Group",
  /** The FHIR resource type defined in STU3 and R4. */
  GuidanceResponse = "GuidanceResponse",
  /** The FHIR resource type defined in STU3 and R4. */
  HealthcareService = "HealthcareService",
  /** The FHIR resource type defined in STU3. */
  ImagingManifest = "ImagingManifest",
  /** The FHIR resource type defined in STU3 and R4. */
  ImagingStudy = "ImagingStudy",
  /** The FHIR resource type defined in STU3 and R4. */
  Immunization = "Immunization",
  /** The FHIR resource type defined in R4. */
  ImmunizationEvaluation = "ImmunizationEvaluation",
  /** The FHIR resource type defined in STU3 and R4. */
  ImmunizationRecommendation = "ImmunizationRecommendation",
  /** The FHIR resource type defined in STU3 and R4. */
  ImplementationGuide = "ImplementationGuide",
  /** The FHIR resource type defined in R4. */
  InsurancePlan = "InsurancePlan",
  /** The FHIR resource type defined in R4. */
  Invoice = "Invoice",
  /** The FHIR resource type defined in STU3 and R4. */
  Library = "Library",
  /** The FHIR resource type defined in STU3 and R4. */
  Linkage = "Linkage",
  /** The FHIR resource type defined in STU3 and R4. */
  List = "List",
  /** The FHIR resource type defined in STU3 and R4. */
  Location = "Location",
  /** The FHIR resource type defined in STU3 and R4. */
  Measure = "Measure",
  /** The FHIR resource type defined in STU3 and R4. */
  MeasureReport = "MeasureReport",
  /** The FHIR resource type defined in STU3 and R4. */
  Media = "Media",
  /** The FHIR resource type defined in STU3 and R4. */
  Medication = "Medication",
  /** The FHIR resource type defined in STU3 and R4. */
  MedicationAdministration = "MedicationAdministration",
  /** The FHIR resource type defined in STU3 and R4. */
  MedicationDispense = "MedicationDispense",
  /** The FHIR resource type defined in R4. */
  MedicationKnowledge = "MedicationKnowledge",
  /** The FHIR resource type defined in STU3 and R4. */
  MedicationRequest = "MedicationRequest",
  /** The FHIR resource type defined in STU3 and R4. */
  MedicationStatement = "MedicationStatement",
  /** The FHIR resource type defined in R4. */
  MedicinalProduct = "MedicinalProduct",
  /** The FHIR resource type defined in R4. */
  MedicinalProductAuthorization = "MedicinalProductAuthorization",
  /** The FHIR resource type defined in R4. */
  MedicinalProductContraindication = "MedicinalProductContraindication",
  /** The FHIR resource type defined in R4. */
  MedicinalProductIndication = "MedicinalProductIndication",
  /** The FHIR resource type defined in R4. */
  MedicinalProductIngredient = "MedicinalProductIngredient",
  /** The FHIR resource type defined in R4. */
  MedicinalProductInteraction = "MedicinalProductInteraction",
  /** The FHIR resource type defined in R4. */
  MedicinalProductManufactured = "MedicinalProductManufactured",
  /** The FHIR resource type defined in R4. */
  MedicinalProductPackaged = "MedicinalProductPackaged",
  /** The FHIR resource type defined in R4. */
  MedicinalProductPharmaceutical = "MedicinalProductPharmaceutical",
  /** The FHIR resource type defined in R4. */
  MedicinalProductUndesirableEffect = "MedicinalProductUndesirableEffect",
  /** The FHIR resource type defined in STU3 and R4. */
  MessageDefinition = "MessageDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  MessageHeader = "MessageHeader",
  /** The FHIR resource type defined in R4. */
  MolecularSequence = "MolecularSequence",
  /** The FHIR resource type defined in STU3 and R4. */
  NamingSystem = "NamingSystem",
  /** The FHIR resource type defined in STU3 and R4. */
  NutritionOrder = "NutritionOrder",
  /** The FHIR resource type defined in STU3 and R4. */
  Observation = "Observation",
  /** The FHIR resource type defined in R4. */
  ObservationDefinition = "ObservationDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  OperationDefinition = "OperationDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  OperationOutcome = "OperationOutcome",
  /** The FHIR resource type defined in STU3 and R4. */
  Organization = "Organization",
  /** The FHIR resource type defined in R4. */
  OrganizationAffiliation = "OrganizationAffiliation",
  /** The FHIR resource type defined in STU3 and R4. */
  Parameters = "Parameters",
  /** The FHIR resource type defined in STU3 and R4. */
  Patient = "Patient",
  /** The FHIR resource type defined in STU3 and R4. */
  PaymentNotice = "PaymentNotice",
  /** The FHIR resource type defined in STU3 and R4. */
  PaymentReconciliation = "PaymentReconciliation",
  /** The FHIR resource type defined in STU3 and R4. */
  Person = "Person",
  /** The FHIR resource type defined in STU3 and R4. */
  PlanDefinition = "PlanDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  Practitioner = "Practitioner",
  /** The FHIR resource type defined in STU3 and R4. */
  PractitionerRole = "PractitionerRole",
  /** The FHIR resource type defined in STU3 and R4. */
  Procedure = "Procedure",
  /** The FHIR resource type defined in STU3. */
  ProcedureRequest = "ProcedureRequest",
  /** The FHIR resource type defined in STU3. */
  ProcessRequest = "ProcessRequest",
  /** The FHIR resource type defined in STU3. */
  ProcessResponse = "ProcessResponse",
  /** The FHIR resource type defined in STU3 and R4. */
  Provenance = "Provenance",
  /** The FHIR resource type defined in STU3 and R4. */
  Questionnaire = "Questionnaire",
  /** The FHIR resource type defined in STU3 and R4. */
  QuestionnaireResponse = "QuestionnaireResponse",
  /** The FHIR resource type defined in STU3. */
  ReferralRequest = "ReferralRequest",
  /** The FHIR resource type defined in STU3 and R4. */
  RelatedPerson = "RelatedPerson",
  /** The FHIR resource type defined in STU3 and R4. */
  RequestGroup = "RequestGroup",
  /** The FHIR resource type defined in R4. */
  ResearchDefinition = "ResearchDefinition",
  /** The FHIR resource type defined in R4. */
  ResearchElementDefinition = "ResearchElementDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  ResearchStudy = "ResearchStudy",
  /** The FHIR resource type defined in STU3 and R4. */
  ResearchSubject = "ResearchSubject",
  /** The FHIR resource type defined in STU3 and R4. */
  Resource = "Resource",
  /** The FHIR resource type defined in STU3 and R4. */
  RiskAssessment = "RiskAssessment",
  /** The FHIR resource type defined in R4. */
  RiskEvidenceSynthesis = "RiskEvidenceSynthesis",
  /** The FHIR resource type defined in STU3 and R4. */
  Schedule = "Schedule",
  /** The FHIR resource type defined in STU3 and R4. */
  SearchParameter = "SearchParameter",
  /** The FHIR resource type defined in STU3. */
  Sequence = "Sequence",
  /** The FHIR resource type defined in STU3. */
  ServiceDefinition = "ServiceDefinition",
  /** The FHIR resource type defined in R4. */
  ServiceRequest = "ServiceRequest",
  /** The FHIR resource type defined in STU3 and R4. */
  Slot = "Slot",
  /** The FHIR resource type defined in STU3 and R4. */
  Specimen = "Specimen",
  /** The FHIR resource type defined in R4. */
  SpecimenDefinition = "SpecimenDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  StructureDefinition = "StructureDefinition",
  /** The FHIR resource type defined in STU3 and R4. */
  StructureMap = "StructureMap",
  /** The FHIR resource type defined in STU3 and R4. */
  Subscription = "Subscription",
  /** The FHIR resource type defined in STU3 and R4. */
  Substance = "Substance",
  /** The FHIR resource type defined in R4. */
  SubstanceNucleicAcid = "SubstanceNucleicAcid",
  /** The FHIR resource type defined in R4. */
  SubstancePolymer = "SubstancePolymer",
  /** The FHIR resource type defined in R4. */
  SubstanceProtein = "SubstanceProtein",
  /** The FHIR resource type defined in R4. */
  SubstanceReferenceInformation = "SubstanceReferenceInformation",
  /** The FHIR resource type defined in R4. */
  SubstanceSourceMaterial = "SubstanceSourceMaterial",
  /** The FHIR resource type defined in R4. */
  SubstanceSpecification = "SubstanceSpecification",
  /** The FHIR resource type defined in STU3 and R4. */
  SupplyDelivery = "SupplyDelivery",
  /** The FHIR resource type defined in STU3 and R4. */
  SupplyRequest = "SupplyRequest",
  /** The FHIR resource type defined in STU3 and R4. */
  Task = "Task",
  /** The FHIR resource type defined in R4. */
  TerminologyCapabilities = "TerminologyCapabilities",
  /** The FHIR resource type defined in STU3 and R4. */
  TestReport = "TestReport",
  /** The FHIR resource type defined in STU3 and R4. */
  TestScript = "TestScript",
  /** The FHIR resource type defined in STU3 and R4. */
  ValueSet = "ValueSet",
  /** The FHIR resource type defined in R4. */
  VerificationResult = "VerificationResult",
  /** The FHIR resource type defined in STU3 and R4. */
  VisionPrescription = "VisionPrescription",
}

/**
 * Schema of FHIR resource type enumeration. \
 * {@link KnownHealthcareFhirResourceType} can be used interchangeably with HealthcareFhirResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Account**: The FHIR resource type defined in STU3 and R4. \
 * **ActivityDefinition**: The FHIR resource type defined in STU3 and R4. \
 * **AdverseEvent**: The FHIR resource type defined in STU3 and R4. \
 * **AllergyIntolerance**: The FHIR resource type defined in STU3 and R4. \
 * **Appointment**: The FHIR resource type defined in STU3 and R4. \
 * **AppointmentResponse**: The FHIR resource type defined in STU3 and R4. \
 * **AuditEvent**: The FHIR resource type defined in STU3 and R4. \
 * **Basic**: The FHIR resource type defined in STU3 and R4. \
 * **Binary**: The FHIR resource type defined in STU3 and R4. \
 * **BiologicallyDerivedProduct**: The FHIR resource type defined in R4. \
 * **BodySite**: The FHIR resource type defined in STU3. \
 * **BodyStructure**: The FHIR resource type defined in R4. \
 * **Bundle**: The FHIR resource type defined in STU3 and R4. \
 * **CapabilityStatement**: The FHIR resource type defined in STU3 and R4. \
 * **CarePlan**: The FHIR resource type defined in STU3 and R4. \
 * **CareTeam**: The FHIR resource type defined in STU3 and R4. \
 * **CatalogEntry**: The FHIR resource type defined in R4. \
 * **ChargeItem**: The FHIR resource type defined in STU3 and R4. \
 * **ChargeItemDefinition**: The FHIR resource type defined in R4. \
 * **Claim**: The FHIR resource type defined in STU3 and R4. \
 * **ClaimResponse**: The FHIR resource type defined in STU3 and R4. \
 * **ClinicalImpression**: The FHIR resource type defined in STU3 and R4. \
 * **CodeSystem**: The FHIR resource type defined in STU3 and R4. \
 * **Communication**: The FHIR resource type defined in STU3 and R4. \
 * **CommunicationRequest**: The FHIR resource type defined in STU3 and R4. \
 * **CompartmentDefinition**: The FHIR resource type defined in STU3 and R4. \
 * **Composition**: The FHIR resource type defined in STU3 and R4. \
 * **ConceptMap**: The FHIR resource type defined in STU3 and R4. \
 * **Condition**: The FHIR resource type defined in STU3 and R4. \
 * **Consent**: The FHIR resource type defined in STU3 and R4. \
 * **Contract**: The FHIR resource type defined in STU3 and R4. \
 * **Coverage**: The FHIR resource type defined in STU3 and R4. \
 * **CoverageEligibilityRequest**: The FHIR resource type defined in R4. \
 * **CoverageEligibilityResponse**: The FHIR resource type defined in R4. \
 * **DataElement**: The FHIR resource type defined in STU3. \
 * **DetectedIssue**: The FHIR resource type defined in STU3 and R4. \
 * **Device**: The FHIR resource type defined in STU3 and R4. \
 * **DeviceComponent**: The FHIR resource type defined in STU3. \
 * **DeviceDefinition**: The FHIR resource type defined in R4. \
 * **DeviceMetric**: The FHIR resource type defined in STU3 and R4. \
 * **DeviceRequest**: The FHIR resource type defined in STU3 and R4. \
 * **DeviceUseStatement**: The FHIR resource type defined in STU3 and R4. \
 * **DiagnosticReport**: The FHIR resource type defined in STU3 and R4. \
 * **DocumentManifest**: The FHIR resource type defined in STU3 and R4. \
 * **DocumentReference**: The FHIR resource type defined in STU3 and R4. \
 * **DomainResource**: The FHIR resource type defined in STU3 and R4. \
 * **EffectEvidenceSynthesis**: The FHIR resource type defined in R4. \
 * **EligibilityRequest**: The FHIR resource type defined in STU3. \
 * **EligibilityResponse**: The FHIR resource type defined in STU3. \
 * **Encounter**: The FHIR resource type defined in STU3 and R4. \
 * **Endpoint**: The FHIR resource type defined in STU3 and R4. \
 * **EnrollmentRequest**: The FHIR resource type defined in STU3 and R4. \
 * **EnrollmentResponse**: The FHIR resource type defined in STU3 and R4. \
 * **EpisodeOfCare**: The FHIR resource type defined in STU3 and R4. \
 * **EventDefinition**: The FHIR resource type defined in R4. \
 * **Evidence**: The FHIR resource type defined in R4. \
 * **EvidenceVariable**: The FHIR resource type defined in R4. \
 * **ExampleScenario**: The FHIR resource type defined in R4. \
 * **ExpansionProfile**: The FHIR resource type defined in STU3. \
 * **ExplanationOfBenefit**: The FHIR resource type defined in STU3 and R4. \
 * **FamilyMemberHistory**: The FHIR resource type defined in STU3 and R4. \
 * **Flag**: The FHIR resource type defined in STU3 and R4. \
 * **Goal**: The FHIR resource type defined in STU3 and R4. \
 * **GraphDefinition**: The FHIR resource type defined in STU3 and R4. \
 * **Group**: The FHIR resource type defined in STU3 and R4. \
 * **GuidanceResponse**: The FHIR resource type defined in STU3 and R4. \
 * **HealthcareService**: The FHIR resource type defined in STU3 and R4. \
 * **ImagingManifest**: The FHIR resource type defined in STU3. \
 * **ImagingStudy**: The FHIR resource type defined in STU3 and R4. \
 * **Immunization**: The FHIR resource type defined in STU3 and R4. \
 * **ImmunizationEvaluation**: The FHIR resource type defined in R4. \
 * **ImmunizationRecommendation**: The FHIR resource type defined in STU3 and R4. \
 * **ImplementationGuide**: The FHIR resource type defined in STU3 and R4. \
 * **InsurancePlan**: The FHIR resource type defined in R4. \
 * **Invoice**: The FHIR resource type defined in R4. \
 * **Library**: The FHIR resource type defined in STU3 and R4. \
 * **Linkage**: The FHIR resource type defined in STU3 and R4. \
 * **List**: The FHIR resource type defined in STU3 and R4. \
 * **Location**: The FHIR resource type defined in STU3 and R4. \
 * **Measure**: The FHIR resource type defined in STU3 and R4. \
 * **MeasureReport**: The FHIR resource type defined in STU3 and R4. \
 * **Media**: The FHIR resource type defined in STU3 and R4. \
 * **Medication**: The FHIR resource type defined in STU3 and R4. \
 * **MedicationAdministration**: The FHIR resource type defined in STU3 and R4. \
 * **MedicationDispense**: The FHIR resource type defined in STU3 and R4. \
 * **MedicationKnowledge**: The FHIR resource type defined in R4. \
 * **MedicationRequest**: The FHIR resource type defined in STU3 and R4. \
 * **MedicationStatement**: The FHIR resource type defined in STU3 and R4. \
 * **MedicinalProduct**: The FHIR resource type defined in R4. \
 * **MedicinalProductAuthorization**: The FHIR resource type defined in R4. \
 * **MedicinalProductContraindication**: The FHIR resource type defined in R4. \
 * **MedicinalProductIndication**: The FHIR resource type defined in R4. \
 * **MedicinalProductIngredient**: The FHIR resource type defined in R4. \
 * **MedicinalProductInteraction**: The FHIR resource type defined in R4. \
 * **MedicinalProductManufactured**: The FHIR resource type defined in R4. \
 * **MedicinalProductPackaged**: The FHIR resource type defined in R4. \
 * **MedicinalProductPharmaceutical**: The FHIR resource type defined in R4. \
 * **MedicinalProductUndesirableEffect**: The FHIR resource type defined in R4. \
 * **MessageDefinition**: The FHIR resource type defined in STU3 and R4. \
 * **MessageHeader**: The FHIR resource type defined in STU3 and R4. \
 * **MolecularSequence**: The FHIR resource type defined in R4. \
 * **NamingSystem**: The FHIR resource type defined in STU3 and R4. \
 * **NutritionOrder**: The FHIR resource type defined in STU3 and R4. \
 * **Observation**: The FHIR resource type defined in STU3 and R4. \
 * **ObservationDefinition**: The FHIR resource type defined in R4. \
 * **OperationDefinition**: The FHIR resource type defined in STU3 and R4. \
 * **OperationOutcome**: The FHIR resource type defined in STU3 and R4. \
 * **Organization**: The FHIR resource type defined in STU3 and R4. \
 * **OrganizationAffiliation**: The FHIR resource type defined in R4. \
 * **Parameters**: The FHIR resource type defined in STU3 and R4. \
 * **Patient**: The FHIR resource type defined in STU3 and R4. \
 * **PaymentNotice**: The FHIR resource type defined in STU3 and R4. \
 * **PaymentReconciliation**: The FHIR resource type defined in STU3 and R4. \
 * **Person**: The FHIR resource type defined in STU3 and R4. \
 * **PlanDefinition**: The FHIR resource type defined in STU3 and R4. \
 * **Practitioner**: The FHIR resource type defined in STU3 and R4. \
 * **PractitionerRole**: The FHIR resource type defined in STU3 and R4. \
 * **Procedure**: The FHIR resource type defined in STU3 and R4. \
 * **ProcedureRequest**: The FHIR resource type defined in STU3. \
 * **ProcessRequest**: The FHIR resource type defined in STU3. \
 * **ProcessResponse**: The FHIR resource type defined in STU3. \
 * **Provenance**: The FHIR resource type defined in STU3 and R4. \
 * **Questionnaire**: The FHIR resource type defined in STU3 and R4. \
 * **QuestionnaireResponse**: The FHIR resource type defined in STU3 and R4. \
 * **ReferralRequest**: The FHIR resource type defined in STU3. \
 * **RelatedPerson**: The FHIR resource type defined in STU3 and R4. \
 * **RequestGroup**: The FHIR resource type defined in STU3 and R4. \
 * **ResearchDefinition**: The FHIR resource type defined in R4. \
 * **ResearchElementDefinition**: The FHIR resource type defined in R4. \
 * **ResearchStudy**: The FHIR resource type defined in STU3 and R4. \
 * **ResearchSubject**: The FHIR resource type defined in STU3 and R4. \
 * **Resource**: The FHIR resource type defined in STU3 and R4. \
 * **RiskAssessment**: The FHIR resource type defined in STU3 and R4. \
 * **RiskEvidenceSynthesis**: The FHIR resource type defined in R4. \
 * **Schedule**: The FHIR resource type defined in STU3 and R4. \
 * **SearchParameter**: The FHIR resource type defined in STU3 and R4. \
 * **Sequence**: The FHIR resource type defined in STU3. \
 * **ServiceDefinition**: The FHIR resource type defined in STU3. \
 * **ServiceRequest**: The FHIR resource type defined in R4. \
 * **Slot**: The FHIR resource type defined in STU3 and R4. \
 * **Specimen**: The FHIR resource type defined in STU3 and R4. \
 * **SpecimenDefinition**: The FHIR resource type defined in R4. \
 * **StructureDefinition**: The FHIR resource type defined in STU3 and R4. \
 * **StructureMap**: The FHIR resource type defined in STU3 and R4. \
 * **Subscription**: The FHIR resource type defined in STU3 and R4. \
 * **Substance**: The FHIR resource type defined in STU3 and R4. \
 * **SubstanceNucleicAcid**: The FHIR resource type defined in R4. \
 * **SubstancePolymer**: The FHIR resource type defined in R4. \
 * **SubstanceProtein**: The FHIR resource type defined in R4. \
 * **SubstanceReferenceInformation**: The FHIR resource type defined in R4. \
 * **SubstanceSourceMaterial**: The FHIR resource type defined in R4. \
 * **SubstanceSpecification**: The FHIR resource type defined in R4. \
 * **SupplyDelivery**: The FHIR resource type defined in STU3 and R4. \
 * **SupplyRequest**: The FHIR resource type defined in STU3 and R4. \
 * **Task**: The FHIR resource type defined in STU3 and R4. \
 * **TerminologyCapabilities**: The FHIR resource type defined in R4. \
 * **TestReport**: The FHIR resource type defined in STU3 and R4. \
 * **TestScript**: The FHIR resource type defined in STU3 and R4. \
 * **ValueSet**: The FHIR resource type defined in STU3 and R4. \
 * **VerificationResult**: The FHIR resource type defined in R4. \
 * **VisionPrescription**: The FHIR resource type defined in STU3 and R4.
 */
export type HealthcareFhirResourceType = string;

/** Schema of the Data property of an EventGridEvent for a Microsoft.HealthcareApis.FhirResourceUpdated event. */
export interface HealthcareFhirResourceUpdatedEventData {
  /** Type of HL7 FHIR resource. */
  fhirResourceType: HealthcareFhirResourceType;
  /** Domain name of FHIR account for this resource. */
  fhirServiceHostName: string;
  /** Id of HL7 FHIR resource. */
  fhirResourceId: string;
  /** VersionId of HL7 FHIR resource. It changes when the resource is created, updated, or deleted(soft-deletion). */
  fhirResourceVersionId: number;
}

export function healthcareFhirResourceUpdatedEventDataDeserializer(
  item: any,
): HealthcareFhirResourceUpdatedEventData {
  return {
    fhirResourceType: item["resourceType"],
    fhirServiceHostName: item["resourceFhirAccount"],
    fhirResourceId: item["resourceFhirId"],
    fhirResourceVersionId: item["resourceVersionId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.HealthcareApis.FhirResourceDeleted event. */
export interface HealthcareFhirResourceDeletedEventData {
  /** Type of HL7 FHIR resource. */
  fhirResourceType: HealthcareFhirResourceType;
  /** Domain name of FHIR account for this resource. */
  fhirServiceHostName: string;
  /** Id of HL7 FHIR resource. */
  fhirResourceId: string;
  /** VersionId of HL7 FHIR resource. It changes when the resource is created, updated, or deleted(soft-deletion). */
  fhirResourceVersionId: number;
}

export function healthcareFhirResourceDeletedEventDataDeserializer(
  item: any,
): HealthcareFhirResourceDeletedEventData {
  return {
    fhirResourceType: item["resourceType"],
    fhirServiceHostName: item["resourceFhirAccount"],
    fhirResourceId: item["resourceFhirId"],
    fhirResourceVersionId: item["resourceVersionId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.HealthcareApis.DicomImageCreated event. */
export interface HealthcareDicomImageCreatedEventData {
  /** Data partition name */
  partitionName: string;
  /** Unique identifier for the Study */
  imageStudyInstanceUid: string;
  /** Unique identifier for the Series */
  imageSeriesInstanceUid: string;
  /** Unique identifier for the DICOM Image */
  imageSopInstanceUid: string;
  /** Domain name of the DICOM account for this image. */
  serviceHostName: string;
  /** Sequence number of the DICOM Service within Azure Health Data Services. It is unique for every image creation and deletion within the service. */
  sequenceNumber: number;
}

export function healthcareDicomImageCreatedEventDataDeserializer(
  item: any,
): HealthcareDicomImageCreatedEventData {
  return {
    partitionName: item["partitionName"],
    imageStudyInstanceUid: item["imageStudyInstanceUid"],
    imageSeriesInstanceUid: item["imageSeriesInstanceUid"],
    imageSopInstanceUid: item["imageSopInstanceUid"],
    serviceHostName: item["serviceHostName"],
    sequenceNumber: item["sequenceNumber"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.HealthcareApis.DicomImageDeleted event. */
export interface HealthcareDicomImageDeletedEventData {
  /** Data partition name */
  partitionName: string;
  /** Unique identifier for the Study */
  imageStudyInstanceUid: string;
  /** Unique identifier for the Series */
  imageSeriesInstanceUid: string;
  /** Unique identifier for the DICOM Image */
  imageSopInstanceUid: string;
  /** Host name of the DICOM account for this image. */
  serviceHostName: string;
  /** Sequence number of the DICOM Service within Azure Health Data Services. It is unique for every image creation and deletion within the service. */
  sequenceNumber: number;
}

export function healthcareDicomImageDeletedEventDataDeserializer(
  item: any,
): HealthcareDicomImageDeletedEventData {
  return {
    partitionName: item["partitionName"],
    imageStudyInstanceUid: item["imageStudyInstanceUid"],
    imageSeriesInstanceUid: item["imageSeriesInstanceUid"],
    imageSopInstanceUid: item["imageSopInstanceUid"],
    serviceHostName: item["serviceHostName"],
    sequenceNumber: item["sequenceNumber"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.HealthcareApis.DicomImageUpdated event. */
export interface HealthcareDicomImageUpdatedEventData {
  /** Data partition name */
  partitionName: string;
  /** Unique identifier for the Study */
  imageStudyInstanceUid: string;
  /** Unique identifier for the Series */
  imageSeriesInstanceUid: string;
  /** Unique identifier for the DICOM Image */
  imageSopInstanceUid: string;
  /** Domain name of the DICOM account for this image. */
  serviceHostName: string;
  /** Sequence number of the DICOM Service within Azure Health Data Services. It is unique for every image creation, updation and deletion within the service. */
  sequenceNumber: number;
}

export function healthcareDicomImageUpdatedEventDataDeserializer(
  item: any,
): HealthcareDicomImageUpdatedEventData {
  return {
    partitionName: item["partitionName"],
    imageStudyInstanceUid: item["imageStudyInstanceUid"],
    imageSeriesInstanceUid: item["imageSeriesInstanceUid"],
    imageSopInstanceUid: item["imageSopInstanceUid"],
    serviceHostName: item["serviceHostName"],
    sequenceNumber: item["sequenceNumber"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.CertificateNewVersionCreated event. */
export interface KeyVaultCertificateNewVersionCreatedEventData {
  /** The id of the object that triggered this event. */
  id: string;
  /** Key vault name of the object that triggered this event. */
  vaultName: string;
  /** The type of the object that triggered this event */
  objectType: string;
  /** The name of the object that triggered this event */
  objectName: string;
  /** The version of the object that triggered this event */
  version: string;
  /** Not before date of the object that triggered this event */
  nbf: number;
  /** The expiration date of the object that triggered this event */
  exp: number;
}

export function keyVaultCertificateNewVersionCreatedEventDataDeserializer(
  item: any,
): KeyVaultCertificateNewVersionCreatedEventData {
  return {
    id: item["Id"],
    vaultName: item["VaultName"],
    objectType: item["ObjectType"],
    objectName: item["ObjectName"],
    version: item["Version"],
    nbf: item["NBF"],
    exp: item["EXP"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.CertificateNearExpiry event. */
export interface KeyVaultCertificateNearExpiryEventData {
  /** The id of the object that triggered this event. */
  id: string;
  /** Key vault name of the object that triggered this event. */
  vaultName: string;
  /** The type of the object that triggered this event */
  objectType: string;
  /** The name of the object that triggered this event */
  objectName: string;
  /** The version of the object that triggered this event */
  version: string;
  /** Not before date of the object that triggered this event */
  nbf: number;
  /** The expiration date of the object that triggered this event */
  exp: number;
}

export function keyVaultCertificateNearExpiryEventDataDeserializer(
  item: any,
): KeyVaultCertificateNearExpiryEventData {
  return {
    id: item["Id"],
    vaultName: item["VaultName"],
    objectType: item["ObjectType"],
    objectName: item["ObjectName"],
    version: item["Version"],
    nbf: item["NBF"],
    exp: item["EXP"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.CertificateExpired event. */
export interface KeyVaultCertificateExpiredEventData {
  /** The id of the object that triggered this event. */
  id: string;
  /** Key vault name of the object that triggered this event. */
  vaultName: string;
  /** The type of the object that triggered this event */
  objectType: string;
  /** The name of the object that triggered this event */
  objectName: string;
  /** The version of the object that triggered this event */
  version: string;
  /** Not before date of the object that triggered this event */
  nbf: number;
  /** The expiration date of the object that triggered this event */
  exp: number;
}

export function keyVaultCertificateExpiredEventDataDeserializer(
  item: any,
): KeyVaultCertificateExpiredEventData {
  return {
    id: item["Id"],
    vaultName: item["VaultName"],
    objectType: item["ObjectType"],
    objectName: item["ObjectName"],
    version: item["Version"],
    nbf: item["NBF"],
    exp: item["EXP"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.KeyNewVersionCreated event. */
export interface KeyVaultKeyNewVersionCreatedEventData {
  /** The id of the object that triggered this event. */
  id: string;
  /** Key vault name of the object that triggered this event. */
  vaultName: string;
  /** The type of the object that triggered this event */
  objectType: string;
  /** The name of the object that triggered this event */
  objectName: string;
  /** The version of the object that triggered this event */
  version: string;
  /** Not before date of the object that triggered this event */
  nbf: number;
  /** The expiration date of the object that triggered this event */
  exp: number;
}

export function keyVaultKeyNewVersionCreatedEventDataDeserializer(
  item: any,
): KeyVaultKeyNewVersionCreatedEventData {
  return {
    id: item["Id"],
    vaultName: item["VaultName"],
    objectType: item["ObjectType"],
    objectName: item["ObjectName"],
    version: item["Version"],
    nbf: item["NBF"],
    exp: item["EXP"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.KeyNearExpiry event. */
export interface KeyVaultKeyNearExpiryEventData {
  /** The id of the object that triggered this event. */
  id: string;
  /** Key vault name of the object that triggered this event. */
  vaultName: string;
  /** The type of the object that triggered this event */
  objectType: string;
  /** The name of the object that triggered this event */
  objectName: string;
  /** The version of the object that triggered this event */
  version: string;
  /** Not before date of the object that triggered this event */
  nbf: number;
  /** The expiration date of the object that triggered this event */
  exp: number;
}

export function keyVaultKeyNearExpiryEventDataDeserializer(
  item: any,
): KeyVaultKeyNearExpiryEventData {
  return {
    id: item["Id"],
    vaultName: item["VaultName"],
    objectType: item["ObjectType"],
    objectName: item["ObjectName"],
    version: item["Version"],
    nbf: item["NBF"],
    exp: item["EXP"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.KeyExpired event. */
export interface KeyVaultKeyExpiredEventData {
  /** The id of the object that triggered this event. */
  id: string;
  /** Key vault name of the object that triggered this event. */
  vaultName: string;
  /** The type of the object that triggered this event */
  objectType: string;
  /** The name of the object that triggered this event */
  objectName: string;
  /** The version of the object that triggered this event */
  version: string;
  /** Not before date of the object that triggered this event */
  nbf: number;
  /** The expiration date of the object that triggered this event */
  exp: number;
}

export function keyVaultKeyExpiredEventDataDeserializer(item: any): KeyVaultKeyExpiredEventData {
  return {
    id: item["Id"],
    vaultName: item["VaultName"],
    objectType: item["ObjectType"],
    objectName: item["ObjectName"],
    version: item["Version"],
    nbf: item["NBF"],
    exp: item["EXP"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.SecretNewVersionCreated event. */
export interface KeyVaultSecretNewVersionCreatedEventData {
  /** The id of the object that triggered this event. */
  id: string;
  /** Key vault name of the object that triggered this event. */
  vaultName: string;
  /** The type of the object that triggered this event */
  objectType: string;
  /** The name of the object that triggered this event */
  objectName: string;
  /** The version of the object that triggered this event */
  version: string;
  /** Not before date of the object that triggered this event */
  nbf: number;
  /** The expiration date of the object that triggered this event */
  exp: number;
}

export function keyVaultSecretNewVersionCreatedEventDataDeserializer(
  item: any,
): KeyVaultSecretNewVersionCreatedEventData {
  return {
    id: item["Id"],
    vaultName: item["VaultName"],
    objectType: item["ObjectType"],
    objectName: item["ObjectName"],
    version: item["Version"],
    nbf: item["NBF"],
    exp: item["EXP"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.SecretNearExpiry event. */
export interface KeyVaultSecretNearExpiryEventData {
  /** The id of the object that triggered this event. */
  id: string;
  /** Key vault name of the object that triggered this event. */
  vaultName: string;
  /** The type of the object that triggered this event */
  objectType: string;
  /** The name of the object that triggered this event */
  objectName: string;
  /** The version of the object that triggered this event */
  version: string;
  /** Not before date of the object that triggered this event */
  nbf: number;
  /** The expiration date of the object that triggered this event */
  exp: number;
}

export function keyVaultSecretNearExpiryEventDataDeserializer(
  item: any,
): KeyVaultSecretNearExpiryEventData {
  return {
    id: item["Id"],
    vaultName: item["VaultName"],
    objectType: item["ObjectType"],
    objectName: item["ObjectName"],
    version: item["Version"],
    nbf: item["NBF"],
    exp: item["EXP"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.SecretExpired event. */
export interface KeyVaultSecretExpiredEventData {
  /** The id of the object that triggered this event. */
  id: string;
  /** Key vault name of the object that triggered this event. */
  vaultName: string;
  /** The type of the object that triggered this event */
  objectType: string;
  /** The name of the object that triggered this event */
  objectName: string;
  /** The version of the object that triggered this event */
  version: string;
  /** Not before date of the object that triggered this event */
  nbf: number;
  /** The expiration date of the object that triggered this event */
  exp: number;
}

export function keyVaultSecretExpiredEventDataDeserializer(
  item: any,
): KeyVaultSecretExpiredEventData {
  return {
    id: item["Id"],
    vaultName: item["VaultName"],
    objectType: item["ObjectType"],
    objectName: item["ObjectName"],
    version: item["Version"],
    nbf: item["NBF"],
    exp: item["EXP"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.KeyVault.VaultAccessPolicyChanged event. */
export interface KeyVaultAccessPolicyChangedEventData {
  /** The id of the object that triggered this event. */
  id: string;
  /** Key vault name of the object that triggered this event. */
  vaultName: string;
  /** The type of the object that triggered this event */
  objectType: string;
  /** The name of the object that triggered this event */
  objectName: string;
  /** The version of the object that triggered this event */
  version: string;
  /** Not before date of the object that triggered this event */
  nbf: number;
  /** The expiration date of the object that triggered this event */
  exp: number;
}

export function keyVaultAccessPolicyChangedEventDataDeserializer(
  item: any,
): KeyVaultAccessPolicyChangedEventData {
  return {
    id: item["Id"],
    vaultName: item["VaultName"],
    objectType: item["ObjectType"],
    objectName: item["ObjectName"],
    version: item["Version"],
    nbf: item["NBF"],
    exp: item["EXP"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.MachineLearningServices.ModelRegistered event. */
export interface MachineLearningServicesModelRegisteredEventData {
  /** The name of the model that was registered. */
  modelName: string;
  /** The version of the model that was registered. */
  modelVersion: string;
  /** The tags of the model that was registered. */
  modelTags?: Record<string, any>;
  /** The properties of the model that was registered. */
  modelProperties?: Record<string, any>;
}

export function machineLearningServicesModelRegisteredEventDataDeserializer(
  item: any,
): MachineLearningServicesModelRegisteredEventData {
  return {
    modelName: item["modelName"],
    modelVersion: item["modelVersion"],
    modelTags: item["modelTags"],
    modelProperties: item["modelProperties"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.MachineLearningServices.ModelDeployed event. */
export interface MachineLearningServicesModelDeployedEventData {
  /** The name of the deployed service. */
  serviceName: string;
  /** The compute type (e.g. ACI, AKS) of the deployed service. */
  serviceComputeType: string;
  /** A common separated list of model IDs. The IDs of the models deployed in the service. */
  modelIds: string;
  /** The tags of the deployed service. */
  serviceTags?: Record<string, any>;
  /** The properties of the deployed service. */
  serviceProperties?: Record<string, any>;
}

export function machineLearningServicesModelDeployedEventDataDeserializer(
  item: any,
): MachineLearningServicesModelDeployedEventData {
  return {
    serviceName: item["serviceName"],
    serviceComputeType: item["serviceComputeType"],
    modelIds: item["modelIds"],
    serviceTags: item["serviceTags"],
    serviceProperties: item["serviceProperties"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.MachineLearningServices.RunCompleted event. */
export interface MachineLearningServicesRunCompletedEventData {
  /** The ID of the experiment that the run belongs to. */
  experimentId: string;
  /** The name of the experiment that the run belongs to. */
  experimentName: string;
  /** The ID of the Run that was completed. */
  runId: string;
  /** The Run Type of the completed Run. */
  runType: string;
  /** The tags of the completed Run. */
  runTags?: Record<string, any>;
  /** The properties of the completed Run. */
  runProperties?: Record<string, any>;
}

export function machineLearningServicesRunCompletedEventDataDeserializer(
  item: any,
): MachineLearningServicesRunCompletedEventData {
  return {
    experimentId: item["experimentId"],
    experimentName: item["experimentName"],
    runId: item["runId"],
    runType: item["runType"],
    runTags: item["runTags"],
    runProperties: item["runProperties"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.MachineLearningServices.DatasetDriftDetected event. */
export interface MachineLearningServicesDatasetDriftDetectedEventData {
  /** The ID of the data drift monitor that triggered the event. */
  dataDriftId: string;
  /** The name of the data drift monitor that triggered the event. */
  dataDriftName: string;
  /** The ID of the Run that detected data drift. */
  runId: string;
  /** The ID of the base Dataset used to detect drift. */
  baseDatasetId: string;
  /** The ID of the target Dataset used to detect drift. */
  targetDatasetId: string;
  /** The coefficient result that triggered the event. */
  driftCoefficient: number;
  /** The start time of the target dataset time series that resulted in drift detection. */
  startTime: Date | null;
  /** The end time of the target dataset time series that resulted in drift detection. */
  endTime: Date | null;
}

export function machineLearningServicesDatasetDriftDetectedEventDataDeserializer(
  item: any,
): MachineLearningServicesDatasetDriftDetectedEventData {
  return {
    dataDriftId: item["dataDriftId"],
    dataDriftName: item["dataDriftName"],
    runId: item["runId"],
    baseDatasetId: item["baseDatasetId"],
    targetDatasetId: item["targetDatasetId"],
    driftCoefficient: item["driftCoefficient"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.MachineLearningServices.RunStatusChanged event. */
export interface MachineLearningServicesRunStatusChangedEventData {
  /** The ID of the experiment that the Machine Learning Run belongs to. */
  experimentId: string;
  /** The name of the experiment that the Machine Learning Run belongs to. */
  experimentName: string;
  /** The ID of the Machine Learning Run. */
  runId: string;
  /** The Run Type of the Machine Learning Run. */
  runType: string;
  /** The tags of the Machine Learning Run. */
  runTags?: Record<string, any>;
  /** The properties of the Machine Learning Run. */
  runProperties?: Record<string, any>;
  /** The status of the Machine Learning Run. */
  runStatus: string;
}

export function machineLearningServicesRunStatusChangedEventDataDeserializer(
  item: any,
): MachineLearningServicesRunStatusChangedEventData {
  return {
    experimentId: item["experimentId"],
    experimentName: item["experimentName"],
    runId: item["runId"],
    runType: item["runType"],
    runTags: item["runTags"],
    runProperties: item["runProperties"],
    runStatus: item["runStatus"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.PolicyInsights.PolicyStateCreated event. */
export interface PolicyInsightsPolicyStateCreatedEventData {
  /** The time that the resource was scanned by Azure Policy in the Universal ISO 8601 DateTime format yyyy-MM-ddTHH:mm:ss.fffffffZ. */
  timestamp: Date;
  /** The resource ID of the policy assignment. */
  policyAssignmentId: string;
  /** The resource ID of the policy definition. */
  policyDefinitionId: string;
  /** The reference ID for the policy definition inside the initiative definition, if the policy assignment is for an initiative. May be empty. */
  policyDefinitionReferenceId: string;
  /** The compliance state of the resource with respect to the policy assignment. */
  complianceState: string;
  /** The subscription ID of the resource. */
  subscriptionId: string;
  /** The compliance reason code. May be empty. */
  complianceReasonCode: string;
}

export function policyInsightsPolicyStateCreatedEventDataDeserializer(
  item: any,
): PolicyInsightsPolicyStateCreatedEventData {
  return {
    timestamp: new Date(item["timestamp"]),
    policyAssignmentId: item["policyAssignmentId"],
    policyDefinitionId: item["policyDefinitionId"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    complianceState: item["complianceState"],
    subscriptionId: item["subscriptionId"],
    complianceReasonCode: item["complianceReasonCode"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.PolicyInsights.PolicyStateChanged event. */
export interface PolicyInsightsPolicyStateChangedEventData {
  /** The time that the resource was scanned by Azure Policy in the Universal ISO 8601 DateTime format yyyy-MM-ddTHH:mm:ss.fffffffZ. */
  timestamp: Date;
  /** The resource ID of the policy assignment. */
  policyAssignmentId: string;
  /** The resource ID of the policy definition. */
  policyDefinitionId: string;
  /** The reference ID for the policy definition inside the initiative definition, if the policy assignment is for an initiative. May be empty. */
  policyDefinitionReferenceId: string;
  /** The compliance state of the resource with respect to the policy assignment. */
  complianceState: string;
  /** The subscription ID of the resource. */
  subscriptionId: string;
  /** The compliance reason code. May be empty. */
  complianceReasonCode: string;
}

export function policyInsightsPolicyStateChangedEventDataDeserializer(
  item: any,
): PolicyInsightsPolicyStateChangedEventData {
  return {
    timestamp: new Date(item["timestamp"]),
    policyAssignmentId: item["policyAssignmentId"],
    policyDefinitionId: item["policyDefinitionId"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    complianceState: item["complianceState"],
    subscriptionId: item["subscriptionId"],
    complianceReasonCode: item["complianceReasonCode"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.PolicyInsights.PolicyStateDeleted event. */
export interface PolicyInsightsPolicyStateDeletedEventData {
  /** The time that the resource was scanned by Azure Policy in the Universal ISO 8601 DateTime format yyyy-MM-ddTHH:mm:ss.fffffffZ. */
  timestamp: Date;
  /** The resource ID of the policy assignment. */
  policyAssignmentId: string;
  /** The resource ID of the policy definition. */
  policyDefinitionId: string;
  /** The reference ID for the policy definition inside the initiative definition, if the policy assignment is for an initiative. May be empty. */
  policyDefinitionReferenceId: string;
  /** The compliance state of the resource with respect to the policy assignment. */
  complianceState: string;
  /** The subscription ID of the resource. */
  subscriptionId: string;
  /** The compliance reason code. May be empty. */
  complianceReasonCode: string;
}

export function policyInsightsPolicyStateDeletedEventDataDeserializer(
  item: any,
): PolicyInsightsPolicyStateDeletedEventData {
  return {
    timestamp: new Date(item["timestamp"]),
    policyAssignmentId: item["policyAssignmentId"],
    policyDefinitionId: item["policyDefinitionId"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    complianceState: item["complianceState"],
    subscriptionId: item["subscriptionId"],
    complianceReasonCode: item["complianceReasonCode"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Cache.PatchingCompleted event. */
export interface RedisPatchingCompletedEventData {
  /** The time at which the event occurred. */
  timestamp?: Date;
  /** The name of this event. */
  name?: string;
  /** The status of this event. Failed or  succeeded */
  status?: string;
}

export function redisPatchingCompletedEventDataDeserializer(
  item: any,
): RedisPatchingCompletedEventData {
  return {
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    name: item["name"],
    status: item["status"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Cache.ScalingCompleted event. */
export interface RedisScalingCompletedEventData {
  /** The time at which the event occurred. */
  timestamp?: Date;
  /** The name of this event. */
  name?: string;
  /** The status of this event. Failed or  succeeded */
  status?: string;
}

export function redisScalingCompletedEventDataDeserializer(
  item: any,
): RedisScalingCompletedEventData {
  return {
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    name: item["name"],
    status: item["status"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Cache.ExportRDBCompleted event. */
export interface RedisExportRDBCompletedEventData {
  /** The time at which the event occurred. */
  timestamp?: Date;
  /** The name of this event. */
  name?: string;
  /** The status of this event. Failed or  succeeded */
  status?: string;
}

export function redisExportRDBCompletedEventDataDeserializer(
  item: any,
): RedisExportRDBCompletedEventData {
  return {
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    name: item["name"],
    status: item["status"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Cache.ImportRDBCompleted event. */
export interface RedisImportRDBCompletedEventData {
  /** The time at which the event occurred. */
  timestamp?: Date;
  /** The name of this event. */
  name?: string;
  /** The status of this event. Failed or  succeeded */
  status?: string;
}

export function redisImportRDBCompletedEventDataDeserializer(
  item: any,
): RedisImportRDBCompletedEventData {
  return {
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    name: item["name"],
    status: item["status"],
  };
}

/** The details of the authorization for the resource. */
export interface ResourceAuthorization {
  /** The scope of the authorization. */
  scope?: string;
  /** The action being requested. */
  action?: string;
  /** The evidence for the authorization. */
  readonly evidence: Record<string, string>;
}

export function resourceAuthorizationDeserializer(item: any): ResourceAuthorization {
  return {
    scope: item["scope"],
    action: item["action"],
    evidence: item["evidence"],
  };
}

/** The details of the HTTP request. */
export interface ResourceHttpRequest {
  /** The client request ID. */
  clientRequestId?: string;
  /** The client IP address. */
  clientIpAddress?: string;
  /** The request method. */
  method?: string;
  /** The url used in the request. */
  url?: string;
}

export function resourceHttpRequestDeserializer(item: any): ResourceHttpRequest {
  return {
    clientRequestId: item["clientRequestId"],
    clientIpAddress: item["clientIpAddress"],
    method: item["method"],
    url: item["url"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceWriteSuccess event. This is raised when a resource create or update operation succeeds. */
export interface ResourceWriteSuccessEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUrl?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  readonly claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

export function resourceWriteSuccessEventDataDeserializer(
  item: any,
): ResourceWriteSuccessEventData {
  return {
    tenantId: item["tenantId"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    resourceProvider: item["resourceProvider"],
    resourceUrl: item["resourceUri"],
    operationName: item["operationName"],
    status: item["status"],
    authorization: resourceAuthorizationDeserializer(item["authorization"]),
    claims: item["claims"],
    correlationId: item["correlationId"],
    httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceWriteFailure event. This is raised when a resource create or update operation fails. */
export interface ResourceWriteFailureEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUrl?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  readonly claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

export function resourceWriteFailureEventDataDeserializer(
  item: any,
): ResourceWriteFailureEventData {
  return {
    tenantId: item["tenantId"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    resourceProvider: item["resourceProvider"],
    resourceUrl: item["resourceUri"],
    operationName: item["operationName"],
    status: item["status"],
    authorization: resourceAuthorizationDeserializer(item["authorization"]),
    claims: item["claims"],
    correlationId: item["correlationId"],
    httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceWriteCancel event. This is raised when a resource create or update operation is canceled. */
export interface ResourceWriteCancelEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUrl?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  readonly claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

export function resourceWriteCancelEventDataDeserializer(item: any): ResourceWriteCancelEventData {
  return {
    tenantId: item["tenantId"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    resourceProvider: item["resourceProvider"],
    resourceUrl: item["resourceUri"],
    operationName: item["operationName"],
    status: item["status"],
    authorization: resourceAuthorizationDeserializer(item["authorization"]),
    claims: item["claims"],
    correlationId: item["correlationId"],
    httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceDeleteSuccess event. This is raised when a resource delete operation succeeds. */
export interface ResourceDeleteSuccessEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUrl?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  readonly claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

export function resourceDeleteSuccessEventDataDeserializer(
  item: any,
): ResourceDeleteSuccessEventData {
  return {
    tenantId: item["tenantId"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    resourceProvider: item["resourceProvider"],
    resourceUrl: item["resourceUri"],
    operationName: item["operationName"],
    status: item["status"],
    authorization: resourceAuthorizationDeserializer(item["authorization"]),
    claims: item["claims"],
    correlationId: item["correlationId"],
    httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceDeleteFailure event. This is raised when a resource delete operation fails. */
export interface ResourceDeleteFailureEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUrl?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  readonly claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

export function resourceDeleteFailureEventDataDeserializer(
  item: any,
): ResourceDeleteFailureEventData {
  return {
    tenantId: item["tenantId"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    resourceProvider: item["resourceProvider"],
    resourceUrl: item["resourceUri"],
    operationName: item["operationName"],
    status: item["status"],
    authorization: resourceAuthorizationDeserializer(item["authorization"]),
    claims: item["claims"],
    correlationId: item["correlationId"],
    httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceDeleteCancel event. This is raised when a resource delete operation is canceled. */
export interface ResourceDeleteCancelEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUrl?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  readonly claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

export function resourceDeleteCancelEventDataDeserializer(
  item: any,
): ResourceDeleteCancelEventData {
  return {
    tenantId: item["tenantId"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    resourceProvider: item["resourceProvider"],
    resourceUrl: item["resourceUri"],
    operationName: item["operationName"],
    status: item["status"],
    authorization: resourceAuthorizationDeserializer(item["authorization"]),
    claims: item["claims"],
    correlationId: item["correlationId"],
    httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceActionSuccess event. This is raised when a resource action operation succeeds. */
export interface ResourceActionSuccessEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUrl?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  readonly claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

export function resourceActionSuccessEventDataDeserializer(
  item: any,
): ResourceActionSuccessEventData {
  return {
    tenantId: item["tenantId"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    resourceProvider: item["resourceProvider"],
    resourceUrl: item["resourceUri"],
    operationName: item["operationName"],
    status: item["status"],
    authorization: resourceAuthorizationDeserializer(item["authorization"]),
    claims: item["claims"],
    correlationId: item["correlationId"],
    httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceActionFailure event. This is raised when a resource action operation fails. */
export interface ResourceActionFailureEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUrl?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  readonly claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

export function resourceActionFailureEventDataDeserializer(
  item: any,
): ResourceActionFailureEventData {
  return {
    tenantId: item["tenantId"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    resourceProvider: item["resourceProvider"],
    resourceUrl: item["resourceUri"],
    operationName: item["operationName"],
    status: item["status"],
    authorization: resourceAuthorizationDeserializer(item["authorization"]),
    claims: item["claims"],
    correlationId: item["correlationId"],
    httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Resources.ResourceActionCancel event. This is raised when a resource action operation is canceled. */
export interface ResourceActionCancelEventData {
  /** The tenant ID of the resource. */
  tenantId?: string;
  /** The subscription ID of the resource. */
  subscriptionId?: string;
  /** The resource group of the resource. */
  resourceGroup?: string;
  /** The resource provider performing the operation. */
  resourceProvider?: string;
  /** The URI of the resource in the operation. */
  resourceUrl?: string;
  /** The operation that was performed. */
  operationName?: string;
  /** The status of the operation. */
  status?: string;
  /** The requested authorization for the operation. */
  authorization: ResourceAuthorization;
  /** The properties of the claims. */
  readonly claims: Record<string, string>;
  /** An operation ID used for troubleshooting. */
  correlationId?: string;
  /** The details of the operation. */
  httpRequest: ResourceHttpRequest;
}

export function resourceActionCancelEventDataDeserializer(
  item: any,
): ResourceActionCancelEventData {
  return {
    tenantId: item["tenantId"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    resourceProvider: item["resourceProvider"],
    resourceUrl: item["resourceUri"],
    operationName: item["operationName"],
    status: item["status"],
    authorization: resourceAuthorizationDeserializer(item["authorization"]),
    claims: item["claims"],
    correlationId: item["correlationId"],
    httpRequest: resourceHttpRequestDeserializer(item["httpRequest"]),
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ServiceBus.ActiveMessagesAvailableWithNoListeners event. */
export interface ServiceBusActiveMessagesAvailableWithNoListenersEventData {
  /** The namespace name of the Microsoft.ServiceBus resource. */
  namespaceName: string;
  /** The endpoint of the Microsoft.ServiceBus resource. */
  requestUri: string;
  /** The entity type of the Microsoft.ServiceBus resource. Could be one of 'queue' or 'subscriber'. */
  entityType: string;
  /** The name of the Microsoft.ServiceBus queue. If the entity type is of type 'subscriber', then this value will be null. */
  queueName: string | null;
  /** The name of the Microsoft.ServiceBus topic. If the entity type is of type 'queue', then this value will be null. */
  topicName: string | null;
  /** The name of the Microsoft.ServiceBus topic's subscription. If the entity type is of type 'queue', then this value will be null. */
  subscriptionName: string | null;
}

export function serviceBusActiveMessagesAvailableWithNoListenersEventDataDeserializer(
  item: any,
): ServiceBusActiveMessagesAvailableWithNoListenersEventData {
  return {
    namespaceName: item["namespaceName"],
    requestUri: item["requestUri"],
    entityType: item["entityType"],
    queueName: item["queueName"],
    topicName: item["topicName"],
    subscriptionName: item["subscriptionName"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ServiceBus.DeadletterMessagesAvailableWithNoListeners event. */
export interface ServiceBusDeadletterMessagesAvailableWithNoListenersEventData {
  /** The namespace name of the Microsoft.ServiceBus resource. */
  namespaceName: string;
  /** The endpoint of the Microsoft.ServiceBus resource. */
  requestUri: string;
  /** The entity type of the Microsoft.ServiceBus resource. Could be one of 'queue' or 'subscriber'. */
  entityType: string;
  /** The name of the Microsoft.ServiceBus queue. If the entity type is of type 'subscriber', then this value will be null. */
  queueName: string | null;
  /** The name of the Microsoft.ServiceBus topic. If the entity type is of type 'queue', then this value will be null. */
  topicName: string | null;
  /** The name of the Microsoft.ServiceBus topic's subscription. If the entity type is of type 'queue', then this value will be null. */
  subscriptionName: string | null;
}

export function serviceBusDeadletterMessagesAvailableWithNoListenersEventDataDeserializer(
  item: any,
): ServiceBusDeadletterMessagesAvailableWithNoListenersEventData {
  return {
    namespaceName: item["namespaceName"],
    requestUri: item["requestUri"],
    entityType: item["entityType"],
    queueName: item["queueName"],
    topicName: item["topicName"],
    subscriptionName: item["subscriptionName"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ServiceBus.ActiveMessagesAvailablePeriodicNotifications event. */
export interface ServiceBusActiveMessagesAvailablePeriodicNotificationsEventData {
  /** The namespace name of the Microsoft.ServiceBus resource. */
  namespaceName: string;
  /** The endpoint of the Microsoft.ServiceBus resource. */
  requestUri: string;
  /** The entity type of the Microsoft.ServiceBus resource. Could be one of 'queue' or 'subscriber'. */
  entityType: string;
  /** The name of the Microsoft.ServiceBus queue. If the entity type is of type 'subscriber', then this value will be null. */
  queueName: string | null;
  /** The name of the Microsoft.ServiceBus topic. If the entity type is of type 'queue', then this value will be null. */
  topicName: string | null;
  /** The name of the Microsoft.ServiceBus topic's subscription. If the entity type is of type 'queue', then this value will be null. */
  subscriptionName: string | null;
}

export function serviceBusActiveMessagesAvailablePeriodicNotificationsEventDataDeserializer(
  item: any,
): ServiceBusActiveMessagesAvailablePeriodicNotificationsEventData {
  return {
    namespaceName: item["namespaceName"],
    requestUri: item["requestUri"],
    entityType: item["entityType"],
    queueName: item["queueName"],
    topicName: item["topicName"],
    subscriptionName: item["subscriptionName"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ServiceBus.DeadletterMessagesAvailablePeriodicNotifications event. */
export interface ServiceBusDeadletterMessagesAvailablePeriodicNotificationsEventData {
  /** The namespace name of the Microsoft.ServiceBus resource. */
  namespaceName: string;
  /** The endpoint of the Microsoft.ServiceBus resource. */
  requestUri: string;
  /** The entity type of the Microsoft.ServiceBus resource. Could be one of 'queue' or 'subscriber'. */
  entityType: string;
  /** The name of the Microsoft.ServiceBus queue. If the entity type is of type 'subscriber', then this value will be null. */
  queueName: string | null;
  /** The name of the Microsoft.ServiceBus topic. If the entity type is of type 'queue', then this value will be null. */
  topicName: string | null;
  /** The name of the Microsoft.ServiceBus topic's subscription. If the entity type is of type 'queue', then this value will be null. */
  subscriptionName: string | null;
}

export function serviceBusDeadletterMessagesAvailablePeriodicNotificationsEventDataDeserializer(
  item: any,
): ServiceBusDeadletterMessagesAvailablePeriodicNotificationsEventData {
  return {
    namespaceName: item["namespaceName"],
    requestUri: item["requestUri"],
    entityType: item["entityType"],
    queueName: item["queueName"],
    topicName: item["topicName"],
    subscriptionName: item["subscriptionName"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.SignalRService.ClientConnectionConnected event. */
export interface SignalRServiceClientConnectionConnectedEventData {
  /** The time at which the event occurred. */
  timestamp: Date;
  /** The hub of connected client connection. */
  hubName: string;
  /** The connection Id of connected client connection. */
  connectionId: string;
  /** The user Id of connected client connection. */
  userId?: string;
}

export function signalRServiceClientConnectionConnectedEventDataDeserializer(
  item: any,
): SignalRServiceClientConnectionConnectedEventData {
  return {
    timestamp: new Date(item["timestamp"]),
    hubName: item["hubName"],
    connectionId: item["connectionId"],
    userId: item["userId"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.SignalRService.ClientConnectionDisconnected event. */
export interface SignalRServiceClientConnectionDisconnectedEventData {
  /** The time at which the event occurred. */
  timestamp: Date;
  /** The hub of connected client connection. */
  hubName: string;
  /** The connection Id of connected client connection. */
  connectionId: string;
  /** The user Id of connected client connection. */
  userId?: string;
  /** The message of error that cause the client connection disconnected. */
  errorMessage?: string;
}

export function signalRServiceClientConnectionDisconnectedEventDataDeserializer(
  item: any,
): SignalRServiceClientConnectionDisconnectedEventData {
  return {
    timestamp: new Date(item["timestamp"]),
    hubName: item["hubName"],
    connectionId: item["connectionId"],
    userId: item["userId"],
    errorMessage: item["errorMessage"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.BlobCreated event. */
export interface StorageBlobCreatedEventData {
  /** The name of the API/operation that triggered this event. */
  api?: string;
  /** A request id provided by the client of the storage API operation that triggered this event. */
  clientRequestId?: string;
  /** The request id generated by the storage service for the storage API operation that triggered this event. */
  requestId?: string;
  /** The etag of the blob at the time this event was triggered. */
  eTag?: string;
  /** The content type of the blob. This is the same as what would be returned in the Content-Type header from the blob. */
  contentType?: string;
  /** The size of the blob in bytes. This is the same as what would be returned in the Content-Length header from the blob. */
  contentLength?: number;
  /** The offset of the blob in bytes. */
  contentOffset?: number;
  /** The type of blob. */
  blobType?: string;
  /** The current tier of the blob. */
  accessTier: StorageBlobAccessTier;
  /** The path to the blob. */
  url?: string;
  /** An opaque string value representing the logical sequence of events for any particular blob name. Users can use standard string comparison to understand the relative sequence of two events on the same blob name. */
  sequencer?: string;
  /** The identity of the requester that triggered this event. */
  identity?: string;
  /** For service use only. Diagnostic data occasionally included by the Azure Storage service. This property should be ignored by event consumers. */
  storageDiagnostics: Record<string, any>;
}

export function storageBlobCreatedEventDataDeserializer(item: any): StorageBlobCreatedEventData {
  return {
    api: item["api"],
    clientRequestId: item["clientRequestId"],
    requestId: item["requestId"],
    eTag: item["eTag"],
    contentType: item["contentType"],
    contentLength: item["contentLength"],
    contentOffset: item["contentOffset"],
    blobType: item["blobType"],
    accessTier: item["accessTier"],
    url: item["url"],
    sequencer: item["sequencer"],
    identity: item["identity"],
    storageDiagnostics: item["storageDiagnostics"],
  };
}

/** The access tier of the blob. */
export enum KnownStorageBlobAccessTier {
  /** The blob is in access tier Hot */
  Hot = "Hot",
  /** The blob is in access tier Cool */
  Cool = "Cool",
  /** The blob is in access tier Cold */
  Cold = "Cold",
  /** The blob is in access tier Archive */
  Archive = "Archive",
  /** The blob is in access tier Default(Inferred) */
  Default = "Default",
}

/**
 * The access tier of the blob. \
 * {@link KnownStorageBlobAccessTier} can be used interchangeably with StorageBlobAccessTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Hot**: The blob is in access tier Hot \
 * **Cool**: The blob is in access tier Cool \
 * **Cold**: The blob is in access tier Cold \
 * **Archive**: The blob is in access tier Archive \
 * **Default**: The blob is in access tier Default(Inferred)
 */
export type StorageBlobAccessTier = string;

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.BlobDeleted event. */
export interface StorageBlobDeletedEventData {
  /** The name of the API/operation that triggered this event. */
  api?: string;
  /** A request id provided by the client of the storage API operation that triggered this event. */
  clientRequestId?: string;
  /** The request id generated by the storage service for the storage API operation that triggered this event. */
  requestId?: string;
  /** The content type of the blob. This is the same as what would be returned in the Content-Type header from the blob. */
  contentType?: string;
  /** The type of blob. */
  blobType?: string;
  /** The path to the blob. */
  url?: string;
  /** An opaque string value representing the logical sequence of events for any particular blob name. Users can use standard string comparison to understand the relative sequence of two events on the same blob name. */
  sequencer?: string;
  /** The identity of the requester that triggered this event. */
  identity?: string;
  /** For service use only. Diagnostic data occasionally included by the Azure Storage service. This property should be ignored by event consumers. */
  storageDiagnostics: Record<string, any>;
}

export function storageBlobDeletedEventDataDeserializer(item: any): StorageBlobDeletedEventData {
  return {
    api: item["api"],
    clientRequestId: item["clientRequestId"],
    requestId: item["requestId"],
    contentType: item["contentType"],
    blobType: item["blobType"],
    url: item["url"],
    sequencer: item["sequencer"],
    identity: item["identity"],
    storageDiagnostics: item["storageDiagnostics"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.DirectoryCreated event. */
export interface StorageDirectoryCreatedEventData {
  /** The name of the API/operation that triggered this event. */
  api?: string;
  /** A request id provided by the client of the storage API operation that triggered this event. */
  clientRequestId?: string;
  /** The request id generated by the storage service for the storage API operation that triggered this event. */
  requestId?: string;
  /** The etag of the directory at the time this event was triggered. */
  eTag?: string;
  /** The path to the directory. */
  url?: string;
  /** An opaque string value representing the logical sequence of events for any particular directory name. Users can use standard string comparison to understand the relative sequence of two events on the same directory name. */
  sequencer?: string;
  /** The identity of the requester that triggered this event. */
  identity?: string;
  /** For service use only. Diagnostic data occasionally included by the Azure Storage service. This property should be ignored by event consumers. */
  storageDiagnostics: Record<string, any>;
}

export function storageDirectoryCreatedEventDataDeserializer(
  item: any,
): StorageDirectoryCreatedEventData {
  return {
    api: item["api"],
    clientRequestId: item["clientRequestId"],
    requestId: item["requestId"],
    eTag: item["eTag"],
    url: item["url"],
    sequencer: item["sequencer"],
    identity: item["identity"],
    storageDiagnostics: item["storageDiagnostics"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.DirectoryDeleted event. */
export interface StorageDirectoryDeletedEventData {
  /** The name of the API/operation that triggered this event. */
  api?: string;
  /** A request id provided by the client of the storage API operation that triggered this event. */
  clientRequestId?: string;
  /** The request id generated by the storage service for the storage API operation that triggered this event. */
  requestId?: string;
  /** The path to the deleted directory. */
  url?: string;
  /** Is this event for a recursive delete operation. */
  recursive?: string;
  /** An opaque string value representing the logical sequence of events for any particular directory name. Users can use standard string comparison to understand the relative sequence of two events on the same directory name. */
  sequencer?: string;
  /** The identity of the requester that triggered this event. */
  identity?: string;
  /** For service use only. Diagnostic data occasionally included by the Azure Storage service. This property should be ignored by event consumers. */
  storageDiagnostics: Record<string, any>;
}

export function storageDirectoryDeletedEventDataDeserializer(
  item: any,
): StorageDirectoryDeletedEventData {
  return {
    api: item["api"],
    clientRequestId: item["clientRequestId"],
    requestId: item["requestId"],
    url: item["url"],
    recursive: item["recursive"],
    sequencer: item["sequencer"],
    identity: item["identity"],
    storageDiagnostics: item["storageDiagnostics"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.BlobRenamed event. */
export interface StorageBlobRenamedEventData {
  /** The name of the API/operation that triggered this event. */
  api?: string;
  /** A request id provided by the client of the storage API operation that triggered this event. */
  clientRequestId?: string;
  /** The request id generated by the storage service for the storage API operation that triggered this event. */
  requestId?: string;
  /** The path to the blob that was renamed. */
  sourceUrl?: string;
  /** The new path to the blob after the rename operation. */
  destinationUrl?: string;
  /** An opaque string value representing the logical sequence of events for any particular blob name. Users can use standard string comparison to understand the relative sequence of two events on the same blob name. */
  sequencer?: string;
  /** The identity of the requester that triggered this event. */
  identity?: string;
  /** For service use only. Diagnostic data occasionally included by the Azure Storage service. This property should be ignored by event consumers. */
  storageDiagnostics: Record<string, any>;
}

export function storageBlobRenamedEventDataDeserializer(item: any): StorageBlobRenamedEventData {
  return {
    api: item["api"],
    clientRequestId: item["clientRequestId"],
    requestId: item["requestId"],
    sourceUrl: item["sourceUrl"],
    destinationUrl: item["destinationUrl"],
    sequencer: item["sequencer"],
    identity: item["identity"],
    storageDiagnostics: item["storageDiagnostics"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.DirectoryRenamed event. */
export interface StorageDirectoryRenamedEventData {
  /** The name of the API/operation that triggered this event. */
  api?: string;
  /** A request id provided by the client of the storage API operation that triggered this event. */
  clientRequestId?: string;
  /** The request id generated by the storage service for the storage API operation that triggered this event. */
  requestId?: string;
  /** The path to the directory that was renamed. */
  sourceUrl?: string;
  /** The new path to the directory after the rename operation. */
  destinationUrl?: string;
  /** An opaque string value representing the logical sequence of events for any particular directory name. Users can use standard string comparison to understand the relative sequence of two events on the same directory name. */
  sequencer?: string;
  /** The identity of the requester that triggered this event. */
  identity?: string;
  /** For service use only. Diagnostic data occasionally included by the Azure Storage service. This property should be ignored by event consumers. */
  storageDiagnostics: Record<string, any>;
}

export function storageDirectoryRenamedEventDataDeserializer(
  item: any,
): StorageDirectoryRenamedEventData {
  return {
    api: item["api"],
    clientRequestId: item["clientRequestId"],
    requestId: item["requestId"],
    sourceUrl: item["sourceUrl"],
    destinationUrl: item["destinationUrl"],
    sequencer: item["sequencer"],
    identity: item["identity"],
    storageDiagnostics: item["storageDiagnostics"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.LifecyclePolicyCompleted event. */
export interface StorageLifecyclePolicyCompletedEventData {
  /** The time the policy task was scheduled. */
  scheduleTime?: string;
  /** Policy execution summary which shows the completion status of a LCM run" */
  policyRunSummary: StorageLifecyclePolicyRunSummary;
  /** Execution statistics of a specific policy action in a Blob Management cycle. */
  deleteSummary: StorageLifecyclePolicyActionSummaryDetail;
  /** Execution statistics of a specific policy action in a Blob Management cycle. */
  tierToCoolSummary: StorageLifecyclePolicyActionSummaryDetail;
  /** Execution statistics of a specific policy action in a Blob Management cycle. */
  tierToArchiveSummary: StorageLifecyclePolicyActionSummaryDetail;
  /** Execution statistics of a specific policy action in a Blob Management cycle. */
  tierToColdSummary: StorageLifecyclePolicyActionSummaryDetail;
}

export function storageLifecyclePolicyCompletedEventDataDeserializer(
  item: any,
): StorageLifecyclePolicyCompletedEventData {
  return {
    scheduleTime: item["scheduleTime"],
    policyRunSummary: storageLifecyclePolicyRunSummaryDeserializer(item["policyRunSummary"]),
    deleteSummary: storageLifecyclePolicyActionSummaryDetailDeserializer(item["deleteSummary"]),
    tierToCoolSummary: storageLifecyclePolicyActionSummaryDetailDeserializer(
      item["tierToCoolSummary"],
    ),
    tierToArchiveSummary: storageLifecyclePolicyActionSummaryDetailDeserializer(
      item["tierToArchiveSummary"],
    ),
    tierToColdSummary: storageLifecyclePolicyActionSummaryDetailDeserializer(
      item["tierToColdSummary"],
    ),
  };
}

/** Policy run status of an account in a Blob Management cycle. */
export interface StorageLifecyclePolicyRunSummary {
  /** Policy status can be Completed/CompletedWithError/Incomplete. */
  completionStatus: StorageLifecycleCompletionStatus;
}

export function storageLifecyclePolicyRunSummaryDeserializer(
  item: any,
): StorageLifecyclePolicyRunSummary {
  return {
    completionStatus: item["completionStatus"],
  };
}

/** The status for a LCM policy. */
export enum KnownStorageLifecycleCompletionStatus {
  /** Completed */
  Completed = "Completed",
  /** CompletedWithError */
  CompletedWithError = "CompletedWithError",
  /** Incomplete */
  Incomplete = "Incomplete",
}

/**
 * The status for a LCM policy. \
 * {@link KnownStorageLifecycleCompletionStatus} can be used interchangeably with StorageLifecycleCompletionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Completed**: Completed \
 * **CompletedWithError**: CompletedWithError \
 * **Incomplete**: Incomplete
 */
export type StorageLifecycleCompletionStatus = string;

/** Execution statistics of a specific policy action in a Blob Management cycle. */
export interface StorageLifecyclePolicyActionSummaryDetail {
  /** Total number of objects to be acted on by this action. */
  totalObjectsCount?: number;
  /** Number of success operations of this action. */
  successCount?: number;
  /** Error messages of this action if any. */
  errorList?: string;
}

export function storageLifecyclePolicyActionSummaryDetailDeserializer(
  item: any,
): StorageLifecyclePolicyActionSummaryDetail {
  return {
    totalObjectsCount: item["totalObjectsCount"],
    successCount: item["successCount"],
    errorList: item["errorList"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.BlobTierChanged event. */
export interface StorageBlobTierChangedEventData {
  /** The name of the API/operation that triggered this event. */
  api?: string;
  /** A request id provided by the client of the storage API operation that triggered this event. */
  clientRequestId?: string;
  /** The request id generated by the storage service for the storage API operation that triggered this event. */
  requestId?: string;
  /** The content type of the blob. This is the same as what would be returned in the Content-Type header from the blob. */
  contentType?: string;
  /** The size of the blob in bytes. This is the same as what would be returned in the Content-Length header from the blob. */
  contentLength?: number;
  /** The type of blob. */
  blobType?: string;
  /** The current tier of the blob. */
  accessTier: StorageBlobAccessTier;
  /** The previous tier of the blob. */
  previousTier: StorageBlobAccessTier;
  /** The path to the blob. */
  url?: string;
  /** An opaque string value representing the logical sequence of events for any particular blob name. Users can use standard string comparison to understand the relative sequence of two events on the same blob name. */
  sequencer?: string;
  /** The identity of the requester that triggered this event. */
  identity?: string;
  /** For service use only. Diagnostic data occasionally included by the Azure Storage service. This property should be ignored by event consumers. */
  storageDiagnostics: Record<string, any>;
}

export function storageBlobTierChangedEventDataDeserializer(
  item: any,
): StorageBlobTierChangedEventData {
  return {
    api: item["api"],
    clientRequestId: item["clientRequestId"],
    requestId: item["requestId"],
    contentType: item["contentType"],
    contentLength: item["contentLength"],
    blobType: item["blobType"],
    accessTier: item["accessTier"],
    previousTier: item["previousTier"],
    url: item["url"],
    sequencer: item["sequencer"],
    identity: item["identity"],
    storageDiagnostics: item["storageDiagnostics"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Storage.AsyncOperationInitiated event. */
export interface StorageAsyncOperationInitiatedEventData {
  /** The name of the API/operation that triggered this event. */
  api?: string;
  /** A request id provided by the client of the storage API operation that triggered this event. */
  clientRequestId?: string;
  /** The request id generated by the storage service for the storage API operation that triggered this event. */
  requestId?: string;
  /** The content type of the blob. This is the same as what would be returned in the Content-Type header from the blob. */
  contentType?: string;
  /** The size of the blob in bytes. This is the same as what would be returned in the Content-Length header from the blob. */
  contentLength?: number;
  /** The type of blob. */
  blobType?: string;
  /** The path to the blob. */
  url?: string;
  /** An opaque string value representing the logical sequence of events for any particular blob name. Users can use standard string comparison to understand the relative sequence of two events on the same blob name. */
  sequencer?: string;
  /** The identity of the requester that triggered this event. */
  identity?: string;
  /** For service use only. Diagnostic data occasionally included by the Azure Storage service. This property should be ignored by event consumers. */
  storageDiagnostics: Record<string, any>;
}

export function storageAsyncOperationInitiatedEventDataDeserializer(
  item: any,
): StorageAsyncOperationInitiatedEventData {
  return {
    api: item["api"],
    clientRequestId: item["clientRequestId"],
    requestId: item["requestId"],
    contentType: item["contentType"],
    contentLength: item["contentLength"],
    blobType: item["blobType"],
    url: item["url"],
    sequencer: item["sequencer"],
    identity: item["identity"],
    storageDiagnostics: item["storageDiagnostics"],
  };
}

/** Schema of the Data property of an EventGridEvent for an Microsoft.Storage.BlobInventoryPolicyCompleted event. */
export interface StorageBlobInventoryPolicyCompletedEventData {
  /** The time at which inventory policy was scheduled. */
  scheduleDateTime: Date;
  /** The account name for which inventory policy is registered. */
  accountName?: string;
  /** The rule name for inventory policy. */
  ruleName?: string;
  /** The status of inventory run, it can be Succeeded/PartiallySucceeded/Failed. */
  policyRunStatus?: string;
  /** The status message for inventory run. */
  policyRunStatusMessage?: string;
  /** The policy run id for inventory run. */
  policyRunId?: string;
  /** The blob URL for manifest file for inventory run. */
  manifestBlobUrl?: string;
}

export function storageBlobInventoryPolicyCompletedEventDataDeserializer(
  item: any,
): StorageBlobInventoryPolicyCompletedEventData {
  return {
    scheduleDateTime: new Date(item["scheduleDateTime"]),
    accountName: item["accountName"],
    ruleName: item["ruleName"],
    policyRunStatus: item["policyRunStatus"],
    policyRunStatusMessage: item["policyRunStatusMessage"],
    policyRunId: item["policyRunId"],
    manifestBlobUrl: item["manifestBlobUrl"],
  };
}

/** Schema of the Data property of an EventGridEvent for an Microsoft.Storage.StorageTaskCompleted event. */
export interface StorageTaskCompletedEventData {
  /** The status for a storage task. */
  status: StorageTaskCompletedStatus;
  /** The time at which a storage task was completed. */
  completedDateTime: Date;
  /** The execution id for a storage task. */
  taskExecutionId?: string;
  /** The task name for a storage task. */
  taskName?: string;
  /** The summary report blob url for a storage task */
  summaryReportBlobUrl: string;
}

export function storageTaskCompletedEventDataDeserializer(
  item: any,
): StorageTaskCompletedEventData {
  return {
    status: item["status"],
    completedDateTime: new Date(item["completedDateTime"]),
    taskExecutionId: item["taskExecutionId"],
    taskName: item["taskName"],
    summaryReportBlobUrl: item["summaryReportBlobUrl"],
  };
}

/** The status for a storage task. */
export enum KnownStorageTaskCompletedStatus {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
}

/**
 * The status for a storage task. \
 * {@link KnownStorageTaskCompletedStatus} can be used interchangeably with StorageTaskCompletedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed
 */
export type StorageTaskCompletedStatus = string;

/** Schema of the Data property of an EventGridEvent for an Microsoft.Storage.StorageTaskQueued event. */
export interface StorageTaskQueuedEventData {
  /** The time at which a storage task was queued. */
  queuedDateTime: Date;
  /** The execution id for a storage task. */
  taskExecutionId?: string;
}

export function storageTaskQueuedEventDataDeserializer(item: any): StorageTaskQueuedEventData {
  return {
    queuedDateTime: new Date(item["queuedDateTime"]),
    taskExecutionId: item["taskExecutionId"],
  };
}

/** Schema of the Data property of an EventGridEvent for an Microsoft.Storage.StorageTaskAssignmentQueued event. */
export interface StorageTaskAssignmentQueuedEventData {
  /** The time at which a storage task was queued. */
  queuedOn: Date;
  /** The execution id for a storage task. */
  taskExecutionId?: string;
}

export function storageTaskAssignmentQueuedEventDataDeserializer(
  item: any,
): StorageTaskAssignmentQueuedEventData {
  return {
    queuedOn: new Date(item["queuedDateTime"]),
    taskExecutionId: item["taskExecutionId"],
  };
}

/** Schema of the Data property of an EventGridEvent for an Microsoft.Storage.StorageTaskAssignmentCompleted event. */
export interface StorageTaskAssignmentCompletedEventData {
  /** The status for a storage task. */
  status: StorageTaskAssignmentCompletedStatus;
  /** The time at which a storage task was completed. */
  completedOn: Date;
  /** The execution id for a storage task. */
  taskExecutionId?: string;
  /** The task name for a storage task. */
  taskName?: string;
  /** The summary report blob url for a storage task */
  summaryReportBlobUrl: string;
}

export function storageTaskAssignmentCompletedEventDataDeserializer(
  item: any,
): StorageTaskAssignmentCompletedEventData {
  return {
    status: item["status"],
    completedOn: new Date(item["completedDateTime"]),
    taskExecutionId: item["taskExecutionId"],
    taskName: item["taskName"],
    summaryReportBlobUrl: item["summaryReportBlobUrl"],
  };
}

/** The status for a storage task. */
export enum KnownStorageTaskAssignmentCompletedStatus {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
}

/**
 * The status for a storage task. \
 * {@link KnownStorageTaskAssignmentCompletedStatus} can be used interchangeably with StorageTaskAssignmentCompletedStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed
 */
export type StorageTaskAssignmentCompletedStatus = string;

/** Detail of action on the app. */
export interface AppEventTypeDetail {
  /** Type of action of the operation. */
  action?: AppAction;
}

export function appEventTypeDetailDeserializer(item: any): AppEventTypeDetail {
  return {
    action: item["action"],
  };
}

/** Type of action of the operation */
export enum KnownAppAction {
  /** Web app was restarted. */
  Restarted = "Restarted",
  /** Web app was stopped. */
  Stopped = "Stopped",
  /** There was an operation to change app setting on the web app. */
  ChangedAppSettings = "ChangedAppSettings",
  /** The job has started. */
  Started = "Started",
  /** The job has completed. */
  Completed = "Completed",
  /** The job has failed to complete. */
  Failed = "Failed",
}

/**
 * Type of action of the operation \
 * {@link KnownAppAction} can be used interchangeably with AppAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Restarted**: Web app was restarted. \
 * **Stopped**: Web app was stopped. \
 * **ChangedAppSettings**: There was an operation to change app setting on the web app. \
 * **Started**: The job has started. \
 * **Completed**: The job has completed. \
 * **Failed**: The job has failed to complete.
 */
export type AppAction = string;

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.AppUpdated event. */
export interface WebAppUpdatedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail?: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

export function webAppUpdatedEventDataDeserializer(item: any): WebAppUpdatedEventData {
  return {
    appEventTypeDetail: !item["appEventTypeDetail"]
      ? item["appEventTypeDetail"]
      : appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
    name: item["name"],
    clientRequestId: item["clientRequestId"],
    correlationRequestId: item["correlationRequestId"],
    requestId: item["requestId"],
    address: item["address"],
    verb: item["verb"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.BackupOperationStarted event. */
export interface WebBackupOperationStartedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail?: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

export function webBackupOperationStartedEventDataDeserializer(
  item: any,
): WebBackupOperationStartedEventData {
  return {
    appEventTypeDetail: !item["appEventTypeDetail"]
      ? item["appEventTypeDetail"]
      : appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
    name: item["name"],
    clientRequestId: item["clientRequestId"],
    correlationRequestId: item["correlationRequestId"],
    requestId: item["requestId"],
    address: item["address"],
    verb: item["verb"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.BackupOperationCompleted event. */
export interface WebBackupOperationCompletedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail?: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

export function webBackupOperationCompletedEventDataDeserializer(
  item: any,
): WebBackupOperationCompletedEventData {
  return {
    appEventTypeDetail: !item["appEventTypeDetail"]
      ? item["appEventTypeDetail"]
      : appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
    name: item["name"],
    clientRequestId: item["clientRequestId"],
    correlationRequestId: item["correlationRequestId"],
    requestId: item["requestId"],
    address: item["address"],
    verb: item["verb"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.BackupOperationFailed event. */
export interface WebBackupOperationFailedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail?: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

export function webBackupOperationFailedEventDataDeserializer(
  item: any,
): WebBackupOperationFailedEventData {
  return {
    appEventTypeDetail: !item["appEventTypeDetail"]
      ? item["appEventTypeDetail"]
      : appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
    name: item["name"],
    clientRequestId: item["clientRequestId"],
    correlationRequestId: item["correlationRequestId"],
    requestId: item["requestId"],
    address: item["address"],
    verb: item["verb"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.RestoreOperationStarted event. */
export interface WebRestoreOperationStartedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail?: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

export function webRestoreOperationStartedEventDataDeserializer(
  item: any,
): WebRestoreOperationStartedEventData {
  return {
    appEventTypeDetail: !item["appEventTypeDetail"]
      ? item["appEventTypeDetail"]
      : appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
    name: item["name"],
    clientRequestId: item["clientRequestId"],
    correlationRequestId: item["correlationRequestId"],
    requestId: item["requestId"],
    address: item["address"],
    verb: item["verb"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.RestoreOperationCompleted event. */
export interface WebRestoreOperationCompletedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail?: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

export function webRestoreOperationCompletedEventDataDeserializer(
  item: any,
): WebRestoreOperationCompletedEventData {
  return {
    appEventTypeDetail: !item["appEventTypeDetail"]
      ? item["appEventTypeDetail"]
      : appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
    name: item["name"],
    clientRequestId: item["clientRequestId"],
    correlationRequestId: item["correlationRequestId"],
    requestId: item["requestId"],
    address: item["address"],
    verb: item["verb"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.RestoreOperationFailed event. */
export interface WebRestoreOperationFailedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail?: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

export function webRestoreOperationFailedEventDataDeserializer(
  item: any,
): WebRestoreOperationFailedEventData {
  return {
    appEventTypeDetail: !item["appEventTypeDetail"]
      ? item["appEventTypeDetail"]
      : appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
    name: item["name"],
    clientRequestId: item["clientRequestId"],
    correlationRequestId: item["correlationRequestId"],
    requestId: item["requestId"],
    address: item["address"],
    verb: item["verb"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.SlotSwapStarted event. */
export interface WebSlotSwapStartedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail?: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

export function webSlotSwapStartedEventDataDeserializer(item: any): WebSlotSwapStartedEventData {
  return {
    appEventTypeDetail: !item["appEventTypeDetail"]
      ? item["appEventTypeDetail"]
      : appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
    name: item["name"],
    clientRequestId: item["clientRequestId"],
    correlationRequestId: item["correlationRequestId"],
    requestId: item["requestId"],
    address: item["address"],
    verb: item["verb"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.SlotSwapCompleted event. */
export interface WebSlotSwapCompletedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail?: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

export function webSlotSwapCompletedEventDataDeserializer(
  item: any,
): WebSlotSwapCompletedEventData {
  return {
    appEventTypeDetail: !item["appEventTypeDetail"]
      ? item["appEventTypeDetail"]
      : appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
    name: item["name"],
    clientRequestId: item["clientRequestId"],
    correlationRequestId: item["correlationRequestId"],
    requestId: item["requestId"],
    address: item["address"],
    verb: item["verb"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.SlotSwapFailed event. */
export interface WebSlotSwapFailedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail?: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

export function webSlotSwapFailedEventDataDeserializer(item: any): WebSlotSwapFailedEventData {
  return {
    appEventTypeDetail: !item["appEventTypeDetail"]
      ? item["appEventTypeDetail"]
      : appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
    name: item["name"],
    clientRequestId: item["clientRequestId"],
    correlationRequestId: item["correlationRequestId"],
    requestId: item["requestId"],
    address: item["address"],
    verb: item["verb"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.SlotSwapWithPreviewStarted event. */
export interface WebSlotSwapWithPreviewStartedEventData {
  /** Detail of action on the app. */
  appEventTypeDetail?: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

export function webSlotSwapWithPreviewStartedEventDataDeserializer(
  item: any,
): WebSlotSwapWithPreviewStartedEventData {
  return {
    appEventTypeDetail: !item["appEventTypeDetail"]
      ? item["appEventTypeDetail"]
      : appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
    name: item["name"],
    clientRequestId: item["clientRequestId"],
    correlationRequestId: item["correlationRequestId"],
    requestId: item["requestId"],
    address: item["address"],
    verb: item["verb"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.SlotSwapWithPreviewCancelled event. */
export interface WebSlotSwapWithPreviewCancelledEventData {
  /** Detail of action on the app. */
  appEventTypeDetail?: AppEventTypeDetail;
  /** name of the web site that had this event. */
  name?: string;
  /** The client request id generated by the app service for the site API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the site API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the site API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

export function webSlotSwapWithPreviewCancelledEventDataDeserializer(
  item: any,
): WebSlotSwapWithPreviewCancelledEventData {
  return {
    appEventTypeDetail: !item["appEventTypeDetail"]
      ? item["appEventTypeDetail"]
      : appEventTypeDetailDeserializer(item["appEventTypeDetail"]),
    name: item["name"],
    clientRequestId: item["clientRequestId"],
    correlationRequestId: item["correlationRequestId"],
    requestId: item["requestId"],
    address: item["address"],
    verb: item["verb"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.Web.AppServicePlanUpdated event. */
export interface WebAppServicePlanUpdatedEventData {
  /** Detail of action on the app service plan. */
  appServicePlanEventTypeDetail?: AppServicePlanEventTypeDetail;
  /** sku of app service plan. */
  sku?: WebAppServicePlanUpdatedEventDataSku;
  /** name of the app service plan that had this event. */
  name?: string;
  /** The client request id generated by the app service for the app service plan API operation that triggered this event. */
  clientRequestId?: string;
  /** The correlation request id generated by the app service for the app service plan API operation that triggered this event. */
  correlationRequestId?: string;
  /** The request id generated by the app service for the app service plan API operation that triggered this event. */
  requestId?: string;
  /** HTTP request URL of this operation. */
  address?: string;
  /** HTTP verb of this operation. */
  verb?: string;
}

export function webAppServicePlanUpdatedEventDataDeserializer(
  item: any,
): WebAppServicePlanUpdatedEventData {
  return {
    appServicePlanEventTypeDetail: !item["appServicePlanEventTypeDetail"]
      ? item["appServicePlanEventTypeDetail"]
      : appServicePlanEventTypeDetailDeserializer(item["appServicePlanEventTypeDetail"]),
    sku: !item["sku"] ? item["sku"] : webAppServicePlanUpdatedEventDataSkuDeserializer(item["sku"]),
    name: item["name"],
    clientRequestId: item["clientRequestId"],
    correlationRequestId: item["correlationRequestId"],
    requestId: item["requestId"],
    address: item["address"],
    verb: item["verb"],
  };
}

/** Detail of action on the app service plan. */
export interface AppServicePlanEventTypeDetail {
  /** Kind of environment where app service plan is. */
  stampKind?: StampKind;
  /** Type of action on the app service plan. */
  action?: AppServicePlanAction;
  /** Asynchronous operation status of the operation on the app service plan. */
  status?: AsyncStatus;
}

export function appServicePlanEventTypeDetailDeserializer(
  item: any,
): AppServicePlanEventTypeDetail {
  return {
    stampKind: item["stampKind"],
    action: item["action"],
    status: item["status"],
  };
}

/** Kind of environment where app service plan is. */
export enum KnownStampKind {
  /** App Service Plan is running on a public stamp. */
  Public = "Public",
  /** App Service Plan is running on an App Service Environment V1. */
  AseV1 = "AseV1",
  /** App Service Plan is running on an App Service Environment V2. */
  AseV2 = "AseV2",
}

/**
 * Kind of environment where app service plan is. \
 * {@link KnownStampKind} can be used interchangeably with StampKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Public**: App Service Plan is running on a public stamp. \
 * **AseV1**: App Service Plan is running on an App Service Environment V1. \
 * **AseV2**: App Service Plan is running on an App Service Environment V2.
 */
export type StampKind = string;

/** Type of action on the app service plan. */
export enum KnownAppServicePlanAction {
  /** App Service plan is being updated. */
  Updated = "Updated",
}

/**
 * Type of action on the app service plan. \
 * {@link KnownAppServicePlanAction} can be used interchangeably with AppServicePlanAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Updated**: App Service plan is being updated.
 */
export type AppServicePlanAction = string;

/** Asynchronous operation status of the operation on the app service plan. */
export enum KnownAsyncStatus {
  /** Async operation has started. */
  Started = "Started",
  /** Async operation has completed. */
  Completed = "Completed",
  /** Async operation failed to complete. */
  Failed = "Failed",
}

/**
 * Asynchronous operation status of the operation on the app service plan. \
 * {@link KnownAsyncStatus} can be used interchangeably with AsyncStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Started**: Async operation has started. \
 * **Completed**: Async operation has completed. \
 * **Failed**: Async operation failed to complete.
 */
export type AsyncStatus = string;

/** sku of app service plan. */
export interface WebAppServicePlanUpdatedEventDataSku {
  /** name of app service plan sku. */
  name?: string;
  /** tier of app service plan sku. */
  tier?: string;
  /** size of app service plan sku. */
  size?: string;
  /** family of app service plan sku. */
  family?: string;
  /** capacity of app service plan sku. */
  capacity?: string;
}

export function webAppServicePlanUpdatedEventDataSkuDeserializer(
  item: any,
): WebAppServicePlanUpdatedEventDataSku {
  return {
    name: item["name"],
    tier: item["Tier"],
    size: item["Size"],
    family: item["Family"],
    capacity: item["Capacity"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.EventGrid.SubscriptionValidationEvent event. */
export interface SubscriptionValidationEventData {
  /**
   * The validation code sent by Azure Event Grid to validate an event subscription.
   * To complete the validation handshake, the subscriber must either respond with this validation code as part of the validation response,
   * or perform a GET request on the validationUrl (available starting version 2018-05-01-preview).
   */
  validationCode: string;
  /**
   * The validation URL sent by Azure Event Grid (available starting version 2018-05-01-preview).
   * To complete the validation handshake, the subscriber must either respond with the validationCode as part of the validation response,
   * or perform a GET request on the validationUrl (available starting version 2018-05-01-preview).
   */
  validationUrl: string;
}

export function subscriptionValidationEventDataDeserializer(
  item: any,
): SubscriptionValidationEventData {
  return {
    validationCode: item["validationCode"],
    validationUrl: item["validationUrl"],
  };
}

/**
 * To complete an event subscription validation handshake, a subscriber can use
 * either the validationCode or the validationUrl received in a
 * SubscriptionValidationEvent. When the validationCode is used, the
 * SubscriptionValidationResponse can be used to build the response.
 */
export interface SubscriptionValidationResponse {
  /** The validation response sent by the subscriber to Azure Event Grid to complete the validation of an event subscription. */
  validationResponse: string;
}

export function subscriptionValidationResponseDeserializer(
  item: any,
): SubscriptionValidationResponse {
  return {
    validationResponse: item["validationResponse"],
  };
}

/**
 * Schema of the Data property of an EventGridEvent for a
 * Microsoft.EventGrid.SubscriptionDeletedEvent event.
 */
export interface SubscriptionDeletedEventData {
  /** The Azure resource ID of the deleted event subscription. */
  eventSubscriptionId: string;
}

export function subscriptionDeletedEventDataDeserializer(item: any): SubscriptionDeletedEventData {
  return {
    eventSubscriptionId: item["eventSubscriptionId"],
  };
}

/** Schema of the Data property of an EventGridEvent for MQTT Client state changes. */
export interface EventGridMqttClientEventData {
  /**
   * Unique identifier for the MQTT client that the client presents to the service
   * for authentication. This case-sensitive string can be up to 128 characters
   * long, and supports UTF-8 characters.
   */
  clientAuthenticationName: string;
  /** Name of the client resource in the Event Grid namespace. */
  clientName?: string;
  /** Name of the Event Grid namespace where the MQTT client was created or updated. */
  namespaceName: string;
}

export function eventGridMqttClientEventDataDeserializer(item: any): EventGridMqttClientEventData {
  return {
    clientAuthenticationName: item["clientAuthenticationName"],
    clientName: item["clientName"],
    namespaceName: item["namespaceName"],
  };
}

/** Event data for Microsoft.EventGrid.MQTTClientCreatedOrUpdated event. */
export interface EventGridMqttClientCreatedOrUpdatedEventData extends EventGridMqttClientEventData {
  /** Configured state of the client. The value could be Enabled or Disabled */
  state: EventGridMqttClientState;
  /** Time the client resource is created based on the provider's UTC time. */
  createdOn: Date;
  /**
   * Time the client resource is last updated based on the provider's UTC time. If
   *   the client resource was never updated, this value is identical to the value of
   *   the 'createdOn' property.
   */
  updatedOn: Date;
  /** The key-value attributes that are assigned to the client resource. */
  readonly attributes: Record<string, string>;
}

export function eventGridMqttClientCreatedOrUpdatedEventDataDeserializer(
  item: any,
): EventGridMqttClientCreatedOrUpdatedEventData {
  return {
    clientAuthenticationName: item["clientAuthenticationName"],
    clientName: item["clientName"],
    namespaceName: item["namespaceName"],
    state: item["state"],
    createdOn: new Date(item["createdOn"]),
    updatedOn: new Date(item["updatedOn"]),
    attributes: item["attributes"],
  };
}

/** EventGrid MQTT Client State */
export enum KnownEventGridMqttClientState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * EventGrid MQTT Client State \
 * {@link KnownEventGridMqttClientState} can be used interchangeably with EventGridMqttClientState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type EventGridMqttClientState = string;

/** Event data for Microsoft.EventGrid.MQTTClientDeleted event. */
export interface EventGridMqttClientDeletedEventData extends EventGridMqttClientEventData {}

export function eventGridMqttClientDeletedEventDataDeserializer(
  item: any,
): EventGridMqttClientDeletedEventData {
  return {
    clientAuthenticationName: item["clientAuthenticationName"],
    clientName: item["clientName"],
    namespaceName: item["namespaceName"],
  };
}

/** Event data for Microsoft.EventGrid.MQTTClientSessionConnected event. */
export interface EventGridMqttClientSessionConnectedEventData extends EventGridMqttClientEventData {
  /**
   * Unique identifier for the MQTT client's session. This case-sensitive string can
   * be up to 128 characters long, and supports UTF-8 characters.
   */
  clientSessionName: string;
  /**
   * A number that helps indicate order of MQTT client session connected or
   * disconnected events. Latest event will have a sequence number that is higher
   * than the previous event.
   */
  sequenceNumber: number;
}

export function eventGridMqttClientSessionConnectedEventDataDeserializer(
  item: any,
): EventGridMqttClientSessionConnectedEventData {
  return {
    clientAuthenticationName: item["clientAuthenticationName"],
    clientName: item["clientName"],
    namespaceName: item["namespaceName"],
    clientSessionName: item["clientSessionName"],
    sequenceNumber: item["sequenceNumber"],
  };
}

/** Event data for Microsoft.EventGrid.MQTTClientSessionDisconnected event. */
export interface EventGridMqttClientSessionDisconnectedEventData extends EventGridMqttClientEventData {
  /**
   * Unique identifier for the MQTT client's session. This case-sensitive string can
   * be up to 128 characters long, and supports UTF-8 characters.
   */
  clientSessionName: string;
  /**
   * A number that helps indicate order of MQTT client session connected or
   * disconnected events. Latest event will have a sequence number that is higher
   * than the previous event.
   */
  sequenceNumber: number;
  /**
   * Reason for the disconnection of the MQTT client's session. The value could be
   * one of the values in the disconnection reasons table.
   */
  disconnectionReason: EventGridMqttClientDisconnectionReason;
}

export function eventGridMqttClientSessionDisconnectedEventDataDeserializer(
  item: any,
): EventGridMqttClientSessionDisconnectedEventData {
  return {
    clientAuthenticationName: item["clientAuthenticationName"],
    clientName: item["clientName"],
    namespaceName: item["namespaceName"],
    clientSessionName: item["clientSessionName"],
    sequenceNumber: item["sequenceNumber"],
    disconnectionReason: item["disconnectionReason"],
  };
}

/** EventGrid MQTT Client Disconnection Reason */
export enum KnownEventGridMqttClientDisconnectionReason {
  /** The client got disconnected for any authentication reasons (for example, certificate expired, client got disabled, or client configuration changed). */
  ClientAuthenticationError = "ClientAuthenticationError",
  /** The client got disconnected for any authorization reasons (for example, because of a change in the configuration of topic spaces, permission bindings, or client groups). */
  ClientAuthorizationError = "ClientAuthorizationError",
  /** The client sent a bad request or used one of the unsupported features that resulted in a connection termination by the service. */
  ClientError = "ClientError",
  /** The client initiated a graceful disconnect through a DISCONNECT packet for MQTT or a close frame for MQTT over WebSocket. */
  ClientInitiatedDisconnect = "ClientInitiatedDisconnect",
  /** The client-server connection is lost. (EXCHANGE ONLINE PROTECTION). */
  ConnectionLost = "ConnectionLost",
  /** The client's IP address is blocked by IP filter or Private links configuration. */
  IpForbidden = "IpForbidden",
  /** The client exceeded one or more of the throttling limits that resulted in a connection termination by the service. */
  QuotaExceeded = "QuotaExceeded",
  /** The connection got terminated due to an unexpected server error. */
  ServerError = "ServerError",
  /** The server initiates a graceful disconnect for any operational reason. */
  ServerInitiatedDisconnect = "ServerInitiatedDisconnect",
  /** The client's queue for unacknowledged QoS1 messages reached its limit, which resulted in a connection termination by the server. */
  SessionOverflow = "SessionOverflow",
  /** The client reconnected with the same authentication name, which resulted in the termination of the previous connection. */
  SessionTakenOver = "SessionTakenOver",
}

/**
 * EventGrid MQTT Client Disconnection Reason \
 * {@link KnownEventGridMqttClientDisconnectionReason} can be used interchangeably with EventGridMqttClientDisconnectionReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ClientAuthenticationError**: The client got disconnected for any authentication reasons (for example, certificate expired, client got disabled, or client configuration changed). \
 * **ClientAuthorizationError**: The client got disconnected for any authorization reasons (for example, because of a change in the configuration of topic spaces, permission bindings, or client groups). \
 * **ClientError**: The client sent a bad request or used one of the unsupported features that resulted in a connection termination by the service. \
 * **ClientInitiatedDisconnect**: The client initiated a graceful disconnect through a DISCONNECT packet for MQTT or a close frame for MQTT over WebSocket. \
 * **ConnectionLost**: The client-server connection is lost. (EXCHANGE ONLINE PROTECTION). \
 * **IpForbidden**: The client's IP address is blocked by IP filter or Private links configuration. \
 * **QuotaExceeded**: The client exceeded one or more of the throttling limits that resulted in a connection termination by the service. \
 * **ServerError**: The connection got terminated due to an unexpected server error. \
 * **ServerInitiatedDisconnect**: The server initiates a graceful disconnect for any operational reason. \
 * **SessionOverflow**: The client's queue for unacknowledged QoS1 messages reached its limit, which resulted in a connection termination by the server. \
 * **SessionTakenOver**: The client reconnected with the same authentication name, which resulted in the termination of the previous connection.
 */
export type EventGridMqttClientDisconnectionReason = string;

/** Describes the schema of the common properties across all ARN system topic events */
export interface ResourceNotificationsResourceUpdatedEventData {
  /** resourceInfo details for update event */
  resourceDetails: ResourceNotificationsResourceUpdatedDetails;
  /** details about operational info */
  operationalDetails: ResourceNotificationsOperationalDetails;
  /** api version of the resource properties bag */
  apiVersion: string;
}

export function resourceNotificationsResourceUpdatedEventDataDeserializer(
  item: any,
): ResourceNotificationsResourceUpdatedEventData {
  return {
    resourceDetails: resourceNotificationsResourceUpdatedDetailsDeserializer(item["resourceInfo"]),
    operationalDetails: resourceNotificationsOperationalDetailsDeserializer(
      item["operationalInfo"],
    ),
    apiVersion: item["apiVersion"],
  };
}

/**
 * Describes the schema of the properties under resource info which are common
 * across all ARN system topic events
 */
export interface ResourceNotificationsResourceUpdatedDetails {
  /** id of the resource for which the event is being emitted */
  id: string;
  /** name of the resource for which the event is being emitted */
  name: string;
  /** the type of the resource for which the event is being emitted */
  type: string;
  /** the location of the resource for which the event is being emitted */
  location?: string;
  /** the tags on the resource for which the event is being emitted */
  readonly tags?: Record<string, string>;
  /** properties in the payload of the resource for which the event is being emitted */
  readonly properties?: Record<string, any>;
}

export function resourceNotificationsResourceUpdatedDetailsDeserializer(
  item: any,
): ResourceNotificationsResourceUpdatedDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: item["tags"],
    properties: item["properties"],
  };
}

/** details of operational info */
export interface ResourceNotificationsOperationalDetails {
  /** Date and Time when resource was updated */
  resourceEventTime: Date;
}

export function resourceNotificationsOperationalDetailsDeserializer(
  item: any,
): ResourceNotificationsOperationalDetails {
  return {
    resourceEventTime: new Date(item["resourceEventTime"]),
  };
}

/**
 * Schema of the Data property of an EventGridEvent for a
 * Microsoft.ResourceNotifications.HealthResources.AvailabilityStatusChanged
 * event.
 */
export interface ResourceNotificationsHealthResourcesAvailabilityStatusChangedEventData extends ResourceNotificationsResourceUpdatedEventData {}

export function resourceNotificationsHealthResourcesAvailabilityStatusChangedEventDataDeserializer(
  item: any,
): ResourceNotificationsHealthResourcesAvailabilityStatusChangedEventData {
  return {
    resourceDetails: resourceNotificationsResourceUpdatedDetailsDeserializer(item["resourceInfo"]),
    operationalDetails: resourceNotificationsOperationalDetailsDeserializer(
      item["operationalInfo"],
    ),
    apiVersion: item["apiVersion"],
  };
}

/**
 * Schema of the Data property of an EventGridEvent for a
 * Microsoft.ResourceNotifications.HealthResources.ResourceAnnotated event.
 */
export interface ResourceNotificationsHealthResourcesAnnotatedEventData extends ResourceNotificationsResourceUpdatedEventData {}

export function resourceNotificationsHealthResourcesAnnotatedEventDataDeserializer(
  item: any,
): ResourceNotificationsHealthResourcesAnnotatedEventData {
  return {
    resourceDetails: resourceNotificationsResourceUpdatedDetailsDeserializer(item["resourceInfo"]),
    operationalDetails: resourceNotificationsOperationalDetailsDeserializer(
      item["operationalInfo"],
    ),
    apiVersion: item["apiVersion"],
  };
}

/**
 * Describes the schema of the properties under resource info which are common
 * across all ARN system topic delete events
 */
export interface ResourceNotificationsResourceDeletedDetails {
  /** id of the resource for which the event is being emitted */
  id: string;
  /** name of the resource for which the event is being emitted */
  name: string;
  /** the type of the resource for which the event is being emitted */
  type: string;
}

export function resourceNotificationsResourceDeletedDetailsDeserializer(
  item: any,
): ResourceNotificationsResourceDeletedDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/**
 * Describes the schema of the common properties across all ARN system topic
 * delete events
 */
export interface ResourceNotificationsResourceDeletedEventData {
  /** resourceInfo details for delete event */
  resourceDetails: ResourceNotificationsResourceDeletedDetails;
  /** details about operational info */
  operationalDetails: ResourceNotificationsOperationalDetails;
}

export function resourceNotificationsResourceDeletedEventDataDeserializer(
  item: any,
): ResourceNotificationsResourceDeletedEventData {
  return {
    resourceDetails: resourceNotificationsResourceDeletedDetailsDeserializer(item["resourceInfo"]),
    operationalDetails: resourceNotificationsOperationalDetailsDeserializer(
      item["operationalInfo"],
    ),
  };
}

/**
 * Schema of the Data property of an EventGridEvent for a
 * Microsoft.ResourceNotifications.Resources.CreatedOrUpdated event.
 */
export interface ResourceNotificationsResourceManagementCreatedOrUpdatedEventData extends ResourceNotificationsResourceUpdatedEventData {}

export function resourceNotificationsResourceManagementCreatedOrUpdatedEventDataDeserializer(
  item: any,
): ResourceNotificationsResourceManagementCreatedOrUpdatedEventData {
  return {
    resourceDetails: resourceNotificationsResourceUpdatedDetailsDeserializer(item["resourceInfo"]),
    operationalDetails: resourceNotificationsOperationalDetailsDeserializer(
      item["operationalInfo"],
    ),
    apiVersion: item["apiVersion"],
  };
}

/**
 * Schema of the Data property of an EventGridEvent for a
 * Microsoft.ResourceNotifications.Resources.Deleted event.
 */
export interface ResourceNotificationsResourceManagementDeletedEventData extends ResourceNotificationsResourceDeletedEventData {}

export function resourceNotificationsResourceManagementDeletedEventDataDeserializer(
  item: any,
): ResourceNotificationsResourceManagementDeletedEventData {
  return {
    resourceDetails: resourceNotificationsResourceDeletedDetailsDeserializer(item["resourceInfo"]),
    operationalDetails: resourceNotificationsOperationalDetailsDeserializer(
      item["operationalInfo"],
    ),
  };
}

/** Schema of the Data property of an event grid event for a Microsoft.ResourceNotifications.ContainerServiceEventResources.ScheduledEventEmitted preview event.Schema of the Data property of an event grid event for a Microsoft.ResourceNotifications.ContainerServiceEventResources.ScheduledEventEmitted preview event. */
export interface ResourceNotificationsContainerServiceEventResourcesScheduledEventData extends ResourceNotificationsResourceUpdatedEventData {}

export function resourceNotificationsContainerServiceEventResourcesScheduledEventDataDeserializer(
  item: any,
): ResourceNotificationsContainerServiceEventResourcesScheduledEventData {
  return {
    resourceDetails: resourceNotificationsResourceUpdatedDetailsDeserializer(item["resourceInfo"]),
    operationalDetails: resourceNotificationsOperationalDetailsDeserializer(
      item["operationalInfo"],
    ),
    apiVersion: item["apiVersion"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ResourceNotifications.AKSResources.FleetGateCreated event. */
export interface ResourceNotificationsAksResourcesFleetGateCreatedEventData extends ResourceNotificationsResourceUpdatedEventData {}

export function resourceNotificationsAksResourcesFleetGateCreatedEventDataDeserializer(
  item: any,
): ResourceNotificationsAksResourcesFleetGateCreatedEventData {
  return {
    resourceDetails: resourceNotificationsResourceUpdatedDetailsDeserializer(item["resourceInfo"]),
    operationalDetails: resourceNotificationsOperationalDetailsDeserializer(
      item["operationalInfo"],
    ),
    apiVersion: item["apiVersion"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ResourceNotifications.AKSResources.FleetGateUpdated event. */
export interface ResourceNotificationsAksResourcesFleetGateUpdatedEventData extends ResourceNotificationsResourceUpdatedEventData {}

export function resourceNotificationsAksResourcesFleetGateUpdatedEventDataDeserializer(
  item: any,
): ResourceNotificationsAksResourcesFleetGateUpdatedEventData {
  return {
    resourceDetails: resourceNotificationsResourceUpdatedDetailsDeserializer(item["resourceInfo"]),
    operationalDetails: resourceNotificationsOperationalDetailsDeserializer(
      item["operationalInfo"],
    ),
    apiVersion: item["apiVersion"],
  };
}

/** Schema of the Data property of an EventGridEvent for a Microsoft.ResourceNotifications.AKSResources.FleetGateDeleted event. */
export interface ResourceNotificationsAksResourcesFleetGateDeletedEventData {
  /** resourceInfo details for deleted event */
  resourceInfo: {
    id: string;
    name: string;
    type: string;
    properties: Record<string, any>;
  };
  /** details about operational info */
  operationalInfo: ResourceNotificationsOperationalDetails;
  /** api version of the resource properties bag */
  apiVersion: string;
}

export function resourceNotificationsAksResourcesFleetGateDeletedEventDataDeserializer(
  item: any,
): ResourceNotificationsAksResourcesFleetGateDeletedEventData {
  return {
    resourceInfo:
      _resourceNotificationsAksResourcesFleetGateDeletedEventDataResourceInfoDeserializer(
        item["resourceInfo"],
      ),
    operationalInfo: resourceNotificationsOperationalDetailsDeserializer(item["operationalInfo"]),
    apiVersion: item["apiVersion"],
  };
}

/** model interface _ResourceNotificationsAksResourcesFleetGateDeletedEventDataResourceInfo */
export interface _ResourceNotificationsAksResourcesFleetGateDeletedEventDataResourceInfo {
  /** id of the resource for which the event is being emitted */
  id: string;
  /** name of the resource for which the event is being emitted */
  name: string;
  /** the type of the resource for which the event is being emitted */
  type: string;
  /** properties in the payload of the resource for which the event is being emitted */
  readonly properties: Record<string, any>;
}

export function _resourceNotificationsAksResourcesFleetGateDeletedEventDataResourceInfoDeserializer(
  item: any,
): _ResourceNotificationsAksResourcesFleetGateDeletedEventDataResourceInfo {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: item["properties"],
  };
}
