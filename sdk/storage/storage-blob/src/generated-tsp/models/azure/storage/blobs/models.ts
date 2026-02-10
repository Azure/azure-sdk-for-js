// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  FileContents,
  createFilePartDescriptor,
} from "../../../../static-helpers/multipartHelpers.js";
import { serializeRecord } from "../../../../static-helpers/serialization/serialize-record.js";
import {
  XmlPropertyMetadata,
  XmlPropertyDeserializeMetadata,
  serializeToXml,
  deserializeFromXml,
  deserializeXmlObject,
} from "../../../../static-helpers/serialization/xml-helpers.js";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The service properties. */
export interface BlobServiceProperties {
  /** The logging properties. */
  blobAnalyticsLogging?: Logging;
  /** The hour metrics properties. */
  hourMetrics?: Metrics;
  /** The minute metrics properties. */
  minuteMetrics?: Metrics;
  /** The CORS properties. */
  cors?: CorsRule[];
  /** The default service version. */
  defaultServiceVersion?: string;
  /** The delete retention policy. */
  deleteRetentionPolicy?: RetentionPolicy;
  /** The static website properties. */
  staticWebsite?: StaticWebsite;
}

export function blobServicePropertiesSerializer(item: BlobServiceProperties): any {
  return {
    blobAnalyticsLogging: !item["blobAnalyticsLogging"]
      ? item["blobAnalyticsLogging"]
      : loggingSerializer(item["blobAnalyticsLogging"]),
    hourMetrics: !item["hourMetrics"]
      ? item["hourMetrics"]
      : metricsSerializer(item["hourMetrics"]),
    minuteMetrics: !item["minuteMetrics"]
      ? item["minuteMetrics"]
      : metricsSerializer(item["minuteMetrics"]),
    cors: !item["cors"] ? item["cors"] : corsRuleArraySerializer(item["cors"]),
    defaultServiceVersion: item["defaultServiceVersion"],
    deleteRetentionPolicy: !item["deleteRetentionPolicy"]
      ? item["deleteRetentionPolicy"]
      : retentionPolicySerializer(item["deleteRetentionPolicy"]),
    staticWebsite: !item["staticWebsite"]
      ? item["staticWebsite"]
      : staticWebsiteSerializer(item["staticWebsite"]),
  };
}

export function blobServicePropertiesDeserializer(item: any): BlobServiceProperties {
  return {
    blobAnalyticsLogging: !item["blobAnalyticsLogging"]
      ? item["blobAnalyticsLogging"]
      : loggingDeserializer(item["blobAnalyticsLogging"]),
    hourMetrics: !item["hourMetrics"]
      ? item["hourMetrics"]
      : metricsDeserializer(item["hourMetrics"]),
    minuteMetrics: !item["minuteMetrics"]
      ? item["minuteMetrics"]
      : metricsDeserializer(item["minuteMetrics"]),
    cors: !item["cors"] ? item["cors"] : corsRuleArrayDeserializer(item["cors"]),
    defaultServiceVersion: item["defaultServiceVersion"],
    deleteRetentionPolicy: !item["deleteRetentionPolicy"]
      ? item["deleteRetentionPolicy"]
      : retentionPolicyDeserializer(item["deleteRetentionPolicy"]),
    staticWebsite: !item["staticWebsite"]
      ? item["staticWebsite"]
      : staticWebsiteDeserializer(item["staticWebsite"]),
  };
}

export function blobServicePropertiesXmlSerializer(item: BlobServiceProperties): string {
  const properties: XmlPropertyMetadata[] = [
    {
      propertyName: "blobAnalyticsLogging",
      xmlOptions: { name: "Logging" },
      type: "object",
      serializer: loggingSerializer,
    },
    {
      propertyName: "hourMetrics",
      xmlOptions: { name: "HourMetrics" },
      type: "object",
      serializer: metricsSerializer,
    },
    {
      propertyName: "minuteMetrics",
      xmlOptions: { name: "MinuteMetrics" },
      type: "object",
      serializer: metricsSerializer,
    },
    {
      propertyName: "cors",
      xmlOptions: { name: "Cors", itemsName: "CorsRule" },
      type: "array",
      serializer: corsRuleSerializer,
    },
    {
      propertyName: "defaultServiceVersion",
      xmlOptions: { name: "DefaultServiceVersion" },
      type: "primitive",
    },
    {
      propertyName: "deleteRetentionPolicy",
      xmlOptions: { name: "DeleteRetentionPolicy" },
      type: "object",
      serializer: retentionPolicySerializer,
    },
    {
      propertyName: "staticWebsite",
      xmlOptions: { name: "StaticWebsite" },
      type: "object",
      serializer: staticWebsiteSerializer,
    },
  ];
  return serializeToXml(item, properties, "StorageServiceProperties");
}

export function blobServicePropertiesXmlDeserializer(xmlString: string): BlobServiceProperties {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "blobAnalyticsLogging",
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
    {
      propertyName: "defaultServiceVersion",
      xmlOptions: { name: "DefaultServiceVersion" },
      type: "primitive",
    },
    {
      propertyName: "deleteRetentionPolicy",
      xmlOptions: { name: "DeleteRetentionPolicy" },
      type: "object",
      deserializer: retentionPolicyXmlObjectDeserializer,
    },
    {
      propertyName: "staticWebsite",
      xmlOptions: { name: "StaticWebsite" },
      type: "object",
      deserializer: staticWebsiteXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<BlobServiceProperties>(
    xmlString,
    properties,
    "StorageServiceProperties",
  );
}

export function blobServicePropertiesXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): BlobServiceProperties {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "blobAnalyticsLogging",
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
    {
      propertyName: "defaultServiceVersion",
      xmlOptions: { name: "DefaultServiceVersion" },
      type: "primitive",
    },
    {
      propertyName: "deleteRetentionPolicy",
      xmlOptions: { name: "DeleteRetentionPolicy" },
      type: "object",
      deserializer: retentionPolicyXmlObjectDeserializer,
    },
    {
      propertyName: "staticWebsite",
      xmlOptions: { name: "StaticWebsite" },
      type: "object",
      deserializer: staticWebsiteXmlObjectDeserializer,
    },
  ];
  return deserializeXmlObject<BlobServiceProperties>(xmlObject, properties);
}

/** Azure Analytics Logging settings. */
export interface Logging {
  /** The version of the logging properties. */
  version: string;
  /** Whether delete operation is logged. */
  deleteProperty: boolean;
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
    deleteProperty: item["deleteProperty"],
    read: item["read"],
    write: item["write"],
    retentionPolicy: retentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function loggingDeserializer(item: any): Logging {
  return {
    version: item["version"],
    deleteProperty: item["deleteProperty"],
    read: item["read"],
    write: item["write"],
    retentionPolicy: retentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

export function loggingXmlSerializer(item: Logging): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "version", xmlOptions: { name: "Version" }, type: "primitive" },
    { propertyName: "deleteProperty", xmlOptions: { name: "Delete" }, type: "primitive" },
    { propertyName: "read", xmlOptions: { name: "Read" }, type: "primitive" },
    { propertyName: "write", xmlOptions: { name: "Write" }, type: "primitive" },
    {
      propertyName: "retentionPolicy",
      xmlOptions: { name: "RetentionPolicy" },
      type: "object",
      serializer: retentionPolicySerializer,
    },
  ];
  return serializeToXml(item, properties, "Logging");
}

export function loggingXmlDeserializer(xmlString: string): Logging {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "version", xmlOptions: { name: "Version" }, type: "primitive" },
    { propertyName: "deleteProperty", xmlOptions: { name: "Delete" }, type: "primitive" },
    { propertyName: "read", xmlOptions: { name: "Read" }, type: "primitive" },
    { propertyName: "write", xmlOptions: { name: "Write" }, type: "primitive" },
    {
      propertyName: "retentionPolicy",
      xmlOptions: { name: "RetentionPolicy" },
      type: "object",
      deserializer: retentionPolicyXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<Logging>(xmlString, properties, "Logging");
}

export function loggingXmlObjectDeserializer(xmlObject: Record<string, unknown>): Logging {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "version", xmlOptions: { name: "Version" }, type: "primitive" },
    { propertyName: "deleteProperty", xmlOptions: { name: "Delete" }, type: "primitive" },
    { propertyName: "read", xmlOptions: { name: "Read" }, type: "primitive" },
    { propertyName: "write", xmlOptions: { name: "Write" }, type: "primitive" },
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
  /** Whether to allow permanent delete. */
  allowPermanentDelete?: boolean;
}

export function retentionPolicySerializer(item: RetentionPolicy): any {
  return {
    enabled: item["enabled"],
    days: item["days"],
    allowPermanentDelete: item["allowPermanentDelete"],
  };
}

export function retentionPolicyDeserializer(item: any): RetentionPolicy {
  return {
    enabled: item["enabled"],
    days: item["days"],
    allowPermanentDelete: item["allowPermanentDelete"],
  };
}

export function retentionPolicyXmlSerializer(item: RetentionPolicy): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "enabled", xmlOptions: { name: "Enabled" }, type: "primitive" },
    { propertyName: "days", xmlOptions: { name: "Days" }, type: "primitive" },
    {
      propertyName: "allowPermanentDelete",
      xmlOptions: { name: "AllowPermanentDelete" },
      type: "primitive",
    },
  ];
  return serializeToXml(item, properties, "RetentionPolicy");
}

export function retentionPolicyXmlDeserializer(xmlString: string): RetentionPolicy {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "enabled", xmlOptions: { name: "Enabled" }, type: "primitive" },
    { propertyName: "days", xmlOptions: { name: "Days" }, type: "primitive" },
    {
      propertyName: "allowPermanentDelete",
      xmlOptions: { name: "AllowPermanentDelete" },
      type: "primitive",
    },
  ];
  return deserializeFromXml<RetentionPolicy>(xmlString, properties, "RetentionPolicy");
}

export function retentionPolicyXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): RetentionPolicy {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "enabled", xmlOptions: { name: "Enabled" }, type: "primitive" },
    { propertyName: "days", xmlOptions: { name: "Days" }, type: "primitive" },
    {
      propertyName: "allowPermanentDelete",
      xmlOptions: { name: "AllowPermanentDelete" },
      type: "primitive",
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
      serializer: retentionPolicySerializer,
    },
  ];
  return serializeToXml(item, properties, "Metrics");
}

export function metricsXmlDeserializer(xmlString: string): Metrics {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "version", xmlOptions: { name: "Version" }, type: "primitive" },
    { propertyName: "enabled", xmlOptions: { name: "Enabled" }, type: "primitive" },
    { propertyName: "includeApis", xmlOptions: { name: "IncludeAPIs" }, type: "primitive" },
    {
      propertyName: "retentionPolicy",
      xmlOptions: { name: "RetentionPolicy" },
      type: "object",
      deserializer: retentionPolicyXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<Metrics>(xmlString, properties, "Metrics");
}

export function metricsXmlObjectDeserializer(xmlObject: Record<string, unknown>): Metrics {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "version", xmlOptions: { name: "Version" }, type: "primitive" },
    { propertyName: "enabled", xmlOptions: { name: "Enabled" }, type: "primitive" },
    { propertyName: "includeApis", xmlOptions: { name: "IncludeAPIs" }, type: "primitive" },
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
    { propertyName: "allowedOrigins", xmlOptions: { name: "AllowedOrigins" }, type: "primitive" },
    { propertyName: "allowedMethods", xmlOptions: { name: "AllowedMethods" }, type: "primitive" },
    { propertyName: "allowedHeaders", xmlOptions: { name: "AllowedHeaders" }, type: "primitive" },
    { propertyName: "exposedHeaders", xmlOptions: { name: "ExposedHeaders" }, type: "primitive" },
    { propertyName: "maxAgeInSeconds", xmlOptions: { name: "MaxAgeInSeconds" }, type: "primitive" },
  ];
  return deserializeFromXml<CorsRule>(xmlString, properties, "CorsRule");
}

export function corsRuleXmlObjectDeserializer(xmlObject: Record<string, unknown>): CorsRule {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "allowedOrigins", xmlOptions: { name: "AllowedOrigins" }, type: "primitive" },
    { propertyName: "allowedMethods", xmlOptions: { name: "AllowedMethods" }, type: "primitive" },
    { propertyName: "allowedHeaders", xmlOptions: { name: "AllowedHeaders" }, type: "primitive" },
    { propertyName: "exposedHeaders", xmlOptions: { name: "ExposedHeaders" }, type: "primitive" },
    { propertyName: "maxAgeInSeconds", xmlOptions: { name: "MaxAgeInSeconds" }, type: "primitive" },
  ];
  return deserializeXmlObject<CorsRule>(xmlObject, properties);
}

/** The properties that enable an account to host a static website */
export interface StaticWebsite {
  /** Indicates whether this account is hosting a static website */
  enabled: boolean;
  /** The index document. */
  indexDocument?: string;
  /** The error document. */
  errorDocument404Path?: string;
  /** Absolute path of the default index page */
  defaultIndexDocumentPath?: string;
}

export function staticWebsiteSerializer(item: StaticWebsite): any {
  return {
    enabled: item["enabled"],
    indexDocument: item["indexDocument"],
    errorDocument404Path: item["errorDocument404Path"],
    defaultIndexDocumentPath: item["defaultIndexDocumentPath"],
  };
}

export function staticWebsiteDeserializer(item: any): StaticWebsite {
  return {
    enabled: item["enabled"],
    indexDocument: item["indexDocument"],
    errorDocument404Path: item["errorDocument404Path"],
    defaultIndexDocumentPath: item["defaultIndexDocumentPath"],
  };
}

export function staticWebsiteXmlSerializer(item: StaticWebsite): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "enabled", xmlOptions: { name: "Enabled" }, type: "primitive" },
    { propertyName: "indexDocument", xmlOptions: { name: "IndexDocument" }, type: "primitive" },
    {
      propertyName: "errorDocument404Path",
      xmlOptions: { name: "ErrorDocument404Path" },
      type: "primitive",
    },
    {
      propertyName: "defaultIndexDocumentPath",
      xmlOptions: { name: "DefaultIndexDocumentPath" },
      type: "primitive",
    },
  ];
  return serializeToXml(item, properties, "StaticWebsite");
}

export function staticWebsiteXmlDeserializer(xmlString: string): StaticWebsite {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "enabled", xmlOptions: { name: "Enabled" }, type: "primitive" },
    { propertyName: "indexDocument", xmlOptions: { name: "IndexDocument" }, type: "primitive" },
    {
      propertyName: "errorDocument404Path",
      xmlOptions: { name: "ErrorDocument404Path" },
      type: "primitive",
    },
    {
      propertyName: "defaultIndexDocumentPath",
      xmlOptions: { name: "DefaultIndexDocumentPath" },
      type: "primitive",
    },
  ];
  return deserializeFromXml<StaticWebsite>(xmlString, properties, "StaticWebsite");
}

export function staticWebsiteXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): StaticWebsite {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "enabled", xmlOptions: { name: "Enabled" }, type: "primitive" },
    { propertyName: "indexDocument", xmlOptions: { name: "IndexDocument" }, type: "primitive" },
    {
      propertyName: "errorDocument404Path",
      xmlOptions: { name: "ErrorDocument404Path" },
      type: "primitive",
    },
    {
      propertyName: "defaultIndexDocumentPath",
      xmlOptions: { name: "DefaultIndexDocumentPath" },
      type: "primitive",
    },
  ];
  return deserializeXmlObject<StaticWebsite>(xmlObject, properties);
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
    { propertyName: "code", xmlOptions: { name: "Code" }, type: "primitive" },
    { propertyName: "message", xmlOptions: { name: "Message" }, type: "primitive" },
    {
      propertyName: "copySourceStatusCode",
      xmlOptions: { name: "CopySourceStatusCode" },
      type: "primitive",
    },
    {
      propertyName: "copySourceErrorCode",
      xmlOptions: { name: "CopySourceErrorCode" },
      type: "primitive",
    },
    {
      propertyName: "copySourceErrorMessage",
      xmlOptions: { name: "CopySourceErrorMessage" },
      type: "primitive",
    },
  ];
  return deserializeFromXml<StorageError>(xmlString, properties, "StorageError");
}

export function storageErrorXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): StorageError {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "code", xmlOptions: { name: "Code" }, type: "primitive" },
    { propertyName: "message", xmlOptions: { name: "Message" }, type: "primitive" },
    {
      propertyName: "copySourceStatusCode",
      xmlOptions: { name: "CopySourceStatusCode" },
      type: "primitive",
    },
    {
      propertyName: "copySourceErrorCode",
      xmlOptions: { name: "CopySourceErrorCode" },
      type: "primitive",
    },
    {
      propertyName: "copySourceErrorMessage",
      xmlOptions: { name: "CopySourceErrorMessage" },
      type: "primitive",
    },
  ];
  return deserializeXmlObject<StorageError>(xmlObject, properties);
}

/** Error codes returned by the Azure Blob Storage service. */
export type StorageErrorCode =
  | "AccountAlreadyExists"
  | "AccountBeingCreated"
  | "AccountIsDisabled"
  | "AuthenticationFailed"
  | "AuthorizationFailure"
  | "ConditionHeadersNotSupported"
  | "ConditionNotMet"
  | "EmptyMetadataKey"
  | "InsufficientAccountPermissions"
  | "InternalError"
  | "InvalidAuthenticationInfo"
  | "InvalidHeaderValue"
  | "InvalidHttpVerb"
  | "InvalidInput"
  | "InvalidMd5"
  | "InvalidMetadata"
  | "InvalidQueryParameterValue"
  | "InvalidRange"
  | "InvalidRequestUrl"
  | "InvalidUri"
  | "InvalidXmlDocument"
  | "InvalidXmlNodeValue"
  | "Md5Mismatch"
  | "MetadataTooLarge"
  | "MissingContentLengthHeader"
  | "MissingRequiredXmlNode"
  | "MissingRequiredHeader"
  | "MissingRequiredQueryParameter"
  | "MultipleConditionHeadersNotSupported"
  | "OperationTimedOut"
  | "OutOfRangeInput"
  | "OutOfRangeQueryParameterValue"
  | "RequestBodyTooLarge"
  | "ResourceTypeMismatch"
  | "RequestUrlFailedToParse"
  | "ResourceAlreadyExists"
  | "ResourceNotFound"
  | "ServerBusy"
  | "UnsupportedHeader"
  | "UnsupportedXmlNode"
  | "UnsupportedQueryParameter"
  | "UnsupportedHttpVerb"
  | "AppendPositionConditionNotMet"
  | "BlobAlreadyExists"
  | "BlobImmutableDueToPolicy"
  | "BlobNotFound"
  | "BlobOverwritten"
  | "BlobTierInadequateForContentLength"
  | "BlobUsesCustomerSpecifiedEncryption"
  | "BlockCountExceedsLimit"
  | "BlockListTooLong"
  | "CannotChangeToLowerTier"
  | "CannotVerifyCopySource"
  | "ContainerAlreadyExists"
  | "ContainerBeingDeleted"
  | "ContainerDisabled"
  | "ContainerNotFound"
  | "ContentLengthLargerThanTierLimit"
  | "CopyAcrossAccountsNotSupported"
  | "CopyIdMismatch"
  | "FeatureVersionMismatch"
  | "IncrementalCopyBlobMismatch"
  | "IncrementalCopyOfEarlierVersionSnapshotNotAllowed"
  | "IncrementalCopySourceMustBeSnapshot"
  | "InfiniteLeaseDurationRequired"
  | "InvalidBlobOrBlock"
  | "InvalidBlobTier"
  | "InvalidBlobType"
  | "InvalidBlockId"
  | "InvalidBlockList"
  | "InvalidOperation"
  | "InvalidPageRange"
  | "InvalidSourceBlobType"
  | "InvalidSourceBlobUrl"
  | "InvalidVersionForPageBlobOperation"
  | "LeaseAlreadyPresent"
  | "LeaseAlreadyBroken"
  | "LeaseIdMismatchWithBlobOperation"
  | "LeaseIdMismatchWithContainerOperation"
  | "LeaseIdMismatchWithLeaseOperation"
  | "LeaseIdMissing"
  | "LeaseIsBreakingAndCannotBeAcquired"
  | "LeaseIsBreakingAndCannotBeChanged"
  | "LeaseIsBrokenAndCannotBeRenewed"
  | "LeaseLost"
  | "LeaseNotPresentWithBlobOperation"
  | "LeaseNotPresentWithContainerOperation"
  | "LeaseNotPresentWithLeaseOperation"
  | "MaxBlobSizeConditionNotMet"
  | "NoPendingCopyOperation"
  | "OperationNotAllowedOnIncrementalCopyBlob"
  | "PendingCopyOperation"
  | "PreviousSnapshotNotFound"
  | "PreviousSnapshotOperationNotSupported"
  | "PreviousSnapshotCannotBeNewer"
  | "SequenceNumberConditionNotMet"
  | "SequenceNumberIncrementTooLarge"
  | "SnapshotCountExceeded"
  | "SnapshotOperationRateExceeded"
  | "SnapshotsPresent"
  | "SourceConditionNotMet"
  | "SystemInUse"
  | "TargetConditionNotMet"
  | "UnauthorizedBlobOverwrite"
  | "BlobBeingRehydrated"
  | "BlobArchived"
  | "BlobNotArchived"
  | "AuthorizationSourceIPMismatch"
  | "AuthorizationProtocolMismatch"
  | "AuthorizationPermissionMismatch"
  | "AuthorizationServiceMismatch"
  | "AuthorizationResourceTypeMismatch"
  | "BlobAccessTierNotSupportedForAccountType";

/** Stats for the storage service. */
export interface StorageServiceStats {
  /** The geo replication stats. */
  geoReplication?: GeoReplication;
}

export function storageServiceStatsDeserializer(item: any): StorageServiceStats {
  return {
    geoReplication: !item["geoReplication"]
      ? item["geoReplication"]
      : geoReplicationDeserializer(item["geoReplication"]),
  };
}

export function storageServiceStatsXmlDeserializer(xmlString: string): StorageServiceStats {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "geoReplication",
      xmlOptions: { name: "GeoReplication" },
      type: "object",
      deserializer: geoReplicationXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<StorageServiceStats>(xmlString, properties, "StorageServiceStats");
}

export function storageServiceStatsXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): StorageServiceStats {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "geoReplication",
      xmlOptions: { name: "GeoReplication" },
      type: "object",
      deserializer: geoReplicationXmlObjectDeserializer,
    },
  ];
  return deserializeXmlObject<StorageServiceStats>(xmlObject, properties);
}

/** Geo-Replication information for the Secondary Storage Service */
export interface GeoReplication {
  /** The status of the secondary location */
  status: GeoReplicationStatusType;
  /** A GMT date/time value, to the second. All primary writes preceding this value are guaranteed to be available for read operations at the secondary. Primary writes after this point in time may or may not be available for reads. */
  lastSyncOn: Date;
}

export function geoReplicationDeserializer(item: any): GeoReplication {
  return {
    status: item["status"],
    lastSyncOn: new Date(item["lastSyncOn"]),
  };
}

export function geoReplicationXmlDeserializer(xmlString: string): GeoReplication {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "status", xmlOptions: { name: "Status" }, type: "primitive" },
    {
      propertyName: "lastSyncOn",
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
    { propertyName: "status", xmlOptions: { name: "Status" }, type: "primitive" },
    {
      propertyName: "lastSyncOn",
      xmlOptions: { name: "LastSyncTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
  ];
  return deserializeXmlObject<GeoReplication>(xmlObject, properties);
}

/** The geo replication status. */
export type GeoReplicationStatusType = "live" | "bootstrap" | "unavailable";

/** The list container segment response */
export interface ListContainersSegmentResponse {
  /** The service endpoint. */
  serviceEndpoint: string;
  /** The prefix of the containers. */
  prefix?: string;
  /** The marker of the containers. */
  marker?: string;
  /** The max results of the containers. */
  maxResults?: number;
  /** The container segment. */
  containerItems: ContainerItem[];
  /** The next marker of the containers. */
  nextMarker?: string;
}

export function listContainersSegmentResponseDeserializer(
  item: any,
): ListContainersSegmentResponse {
  return {
    serviceEndpoint: item["serviceEndpoint"],
    prefix: item["prefix"],
    marker: item["marker"],
    maxResults: item["maxResults"],
    containerItems: containerItemArrayDeserializer(item["containerItems"]),
    nextMarker: item["NextMarker"],
  };
}

export function listContainersSegmentResponseXmlDeserializer(
  xmlString: string,
): ListContainersSegmentResponse {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "serviceEndpoint",
      xmlOptions: { name: "ServiceEndpoint", attribute: true },
      type: "primitive",
    },
    { propertyName: "prefix", xmlOptions: { name: "Prefix" }, type: "primitive" },
    { propertyName: "marker", xmlOptions: { name: "Marker" }, type: "primitive" },
    { propertyName: "maxResults", xmlOptions: { name: "MaxResults" }, type: "primitive" },
    {
      propertyName: "containerItems",
      xmlOptions: { name: "Containers", itemsName: "Container" },
      type: "array",
      deserializer: containerItemXmlObjectDeserializer,
    },
    { propertyName: "nextMarker", xmlOptions: { name: "NextMarker" }, type: "primitive" },
  ];
  return deserializeFromXml<ListContainersSegmentResponse>(
    xmlString,
    properties,
    "EnumerationResults",
  );
}

export function listContainersSegmentResponseXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): ListContainersSegmentResponse {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "serviceEndpoint",
      xmlOptions: { name: "ServiceEndpoint", attribute: true },
      type: "primitive",
    },
    { propertyName: "prefix", xmlOptions: { name: "Prefix" }, type: "primitive" },
    { propertyName: "marker", xmlOptions: { name: "Marker" }, type: "primitive" },
    { propertyName: "maxResults", xmlOptions: { name: "MaxResults" }, type: "primitive" },
    {
      propertyName: "containerItems",
      xmlOptions: { name: "Containers", itemsName: "Container" },
      type: "array",
      deserializer: containerItemXmlObjectDeserializer,
    },
    { propertyName: "nextMarker", xmlOptions: { name: "NextMarker" }, type: "primitive" },
  ];
  return deserializeXmlObject<ListContainersSegmentResponse>(xmlObject, properties);
}

export function containerItemArrayDeserializer(result: Array<ContainerItem>): any[] {
  return result.map((item) => {
    return containerItemDeserializer(item);
  });
}

/** An Azure Storage container. */
export interface ContainerItem {
  /** The name of the container. */
  name: string;
  /** Whether the container is deleted. */
  delete?: boolean;
  /** The version of the container. */
  version?: string;
  /** The properties of the container. */
  properties: ContainerProperties;
  /** The metadata of the container. */
  metadata?: Record<string, string>;
}

export function containerItemDeserializer(item: any): ContainerItem {
  return {
    name: item["name"],
    delete: item["delete"],
    version: item["version"],
    properties: containerPropertiesDeserializer(item["properties"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function containerItemXmlDeserializer(xmlString: string): ContainerItem {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "name", xmlOptions: { name: "Name" }, type: "primitive" },
    { propertyName: "delete", xmlOptions: { name: "Deleted" }, type: "primitive" },
    { propertyName: "version", xmlOptions: { name: "Version" }, type: "primitive" },
    {
      propertyName: "properties",
      xmlOptions: { name: "Properties" },
      type: "object",
      deserializer: containerPropertiesXmlObjectDeserializer,
    },
    { propertyName: "metadata", xmlOptions: { name: "Metadata" }, type: "dict" },
  ];
  return deserializeFromXml<ContainerItem>(xmlString, properties, "Container");
}

export function containerItemXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): ContainerItem {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "name", xmlOptions: { name: "Name" }, type: "primitive" },
    { propertyName: "delete", xmlOptions: { name: "Deleted" }, type: "primitive" },
    { propertyName: "version", xmlOptions: { name: "Version" }, type: "primitive" },
    {
      propertyName: "properties",
      xmlOptions: { name: "Properties" },
      type: "object",
      deserializer: containerPropertiesXmlObjectDeserializer,
    },
    { propertyName: "metadata", xmlOptions: { name: "Metadata" }, type: "dict" },
  ];
  return deserializeXmlObject<ContainerItem>(xmlObject, properties);
}

/** The properties of a container. */
export interface ContainerProperties {
  /** The date-time the container was last modified in RFC1123 format. */
  lastModified: Date;
  /** The ETag of the container. */
  etag: string;
  /** The lease status of the container. */
  leaseStatus?: LeaseStatus;
  /** The lease state of the container. */
  leaseState?: LeaseState;
  /** The lease duration of the container. */
  leaseDuration?: LeaseDuration;
  /** The public access type of the container. */
  publicAccess?: PublicAccessType;
  /** Whether it has an immutability policy. */
  hasImmutabilityPolicy?: boolean;
  /** The has legal hold status of the container. */
  hasLegalHold?: boolean;
  /** The default encryption scope of the container. */
  defaultEncryptionScope?: string;
  /** Whether to prevent encryption scope override. */
  preventEncryptionScopeOverride?: boolean;
  /** The deleted time of the container. */
  deletedOn?: Date;
  /** The remaining retention days of the container. */
  remainingRetentionDays?: number;
  /** Whether immutable storage with versioning is enabled. */
  isImmutableStorageWithVersioningEnabled?: boolean;
}

export function containerPropertiesDeserializer(item: any): ContainerProperties {
  return {
    lastModified: new Date(item["lastModified"]),
    etag: item["etag"],
    leaseStatus: item["leaseStatus"],
    leaseState: item["leaseState"],
    leaseDuration: item["leaseDuration"],
    publicAccess: item["publicAccess"],
    hasImmutabilityPolicy: item["hasImmutabilityPolicy"],
    hasLegalHold: item["hasLegalHold"],
    defaultEncryptionScope: item["defaultEncryptionScope"],
    preventEncryptionScopeOverride: item["PreventEncryptionScopeOverride"],
    deletedOn: !item["deletedOn"] ? item["deletedOn"] : new Date(item["deletedOn"]),
    remainingRetentionDays: item["remainingRetentionDays"],
    isImmutableStorageWithVersioningEnabled: item["IsImmutableStorageWithVersioningEnabled"],
  };
}

export function containerPropertiesXmlDeserializer(xmlString: string): ContainerProperties {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "lastModified",
      xmlOptions: { name: "Last-Modified" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    { propertyName: "etag", xmlOptions: { name: "ETag" }, type: "primitive" },
    { propertyName: "leaseStatus", xmlOptions: { name: "LeaseStatus" }, type: "primitive" },
    { propertyName: "leaseState", xmlOptions: { name: "LeaseState" }, type: "primitive" },
    { propertyName: "leaseDuration", xmlOptions: { name: "LeaseDuration" }, type: "primitive" },
    { propertyName: "publicAccess", xmlOptions: { name: "PublicAccess" }, type: "primitive" },
    {
      propertyName: "hasImmutabilityPolicy",
      xmlOptions: { name: "HasImmutabilityPolicy" },
      type: "primitive",
    },
    { propertyName: "hasLegalHold", xmlOptions: { name: "HasLegalHold" }, type: "primitive" },
    {
      propertyName: "defaultEncryptionScope",
      xmlOptions: { name: "DefaultEncryptionScope" },
      type: "primitive",
    },
    {
      propertyName: "preventEncryptionScopeOverride",
      xmlOptions: { name: "DenyEncryptionScopeOverride" },
      type: "primitive",
    },
    {
      propertyName: "deletedOn",
      xmlOptions: { name: "DeletedTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "remainingRetentionDays",
      xmlOptions: { name: "RemainingRetentionDays" },
      type: "primitive",
    },
    {
      propertyName: "isImmutableStorageWithVersioningEnabled",
      xmlOptions: { name: "ImmutableStorageWithVersioningEnabled" },
      type: "primitive",
    },
  ];
  return deserializeFromXml<ContainerProperties>(xmlString, properties, "ContainerProperties");
}

export function containerPropertiesXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): ContainerProperties {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "lastModified",
      xmlOptions: { name: "Last-Modified" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    { propertyName: "etag", xmlOptions: { name: "ETag" }, type: "primitive" },
    { propertyName: "leaseStatus", xmlOptions: { name: "LeaseStatus" }, type: "primitive" },
    { propertyName: "leaseState", xmlOptions: { name: "LeaseState" }, type: "primitive" },
    { propertyName: "leaseDuration", xmlOptions: { name: "LeaseDuration" }, type: "primitive" },
    { propertyName: "publicAccess", xmlOptions: { name: "PublicAccess" }, type: "primitive" },
    {
      propertyName: "hasImmutabilityPolicy",
      xmlOptions: { name: "HasImmutabilityPolicy" },
      type: "primitive",
    },
    { propertyName: "hasLegalHold", xmlOptions: { name: "HasLegalHold" }, type: "primitive" },
    {
      propertyName: "defaultEncryptionScope",
      xmlOptions: { name: "DefaultEncryptionScope" },
      type: "primitive",
    },
    {
      propertyName: "preventEncryptionScopeOverride",
      xmlOptions: { name: "DenyEncryptionScopeOverride" },
      type: "primitive",
    },
    {
      propertyName: "deletedOn",
      xmlOptions: { name: "DeletedTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "remainingRetentionDays",
      xmlOptions: { name: "RemainingRetentionDays" },
      type: "primitive",
    },
    {
      propertyName: "isImmutableStorageWithVersioningEnabled",
      xmlOptions: { name: "ImmutableStorageWithVersioningEnabled" },
      type: "primitive",
    },
  ];
  return deserializeXmlObject<ContainerProperties>(xmlObject, properties);
}

/** The lease status. */
export type LeaseStatus = "unlocked" | "locked";
/** The lease state. */
export type LeaseState = "available" | "leased" | "expired" | "breaking" | "broken";
/** The lease duration. */
export type LeaseDuration = "infinite" | "fixed";
/** The public access types. */
export type PublicAccessType = "blob" | "container";

/** Key information */
export interface KeyInfo {
  /** The date-time the key is active. */
  startsOn: string;
  /** The date-time the key expires. */
  expiresOn: string;
  /** The delegated user tenant id in Azure AD. */
  delegatedUserTid?: string;
}

export function keyInfoSerializer(item: KeyInfo): any {
  return {
    startsOn: item["startsOn"],
    expiresOn: item["expiresOn"],
    delegatedUserTid: item["delegatedUserTid"],
  };
}

export function keyInfoXmlSerializer(item: KeyInfo): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "startsOn", xmlOptions: { name: "Start" }, type: "primitive" },
    { propertyName: "expiresOn", xmlOptions: { name: "Expiry" }, type: "primitive" },
    {
      propertyName: "delegatedUserTid",
      xmlOptions: { name: "DelegatedUserTid" },
      type: "primitive",
    },
  ];
  return serializeToXml(item, properties, "KeyInfo");
}

/** A user delegation key. */
export interface UserDelegationKey {
  /** The Azure Active Directory object ID in GUID format. */
  signedObjectId: string;
  /** The Azure Active Directory tenant ID in GUID format. */
  signedTenantId: string;
  /** The date-time the key is active. */
  signedStartsOn: string;
  /** The date-time the key expires. */
  signedExpiresOn: string;
  /** Abbreviation of the Azure Storage service that accepts the key. */
  signedService: string;
  /** The service version that created the key. */
  signedVersion: string;
  /** The delegated user tenant id in Azure AD. Return if DelegatedUserTid is specified. */
  signedDelegatedUserTid?: string;
  /** The key as a base64 string. */
  value: Uint8Array;
}

export function userDelegationKeyDeserializer(item: any): UserDelegationKey {
  return {
    signedObjectId: item["signedObjectId"],
    signedTenantId: item["signedTenantId"],
    signedStartsOn: item["signedStartsOn"],
    signedExpiresOn: item["signedExpiresOn"],
    signedService: item["signedService"],
    signedVersion: item["signedVersion"],
    signedDelegatedUserTid: item["signedDelegatedUserTid"],
    value:
      typeof item["value"] === "string"
        ? stringToUint8Array(item["value"], "base64")
        : item["value"],
  };
}

export function userDelegationKeyXmlDeserializer(xmlString: string): UserDelegationKey {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "signedObjectId", xmlOptions: { name: "SignedOid" }, type: "primitive" },
    { propertyName: "signedTenantId", xmlOptions: { name: "SignedTid" }, type: "primitive" },
    { propertyName: "signedStartsOn", xmlOptions: { name: "SignedStart" }, type: "primitive" },
    { propertyName: "signedExpiresOn", xmlOptions: { name: "SignedExpiry" }, type: "primitive" },
    { propertyName: "signedService", xmlOptions: { name: "SignedService" }, type: "primitive" },
    { propertyName: "signedVersion", xmlOptions: { name: "SignedVersion" }, type: "primitive" },
    {
      propertyName: "signedDelegatedUserTid",
      xmlOptions: { name: "SignedDelegatedUserTid" },
      type: "primitive",
    },
    { propertyName: "value", xmlOptions: { name: "Value" }, type: "bytes" },
  ];
  return deserializeFromXml<UserDelegationKey>(xmlString, properties, "UserDelegationKey");
}

export function userDelegationKeyXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): UserDelegationKey {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "signedObjectId", xmlOptions: { name: "SignedOid" }, type: "primitive" },
    { propertyName: "signedTenantId", xmlOptions: { name: "SignedTid" }, type: "primitive" },
    { propertyName: "signedStartsOn", xmlOptions: { name: "SignedStart" }, type: "primitive" },
    { propertyName: "signedExpiresOn", xmlOptions: { name: "SignedExpiry" }, type: "primitive" },
    { propertyName: "signedService", xmlOptions: { name: "SignedService" }, type: "primitive" },
    { propertyName: "signedVersion", xmlOptions: { name: "SignedVersion" }, type: "primitive" },
    {
      propertyName: "signedDelegatedUserTid",
      xmlOptions: { name: "SignedDelegatedUserTid" },
      type: "primitive",
    },
    { propertyName: "value", xmlOptions: { name: "Value" }, type: "bytes" },
  ];
  return deserializeXmlObject<UserDelegationKey>(xmlObject, properties);
}

/** model interface _SubmitBatchRequest */
export interface _SubmitBatchRequest {
  name: string;
  body: FileContents | { contents: FileContents; contentType?: string; filename?: string };
}

export function _submitBatchRequestSerializer(item: _SubmitBatchRequest): any {
  return [
    { name: "name", body: item["name"] },
    createFilePartDescriptor("body", item["body"], "application/octet-stream"),
  ];
}

export function _submitBatchRequestDeserializer(item: any): _SubmitBatchRequest {
  return {
    name: item["name"],
    body:
      typeof item["body"] === "string" ? stringToUint8Array(item["body"], "base64") : item["body"],
  };
}

/** The result of a Filter Blobs API call */
export interface FilterBlobSegment {
  /** The service endpoint. */
  serviceEndpoint: string;
  /** The filter for the blobs. */
  where: string;
  /** The blob segment. */
  blobs: FilterBlobItem[];
  /** The next marker of the blobs. */
  nextMarker?: string;
}

export function filterBlobSegmentDeserializer(item: any): FilterBlobSegment {
  return {
    serviceEndpoint: item["serviceEndpoint"],
    where: item["where"],
    blobs: filterBlobItemArrayDeserializer(item["blobs"]),
    nextMarker: item["nextMarker"],
  };
}

export function filterBlobSegmentXmlDeserializer(xmlString: string): FilterBlobSegment {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "serviceEndpoint",
      xmlOptions: { name: "ServiceEndpoint", attribute: true },
      type: "primitive",
    },
    { propertyName: "where", xmlOptions: { name: "Where" }, type: "primitive" },
    {
      propertyName: "blobs",
      xmlOptions: { name: "Blobs", itemsName: "Blob" },
      type: "array",
      deserializer: filterBlobItemXmlObjectDeserializer,
    },
    { propertyName: "nextMarker", xmlOptions: { name: "NextMarker" }, type: "primitive" },
  ];
  return deserializeFromXml<FilterBlobSegment>(xmlString, properties, "EnumerationResults");
}

export function filterBlobSegmentXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): FilterBlobSegment {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "serviceEndpoint",
      xmlOptions: { name: "ServiceEndpoint", attribute: true },
      type: "primitive",
    },
    { propertyName: "where", xmlOptions: { name: "Where" }, type: "primitive" },
    {
      propertyName: "blobs",
      xmlOptions: { name: "Blobs", itemsName: "Blob" },
      type: "array",
      deserializer: filterBlobItemXmlObjectDeserializer,
    },
    { propertyName: "nextMarker", xmlOptions: { name: "NextMarker" }, type: "primitive" },
  ];
  return deserializeXmlObject<FilterBlobSegment>(xmlObject, properties);
}

export function filterBlobItemArrayDeserializer(result: Array<FilterBlobItem>): any[] {
  return result.map((item) => {
    return filterBlobItemDeserializer(item);
  });
}

/** The filter blob item. */
export interface FilterBlobItem {
  /** The name of the blob. */
  name: string;
  /** The properties of the blob. */
  containerName: string;
  /** The metadata of the blob. */
  tags?: BlobTags;
  /** The version ID of the blob. */
  versionId?: string;
  /** Whether it is the current version of the blob */
  isCurrentVersion?: boolean;
}

export function filterBlobItemDeserializer(item: any): FilterBlobItem {
  return {
    name: item["name"],
    containerName: item["containerName"],
    tags: !item["tags"] ? item["tags"] : blobTagsDeserializer(item["tags"]),
    versionId: item["versionId"],
    isCurrentVersion: item["isCurrentVersion"],
  };
}

export function filterBlobItemXmlDeserializer(xmlString: string): FilterBlobItem {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "name", xmlOptions: { name: "Name" }, type: "primitive" },
    { propertyName: "containerName", xmlOptions: { name: "ContainerName" }, type: "primitive" },
    {
      propertyName: "tags",
      xmlOptions: { name: "tags", unwrapped: true },
      type: "object",
      deserializer: blobTagsXmlObjectDeserializer,
    },
    { propertyName: "versionId", xmlOptions: { name: "VersionId" }, type: "primitive" },
    {
      propertyName: "isCurrentVersion",
      xmlOptions: { name: "IsCurrentVersion" },
      type: "primitive",
    },
  ];
  return deserializeFromXml<FilterBlobItem>(xmlString, properties, "Blob");
}

export function filterBlobItemXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): FilterBlobItem {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "name", xmlOptions: { name: "Name" }, type: "primitive" },
    { propertyName: "containerName", xmlOptions: { name: "ContainerName" }, type: "primitive" },
    {
      propertyName: "tags",
      xmlOptions: { name: "tags", unwrapped: true },
      type: "object",
      deserializer: blobTagsXmlObjectDeserializer,
    },
    { propertyName: "versionId", xmlOptions: { name: "VersionId" }, type: "primitive" },
    {
      propertyName: "isCurrentVersion",
      xmlOptions: { name: "IsCurrentVersion" },
      type: "primitive",
    },
  ];
  return deserializeXmlObject<FilterBlobItem>(xmlObject, properties);
}

/** Represents blob tags. */
export interface BlobTags {
  /** Represents the blob tags. */
  blobTagSet: BlobTag[];
}

export function blobTagsSerializer(item: BlobTags): any {
  return { blobTagSet: blobTagArraySerializer(item["blobTagSet"]) };
}

export function blobTagsDeserializer(item: any): BlobTags {
  return {
    blobTagSet: blobTagArrayDeserializer(item["blobTagSet"]),
  };
}

export function blobTagsXmlSerializer(item: BlobTags): string {
  const properties: XmlPropertyMetadata[] = [
    {
      propertyName: "blobTagSet",
      xmlOptions: { name: "TagSet", itemsName: "Tag" },
      type: "array",
      serializer: blobTagSerializer,
    },
  ];
  return serializeToXml(item, properties, "Tags");
}

export function blobTagsXmlDeserializer(xmlString: string): BlobTags {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "blobTagSet",
      xmlOptions: { name: "TagSet", itemsName: "Tag" },
      type: "array",
      deserializer: blobTagXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<BlobTags>(xmlString, properties, "Tags");
}

export function blobTagsXmlObjectDeserializer(xmlObject: Record<string, unknown>): BlobTags {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "blobTagSet",
      xmlOptions: { name: "TagSet", itemsName: "Tag" },
      type: "array",
      deserializer: blobTagXmlObjectDeserializer,
    },
  ];
  return deserializeXmlObject<BlobTags>(xmlObject, properties);
}

export function blobTagArraySerializer(result: Array<BlobTag>): any[] {
  return result.map((item) => {
    return blobTagSerializer(item);
  });
}

export function blobTagArrayDeserializer(result: Array<BlobTag>): any[] {
  return result.map((item) => {
    return blobTagDeserializer(item);
  });
}

/** The blob tags. */
export interface BlobTag {
  /** The key of the tag. */
  key: string;
  /** The value of the tag. */
  value: string;
}

export function blobTagSerializer(item: BlobTag): any {
  return { key: item["key"], value: item["value"] };
}

export function blobTagDeserializer(item: any): BlobTag {
  return {
    key: item["key"],
    value: item["value"],
  };
}

export function blobTagXmlSerializer(item: BlobTag): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "key", xmlOptions: { name: "Key" }, type: "primitive" },
    { propertyName: "value", xmlOptions: { name: "Value" }, type: "primitive" },
  ];
  return serializeToXml(item, properties, "Tag");
}

export function blobTagXmlDeserializer(xmlString: string): BlobTag {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "key", xmlOptions: { name: "Key" }, type: "primitive" },
    { propertyName: "value", xmlOptions: { name: "Value" }, type: "primitive" },
  ];
  return deserializeFromXml<BlobTag>(xmlString, properties, "Tag");
}

export function blobTagXmlObjectDeserializer(xmlObject: Record<string, unknown>): BlobTag {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "key", xmlOptions: { name: "Key" }, type: "primitive" },
    { propertyName: "value", xmlOptions: { name: "Value" }, type: "primitive" },
  ];
  return deserializeXmlObject<BlobTag>(xmlObject, properties);
}

/** Represents an array of signed identifiers */
export interface SignedIdentifiers {
  /** The array of signed identifiers. */
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
      serializer: signedIdentifierSerializer,
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

export function signedIdentifiersXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): SignedIdentifiers {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "items",
      xmlOptions: { name: "SignedIdentifier", unwrapped: true, itemsName: "SignedIdentifier" },
      type: "array",
      deserializer: signedIdentifierXmlObjectDeserializer,
    },
  ];
  return deserializeXmlObject<SignedIdentifiers>(xmlObject, properties);
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
      serializer: accessPolicySerializer,
    },
  ];
  return serializeToXml(item, properties, "SignedIdentifier");
}

export function signedIdentifierXmlDeserializer(xmlString: string): SignedIdentifier {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "id", xmlOptions: { name: "Id" }, type: "primitive" },
    {
      propertyName: "accessPolicy",
      xmlOptions: { name: "AccessPolicy" },
      type: "object",
      deserializer: accessPolicyXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<SignedIdentifier>(xmlString, properties, "SignedIdentifier");
}

export function signedIdentifierXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): SignedIdentifier {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "id", xmlOptions: { name: "Id" }, type: "primitive" },
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
  startsOn: string;
  /** The date-time the policy expires. */
  expiresOn: string;
  /** The permissions for acl the policy. */
  permissions: string;
}

export function accessPolicySerializer(item: AccessPolicy): any {
  return {
    startsOn: item["startsOn"],
    expiresOn: item["expiresOn"],
    permissions: item["permissions"],
  };
}

export function accessPolicyDeserializer(item: any): AccessPolicy {
  return {
    startsOn: item["startsOn"],
    expiresOn: item["expiresOn"],
    permissions: item["permissions"],
  };
}

export function accessPolicyXmlSerializer(item: AccessPolicy): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "startsOn", xmlOptions: { name: "Start" }, type: "primitive" },
    { propertyName: "expiresOn", xmlOptions: { name: "Expiry" }, type: "primitive" },
    { propertyName: "permissions", xmlOptions: { name: "Permission" }, type: "primitive" },
  ];
  return serializeToXml(item, properties, "AccessPolicy");
}

export function accessPolicyXmlDeserializer(xmlString: string): AccessPolicy {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "startsOn", xmlOptions: { name: "Start" }, type: "primitive" },
    { propertyName: "expiresOn", xmlOptions: { name: "Expiry" }, type: "primitive" },
    { propertyName: "permissions", xmlOptions: { name: "Permission" }, type: "primitive" },
  ];
  return deserializeFromXml<AccessPolicy>(xmlString, properties, "AccessPolicy");
}

export function accessPolicyXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): AccessPolicy {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "startsOn", xmlOptions: { name: "Start" }, type: "primitive" },
    { propertyName: "expiresOn", xmlOptions: { name: "Expiry" }, type: "primitive" },
    { propertyName: "permissions", xmlOptions: { name: "Permission" }, type: "primitive" },
  ];
  return deserializeXmlObject<AccessPolicy>(xmlObject, properties);
}

/** An enumeration of blobs. */
export interface ListBlobsFlatSegmentResponse {
  /** The service endpoint. */
  serviceEndpoint: string;
  /** The container name. */
  containerName: string;
  /** The prefix of the blobs. */
  prefix?: string;
  /** The marker of the blobs. */
  marker?: string;
  /** The max results of the blobs. */
  maxResults?: number;
  /** The blob segment. */
  segment: BlobFlatListSegment;
  /** The next marker of the blobs. */
  nextMarker?: string;
}

export function listBlobsFlatSegmentResponseDeserializer(item: any): ListBlobsFlatSegmentResponse {
  return {
    serviceEndpoint: item["serviceEndpoint"],
    containerName: item["containerName"],
    prefix: item["prefix"],
    marker: item["marker"],
    maxResults: item["maxResults"],
    segment: blobFlatListSegmentDeserializer(item["segment"]),
    nextMarker: item["nextMarker"],
  };
}

export function listBlobsFlatSegmentResponseXmlDeserializer(
  xmlString: string,
): ListBlobsFlatSegmentResponse {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "serviceEndpoint",
      xmlOptions: { name: "ServiceEndpoint", attribute: true },
      type: "primitive",
    },
    {
      propertyName: "containerName",
      xmlOptions: { name: "ContainerName", attribute: true },
      type: "primitive",
    },
    { propertyName: "prefix", xmlOptions: { name: "Prefix" }, type: "primitive" },
    { propertyName: "marker", xmlOptions: { name: "Marker" }, type: "primitive" },
    { propertyName: "maxResults", xmlOptions: { name: "MaxResults" }, type: "primitive" },
    {
      propertyName: "segment",
      xmlOptions: { name: "Blobs" },
      type: "object",
      deserializer: blobFlatListSegmentXmlObjectDeserializer,
    },
    { propertyName: "nextMarker", xmlOptions: { name: "NextMarker" }, type: "primitive" },
  ];
  return deserializeFromXml<ListBlobsFlatSegmentResponse>(
    xmlString,
    properties,
    "EnumerationResults",
  );
}

export function listBlobsFlatSegmentResponseXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): ListBlobsFlatSegmentResponse {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "serviceEndpoint",
      xmlOptions: { name: "ServiceEndpoint", attribute: true },
      type: "primitive",
    },
    {
      propertyName: "containerName",
      xmlOptions: { name: "ContainerName", attribute: true },
      type: "primitive",
    },
    { propertyName: "prefix", xmlOptions: { name: "Prefix" }, type: "primitive" },
    { propertyName: "marker", xmlOptions: { name: "Marker" }, type: "primitive" },
    { propertyName: "maxResults", xmlOptions: { name: "MaxResults" }, type: "primitive" },
    {
      propertyName: "segment",
      xmlOptions: { name: "Blobs" },
      type: "object",
      deserializer: blobFlatListSegmentXmlObjectDeserializer,
    },
    { propertyName: "nextMarker", xmlOptions: { name: "NextMarker" }, type: "primitive" },
  ];
  return deserializeXmlObject<ListBlobsFlatSegmentResponse>(xmlObject, properties);
}

/** The blob flat list segment. */
export interface BlobFlatListSegment {
  /** The blob items. */
  blobItems: BlobItemInternal[];
}

export function blobFlatListSegmentDeserializer(item: any): BlobFlatListSegment {
  return {
    blobItems: blobItemInternalArrayDeserializer(item["blobItems"]),
  };
}

export function blobFlatListSegmentXmlDeserializer(xmlString: string): BlobFlatListSegment {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "blobItems",
      xmlOptions: { name: "Blob", unwrapped: true, itemsName: "Blob" },
      type: "array",
      deserializer: blobItemInternalXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<BlobFlatListSegment>(xmlString, properties, "BlobFlatListSegment");
}

export function blobFlatListSegmentXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): BlobFlatListSegment {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "blobItems",
      xmlOptions: { name: "Blob", unwrapped: true, itemsName: "Blob" },
      type: "array",
      deserializer: blobItemInternalXmlObjectDeserializer,
    },
  ];
  return deserializeXmlObject<BlobFlatListSegment>(xmlObject, properties);
}

export function blobItemInternalArrayDeserializer(result: Array<BlobItemInternal>): any[] {
  return result.map((item) => {
    return blobItemInternalDeserializer(item);
  });
}

/** An Azure Storage Blob */
export interface BlobItemInternal {
  /** The name of the blob. */
  name: BlobName;
  /** Whether the blob is deleted. */
  deleted: boolean;
  /** The snapshot of the blob. */
  snapshot: string;
  /** The version id of the blob. */
  versionId?: string;
  /** Whether the blob is the current version. */
  isCurrentVersion?: boolean;
  /** The properties of the blob. */
  properties: BlobPropertiesInternal;
  /** The metadata of the blob. */
  metadata?: BlobMetadata;
  /** The tags of the blob. */
  blobTags?: BlobTags;
  /** The object replication metadata of the blob. */
  objectReplicationMetadata?: ObjectReplicationMetadata;
  /** Whether the blob has versions only. */
  hasVersionsOnly?: boolean;
}

export function blobItemInternalDeserializer(item: any): BlobItemInternal {
  return {
    name: blobNameDeserializer(item["name"]),
    deleted: item["deleted"],
    snapshot: item["snapshot"],
    versionId: item["versionId"],
    isCurrentVersion: item["isCurrentVersion"],
    properties: blobPropertiesInternalDeserializer(item["properties"]),
    metadata: !item["metadata"] ? item["metadata"] : blobMetadataDeserializer(item["metadata"]),
    blobTags: !item["blobTags"] ? item["blobTags"] : blobTagsDeserializer(item["blobTags"]),
    objectReplicationMetadata: !item["objectReplicationMetadata"]
      ? item["objectReplicationMetadata"]
      : objectReplicationMetadataDeserializer(item["objectReplicationMetadata"]),
    hasVersionsOnly: item["hasVersionsOnly"],
  };
}

export function blobItemInternalXmlDeserializer(xmlString: string): BlobItemInternal {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "Name" },
      type: "object",
      deserializer: blobNameXmlObjectDeserializer,
    },
    { propertyName: "deleted", xmlOptions: { name: "Deleted" }, type: "primitive" },
    { propertyName: "snapshot", xmlOptions: { name: "Snapshot" }, type: "primitive" },
    { propertyName: "versionId", xmlOptions: { name: "VersionId" }, type: "primitive" },
    {
      propertyName: "isCurrentVersion",
      xmlOptions: { name: "IsCurrentVersion" },
      type: "primitive",
    },
    {
      propertyName: "properties",
      xmlOptions: { name: "Properties" },
      type: "object",
      deserializer: blobPropertiesInternalXmlObjectDeserializer,
    },
    {
      propertyName: "metadata",
      xmlOptions: { name: "Metadata" },
      type: "object",
      deserializer: blobMetadataXmlObjectDeserializer,
    },
    {
      propertyName: "blobTags",
      xmlOptions: { name: "BlobTags" },
      type: "object",
      deserializer: blobTagsXmlObjectDeserializer,
    },
    {
      propertyName: "objectReplicationMetadata",
      xmlOptions: { name: "OrMetadata" },
      type: "object",
      deserializer: objectReplicationMetadataXmlObjectDeserializer,
    },
    { propertyName: "hasVersionsOnly", xmlOptions: { name: "HasVersionsOnly" }, type: "primitive" },
  ];
  return deserializeFromXml<BlobItemInternal>(xmlString, properties, "Blob");
}

export function blobItemInternalXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): BlobItemInternal {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "Name" },
      type: "object",
      deserializer: blobNameXmlObjectDeserializer,
    },
    { propertyName: "deleted", xmlOptions: { name: "Deleted" }, type: "primitive" },
    { propertyName: "snapshot", xmlOptions: { name: "Snapshot" }, type: "primitive" },
    { propertyName: "versionId", xmlOptions: { name: "VersionId" }, type: "primitive" },
    {
      propertyName: "isCurrentVersion",
      xmlOptions: { name: "IsCurrentVersion" },
      type: "primitive",
    },
    {
      propertyName: "properties",
      xmlOptions: { name: "Properties" },
      type: "object",
      deserializer: blobPropertiesInternalXmlObjectDeserializer,
    },
    {
      propertyName: "metadata",
      xmlOptions: { name: "Metadata" },
      type: "object",
      deserializer: blobMetadataXmlObjectDeserializer,
    },
    {
      propertyName: "blobTags",
      xmlOptions: { name: "BlobTags" },
      type: "object",
      deserializer: blobTagsXmlObjectDeserializer,
    },
    {
      propertyName: "objectReplicationMetadata",
      xmlOptions: { name: "OrMetadata" },
      type: "object",
      deserializer: objectReplicationMetadataXmlObjectDeserializer,
    },
    { propertyName: "hasVersionsOnly", xmlOptions: { name: "HasVersionsOnly" }, type: "primitive" },
  ];
  return deserializeXmlObject<BlobItemInternal>(xmlObject, properties);
}

/** Represents a blob name. */
export interface BlobName {
  /** Whether the blob name is encoded. */
  encoded?: boolean;
  /** The blob name. */
  content?: string;
}

export function blobNameDeserializer(item: any): BlobName {
  return {
    encoded: item["encoded"],
    content: item["content"],
  };
}

export function blobNameXmlDeserializer(xmlString: string): BlobName {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "encoded",
      xmlOptions: { name: "Encoded", attribute: true },
      type: "primitive",
    },
    {
      propertyName: "content",
      xmlOptions: { name: "content", unwrapped: true },
      type: "primitive",
    },
  ];
  return deserializeFromXml<BlobName>(xmlString, properties, "BlobName");
}

export function blobNameXmlObjectDeserializer(xmlObject: Record<string, unknown>): BlobName {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "encoded",
      xmlOptions: { name: "Encoded", attribute: true },
      type: "primitive",
    },
    {
      propertyName: "content",
      xmlOptions: { name: "content", unwrapped: true },
      type: "primitive",
    },
  ];
  return deserializeXmlObject<BlobName>(xmlObject, properties);
}

/** The properties of a blob. */
export interface BlobPropertiesInternal {
  /** The date-time the blob was created in RFC1123 format. */
  createdOn?: Date;
  /** The date-time the blob was last modified in RFC1123 format. */
  lastModified: Date;
  /** The blob ETag. */
  etag: string;
  /** The content length of the blob. */
  contentLength?: number;
  /** The content type of the blob. */
  contentType?: string;
  /** The content encoding of the blob. */
  contentEncoding?: string;
  /** The content language of the blob. */
  contentLanguage?: string;
  /** The content MD5 of the blob. */
  contentMd5?: Uint8Array;
  /** The content disposition of the blob. */
  contentDisposition?: string;
  /** The cache control of the blob. */
  cacheControl?: string;
  /** The sequence number of the blob. */
  blobSequenceNumber?: number;
  /** The blob type. */
  blobType?: BlobType;
  /** The lease status of the blob. */
  leaseStatus?: LeaseStatus;
  /** The lease state of the blob. */
  leaseState?: LeaseState;
  /** The lease duration of the blob. */
  leaseDuration?: LeaseDuration;
  /** The copy ID of the blob. */
  copyId?: string;
  /** The copy status of the blob. */
  copyStatus?: CopyStatus;
  /** The copy source of the blob. */
  copySource?: string;
  /** The copy progress of the blob. */
  copyProgress?: string;
  /** The copy completion time of the blob. */
  copyCompletedOn?: Date;
  /** The copy status description of the blob. */
  copyStatusDescription?: string;
  /** Whether the blob is encrypted on the server. */
  serverEncrypted?: boolean;
  /** Whether the blob is incremental copy. */
  incrementalCopy?: boolean;
  /** The name of the destination snapshot. */
  destinationSnapshot?: string;
  /** The time the blob was deleted. */
  deletedOn?: Date;
  /** The remaining retention days of the blob. */
  remainingRetentionDays?: number;
  /** The access tier of the blob. */
  accessTier?: AccessTier;
  /** Whether the access tier is inferred. */
  accessTierInferred?: boolean;
  /** The archive status of the blob. */
  archiveStatus?: ArchiveStatus;
  /** Customer provided key sha256 */
  customerProvidedKeySha256?: string;
  /** The encryption scope of the blob. */
  encryptionScope?: string;
  /** The access tier change time of the blob. */
  accessTierChangedOn?: Date;
  /** The number of tags for the blob. */
  tagCount?: number;
  /** The expire time of the blob. */
  expiresOn?: Date;
  /** Whether the blob is sealed. */
  isSealed?: boolean;
  /** The rehydrate priority of the blob. */
  rehydratePriority?: RehydratePriority;
  /** The last access time of the blob. */
  lastAccessedOn?: Date;
  /** The immutability policy until time of the blob. */
  immutabilityPolicyExpiresOn?: Date;
  /** The immutability policy mode of the blob. */
  immutabilityPolicyMode?: ImmutabilityPolicyMode;
  /** Whether the blob is under legal hold. */
  legalHold?: boolean;
}

export function blobPropertiesInternalDeserializer(item: any): BlobPropertiesInternal {
  return {
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    lastModified: new Date(item["lastModified"]),
    etag: item["etag"],
    contentLength: item["contentLength"],
    contentType: item["contentType"],
    contentEncoding: item["contentEncoding"],
    contentLanguage: item["contentLanguage"],
    contentMd5: !item["contentMd5"]
      ? item["contentMd5"]
      : typeof item["contentMd5"] === "string"
        ? stringToUint8Array(item["contentMd5"], "base64")
        : item["contentMd5"],
    contentDisposition: item["contentDisposition"],
    cacheControl: item["cacheControl"],
    blobSequenceNumber: item["blobSequenceNumber"],
    blobType: item["blobType"],
    leaseStatus: item["leaseStatus"],
    leaseState: item["leaseState"],
    leaseDuration: item["leaseDuration"],
    copyId: item["copyId"],
    copyStatus: item["copyStatus"],
    copySource: item["copySource"],
    copyProgress: item["copyProgress"],
    copyCompletedOn: !item["copyCompletedOn"]
      ? item["copyCompletedOn"]
      : new Date(item["copyCompletedOn"]),
    copyStatusDescription: item["copyStatusDescription"],
    serverEncrypted: item["serverEncrypted"],
    incrementalCopy: item["incrementalCopy"],
    destinationSnapshot: item["destinationSnapshot"],
    deletedOn: !item["deletedOn"] ? item["deletedOn"] : new Date(item["deletedOn"]),
    remainingRetentionDays: item["remainingRetentionDays"],
    accessTier: item["accessTier"],
    accessTierInferred: item["accessTierInferred"],
    archiveStatus: item["archiveStatus"],
    customerProvidedKeySha256: item["customerProvidedKeySha256"],
    encryptionScope: item["encryptionScope"],
    accessTierChangedOn: !item["accessTierChangedOn"]
      ? item["accessTierChangedOn"]
      : new Date(item["accessTierChangedOn"]),
    tagCount: item["tagCount"],
    expiresOn: !item["ExpiresOn"] ? item["ExpiresOn"] : new Date(item["ExpiresOn"]),
    isSealed: item["IsSealed"],
    rehydratePriority: item["rehydratePriority"],
    lastAccessedOn: !item["LastAccessedOn"]
      ? item["LastAccessedOn"]
      : new Date(item["LastAccessedOn"]),
    immutabilityPolicyExpiresOn: !item["ImmutabilityPolicyExpiresOn"]
      ? item["ImmutabilityPolicyExpiresOn"]
      : new Date(item["ImmutabilityPolicyExpiresOn"]),
    immutabilityPolicyMode: item["immutabilityPolicyMode"],
    legalHold: item["legalHold"],
  };
}

export function blobPropertiesInternalXmlDeserializer(xmlString: string): BlobPropertiesInternal {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "createdOn",
      xmlOptions: { name: "Creation-Time" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "lastModified",
      xmlOptions: { name: "Last-Modified" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    { propertyName: "etag", xmlOptions: { name: "Etag" }, type: "primitive" },
    { propertyName: "contentLength", xmlOptions: { name: "Content-Length" }, type: "primitive" },
    { propertyName: "contentType", xmlOptions: { name: "Content-Type" }, type: "primitive" },
    {
      propertyName: "contentEncoding",
      xmlOptions: { name: "Content-Encoding" },
      type: "primitive",
    },
    {
      propertyName: "contentLanguage",
      xmlOptions: { name: "Content-Language" },
      type: "primitive",
    },
    { propertyName: "contentMd5", xmlOptions: { name: "Content-MD5" }, type: "bytes" },
    {
      propertyName: "contentDisposition",
      xmlOptions: { name: "Content-Disposition" },
      type: "primitive",
    },
    { propertyName: "cacheControl", xmlOptions: { name: "Cache-Control" }, type: "primitive" },
    {
      propertyName: "blobSequenceNumber",
      xmlOptions: { name: "x-ms-blob-sequence-number" },
      type: "primitive",
    },
    { propertyName: "blobType", xmlOptions: { name: "BlobType" }, type: "primitive" },
    { propertyName: "leaseStatus", xmlOptions: { name: "LeaseStatus" }, type: "primitive" },
    { propertyName: "leaseState", xmlOptions: { name: "LeaseState" }, type: "primitive" },
    { propertyName: "leaseDuration", xmlOptions: { name: "LeaseDuration" }, type: "primitive" },
    { propertyName: "copyId", xmlOptions: { name: "CopyId" }, type: "primitive" },
    { propertyName: "copyStatus", xmlOptions: { name: "CopyStatus" }, type: "primitive" },
    { propertyName: "copySource", xmlOptions: { name: "CopySource" }, type: "primitive" },
    { propertyName: "copyProgress", xmlOptions: { name: "CopyProgress" }, type: "primitive" },
    {
      propertyName: "copyCompletedOn",
      xmlOptions: { name: "CopyCompletionTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "copyStatusDescription",
      xmlOptions: { name: "CopyStatusDescription" },
      type: "primitive",
    },
    { propertyName: "serverEncrypted", xmlOptions: { name: "ServerEncrypted" }, type: "primitive" },
    { propertyName: "incrementalCopy", xmlOptions: { name: "IncrementalCopy" }, type: "primitive" },
    {
      propertyName: "destinationSnapshot",
      xmlOptions: { name: "DestinationSnapshot" },
      type: "primitive",
    },
    {
      propertyName: "deletedOn",
      xmlOptions: { name: "DeletedTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "remainingRetentionDays",
      xmlOptions: { name: "RemainingRetentionDays" },
      type: "primitive",
    },
    { propertyName: "accessTier", xmlOptions: { name: "AccessTier" }, type: "primitive" },
    {
      propertyName: "accessTierInferred",
      xmlOptions: { name: "AccessTierInferred" },
      type: "primitive",
    },
    { propertyName: "archiveStatus", xmlOptions: { name: "ArchiveStatus" }, type: "primitive" },
    {
      propertyName: "customerProvidedKeySha256",
      xmlOptions: { name: "CustomerProvidedKeySha256" },
      type: "primitive",
    },
    { propertyName: "encryptionScope", xmlOptions: { name: "EncryptionScope" }, type: "primitive" },
    {
      propertyName: "accessTierChangedOn",
      xmlOptions: { name: "AccessTierChangeTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    { propertyName: "tagCount", xmlOptions: { name: "TagCount" }, type: "primitive" },
    {
      propertyName: "expiresOn",
      xmlOptions: { name: "Expiry-Time" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    { propertyName: "isSealed", xmlOptions: { name: "Sealed" }, type: "primitive" },
    {
      propertyName: "rehydratePriority",
      xmlOptions: { name: "RehydratePriority" },
      type: "primitive",
    },
    {
      propertyName: "lastAccessedOn",
      xmlOptions: { name: "LastAccessTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "immutabilityPolicyExpiresOn",
      xmlOptions: { name: "ImmutabilityPolicyUntilDate" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "immutabilityPolicyMode",
      xmlOptions: { name: "ImmutabilityPolicyMode" },
      type: "primitive",
    },
    { propertyName: "legalHold", xmlOptions: { name: "LegalHold" }, type: "primitive" },
  ];
  return deserializeFromXml<BlobPropertiesInternal>(xmlString, properties, "Properties");
}

export function blobPropertiesInternalXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): BlobPropertiesInternal {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "createdOn",
      xmlOptions: { name: "Creation-Time" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "lastModified",
      xmlOptions: { name: "Last-Modified" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    { propertyName: "etag", xmlOptions: { name: "Etag" }, type: "primitive" },
    { propertyName: "contentLength", xmlOptions: { name: "Content-Length" }, type: "primitive" },
    { propertyName: "contentType", xmlOptions: { name: "Content-Type" }, type: "primitive" },
    {
      propertyName: "contentEncoding",
      xmlOptions: { name: "Content-Encoding" },
      type: "primitive",
    },
    {
      propertyName: "contentLanguage",
      xmlOptions: { name: "Content-Language" },
      type: "primitive",
    },
    { propertyName: "contentMd5", xmlOptions: { name: "Content-MD5" }, type: "bytes" },
    {
      propertyName: "contentDisposition",
      xmlOptions: { name: "Content-Disposition" },
      type: "primitive",
    },
    { propertyName: "cacheControl", xmlOptions: { name: "Cache-Control" }, type: "primitive" },
    {
      propertyName: "blobSequenceNumber",
      xmlOptions: { name: "x-ms-blob-sequence-number" },
      type: "primitive",
    },
    { propertyName: "blobType", xmlOptions: { name: "BlobType" }, type: "primitive" },
    { propertyName: "leaseStatus", xmlOptions: { name: "LeaseStatus" }, type: "primitive" },
    { propertyName: "leaseState", xmlOptions: { name: "LeaseState" }, type: "primitive" },
    { propertyName: "leaseDuration", xmlOptions: { name: "LeaseDuration" }, type: "primitive" },
    { propertyName: "copyId", xmlOptions: { name: "CopyId" }, type: "primitive" },
    { propertyName: "copyStatus", xmlOptions: { name: "CopyStatus" }, type: "primitive" },
    { propertyName: "copySource", xmlOptions: { name: "CopySource" }, type: "primitive" },
    { propertyName: "copyProgress", xmlOptions: { name: "CopyProgress" }, type: "primitive" },
    {
      propertyName: "copyCompletedOn",
      xmlOptions: { name: "CopyCompletionTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "copyStatusDescription",
      xmlOptions: { name: "CopyStatusDescription" },
      type: "primitive",
    },
    { propertyName: "serverEncrypted", xmlOptions: { name: "ServerEncrypted" }, type: "primitive" },
    { propertyName: "incrementalCopy", xmlOptions: { name: "IncrementalCopy" }, type: "primitive" },
    {
      propertyName: "destinationSnapshot",
      xmlOptions: { name: "DestinationSnapshot" },
      type: "primitive",
    },
    {
      propertyName: "deletedOn",
      xmlOptions: { name: "DeletedTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "remainingRetentionDays",
      xmlOptions: { name: "RemainingRetentionDays" },
      type: "primitive",
    },
    { propertyName: "accessTier", xmlOptions: { name: "AccessTier" }, type: "primitive" },
    {
      propertyName: "accessTierInferred",
      xmlOptions: { name: "AccessTierInferred" },
      type: "primitive",
    },
    { propertyName: "archiveStatus", xmlOptions: { name: "ArchiveStatus" }, type: "primitive" },
    {
      propertyName: "customerProvidedKeySha256",
      xmlOptions: { name: "CustomerProvidedKeySha256" },
      type: "primitive",
    },
    { propertyName: "encryptionScope", xmlOptions: { name: "EncryptionScope" }, type: "primitive" },
    {
      propertyName: "accessTierChangedOn",
      xmlOptions: { name: "AccessTierChangeTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    { propertyName: "tagCount", xmlOptions: { name: "TagCount" }, type: "primitive" },
    {
      propertyName: "expiresOn",
      xmlOptions: { name: "Expiry-Time" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    { propertyName: "isSealed", xmlOptions: { name: "Sealed" }, type: "primitive" },
    {
      propertyName: "rehydratePriority",
      xmlOptions: { name: "RehydratePriority" },
      type: "primitive",
    },
    {
      propertyName: "lastAccessedOn",
      xmlOptions: { name: "LastAccessTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "immutabilityPolicyExpiresOn",
      xmlOptions: { name: "ImmutabilityPolicyUntilDate" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "immutabilityPolicyMode",
      xmlOptions: { name: "ImmutabilityPolicyMode" },
      type: "primitive",
    },
    { propertyName: "legalHold", xmlOptions: { name: "LegalHold" }, type: "primitive" },
  ];
  return deserializeXmlObject<BlobPropertiesInternal>(xmlObject, properties);
}

/** The blob type. */
export type BlobType = "BlockBlob" | "PageBlob" | "AppendBlob";
/** The copy status. */
export type CopyStatus = "pending" | "success" | "failed" | "aborted";
/** The access tiers. */
export type AccessTier =
  | "P4"
  | "P6"
  | "P10"
  | "P15"
  | "P20"
  | "P30"
  | "P40"
  | "P50"
  | "P60"
  | "P70"
  | "P80"
  | "Hot"
  | "Cool"
  | "Archive"
  | "Premium"
  | "Cold";
/** The archive status. */
export type ArchiveStatus =
  | "rehydrate-pending-to-hot"
  | "rehydrate-pending-to-cool"
  | "rehydrate-pending-to-cold";
/** If an object is in rehydrate pending state then this header is returned with priority of rehydrate. Valid values are High and Standard. */
export type RehydratePriority = "High" | "Standard";
/** The immutability policy mode used in requests and responses. */
export type ImmutabilityPolicyMode = "mutable" | "locked" | "unlocked";

/** The blob metadata. */
export interface BlobMetadata {
  /** Whether the blob metadata is encrypted. */
  encrypted?: string;
  /** Additional properties */
  additionalProperties?: Record<string, string>;
}

export function blobMetadataDeserializer(item: any): BlobMetadata {
  return {
    additionalProperties: serializeRecord(item, ["encrypted"]),
    encrypted: item["encrypted"],
  };
}

export function blobMetadataXmlDeserializer(xmlString: string): BlobMetadata {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "encrypted",
      xmlOptions: { name: "Encrypted", attribute: true },
      type: "primitive",
    },
  ];
  return deserializeFromXml<BlobMetadata>(xmlString, properties, "BlobMetadata");
}

export function blobMetadataXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): BlobMetadata {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "encrypted",
      xmlOptions: { name: "Encrypted", attribute: true },
      type: "primitive",
    },
  ];
  return deserializeXmlObject<BlobMetadata>(xmlObject, properties);
}

/** The object replication metadata. */
export interface ObjectReplicationMetadata {
  /** Additional properties */
  additionalProperties?: Record<string, string>;
}

export function objectReplicationMetadataDeserializer(item: any): ObjectReplicationMetadata {
  return {
    additionalProperties: serializeRecord(item, []),
  };
}

export function objectReplicationMetadataXmlDeserializer(
  xmlString: string,
): ObjectReplicationMetadata {
  const properties: XmlPropertyDeserializeMetadata[] = [];
  return deserializeFromXml<ObjectReplicationMetadata>(xmlString, properties, "OrMetadata");
}

export function objectReplicationMetadataXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): ObjectReplicationMetadata {
  const properties: XmlPropertyDeserializeMetadata[] = [];
  return deserializeXmlObject<ObjectReplicationMetadata>(xmlObject, properties);
}

/** An enumeration of blobs */
export interface ListBlobsHierarchySegmentResponse {
  /** The service endpoint. */
  serviceEndpoint: string;
  /** The container name. */
  containerName: string;
  /** The delimiter of the blobs. */
  delimiter?: string;
  /** The prefix of the blobs. */
  prefix?: string;
  /** The marker of the blobs. */
  marker?: string;
  /** The max results of the blobs. */
  maxResults?: number;
  /** The blob segment. */
  segment: BlobHierarchyListSegment;
  /** The next marker of the blobs. */
  nextMarker?: string;
}

export function listBlobsHierarchySegmentResponseDeserializer(
  item: any,
): ListBlobsHierarchySegmentResponse {
  return {
    serviceEndpoint: item["serviceEndpoint"],
    containerName: item["containerName"],
    delimiter: item["delimiter"],
    prefix: item["prefix"],
    marker: item["marker"],
    maxResults: item["maxResults"],
    segment: blobHierarchyListSegmentDeserializer(item["segment"]),
    nextMarker: item["nextMarker"],
  };
}

export function listBlobsHierarchySegmentResponseXmlDeserializer(
  xmlString: string,
): ListBlobsHierarchySegmentResponse {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "serviceEndpoint",
      xmlOptions: { name: "ServiceEndpoint", attribute: true },
      type: "primitive",
    },
    {
      propertyName: "containerName",
      xmlOptions: { name: "ContainerName", attribute: true },
      type: "primitive",
    },
    { propertyName: "delimiter", xmlOptions: { name: "Delimiter" }, type: "primitive" },
    { propertyName: "prefix", xmlOptions: { name: "Prefix" }, type: "primitive" },
    { propertyName: "marker", xmlOptions: { name: "Marker" }, type: "primitive" },
    { propertyName: "maxResults", xmlOptions: { name: "MaxResults" }, type: "primitive" },
    {
      propertyName: "segment",
      xmlOptions: { name: "Blobs" },
      type: "object",
      deserializer: blobHierarchyListSegmentXmlObjectDeserializer,
    },
    { propertyName: "nextMarker", xmlOptions: { name: "NextMarker" }, type: "primitive" },
  ];
  return deserializeFromXml<ListBlobsHierarchySegmentResponse>(
    xmlString,
    properties,
    "EnumerationResults",
  );
}

export function listBlobsHierarchySegmentResponseXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): ListBlobsHierarchySegmentResponse {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "serviceEndpoint",
      xmlOptions: { name: "ServiceEndpoint", attribute: true },
      type: "primitive",
    },
    {
      propertyName: "containerName",
      xmlOptions: { name: "ContainerName", attribute: true },
      type: "primitive",
    },
    { propertyName: "delimiter", xmlOptions: { name: "Delimiter" }, type: "primitive" },
    { propertyName: "prefix", xmlOptions: { name: "Prefix" }, type: "primitive" },
    { propertyName: "marker", xmlOptions: { name: "Marker" }, type: "primitive" },
    { propertyName: "maxResults", xmlOptions: { name: "MaxResults" }, type: "primitive" },
    {
      propertyName: "segment",
      xmlOptions: { name: "Blobs" },
      type: "object",
      deserializer: blobHierarchyListSegmentXmlObjectDeserializer,
    },
    { propertyName: "nextMarker", xmlOptions: { name: "NextMarker" }, type: "primitive" },
  ];
  return deserializeXmlObject<ListBlobsHierarchySegmentResponse>(xmlObject, properties);
}

/** Represents an array of blobs. */
export interface BlobHierarchyListSegment {
  /** The blob items */
  blobItems: BlobItemInternal[];
  /** The blob prefixes. */
  blobPrefixes?: BlobPrefix[];
}

export function blobHierarchyListSegmentDeserializer(item: any): BlobHierarchyListSegment {
  return {
    blobItems: blobItemInternalArrayDeserializer(item["blobItems"]),
    blobPrefixes: !item["blobPrefixes"]
      ? item["blobPrefixes"]
      : blobPrefixArrayDeserializer(item["blobPrefixes"]),
  };
}

export function blobHierarchyListSegmentXmlDeserializer(
  xmlString: string,
): BlobHierarchyListSegment {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "blobItems",
      xmlOptions: { name: "Blob", unwrapped: true, itemsName: "Blob" },
      type: "array",
      deserializer: blobItemInternalXmlObjectDeserializer,
    },
    {
      propertyName: "blobPrefixes",
      xmlOptions: { name: "BlobPrefix", unwrapped: true, itemsName: "BlobPrefix" },
      type: "array",
      deserializer: blobPrefixXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<BlobHierarchyListSegment>(
    xmlString,
    properties,
    "BlobHierarchyListSegment",
  );
}

export function blobHierarchyListSegmentXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): BlobHierarchyListSegment {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "blobItems",
      xmlOptions: { name: "Blob", unwrapped: true, itemsName: "Blob" },
      type: "array",
      deserializer: blobItemInternalXmlObjectDeserializer,
    },
    {
      propertyName: "blobPrefixes",
      xmlOptions: { name: "BlobPrefix", unwrapped: true, itemsName: "BlobPrefix" },
      type: "array",
      deserializer: blobPrefixXmlObjectDeserializer,
    },
  ];
  return deserializeXmlObject<BlobHierarchyListSegment>(xmlObject, properties);
}

export function blobPrefixArrayDeserializer(result: Array<BlobPrefix>): any[] {
  return result.map((item) => {
    return blobPrefixDeserializer(item);
  });
}

/** Represents a blob prefix. */
export interface BlobPrefix {
  /** The blob name. */
  name: BlobName;
}

export function blobPrefixDeserializer(item: any): BlobPrefix {
  return {
    name: blobNameDeserializer(item["name"]),
  };
}

export function blobPrefixXmlDeserializer(xmlString: string): BlobPrefix {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "Name" },
      type: "object",
      deserializer: blobNameXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<BlobPrefix>(xmlString, properties, "BlobPrefix");
}

export function blobPrefixXmlObjectDeserializer(xmlObject: Record<string, unknown>): BlobPrefix {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "Name" },
      type: "object",
      deserializer: blobNameXmlObjectDeserializer,
    },
  ];
  return deserializeXmlObject<BlobPrefix>(xmlObject, properties);
}

/** Represents a page list. */
export interface PageList {
  /** The page ranges. */
  pageRange?: PageRange[];
  /** The clear ranges. */
  clearRange?: ClearRange[];
  /** The next marker. */
  nextMarker?: string;
}

export function pageListDeserializer(item: any): PageList {
  return {
    pageRange: !item["pageRange"]
      ? item["pageRange"]
      : pageRangeArrayDeserializer(item["pageRange"]),
    clearRange: !item["clearRange"]
      ? item["clearRange"]
      : clearRangeArrayDeserializer(item["clearRange"]),
    nextMarker: item["nextMarker"],
  };
}

export function pageListXmlDeserializer(xmlString: string): PageList {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "pageRange",
      xmlOptions: { name: "PageRange", unwrapped: true, itemsName: "PageRange" },
      type: "array",
      deserializer: pageRangeXmlObjectDeserializer,
    },
    {
      propertyName: "clearRange",
      xmlOptions: { name: "ClearRange", unwrapped: true, itemsName: "ClearRange" },
      type: "array",
      deserializer: clearRangeXmlObjectDeserializer,
    },
    { propertyName: "nextMarker", xmlOptions: { name: "NextMarker" }, type: "primitive" },
  ];
  return deserializeFromXml<PageList>(xmlString, properties, "PageList");
}

export function pageListXmlObjectDeserializer(xmlObject: Record<string, unknown>): PageList {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "pageRange",
      xmlOptions: { name: "PageRange", unwrapped: true, itemsName: "PageRange" },
      type: "array",
      deserializer: pageRangeXmlObjectDeserializer,
    },
    {
      propertyName: "clearRange",
      xmlOptions: { name: "ClearRange", unwrapped: true, itemsName: "ClearRange" },
      type: "array",
      deserializer: clearRangeXmlObjectDeserializer,
    },
    { propertyName: "nextMarker", xmlOptions: { name: "NextMarker" }, type: "primitive" },
  ];
  return deserializeXmlObject<PageList>(xmlObject, properties);
}

export function pageRangeArrayDeserializer(result: Array<PageRange>): any[] {
  return result.map((item) => {
    return pageRangeDeserializer(item);
  });
}

/** The page range. */
export interface PageRange {
  /** The start of the byte range. */
  start: number;
  /** The end of the byte range. */
  end: number;
}

export function pageRangeDeserializer(item: any): PageRange {
  return {
    start: item["start"],
    end: item["end"],
  };
}

export function pageRangeXmlDeserializer(xmlString: string): PageRange {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "start", xmlOptions: { name: "Start" }, type: "primitive" },
    { propertyName: "end", xmlOptions: { name: "End" }, type: "primitive" },
  ];
  return deserializeFromXml<PageRange>(xmlString, properties, "PageRange");
}

export function pageRangeXmlObjectDeserializer(xmlObject: Record<string, unknown>): PageRange {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "start", xmlOptions: { name: "Start" }, type: "primitive" },
    { propertyName: "end", xmlOptions: { name: "End" }, type: "primitive" },
  ];
  return deserializeXmlObject<PageRange>(xmlObject, properties);
}

export function clearRangeArrayDeserializer(result: Array<ClearRange>): any[] {
  return result.map((item) => {
    return clearRangeDeserializer(item);
  });
}

/** The clear range. */
export interface ClearRange {
  /** The start of the byte range. */
  start: number;
  /** The end of the byte range. */
  end: number;
}

export function clearRangeDeserializer(item: any): ClearRange {
  return {
    start: item["start"],
    end: item["end"],
  };
}

export function clearRangeXmlDeserializer(xmlString: string): ClearRange {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "start", xmlOptions: { name: "Start" }, type: "primitive" },
    { propertyName: "end", xmlOptions: { name: "End" }, type: "primitive" },
  ];
  return deserializeFromXml<ClearRange>(xmlString, properties, "ClearRange");
}

export function clearRangeXmlObjectDeserializer(xmlObject: Record<string, unknown>): ClearRange {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "start", xmlOptions: { name: "Start" }, type: "primitive" },
    { propertyName: "end", xmlOptions: { name: "End" }, type: "primitive" },
  ];
  return deserializeXmlObject<ClearRange>(xmlObject, properties);
}

/** The Block lookup list. */
export interface BlockLookupList {
  /** The committed blocks */
  committed?: Uint8Array[];
  /** The uncommitted blocks */
  uncommitted?: Uint8Array[];
  /** The latest blocks */
  latest?: Uint8Array[];
}

export function blockLookupListSerializer(item: BlockLookupList): any {
  return {
    committed: !item["committed"]
      ? item["committed"]
      : item["committed"].map((p: any) => {
          return uint8ArrayToString(p, "base64");
        }),
    uncommitted: !item["uncommitted"]
      ? item["uncommitted"]
      : item["uncommitted"].map((p: any) => {
          return uint8ArrayToString(p, "base64");
        }),
    latest: !item["latest"]
      ? item["latest"]
      : item["latest"].map((p: any) => {
          return uint8ArrayToString(p, "base64");
        }),
  };
}

export function blockLookupListXmlSerializer(item: BlockLookupList): string {
  const properties: XmlPropertyMetadata[] = [
    {
      propertyName: "committed",
      xmlOptions: { name: "Committed", unwrapped: true, itemsName: "Committed" },
      type: "array",
    },
    {
      propertyName: "uncommitted",
      xmlOptions: { name: "Uncommitted", unwrapped: true, itemsName: "Uncommitted" },
      type: "array",
    },
    {
      propertyName: "latest",
      xmlOptions: { name: "Latest", unwrapped: true, itemsName: "Latest" },
      type: "array",
    },
  ];
  return serializeToXml(item, properties, "BlockList");
}

/** Contains the committed and uncommitted blocks in a block blob. */
export interface BlockList {
  /** The list of committed blocks. */
  committedBlocks?: Block[];
  /** The list of uncommitted blocks. */
  uncommittedBlocks?: Block[];
}

export function blockListDeserializer(item: any): BlockList {
  return {
    committedBlocks: !item["committedBlocks"]
      ? item["committedBlocks"]
      : blockArrayDeserializer(item["committedBlocks"]),
    uncommittedBlocks: !item["uncommittedBlocks"]
      ? item["uncommittedBlocks"]
      : blockArrayDeserializer(item["uncommittedBlocks"]),
  };
}

export function blockListXmlDeserializer(xmlString: string): BlockList {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "committedBlocks",
      xmlOptions: { name: "CommittedBlocks", itemsName: "Block" },
      type: "array",
      deserializer: blockXmlObjectDeserializer,
    },
    {
      propertyName: "uncommittedBlocks",
      xmlOptions: { name: "UncommittedBlocks", itemsName: "Block" },
      type: "array",
      deserializer: blockXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<BlockList>(xmlString, properties, "BlockList");
}

export function blockListXmlObjectDeserializer(xmlObject: Record<string, unknown>): BlockList {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "committedBlocks",
      xmlOptions: { name: "CommittedBlocks", itemsName: "Block" },
      type: "array",
      deserializer: blockXmlObjectDeserializer,
    },
    {
      propertyName: "uncommittedBlocks",
      xmlOptions: { name: "UncommittedBlocks", itemsName: "Block" },
      type: "array",
      deserializer: blockXmlObjectDeserializer,
    },
  ];
  return deserializeXmlObject<BlockList>(xmlObject, properties);
}

export function blockArrayDeserializer(result: Array<Block>): any[] {
  return result.map((item) => {
    return blockDeserializer(item);
  });
}

/** Represents a single block in a block blob. It describes the block's ID and size. */
export interface Block {
  /** The base64 encoded block ID. */
  name: Uint8Array;
  /** The block size in bytes. */
  size: number;
}

export function blockDeserializer(item: any): Block {
  return {
    name:
      typeof item["name"] === "string" ? stringToUint8Array(item["name"], "base64") : item["name"],
    size: item["size"],
  };
}

export function blockXmlDeserializer(xmlString: string): Block {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "name", xmlOptions: { name: "Name" }, type: "bytes" },
    { propertyName: "size", xmlOptions: { name: "Size" }, type: "primitive" },
  ];
  return deserializeFromXml<Block>(xmlString, properties, "Block");
}

export function blockXmlObjectDeserializer(xmlObject: Record<string, unknown>): Block {
  const properties: XmlPropertyDeserializeMetadata[] = [
    { propertyName: "name", xmlOptions: { name: "Name" }, type: "bytes" },
    { propertyName: "size", xmlOptions: { name: "Size" }, type: "primitive" },
  ];
  return deserializeXmlObject<Block>(xmlObject, properties);
}

/** Groups the set of query request settings. */
export interface QueryRequest {
  /** Required. The type of the provided query expression. */
  queryType: QueryRequestType;
  /** The query expression in SQL. The maximum size of the query expression is 256KiB. */
  expression: string;
  /** The input serialization settings. */
  inputSerialization?: QuerySerialization;
  /** The output serialization settings. */
  outputSerialization?: QuerySerialization;
}

export function queryRequestSerializer(item: QueryRequest): any {
  return {
    queryType: item["queryType"],
    expression: item["expression"],
    inputSerialization: !item["inputSerialization"]
      ? item["inputSerialization"]
      : querySerializationSerializer(item["inputSerialization"]),
    outputSerialization: !item["outputSerialization"]
      ? item["outputSerialization"]
      : querySerializationSerializer(item["outputSerialization"]),
  };
}

export function queryRequestXmlSerializer(item: QueryRequest): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "queryType", xmlOptions: { name: "QueryType" }, type: "primitive" },
    { propertyName: "expression", xmlOptions: { name: "Expression" }, type: "primitive" },
    {
      propertyName: "inputSerialization",
      xmlOptions: { name: "InputSerialization" },
      type: "object",
      serializer: querySerializationSerializer,
    },
    {
      propertyName: "outputSerialization",
      xmlOptions: { name: "OutputSerialization" },
      type: "object",
      serializer: querySerializationSerializer,
    },
  ];
  return serializeToXml(item, properties, "QueryRequest");
}

/** The query request, note only SQL supported */
export type QueryRequestType = "SQL";

/** The query serialization settings. */
export interface QuerySerialization {
  /** The query format. */
  format: QueryFormat;
}

export function querySerializationSerializer(item: QuerySerialization): any {
  return { format: queryFormatSerializer(item["format"]) };
}

export function querySerializationXmlSerializer(item: QuerySerialization): string {
  const properties: XmlPropertyMetadata[] = [
    {
      propertyName: "format",
      xmlOptions: { name: "Format" },
      type: "object",
      serializer: queryFormatSerializer,
    },
  ];
  return serializeToXml(item, properties, "QuerySerialization");
}

/** The query format settings. */
export interface QueryFormat {
  /** The query type. */
  type: QueryType;
  /** The delimited text configuration. */
  delimitedTextConfiguration?: DelimitedTextConfiguration;
  /** The JSON text configuration. */
  jsonTextConfiguration?: JsonTextConfiguration;
  /** The Apache Arrow configuration. */
  arrowConfiguration?: ArrowConfiguration;
  /** The Parquet configuration. */
  parquetTextConfiguration?: ParquetConfiguration;
}

export function queryFormatSerializer(item: QueryFormat): any {
  return {
    type: item["type"],
    delimitedTextConfiguration: !item["delimitedTextConfiguration"]
      ? item["delimitedTextConfiguration"]
      : delimitedTextConfigurationSerializer(item["delimitedTextConfiguration"]),
    jsonTextConfiguration: !item["jsonTextConfiguration"]
      ? item["jsonTextConfiguration"]
      : jsonTextConfigurationSerializer(item["jsonTextConfiguration"]),
    arrowConfiguration: !item["arrowConfiguration"]
      ? item["arrowConfiguration"]
      : arrowConfigurationSerializer(item["arrowConfiguration"]),
    parquetTextConfiguration: !item["parquetTextConfiguration"]
      ? item["parquetTextConfiguration"]
      : parquetConfigurationSerializer(item["parquetTextConfiguration"]),
  };
}

export function queryFormatXmlSerializer(item: QueryFormat): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "type", xmlOptions: { name: "Type" }, type: "primitive" },
    {
      propertyName: "delimitedTextConfiguration",
      xmlOptions: { name: "DelimitedTextConfiguration" },
      type: "object",
      serializer: delimitedTextConfigurationSerializer,
    },
    {
      propertyName: "jsonTextConfiguration",
      xmlOptions: { name: "JsonTextConfiguration" },
      type: "object",
      serializer: jsonTextConfigurationSerializer,
    },
    {
      propertyName: "arrowConfiguration",
      xmlOptions: { name: "ArrowConfiguration" },
      type: "object",
      serializer: arrowConfigurationSerializer,
    },
    {
      propertyName: "parquetTextConfiguration",
      xmlOptions: { name: "ParquetConfiguration" },
      type: "object",
      serializer: parquetConfigurationSerializer,
    },
  ];
  return serializeToXml(item, properties, "QueryFormat");
}

/** The query format type. */
export type QueryType = "delimited" | "json" | "arrow" | "parquet";

/** Represents the delimited text configuration. */
export interface DelimitedTextConfiguration {
  /** The string used to separate columns. */
  columnSeparator?: string;
  /** The string used to quote a specific field. */
  fieldQuote?: string;
  /** The string used to separate records. */
  recordSeparator?: string;
  /** The string used to escape a quote character in a field. */
  escapeChar?: string;
  /** Represents whether the data has headers. */
  headersPresent?: boolean;
}

export function delimitedTextConfigurationSerializer(item: DelimitedTextConfiguration): any {
  return {
    columnSeparator: item["columnSeparator"],
    fieldQuote: item["fieldQuote"],
    recordSeparator: item["recordSeparator"],
    escapeChar: item["escapeChar"],
    headersPresent: item["headersPresent"],
  };
}

export function delimitedTextConfigurationXmlSerializer(item: DelimitedTextConfiguration): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "columnSeparator", xmlOptions: { name: "ColumnSeparator" }, type: "primitive" },
    { propertyName: "fieldQuote", xmlOptions: { name: "FieldQuote" }, type: "primitive" },
    { propertyName: "recordSeparator", xmlOptions: { name: "RecordSeparator" }, type: "primitive" },
    { propertyName: "escapeChar", xmlOptions: { name: "EscapeChar" }, type: "primitive" },
    { propertyName: "headersPresent", xmlOptions: { name: "HasHeaders" }, type: "primitive" },
  ];
  return serializeToXml(item, properties, "DelimitedTextConfiguration");
}

/** Represents the JSON text configuration. */
export interface JsonTextConfiguration {
  /** The string used to separate records. */
  recordSeparator?: string;
}

export function jsonTextConfigurationSerializer(item: JsonTextConfiguration): any {
  return { recordSeparator: item["recordSeparator"] };
}

export function jsonTextConfigurationXmlSerializer(item: JsonTextConfiguration): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "recordSeparator", xmlOptions: { name: "RecordSeparator" }, type: "primitive" },
  ];
  return serializeToXml(item, properties, "JsonTextConfiguration");
}

/** Represents the Apache Arrow configuration. */
export interface ArrowConfiguration {
  /** The Apache Arrow schema */
  schema: ArrowField[];
}

export function arrowConfigurationSerializer(item: ArrowConfiguration): any {
  return { schema: arrowFieldArraySerializer(item["schema"]) };
}

export function arrowConfigurationXmlSerializer(item: ArrowConfiguration): string {
  const properties: XmlPropertyMetadata[] = [
    {
      propertyName: "schema",
      xmlOptions: { name: "Schema", itemsName: "Field" },
      type: "array",
      serializer: arrowFieldSerializer,
    },
  ];
  return serializeToXml(item, properties, "ArrowConfiguration");
}

export function arrowFieldArraySerializer(result: Array<ArrowField>): any[] {
  return result.map((item) => {
    return arrowFieldSerializer(item);
  });
}

/** Represents an Apache Arrow field. */
export interface ArrowField {
  /** The arrow field type. */
  type: string;
  /** The arrow field name. */
  name?: string;
  /** The arrow field precision. */
  precision?: number;
  /** The arrow field scale. */
  scale?: number;
}

export function arrowFieldSerializer(item: ArrowField): any {
  return {
    type: item["type"],
    name: item["name"],
    precision: item["precision"],
    scale: item["scale"],
  };
}

export function arrowFieldXmlSerializer(item: ArrowField): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "type", xmlOptions: { name: "Type" }, type: "primitive" },
    { propertyName: "name", xmlOptions: { name: "Name" }, type: "primitive" },
    { propertyName: "precision", xmlOptions: { name: "Precision" }, type: "primitive" },
    { propertyName: "scale", xmlOptions: { name: "Scale" }, type: "primitive" },
  ];
  return serializeToXml(item, properties, "Field");
}

/** Represents the Parquet configuration. */
export interface ParquetConfiguration {
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function parquetConfigurationSerializer(item: ParquetConfiguration): any {
  return { ...serializeRecord(item.additionalProperties ?? {}) };
}

export function parquetConfigurationXmlSerializer(item: ParquetConfiguration): string {
  const properties: XmlPropertyMetadata[] = [];
  return serializeToXml(item, properties, "ParquetConfiguration");
}

/** Include this parameter to specify that the container's metadata be returned as part of the response body. */
export type ListContainersIncludeType = "metadata" | "deleted" | "system";
/** The SKU types */
export type SkuName =
  | "Standard_LRS"
  | "Standard_GRS"
  | "Standard_RAGRS"
  | "Standard_ZRS"
  | "Premium_LRS"
  | "Standard_GZRS"
  | "Premium_ZRS"
  | "Standard_RAGZRS";
/** The account kind. */
export type AccountKind =
  | "Storage"
  | "BlobStorage"
  | "StorageV2"
  | "FileStorage"
  | "BlockBlobStorage";
/** The filter blobs includes. */
export type FilterBlobsIncludeItem = "none" | "versions";

/** The Azure.Storage.Blob service versions. */
export enum KnownVersions {
  /** The 2025-11-05 version of the Azure.Storage.Blob service. */
  V20251105 = "2025-11-05",
  /** The 2026-02-06 version of the Azure.Storage.Blob service. */
  V20260206 = "2026-02-06",
  /** The 2026-04-06 version of the Azure.Storage.Blob service. */
  V20260406 = "2026-04-06",
}

/** The list blob includes parameter values. */
export type ListBlobsIncludeItem =
  | "copy"
  | "deleted"
  | "metadata"
  | "snapshots"
  | "uncommittedblobs"
  | "versions"
  | "tags"
  | "immutabilitypolicy"
  | "legalhold"
  | "deletedwithversions";
/** The algorithm used to produce the encryption key hash. Currently, the only accepted value is \"AES256\". Must be provided if the x-ms-encryption-key header is provided. */
export type EncryptionAlgorithmType = "AES256";
/** The delete snapshots option type. */
export type DeleteSnapshotsOptionType = "only" | "include";
/** The type of blob deletions. */
export type BlobDeleteType = "Permanent";
/** The blob expiration options. */
export type BlobExpiryOptions = "NeverExpire" | "RelativeToCreation" | "RelativeToNow" | "Absolute";
/** The blob copy source tags types. */
export type BlobCopySourceTags = "REPLACE" | "COPY";
/** The file share token intent types. */
export type FileShareTokenIntent = "backup";
/** The premium page blob access tier types. */
export type PremiumPageBlobAccessTier =
  | "P4"
  | "P6"
  | "P10"
  | "P15"
  | "P20"
  | "P30"
  | "P40"
  | "P50"
  | "P60"
  | "P70"
  | "P80";
/** The sequence number actions. */
export type SequenceNumberActionType = "increment" | "max" | "update";
/** The block list types. */
export type BlockListType = "committed" | "uncommitted" | "all";
