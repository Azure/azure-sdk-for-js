// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Instance dataflowEndpoint resource */
export interface DataflowEndpointResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DataflowEndpointProperties;
  /** Edge location of the resource. */
  extendedLocation: ExtendedLocation;
}

export function dataflowEndpointResourceSerializer(item: DataflowEndpointResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : dataflowEndpointPropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function dataflowEndpointResourceDeserializer(item: any): DataflowEndpointResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dataflowEndpointPropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** DataflowEndpoint Resource properties. NOTE - Only one type of endpoint is supported for one Resource */
export interface DataflowEndpointProperties {
  /** Endpoint Type. */
  endpointType: EndpointType;
  /** Azure Data Explorer endpoint. */
  dataExplorerSettings?: DataflowEndpointDataExplorer;
  /** Azure Data Lake endpoint. */
  dataLakeStorageSettings?: DataflowEndpointDataLakeStorage;
  /** Microsoft Fabric endpoint. */
  fabricOneLakeSettings?: DataflowEndpointFabricOneLake;
  /** Kafka endpoint. */
  kafkaSettings?: DataflowEndpointKafka;
  /** Local persistent volume endpoint. */
  localStorageSettings?: DataflowEndpointLocalStorage;
  /** Broker endpoint. */
  mqttSettings?: DataflowEndpointMqtt;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function dataflowEndpointPropertiesSerializer(item: DataflowEndpointProperties): any {
  return {
    endpointType: item["endpointType"],
    dataExplorerSettings: !item["dataExplorerSettings"]
      ? item["dataExplorerSettings"]
      : dataflowEndpointDataExplorerSerializer(item["dataExplorerSettings"]),
    dataLakeStorageSettings: !item["dataLakeStorageSettings"]
      ? item["dataLakeStorageSettings"]
      : dataflowEndpointDataLakeStorageSerializer(item["dataLakeStorageSettings"]),
    fabricOneLakeSettings: !item["fabricOneLakeSettings"]
      ? item["fabricOneLakeSettings"]
      : dataflowEndpointFabricOneLakeSerializer(item["fabricOneLakeSettings"]),
    kafkaSettings: !item["kafkaSettings"]
      ? item["kafkaSettings"]
      : dataflowEndpointKafkaSerializer(item["kafkaSettings"]),
    localStorageSettings: !item["localStorageSettings"]
      ? item["localStorageSettings"]
      : dataflowEndpointLocalStorageSerializer(item["localStorageSettings"]),
    mqttSettings: !item["mqttSettings"]
      ? item["mqttSettings"]
      : dataflowEndpointMqttSerializer(item["mqttSettings"]),
  };
}

export function dataflowEndpointPropertiesDeserializer(item: any): DataflowEndpointProperties {
  return {
    endpointType: item["endpointType"],
    dataExplorerSettings: !item["dataExplorerSettings"]
      ? item["dataExplorerSettings"]
      : dataflowEndpointDataExplorerDeserializer(item["dataExplorerSettings"]),
    dataLakeStorageSettings: !item["dataLakeStorageSettings"]
      ? item["dataLakeStorageSettings"]
      : dataflowEndpointDataLakeStorageDeserializer(item["dataLakeStorageSettings"]),
    fabricOneLakeSettings: !item["fabricOneLakeSettings"]
      ? item["fabricOneLakeSettings"]
      : dataflowEndpointFabricOneLakeDeserializer(item["fabricOneLakeSettings"]),
    kafkaSettings: !item["kafkaSettings"]
      ? item["kafkaSettings"]
      : dataflowEndpointKafkaDeserializer(item["kafkaSettings"]),
    localStorageSettings: !item["localStorageSettings"]
      ? item["localStorageSettings"]
      : dataflowEndpointLocalStorageDeserializer(item["localStorageSettings"]),
    mqttSettings: !item["mqttSettings"]
      ? item["mqttSettings"]
      : dataflowEndpointMqttDeserializer(item["mqttSettings"]),
    provisioningState: !item["provisioningState"]
      ? item["provisioningState"]
      : provisioningStateDeserializer(item["provisioningState"]),
  };
}

/** DataflowEndpoint Type properties */
export enum KnownEndpointType {
  /** Azure Data Explorer Type */
  DataExplorer = "DataExplorer",
  /** Azure Data Lake Type */
  DataLakeStorage = "DataLakeStorage",
  /** Microsoft Fabric Type */
  FabricOneLake = "FabricOneLake",
  /** Kafka Type */
  Kafka = "Kafka",
  /** Local Storage Type */
  LocalStorage = "LocalStorage",
  /** Broker Type */
  Mqtt = "Mqtt",
}

/**
 * DataflowEndpoint Type properties \
 * {@link KnownEndpointType} can be used interchangeably with EndpointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DataExplorer**: Azure Data Explorer Type \
 * **DataLakeStorage**: Azure Data Lake Type \
 * **FabricOneLake**: Microsoft Fabric Type \
 * **Kafka**: Kafka Type \
 * **LocalStorage**: Local Storage Type \
 * **Mqtt**: Broker Type
 */
export type EndpointType = string;

/** Azure Data Explorer endpoint properties */
export interface DataflowEndpointDataExplorer {
  /** Authentication configuration. NOTE - only authentication property is allowed per entry. */
  authentication: DataflowEndpointDataExplorerAuthentication;
  /** Database name. */
  database: string;
  /** Host of the Azure Data Explorer in the form of <cluster>.<region>.kusto.windows.net . */
  host: string;
  /** Azure Data Explorer endpoint batching configuration. */
  batching?: BatchingConfiguration;
}

export function dataflowEndpointDataExplorerSerializer(item: DataflowEndpointDataExplorer): any {
  return {
    authentication: dataflowEndpointDataExplorerAuthenticationSerializer(item["authentication"]),
    database: item["database"],
    host: item["host"],
    batching: !item["batching"]
      ? item["batching"]
      : batchingConfigurationSerializer(item["batching"]),
  };
}

export function dataflowEndpointDataExplorerDeserializer(item: any): DataflowEndpointDataExplorer {
  return {
    authentication: dataflowEndpointDataExplorerAuthenticationDeserializer(item["authentication"]),
    database: item["database"],
    host: item["host"],
    batching: !item["batching"]
      ? item["batching"]
      : batchingConfigurationDeserializer(item["batching"]),
  };
}

/** Azure Data Explorer Authentication properties. NOTE - only authentication property is allowed per entry. */
export interface DataflowEndpointDataExplorerAuthentication {
  /** Mode of Authentication. */
  method: DataExplorerAuthMethod;
  /** System-assigned managed identity authentication. */
  systemAssignedManagedIdentitySettings?: DataflowEndpointAuthenticationSystemAssignedManagedIdentity;
  /** User-assigned managed identity authentication. */
  userAssignedManagedIdentitySettings?: DataflowEndpointAuthenticationUserAssignedManagedIdentity;
}

export function dataflowEndpointDataExplorerAuthenticationSerializer(
  item: DataflowEndpointDataExplorerAuthentication,
): any {
  return {
    method: dataExplorerAuthMethodSerializer(item["method"]),
    systemAssignedManagedIdentitySettings: !item["systemAssignedManagedIdentitySettings"]
      ? item["systemAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationSystemAssignedManagedIdentitySerializer(
          item["systemAssignedManagedIdentitySettings"],
        ),
    userAssignedManagedIdentitySettings: !item["userAssignedManagedIdentitySettings"]
      ? item["userAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationUserAssignedManagedIdentitySerializer(
          item["userAssignedManagedIdentitySettings"],
        ),
  };
}

export function dataflowEndpointDataExplorerAuthenticationDeserializer(
  item: any,
): DataflowEndpointDataExplorerAuthentication {
  return {
    method: dataExplorerAuthMethodDeserializer(item["method"]),
    systemAssignedManagedIdentitySettings: !item["systemAssignedManagedIdentitySettings"]
      ? item["systemAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationSystemAssignedManagedIdentityDeserializer(
          item["systemAssignedManagedIdentitySettings"],
        ),
    userAssignedManagedIdentitySettings: !item["userAssignedManagedIdentitySettings"]
      ? item["userAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationUserAssignedManagedIdentityDeserializer(
          item["userAssignedManagedIdentitySettings"],
        ),
  };
}

/** Alias for DataExplorerAuthMethod */
export type DataExplorerAuthMethod = ManagedIdentityMethod;

export function dataExplorerAuthMethodSerializer(item: DataExplorerAuthMethod): any {
  return item;
}

export function dataExplorerAuthMethodDeserializer(item: any): DataExplorerAuthMethod {
  return item;
}

/** Managed Identity Method */
export enum KnownManagedIdentityMethod {
  /** SystemAssignedManagedIdentity type */
  SystemAssignedManagedIdentity = "SystemAssignedManagedIdentity",
  /** UserAssignedManagedIdentity type */
  UserAssignedManagedIdentity = "UserAssignedManagedIdentity",
}

/**
 * Managed Identity Method \
 * {@link KnownManagedIdentityMethod} can be used interchangeably with ManagedIdentityMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssignedManagedIdentity**: SystemAssignedManagedIdentity type \
 * **UserAssignedManagedIdentity**: UserAssignedManagedIdentity type
 */
export type ManagedIdentityMethod = string;

/** DataflowEndpoint Authentication SystemAssignedManagedIdentity properties */
export interface DataflowEndpointAuthenticationSystemAssignedManagedIdentity {
  /** Audience of the service to authenticate against. Optional; defaults to the audience for Service host configuration. */
  audience?: string;
}

export function dataflowEndpointAuthenticationSystemAssignedManagedIdentitySerializer(
  item: DataflowEndpointAuthenticationSystemAssignedManagedIdentity,
): any {
  return { audience: item["audience"] };
}

export function dataflowEndpointAuthenticationSystemAssignedManagedIdentityDeserializer(
  item: any,
): DataflowEndpointAuthenticationSystemAssignedManagedIdentity {
  return {
    audience: item["audience"],
  };
}

/** DataflowEndpoint Authentication UserAssignedManagedIdentity properties */
export interface DataflowEndpointAuthenticationUserAssignedManagedIdentity {
  /** Client ID for the user-assigned managed identity. */
  clientId: string;
  /** Resource identifier (application ID URI) of the resource, affixed with the .default suffix. */
  scope?: string;
  /** Tenant ID. */
  tenantId: string;
}

export function dataflowEndpointAuthenticationUserAssignedManagedIdentitySerializer(
  item: DataflowEndpointAuthenticationUserAssignedManagedIdentity,
): any {
  return {
    clientId: item["clientId"],
    scope: item["scope"],
    tenantId: item["tenantId"],
  };
}

export function dataflowEndpointAuthenticationUserAssignedManagedIdentityDeserializer(
  item: any,
): DataflowEndpointAuthenticationUserAssignedManagedIdentity {
  return {
    clientId: item["clientId"],
    scope: item["scope"],
    tenantId: item["tenantId"],
  };
}

/** Batching configuration */
export interface BatchingConfiguration {
  /** Batching latency in seconds. */
  latencySeconds?: number;
  /** Maximum number of messages in a batch. */
  maxMessages?: number;
}

export function batchingConfigurationSerializer(item: BatchingConfiguration): any {
  return {
    latencySeconds: item["latencySeconds"],
    maxMessages: item["maxMessages"],
  };
}

export function batchingConfigurationDeserializer(item: any): BatchingConfiguration {
  return {
    latencySeconds: item["latencySeconds"],
    maxMessages: item["maxMessages"],
  };
}

/** Azure Data Lake endpoint properties */
export interface DataflowEndpointDataLakeStorage {
  /** Authentication configuration. NOTE - only authentication property is allowed per entry. */
  authentication: DataflowEndpointDataLakeStorageAuthentication;
  /** Host of the Azure Data Lake in the form of <account>.blob.core.windows.net . */
  host: string;
  /** Azure Data Lake endpoint batching configuration. */
  batching?: BatchingConfiguration;
}

export function dataflowEndpointDataLakeStorageSerializer(
  item: DataflowEndpointDataLakeStorage,
): any {
  return {
    authentication: dataflowEndpointDataLakeStorageAuthenticationSerializer(item["authentication"]),
    host: item["host"],
    batching: !item["batching"]
      ? item["batching"]
      : batchingConfigurationSerializer(item["batching"]),
  };
}

export function dataflowEndpointDataLakeStorageDeserializer(
  item: any,
): DataflowEndpointDataLakeStorage {
  return {
    authentication: dataflowEndpointDataLakeStorageAuthenticationDeserializer(
      item["authentication"],
    ),
    host: item["host"],
    batching: !item["batching"]
      ? item["batching"]
      : batchingConfigurationDeserializer(item["batching"]),
  };
}

/** Azure Data Lake endpoint Authentication properties.  NOTE Enum - Only one method is supported for one entry */
export interface DataflowEndpointDataLakeStorageAuthentication {
  /** Mode of Authentication. */
  method: DataLakeStorageAuthMethod;
  /** SAS token authentication. */
  accessTokenSettings?: DataflowEndpointAuthenticationAccessToken;
  /** System-assigned managed identity authentication. */
  systemAssignedManagedIdentitySettings?: DataflowEndpointAuthenticationSystemAssignedManagedIdentity;
  /** User-assigned managed identity authentication. */
  userAssignedManagedIdentitySettings?: DataflowEndpointAuthenticationUserAssignedManagedIdentity;
}

export function dataflowEndpointDataLakeStorageAuthenticationSerializer(
  item: DataflowEndpointDataLakeStorageAuthentication,
): any {
  return {
    method: dataLakeStorageAuthMethodSerializer(item["method"]),
    accessTokenSettings: !item["accessTokenSettings"]
      ? item["accessTokenSettings"]
      : dataflowEndpointAuthenticationAccessTokenSerializer(item["accessTokenSettings"]),
    systemAssignedManagedIdentitySettings: !item["systemAssignedManagedIdentitySettings"]
      ? item["systemAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationSystemAssignedManagedIdentitySerializer(
          item["systemAssignedManagedIdentitySettings"],
        ),
    userAssignedManagedIdentitySettings: !item["userAssignedManagedIdentitySettings"]
      ? item["userAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationUserAssignedManagedIdentitySerializer(
          item["userAssignedManagedIdentitySettings"],
        ),
  };
}

export function dataflowEndpointDataLakeStorageAuthenticationDeserializer(
  item: any,
): DataflowEndpointDataLakeStorageAuthentication {
  return {
    method: dataLakeStorageAuthMethodDeserializer(item["method"]),
    accessTokenSettings: !item["accessTokenSettings"]
      ? item["accessTokenSettings"]
      : dataflowEndpointAuthenticationAccessTokenDeserializer(item["accessTokenSettings"]),
    systemAssignedManagedIdentitySettings: !item["systemAssignedManagedIdentitySettings"]
      ? item["systemAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationSystemAssignedManagedIdentityDeserializer(
          item["systemAssignedManagedIdentitySettings"],
        ),
    userAssignedManagedIdentitySettings: !item["userAssignedManagedIdentitySettings"]
      ? item["userAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationUserAssignedManagedIdentityDeserializer(
          item["userAssignedManagedIdentitySettings"],
        ),
  };
}

/** Alias for DataLakeStorageAuthMethod */
export type DataLakeStorageAuthMethod = ManagedIdentityMethod | AccessTokenMethod;

export function dataLakeStorageAuthMethodSerializer(item: DataLakeStorageAuthMethod): any {
  return item;
}

export function dataLakeStorageAuthMethodDeserializer(item: any): DataLakeStorageAuthMethod {
  return item;
}

/** Access Token Method */
export enum KnownAccessTokenMethod {
  /** AccessToken Option */
  AccessToken = "AccessToken",
}

/**
 * Access Token Method \
 * {@link KnownAccessTokenMethod} can be used interchangeably with AccessTokenMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AccessToken**: AccessToken Option
 */
export type AccessTokenMethod = string;

/** DataflowEndpoint Authentication Access Token properties */
export interface DataflowEndpointAuthenticationAccessToken {
  /** Token secret name. */
  secretRef: string;
}

export function dataflowEndpointAuthenticationAccessTokenSerializer(
  item: DataflowEndpointAuthenticationAccessToken,
): any {
  return { secretRef: item["secretRef"] };
}

export function dataflowEndpointAuthenticationAccessTokenDeserializer(
  item: any,
): DataflowEndpointAuthenticationAccessToken {
  return {
    secretRef: item["secretRef"],
  };
}

/** Microsoft Fabric endpoint properties */
export interface DataflowEndpointFabricOneLake {
  /** Authentication configuration. NOTE - only one authentication property is allowed per entry. */
  authentication: DataflowEndpointFabricOneLakeAuthentication;
  /** Names of the workspace and lakehouse. */
  names: DataflowEndpointFabricOneLakeNames;
  /** Type of location of the data in the workspace. Can be either tables or files. */
  oneLakePathType: DataflowEndpointFabricPathType;
  /** Host of the Microsoft Fabric in the form of https://<host>.fabric.microsoft.com. */
  host: string;
  /** Batching configuration. */
  batching?: BatchingConfiguration;
}

export function dataflowEndpointFabricOneLakeSerializer(item: DataflowEndpointFabricOneLake): any {
  return {
    authentication: dataflowEndpointFabricOneLakeAuthenticationSerializer(item["authentication"]),
    names: dataflowEndpointFabricOneLakeNamesSerializer(item["names"]),
    oneLakePathType: item["oneLakePathType"],
    host: item["host"],
    batching: !item["batching"]
      ? item["batching"]
      : batchingConfigurationSerializer(item["batching"]),
  };
}

export function dataflowEndpointFabricOneLakeDeserializer(
  item: any,
): DataflowEndpointFabricOneLake {
  return {
    authentication: dataflowEndpointFabricOneLakeAuthenticationDeserializer(item["authentication"]),
    names: dataflowEndpointFabricOneLakeNamesDeserializer(item["names"]),
    oneLakePathType: item["oneLakePathType"],
    host: item["host"],
    batching: !item["batching"]
      ? item["batching"]
      : batchingConfigurationDeserializer(item["batching"]),
  };
}

/** Microsoft Fabric endpoint. Authentication properties. NOTE - Only one method is supported for one entry */
export interface DataflowEndpointFabricOneLakeAuthentication {
  /** Mode of Authentication. */
  method: FabricOneLakeAuthMethod;
  /** System-assigned managed identity authentication. */
  systemAssignedManagedIdentitySettings?: DataflowEndpointAuthenticationSystemAssignedManagedIdentity;
  /** User-assigned managed identity authentication. */
  userAssignedManagedIdentitySettings?: DataflowEndpointAuthenticationUserAssignedManagedIdentity;
}

export function dataflowEndpointFabricOneLakeAuthenticationSerializer(
  item: DataflowEndpointFabricOneLakeAuthentication,
): any {
  return {
    method: fabricOneLakeAuthMethodSerializer(item["method"]),
    systemAssignedManagedIdentitySettings: !item["systemAssignedManagedIdentitySettings"]
      ? item["systemAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationSystemAssignedManagedIdentitySerializer(
          item["systemAssignedManagedIdentitySettings"],
        ),
    userAssignedManagedIdentitySettings: !item["userAssignedManagedIdentitySettings"]
      ? item["userAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationUserAssignedManagedIdentitySerializer(
          item["userAssignedManagedIdentitySettings"],
        ),
  };
}

export function dataflowEndpointFabricOneLakeAuthenticationDeserializer(
  item: any,
): DataflowEndpointFabricOneLakeAuthentication {
  return {
    method: fabricOneLakeAuthMethodDeserializer(item["method"]),
    systemAssignedManagedIdentitySettings: !item["systemAssignedManagedIdentitySettings"]
      ? item["systemAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationSystemAssignedManagedIdentityDeserializer(
          item["systemAssignedManagedIdentitySettings"],
        ),
    userAssignedManagedIdentitySettings: !item["userAssignedManagedIdentitySettings"]
      ? item["userAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationUserAssignedManagedIdentityDeserializer(
          item["userAssignedManagedIdentitySettings"],
        ),
  };
}

/** Alias for FabricOneLakeAuthMethod */
export type FabricOneLakeAuthMethod = ManagedIdentityMethod;

export function fabricOneLakeAuthMethodSerializer(item: FabricOneLakeAuthMethod): any {
  return item;
}

export function fabricOneLakeAuthMethodDeserializer(item: any): FabricOneLakeAuthMethod {
  return item;
}

/** Microsoft Fabric endpoint Names properties */
export interface DataflowEndpointFabricOneLakeNames {
  /** Lakehouse name. */
  lakehouseName: string;
  /** Workspace name. */
  workspaceName: string;
}

export function dataflowEndpointFabricOneLakeNamesSerializer(
  item: DataflowEndpointFabricOneLakeNames,
): any {
  return {
    lakehouseName: item["lakehouseName"],
    workspaceName: item["workspaceName"],
  };
}

export function dataflowEndpointFabricOneLakeNamesDeserializer(
  item: any,
): DataflowEndpointFabricOneLakeNames {
  return {
    lakehouseName: item["lakehouseName"],
    workspaceName: item["workspaceName"],
  };
}

/** DataflowEndpoint Fabric Path Type properties */
export enum KnownDataflowEndpointFabricPathType {
  /** FILES Type */
  Files = "Files",
  /** TABLES Type */
  Tables = "Tables",
}

/**
 * DataflowEndpoint Fabric Path Type properties \
 * {@link KnownDataflowEndpointFabricPathType} can be used interchangeably with DataflowEndpointFabricPathType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Files**: FILES Type \
 * **Tables**: TABLES Type
 */
export type DataflowEndpointFabricPathType = string;

/** Kafka endpoint properties */
export interface DataflowEndpointKafka {
  /** Authentication configuration. NOTE - only authentication property is allowed per entry. */
  authentication: DataflowEndpointKafkaAuthentication;
  /** Consumer group ID. */
  consumerGroupId?: string;
  /** Kafka endpoint host. */
  host: string;
  /** Batching configuration. */
  batching?: DataflowEndpointKafkaBatching;
  /** Copy Broker properties. No effect if the endpoint is used as a source or if the dataflow doesn't have an Broker source. */
  copyMqttProperties?: OperationalMode;
  /** Compression. Can be none, gzip, lz4, or snappy. No effect if the endpoint is used as a source. */
  compression?: DataflowEndpointKafkaCompression;
  /** Kafka acks. Can be all, one, or zero. No effect if the endpoint is used as a source. */
  kafkaAcks?: DataflowEndpointKafkaAcks;
  /** Partition handling strategy. Can be default or static. No effect if the endpoint is used as a source. */
  partitionStrategy?: DataflowEndpointKafkaPartitionStrategy;
  /** TLS configuration. */
  tls?: TlsProperties;
  /** Cloud event mapping config. */
  cloudEventAttributes?: CloudEventAttributeType;
}

export function dataflowEndpointKafkaSerializer(item: DataflowEndpointKafka): any {
  return {
    authentication: dataflowEndpointKafkaAuthenticationSerializer(item["authentication"]),
    consumerGroupId: item["consumerGroupId"],
    host: item["host"],
    batching: !item["batching"]
      ? item["batching"]
      : dataflowEndpointKafkaBatchingSerializer(item["batching"]),
    copyMqttProperties: item["copyMqttProperties"],
    compression: item["compression"],
    kafkaAcks: item["kafkaAcks"],
    partitionStrategy: item["partitionStrategy"],
    tls: !item["tls"] ? item["tls"] : tlsPropertiesSerializer(item["tls"]),
    cloudEventAttributes: item["cloudEventAttributes"],
  };
}

export function dataflowEndpointKafkaDeserializer(item: any): DataflowEndpointKafka {
  return {
    authentication: dataflowEndpointKafkaAuthenticationDeserializer(item["authentication"]),
    consumerGroupId: item["consumerGroupId"],
    host: item["host"],
    batching: !item["batching"]
      ? item["batching"]
      : dataflowEndpointKafkaBatchingDeserializer(item["batching"]),
    copyMqttProperties: item["copyMqttProperties"],
    compression: item["compression"],
    kafkaAcks: item["kafkaAcks"],
    partitionStrategy: item["partitionStrategy"],
    tls: !item["tls"] ? item["tls"] : tlsPropertiesDeserializer(item["tls"]),
    cloudEventAttributes: item["cloudEventAttributes"],
  };
}

/** Kafka endpoint Authentication properties. NOTE - only authentication property is allowed per entry */
export interface DataflowEndpointKafkaAuthentication {
  /** Mode of Authentication. */
  method: KafkaAuthMethod;
  /** System-assigned managed identity authentication. */
  systemAssignedManagedIdentitySettings?: DataflowEndpointAuthenticationSystemAssignedManagedIdentity;
  /** User-assigned managed identity authentication. */
  userAssignedManagedIdentitySettings?: DataflowEndpointAuthenticationUserAssignedManagedIdentity;
  /** SASL authentication. */
  saslSettings?: DataflowEndpointAuthenticationSasl;
  /** X.509 certificate authentication. */
  x509CertificateSettings?: DataflowEndpointAuthenticationX509;
}

export function dataflowEndpointKafkaAuthenticationSerializer(
  item: DataflowEndpointKafkaAuthentication,
): any {
  return {
    method: kafkaAuthMethodSerializer(item["method"]),
    systemAssignedManagedIdentitySettings: !item["systemAssignedManagedIdentitySettings"]
      ? item["systemAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationSystemAssignedManagedIdentitySerializer(
          item["systemAssignedManagedIdentitySettings"],
        ),
    userAssignedManagedIdentitySettings: !item["userAssignedManagedIdentitySettings"]
      ? item["userAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationUserAssignedManagedIdentitySerializer(
          item["userAssignedManagedIdentitySettings"],
        ),
    saslSettings: !item["saslSettings"]
      ? item["saslSettings"]
      : dataflowEndpointAuthenticationSaslSerializer(item["saslSettings"]),
    x509CertificateSettings: !item["x509CertificateSettings"]
      ? item["x509CertificateSettings"]
      : dataflowEndpointAuthenticationX509Serializer(item["x509CertificateSettings"]),
  };
}

export function dataflowEndpointKafkaAuthenticationDeserializer(
  item: any,
): DataflowEndpointKafkaAuthentication {
  return {
    method: kafkaAuthMethodDeserializer(item["method"]),
    systemAssignedManagedIdentitySettings: !item["systemAssignedManagedIdentitySettings"]
      ? item["systemAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationSystemAssignedManagedIdentityDeserializer(
          item["systemAssignedManagedIdentitySettings"],
        ),
    userAssignedManagedIdentitySettings: !item["userAssignedManagedIdentitySettings"]
      ? item["userAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationUserAssignedManagedIdentityDeserializer(
          item["userAssignedManagedIdentitySettings"],
        ),
    saslSettings: !item["saslSettings"]
      ? item["saslSettings"]
      : dataflowEndpointAuthenticationSaslDeserializer(item["saslSettings"]),
    x509CertificateSettings: !item["x509CertificateSettings"]
      ? item["x509CertificateSettings"]
      : dataflowEndpointAuthenticationX509Deserializer(item["x509CertificateSettings"]),
  };
}

/** Alias for KafkaAuthMethod */
export type KafkaAuthMethod =
  | ManagedIdentityMethod
  | SaslMethod
  | X509CertificateMethod
  | AnonymousMethod;

export function kafkaAuthMethodSerializer(item: KafkaAuthMethod): any {
  return item;
}

export function kafkaAuthMethodDeserializer(item: any): KafkaAuthMethod {
  return item;
}

/** Sasl Method */
export enum KnownSaslMethod {
  /** Sasl Option */
  Sasl = "Sasl",
}

/**
 * Sasl Method \
 * {@link KnownSaslMethod} can be used interchangeably with SaslMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Sasl**: Sasl Option
 */
export type SaslMethod = string;

/** x509 Certificate Method */
export enum KnownX509CertificateMethod {
  /** x509Certificate Option */
  X509Certificate = "X509Certificate",
}

/**
 * x509 Certificate Method \
 * {@link Knownx509CertificateMethod} can be used interchangeably with x509CertificateMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **X509Certificate**: x509Certificate Option
 */
export type X509CertificateMethod = string;

/** x509 Certificate Method */
export enum KnownAnonymousMethod {
  /** Anonymous Option */
  Anonymous = "Anonymous",
}

/**
 * x509 Certificate Method \
 * {@link KnownAnonymousMethod} can be used interchangeably with AnonymousMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Anonymous**: Anonymous Option
 */
export type AnonymousMethod = string;

/** DataflowEndpoint Authentication Sasl properties */
export interface DataflowEndpointAuthenticationSasl {
  /** Type of SASL authentication. Can be PLAIN, SCRAM-SHA-256, or SCRAM-SHA-512. */
  saslType: DataflowEndpointAuthenticationSaslType;
  /** Token secret name. */
  secretRef: string;
}

export function dataflowEndpointAuthenticationSaslSerializer(
  item: DataflowEndpointAuthenticationSasl,
): any {
  return { saslType: item["saslType"], secretRef: item["secretRef"] };
}

export function dataflowEndpointAuthenticationSaslDeserializer(
  item: any,
): DataflowEndpointAuthenticationSasl {
  return {
    saslType: item["saslType"],
    secretRef: item["secretRef"],
  };
}

/** DataflowEndpoint Authentication Sasl Type properties */
export enum KnownDataflowEndpointAuthenticationSaslType {
  /** PLAIN Type */
  Plain = "Plain",
  /** SCRAM_SHA_256 Type */
  ScramSha256 = "ScramSha256",
  /** SCRAM_SHA_512 Type */
  ScramSha512 = "ScramSha512",
}

/**
 * DataflowEndpoint Authentication Sasl Type properties \
 * {@link KnownDataflowEndpointAuthenticationSaslType} can be used interchangeably with DataflowEndpointAuthenticationSaslType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Plain**: PLAIN Type \
 * **ScramSha256**: SCRAM_SHA_256 Type \
 * **ScramSha512**: SCRAM_SHA_512 Type
 */
export type DataflowEndpointAuthenticationSaslType = string;

/** DataflowEndpoint Authentication X509 properties */
export interface DataflowEndpointAuthenticationX509 {
  /** Secret reference of the X.509 certificate. */
  secretRef: string;
}

export function dataflowEndpointAuthenticationX509Serializer(
  item: DataflowEndpointAuthenticationX509,
): any {
  return { secretRef: item["secretRef"] };
}

export function dataflowEndpointAuthenticationX509Deserializer(
  item: any,
): DataflowEndpointAuthenticationX509 {
  return {
    secretRef: item["secretRef"],
  };
}

/** Kafka endpoint Batching properties */
export interface DataflowEndpointKafkaBatching {
  /** Mode for batching. */
  mode?: OperationalMode;
  /** Batching latency in milliseconds. */
  latencyMs?: number;
  /** Maximum number of bytes in a batch. */
  maxBytes?: number;
  /** Maximum number of messages in a batch. */
  maxMessages?: number;
}

export function dataflowEndpointKafkaBatchingSerializer(item: DataflowEndpointKafkaBatching): any {
  return {
    mode: item["mode"],
    latencyMs: item["latencyMs"],
    maxBytes: item["maxBytes"],
    maxMessages: item["maxMessages"],
  };
}

export function dataflowEndpointKafkaBatchingDeserializer(
  item: any,
): DataflowEndpointKafkaBatching {
  return {
    mode: item["mode"],
    latencyMs: item["latencyMs"],
    maxBytes: item["maxBytes"],
    maxMessages: item["maxMessages"],
  };
}

/** Mode properties */
export enum KnownOperationalMode {
  /** Enabled is equivalent to True */
  Enabled = "Enabled",
  /** Disabled is equivalent to False. */
  Disabled = "Disabled",
}

/**
 * Mode properties \
 * {@link KnownOperationalMode} can be used interchangeably with OperationalMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled is equivalent to True \
 * **Disabled**: Disabled is equivalent to False.
 */
export type OperationalMode = string;

/** Kafka endpoint Compression properties */
export enum KnownDataflowEndpointKafkaCompression {
  /** NONE Option */
  None = "None",
  /** Gzip Option */
  Gzip = "Gzip",
  /** SNAPPY Option */
  Snappy = "Snappy",
  /** LZ4 Option */
  Lz4 = "Lz4",
}

/**
 * Kafka endpoint Compression properties \
 * {@link KnownDataflowEndpointKafkaCompression} can be used interchangeably with DataflowEndpointKafkaCompression,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: NONE Option \
 * **Gzip**: Gzip Option \
 * **Snappy**: SNAPPY Option \
 * **Lz4**: LZ4 Option
 */
export type DataflowEndpointKafkaCompression = string;

/** DataflowEndpoint Kafka Acks properties */
export enum KnownDataflowEndpointKafkaAcks {
  /** ZERO Option */
  Zero = "Zero",
  /** ONE Option */
  One = "One",
  /** ALL Option */
  All = "All",
}

/**
 * DataflowEndpoint Kafka Acks properties \
 * {@link KnownDataflowEndpointKafkaAcks} can be used interchangeably with DataflowEndpointKafkaAcks,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Zero**: ZERO Option \
 * **One**: ONE Option \
 * **All**: ALL Option
 */
export type DataflowEndpointKafkaAcks = string;

/** DataflowEndpoint Kafka Partition Strategy properties */
export enum KnownDataflowEndpointKafkaPartitionStrategy {
  /** Default: Assigns messages to random partitions, using a round-robin algorithm. */
  Default = "Default",
  /** Static: Assigns messages to a fixed partition number that's derived from the instance ID of the dataflow. */
  Static = "Static",
  /** TOPIC Option */
  Topic = "Topic",
  /** PROPERTY Option */
  Property = "Property",
}

/**
 * DataflowEndpoint Kafka Partition Strategy properties \
 * {@link KnownDataflowEndpointKafkaPartitionStrategy} can be used interchangeably with DataflowEndpointKafkaPartitionStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default: Assigns messages to random partitions, using a round-robin algorithm. \
 * **Static**: Static: Assigns messages to a fixed partition number that's derived from the instance ID of the dataflow. \
 * **Topic**: TOPIC Option \
 * **Property**: PROPERTY Option
 */
export type DataflowEndpointKafkaPartitionStrategy = string;

/** Tls properties */
export interface TlsProperties {
  /** Mode for TLS. */
  mode?: OperationalMode;
  /** Trusted CA certificate config map. */
  trustedCaCertificateConfigMapRef?: string;
}

export function tlsPropertiesSerializer(item: TlsProperties): any {
  return {
    mode: item["mode"],
    trustedCaCertificateConfigMapRef: item["trustedCaCertificateConfigMapRef"],
  };
}

export function tlsPropertiesDeserializer(item: any): TlsProperties {
  return {
    mode: item["mode"],
    trustedCaCertificateConfigMapRef: item["trustedCaCertificateConfigMapRef"],
  };
}

/** How to map events to the cloud. */
export enum KnownCloudEventAttributeType {
  /** Propagate type */
  Propagate = "Propagate",
  /** CreateOrRemap type */
  CreateOrRemap = "CreateOrRemap",
}

/**
 * How to map events to the cloud. \
 * {@link KnownCloudEventAttributeType} can be used interchangeably with CloudEventAttributeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Propagate**: Propagate type \
 * **CreateOrRemap**: CreateOrRemap type
 */
export type CloudEventAttributeType = string;

/** Local persistent volume endpoint properties */
export interface DataflowEndpointLocalStorage {
  /** Persistent volume claim name. */
  persistentVolumeClaimRef: string;
}

export function dataflowEndpointLocalStorageSerializer(item: DataflowEndpointLocalStorage): any {
  return { persistentVolumeClaimRef: item["persistentVolumeClaimRef"] };
}

export function dataflowEndpointLocalStorageDeserializer(item: any): DataflowEndpointLocalStorage {
  return {
    persistentVolumeClaimRef: item["persistentVolumeClaimRef"],
  };
}

/** Broker endpoint properties */
export interface DataflowEndpointMqtt {
  /** authentication properties. DEFAULT: kubernetes.audience=aio-internal. NOTE - Enum field only property is allowed */
  authentication: DataflowEndpointMqttAuthentication;
  /** Client ID prefix. Client ID generated by the dataflow is <prefix>-TBD. Optional; no prefix if omitted. */
  clientIdPrefix?: string;
  /** Host of the Broker in the form of <hostname>:<port>. Optional; connects to Broker if omitted. */
  host?: string;
  /** Enable or disable websockets. */
  protocol?: BrokerProtocolType;
  /** Broker KeepAlive for connection in seconds. */
  keepAliveSeconds?: number;
  /** Whether or not to keep the retain setting. */
  retain?: MqttRetainType;
  /** The max number of messages to keep in flight. For subscribe, this is the receive maximum. For publish, this is the maximum number of messages to send before waiting for an ack. */
  maxInflightMessages?: number;
  /** Qos for Broker connection. */
  qos?: number;
  /** Session expiry in seconds. */
  sessionExpirySeconds?: number;
  /** TLS configuration. */
  tls?: TlsProperties;
  /** Cloud event mapping config. */
  cloudEventAttributes?: CloudEventAttributeType;
}

export function dataflowEndpointMqttSerializer(item: DataflowEndpointMqtt): any {
  return {
    authentication: dataflowEndpointMqttAuthenticationSerializer(item["authentication"]),
    clientIdPrefix: item["clientIdPrefix"],
    host: item["host"],
    protocol: item["protocol"],
    keepAliveSeconds: item["keepAliveSeconds"],
    retain: item["retain"],
    maxInflightMessages: item["maxInflightMessages"],
    qos: item["qos"],
    sessionExpirySeconds: item["sessionExpirySeconds"],
    tls: !item["tls"] ? item["tls"] : tlsPropertiesSerializer(item["tls"]),
    cloudEventAttributes: item["cloudEventAttributes"],
  };
}

export function dataflowEndpointMqttDeserializer(item: any): DataflowEndpointMqtt {
  return {
    authentication: dataflowEndpointMqttAuthenticationDeserializer(item["authentication"]),
    clientIdPrefix: item["clientIdPrefix"],
    host: item["host"],
    protocol: item["protocol"],
    keepAliveSeconds: item["keepAliveSeconds"],
    retain: item["retain"],
    maxInflightMessages: item["maxInflightMessages"],
    qos: item["qos"],
    sessionExpirySeconds: item["sessionExpirySeconds"],
    tls: !item["tls"] ? item["tls"] : tlsPropertiesDeserializer(item["tls"]),
    cloudEventAttributes: item["cloudEventAttributes"],
  };
}

/** Mqtt endpoint Authentication properties. NOTE - only authentication property is allowed per entry. */
export interface DataflowEndpointMqttAuthentication {
  /** Mode of Authentication. */
  method: MqttAuthMethod;
  /** System-assigned managed identity authentication. */
  systemAssignedManagedIdentitySettings?: DataflowEndpointAuthenticationSystemAssignedManagedIdentity;
  /** User-assigned managed identity authentication. */
  userAssignedManagedIdentitySettings?: DataflowEndpointAuthenticationUserAssignedManagedIdentity;
  /** Kubernetes service account token authentication. Default audience if not set is aio-internal */
  serviceAccountTokenSettings?: DataflowEndpointAuthenticationServiceAccountToken;
  /** X.509 certificate authentication. */
  x509CertificateSettings?: DataflowEndpointAuthenticationX509;
}

export function dataflowEndpointMqttAuthenticationSerializer(
  item: DataflowEndpointMqttAuthentication,
): any {
  return {
    method: mqttAuthMethodSerializer(item["method"]),
    systemAssignedManagedIdentitySettings: !item["systemAssignedManagedIdentitySettings"]
      ? item["systemAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationSystemAssignedManagedIdentitySerializer(
          item["systemAssignedManagedIdentitySettings"],
        ),
    userAssignedManagedIdentitySettings: !item["userAssignedManagedIdentitySettings"]
      ? item["userAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationUserAssignedManagedIdentitySerializer(
          item["userAssignedManagedIdentitySettings"],
        ),
    serviceAccountTokenSettings: !item["serviceAccountTokenSettings"]
      ? item["serviceAccountTokenSettings"]
      : dataflowEndpointAuthenticationServiceAccountTokenSerializer(
          item["serviceAccountTokenSettings"],
        ),
    x509CertificateSettings: !item["x509CertificateSettings"]
      ? item["x509CertificateSettings"]
      : dataflowEndpointAuthenticationX509Serializer(item["x509CertificateSettings"]),
  };
}

export function dataflowEndpointMqttAuthenticationDeserializer(
  item: any,
): DataflowEndpointMqttAuthentication {
  return {
    method: mqttAuthMethodDeserializer(item["method"]),
    systemAssignedManagedIdentitySettings: !item["systemAssignedManagedIdentitySettings"]
      ? item["systemAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationSystemAssignedManagedIdentityDeserializer(
          item["systemAssignedManagedIdentitySettings"],
        ),
    userAssignedManagedIdentitySettings: !item["userAssignedManagedIdentitySettings"]
      ? item["userAssignedManagedIdentitySettings"]
      : dataflowEndpointAuthenticationUserAssignedManagedIdentityDeserializer(
          item["userAssignedManagedIdentitySettings"],
        ),
    serviceAccountTokenSettings: !item["serviceAccountTokenSettings"]
      ? item["serviceAccountTokenSettings"]
      : dataflowEndpointAuthenticationServiceAccountTokenDeserializer(
          item["serviceAccountTokenSettings"],
        ),
    x509CertificateSettings: !item["x509CertificateSettings"]
      ? item["x509CertificateSettings"]
      : dataflowEndpointAuthenticationX509Deserializer(item["x509CertificateSettings"]),
  };
}

/** Alias for MqttAuthMethod */
export type MqttAuthMethod =
  | ManagedIdentityMethod
  | ServiceAccountTokenMethod
  | X509CertificateMethod
  | AnonymousMethod;

export function mqttAuthMethodSerializer(item: MqttAuthMethod): any {
  return item;
}

export function mqttAuthMethodDeserializer(item: any): MqttAuthMethod {
  return item;
}

/** Service Account Token Method */
export enum KnownServiceAccountTokenMethod {
  /** ServiceAccountToken Option */
  ServiceAccountToken = "ServiceAccountToken",
}

/**
 * Service Account Token Method \
 * {@link KnownServiceAccountTokenMethod} can be used interchangeably with ServiceAccountTokenMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServiceAccountToken**: ServiceAccountToken Option
 */
export type ServiceAccountTokenMethod = string;

/** Service Account Token for BrokerAuthentication */
export interface DataflowEndpointAuthenticationServiceAccountToken {
  /** Audience of the service account. Optional, defaults to the broker internal service account audience. */
  audience: string;
}

export function dataflowEndpointAuthenticationServiceAccountTokenSerializer(
  item: DataflowEndpointAuthenticationServiceAccountToken,
): any {
  return { audience: item["audience"] };
}

export function dataflowEndpointAuthenticationServiceAccountTokenDeserializer(
  item: any,
): DataflowEndpointAuthenticationServiceAccountToken {
  return {
    audience: item["audience"],
  };
}

/** Broker Protocol types */
export enum KnownBrokerProtocolType {
  /** protocol broker */
  Mqtt = "Mqtt",
  /** protocol websocket */
  WebSockets = "WebSockets",
}

/**
 * Broker Protocol types \
 * {@link KnownBrokerProtocolType} can be used interchangeably with BrokerProtocolType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Mqtt**: protocol broker \
 * **WebSockets**: protocol websocket
 */
export type BrokerProtocolType = string;

/** Broker Retain types */
export enum KnownMqttRetainType {
  /** Retain the messages. */
  Keep = "Keep",
  /** Never retain messages. */
  Never = "Never",
}

/**
 * Broker Retain types \
 * {@link KnownMqttRetainType} can be used interchangeably with MqttRetainType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Keep**: Retain the messages. \
 * **Never**: Never retain messages.
 */
export type MqttRetainType = string;
/** The provisioning state of a resource type. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Resource creation was provisioning. */
  Provisioning = "Provisioning",
  /** Resource creation was updating. */
  Updating = "Updating",
  /** Resource creation was deleting. */
  Deleting = "Deleting",
  /** Resource creation was accepted. */
  Accepted = "Accepted",
}

/**
 * The provisioning state of a resource type. \
 * {@link KnownProvisioningState} can be used interchangeably with ResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation canceled. \
 * **Provisioning**: Resource creation provisioning. \
 * **Updating**: Resource creation updating. \
 * **Deleting**: Resource creation deleting. \
 * **Accepted**: Resource creation was accepted.
 */
export type ProvisioningState = string;

export function provisioningStateSerializer(item: ProvisioningState): any {
  return item;
}

export function provisioningStateDeserializer(item: any): ProvisioningState {
  return item;
}

/** Extended location is an extension of Azure locations. They provide a way to use their Azure ARC enabled Kubernetes clusters as target locations for deploying Azure services instances. */
export interface ExtendedLocation {
  /** The name of the extended location. */
  name: string;
  /** Type of ExtendedLocation. */
  type: ExtendedLocationType;
}

export function extendedLocationSerializer(item: ExtendedLocation): any {
  return { name: item["name"], type: item["type"] };
}

export function extendedLocationDeserializer(item: any): ExtendedLocation {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The enum defining type of ExtendedLocation accepted. */
export enum KnownExtendedLocationType {
  /** CustomLocation type */
  CustomLocation = "CustomLocation",
}

/**
 * The enum defining type of ExtendedLocation accepted. \
 * {@link KnownExtendedLocationType} can be used interchangeably with ExtendedLocationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CustomLocation**: CustomLocation type
 */
export type ExtendedLocationType = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(item: Resource): any {
  return item;
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** The response of a DataflowEndpointResource list operation. */
export interface _DataflowEndpointResourceListResult {
  /** The DataflowEndpointResource items on this page */
  value: DataflowEndpointResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dataflowEndpointResourceListResultDeserializer(
  item: any,
): _DataflowEndpointResourceListResult {
  return {
    value: dataflowEndpointResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataflowEndpointResourceArraySerializer(
  result: Array<DataflowEndpointResource>,
): any[] {
  return result.map((item) => {
    return dataflowEndpointResourceSerializer(item);
  });
}

export function dataflowEndpointResourceArrayDeserializer(
  result: Array<DataflowEndpointResource>,
): any[] {
  return result.map((item) => {
    return dataflowEndpointResourceDeserializer(item);
  });
}

/** Instance dataflowProfile dataflow resource */
export interface DataflowResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DataflowProperties;
  /** Edge location of the resource. */
  extendedLocation: ExtendedLocation;
}

export function dataflowResourceSerializer(item: DataflowResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : dataflowPropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function dataflowResourceDeserializer(item: any): DataflowResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dataflowPropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Dataflow Resource properties */
export interface DataflowProperties {
  /** Mode for Dataflow. Optional; defaults to Enabled. */
  mode?: OperationalMode;
  /** List of operations including source and destination references as well as transformation. */
  operations: DataflowOperation[];
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function dataflowPropertiesSerializer(item: DataflowProperties): any {
  return {
    mode: item["mode"],
    operations: dataflowOperationArraySerializer(item["operations"]),
  };
}

export function dataflowPropertiesDeserializer(item: any): DataflowProperties {
  return {
    mode: item["mode"],
    operations: dataflowOperationArrayDeserializer(item["operations"]),
    provisioningState: !item["provisioningState"]
      ? item["provisioningState"]
      : provisioningStateDeserializer(item["provisioningState"]),
  };
}

/** Dataflow Operation properties. NOTE - One only method is allowed to be used for one entry. */
export interface DataflowOperation {
  /** Type of operation. */
  operationType: OperationType;
  /** Optional user provided name of the transformation. */
  name?: string;
  /** Source configuration. */
  sourceSettings?: DataflowSourceOperationSettings;
  /** Built In Transformation configuration. */
  builtInTransformationSettings?: DataflowBuiltInTransformationSettings;
  /** Destination configuration. */
  destinationSettings?: DataflowDestinationOperationSettings;
}

export function dataflowOperationSerializer(item: DataflowOperation): any {
  return {
    operationType: item["operationType"],
    name: item["name"],
    sourceSettings: !item["sourceSettings"]
      ? item["sourceSettings"]
      : dataflowSourceOperationSettingsSerializer(item["sourceSettings"]),
    builtInTransformationSettings: !item["builtInTransformationSettings"]
      ? item["builtInTransformationSettings"]
      : dataflowBuiltInTransformationSettingsSerializer(item["builtInTransformationSettings"]),
    destinationSettings: !item["destinationSettings"]
      ? item["destinationSettings"]
      : dataflowDestinationOperationSettingsSerializer(item["destinationSettings"]),
  };
}

export function dataflowOperationDeserializer(item: any): DataflowOperation {
  return {
    operationType: item["operationType"],
    name: item["name"],
    sourceSettings: !item["sourceSettings"]
      ? item["sourceSettings"]
      : dataflowSourceOperationSettingsDeserializer(item["sourceSettings"]),
    builtInTransformationSettings: !item["builtInTransformationSettings"]
      ? item["builtInTransformationSettings"]
      : dataflowBuiltInTransformationSettingsDeserializer(item["builtInTransformationSettings"]),
    destinationSettings: !item["destinationSettings"]
      ? item["destinationSettings"]
      : dataflowDestinationOperationSettingsDeserializer(item["destinationSettings"]),
  };
}

/** Dataflow Operation Type properties */
export enum KnownOperationType {
  /** Dataflow Source Operation */
  Source = "Source",
  /** Dataflow Destination Operation */
  Destination = "Destination",
  /** Dataflow BuiltIn Transformation Operation */
  BuiltInTransformation = "BuiltInTransformation",
}

/**
 * Dataflow Operation Type properties \
 * {@link KnownOperationType} can be used interchangeably with OperationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Source**: Dataflow Source Operation \
 * **Destination**: Dataflow Destination Operation \
 * **BuiltInTransformation**: Dataflow BuiltIn Transformation Operation
 */
export type OperationType = string;

/** Dataflow Source Operation properties */
export interface DataflowSourceOperationSettings {
  /** Reference to the Dataflow Endpoint resource. Can only be of Broker and Kafka type. */
  endpointRef: string;
  /** Reference to the resource in Azure Device Registry where the data in the endpoint originates from. */
  assetRef?: string;
  /** Content is a JSON Schema. Allowed: JSON Schema/draft-7. */
  serializationFormat?: SourceSerializationFormat;
  /** Schema CR reference. Data will be deserialized according to the schema, and dropped if it doesn't match. */
  schemaRef?: string;
  /** List of source locations. Can be Broker or Kafka topics. Supports wildcards # and +. */
  dataSources: string[];
}

export function dataflowSourceOperationSettingsSerializer(
  item: DataflowSourceOperationSettings,
): any {
  return {
    endpointRef: item["endpointRef"],
    assetRef: item["assetRef"],
    serializationFormat: item["serializationFormat"],
    schemaRef: item["schemaRef"],
    dataSources: item["dataSources"].map((p: any) => {
      return p;
    }),
  };
}

export function dataflowSourceOperationSettingsDeserializer(
  item: any,
): DataflowSourceOperationSettings {
  return {
    endpointRef: item["endpointRef"],
    assetRef: item["assetRef"],
    serializationFormat: item["serializationFormat"],
    schemaRef: item["schemaRef"],
    dataSources: item["dataSources"].map((p: any) => {
      return p;
    }),
  };
}

/** Serialization Format properties */
export enum KnownSourceSerializationFormat {
  /** JSON Format */
  Json = "Json",
}

/**
 * Serialization Format properties \
 * {@link KnownSourceSerializationFormat} can be used interchangeably with SourceSerializationFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Json**: JSON Format
 */
export type SourceSerializationFormat = string;

/** Dataflow BuiltIn Transformation properties */
export interface DataflowBuiltInTransformationSettings {
  /** Serialization format. Optional; defaults to JSON. Allowed value JSON Schema/draft-7, Parquet. Default: Json */
  serializationFormat?: TransformationSerializationFormat;
  /** Reference to the schema that describes the output of the transformation. */
  schemaRef?: string;
  /** Enrich data from Broker State Store. Dataset references a key in Broker State Store. */
  datasets?: DataflowBuiltInTransformationDataset[];
  /** Filters input record or datapoints based on condition. */
  filter?: DataflowBuiltInTransformationFilter[];
  /** Maps input to output message. */
  map?: DataflowBuiltInTransformationMap[];
}

export function dataflowBuiltInTransformationSettingsSerializer(
  item: DataflowBuiltInTransformationSettings,
): any {
  return {
    serializationFormat: item["serializationFormat"],
    schemaRef: item["schemaRef"],
    datasets: !item["datasets"]
      ? item["datasets"]
      : dataflowBuiltInTransformationDatasetArraySerializer(item["datasets"]),
    filter: !item["filter"]
      ? item["filter"]
      : dataflowBuiltInTransformationFilterArraySerializer(item["filter"]),
    map: !item["map"] ? item["map"] : dataflowBuiltInTransformationMapArraySerializer(item["map"]),
  };
}

export function dataflowBuiltInTransformationSettingsDeserializer(
  item: any,
): DataflowBuiltInTransformationSettings {
  return {
    serializationFormat: item["serializationFormat"],
    schemaRef: item["schemaRef"],
    datasets: !item["datasets"]
      ? item["datasets"]
      : dataflowBuiltInTransformationDatasetArrayDeserializer(item["datasets"]),
    filter: !item["filter"]
      ? item["filter"]
      : dataflowBuiltInTransformationFilterArrayDeserializer(item["filter"]),
    map: !item["map"]
      ? item["map"]
      : dataflowBuiltInTransformationMapArrayDeserializer(item["map"]),
  };
}

/** Transformation Format properties */
export enum KnownTransformationSerializationFormat {
  /** Delta Format */
  Delta = "Delta",
  /** JSON Format */
  Json = "Json",
  /** Parquet Format */
  Parquet = "Parquet",
}

/**
 * Transformation Format properties \
 * {@link KnownTransformationSerializationFormat} can be used interchangeably with TransformationSerializationFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delta**: Delta Format \
 * **Json**: JSON Format \
 * **Parquet**: Parquet Format
 */
export type TransformationSerializationFormat = string;

/** Dataflow BuiltIn Transformation dataset properties */
export interface DataflowBuiltInTransformationDataset {
  /** The key of the dataset. */
  key: string;
  /** A user provided optional description of the dataset. */
  description?: string;
  /** The reference to the schema that describes the dataset. Allowed: JSON Schema/draft-7. */
  schemaRef?: string;
  /** List of fields for enriching from the Broker State Store. */
  inputs: string[];
  /** Condition to enrich data from Broker State Store. Example: $1 < 0 || $1 > $2 (Assuming inputs section $1 and $2 are provided) */
  expression?: string;
}

export function dataflowBuiltInTransformationDatasetSerializer(
  item: DataflowBuiltInTransformationDataset,
): any {
  return {
    key: item["key"],
    description: item["description"],
    schemaRef: item["schemaRef"],
    inputs: item["inputs"].map((p: any) => {
      return p;
    }),
    expression: item["expression"],
  };
}

export function dataflowBuiltInTransformationDatasetDeserializer(
  item: any,
): DataflowBuiltInTransformationDataset {
  return {
    key: item["key"],
    description: item["description"],
    schemaRef: item["schemaRef"],
    inputs: item["inputs"].map((p: any) => {
      return p;
    }),
    expression: item["expression"],
  };
}

export function dataflowBuiltInTransformationDatasetArraySerializer(
  result: Array<DataflowBuiltInTransformationDataset>,
): any[] {
  return result.map((item) => {
    return dataflowBuiltInTransformationDatasetSerializer(item);
  });
}

export function dataflowBuiltInTransformationDatasetArrayDeserializer(
  result: Array<DataflowBuiltInTransformationDataset>,
): any[] {
  return result.map((item) => {
    return dataflowBuiltInTransformationDatasetDeserializer(item);
  });
}

/** Dataflow BuiltIn Transformation filter properties */
export interface DataflowBuiltInTransformationFilter {
  /** The type of dataflow operation. */
  type?: FilterType;
  /** A user provided optional description of the filter. */
  description?: string;
  /** List of fields for filtering in JSON path expression. */
  inputs: string[];
  /** Condition to filter data. Can reference input fields with {n} where n is the index of the input field starting from 1. Example: $1 < 0 || $1 > $2 (Assuming inputs section $1 and $2 are provided) */
  expression: string;
}

export function dataflowBuiltInTransformationFilterSerializer(
  item: DataflowBuiltInTransformationFilter,
): any {
  return {
    type: item["type"],
    description: item["description"],
    inputs: item["inputs"].map((p: any) => {
      return p;
    }),
    expression: item["expression"],
  };
}

export function dataflowBuiltInTransformationFilterDeserializer(
  item: any,
): DataflowBuiltInTransformationFilter {
  return {
    type: item["type"],
    description: item["description"],
    inputs: item["inputs"].map((p: any) => {
      return p;
    }),
    expression: item["expression"],
  };
}

/** Filter Type properties */
export enum KnownFilterType {
  /** Filter type */
  Filter = "Filter",
}

/**
 * Filter Type properties \
 * {@link KnownFilterType} can be used interchangeably with FilterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Filter**: Filter type
 */
export type FilterType = string;

export function dataflowBuiltInTransformationFilterArraySerializer(
  result: Array<DataflowBuiltInTransformationFilter>,
): any[] {
  return result.map((item) => {
    return dataflowBuiltInTransformationFilterSerializer(item);
  });
}

export function dataflowBuiltInTransformationFilterArrayDeserializer(
  result: Array<DataflowBuiltInTransformationFilter>,
): any[] {
  return result.map((item) => {
    return dataflowBuiltInTransformationFilterDeserializer(item);
  });
}

/** Dataflow BuiltIn Transformation map properties */
export interface DataflowBuiltInTransformationMap {
  /** Type of transformation. */
  type?: DataflowMappingType;
  /** A user provided optional description of the mapping function. */
  description?: string;
  /** List of fields for mapping in JSON path expression. */
  inputs: string[];
  /** Modify the inputs field(s) to the final output field. Example: $1 * 2.2 (Assuming inputs section $1 is provided) */
  expression?: string;
  /** Where and how the input fields to be organized in the output record. */
  output: string;
}

export function dataflowBuiltInTransformationMapSerializer(
  item: DataflowBuiltInTransformationMap,
): any {
  return {
    type: item["type"],
    description: item["description"],
    inputs: item["inputs"].map((p: any) => {
      return p;
    }),
    expression: item["expression"],
    output: item["output"],
  };
}

export function dataflowBuiltInTransformationMapDeserializer(
  item: any,
): DataflowBuiltInTransformationMap {
  return {
    type: item["type"],
    description: item["description"],
    inputs: item["inputs"].map((p: any) => {
      return p;
    }),
    expression: item["expression"],
    output: item["output"],
  };
}

/** Dataflow type mapping properties */
export enum KnownDataflowMappingType {
  /** New Properties type */
  NewProperties = "NewProperties",
  /** Rename type */
  Rename = "Rename",
  /** Compute type */
  Compute = "Compute",
  /** Pass-through type */
  PassThrough = "PassThrough",
  /** Built in function type */
  BuiltInFunction = "BuiltInFunction",
}

/**
 * Dataflow type mapping properties \
 * {@link KnownDataflowMappingType} can be used interchangeably with DataflowMappingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NewProperties**: New Properties type \
 * **Rename**: Rename type \
 * **Compute**: Compute type \
 * **PassThrough**: Pass-through type \
 * **BuiltInFunction**: Built in function type
 */
export type DataflowMappingType = string;

export function dataflowBuiltInTransformationMapArraySerializer(
  result: Array<DataflowBuiltInTransformationMap>,
): any[] {
  return result.map((item) => {
    return dataflowBuiltInTransformationMapSerializer(item);
  });
}

export function dataflowBuiltInTransformationMapArrayDeserializer(
  result: Array<DataflowBuiltInTransformationMap>,
): any[] {
  return result.map((item) => {
    return dataflowBuiltInTransformationMapDeserializer(item);
  });
}

/** Dataflow Destination Operation properties */
export interface DataflowDestinationOperationSettings {
  /** Reference to the Endpoint CR. Can be of Broker, Kafka, Fabric, ADLS, ADX type. */
  endpointRef: string;
  /** Destination location, can be a topic or table name. Supports dynamic values with $topic, $systemProperties, $userProperties, $payload, $context, and $subscription. */
  dataDestination: string;
}

export function dataflowDestinationOperationSettingsSerializer(
  item: DataflowDestinationOperationSettings,
): any {
  return {
    endpointRef: item["endpointRef"],
    dataDestination: item["dataDestination"],
  };
}

export function dataflowDestinationOperationSettingsDeserializer(
  item: any,
): DataflowDestinationOperationSettings {
  return {
    endpointRef: item["endpointRef"],
    dataDestination: item["dataDestination"],
  };
}

export function dataflowOperationArraySerializer(result: Array<DataflowOperation>): any[] {
  return result.map((item) => {
    return dataflowOperationSerializer(item);
  });
}

export function dataflowOperationArrayDeserializer(result: Array<DataflowOperation>): any[] {
  return result.map((item) => {
    return dataflowOperationDeserializer(item);
  });
}

/** The response of a DataflowResource list operation. */
export interface _DataflowResourceListResult {
  /** The DataflowResource items on this page */
  value: DataflowResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dataflowResourceListResultDeserializer(item: any): _DataflowResourceListResult {
  return {
    value: dataflowResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataflowResourceArraySerializer(result: Array<DataflowResource>): any[] {
  return result.map((item) => {
    return dataflowResourceSerializer(item);
  });
}

export function dataflowResourceArrayDeserializer(result: Array<DataflowResource>): any[] {
  return result.map((item) => {
    return dataflowResourceDeserializer(item);
  });
}

/** Instance dataflowProfile resource */
export interface DataflowProfileResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DataflowProfileProperties;
  /** Edge location of the resource. */
  extendedLocation: ExtendedLocation;
}

export function dataflowProfileResourceSerializer(item: DataflowProfileResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : dataflowProfilePropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function dataflowProfileResourceDeserializer(item: any): DataflowProfileResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dataflowProfilePropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** DataflowProfile Resource properties */
export interface DataflowProfileProperties {
  /** Spec defines the desired identities of NBC diagnostics settings. */
  diagnostics?: ProfileDiagnostics;
  /** To manually scale the dataflow profile, specify the maximum number of instances you want to run. */
  instanceCount?: number;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function dataflowProfilePropertiesSerializer(item: DataflowProfileProperties): any {
  return {
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : profileDiagnosticsSerializer(item["diagnostics"]),
    instanceCount: item["instanceCount"],
  };
}

export function dataflowProfilePropertiesDeserializer(item: any): DataflowProfileProperties {
  return {
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : profileDiagnosticsDeserializer(item["diagnostics"]),
    instanceCount: item["instanceCount"],
    provisioningState: !item["provisioningState"]
      ? item["provisioningState"]
      : provisioningStateDeserializer(item["provisioningState"]),
  };
}

/** DataflowProfile Diagnostics properties */
export interface ProfileDiagnostics {
  /** Diagnostic log settings for the resource. */
  logs?: DiagnosticsLogs;
  /** The metrics settings for the resource. */
  metrics?: Metrics;
}

export function profileDiagnosticsSerializer(item: ProfileDiagnostics): any {
  return {
    logs: !item["logs"] ? item["logs"] : diagnosticsLogsSerializer(item["logs"]),
    metrics: !item["metrics"] ? item["metrics"] : metricsSerializer(item["metrics"]),
  };
}

export function profileDiagnosticsDeserializer(item: any): ProfileDiagnostics {
  return {
    logs: !item["logs"] ? item["logs"] : diagnosticsLogsDeserializer(item["logs"]),
    metrics: !item["metrics"] ? item["metrics"] : metricsDeserializer(item["metrics"]),
  };
}

/** Diagnostic Log properties */
export interface DiagnosticsLogs {
  /** The log level. Examples - 'debug', 'info', 'warn', 'error', 'trace'. */
  level?: string;
}

export function diagnosticsLogsSerializer(item: DiagnosticsLogs): any {
  return { level: item["level"] };
}

export function diagnosticsLogsDeserializer(item: any): DiagnosticsLogs {
  return {
    level: item["level"],
  };
}

/** Diagnostic Metrics properties */
export interface Metrics {
  /** The prometheus port to expose the metrics. */
  prometheusPort?: number;
}

export function metricsSerializer(item: Metrics): any {
  return { prometheusPort: item["prometheusPort"] };
}

export function metricsDeserializer(item: any): Metrics {
  return {
    prometheusPort: item["prometheusPort"],
  };
}

/** The response of a DataflowProfileResource list operation. */
export interface _DataflowProfileResourceListResult {
  /** The DataflowProfileResource items on this page */
  value: DataflowProfileResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dataflowProfileResourceListResultDeserializer(
  item: any,
): _DataflowProfileResourceListResult {
  return {
    value: dataflowProfileResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataflowProfileResourceArraySerializer(
  result: Array<DataflowProfileResource>,
): any[] {
  return result.map((item) => {
    return dataflowProfileResourceSerializer(item);
  });
}

export function dataflowProfileResourceArrayDeserializer(
  result: Array<DataflowProfileResource>,
): any[] {
  return result.map((item) => {
    return dataflowProfileResourceDeserializer(item);
  });
}

/** Instance broker authorizations resource */
export interface BrokerAuthorizationResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: BrokerAuthorizationProperties;
  /** Edge location of the resource. */
  extendedLocation: ExtendedLocation;
}

export function brokerAuthorizationResourceSerializer(item: BrokerAuthorizationResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : brokerAuthorizationPropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function brokerAuthorizationResourceDeserializer(item: any): BrokerAuthorizationResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : brokerAuthorizationPropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** BrokerAuthorization Resource properties */
export interface BrokerAuthorizationProperties {
  /** The list of authorization policies supported by the Authorization Resource. */
  authorizationPolicies: AuthorizationConfig;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function brokerAuthorizationPropertiesSerializer(item: BrokerAuthorizationProperties): any {
  return {
    authorizationPolicies: authorizationConfigSerializer(item["authorizationPolicies"]),
  };
}

export function brokerAuthorizationPropertiesDeserializer(
  item: any,
): BrokerAuthorizationProperties {
  return {
    authorizationPolicies: authorizationConfigDeserializer(item["authorizationPolicies"]),
    provisioningState: !item["provisioningState"]
      ? item["provisioningState"]
      : provisioningStateDeserializer(item["provisioningState"]),
  };
}

/** Broker AuthorizationConfig properties */
export interface AuthorizationConfig {
  /** Enable caching of the authorization rules. */
  cache?: OperationalMode;
  /** The authorization rules to follow. If no rule is set, but Authorization Resource is used that would mean DenyAll. */
  rules?: AuthorizationRule[];
}

export function authorizationConfigSerializer(item: AuthorizationConfig): any {
  return {
    cache: item["cache"],
    rules: !item["rules"] ? item["rules"] : authorizationRuleArraySerializer(item["rules"]),
  };
}

export function authorizationConfigDeserializer(item: any): AuthorizationConfig {
  return {
    cache: item["cache"],
    rules: !item["rules"] ? item["rules"] : authorizationRuleArrayDeserializer(item["rules"]),
  };
}

/** AuthorizationConfig Rule Properties */
export interface AuthorizationRule {
  /** Give access to Broker methods and topics. */
  brokerResources: BrokerResourceRule[];
  /** Give access to clients based on the following properties. */
  principals: PrincipalDefinition;
  /** Give access to state store resources. */
  stateStoreResources?: StateStoreResourceRule[];
}

export function authorizationRuleSerializer(item: AuthorizationRule): any {
  return {
    brokerResources: brokerResourceRuleArraySerializer(item["brokerResources"]),
    principals: principalDefinitionSerializer(item["principals"]),
    stateStoreResources: !item["stateStoreResources"]
      ? item["stateStoreResources"]
      : stateStoreResourceRuleArraySerializer(item["stateStoreResources"]),
  };
}

export function authorizationRuleDeserializer(item: any): AuthorizationRule {
  return {
    brokerResources: brokerResourceRuleArrayDeserializer(item["brokerResources"]),
    principals: principalDefinitionDeserializer(item["principals"]),
    stateStoreResources: !item["stateStoreResources"]
      ? item["stateStoreResources"]
      : stateStoreResourceRuleArrayDeserializer(item["stateStoreResources"]),
  };
}

/** Broker Resource Rule properties. This defines the objects that represent the actions or topics, such as - method.Connect, method.Publish, etc. */
export interface BrokerResourceRule {
  /** Give access for a Broker method (i.e., Connect, Subscribe, or Publish). */
  method: BrokerResourceDefinitionMethods;
  /** A list of client IDs that match the clients. The client IDs are case-sensitive and must match the client IDs provided by the clients during connection. This subfield may be set if the method is Connect. */
  clientIds?: string[];
  /** A list of topics or topic patterns that match the topics that the clients can publish or subscribe to. This subfield is required if the method is Publish or Subscribe. */
  topics?: string[];
}

export function brokerResourceRuleSerializer(item: BrokerResourceRule): any {
  return {
    method: item["method"],
    clientIds: !item["clientIds"]
      ? item["clientIds"]
      : item["clientIds"].map((p: any) => {
          return p;
        }),
    topics: !item["topics"]
      ? item["topics"]
      : item["topics"].map((p: any) => {
          return p;
        }),
  };
}

export function brokerResourceRuleDeserializer(item: any): BrokerResourceRule {
  return {
    method: item["method"],
    clientIds: !item["clientIds"]
      ? item["clientIds"]
      : item["clientIds"].map((p: any) => {
          return p;
        }),
    topics: !item["topics"]
      ? item["topics"]
      : item["topics"].map((p: any) => {
          return p;
        }),
  };
}

/** BrokerResourceDefinitionMethods methods allowed */
export enum KnownBrokerResourceDefinitionMethods {
  /** Allowed Connecting to Broker */
  Connect = "Connect",
  /** Allowed Publishing to Broker */
  Publish = "Publish",
  /** Allowed Subscribing to Broker */
  Subscribe = "Subscribe",
}

/**
 * BrokerResourceDefinitionMethods methods allowed \
 * {@link KnownBrokerResourceDefinitionMethods} can be used interchangeably with BrokerResourceDefinitionMethods,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Connect**: Allowed Connecting to Broker \
 * **Publish**: Allowed Publishing to Broker \
 * **Subscribe**: Allowed Subscribing to Broker
 */
export type BrokerResourceDefinitionMethods = string;

export function brokerResourceRuleArraySerializer(result: Array<BrokerResourceRule>): any[] {
  return result.map((item) => {
    return brokerResourceRuleSerializer(item);
  });
}

export function brokerResourceRuleArrayDeserializer(result: Array<BrokerResourceRule>): any[] {
  return result.map((item) => {
    return brokerResourceRuleDeserializer(item);
  });
}

/** PrincipalDefinition properties of Rule */
export interface PrincipalDefinition {
  /** A list of key-value pairs that match the attributes of the clients. The attributes are case-sensitive and must match the attributes provided by the clients during authentication. */
  attributes?: Record<string, string>[];
  /** A list of client IDs that match the clients. The client IDs are case-sensitive and must match the client IDs provided by the clients during connection. */
  clientIds?: string[];
  /** A list of usernames that match the clients. The usernames are case-sensitive and must match the usernames provided by the clients during authentication. */
  usernames?: string[];
}

export function principalDefinitionSerializer(item: PrincipalDefinition): any {
  return {
    attributes: !item["attributes"]
      ? item["attributes"]
      : item["attributes"].map((p: any) => {
          return p;
        }),
    clientIds: !item["clientIds"]
      ? item["clientIds"]
      : item["clientIds"].map((p: any) => {
          return p;
        }),
    usernames: !item["usernames"]
      ? item["usernames"]
      : item["usernames"].map((p: any) => {
          return p;
        }),
  };
}

export function principalDefinitionDeserializer(item: any): PrincipalDefinition {
  return {
    attributes: !item["attributes"]
      ? item["attributes"]
      : item["attributes"].map((p: any) => {
          return p;
        }),
    clientIds: !item["clientIds"]
      ? item["clientIds"]
      : item["clientIds"].map((p: any) => {
          return p;
        }),
    usernames: !item["usernames"]
      ? item["usernames"]
      : item["usernames"].map((p: any) => {
          return p;
        }),
  };
}

/** State Store Resource Rule properties. */
export interface StateStoreResourceRule {
  /** Allowed keyTypes pattern, string, binary. The key type used for matching, for example pattern tries to match the key to a glob-style pattern and string checks key is equal to value provided in keys. */
  keyType: StateStoreResourceKeyTypes;
  /** Give access to state store keys for the corresponding principals defined. When key type is pattern set glob-style pattern (e.g., '*', 'clients/*'). */
  keys: string[];
  /** Give access for `Read`, `Write` and `ReadWrite` access level. */
  method: StateStoreResourceDefinitionMethods;
}

export function stateStoreResourceRuleSerializer(item: StateStoreResourceRule): any {
  return {
    keyType: item["keyType"],
    keys: item["keys"].map((p: any) => {
      return p;
    }),
    method: item["method"],
  };
}

export function stateStoreResourceRuleDeserializer(item: any): StateStoreResourceRule {
  return {
    keyType: item["keyType"],
    keys: item["keys"].map((p: any) => {
      return p;
    }),
    method: item["method"],
  };
}

/** StateStoreResourceKeyTypes properties */
export enum KnownStateStoreResourceKeyTypes {
  /** Key type - pattern */
  Pattern = "Pattern",
  /** Key type - string */
  String = "String",
  /** Key type - binary */
  Binary = "Binary",
}

/**
 * StateStoreResourceKeyTypes properties \
 * {@link KnownStateStoreResourceKeyTypes} can be used interchangeably with StateStoreResourceKeyTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pattern**: Key type - pattern \
 * **String**: Key type - string \
 * **Binary**: Key type - binary
 */
export type StateStoreResourceKeyTypes = string;

/** StateStoreResourceDefinitionMethods methods allowed */
export enum KnownStateStoreResourceDefinitionMethods {
  /** Get/KeyNotify from Store */
  Read = "Read",
  /** Set/Delete in Store */
  Write = "Write",
  /** Allowed all operations on Store - Get/KeyNotify/Set/Delete */
  ReadWrite = "ReadWrite",
}

/**
 * StateStoreResourceDefinitionMethods methods allowed \
 * {@link KnownStateStoreResourceDefinitionMethods} can be used interchangeably with StateStoreResourceDefinitionMethods,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Read**: Get\/KeyNotify from Store \
 * **Write**: Set\/Delete in Store \
 * **ReadWrite**: Allowed all operations on Store - Get\/KeyNotify\/Set\/Delete
 */
export type StateStoreResourceDefinitionMethods = string;

export function stateStoreResourceRuleArraySerializer(
  result: Array<StateStoreResourceRule>,
): any[] {
  return result.map((item) => {
    return stateStoreResourceRuleSerializer(item);
  });
}

export function stateStoreResourceRuleArrayDeserializer(
  result: Array<StateStoreResourceRule>,
): any[] {
  return result.map((item) => {
    return stateStoreResourceRuleDeserializer(item);
  });
}

export function authorizationRuleArraySerializer(result: Array<AuthorizationRule>): any[] {
  return result.map((item) => {
    return authorizationRuleSerializer(item);
  });
}

export function authorizationRuleArrayDeserializer(result: Array<AuthorizationRule>): any[] {
  return result.map((item) => {
    return authorizationRuleDeserializer(item);
  });
}

/** The response of a BrokerAuthorizationResource list operation. */
export interface _BrokerAuthorizationResourceListResult {
  /** The BrokerAuthorizationResource items on this page */
  value: BrokerAuthorizationResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _brokerAuthorizationResourceListResultDeserializer(
  item: any,
): _BrokerAuthorizationResourceListResult {
  return {
    value: brokerAuthorizationResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function brokerAuthorizationResourceArraySerializer(
  result: Array<BrokerAuthorizationResource>,
): any[] {
  return result.map((item) => {
    return brokerAuthorizationResourceSerializer(item);
  });
}

export function brokerAuthorizationResourceArrayDeserializer(
  result: Array<BrokerAuthorizationResource>,
): any[] {
  return result.map((item) => {
    return brokerAuthorizationResourceDeserializer(item);
  });
}

/** Instance broker authentication resource */
export interface BrokerAuthenticationResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: BrokerAuthenticationProperties;
  /** Edge location of the resource. */
  extendedLocation: ExtendedLocation;
}

export function brokerAuthenticationResourceSerializer(item: BrokerAuthenticationResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : brokerAuthenticationPropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function brokerAuthenticationResourceDeserializer(item: any): BrokerAuthenticationResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : brokerAuthenticationPropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** BrokerAuthentication Resource properties */
export interface BrokerAuthenticationProperties {
  /** Defines a set of Broker authentication methods to be used on `BrokerListeners`. For each array element one authenticator type supported. */
  authenticationMethods: BrokerAuthenticatorMethods[];
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function brokerAuthenticationPropertiesSerializer(
  item: BrokerAuthenticationProperties,
): any {
  return {
    authenticationMethods: brokerAuthenticatorMethodsArraySerializer(item["authenticationMethods"]),
  };
}

export function brokerAuthenticationPropertiesDeserializer(
  item: any,
): BrokerAuthenticationProperties {
  return {
    authenticationMethods: brokerAuthenticatorMethodsArrayDeserializer(
      item["authenticationMethods"],
    ),
    provisioningState: !item["provisioningState"]
      ? item["provisioningState"]
      : provisioningStateDeserializer(item["provisioningState"]),
  };
}

/** Set of broker authentication policies. Only one method is supported for each entry. */
export interface BrokerAuthenticatorMethods {
  /** Custom authentication configuration. */
  method: BrokerAuthenticationMethod;
  /** Custom authentication configuration. */
  customSettings?: BrokerAuthenticatorMethodCustom;
  /** ServiceAccountToken authentication configuration. */
  serviceAccountTokenSettings?: BrokerAuthenticatorMethodSat;
  /** X.509 authentication configuration. */
  x509Settings?: BrokerAuthenticatorMethodX509;
}

export function brokerAuthenticatorMethodsSerializer(item: BrokerAuthenticatorMethods): any {
  return {
    method: item["method"],
    customSettings: !item["customSettings"]
      ? item["customSettings"]
      : brokerAuthenticatorMethodCustomSerializer(item["customSettings"]),
    serviceAccountTokenSettings: !item["serviceAccountTokenSettings"]
      ? item["serviceAccountTokenSettings"]
      : brokerAuthenticatorMethodSatSerializer(item["serviceAccountTokenSettings"]),
    x509Settings: !item["x509Settings"]
      ? item["x509Settings"]
      : brokerAuthenticatorMethodX509Serializer(item["x509Settings"]),
  };
}

export function brokerAuthenticatorMethodsDeserializer(item: any): BrokerAuthenticatorMethods {
  return {
    method: item["method"],
    customSettings: !item["customSettings"]
      ? item["customSettings"]
      : brokerAuthenticatorMethodCustomDeserializer(item["customSettings"]),
    serviceAccountTokenSettings: !item["serviceAccountTokenSettings"]
      ? item["serviceAccountTokenSettings"]
      : brokerAuthenticatorMethodSatDeserializer(item["serviceAccountTokenSettings"]),
    x509Settings: !item["x509Settings"]
      ? item["x509Settings"]
      : brokerAuthenticatorMethodX509Deserializer(item["x509Settings"]),
  };
}

/** Broker Authentication Mode */
export enum KnownBrokerAuthenticationMethod {
  /** Custom authentication configuration. */
  Custom = "Custom",
  /** ServiceAccountToken authentication configuration. */
  ServiceAccountToken = "ServiceAccountToken",
  /** X.509 authentication configuration. */
  X509 = "X509",
}

/**
 * Broker Authentication Mode \
 * {@link KnownBrokerAuthenticationMethod} can be used interchangeably with BrokerAuthenticationMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Custom**: Custom authentication configuration. \
 * **ServiceAccountToken**: ServiceAccountToken authentication configuration. \
 * **X509**: X.509 authentication configuration.
 */
export type BrokerAuthenticationMethod = string;

/** Custom method for BrokerAuthentication */
export interface BrokerAuthenticatorMethodCustom {
  /** Optional authentication needed for authenticating with the custom authentication server. */
  auth?: BrokerAuthenticatorCustomAuth;
  /** Optional CA certificate for validating the custom authentication server's certificate. */
  caCertConfigMap?: string;
  /** Endpoint of the custom authentication server. Must be an HTTPS endpoint. */
  endpoint: string;
  /** Additional HTTP headers to pass to the custom authentication server. */
  headers?: Record<string, string>;
}

export function brokerAuthenticatorMethodCustomSerializer(
  item: BrokerAuthenticatorMethodCustom,
): any {
  return {
    auth: !item["auth"] ? item["auth"] : brokerAuthenticatorCustomAuthSerializer(item["auth"]),
    caCertConfigMap: item["caCertConfigMap"],
    endpoint: item["endpoint"],
    headers: item["headers"],
  };
}

export function brokerAuthenticatorMethodCustomDeserializer(
  item: any,
): BrokerAuthenticatorMethodCustom {
  return {
    auth: !item["auth"] ? item["auth"] : brokerAuthenticatorCustomAuthDeserializer(item["auth"]),
    caCertConfigMap: item["caCertConfigMap"],
    endpoint: item["endpoint"],
    headers: item["headers"],
  };
}

/** Custom Authentication properties */
export interface BrokerAuthenticatorCustomAuth {
  /** X509 Custom Auth type details. */
  x509: X509ManualCertificate;
}

export function brokerAuthenticatorCustomAuthSerializer(item: BrokerAuthenticatorCustomAuth): any {
  return { x509: x509ManualCertificateSerializer(item["x509"]) };
}

export function brokerAuthenticatorCustomAuthDeserializer(
  item: any,
): BrokerAuthenticatorCustomAuth {
  return {
    x509: x509ManualCertificateDeserializer(item["x509"]),
  };
}

/** X509 Certificate Authentication properties. */
export interface X509ManualCertificate {
  /** Kubernetes secret containing an X.509 client certificate. This is a reference to the secret through an identifying name, not the secret itself. */
  secretRef: string;
}

export function x509ManualCertificateSerializer(item: X509ManualCertificate): any {
  return { secretRef: item["secretRef"] };
}

export function x509ManualCertificateDeserializer(item: any): X509ManualCertificate {
  return {
    secretRef: item["secretRef"],
  };
}

/** Service Account Token for BrokerAuthentication */
export interface BrokerAuthenticatorMethodSat {
  /** List of allowed audience. */
  audiences: string[];
}

export function brokerAuthenticatorMethodSatSerializer(item: BrokerAuthenticatorMethodSat): any {
  return {
    audiences: item["audiences"].map((p: any) => {
      return p;
    }),
  };
}

export function brokerAuthenticatorMethodSatDeserializer(item: any): BrokerAuthenticatorMethodSat {
  return {
    audiences: item["audiences"].map((p: any) => {
      return p;
    }),
  };
}

/** X509 for BrokerAuthentication. */
export interface BrokerAuthenticatorMethodX509 {
  /** X509 authorization attributes properties. */
  authorizationAttributes?: Record<string, BrokerAuthenticatorMethodX509Attributes>;
  /** Name of the trusted client ca cert resource. */
  trustedClientCaCert?: string;
}

export function brokerAuthenticatorMethodX509Serializer(item: BrokerAuthenticatorMethodX509): any {
  return {
    authorizationAttributes: !item["authorizationAttributes"]
      ? item["authorizationAttributes"]
      : brokerAuthenticatorMethodX509AttributesRecordSerializer(item["authorizationAttributes"]),
    trustedClientCaCert: item["trustedClientCaCert"],
  };
}

export function brokerAuthenticatorMethodX509Deserializer(
  item: any,
): BrokerAuthenticatorMethodX509 {
  return {
    authorizationAttributes: !item["authorizationAttributes"]
      ? item["authorizationAttributes"]
      : brokerAuthenticatorMethodX509AttributesRecordDeserializer(item["authorizationAttributes"]),
    trustedClientCaCert: item["trustedClientCaCert"],
  };
}

/** BrokerAuthenticatorMethodX509Attributes properties. */
export interface BrokerAuthenticatorMethodX509Attributes {
  /** Attributes object. */
  attributes: Record<string, string>;
  /** Subject of the X509 attribute. */
  subject: string;
}

export function brokerAuthenticatorMethodX509AttributesSerializer(
  item: BrokerAuthenticatorMethodX509Attributes,
): any {
  return { attributes: item["attributes"], subject: item["subject"] };
}

export function brokerAuthenticatorMethodX509AttributesDeserializer(
  item: any,
): BrokerAuthenticatorMethodX509Attributes {
  return {
    attributes: item["attributes"],
    subject: item["subject"],
  };
}

export function brokerAuthenticatorMethodX509AttributesRecordSerializer(
  item: Record<string, BrokerAuthenticatorMethodX509Attributes>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : brokerAuthenticatorMethodX509AttributesSerializer(item[key]);
  });
  return result;
}

export function brokerAuthenticatorMethodX509AttributesRecordDeserializer(
  item: Record<string, any>,
): Record<string, BrokerAuthenticatorMethodX509Attributes> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : brokerAuthenticatorMethodX509AttributesDeserializer(item[key]);
  });
  return result;
}

export function brokerAuthenticatorMethodsArraySerializer(
  result: Array<BrokerAuthenticatorMethods>,
): any[] {
  return result.map((item) => {
    return brokerAuthenticatorMethodsSerializer(item);
  });
}

export function brokerAuthenticatorMethodsArrayDeserializer(
  result: Array<BrokerAuthenticatorMethods>,
): any[] {
  return result.map((item) => {
    return brokerAuthenticatorMethodsDeserializer(item);
  });
}

/** The response of a BrokerAuthenticationResource list operation. */
export interface _BrokerAuthenticationResourceListResult {
  /** The BrokerAuthenticationResource items on this page */
  value: BrokerAuthenticationResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _brokerAuthenticationResourceListResultDeserializer(
  item: any,
): _BrokerAuthenticationResourceListResult {
  return {
    value: brokerAuthenticationResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function brokerAuthenticationResourceArraySerializer(
  result: Array<BrokerAuthenticationResource>,
): any[] {
  return result.map((item) => {
    return brokerAuthenticationResourceSerializer(item);
  });
}

export function brokerAuthenticationResourceArrayDeserializer(
  result: Array<BrokerAuthenticationResource>,
): any[] {
  return result.map((item) => {
    return brokerAuthenticationResourceDeserializer(item);
  });
}

/** Instance broker resource */
export interface BrokerListenerResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: BrokerListenerProperties;
  /** Edge location of the resource. */
  extendedLocation: ExtendedLocation;
}

export function brokerListenerResourceSerializer(item: BrokerListenerResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : brokerListenerPropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function brokerListenerResourceDeserializer(item: any): BrokerListenerResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : brokerListenerPropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Defines a Broker listener. A listener is a collection of ports on which the broker accepts connections from clients. */
export interface BrokerListenerProperties {
  /** Kubernetes Service name of this listener. */
  serviceName?: string;
  /** Ports on which this listener accepts client connections. */
  ports: ListenerPort[];
  /** Kubernetes Service type of this listener. */
  serviceType?: ServiceType;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function brokerListenerPropertiesSerializer(item: BrokerListenerProperties): any {
  return {
    serviceName: item["serviceName"],
    ports: listenerPortArraySerializer(item["ports"]),
    serviceType: item["serviceType"],
  };
}

export function brokerListenerPropertiesDeserializer(item: any): BrokerListenerProperties {
  return {
    serviceName: item["serviceName"],
    ports: listenerPortArrayDeserializer(item["ports"]),
    serviceType: item["serviceType"],
    provisioningState: !item["provisioningState"]
      ? item["provisioningState"]
      : provisioningStateDeserializer(item["provisioningState"]),
  };
}

/** Defines a TCP port on which a `BrokerListener` listens. */
export interface ListenerPort {
  /** Reference to client authentication settings. Omit to disable authentication. */
  authenticationRef?: string;
  /** Reference to client authorization settings. Omit to disable authorization. */
  authorizationRef?: string;
  /** Kubernetes node port. Only relevant when this port is associated with a `NodePort` listener. */
  nodePort?: number;
  /** TCP port for accepting client connections. */
  port: number;
  /** Protocol to use for client connections. */
  protocol?: BrokerProtocolType;
  /** TLS server certificate settings for this port. Omit to disable TLS. */
  tls?: TlsCertMethod;
}

export function listenerPortSerializer(item: ListenerPort): any {
  return {
    authenticationRef: item["authenticationRef"],
    authorizationRef: item["authorizationRef"],
    nodePort: item["nodePort"],
    port: item["port"],
    protocol: item["protocol"],
    tls: !item["tls"] ? item["tls"] : tlsCertMethodSerializer(item["tls"]),
  };
}

export function listenerPortDeserializer(item: any): ListenerPort {
  return {
    authenticationRef: item["authenticationRef"],
    authorizationRef: item["authorizationRef"],
    nodePort: item["nodePort"],
    port: item["port"],
    protocol: item["protocol"],
    tls: !item["tls"] ? item["tls"] : tlsCertMethodDeserializer(item["tls"]),
  };
}

/** Collection of different TLS types, NOTE- Enum at a time only one of them needs to be supported */
export interface TlsCertMethod {
  /** Mode of TLS server certificate management. */
  mode: TlsCertMethodMode;
  /** Option 1 - Automatic TLS server certificate management with cert-manager. */
  certManagerCertificateSpec?: CertManagerCertificateSpec;
  /** Option 2 - Manual TLS server certificate management through a defined secret. */
  manual?: X509ManualCertificate;
}

export function tlsCertMethodSerializer(item: TlsCertMethod): any {
  return {
    mode: item["mode"],
    certManagerCertificateSpec: !item["certManagerCertificateSpec"]
      ? item["certManagerCertificateSpec"]
      : certManagerCertificateSpecSerializer(item["certManagerCertificateSpec"]),
    manual: !item["manual"] ? item["manual"] : x509ManualCertificateSerializer(item["manual"]),
  };
}

export function tlsCertMethodDeserializer(item: any): TlsCertMethod {
  return {
    mode: item["mode"],
    certManagerCertificateSpec: !item["certManagerCertificateSpec"]
      ? item["certManagerCertificateSpec"]
      : certManagerCertificateSpecDeserializer(item["certManagerCertificateSpec"]),
    manual: !item["manual"] ? item["manual"] : x509ManualCertificateDeserializer(item["manual"]),
  };
}

/** Broker Authentication Mode */
export enum KnownTlsCertMethodMode {
  /** Automatic TLS server certificate configuration. */
  Automatic = "Automatic",
  /** Manual TLS server certificate configuration. */
  Manual = "Manual",
}

/**
 * Broker Authentication Mode \
 * {@link KnownTlsCertMethodMode} can be used interchangeably with TlsCertMethodMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Automatic**: Automatic TLS server certificate configuration. \
 * **Manual**: Manual TLS server certificate configuration.
 */
export type TlsCertMethodMode = string;

/** Automatic TLS server certificate management with cert-manager */
export interface CertManagerCertificateSpec {
  /** Lifetime of certificate. Must be specified using a Go time.Duration format (h|m|s). E.g. 240h for 240 hours and 45m for 45 minutes. */
  duration?: string;
  /** Secret for storing server certificate. Any existing data will be overwritten. This is a reference to the secret through an identifying name, not the secret itself. */
  secretName?: string;
  /** When to begin renewing certificate. Must be specified using a Go time.Duration format (h|m|s). E.g. 240h for 240 hours and 45m for 45 minutes. */
  renewBefore?: string;
  /** cert-manager issuerRef. */
  issuerRef: CertManagerIssuerRef;
  /** Type of certificate private key. */
  privateKey?: CertManagerPrivateKey;
  /** Additional Subject Alternative Names (SANs) to include in the certificate. */
  san?: SanForCert;
}

export function certManagerCertificateSpecSerializer(item: CertManagerCertificateSpec): any {
  return {
    duration: item["duration"],
    secretName: item["secretName"],
    renewBefore: item["renewBefore"],
    issuerRef: certManagerIssuerRefSerializer(item["issuerRef"]),
    privateKey: !item["privateKey"]
      ? item["privateKey"]
      : certManagerPrivateKeySerializer(item["privateKey"]),
    san: !item["san"] ? item["san"] : sanForCertSerializer(item["san"]),
  };
}

export function certManagerCertificateSpecDeserializer(item: any): CertManagerCertificateSpec {
  return {
    duration: item["duration"],
    secretName: item["secretName"],
    renewBefore: item["renewBefore"],
    issuerRef: certManagerIssuerRefDeserializer(item["issuerRef"]),
    privateKey: !item["privateKey"]
      ? item["privateKey"]
      : certManagerPrivateKeyDeserializer(item["privateKey"]),
    san: !item["san"] ? item["san"] : sanForCertDeserializer(item["san"]),
  };
}

/** Cert-Manager issuerRef properties */
export interface CertManagerIssuerRef {
  /** group of issuer. */
  group: string;
  /** kind of issuer (Issuer or ClusterIssuer). */
  kind: CertManagerIssuerKind;
  /** name of issuer. */
  name: string;
}

export function certManagerIssuerRefSerializer(item: CertManagerIssuerRef): any {
  return { group: item["group"], kind: item["kind"], name: item["name"] };
}

export function certManagerIssuerRefDeserializer(item: any): CertManagerIssuerRef {
  return {
    group: item["group"],
    kind: item["kind"],
    name: item["name"],
  };
}

/** CertManagerIssuerKind properties */
export enum KnownCertManagerIssuerKind {
  /** Issuer kind. */
  Issuer = "Issuer",
  /** ClusterIssuer kind. */
  ClusterIssuer = "ClusterIssuer",
}

/**
 * CertManagerIssuerKind properties \
 * {@link KnownCertManagerIssuerKind} can be used interchangeably with CertManagerIssuerKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Issuer**: Issuer kind. \
 * **ClusterIssuer**: ClusterIssuer kind.
 */
export type CertManagerIssuerKind = string;

/** Cert Manager private key properties */
export interface CertManagerPrivateKey {
  /** algorithm for private key. */
  algorithm: PrivateKeyAlgorithm;
  /** cert-manager private key rotationPolicy. */
  rotationPolicy: PrivateKeyRotationPolicy;
}

export function certManagerPrivateKeySerializer(item: CertManagerPrivateKey): any {
  return {
    algorithm: item["algorithm"],
    rotationPolicy: item["rotationPolicy"],
  };
}

export function certManagerPrivateKeyDeserializer(item: any): CertManagerPrivateKey {
  return {
    algorithm: item["algorithm"],
    rotationPolicy: item["rotationPolicy"],
  };
}

/** Private key algorithm types. */
export enum KnownPrivateKeyAlgorithm {
  /** Algorithm - ec256. */
  Ec256 = "Ec256",
  /** Algorithm - ec384. */
  Ec384 = "Ec384",
  /** Algorithm - ec521. */
  Ec521 = "Ec521",
  /** Algorithm - ed25519. */
  Ed25519 = "Ed25519",
  /** Algorithm - rsa2048. */
  Rsa2048 = "Rsa2048",
  /** Algorithm - rsa4096. */
  Rsa4096 = "Rsa4096",
  /** Algorithm - rsa8192. */
  Rsa8192 = "Rsa8192",
}

/**
 * Private key algorithm types. \
 * {@link KnownPrivateKeyAlgorithm} can be used interchangeably with PrivateKeyAlgorithm,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ec256**: Algorithm - ec256. \
 * **Ec384**: Algorithm - ec384. \
 * **Ec521**: Algorithm - ec521. \
 * **Ed25519**: Algorithm - ed25519. \
 * **Rsa2048**: Algorithm - rsa2048. \
 * **Rsa4096**: Algorithm - rsa4096. \
 * **Rsa8192**: Algorithm - rsa8192.
 */
export type PrivateKeyAlgorithm = string;

/** Private key rotation policy. */
export enum KnownPrivateKeyRotationPolicy {
  /** Rotation Policy - Always. */
  Always = "Always",
  /** Rotation Policy - Never. */
  Never = "Never",
}

/**
 * Private key rotation policy. \
 * {@link KnownPrivateKeyRotationPolicy} can be used interchangeably with PrivateKeyRotationPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Always**: Rotation Policy - Always. \
 * **Never**: Rotation Policy - Never.
 */
export type PrivateKeyRotationPolicy = string;

/** Subject Alternative Names (SANs) for certificate. */
export interface SanForCert {
  /** DNS SANs. */
  dns: string[];
  /** IP address SANs. */
  ip: string[];
}

export function sanForCertSerializer(item: SanForCert): any {
  return {
    dns: item["dns"].map((p: any) => {
      return p;
    }),
    ip: item["ip"].map((p: any) => {
      return p;
    }),
  };
}

export function sanForCertDeserializer(item: any): SanForCert {
  return {
    dns: item["dns"].map((p: any) => {
      return p;
    }),
    ip: item["ip"].map((p: any) => {
      return p;
    }),
  };
}

export function listenerPortArraySerializer(result: Array<ListenerPort>): any[] {
  return result.map((item) => {
    return listenerPortSerializer(item);
  });
}

export function listenerPortArrayDeserializer(result: Array<ListenerPort>): any[] {
  return result.map((item) => {
    return listenerPortDeserializer(item);
  });
}

/** Kubernetes Service Types supported by Listener */
export enum KnownServiceType {
  /** Cluster IP Service. */
  ClusterIp = "ClusterIp",
  /** Load Balancer Service. */
  LoadBalancer = "LoadBalancer",
  /** Node Port Service. */
  NodePort = "NodePort",
}

/**
 * Kubernetes Service Types supported by Listener \
 * {@link KnownServiceType} can be used interchangeably with ServiceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ClusterIp**: Cluster IP Service. \
 * **LoadBalancer**: Load Balancer Service. \
 * **NodePort**: Node Port Service.
 */
export type ServiceType = string;

/** The response of a BrokerListenerResource list operation. */
export interface _BrokerListenerResourceListResult {
  /** The BrokerListenerResource items on this page */
  value: BrokerListenerResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _brokerListenerResourceListResultDeserializer(
  item: any,
): _BrokerListenerResourceListResult {
  return {
    value: brokerListenerResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function brokerListenerResourceArraySerializer(
  result: Array<BrokerListenerResource>,
): any[] {
  return result.map((item) => {
    return brokerListenerResourceSerializer(item);
  });
}

export function brokerListenerResourceArrayDeserializer(
  result: Array<BrokerListenerResource>,
): any[] {
  return result.map((item) => {
    return brokerListenerResourceDeserializer(item);
  });
}

/** Instance broker resource */
export interface BrokerResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: BrokerProperties;
  /** Edge location of the resource. */
  extendedLocation: ExtendedLocation;
}

export function brokerResourceSerializer(item: BrokerResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : brokerPropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function brokerResourceDeserializer(item: any): BrokerResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : brokerPropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Broker Resource properties */
export interface BrokerProperties {
  /** Advanced settings of Broker. */
  advanced?: AdvancedSettings;
  /** The cardinality details of the broker. */
  cardinality?: Cardinality;
  /** Spec defines the desired identities of Broker diagnostics settings. */
  diagnostics?: BrokerDiagnostics;
  /** Settings of Disk Backed Message Buffer. */
  diskBackedMessageBuffer?: DiskBackedMessageBuffer;
  /** This setting controls whether Kubernetes CPU resource limits are requested. Increasing the number of replicas or workers proportionally increases the amount of CPU resources requested. If this setting is enabled and there are insufficient CPU resources, an error will be emitted. */
  generateResourceLimits?: GenerateResourceLimits;
  /** Memory profile of Broker. */
  memoryProfile?: BrokerMemoryProfile;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function brokerPropertiesSerializer(item: BrokerProperties): any {
  return {
    advanced: !item["advanced"] ? item["advanced"] : advancedSettingsSerializer(item["advanced"]),
    cardinality: !item["cardinality"]
      ? item["cardinality"]
      : cardinalitySerializer(item["cardinality"]),
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : brokerDiagnosticsSerializer(item["diagnostics"]),
    diskBackedMessageBuffer: !item["diskBackedMessageBuffer"]
      ? item["diskBackedMessageBuffer"]
      : diskBackedMessageBufferSerializer(item["diskBackedMessageBuffer"]),
    generateResourceLimits: !item["generateResourceLimits"]
      ? item["generateResourceLimits"]
      : generateResourceLimitsSerializer(item["generateResourceLimits"]),
    memoryProfile: item["memoryProfile"],
  };
}

export function brokerPropertiesDeserializer(item: any): BrokerProperties {
  return {
    advanced: !item["advanced"] ? item["advanced"] : advancedSettingsDeserializer(item["advanced"]),
    cardinality: !item["cardinality"]
      ? item["cardinality"]
      : cardinalityDeserializer(item["cardinality"]),
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : brokerDiagnosticsDeserializer(item["diagnostics"]),
    diskBackedMessageBuffer: !item["diskBackedMessageBuffer"]
      ? item["diskBackedMessageBuffer"]
      : diskBackedMessageBufferDeserializer(item["diskBackedMessageBuffer"]),
    generateResourceLimits: !item["generateResourceLimits"]
      ? item["generateResourceLimits"]
      : generateResourceLimitsDeserializer(item["generateResourceLimits"]),
    memoryProfile: item["memoryProfile"],
    provisioningState: !item["provisioningState"]
      ? item["provisioningState"]
      : provisioningStateDeserializer(item["provisioningState"]),
  };
}

/** Broker Advanced Settings */
export interface AdvancedSettings {
  /** Configurations related to All Clients. */
  clients?: ClientConfig;
  /** The setting to enable or disable encryption of internal Traffic. */
  encryptInternalTraffic?: OperationalMode;
  /** Certificate rotation and private key configuration. */
  internalCerts?: CertManagerCertOptions;
}

export function advancedSettingsSerializer(item: AdvancedSettings): any {
  return {
    clients: !item["clients"] ? item["clients"] : clientConfigSerializer(item["clients"]),
    encryptInternalTraffic: item["encryptInternalTraffic"],
    internalCerts: !item["internalCerts"]
      ? item["internalCerts"]
      : certManagerCertOptionsSerializer(item["internalCerts"]),
  };
}

export function advancedSettingsDeserializer(item: any): AdvancedSettings {
  return {
    clients: !item["clients"] ? item["clients"] : clientConfigDeserializer(item["clients"]),
    encryptInternalTraffic: item["encryptInternalTraffic"],
    internalCerts: !item["internalCerts"]
      ? item["internalCerts"]
      : certManagerCertOptionsDeserializer(item["internalCerts"]),
  };
}

/** The settings of Client Config. */
export interface ClientConfig {
  /** Upper bound of Session Expiry Interval, in seconds. */
  maxSessionExpirySeconds?: number;
  /** Upper bound of Message Expiry Interval, in seconds. */
  maxMessageExpirySeconds?: number;
  /** Max message size for a packet in Bytes. */
  maxPacketSizeBytes?: number;
  /** The limit on the number of queued messages for a subscriber. */
  subscriberQueueLimit?: SubscriberQueueLimit;
  /** Upper bound of Receive Maximum that a client can request in the CONNECT packet. */
  maxReceiveMaximum?: number;
  /** Upper bound of a client's Keep Alive, in seconds. */
  maxKeepAliveSeconds?: number;
}

export function clientConfigSerializer(item: ClientConfig): any {
  return {
    maxSessionExpirySeconds: item["maxSessionExpirySeconds"],
    maxMessageExpirySeconds: item["maxMessageExpirySeconds"],
    maxPacketSizeBytes: item["maxPacketSizeBytes"],
    subscriberQueueLimit: !item["subscriberQueueLimit"]
      ? item["subscriberQueueLimit"]
      : subscriberQueueLimitSerializer(item["subscriberQueueLimit"]),
    maxReceiveMaximum: item["maxReceiveMaximum"],
    maxKeepAliveSeconds: item["maxKeepAliveSeconds"],
  };
}

export function clientConfigDeserializer(item: any): ClientConfig {
  return {
    maxSessionExpirySeconds: item["maxSessionExpirySeconds"],
    maxMessageExpirySeconds: item["maxMessageExpirySeconds"],
    maxPacketSizeBytes: item["maxPacketSizeBytes"],
    subscriberQueueLimit: !item["subscriberQueueLimit"]
      ? item["subscriberQueueLimit"]
      : subscriberQueueLimitDeserializer(item["subscriberQueueLimit"]),
    maxReceiveMaximum: item["maxReceiveMaximum"],
    maxKeepAliveSeconds: item["maxKeepAliveSeconds"],
  };
}

/** The settings of Subscriber Queue Limit. */
export interface SubscriberQueueLimit {
  /** The maximum length of the queue before messages start getting dropped. */
  length?: number;
  /** The strategy to use for dropping messages from the queue. */
  strategy?: SubscriberMessageDropStrategy;
}

export function subscriberQueueLimitSerializer(item: SubscriberQueueLimit): any {
  return { length: item["length"], strategy: item["strategy"] };
}

export function subscriberQueueLimitDeserializer(item: any): SubscriberQueueLimit {
  return {
    length: item["length"],
    strategy: item["strategy"],
  };
}

/** The enum defining strategies for dropping messages from the subscriber queue. */
export enum KnownSubscriberMessageDropStrategy {
  /** Messages are never dropped. */
  None = "None",
  /** The oldest message is dropped. */
  DropOldest = "DropOldest",
}

/**
 * The enum defining strategies for dropping messages from the subscriber queue. \
 * {@link KnownSubscriberMessageDropStrategy} can be used interchangeably with SubscriberMessageDropStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Messages are never dropped. \
 * **DropOldest**: The oldest message is dropped.
 */
export type SubscriberMessageDropStrategy = string;

/** Cert Manager Cert properties */
export interface CertManagerCertOptions {
  /** Lifetime of certificate. Must be specified using a Go time.Duration format (h|m|s). E.g. 240h for 240 hours and 45m for 45 minutes. */
  duration: string;
  /** When to begin renewing certificate. Must be specified using a Go time.Duration format (h|m|s). E.g. 240h for 240 hours and 45m for 45 minutes. */
  renewBefore: string;
  /** Configuration of certificate private key. */
  privateKey: CertManagerPrivateKey;
}

export function certManagerCertOptionsSerializer(item: CertManagerCertOptions): any {
  return {
    duration: item["duration"],
    renewBefore: item["renewBefore"],
    privateKey: certManagerPrivateKeySerializer(item["privateKey"]),
  };
}

export function certManagerCertOptionsDeserializer(item: any): CertManagerCertOptions {
  return {
    duration: item["duration"],
    renewBefore: item["renewBefore"],
    privateKey: certManagerPrivateKeyDeserializer(item["privateKey"]),
  };
}

/** Cardinality properties */
export interface Cardinality {
  /** The backend broker desired properties */
  backendChain: BackendChain;
  /** The frontend desired properties */
  frontend: Frontend;
}

export function cardinalitySerializer(item: Cardinality): any {
  return {
    backendChain: backendChainSerializer(item["backendChain"]),
    frontend: frontendSerializer(item["frontend"]),
  };
}

export function cardinalityDeserializer(item: any): Cardinality {
  return {
    backendChain: backendChainDeserializer(item["backendChain"]),
    frontend: frontendDeserializer(item["frontend"]),
  };
}

/** Desired properties of the backend instances of the broker */
export interface BackendChain {
  /** The desired number of physical backend partitions. */
  partitions: number;
  /** The desired numbers of backend replicas (pods) in a physical partition. */
  redundancyFactor: number;
  /** Number of logical backend workers per replica (pod). */
  workers?: number;
}

export function backendChainSerializer(item: BackendChain): any {
  return {
    partitions: item["partitions"],
    redundancyFactor: item["redundancyFactor"],
    workers: item["workers"],
  };
}

export function backendChainDeserializer(item: any): BackendChain {
  return {
    partitions: item["partitions"],
    redundancyFactor: item["redundancyFactor"],
    workers: item["workers"],
  };
}

/** The desired properties of the frontend instances of the Broker */
export interface Frontend {
  /** The desired number of frontend instances (pods). */
  replicas: number;
  /** Number of logical frontend workers per instance (pod). */
  workers?: number;
}

export function frontendSerializer(item: Frontend): any {
  return { replicas: item["replicas"], workers: item["workers"] };
}

export function frontendDeserializer(item: any): Frontend {
  return {
    replicas: item["replicas"],
    workers: item["workers"],
  };
}

/** Broker Diagnostic Setting properties */
export interface BrokerDiagnostics {
  /** Diagnostic log settings for the resource. */
  logs?: DiagnosticsLogs;
  /** The metrics settings for the resource. */
  metrics?: Metrics;
  /** The self check properties. */
  selfCheck?: SelfCheck;
  /** The trace properties. */
  traces?: Traces;
}

export function brokerDiagnosticsSerializer(item: BrokerDiagnostics): any {
  return {
    logs: !item["logs"] ? item["logs"] : diagnosticsLogsSerializer(item["logs"]),
    metrics: !item["metrics"] ? item["metrics"] : metricsSerializer(item["metrics"]),
    selfCheck: !item["selfCheck"] ? item["selfCheck"] : selfCheckSerializer(item["selfCheck"]),
    traces: !item["traces"] ? item["traces"] : tracesSerializer(item["traces"]),
  };
}

export function brokerDiagnosticsDeserializer(item: any): BrokerDiagnostics {
  return {
    logs: !item["logs"] ? item["logs"] : diagnosticsLogsDeserializer(item["logs"]),
    metrics: !item["metrics"] ? item["metrics"] : metricsDeserializer(item["metrics"]),
    selfCheck: !item["selfCheck"] ? item["selfCheck"] : selfCheckDeserializer(item["selfCheck"]),
    traces: !item["traces"] ? item["traces"] : tracesDeserializer(item["traces"]),
  };
}

/** Broker Diagnostic Self check properties */
export interface SelfCheck {
  /** The toggle to enable/disable self check. */
  mode?: OperationalMode;
  /** The self check interval. */
  intervalSeconds?: number;
  /** The timeout for self check. */
  timeoutSeconds?: number;
}

export function selfCheckSerializer(item: SelfCheck): any {
  return {
    mode: item["mode"],
    intervalSeconds: item["intervalSeconds"],
    timeoutSeconds: item["timeoutSeconds"],
  };
}

export function selfCheckDeserializer(item: any): SelfCheck {
  return {
    mode: item["mode"],
    intervalSeconds: item["intervalSeconds"],
    timeoutSeconds: item["timeoutSeconds"],
  };
}

/** Broker Diagnostic Trace properties */
export interface Traces {
  /** The toggle to enable/disable traces. */
  mode?: OperationalMode;
  /** The cache size in megabytes. */
  cacheSizeMegabytes?: number;
  /** The self tracing properties. */
  selfTracing?: SelfTracing;
  /** The span channel capacity. */
  spanChannelCapacity?: number;
}

export function tracesSerializer(item: Traces): any {
  return {
    mode: item["mode"],
    cacheSizeMegabytes: item["cacheSizeMegabytes"],
    selfTracing: !item["selfTracing"]
      ? item["selfTracing"]
      : selfTracingSerializer(item["selfTracing"]),
    spanChannelCapacity: item["spanChannelCapacity"],
  };
}

export function tracesDeserializer(item: any): Traces {
  return {
    mode: item["mode"],
    cacheSizeMegabytes: item["cacheSizeMegabytes"],
    selfTracing: !item["selfTracing"]
      ? item["selfTracing"]
      : selfTracingDeserializer(item["selfTracing"]),
    spanChannelCapacity: item["spanChannelCapacity"],
  };
}

/** Diagnostic Self tracing properties */
export interface SelfTracing {
  /** The toggle to enable/disable self tracing. */
  mode?: OperationalMode;
  /** The self tracing interval. */
  intervalSeconds?: number;
}

export function selfTracingSerializer(item: SelfTracing): any {
  return { mode: item["mode"], intervalSeconds: item["intervalSeconds"] };
}

export function selfTracingDeserializer(item: any): SelfTracing {
  return {
    mode: item["mode"],
    intervalSeconds: item["intervalSeconds"],
  };
}

/** DiskBackedMessageBuffer properties */
export interface DiskBackedMessageBuffer {
  /** The max size of the message buffer on disk. If a PVC template is specified using one of ephemeralVolumeClaimSpec or persistentVolumeClaimSpec, then this size is used as the request and limit sizes of that template. If neither ephemeralVolumeClaimSpec nor persistentVolumeClaimSpec are specified, then an emptyDir volume is mounted with this size as its limit. See <https://kubernetes.io/docs/concepts/storage/volumes/#emptydir> for details. */
  maxSize: string;
  /** Use the specified persistent volume claim template to mount a "generic ephemeral volume" for the message buffer. See <https://kubernetes.io/docs/concepts/storage/ephemeral-volumes/#generic-ephemeral-volumes> for details. */
  ephemeralVolumeClaimSpec?: VolumeClaimSpec;
  /** Use the specified persistent volume claim template to mount a persistent volume for the message buffer. */
  persistentVolumeClaimSpec?: VolumeClaimSpec;
}

export function diskBackedMessageBufferSerializer(item: DiskBackedMessageBuffer): any {
  return {
    maxSize: item["maxSize"],
    ephemeralVolumeClaimSpec: !item["ephemeralVolumeClaimSpec"]
      ? item["ephemeralVolumeClaimSpec"]
      : volumeClaimSpecSerializer(item["ephemeralVolumeClaimSpec"]),
    persistentVolumeClaimSpec: !item["persistentVolumeClaimSpec"]
      ? item["persistentVolumeClaimSpec"]
      : volumeClaimSpecSerializer(item["persistentVolumeClaimSpec"]),
  };
}

export function diskBackedMessageBufferDeserializer(item: any): DiskBackedMessageBuffer {
  return {
    maxSize: item["maxSize"],
    ephemeralVolumeClaimSpec: !item["ephemeralVolumeClaimSpec"]
      ? item["ephemeralVolumeClaimSpec"]
      : volumeClaimSpecDeserializer(item["ephemeralVolumeClaimSpec"]),
    persistentVolumeClaimSpec: !item["persistentVolumeClaimSpec"]
      ? item["persistentVolumeClaimSpec"]
      : volumeClaimSpecDeserializer(item["persistentVolumeClaimSpec"]),
  };
}

/** VolumeClaimSpec properties */
export interface VolumeClaimSpec {
  /** VolumeName is the binding reference to the PersistentVolume backing this claim. */
  volumeName?: string;
  /** volumeMode defines what type of volume is required by the claim. Value of Filesystem is implied when not included in claim spec. This is a beta feature. */
  volumeMode?: string;
  /** Name of the StorageClass required by the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1 */
  storageClassName?: string;
  /** AccessModes contains the desired access modes the volume should have. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1 */
  accessModes?: string[];
  /** This field can be used to specify either: * An existing VolumeSnapshot object (snapshot.storage.k8s.io/VolumeSnapshot) * An existing PVC (PersistentVolumeClaim) If the provisioner or an external controller can support the specified data source, it will create a new volume based on the contents of the specified data source. If the AnyVolumeDataSource feature gate is enabled, this field will always have the same contents as the DataSourceRef field. */
  dataSource?: LocalKubernetesReference;
  /** Specifies the object from which to populate the volume with data, if a non-empty volume is desired. This may be any local object from a non-empty API group (non core object) or a PersistentVolumeClaim object. When this field is specified, volume binding will only succeed if the type of the specified object matches some installed volume populator or dynamic provisioner. This field will replace the functionality of the DataSource field and as such if both fields are non-empty, they must have the same value. For backwards compatibility, both fields (DataSource and DataSourceRef) will be set to the same value automatically if one of them is empty and the other is non-empty. There are two important differences between DataSource and DataSourceRef: * While DataSource only allows two specific types of objects, DataSourceRef allows any non-core object, as well as PersistentVolumeClaim objects. * While DataSource ignores disallowed values (dropping them), DataSourceRef preserves all values, and generates an error if a disallowed value is specified. (Beta) Using this field requires the AnyVolumeDataSource feature gate to be enabled. */
  dataSourceRef?: KubernetesReference;
  /** Resources represents the minimum resources the volume should have. If RecoverVolumeExpansionFailure feature is enabled users are allowed to specify resource requirements that are lower than previous value but must still be higher than capacity recorded in the status field of the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources */
  resources?: VolumeClaimResourceRequirements;
  /** A label query over volumes to consider for binding. */
  selector?: VolumeClaimSpecSelector;
}

export function volumeClaimSpecSerializer(item: VolumeClaimSpec): any {
  return {
    volumeName: item["volumeName"],
    volumeMode: item["volumeMode"],
    storageClassName: item["storageClassName"],
    accessModes: !item["accessModes"]
      ? item["accessModes"]
      : item["accessModes"].map((p: any) => {
          return p;
        }),
    dataSource: !item["dataSource"]
      ? item["dataSource"]
      : localKubernetesReferenceSerializer(item["dataSource"]),
    dataSourceRef: !item["dataSourceRef"]
      ? item["dataSourceRef"]
      : kubernetesReferenceSerializer(item["dataSourceRef"]),
    resources: !item["resources"]
      ? item["resources"]
      : volumeClaimResourceRequirementsSerializer(item["resources"]),
    selector: !item["selector"]
      ? item["selector"]
      : volumeClaimSpecSelectorSerializer(item["selector"]),
  };
}

export function volumeClaimSpecDeserializer(item: any): VolumeClaimSpec {
  return {
    volumeName: item["volumeName"],
    volumeMode: item["volumeMode"],
    storageClassName: item["storageClassName"],
    accessModes: !item["accessModes"]
      ? item["accessModes"]
      : item["accessModes"].map((p: any) => {
          return p;
        }),
    dataSource: !item["dataSource"]
      ? item["dataSource"]
      : localKubernetesReferenceDeserializer(item["dataSource"]),
    dataSourceRef: !item["dataSourceRef"]
      ? item["dataSourceRef"]
      : kubernetesReferenceDeserializer(item["dataSourceRef"]),
    resources: !item["resources"]
      ? item["resources"]
      : volumeClaimResourceRequirementsDeserializer(item["resources"]),
    selector: !item["selector"]
      ? item["selector"]
      : volumeClaimSpecSelectorDeserializer(item["selector"]),
  };
}

/** Kubernetes reference */
export interface LocalKubernetesReference {
  /** APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required. */
  apiGroup?: string;
  /** Kind is the type of resource being referenced */
  kind: string;
  /** Name is the name of resource being referenced */
  name: string;
}

export function localKubernetesReferenceSerializer(item: LocalKubernetesReference): any {
  return { apiGroup: item["apiGroup"], kind: item["kind"], name: item["name"] };
}

export function localKubernetesReferenceDeserializer(item: any): LocalKubernetesReference {
  return {
    apiGroup: item["apiGroup"],
    kind: item["kind"],
    name: item["name"],
  };
}

/** Kubernetes reference */
export interface KubernetesReference {
  /** APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required. */
  apiGroup?: string;
  /** Kind is the type of resource being referenced */
  kind: string;
  /** Name is the name of resource being referenced */
  name: string;
  /** Namespace is the namespace of the resource being referenced. This field is required when the resource has a namespace. */
  namespace?: string;
}

export function kubernetesReferenceSerializer(item: KubernetesReference): any {
  return {
    apiGroup: item["apiGroup"],
    kind: item["kind"],
    name: item["name"],
    namespace: item["namespace"],
  };
}

export function kubernetesReferenceDeserializer(item: any): KubernetesReference {
  return {
    apiGroup: item["apiGroup"],
    kind: item["kind"],
    name: item["name"],
    namespace: item["namespace"],
  };
}

/** VolumeClaimResourceRequirements properties */
export interface VolumeClaimResourceRequirements {
  /** Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/ */
  limits?: Record<string, string>;
  /** Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/ */
  requests?: Record<string, string>;
}

export function volumeClaimResourceRequirementsSerializer(
  item: VolumeClaimResourceRequirements,
): any {
  return { limits: item["limits"], requests: item["requests"] };
}

export function volumeClaimResourceRequirementsDeserializer(
  item: any,
): VolumeClaimResourceRequirements {
  return {
    limits: item["limits"],
    requests: item["requests"],
  };
}

/** VolumeClaimSpecSelector properties */
export interface VolumeClaimSpecSelector {
  /** MatchExpressions is a list of label selector requirements. The requirements are ANDed. */
  matchExpressions?: VolumeClaimSpecSelectorMatchExpressions[];
  /** MatchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed. */
  matchLabels?: Record<string, string>;
}

export function volumeClaimSpecSelectorSerializer(item: VolumeClaimSpecSelector): any {
  return {
    matchExpressions: !item["matchExpressions"]
      ? item["matchExpressions"]
      : volumeClaimSpecSelectorMatchExpressionsArraySerializer(item["matchExpressions"]),
    matchLabels: item["matchLabels"],
  };
}

export function volumeClaimSpecSelectorDeserializer(item: any): VolumeClaimSpecSelector {
  return {
    matchExpressions: !item["matchExpressions"]
      ? item["matchExpressions"]
      : volumeClaimSpecSelectorMatchExpressionsArrayDeserializer(item["matchExpressions"]),
    matchLabels: item["matchLabels"],
  };
}

/** VolumeClaimSpecSelectorMatchExpressions properties */
export interface VolumeClaimSpecSelectorMatchExpressions {
  /** key is the label key that the selector applies to. */
  key: string;
  /** operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist. */
  operator: OperatorValues;
  /** values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch. */
  values?: string[];
}

export function volumeClaimSpecSelectorMatchExpressionsSerializer(
  item: VolumeClaimSpecSelectorMatchExpressions,
): any {
  return {
    key: item["key"],
    operator: item["operator"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function volumeClaimSpecSelectorMatchExpressionsDeserializer(
  item: any,
): VolumeClaimSpecSelectorMatchExpressions {
  return {
    key: item["key"],
    operator: item["operator"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** Valid operators are In, NotIn, Exists and DoesNotExist. */
export enum KnownOperatorValues {
  /** In operator. */
  In = "In",
  /** NotIn operator. */
  NotIn = "NotIn",
  /** Exists operator. */
  Exists = "Exists",
  /** DoesNotExist operator. */
  DoesNotExist = "DoesNotExist",
}

/**
 * Valid operators are In, NotIn, Exists and DoesNotExist. \
 * {@link KnownOperatorValues} can be used interchangeably with OperatorValues,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **In**: In operator. \
 * **NotIn**: NotIn operator. \
 * **Exists**: Exists operator. \
 * **DoesNotExist**: DoesNotExist operator.
 */
export type OperatorValues = string;

export function volumeClaimSpecSelectorMatchExpressionsArraySerializer(
  result: Array<VolumeClaimSpecSelectorMatchExpressions>,
): any[] {
  return result.map((item) => {
    return volumeClaimSpecSelectorMatchExpressionsSerializer(item);
  });
}

export function volumeClaimSpecSelectorMatchExpressionsArrayDeserializer(
  result: Array<VolumeClaimSpecSelectorMatchExpressions>,
): any[] {
  return result.map((item) => {
    return volumeClaimSpecSelectorMatchExpressionsDeserializer(item);
  });
}

/** GenerateResourceLimits properties */
export interface GenerateResourceLimits {
  /** The toggle to enable/disable cpu resource limits. */
  cpu?: OperationalMode;
}

export function generateResourceLimitsSerializer(item: GenerateResourceLimits): any {
  return { cpu: item["cpu"] };
}

export function generateResourceLimitsDeserializer(item: any): GenerateResourceLimits {
  return {
    cpu: item["cpu"],
  };
}

/** The memory profile settings of the Broker */
export enum KnownBrokerMemoryProfile {
  /** Tiny memory profile. */
  Tiny = "Tiny",
  /** Low memory profile. */
  Low = "Low",
  /** Medium memory profile. */
  Medium = "Medium",
  /** High memory profile. */
  High = "High",
}

/**
 * The memory profile settings of the Broker \
 * {@link KnownBrokerMemoryProfile} can be used interchangeably with BrokerMemoryProfile,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Tiny**: Tiny memory profile. \
 * **Low**: Low memory profile. \
 * **Medium**: Medium memory profile. \
 * **High**: High memory profile.
 */
export type BrokerMemoryProfile = string;

/** The response of a BrokerResource list operation. */
export interface _BrokerResourceListResult {
  /** The BrokerResource items on this page */
  value: BrokerResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _brokerResourceListResultDeserializer(item: any): _BrokerResourceListResult {
  return {
    value: brokerResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function brokerResourceArraySerializer(result: Array<BrokerResource>): any[] {
  return result.map((item) => {
    return brokerResourceSerializer(item);
  });
}

export function brokerResourceArrayDeserializer(result: Array<BrokerResource>): any[] {
  return result.map((item) => {
    return brokerResourceDeserializer(item);
  });
}

/** A Instance resource is a logical container for a set of child resources. */
export interface InstanceResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: InstanceProperties;
  /** Edge location of the resource. */
  extendedLocation: ExtendedLocation;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function instanceResourceSerializer(item: InstanceResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : instancePropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function instanceResourceDeserializer(item: any): InstanceResource {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : instancePropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of the Instance resource. */
export interface InstanceProperties {
  /** Detailed description of the Instance. */
  description?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** The Azure IoT Operations version. */
  readonly version?: string;
  /** The reference to the Schema Registry for this AIO Instance. */
  schemaRegistryRef: SchemaRegistryRef;
}

export function instancePropertiesSerializer(item: InstanceProperties): any {
  return {
    description: item["description"],
    schemaRegistryRef: schemaRegistryRefSerializer(item["schemaRegistryRef"]),
  };
}

export function instancePropertiesDeserializer(item: any): InstanceProperties {
  return {
    description: item["description"],
    provisioningState: !item["provisioningState"]
      ? item["provisioningState"]
      : provisioningStateDeserializer(item["provisioningState"]),
    version: item["version"],
    schemaRegistryRef: schemaRegistryRefDeserializer(item["schemaRegistryRef"]),
  };
}

/** The reference to the Schema Registry for this AIO Instance. */
export interface SchemaRegistryRef {
  /** The resource ID of the Schema Registry. */
  resourceId: string;
}

export function schemaRegistryRefSerializer(item: SchemaRegistryRef): any {
  return { resourceId: item["resourceId"] };
}

export function schemaRegistryRefDeserializer(item: any): SchemaRegistryRef {
  return {
    resourceId: item["resourceId"],
  };
}

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export enum KnownManagedServiceIdentityType {
  /** No managed identity. */
  None = "None",
  /** System assigned managed identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
  /** System and user assigned managed identity. */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned,UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: item["tags"],
    location: item["location"],
  };
}

/** The Instance update model. */
export interface InstancePatchModel {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function instancePatchModelSerializer(item: InstancePatchModel): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** The response of a InstanceResource list operation. */
export interface _InstanceResourceListResult {
  /** The InstanceResource items on this page */
  value: InstanceResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _instanceResourceListResultDeserializer(item: any): _InstanceResourceListResult {
  return {
    value: instanceResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function instanceResourceArraySerializer(result: Array<InstanceResource>): any[] {
  return result.map((item) => {
    return instanceResourceSerializer(item);
  });
}

export function instanceResourceArrayDeserializer(result: Array<InstanceResource>): any[] {
  return result.map((item) => {
    return instanceResourceDeserializer(item);
  });
}

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  readonly display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  actionType?: ActionType;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
  };
}

/** Localized display information for and operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  readonly provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  readonly resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  readonly operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  readonly description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export enum KnownOrigin {
  /** user */
  User = "user",
  /** system */
  System = "system",
  /** user,system */
  UserSystem = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: Indicates the operation is initiated by a user. \
 * **system**: Indicates the operation is initiated by a system. \
 * **user,system**: Indicates the operation is initiated by a user or system.
 */
export type Origin = string;

/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export enum KnownActionType {
  /** Actions are for internal-only APIs. */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Actions are for internal-only APIs.
 */
export type ActionType = string;

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}
