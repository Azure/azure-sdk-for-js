// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  XmlPropertyMetadata,
  XmlPropertyDeserializeMetadata,
  serializeToXml,
  deserializeFromXml,
  deserializeXmlObject,
  XmlSerializedObject,
} from "../../../../static-helpers/serialization/xml-helpers.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The service properties. */
export interface QueueServiceProperties {
  /** The logging properties. */
  logging?: Logging;
  /** The hour metrics properties. */
  hourMetrics?: Metrics;
  /** The minute metrics properties. */
  minuteMetrics?: Metrics;
  /** The CORS properties. */
  cors?: CorsRule[];
}

export function queueServicePropertiesSerializer(item: QueueServiceProperties): any {
  return {
    logging: !item["logging"] ? item["logging"] : loggingSerializer(item["logging"]),
    hourMetrics: !item["hourMetrics"]
      ? item["hourMetrics"]
      : metricsSerializer(item["hourMetrics"]),
    minuteMetrics: !item["minuteMetrics"]
      ? item["minuteMetrics"]
      : metricsSerializer(item["minuteMetrics"]),
    cors: !item["cors"] ? item["cors"] : corsRuleArraySerializer(item["cors"]),
  };
}

export function queueServicePropertiesDeserializer(item: any): QueueServiceProperties {
  return {
    logging: !item["logging"] ? item["logging"] : loggingDeserializer(item["logging"]),
    hourMetrics: !item["hourMetrics"]
      ? item["hourMetrics"]
      : metricsDeserializer(item["hourMetrics"]),
    minuteMetrics: !item["minuteMetrics"]
      ? item["minuteMetrics"]
      : metricsDeserializer(item["minuteMetrics"]),
    cors: !item["cors"] ? item["cors"] : corsRuleArrayDeserializer(item["cors"]),
  };
}

export function queueServicePropertiesXmlSerializer(item: QueueServiceProperties): string {
  const properties: XmlPropertyMetadata[] = [
    {
      propertyName: "logging",
      xmlOptions: { name: "Logging" },
      type: "object",
      serializer: loggingXmlObjectSerializer,
    },
    {
      propertyName: "hourMetrics",
      xmlOptions: { name: "HourMetrics" },
      type: "object",
      serializer: metricsXmlObjectSerializer,
    },
    {
      propertyName: "minuteMetrics",
      xmlOptions: { name: "MinuteMetrics" },
      type: "object",
      serializer: metricsXmlObjectSerializer,
    },
    {
      propertyName: "cors",
      xmlOptions: { name: "Cors", itemsName: "CorsRule" },
      type: "array",
      serializer: corsRuleXmlObjectSerializer,
    },
  ];
  return serializeToXml(item, properties, "StorageServiceProperties");
}

export function queueServicePropertiesXmlDeserializer(xmlString: string): QueueServiceProperties {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "logging",
      xmlOptions: { name: "Logging" },
      type: "object",
      deserializer: loggingXmlObjectDeserializer,
    },
    {
      propertyName: "hourMetrics",
      xmlOptions: { name: "HourMetrics" },
      type: "object",
      deserializer: metricsXmlObjectDeserializer,
    },
    {
      propertyName: "minuteMetrics",
      xmlOptions: { name: "MinuteMetrics" },
      type: "object",
      deserializer: metricsXmlObjectDeserializer,
    },
    {
      propertyName: "cors",
      xmlOptions: { name: "Cors", itemsName: "CorsRule" },
      type: "array",
      deserializer: corsRuleXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<QueueServiceProperties>(
    xmlString,
    properties,
    "StorageServiceProperties",
  );
}

/** Azure Analytics Logging settings. */
export interface Logging {
  /** The version of the logging properties. */
  version: string;
  /** Whether delete operation is logged. */
  delete: boolean;
  /** Whether read operation is logged. */
  read: boolean;
  /** Whether write operation is logged. */
  write: boolean;
  /** The retention policy of the logs. */
  retentionPolicy: RetentionPolicy;
}

export function loggingSerializer(item: Logging): any {
  return {
    version: item["version"],
    delete: item["delete"],
    read: item["read"],
    write: item["write"],
    retentionPolicy: retentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function loggingDeserializer(item: any): Logging {
  return {
    version: item["version"],
    delete: item["delete"],
    read: item["read"],
    write: item["write"],
    retentionPolicy: retentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

export function loggingXmlSerializer(item: Logging): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "version", xmlOptions: { name: "Version" }, type: "primitive" },
    { propertyName: "delete", xmlOptions: { name: "Delete" }, type: "primitive" },
    { propertyName: "read", xmlOptions: { name: "Read" }, type: "primitive" },
    { propertyName: "write", xmlOptions: { name: "Write" }, type: "primitive" },
    {
      propertyName: "retentionPolicy",
      xmlOptions: { name: "RetentionPolicy" },
      type: "object",
      serializer: retentionPolicyXmlObjectSerializer,
    },
  ];
  return serializeToXml(item, properties, "Logging");
}

export function loggingXmlDeserializer(xmlString: string): Logging {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "version",
      xmlOptions: { name: "Version" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "delete",
      xmlOptions: { name: "Delete" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "read",
      xmlOptions: { name: "Read" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "write",
      xmlOptions: { name: "Write" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "retentionPolicy",
      xmlOptions: { name: "RetentionPolicy" },
      type: "object",
      deserializer: retentionPolicyXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<Logging>(xmlString, properties, "Logging");
}

export function loggingXmlObjectSerializer(item: Logging): XmlSerializedObject {
  return {
    Version: item["version"],
    Delete: item["delete"],
    Read: item["read"],
    Write: item["write"],
    RetentionPolicy:
      item["retentionPolicy"] !== undefined
        ? retentionPolicyXmlObjectSerializer(item["retentionPolicy"])
        : undefined,
  };
}

export function loggingXmlObjectDeserializer(xmlObject: Record<string, unknown>): Logging {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "version",
      xmlOptions: { name: "Version" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "delete",
      xmlOptions: { name: "Delete" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "read",
      xmlOptions: { name: "Read" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "write",
      xmlOptions: { name: "Write" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "retentionPolicy",
      xmlOptions: { name: "RetentionPolicy" },
      type: "object",
      deserializer: retentionPolicyXmlObjectDeserializer,
    },
  ];
  return deserializeXmlObject<Logging>(xmlObject, properties);
}

/** The retention policy. */
export interface RetentionPolicy {
  /** Whether to enable the retention policy. */
  enabled: boolean;
  /** The number of days to retain the logs. */
  days?: number;
}

export function retentionPolicySerializer(item: RetentionPolicy): any {
  return { enabled: item["enabled"], days: item["days"] };
}

export function retentionPolicyDeserializer(item: any): RetentionPolicy {
  return {
    enabled: item["enabled"],
    days: item["days"],
  };
}

export function retentionPolicyXmlSerializer(item: RetentionPolicy): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "enabled", xmlOptions: { name: "Enabled" }, type: "primitive" },
    { propertyName: "days", xmlOptions: { name: "Days" }, type: "primitive" },
  ];
  return serializeToXml(item, properties, "RetentionPolicy");
}

export function retentionPolicyXmlDeserializer(xmlString: string): RetentionPolicy {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "enabled",
      xmlOptions: { name: "Enabled" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "days",
      xmlOptions: { name: "Days" },
      type: "primitive",
      primitiveSubtype: "number",
    },
  ];
  return deserializeFromXml<RetentionPolicy>(xmlString, properties, "RetentionPolicy");
}

export function retentionPolicyXmlObjectSerializer(item: RetentionPolicy): XmlSerializedObject {
  return { Enabled: item["enabled"], Days: item["days"] };
}

export function retentionPolicyXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): RetentionPolicy {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "enabled",
      xmlOptions: { name: "Enabled" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "days",
      xmlOptions: { name: "Days" },
      type: "primitive",
      primitiveSubtype: "number",
    },
  ];
  return deserializeXmlObject<RetentionPolicy>(xmlObject, properties);
}

/** The metrics properties. */
export interface Metrics {
  /** The version of the metrics properties. */
  version?: string;
  /** Whether it is enabled. */
  enabled: boolean;
  /** Whether to include API in the metrics. */
  includeApis?: boolean;
  /** The retention policy of the metrics. */
  retentionPolicy?: RetentionPolicy;
}

export function metricsSerializer(item: Metrics): any {
  return {
    version: item["version"],
    enabled: item["enabled"],
    includeApis: item["includeApis"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function metricsDeserializer(item: any): Metrics {
  return {
    version: item["version"],
    enabled: item["enabled"],
    includeApis: item["includeApis"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

export function metricsXmlSerializer(item: Metrics): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "version", xmlOptions: { name: "Version" }, type: "primitive" },
    { propertyName: "enabled", xmlOptions: { name: "Enabled" }, type: "primitive" },
    { propertyName: "includeApis", xmlOptions: { name: "IncludeAPIs" }, type: "primitive" },
    {
      propertyName: "retentionPolicy",
      xmlOptions: { name: "RetentionPolicy" },
      type: "object",
      serializer: retentionPolicyXmlObjectSerializer,
    },
  ];
  return serializeToXml(item, properties, "Metrics");
}

export function metricsXmlDeserializer(xmlString: string): Metrics {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "version",
      xmlOptions: { name: "Version" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "enabled",
      xmlOptions: { name: "Enabled" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "includeApis",
      xmlOptions: { name: "IncludeAPIs" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "retentionPolicy",
      xmlOptions: { name: "RetentionPolicy" },
      type: "object",
      deserializer: retentionPolicyXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<Metrics>(xmlString, properties, "Metrics");
}

export function metricsXmlObjectSerializer(item: Metrics): XmlSerializedObject {
  return {
    Version: item["version"],
    Enabled: item["enabled"],
    IncludeAPIs: item["includeApis"],
    RetentionPolicy:
      item["retentionPolicy"] !== undefined
        ? retentionPolicyXmlObjectSerializer(item["retentionPolicy"])
        : undefined,
  };
}

export function metricsXmlObjectDeserializer(xmlObject: Record<string, unknown>): Metrics {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "version",
      xmlOptions: { name: "Version" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "enabled",
      xmlOptions: { name: "Enabled" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "includeApis",
      xmlOptions: { name: "IncludeAPIs" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "retentionPolicy",
      xmlOptions: { name: "RetentionPolicy" },
      type: "object",
      deserializer: retentionPolicyXmlObjectDeserializer,
    },
  ];
  return deserializeXmlObject<Metrics>(xmlObject, properties);
}

export function corsRuleArraySerializer(result: Array<CorsRule>): any[] {
  return result.map((item) => {
    return corsRuleSerializer(item);
  });
}

export function corsRuleArrayDeserializer(result: Array<CorsRule>): any[] {
  return result.map((item) => {
    return corsRuleDeserializer(item);
  });
}

/** CORS is an HTTP feature that enables a web application running under one domain to access resources in another domain. Web browsers implement a security restriction known as same-origin policy that prevents a web page from calling APIs in a different domain; CORS provides a secure way to allow one domain (the origin domain) to call APIs in another domain */
export interface CorsRule {
  /** The allowed origins. */
  allowedOrigins: string;
  /** The allowed methods. */
  allowedMethods: string;
  /** The allowed headers. */
  allowedHeaders: string;
  /** The exposed headers. */
  exposedHeaders: string;
  /** The maximum age in seconds. */
  maxAgeInSeconds: number;
}

export function corsRuleSerializer(item: CorsRule): any {
  return {
    allowedOrigins: item["allowedOrigins"],
    allowedMethods: item["allowedMethods"],
    allowedHeaders: item["allowedHeaders"],
    exposedHeaders: item["exposedHeaders"],
    maxAgeInSeconds: item["maxAgeInSeconds"],
  };
}

export function corsRuleDeserializer(item: any): CorsRule {
  return {
    allowedOrigins: item["allowedOrigins"],
    allowedMethods: item["allowedMethods"],
    allowedHeaders: item["allowedHeaders"],
    exposedHeaders: item["exposedHeaders"],
    maxAgeInSeconds: item["maxAgeInSeconds"],
  };
}

export function corsRuleXmlSerializer(item: CorsRule): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "allowedOrigins", xmlOptions: { name: "AllowedOrigins" }, type: "primitive" },
    { propertyName: "allowedMethods", xmlOptions: { name: "AllowedMethods" }, type: "primitive" },
    { propertyName: "allowedHeaders", xmlOptions: { name: "AllowedHeaders" }, type: "primitive" },
    { propertyName: "exposedHeaders", xmlOptions: { name: "ExposedHeaders" }, type: "primitive" },
    { propertyName: "maxAgeInSeconds", xmlOptions: { name: "MaxAgeInSeconds" }, type: "primitive" },
  ];
  return serializeToXml(item, properties, "CorsRule");
}

export function corsRuleXmlDeserializer(xmlString: string): CorsRule {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "allowedOrigins",
      xmlOptions: { name: "AllowedOrigins" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "allowedMethods",
      xmlOptions: { name: "AllowedMethods" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "allowedHeaders",
      xmlOptions: { name: "AllowedHeaders" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "exposedHeaders",
      xmlOptions: { name: "ExposedHeaders" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "maxAgeInSeconds",
      xmlOptions: { name: "MaxAgeInSeconds" },
      type: "primitive",
      primitiveSubtype: "number",
    },
  ];
  return deserializeFromXml<CorsRule>(xmlString, properties, "CorsRule");
}

export function corsRuleXmlObjectSerializer(item: CorsRule): XmlSerializedObject {
  return {
    AllowedOrigins: item["allowedOrigins"],
    AllowedMethods: item["allowedMethods"],
    AllowedHeaders: item["allowedHeaders"],
    ExposedHeaders: item["exposedHeaders"],
    MaxAgeInSeconds: item["maxAgeInSeconds"],
  };
}

export function corsRuleXmlObjectDeserializer(xmlObject: Record<string, unknown>): CorsRule {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "allowedOrigins",
      xmlOptions: { name: "AllowedOrigins" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "allowedMethods",
      xmlOptions: { name: "AllowedMethods" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "allowedHeaders",
      xmlOptions: { name: "AllowedHeaders" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "exposedHeaders",
      xmlOptions: { name: "ExposedHeaders" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "maxAgeInSeconds",
      xmlOptions: { name: "MaxAgeInSeconds" },
      type: "primitive",
      primitiveSubtype: "number",
    },
  ];
  return deserializeXmlObject<CorsRule>(xmlObject, properties);
}

/** The error response. */
export interface StorageError {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
  /** Copy source status code */
  copySourceStatusCode?: number;
  /** Copy source error code */
  copySourceErrorCode?: string;
  /** Copy source error message */
  copySourceErrorMessage?: string;
}

export function storageErrorDeserializer(item: any): StorageError {
  return {
    code: item["code"],
    message: item["message"],
    copySourceStatusCode: item["copySourceStatusCode"],
    copySourceErrorCode: item["copySourceErrorCode"],
    copySourceErrorMessage: item["copySourceErrorMessage"],
  };
}

export function storageErrorXmlDeserializer(xmlString: string): StorageError {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "code",
      xmlOptions: { name: "Code" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "message",
      xmlOptions: { name: "Message" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "copySourceStatusCode",
      xmlOptions: { name: "CopySourceStatusCode" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "copySourceErrorCode",
      xmlOptions: { name: "CopySourceErrorCode" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "copySourceErrorMessage",
      xmlOptions: { name: "CopySourceErrorMessage" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<StorageError>(
    xmlString,
    properties,
    "StorageError",
    undefined,
    undefined,
    {
      propertyName: "additionalProperties",
      excludeNames: [
        "Code",
        "Message",
        "CopySourceStatusCode",
        "CopySourceErrorCode",
        "CopySourceErrorMessage",
      ],
    },
  );
}

/** Stats for the storage service. */
export interface QueueServiceStats {
  /** The geo replication stats. */
  geoReplication?: GeoReplication;
}

export function queueServiceStatsDeserializer(item: any): QueueServiceStats {
  return {
    geoReplication: !item["geoReplication"]
      ? item["geoReplication"]
      : geoReplicationDeserializer(item["geoReplication"]),
  };
}

export function queueServiceStatsXmlDeserializer(xmlString: string): QueueServiceStats {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "geoReplication",
      xmlOptions: { name: "GeoReplication" },
      type: "object",
      deserializer: geoReplicationXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<QueueServiceStats>(xmlString, properties, "QueueServiceStats");
}

/** Geo-Replication information for the Secondary Storage Service */
export interface GeoReplication {
  /** The status of the secondary location */
  status: GeoReplicationStatusType;
  /** A GMT date/time value, to the second. All primary writes preceding this value are guaranteed to be available for read operations at the secondary. Primary writes after this point in time may or may not be available for reads. */
  lastSyncTime: Date;
}

export function geoReplicationDeserializer(item: any): GeoReplication {
  return {
    status: item["status"],
    lastSyncTime: new Date(item["lastSyncTime"]),
  };
}

export function geoReplicationXmlDeserializer(xmlString: string): GeoReplication {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "status",
      xmlOptions: { name: "Status" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "lastSyncTime",
      xmlOptions: { name: "LastSyncTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
  ];
  return deserializeFromXml<GeoReplication>(xmlString, properties, "GeoReplication");
}

export function geoReplicationXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): GeoReplication {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "status",
      xmlOptions: { name: "Status" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "lastSyncTime",
      xmlOptions: { name: "LastSyncTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
  ];
  return deserializeXmlObject<GeoReplication>(xmlObject, properties);
}

/** The geo replication status. */
export type GeoReplicationStatusType = "live" | "bootstrap" | "unavailable";

/** Key information for user delegation key */
export interface KeyInfo {
  /** The date-time the key is active in ISO 8601 UTC time */
  start?: Date;
  /** The date-time the key expires in ISO 8601 UTC time */
  expiry: Date;
  /** The delegated user tenant id in Azure AD */
  delegatedUserTid?: string;
}

export function keyInfoSerializer(item: KeyInfo): any {
  return {
    start: !item["start"] ? item["start"] : item["start"].toISOString(),
    expiry: item["expiry"].toISOString(),
    delegatedUserTid: item["delegatedUserTid"],
  };
}

export function keyInfoXmlSerializer(item: KeyInfo): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "start", xmlOptions: { name: "Start" }, type: "date", dateEncoding: "rfc3339" },
    {
      propertyName: "expiry",
      xmlOptions: { name: "Expiry" },
      type: "date",
      dateEncoding: "rfc3339",
    },
    {
      propertyName: "delegatedUserTid",
      xmlOptions: { name: "DelegatedUserTid" },
      type: "primitive",
    },
  ];
  return serializeToXml(item, properties, "KeyInfo");
}

/** A user delegation key */
export interface UserDelegationKey {
  /** The Azure Active Directory object ID in GUID format. */
  signedOid: string;
  /** The Azure Active Directory tenant ID in GUID format */
  signedTid: string;
  /** The date-time the key is active */
  signedStart: Date;
  /** The date-time the key expires */
  signedExpiry: Date;
  /** The service that created the key */
  signedService: string;
  /** The version of the service that created the key */
  signedVersion: string;
  /** The delegated user tenant id in Azure AD. Return if DelegatedUserTid is specified. */
  signedDelegatedUserTid?: string;
  /** The key as a base64 string */
  value: string;
}

export function userDelegationKeyDeserializer(item: any): UserDelegationKey {
  return {
    signedOid: item["signedOid"],
    signedTid: item["signedTid"],
    signedStart: new Date(item["signedStart"]),
    signedExpiry: new Date(item["signedExpiry"]),
    signedService: item["signedService"],
    signedVersion: item["signedVersion"],
    signedDelegatedUserTid: item["signedDelegatedUserTid"],
    value: item["value"],
  };
}

export function userDelegationKeyXmlDeserializer(xmlString: string): UserDelegationKey {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "signedOid",
      xmlOptions: { name: "SignedOid" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "signedTid",
      xmlOptions: { name: "SignedTid" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "signedStart",
      xmlOptions: { name: "SignedStart" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "signedExpiry",
      xmlOptions: { name: "SignedExpiry" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "signedService",
      xmlOptions: { name: "SignedService" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "signedVersion",
      xmlOptions: { name: "SignedVersion" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "signedDelegatedUserTid",
      xmlOptions: { name: "SignedDelegatedUserTid" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "value",
      xmlOptions: { name: "Value" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<UserDelegationKey>(xmlString, properties, "UserDelegationKey");
}

/** The list queue segment response */
export interface _ListQueuesResponse {
  /** The service endpoint. */
  serviceEndpoint: string;
  /** The prefix of the queues. */
  prefix: string;
  /** The marker of the queues. */
  marker?: string;
  /** The max results of the queues. */
  maxResults: number;
  /** The queue segment. */
  queueItems?: QueueItem[];
  /** The next marker of the queues. */
  nextMarker: string;
}

export function _listQueuesResponseDeserializer(item: any): _ListQueuesResponse {
  return {
    serviceEndpoint: item["serviceEndpoint"],
    prefix: item["prefix"],
    marker: item["marker"],
    maxResults: item["maxResults"],
    queueItems: !item["queueItems"]
      ? item["queueItems"]
      : queueItemArrayDeserializer(item["queueItems"]),
    nextMarker: item["nextMarker"],
  };
}

export function _listQueuesResponseXmlDeserializer(xmlString: string): _ListQueuesResponse {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "serviceEndpoint",
      xmlOptions: { name: "ServiceEndpoint", attribute: true },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "prefix",
      xmlOptions: { name: "Prefix" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "marker",
      xmlOptions: { name: "Marker" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "maxResults",
      xmlOptions: { name: "MaxResults" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "queueItems",
      xmlOptions: { name: "Queues", itemsName: "Queue" },
      type: "array",
      deserializer: queueItemXmlObjectDeserializer,
    },
    {
      propertyName: "nextMarker",
      xmlOptions: { name: "NextMarker" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<_ListQueuesResponse>(xmlString, properties, "EnumerationResults");
}

export function queueItemArrayDeserializer(result: Array<QueueItem>): any[] {
  return result.map((item) => {
    return queueItemDeserializer(item);
  });
}

/** An Azure Storage Queue. */
export interface QueueItem {
  /** The name of the queue. */
  name: string;
  /** The metadata of the container. */
  metadata?: Record<string, string>;
}

export function queueItemDeserializer(item: any): QueueItem {
  return {
    name: item["name"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function queueItemXmlDeserializer(xmlString: string): QueueItem {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "Name" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    { propertyName: "metadata", xmlOptions: { name: "Metadata" }, type: "dict" },
  ];
  return deserializeFromXml<QueueItem>(xmlString, properties, "Queue");
}

export function queueItemXmlObjectDeserializer(xmlObject: Record<string, unknown>): QueueItem {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "Name" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    { propertyName: "metadata", xmlOptions: { name: "Metadata" }, type: "dict" },
  ];
  return deserializeXmlObject<QueueItem>(xmlObject, properties);
}

/** Represents an array of signed identifiers */
export interface SignedIdentifiers {
  /** The list of signed identifiers. */
  items: SignedIdentifier[];
}

export function signedIdentifiersSerializer(item: SignedIdentifiers): any {
  return { items: signedIdentifierArraySerializer(item["items"]) };
}

export function signedIdentifiersDeserializer(item: any): SignedIdentifiers {
  return {
    items: signedIdentifierArrayDeserializer(item["items"]),
  };
}

export function signedIdentifiersXmlSerializer(item: SignedIdentifiers): string {
  const properties: XmlPropertyMetadata[] = [
    {
      propertyName: "items",
      xmlOptions: { name: "SignedIdentifier", unwrapped: true, itemsName: "SignedIdentifier" },
      type: "array",
      serializer: signedIdentifierXmlObjectSerializer,
    },
  ];
  return serializeToXml(item, properties, "SignedIdentifiers");
}

export function signedIdentifiersXmlDeserializer(xmlString: string): SignedIdentifiers {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "items",
      xmlOptions: { name: "SignedIdentifier", unwrapped: true, itemsName: "SignedIdentifier" },
      type: "array",
      deserializer: signedIdentifierXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<SignedIdentifiers>(xmlString, properties, "SignedIdentifiers");
}

export function signedIdentifierArraySerializer(result: Array<SignedIdentifier>): any[] {
  return result.map((item) => {
    return signedIdentifierSerializer(item);
  });
}

export function signedIdentifierArrayDeserializer(result: Array<SignedIdentifier>): any[] {
  return result.map((item) => {
    return signedIdentifierDeserializer(item);
  });
}

/** The signed identifier. */
export interface SignedIdentifier {
  /** The unique ID for the signed identifier. */
  id: string;
  /** The access policy for the signed identifier. */
  accessPolicy: AccessPolicy;
}

export function signedIdentifierSerializer(item: SignedIdentifier): any {
  return { id: item["id"], accessPolicy: accessPolicySerializer(item["accessPolicy"]) };
}

export function signedIdentifierDeserializer(item: any): SignedIdentifier {
  return {
    id: item["id"],
    accessPolicy: accessPolicyDeserializer(item["accessPolicy"]),
  };
}

export function signedIdentifierXmlSerializer(item: SignedIdentifier): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "id", xmlOptions: { name: "Id" }, type: "primitive" },
    {
      propertyName: "accessPolicy",
      xmlOptions: { name: "AccessPolicy" },
      type: "object",
      serializer: accessPolicyXmlObjectSerializer,
    },
  ];
  return serializeToXml(item, properties, "SignedIdentifier");
}

export function signedIdentifierXmlDeserializer(xmlString: string): SignedIdentifier {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "id",
      xmlOptions: { name: "Id" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "accessPolicy",
      xmlOptions: { name: "AccessPolicy" },
      type: "object",
      deserializer: accessPolicyXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<SignedIdentifier>(xmlString, properties, "SignedIdentifier");
}

export function signedIdentifierXmlObjectSerializer(item: SignedIdentifier): XmlSerializedObject {
  return {
    Id: item["id"],
    AccessPolicy:
      item["accessPolicy"] !== undefined
        ? accessPolicyXmlObjectSerializer(item["accessPolicy"])
        : undefined,
  };
}

export function signedIdentifierXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): SignedIdentifier {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "id",
      xmlOptions: { name: "Id" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "accessPolicy",
      xmlOptions: { name: "AccessPolicy" },
      type: "object",
      deserializer: accessPolicyXmlObjectDeserializer,
    },
  ];
  return deserializeXmlObject<SignedIdentifier>(xmlObject, properties);
}

/** Represents an access policy. */
export interface AccessPolicy {
  /** The date-time the policy is active. */
  start?: Date;
  /** The date-time the policy expires. */
  expiry?: Date;
  /** The permissions for acl the policy. */
  permission?: string;
}

export function accessPolicySerializer(item: AccessPolicy): any {
  return {
    start: !item["start"] ? item["start"] : item["start"].toISOString(),
    expiry: !item["expiry"] ? item["expiry"] : item["expiry"].toISOString(),
    permission: item["permission"],
  };
}

export function accessPolicyDeserializer(item: any): AccessPolicy {
  return {
    start: !item["start"] ? item["start"] : new Date(item["start"]),
    expiry: !item["expiry"] ? item["expiry"] : new Date(item["expiry"]),
    permission: item["permission"],
  };
}

export function accessPolicyXmlSerializer(item: AccessPolicy): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "start", xmlOptions: { name: "Start" }, type: "date", dateEncoding: "rfc3339" },
    {
      propertyName: "expiry",
      xmlOptions: { name: "Expiry" },
      type: "date",
      dateEncoding: "rfc3339",
    },
    { propertyName: "permission", xmlOptions: { name: "Permission" }, type: "primitive" },
  ];
  return serializeToXml(item, properties, "AccessPolicy");
}

export function accessPolicyXmlDeserializer(xmlString: string): AccessPolicy {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "start", xmlOptions: { name: "Start" }, type: "date", dateEncoding: "rfc3339" },
    {
      propertyName: "expiry",
      xmlOptions: { name: "Expiry" },
      type: "date",
      dateEncoding: "rfc3339",
    },
    {
      propertyName: "permission",
      xmlOptions: { name: "Permission" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<AccessPolicy>(xmlString, properties, "AccessPolicy");
}

export function accessPolicyXmlObjectSerializer(item: AccessPolicy): XmlSerializedObject {
  return {
    Start: item["start"] !== undefined ? item["start"].toISOString() : undefined,
    Expiry: item["expiry"] !== undefined ? item["expiry"].toISOString() : undefined,
    Permission: item["permission"],
  };
}

export function accessPolicyXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): AccessPolicy {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "start", xmlOptions: { name: "Start" }, type: "date", dateEncoding: "rfc3339" },
    {
      propertyName: "expiry",
      xmlOptions: { name: "Expiry" },
      type: "date",
      dateEncoding: "rfc3339",
    },
    {
      propertyName: "permission",
      xmlOptions: { name: "Permission" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeXmlObject<AccessPolicy>(xmlObject, properties);
}

/** List wrapper for DequeuedMessageItem array */
export interface ListOfReceivedMessage {
  /** The list of dequeued messages. */
  items: ReceivedMessage[];
}

export function listOfReceivedMessageDeserializer(item: any): ListOfReceivedMessage {
  return {
    items: receivedMessageArrayDeserializer(item["items"]),
  };
}

export function listOfReceivedMessageXmlDeserializer(xmlString: string): ListOfReceivedMessage {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "items",
      xmlOptions: { name: "QueueMessage", unwrapped: true, itemsName: "QueueMessage" },
      type: "array",
      deserializer: receivedMessageXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<ListOfReceivedMessage>(xmlString, properties, "QueueMessagesList");
}

export function receivedMessageArrayDeserializer(result: Array<ReceivedMessage>): any[] {
  return result.map((item) => {
    return receivedMessageDeserializer(item);
  });
}

/**
 * The object returned in the QueueMessageList array when calling Get Messages on
 * a Queue.
 */
export interface ReceivedMessage {
  /** The Id of the Message. */
  messageId: string;
  /** The time the Message was inserted into the Queue. */
  insertionTime: Date;
  /** The time that the Message will expire and be automatically deleted. */
  expirationTime: Date;
  /**
   * This value is required to delete the Message. If deletion fails using this
   * PopReceipt then the message has been dequeued by another client.
   */
  popReceipt: string;
  /** The time that the message will again become visible in the Queue. */
  timeNextVisible: Date;
  /** The number of times the message has been dequeued. */
  dequeueCount: number;
  /** The content of the message */
  messageText: string;
}

export function receivedMessageDeserializer(item: any): ReceivedMessage {
  return {
    messageId: item["messageId"],
    insertionTime: new Date(item["insertionTime"]),
    expirationTime: new Date(item["expirationTime"]),
    popReceipt: item["popReceipt"],
    timeNextVisible: new Date(item["timeNextVisible"]),
    dequeueCount: item["dequeueCount"],
    messageText: item["messageText"],
  };
}

export function receivedMessageXmlDeserializer(xmlString: string): ReceivedMessage {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "messageId",
      xmlOptions: { name: "MessageId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "insertionTime",
      xmlOptions: { name: "InsertionTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "expirationTime",
      xmlOptions: { name: "ExpirationTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "popReceipt",
      xmlOptions: { name: "PopReceipt" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "timeNextVisible",
      xmlOptions: { name: "TimeNextVisible" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "dequeueCount",
      xmlOptions: { name: "DequeueCount" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "messageText",
      xmlOptions: { name: "MessageText" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<ReceivedMessage>(xmlString, properties, "ReceivedMessage");
}

export function receivedMessageXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): ReceivedMessage {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "messageId",
      xmlOptions: { name: "MessageId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "insertionTime",
      xmlOptions: { name: "InsertionTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "expirationTime",
      xmlOptions: { name: "ExpirationTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "popReceipt",
      xmlOptions: { name: "PopReceipt" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "timeNextVisible",
      xmlOptions: { name: "TimeNextVisible" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "dequeueCount",
      xmlOptions: { name: "DequeueCount" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "messageText",
      xmlOptions: { name: "MessageText" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeXmlObject<ReceivedMessage>(xmlObject, properties);
}

/** A Message object which can be stored in a Queue */
export interface QueueMessage {
  /** The content of the message */
  messageText: string;
}

export function queueMessageSerializer(item: QueueMessage): any {
  return { messageText: item["messageText"] };
}

export function queueMessageXmlSerializer(item: QueueMessage): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "messageText", xmlOptions: { name: "MessageText" }, type: "primitive" },
  ];
  return serializeToXml(item, properties, "QueueMessage");
}

/** List wrapper for EnqueuedMessage array */
export interface ListOfSentMessage {
  /** The list of enqueued messages. */
  items: SentMessage[];
}

export function listOfSentMessageDeserializer(item: any): ListOfSentMessage {
  return {
    items: sentMessageArrayDeserializer(item["items"]),
  };
}

export function listOfSentMessageXmlDeserializer(xmlString: string): ListOfSentMessage {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "items",
      xmlOptions: { name: "QueueMessage", unwrapped: true, itemsName: "QueueMessage" },
      type: "array",
      deserializer: sentMessageXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<ListOfSentMessage>(xmlString, properties, "QueueMessagesList");
}

export function sentMessageArrayDeserializer(result: Array<SentMessage>): any[] {
  return result.map((item) => {
    return sentMessageDeserializer(item);
  });
}

/**
 * The object returned in the QueueMessageList array when calling Put Message on a
 * Queue
 */
export interface SentMessage {
  /** The Id of the Message. */
  messageId: string;
  /** The time the Message was inserted into the Queue. */
  insertionTime: Date;
  /** The time that the Message will expire and be automatically deleted. */
  expirationTime: Date;
  /**
   * This value is required to delete the Message. If deletion fails using this
   * PopReceipt then the message has been dequeued by another client.
   */
  popReceipt: string;
  /** The time that the message will again become visible in the Queue. */
  timeNextVisible: Date;
}

export function sentMessageDeserializer(item: any): SentMessage {
  return {
    messageId: item["messageId"],
    insertionTime: new Date(item["insertionTime"]),
    expirationTime: new Date(item["expirationTime"]),
    popReceipt: item["popReceipt"],
    timeNextVisible: new Date(item["timeNextVisible"]),
  };
}

export function sentMessageXmlDeserializer(xmlString: string): SentMessage {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "messageId",
      xmlOptions: { name: "MessageId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "insertionTime",
      xmlOptions: { name: "InsertionTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "expirationTime",
      xmlOptions: { name: "ExpirationTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "popReceipt",
      xmlOptions: { name: "PopReceipt" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "timeNextVisible",
      xmlOptions: { name: "TimeNextVisible" },
      type: "date",
      dateEncoding: "rfc7231",
    },
  ];
  return deserializeFromXml<SentMessage>(xmlString, properties, "SentMessage");
}

export function sentMessageXmlObjectDeserializer(xmlObject: Record<string, unknown>): SentMessage {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "messageId",
      xmlOptions: { name: "MessageId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "insertionTime",
      xmlOptions: { name: "InsertionTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "expirationTime",
      xmlOptions: { name: "ExpirationTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "popReceipt",
      xmlOptions: { name: "PopReceipt" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "timeNextVisible",
      xmlOptions: { name: "TimeNextVisible" },
      type: "date",
      dateEncoding: "rfc7231",
    },
  ];
  return deserializeXmlObject<SentMessage>(xmlObject, properties);
}

/** List wrapper for PeekedMessageItem array */
export interface ListOfPeekedMessage {
  /** The list of peeked messages. */
  items: PeekedMessage[];
}

export function listOfPeekedMessageDeserializer(item: any): ListOfPeekedMessage {
  return {
    items: peekedMessageArrayDeserializer(item["items"]),
  };
}

export function listOfPeekedMessageXmlDeserializer(xmlString: string): ListOfPeekedMessage {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "items",
      xmlOptions: { name: "QueueMessage", unwrapped: true, itemsName: "QueueMessage" },
      type: "array",
      deserializer: peekedMessageXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<ListOfPeekedMessage>(xmlString, properties, "QueueMessagesList");
}

export function peekedMessageArrayDeserializer(result: Array<PeekedMessage>): any[] {
  return result.map((item) => {
    return peekedMessageDeserializer(item);
  });
}

/**
 * The object returned in the QueueMessageList array when calling Peek Messages on
 * a Queue
 */
export interface PeekedMessage {
  /** The Id of the Message. */
  messageId: string;
  /** The time the Message was inserted into the Queue. */
  insertionTime: Date;
  /** The time that the Message will expire and be automatically deleted. */
  expirationTime: Date;
  /** The number of times the message has been dequeued. */
  dequeueCount: number;
  /** The content of the Message. */
  messageText: string;
}

export function peekedMessageDeserializer(item: any): PeekedMessage {
  return {
    messageId: item["messageId"],
    insertionTime: new Date(item["insertionTime"]),
    expirationTime: new Date(item["expirationTime"]),
    dequeueCount: item["dequeueCount"],
    messageText: item["messageText"],
  };
}

export function peekedMessageXmlDeserializer(xmlString: string): PeekedMessage {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "messageId",
      xmlOptions: { name: "MessageId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "insertionTime",
      xmlOptions: { name: "InsertionTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "expirationTime",
      xmlOptions: { name: "ExpirationTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "dequeueCount",
      xmlOptions: { name: "DequeueCount" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "messageText",
      xmlOptions: { name: "MessageText" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<PeekedMessage>(xmlString, properties, "PeekedMessage");
}

export function peekedMessageXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): PeekedMessage {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "messageId",
      xmlOptions: { name: "MessageId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "insertionTime",
      xmlOptions: { name: "InsertionTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "expirationTime",
      xmlOptions: { name: "ExpirationTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "dequeueCount",
      xmlOptions: { name: "DequeueCount" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "messageText",
      xmlOptions: { name: "MessageText" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeXmlObject<PeekedMessage>(xmlObject, properties);
}

/** Include this parameter to specify that the queue's metadata be returned as part of the response body. */
export type ListQueuesIncludeType = "metadata";

/** The Azure.Storage.Queue service versions. */
export enum KnownVersions {
  /** The 2026-04-06 version of the Azure.Storage.Queue service. */
  V20260406 = "2026-04-06",
}
