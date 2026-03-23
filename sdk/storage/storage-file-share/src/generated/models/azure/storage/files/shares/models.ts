// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  XmlPropertyMetadata,
  XmlPropertyDeserializeMetadata,
  serializeToXml,
  deserializeFromXml,
  deserializeXmlObject,
  XmlSerializedObject,
} from "../../../../../static-helpers/serialization/xml-helpers.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Storage service properties. */
export interface FileServiceProperties {
  /** A summary of request statistics grouped by API in hourly aggregates for files. */
  hourMetrics?: Metrics;
  /** A summary of request statistics grouped by API in minute aggregates for files. */
  minuteMetrics?: Metrics;
  /** The set of CORS rules. */
  cors?: CorsRule[];
  /** Protocol settings */
  protocol?: ShareProtocolSettings;
}

export function fileServicePropertiesSerializer(item: FileServiceProperties): any {
  return {
    hourMetrics: !item["hourMetrics"]
      ? item["hourMetrics"]
      : metricsSerializer(item["hourMetrics"]),
    minuteMetrics: !item["minuteMetrics"]
      ? item["minuteMetrics"]
      : metricsSerializer(item["minuteMetrics"]),
    cors: !item["cors"] ? item["cors"] : corsRuleArraySerializer(item["cors"]),
    protocol: !item["protocol"]
      ? item["protocol"]
      : shareProtocolSettingsSerializer(item["protocol"]),
  };
}

export function fileServicePropertiesDeserializer(item: any): FileServiceProperties {
  return {
    hourMetrics: !item["hourMetrics"]
      ? item["hourMetrics"]
      : metricsDeserializer(item["hourMetrics"]),
    minuteMetrics: !item["minuteMetrics"]
      ? item["minuteMetrics"]
      : metricsDeserializer(item["minuteMetrics"]),
    cors: !item["cors"] ? item["cors"] : corsRuleArrayDeserializer(item["cors"]),
    protocol: !item["protocol"]
      ? item["protocol"]
      : shareProtocolSettingsDeserializer(item["protocol"]),
  };
}

export function fileServicePropertiesXmlSerializer(item: FileServiceProperties): string {
  const properties: XmlPropertyMetadata[] = [
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
    {
      propertyName: "protocol",
      xmlOptions: { name: "ProtocolSettings" },
      type: "object",
      serializer: shareProtocolSettingsXmlObjectSerializer,
    },
  ];
  return serializeToXml(item, properties, "StorageServiceProperties");
}

export function fileServicePropertiesXmlDeserializer(xmlString: string): FileServiceProperties {
  const properties: XmlPropertyDeserializeMetadata[] = [
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
      propertyName: "protocol",
      xmlOptions: { name: "ProtocolSettings" },
      type: "object",
      deserializer: shareProtocolSettingsXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<FileServiceProperties>(
    xmlString,
    properties,
    "StorageServiceProperties",
  );
}

/** Storage Analytics metrics for file service. */
export interface Metrics {
  /** The version of Storage Analytics to configure. */
  version: string;
  /** Indicates whether metrics are enabled for the File service. */
  enabled: boolean;
  /**
   * Indicates whether metrics should generate summary statistics for called API
   * operations.
   */
  includeAPIs?: boolean;
  /** The retention policy. */
  retentionPolicy?: RetentionPolicy;
}

export function metricsSerializer(item: Metrics): any {
  return {
    version: item["version"],
    enabled: item["enabled"],
    includeAPIs: item["includeAPIs"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function metricsDeserializer(item: any): Metrics {
  return {
    version: item["version"],
    enabled: item["enabled"],
    includeAPIs: item["includeAPIs"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

export function metricsXmlSerializer(item: Metrics): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "version", xmlOptions: { name: "Version" }, type: "primitive" },
    { propertyName: "enabled", xmlOptions: { name: "Enabled" }, type: "primitive" },
    { propertyName: "includeAPIs", xmlOptions: { name: "IncludeAPIs" }, type: "primitive" },
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
      propertyName: "includeAPIs",
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
    IncludeAPIs: item["includeAPIs"],
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
      propertyName: "includeAPIs",
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

/** The retention policy. */
export interface RetentionPolicy {
  /**
   * Indicates whether a retention policy is enabled for the File service. If false,
   * metrics data is retained, and the user is responsible for deleting it.
   */
  enabled: boolean;
  /**
   * Indicates the number of days that metrics data should be retained. All data
   * older than this value will be deleted. Metrics data is deleted on a best-effort
   * basis after the retention period expires.
   */
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

/**
 * CORS is an HTTP feature that enables a web application running under one domain
 * to access resources in another domain. Web browsers implement a security
 * restriction known as same-origin policy that prevents a web page from calling
 * APIs in a different domain; CORS provides a secure way to allow one domain (the
 * origin domain) to call APIs in another domain.
 */
export interface CorsRule {
  /**
   * The origin domains that are permitted to make a request against the storage
   * service via CORS. The origin domain is the domain from which the request
   * originates. Note that the origin must be an exact case-sensitive match with the
   * origin that the user age sends to the service. You can also use the wildcard
   * character '*' to allow all origin domains to make requests via CORS.
   */
  allowedOrigins: string;
  /**
   * The methods (HTTP request verbs) that the origin domain may use for a CORS
   * request. (comma separated)
   */
  allowedMethods: string;
  /** The request headers that the origin domain may specify on the CORS request. */
  allowedHeaders: string;
  /**
   * The response headers that may be sent in the response to the CORS request and
   * exposed by the browser to the request issuer.
   */
  exposedHeaders: string;
  /**
   * The maximum amount time that a browser should cache the preflight OPTIONS
   * request.
   */
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

/** Protocol settings */
export interface ShareProtocolSettings {
  /** Settings for SMB protocol. */
  smb?: ShareSmbSettings;
  /** Settings for NFS protocol. */
  nfs?: ShareNfsSettings;
}

export function shareProtocolSettingsSerializer(item: ShareProtocolSettings): any {
  return {
    smb: !item["smb"] ? item["smb"] : shareSmbSettingsSerializer(item["smb"]),
    nfs: !item["nfs"] ? item["nfs"] : shareNfsSettingsSerializer(item["nfs"]),
  };
}

export function shareProtocolSettingsDeserializer(item: any): ShareProtocolSettings {
  return {
    smb: !item["smb"] ? item["smb"] : shareSmbSettingsDeserializer(item["smb"]),
    nfs: !item["nfs"] ? item["nfs"] : shareNfsSettingsDeserializer(item["nfs"]),
  };
}

export function shareProtocolSettingsXmlSerializer(item: ShareProtocolSettings): string {
  const properties: XmlPropertyMetadata[] = [
    {
      propertyName: "smb",
      xmlOptions: { name: "SMB" },
      type: "object",
      serializer: shareSmbSettingsXmlObjectSerializer,
    },
    {
      propertyName: "nfs",
      xmlOptions: { name: "NFS" },
      type: "object",
      serializer: shareNfsSettingsXmlObjectSerializer,
    },
  ];
  return serializeToXml(item, properties, "ProtocolSettings");
}

export function shareProtocolSettingsXmlDeserializer(xmlString: string): ShareProtocolSettings {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "smb",
      xmlOptions: { name: "SMB" },
      type: "object",
      deserializer: shareSmbSettingsXmlObjectDeserializer,
    },
    {
      propertyName: "nfs",
      xmlOptions: { name: "NFS" },
      type: "object",
      deserializer: shareNfsSettingsXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<ShareProtocolSettings>(xmlString, properties, "ProtocolSettings");
}

export function shareProtocolSettingsXmlObjectSerializer(
  item: ShareProtocolSettings,
): XmlSerializedObject {
  return {
    SMB: item["smb"] !== undefined ? shareSmbSettingsXmlObjectSerializer(item["smb"]) : undefined,
    NFS: item["nfs"] !== undefined ? shareNfsSettingsXmlObjectSerializer(item["nfs"]) : undefined,
  };
}

export function shareProtocolSettingsXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): ShareProtocolSettings {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "smb",
      xmlOptions: { name: "SMB" },
      type: "object",
      deserializer: shareSmbSettingsXmlObjectDeserializer,
    },
    {
      propertyName: "nfs",
      xmlOptions: { name: "NFS" },
      type: "object",
      deserializer: shareNfsSettingsXmlObjectDeserializer,
    },
  ];
  return deserializeXmlObject<ShareProtocolSettings>(xmlObject, properties);
}

/** Settings for SMB protocol. */
export interface ShareSmbSettings {
  /** Settings for SMB Multichannel. */
  multichannel?: SmbMultichannel;
  /** Enable or disable encryption in transit. */
  encryptionInTransit?: ShareSmbSettingsEncryptionInTransit;
}

export function shareSmbSettingsSerializer(item: ShareSmbSettings): any {
  return {
    multichannel: !item["multichannel"]
      ? item["multichannel"]
      : smbMultichannelSerializer(item["multichannel"]),
    encryptionInTransit: !item["encryptionInTransit"]
      ? item["encryptionInTransit"]
      : shareSmbSettingsEncryptionInTransitSerializer(item["encryptionInTransit"]),
  };
}

export function shareSmbSettingsDeserializer(item: any): ShareSmbSettings {
  return {
    multichannel: !item["multichannel"]
      ? item["multichannel"]
      : smbMultichannelDeserializer(item["multichannel"]),
    encryptionInTransit: !item["encryptionInTransit"]
      ? item["encryptionInTransit"]
      : shareSmbSettingsEncryptionInTransitDeserializer(item["encryptionInTransit"]),
  };
}

export function shareSmbSettingsXmlSerializer(item: ShareSmbSettings): string {
  const properties: XmlPropertyMetadata[] = [
    {
      propertyName: "multichannel",
      xmlOptions: { name: "Multichannel" },
      type: "object",
      serializer: smbMultichannelXmlObjectSerializer,
    },
    {
      propertyName: "encryptionInTransit",
      xmlOptions: { name: "EncryptionInTransit" },
      type: "object",
      serializer: shareSmbSettingsEncryptionInTransitXmlObjectSerializer,
    },
  ];
  return serializeToXml(item, properties, "SMB");
}

export function shareSmbSettingsXmlDeserializer(xmlString: string): ShareSmbSettings {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "multichannel",
      xmlOptions: { name: "Multichannel" },
      type: "object",
      deserializer: smbMultichannelXmlObjectDeserializer,
    },
    {
      propertyName: "encryptionInTransit",
      xmlOptions: { name: "EncryptionInTransit" },
      type: "object",
      deserializer: shareSmbSettingsEncryptionInTransitXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<ShareSmbSettings>(xmlString, properties, "SMB");
}

export function shareSmbSettingsXmlObjectSerializer(item: ShareSmbSettings): XmlSerializedObject {
  return {
    Multichannel:
      item["multichannel"] !== undefined
        ? smbMultichannelXmlObjectSerializer(item["multichannel"])
        : undefined,
    EncryptionInTransit:
      item["encryptionInTransit"] !== undefined
        ? shareSmbSettingsEncryptionInTransitXmlObjectSerializer(item["encryptionInTransit"])
        : undefined,
  };
}

export function shareSmbSettingsXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): ShareSmbSettings {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "multichannel",
      xmlOptions: { name: "Multichannel" },
      type: "object",
      deserializer: smbMultichannelXmlObjectDeserializer,
    },
    {
      propertyName: "encryptionInTransit",
      xmlOptions: { name: "EncryptionInTransit" },
      type: "object",
      deserializer: shareSmbSettingsEncryptionInTransitXmlObjectDeserializer,
    },
  ];
  return deserializeXmlObject<ShareSmbSettings>(xmlObject, properties);
}

/** Settings for SMB multichannel */
export interface SmbMultichannel {
  /** If SMB multichannel is enabled. */
  enabled?: boolean;
}

export function smbMultichannelSerializer(item: SmbMultichannel): any {
  return { enabled: item["enabled"] };
}

export function smbMultichannelDeserializer(item: any): SmbMultichannel {
  return {
    enabled: item["enabled"],
  };
}

export function smbMultichannelXmlSerializer(item: SmbMultichannel): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "enabled", xmlOptions: { name: "Enabled" }, type: "primitive" },
  ];
  return serializeToXml(item, properties, "Multichannel");
}

export function smbMultichannelXmlDeserializer(xmlString: string): SmbMultichannel {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "enabled",
      xmlOptions: { name: "Enabled" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
  ];
  return deserializeFromXml<SmbMultichannel>(xmlString, properties, "Multichannel");
}

export function smbMultichannelXmlObjectSerializer(item: SmbMultichannel): XmlSerializedObject {
  return { Enabled: item["enabled"] };
}

export function smbMultichannelXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): SmbMultichannel {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "enabled",
      xmlOptions: { name: "Enabled" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
  ];
  return deserializeXmlObject<SmbMultichannel>(xmlObject, properties);
}

/** Enable or disable encryption in transit. */
export interface ShareSmbSettingsEncryptionInTransit {
  /** If encryption in transit is required */
  required?: boolean;
}

export function shareSmbSettingsEncryptionInTransitSerializer(
  item: ShareSmbSettingsEncryptionInTransit,
): any {
  return { required: item["required"] };
}

export function shareSmbSettingsEncryptionInTransitDeserializer(
  item: any,
): ShareSmbSettingsEncryptionInTransit {
  return {
    required: item["required"],
  };
}

export function shareSmbSettingsEncryptionInTransitXmlSerializer(
  item: ShareSmbSettingsEncryptionInTransit,
): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "required", xmlOptions: { name: "Required" }, type: "primitive" },
  ];
  return serializeToXml(item, properties, "ShareSmbSettingsEncryptionInTransit");
}

export function shareSmbSettingsEncryptionInTransitXmlDeserializer(
  xmlString: string,
): ShareSmbSettingsEncryptionInTransit {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "required",
      xmlOptions: { name: "Required" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
  ];
  return deserializeFromXml<ShareSmbSettingsEncryptionInTransit>(
    xmlString,
    properties,
    "ShareSmbSettingsEncryptionInTransit",
  );
}

export function shareSmbSettingsEncryptionInTransitXmlObjectSerializer(
  item: ShareSmbSettingsEncryptionInTransit,
): XmlSerializedObject {
  return { Required: item["required"] };
}

export function shareSmbSettingsEncryptionInTransitXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): ShareSmbSettingsEncryptionInTransit {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "required",
      xmlOptions: { name: "Required" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
  ];
  return deserializeXmlObject<ShareSmbSettingsEncryptionInTransit>(xmlObject, properties);
}

/** Settings for SMB protocol. */
export interface ShareNfsSettings {
  /** Enable or disable encryption in transit. */
  encryptionInTransit?: ShareNfsSettingsEncryptionInTransit;
}

export function shareNfsSettingsSerializer(item: ShareNfsSettings): any {
  return {
    encryptionInTransit: !item["encryptionInTransit"]
      ? item["encryptionInTransit"]
      : shareNfsSettingsEncryptionInTransitSerializer(item["encryptionInTransit"]),
  };
}

export function shareNfsSettingsDeserializer(item: any): ShareNfsSettings {
  return {
    encryptionInTransit: !item["encryptionInTransit"]
      ? item["encryptionInTransit"]
      : shareNfsSettingsEncryptionInTransitDeserializer(item["encryptionInTransit"]),
  };
}

export function shareNfsSettingsXmlSerializer(item: ShareNfsSettings): string {
  const properties: XmlPropertyMetadata[] = [
    {
      propertyName: "encryptionInTransit",
      xmlOptions: { name: "EncryptionInTransit" },
      type: "object",
      serializer: shareNfsSettingsEncryptionInTransitXmlObjectSerializer,
    },
  ];
  return serializeToXml(item, properties, "NFS");
}

export function shareNfsSettingsXmlDeserializer(xmlString: string): ShareNfsSettings {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "encryptionInTransit",
      xmlOptions: { name: "EncryptionInTransit" },
      type: "object",
      deserializer: shareNfsSettingsEncryptionInTransitXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<ShareNfsSettings>(xmlString, properties, "NFS");
}

export function shareNfsSettingsXmlObjectSerializer(item: ShareNfsSettings): XmlSerializedObject {
  return {
    EncryptionInTransit:
      item["encryptionInTransit"] !== undefined
        ? shareNfsSettingsEncryptionInTransitXmlObjectSerializer(item["encryptionInTransit"])
        : undefined,
  };
}

export function shareNfsSettingsXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): ShareNfsSettings {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "encryptionInTransit",
      xmlOptions: { name: "EncryptionInTransit" },
      type: "object",
      deserializer: shareNfsSettingsEncryptionInTransitXmlObjectDeserializer,
    },
  ];
  return deserializeXmlObject<ShareNfsSettings>(xmlObject, properties);
}

/** Enable or disable encryption in transit. */
export interface ShareNfsSettingsEncryptionInTransit {
  /** If encryption in transit is required */
  required?: boolean;
}

export function shareNfsSettingsEncryptionInTransitSerializer(
  item: ShareNfsSettingsEncryptionInTransit,
): any {
  return { required: item["required"] };
}

export function shareNfsSettingsEncryptionInTransitDeserializer(
  item: any,
): ShareNfsSettingsEncryptionInTransit {
  return {
    required: item["required"],
  };
}

export function shareNfsSettingsEncryptionInTransitXmlSerializer(
  item: ShareNfsSettingsEncryptionInTransit,
): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "required", xmlOptions: { name: "Required" }, type: "primitive" },
  ];
  return serializeToXml(item, properties, "ShareNfsSettingsEncryptionInTransit");
}

export function shareNfsSettingsEncryptionInTransitXmlDeserializer(
  xmlString: string,
): ShareNfsSettingsEncryptionInTransit {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "required",
      xmlOptions: { name: "Required" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
  ];
  return deserializeFromXml<ShareNfsSettingsEncryptionInTransit>(
    xmlString,
    properties,
    "ShareNfsSettingsEncryptionInTransit",
  );
}

export function shareNfsSettingsEncryptionInTransitXmlObjectSerializer(
  item: ShareNfsSettingsEncryptionInTransit,
): XmlSerializedObject {
  return { Required: item["required"] };
}

export function shareNfsSettingsEncryptionInTransitXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): ShareNfsSettingsEncryptionInTransit {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "required",
      xmlOptions: { name: "Required" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
  ];
  return deserializeXmlObject<ShareNfsSettingsEncryptionInTransit>(xmlObject, properties);
}

/**
 * The error response.
 *
 * This defines the wire format only. Language SDKs wrap this in idiomatic error types.
 */
export interface ErrorModel {
  /** The error code. */
  code?: StorageErrorCode;
  /** The error message. */
  message?: string;
  /** Copy source status code */
  copySourceStatusCode?: number;
  /** Copy source error code */
  copySourceErrorCode?: string;
  /** Copy source error message */
  copySourceErrorMessage?: string;
  errorCode?: string;
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    code: item["code"],
    message: item["message"],
    copySourceStatusCode: item["copySourceStatusCode"],
    copySourceErrorCode: item["copySourceErrorCode"],
    copySourceErrorMessage: item["copySourceErrorMessage"],
  };
}

export function errorXmlDeserializer(xmlString: string): ErrorModel {
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
  return deserializeFromXml<ErrorModel>(xmlString, properties, "Error", undefined, undefined, {
    propertyName: "additionalProperties",
    excludeNames: [
      "Code",
      "Message",
      "CopySourceStatusCode",
      "CopySourceErrorCode",
      "CopySourceErrorMessage",
    ],
  });
}

/** Error codes returned by the service */
export enum KnownStorageErrorCode {
  /** AccountAlreadyExists */
  AccountAlreadyExists = "AccountAlreadyExists",
  /** AccountBeingCreated */
  AccountBeingCreated = "AccountBeingCreated",
  /** AccountIsDisabled */
  AccountIsDisabled = "AccountIsDisabled",
  /** AuthenticationFailed */
  AuthenticationFailed = "AuthenticationFailed",
  /** AuthorizationFailure */
  AuthorizationFailure = "AuthorizationFailure",
  /** ConditionHeadersNotSupported */
  ConditionHeadersNotSupported = "ConditionHeadersNotSupported",
  /** ConditionNotMet */
  ConditionNotMet = "ConditionNotMet",
  /** EmptyMetadataKey */
  EmptyMetadataKey = "EmptyMetadataKey",
  /** FileShareProvisionedBandwidthDowngradeNotAllowed */
  FileShareProvisionedBandwidthDowngradeNotAllowed = "FileShareProvisionedBandwidthDowngradeNotAllowed",
  /** FileShareProvisionedIopsDowngradeNotAllowed */
  FileShareProvisionedIopsDowngradeNotAllowed = "FileShareProvisionedIopsDowngradeNotAllowed",
  /** InsufficientAccountPermissions */
  InsufficientAccountPermissions = "InsufficientAccountPermissions",
  /** InternalError */
  InternalError = "InternalError",
  /** InvalidAuthenticationInfo */
  InvalidAuthenticationInfo = "InvalidAuthenticationInfo",
  /** InvalidHeaderValue */
  InvalidHeaderValue = "InvalidHeaderValue",
  /** InvalidHttpVerb */
  InvalidHttpVerb = "InvalidHttpVerb",
  /** InvalidInput */
  InvalidInput = "InvalidInput",
  /** InvalidMd5 */
  InvalidMd5 = "InvalidMd5",
  /** InvalidMetadata */
  InvalidMetadata = "InvalidMetadata",
  /** InvalidQueryParameterValue */
  InvalidQueryParameterValue = "InvalidQueryParameterValue",
  /** InvalidRange */
  InvalidRange = "InvalidRange",
  /** InvalidResourceName */
  InvalidResourceName = "InvalidResourceName",
  /** InvalidUri */
  InvalidUri = "InvalidUri",
  /** InvalidXmlDocument */
  InvalidXmlDocument = "InvalidXmlDocument",
  /** InvalidXmlNodeValue */
  InvalidXmlNodeValue = "InvalidXmlNodeValue",
  /** Md5Mismatch */
  Md5Mismatch = "Md5Mismatch",
  /** MetadataTooLarge */
  MetadataTooLarge = "MetadataTooLarge",
  /** MissingContentLengthHeader */
  MissingContentLengthHeader = "MissingContentLengthHeader",
  /** MissingRequiredQueryParameter */
  MissingRequiredQueryParameter = "MissingRequiredQueryParameter",
  /** MissingRequiredHeader */
  MissingRequiredHeader = "MissingRequiredHeader",
  /** MissingRequiredXmlNode */
  MissingRequiredXmlNode = "MissingRequiredXmlNode",
  /** MultipleConditionHeadersNotSupported */
  MultipleConditionHeadersNotSupported = "MultipleConditionHeadersNotSupported",
  /** OperationTimedOut */
  OperationTimedOut = "OperationTimedOut",
  /** OutOfRangeInput */
  OutOfRangeInput = "OutOfRangeInput",
  /** OutOfRangeQueryParameterValue */
  OutOfRangeQueryParameterValue = "OutOfRangeQueryParameterValue",
  /** RequestBodyTooLarge */
  RequestBodyTooLarge = "RequestBodyTooLarge",
  /** ResourceTypeMismatch */
  ResourceTypeMismatch = "ResourceTypeMismatch",
  /** RequestUrlFailedToParse */
  RequestUrlFailedToParse = "RequestUrlFailedToParse",
  /** ResourceAlreadyExists */
  ResourceAlreadyExists = "ResourceAlreadyExists",
  /** ResourceNotFound */
  ResourceNotFound = "ResourceNotFound",
  /** ServerBusy */
  ServerBusy = "ServerBusy",
  /** UnsupportedHeader */
  UnsupportedHeader = "UnsupportedHeader",
  /** UnsupportedXmlNode */
  UnsupportedXmlNode = "UnsupportedXmlNode",
  /** UnsupportedQueryParameter */
  UnsupportedQueryParameter = "UnsupportedQueryParameter",
  /** UnsupportedHttpVerb */
  UnsupportedHttpVerb = "UnsupportedHttpVerb",
  /** CannotDeleteFileOrDirectory */
  CannotDeleteFileOrDirectory = "CannotDeleteFileOrDirectory",
  /** ClientCacheFlushDelay */
  ClientCacheFlushDelay = "ClientCacheFlushDelay",
  /** DeletePending */
  DeletePending = "DeletePending",
  /** DirectoryNotEmpty */
  DirectoryNotEmpty = "DirectoryNotEmpty",
  /** FileLockConflict */
  FileLockConflict = "FileLockConflict",
  /** InvalidFileOrDirectoryPathName */
  InvalidFileOrDirectoryPathName = "InvalidFileOrDirectoryPathName",
  /** ParentNotFound */
  ParentNotFound = "ParentNotFound",
  /** ReadOnlyAttribute */
  ReadOnlyAttribute = "ReadOnlyAttribute",
  /** ShareAlreadyExists */
  ShareAlreadyExists = "ShareAlreadyExists",
  /** ShareBeingDeleted */
  ShareBeingDeleted = "ShareBeingDeleted",
  /** ShareDisabled */
  ShareDisabled = "ShareDisabled",
  /** ShareNotFound */
  ShareNotFound = "ShareNotFound",
  /** SharingViolation */
  SharingViolation = "SharingViolation",
  /** ShareSnapshotInProgress */
  ShareSnapshotInProgress = "ShareSnapshotInProgress",
  /** ShareSnapshotCountExceeded */
  ShareSnapshotCountExceeded = "ShareSnapshotCountExceeded",
  /** ShareSnapshotOperationNotSupported */
  ShareSnapshotOperationNotSupported = "ShareSnapshotOperationNotSupported",
  /** ShareHasSnapshots */
  ShareHasSnapshots = "ShareHasSnapshots",
  /** PreviousSnapshotNotFound */
  PreviousSnapshotNotFound = "PreviousSnapshotNotFound",
  /** ContainerQuotaDowngradeNotAllowed */
  ContainerQuotaDowngradeNotAllowed = "ContainerQuotaDowngradeNotAllowed",
  /** AuthorizationSourceIPMismatch */
  AuthorizationSourceIPMismatch = "AuthorizationSourceIPMismatch",
  /** AuthorizationProtocolMismatch */
  AuthorizationProtocolMismatch = "AuthorizationProtocolMismatch",
  /** AuthorizationPermissionMismatch */
  AuthorizationPermissionMismatch = "AuthorizationPermissionMismatch",
  /** AuthorizationServiceMismatch */
  AuthorizationServiceMismatch = "AuthorizationServiceMismatch",
  /** AuthorizationResourceTypeMismatch */
  AuthorizationResourceTypeMismatch = "AuthorizationResourceTypeMismatch",
  /** FeatureVersionMismatch */
  FeatureVersionMismatch = "FeatureVersionMismatch",
  /** ShareSnapshotNotFound */
  ShareSnapshotNotFound = "ShareSnapshotNotFound",
  /** FileShareProvisionedIopsInvalid */
  FileShareProvisionedIopsInvalid = "FileShareProvisionedIopsInvalid",
  /** FileShareProvisionedBandwidthInvalid */
  FileShareProvisionedBandwidthInvalid = "FileShareProvisionedBandwidthInvalid",
  /** FileShareProvisionedStorageInvalid */
  FileShareProvisionedStorageInvalid = "FileShareProvisionedStorageInvalid",
  /** TotalSharesProvisionedCapacityExceedsAccountLimit */
  TotalSharesProvisionedCapacityExceedsAccountLimit = "TotalSharesProvisionedCapacityExceedsAccountLimit",
  /** TotalSharesProvisionedIopsExceedsAccountLimit */
  TotalSharesProvisionedIopsExceedsAccountLimit = "TotalSharesProvisionedIopsExceedsAccountLimit",
  /** TotalSharesProvisionedBandwidthExceedsAccountLimit */
  TotalSharesProvisionedBandwidthExceedsAccountLimit = "TotalSharesProvisionedBandwidthExceedsAccountLimit",
  /** TotalSharesCountExceedsAccountLimit */
  TotalSharesCountExceedsAccountLimit = "TotalSharesCountExceedsAccountLimit",
}

/**
 * Error codes returned by the service \
 * {@link KnownStorageErrorCode} can be used interchangeably with StorageErrorCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AccountAlreadyExists**: AccountAlreadyExists \
 * **AccountBeingCreated**: AccountBeingCreated \
 * **AccountIsDisabled**: AccountIsDisabled \
 * **AuthenticationFailed**: AuthenticationFailed \
 * **AuthorizationFailure**: AuthorizationFailure \
 * **ConditionHeadersNotSupported**: ConditionHeadersNotSupported \
 * **ConditionNotMet**: ConditionNotMet \
 * **EmptyMetadataKey**: EmptyMetadataKey \
 * **FileShareProvisionedBandwidthDowngradeNotAllowed**: FileShareProvisionedBandwidthDowngradeNotAllowed \
 * **FileShareProvisionedIopsDowngradeNotAllowed**: FileShareProvisionedIopsDowngradeNotAllowed \
 * **InsufficientAccountPermissions**: InsufficientAccountPermissions \
 * **InternalError**: InternalError \
 * **InvalidAuthenticationInfo**: InvalidAuthenticationInfo \
 * **InvalidHeaderValue**: InvalidHeaderValue \
 * **InvalidHttpVerb**: InvalidHttpVerb \
 * **InvalidInput**: InvalidInput \
 * **InvalidMd5**: InvalidMd5 \
 * **InvalidMetadata**: InvalidMetadata \
 * **InvalidQueryParameterValue**: InvalidQueryParameterValue \
 * **InvalidRange**: InvalidRange \
 * **InvalidResourceName**: InvalidResourceName \
 * **InvalidUri**: InvalidUri \
 * **InvalidXmlDocument**: InvalidXmlDocument \
 * **InvalidXmlNodeValue**: InvalidXmlNodeValue \
 * **Md5Mismatch**: Md5Mismatch \
 * **MetadataTooLarge**: MetadataTooLarge \
 * **MissingContentLengthHeader**: MissingContentLengthHeader \
 * **MissingRequiredQueryParameter**: MissingRequiredQueryParameter \
 * **MissingRequiredHeader**: MissingRequiredHeader \
 * **MissingRequiredXmlNode**: MissingRequiredXmlNode \
 * **MultipleConditionHeadersNotSupported**: MultipleConditionHeadersNotSupported \
 * **OperationTimedOut**: OperationTimedOut \
 * **OutOfRangeInput**: OutOfRangeInput \
 * **OutOfRangeQueryParameterValue**: OutOfRangeQueryParameterValue \
 * **RequestBodyTooLarge**: RequestBodyTooLarge \
 * **ResourceTypeMismatch**: ResourceTypeMismatch \
 * **RequestUrlFailedToParse**: RequestUrlFailedToParse \
 * **ResourceAlreadyExists**: ResourceAlreadyExists \
 * **ResourceNotFound**: ResourceNotFound \
 * **ServerBusy**: ServerBusy \
 * **UnsupportedHeader**: UnsupportedHeader \
 * **UnsupportedXmlNode**: UnsupportedXmlNode \
 * **UnsupportedQueryParameter**: UnsupportedQueryParameter \
 * **UnsupportedHttpVerb**: UnsupportedHttpVerb \
 * **CannotDeleteFileOrDirectory**: CannotDeleteFileOrDirectory \
 * **ClientCacheFlushDelay**: ClientCacheFlushDelay \
 * **DeletePending**: DeletePending \
 * **DirectoryNotEmpty**: DirectoryNotEmpty \
 * **FileLockConflict**: FileLockConflict \
 * **InvalidFileOrDirectoryPathName**: InvalidFileOrDirectoryPathName \
 * **ParentNotFound**: ParentNotFound \
 * **ReadOnlyAttribute**: ReadOnlyAttribute \
 * **ShareAlreadyExists**: ShareAlreadyExists \
 * **ShareBeingDeleted**: ShareBeingDeleted \
 * **ShareDisabled**: ShareDisabled \
 * **ShareNotFound**: ShareNotFound \
 * **SharingViolation**: SharingViolation \
 * **ShareSnapshotInProgress**: ShareSnapshotInProgress \
 * **ShareSnapshotCountExceeded**: ShareSnapshotCountExceeded \
 * **ShareSnapshotOperationNotSupported**: ShareSnapshotOperationNotSupported \
 * **ShareHasSnapshots**: ShareHasSnapshots \
 * **PreviousSnapshotNotFound**: PreviousSnapshotNotFound \
 * **ContainerQuotaDowngradeNotAllowed**: ContainerQuotaDowngradeNotAllowed \
 * **AuthorizationSourceIPMismatch**: AuthorizationSourceIPMismatch \
 * **AuthorizationProtocolMismatch**: AuthorizationProtocolMismatch \
 * **AuthorizationPermissionMismatch**: AuthorizationPermissionMismatch \
 * **AuthorizationServiceMismatch**: AuthorizationServiceMismatch \
 * **AuthorizationResourceTypeMismatch**: AuthorizationResourceTypeMismatch \
 * **FeatureVersionMismatch**: FeatureVersionMismatch \
 * **ShareSnapshotNotFound**: ShareSnapshotNotFound \
 * **FileShareProvisionedIopsInvalid**: FileShareProvisionedIopsInvalid \
 * **FileShareProvisionedBandwidthInvalid**: FileShareProvisionedBandwidthInvalid \
 * **FileShareProvisionedStorageInvalid**: FileShareProvisionedStorageInvalid \
 * **TotalSharesProvisionedCapacityExceedsAccountLimit**: TotalSharesProvisionedCapacityExceedsAccountLimit \
 * **TotalSharesProvisionedIopsExceedsAccountLimit**: TotalSharesProvisionedIopsExceedsAccountLimit \
 * **TotalSharesProvisionedBandwidthExceedsAccountLimit**: TotalSharesProvisionedBandwidthExceedsAccountLimit \
 * **TotalSharesCountExceedsAccountLimit**: TotalSharesCountExceedsAccountLimit
 */
export type StorageErrorCode = string;

/** An enumeration of shares. */
export interface ListSharesResponse {
  /** The service endpoint. */
  serviceEndpoint: string;
  /** The prefix. */
  prefix?: string;
  /** The marker. */
  marker?: string;
  /** The max results. */
  maxResults?: number;
  /** The share items. */
  shareItems?: ShareItemInternal[];
  /** The next marker. */
  continuationToken: string;
}

export function listSharesResponseDeserializer(item: any): ListSharesResponse {
  return {
    serviceEndpoint: item["serviceEndpoint"],
    prefix: item["prefix"],
    marker: item["marker"],
    maxResults: item["maxResults"],
    shareItems: !item["shareItems"]
      ? item["shareItems"]
      : shareItemInternalArrayDeserializer(item["shareItems"]),
    continuationToken: item["continuationToken"],
  };
}

export function listSharesResponseXmlDeserializer(xmlString: string): ListSharesResponse {
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
      propertyName: "shareItems",
      xmlOptions: { name: "Shares", itemsName: "Share" },
      type: "array",
      deserializer: shareItemInternalXmlObjectDeserializer,
    },
    {
      propertyName: "continuationToken",
      xmlOptions: { name: "NextMarker" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<ListSharesResponse>(xmlString, properties, "EnumerationResults");
}

export function shareItemInternalArrayDeserializer(result: Array<ShareItemInternal>): any[] {
  return result.map((item) => {
    return shareItemInternalDeserializer(item);
  });
}

/** A listed Azure Storage share item. */
export interface ShareItemInternal {
  /** The share name. */
  name: string;
  /** The share snapshot. */
  snapshot?: string;
  /** Whether the share is deleted. */
  deleted?: boolean;
  /** The share version. */
  version?: string;
  /** Properties of a share. */
  properties: SharePropertiesInternal;
  /** Dictionary of <string> */
  metadata?: Record<string, string>;
}

export function shareItemInternalDeserializer(item: any): ShareItemInternal {
  return {
    name: item["name"],
    snapshot: item["snapshot"],
    deleted: item["deleted"],
    version: item["version"],
    properties: sharePropertiesInternalDeserializer(item["properties"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function shareItemInternalXmlDeserializer(xmlString: string): ShareItemInternal {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "Name" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "snapshot",
      xmlOptions: { name: "Snapshot" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "deleted",
      xmlOptions: { name: "Deleted" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "version",
      xmlOptions: { name: "Version" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "properties",
      xmlOptions: { name: "Properties" },
      type: "object",
      deserializer: sharePropertiesInternalXmlObjectDeserializer,
    },
    { propertyName: "metadata", xmlOptions: { name: "Metadata" }, type: "dict" },
  ];
  return deserializeFromXml<ShareItemInternal>(xmlString, properties, "Share");
}

export function shareItemInternalXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): ShareItemInternal {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "Name" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "snapshot",
      xmlOptions: { name: "Snapshot" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "deleted",
      xmlOptions: { name: "Deleted" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "version",
      xmlOptions: { name: "Version" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "properties",
      xmlOptions: { name: "Properties" },
      type: "object",
      deserializer: sharePropertiesInternalXmlObjectDeserializer,
    },
    { propertyName: "metadata", xmlOptions: { name: "Metadata" }, type: "dict" },
  ];
  return deserializeXmlObject<ShareItemInternal>(xmlObject, properties);
}

/** Properties of a share. */
export interface SharePropertiesInternal {
  /** The last modified time. */
  lastModified: Date;
  /** The ETag of the share. */
  etag: string;
  /** The share quota. */
  quota: number;
  /** The provisioned IOPS. */
  provisionedIops?: number;
  /** The provisioned ingress in MBps. */
  provisionedIngressMBps?: number;
  /** The provisioned egress in MBps. */
  provisionedEgressMBps?: number;
  /** The provisioned bandwidth in MiBps. */
  provisionedBandwidthMiBps?: number;
  /** The next allowed quota downgrade time. */
  nextAllowedQuotaDowngradeTime?: Date;
  /** The deleted time. */
  deletedTime?: Date;
  /** The remaining retention days. */
  remainingRetentionDays?: number;
  /** The access tier. */
  accessTier?: string;
  /** The access tier change time. */
  accessTierChangeTime?: Date;
  /** The access tier transition state. */
  accessTierTransitionState?: string;
  /** The current lease status of the share. */
  leaseStatus?: LeaseStatusType;
  /** Lease state of the share. */
  leaseState?: LeaseStateType;
  /**
   * When a share is leased, specifies whether the lease is of infinite or fixed
   * duration.
   */
  leaseDuration?: LeaseDurationType;
  /** The enabled protocols. */
  enabledProtocols?: string;
  /** The root squash setting. */
  rootSquash?: ShareRootSquash;
  /** Whether snapshot virtual directory access is enabled. */
  enableSnapshotVirtualDirectoryAccess?: boolean;
  /** Whether paid bursting is enabled. */
  paidBurstingEnabled?: boolean;
  /** The maximum IOPS for paid bursting. */
  paidBurstingMaxIops?: number;
  /** The maximum bandwidth for paid bursting in MiBps. */
  paidBurstingMaxBandwidthMibps?: number;
  /** The included burst IOPS. */
  includedBurstIops?: number;
  /** The maximum burst credits for IOPS. */
  maxBurstCreditsForIops?: number;
  /** The next allowed provisioned IOPS downgrade time. */
  nextAllowedProvisionedIopsDowngradeTime?: Date;
  /** The next allowed provisioned bandwidth downgrade time. */
  nextAllowedProvisionedBandwidthDowngradeTime?: Date;
  /** Whether SMB directory lease is enabled. */
  enableSmbDirectoryLease?: boolean;
}

export function sharePropertiesInternalDeserializer(item: any): SharePropertiesInternal {
  return {
    lastModified: new Date(item["lastModified"]),
    etag: item["etag"],
    quota: item["quota"],
    provisionedIops: item["provisionedIops"],
    provisionedIngressMBps: item["provisionedIngressMBps"],
    provisionedEgressMBps: item["provisionedEgressMBps"],
    provisionedBandwidthMiBps: item["provisionedBandwidthMiBps"],
    nextAllowedQuotaDowngradeTime: !item["nextAllowedQuotaDowngradeTime"]
      ? item["nextAllowedQuotaDowngradeTime"]
      : new Date(item["nextAllowedQuotaDowngradeTime"]),
    deletedTime: !item["deletedTime"] ? item["deletedTime"] : new Date(item["deletedTime"]),
    remainingRetentionDays: item["remainingRetentionDays"],
    accessTier: item["accessTier"],
    accessTierChangeTime: !item["accessTierChangeTime"]
      ? item["accessTierChangeTime"]
      : new Date(item["accessTierChangeTime"]),
    accessTierTransitionState: item["accessTierTransitionState"],
    leaseStatus: item["leaseStatus"],
    leaseState: item["leaseState"],
    leaseDuration: item["leaseDuration"],
    enabledProtocols: item["enabledProtocols"],
    rootSquash: item["rootSquash"],
    enableSnapshotVirtualDirectoryAccess: item["enableSnapshotVirtualDirectoryAccess"],
    paidBurstingEnabled: item["paidBurstingEnabled"],
    paidBurstingMaxIops: item["paidBurstingMaxIops"],
    paidBurstingMaxBandwidthMibps: item["paidBurstingMaxBandwidthMibps"],
    includedBurstIops: item["includedBurstIops"],
    maxBurstCreditsForIops: item["maxBurstCreditsForIops"],
    nextAllowedProvisionedIopsDowngradeTime: !item["nextAllowedProvisionedIopsDowngradeTime"]
      ? item["nextAllowedProvisionedIopsDowngradeTime"]
      : new Date(item["nextAllowedProvisionedIopsDowngradeTime"]),
    nextAllowedProvisionedBandwidthDowngradeTime: !item[
      "nextAllowedProvisionedBandwidthDowngradeTime"
    ]
      ? item["nextAllowedProvisionedBandwidthDowngradeTime"]
      : new Date(item["nextAllowedProvisionedBandwidthDowngradeTime"]),
    enableSmbDirectoryLease: item["enableSmbDirectoryLease"],
  };
}

export function sharePropertiesInternalXmlDeserializer(xmlString: string): SharePropertiesInternal {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "lastModified",
      xmlOptions: { name: "Last-Modified" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "etag",
      xmlOptions: { name: "Etag" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "quota",
      xmlOptions: { name: "Quota" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "provisionedIops",
      xmlOptions: { name: "ProvisionedIops" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "provisionedIngressMBps",
      xmlOptions: { name: "ProvisionedIngressMBps" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "provisionedEgressMBps",
      xmlOptions: { name: "ProvisionedEgressMBps" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "provisionedBandwidthMiBps",
      xmlOptions: { name: "ProvisionedBandwidthMiBps" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "nextAllowedQuotaDowngradeTime",
      xmlOptions: { name: "NextAllowedQuotaDowngradeTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "deletedTime",
      xmlOptions: { name: "DeletedTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "remainingRetentionDays",
      xmlOptions: { name: "RemainingRetentionDays" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "accessTier",
      xmlOptions: { name: "AccessTier" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "accessTierChangeTime",
      xmlOptions: { name: "AccessTierChangeTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "accessTierTransitionState",
      xmlOptions: { name: "AccessTierTransitionState" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "leaseStatus",
      xmlOptions: { name: "LeaseStatus" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "leaseState",
      xmlOptions: { name: "LeaseState" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "leaseDuration",
      xmlOptions: { name: "LeaseDuration" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "enabledProtocols",
      xmlOptions: { name: "EnabledProtocols" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "rootSquash",
      xmlOptions: { name: "RootSquash" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "enableSnapshotVirtualDirectoryAccess",
      xmlOptions: { name: "EnableSnapshotVirtualDirectoryAccess" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "paidBurstingEnabled",
      xmlOptions: { name: "PaidBurstingEnabled" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "paidBurstingMaxIops",
      xmlOptions: { name: "PaidBurstingMaxIops" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "paidBurstingMaxBandwidthMibps",
      xmlOptions: { name: "PaidBurstingMaxBandwidthMibps" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "includedBurstIops",
      xmlOptions: { name: "IncludedBurstIops" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "maxBurstCreditsForIops",
      xmlOptions: { name: "MaxBurstCreditsForIops" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "nextAllowedProvisionedIopsDowngradeTime",
      xmlOptions: { name: "NextAllowedProvisionedIopsDowngradeTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "nextAllowedProvisionedBandwidthDowngradeTime",
      xmlOptions: { name: "NextAllowedProvisionedBandwidthDowngradeTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "enableSmbDirectoryLease",
      xmlOptions: { name: "EnableSmbDirectoryLease" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
  ];
  return deserializeFromXml<SharePropertiesInternal>(
    xmlString,
    properties,
    "SharePropertiesInternal",
  );
}

export function sharePropertiesInternalXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): SharePropertiesInternal {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "lastModified",
      xmlOptions: { name: "Last-Modified" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "etag",
      xmlOptions: { name: "Etag" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "quota",
      xmlOptions: { name: "Quota" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "provisionedIops",
      xmlOptions: { name: "ProvisionedIops" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "provisionedIngressMBps",
      xmlOptions: { name: "ProvisionedIngressMBps" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "provisionedEgressMBps",
      xmlOptions: { name: "ProvisionedEgressMBps" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "provisionedBandwidthMiBps",
      xmlOptions: { name: "ProvisionedBandwidthMiBps" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "nextAllowedQuotaDowngradeTime",
      xmlOptions: { name: "NextAllowedQuotaDowngradeTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "deletedTime",
      xmlOptions: { name: "DeletedTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "remainingRetentionDays",
      xmlOptions: { name: "RemainingRetentionDays" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "accessTier",
      xmlOptions: { name: "AccessTier" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "accessTierChangeTime",
      xmlOptions: { name: "AccessTierChangeTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "accessTierTransitionState",
      xmlOptions: { name: "AccessTierTransitionState" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "leaseStatus",
      xmlOptions: { name: "LeaseStatus" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "leaseState",
      xmlOptions: { name: "LeaseState" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "leaseDuration",
      xmlOptions: { name: "LeaseDuration" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "enabledProtocols",
      xmlOptions: { name: "EnabledProtocols" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "rootSquash",
      xmlOptions: { name: "RootSquash" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "enableSnapshotVirtualDirectoryAccess",
      xmlOptions: { name: "EnableSnapshotVirtualDirectoryAccess" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "paidBurstingEnabled",
      xmlOptions: { name: "PaidBurstingEnabled" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "paidBurstingMaxIops",
      xmlOptions: { name: "PaidBurstingMaxIops" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "paidBurstingMaxBandwidthMibps",
      xmlOptions: { name: "PaidBurstingMaxBandwidthMibps" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "includedBurstIops",
      xmlOptions: { name: "IncludedBurstIops" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "maxBurstCreditsForIops",
      xmlOptions: { name: "MaxBurstCreditsForIops" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "nextAllowedProvisionedIopsDowngradeTime",
      xmlOptions: { name: "NextAllowedProvisionedIopsDowngradeTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "nextAllowedProvisionedBandwidthDowngradeTime",
      xmlOptions: { name: "NextAllowedProvisionedBandwidthDowngradeTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "enableSmbDirectoryLease",
      xmlOptions: { name: "EnableSmbDirectoryLease" },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
  ];
  return deserializeXmlObject<SharePropertiesInternal>(xmlObject, properties);
}

/** The current lease status of the share. */
export type LeaseStatusType = "locked" | "unlocked";
/** Lease state of the share. */
export type LeaseStateType = "available" | "leased" | "expired" | "breaking" | "broken";
/**
 * When a share is leased, specifies whether the lease is of infinite or fixed
 * duration.
 */
export type LeaseDurationType = "infinite" | "fixed";
/** The root squash setting for the share. */
export type ShareRootSquash = "NoRootSquash" | "RootSquash" | "AllSquash";

/** Key information */
export interface KeyInfo {
  /** The date-time the key is active in ISO 8601 UTC time */
  start?: string;
  /** The date-time the key expires in ISO 8601 UTC time */
  expiry: string;
  /** The delegated user tenant id in Azure AD */
  delegatedUserTid?: string;
}

export function keyInfoSerializer(item: KeyInfo): any {
  return {
    start: item["start"],
    expiry: item["expiry"],
    delegatedUserTid: item["delegatedUserTid"],
  };
}

export function keyInfoXmlSerializer(item: KeyInfo): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "start", xmlOptions: { name: "Start" }, type: "primitive" },
    { propertyName: "expiry", xmlOptions: { name: "Expiry" }, type: "primitive" },
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
  signedObjectId: string;
  /** The Azure Active Directory tenant ID in GUID format */
  signedTenantId: string;
  /** The date-time the key is active */
  signedStartsOn: string;
  /** The date-time the key expires */
  signedExpiresOn: string;
  /** Abbreviation of the Azure Storage service that accepts the key */
  signedService: string;
  /** The service version that created the key */
  signedVersion: string;
  /**
   * The delegated user tenant id in Azure AD. Return if DelegatedUserTid is
   * specified.
   */
  signedDelegatedUserTenantId?: string;
  /** The key as a base64 string */
  value: string;
}

export function userDelegationKeyDeserializer(item: any): UserDelegationKey {
  return {
    signedObjectId: item["signedObjectId"],
    signedTenantId: item["signedTenantId"],
    signedStartsOn: item["signedStartsOn"],
    signedExpiresOn: item["signedExpiresOn"],
    signedService: item["signedService"],
    signedVersion: item["signedVersion"],
    signedDelegatedUserTenantId: item["signedDelegatedUserTenantId"],
    value: item["value"],
  };
}

export function userDelegationKeyXmlDeserializer(xmlString: string): UserDelegationKey {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "signedObjectId",
      xmlOptions: { name: "SignedOid" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "signedTenantId",
      xmlOptions: { name: "SignedTid" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "signedStartsOn",
      xmlOptions: { name: "SignedStart" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "signedExpiresOn",
      xmlOptions: { name: "SignedExpiry" },
      type: "primitive",
      primitiveSubtype: "string",
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
      propertyName: "signedDelegatedUserTenantId",
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

/** A permission (a security descriptor) at the share level. */
export interface SharePermission {
  /** The permission in the Security Descriptor Definition Language (SDDL). */
  permission: string;
  /** The permission format. */
  format?: FilePermissionFormat;
}

export function sharePermissionSerializer(item: SharePermission): any {
  return { permission: item["permission"], format: item["format"] };
}

export function sharePermissionDeserializer(item: any): SharePermission {
  return {
    permission: item["permission"],
    format: item["format"],
  };
}

/** The file permission format. */
export type FilePermissionFormat = "Sddl" | "Binary";

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

/** Signed identifier. */
export interface SignedIdentifier {
  /** A unique id. */
  id: string;
  /** The access policy. */
  accessPolicy?: AccessPolicy;
}

export function signedIdentifierSerializer(item: SignedIdentifier): any {
  return {
    id: item["id"],
    accessPolicy: !item["accessPolicy"]
      ? item["accessPolicy"]
      : accessPolicySerializer(item["accessPolicy"]),
  };
}

export function signedIdentifierDeserializer(item: any): SignedIdentifier {
  return {
    id: item["id"],
    accessPolicy: !item["accessPolicy"]
      ? item["accessPolicy"]
      : accessPolicyDeserializer(item["accessPolicy"]),
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

/** An Access policy. */
export interface AccessPolicy {
  /** The date-time the policy is active. */
  startsOn?: string;
  /** The date-time the policy expires. */
  expiresOn?: string;
  /** The permissions for the ACL policy. */
  permissions?: string;
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
    {
      propertyName: "startsOn",
      xmlOptions: { name: "Start" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "expiresOn",
      xmlOptions: { name: "Expiry" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "permissions",
      xmlOptions: { name: "Permission" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<AccessPolicy>(xmlString, properties, "AccessPolicy");
}

export function accessPolicyXmlObjectSerializer(item: AccessPolicy): XmlSerializedObject {
  return { Start: item["startsOn"], Expiry: item["expiresOn"], Permission: item["permissions"] };
}

export function accessPolicyXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): AccessPolicy {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "startsOn",
      xmlOptions: { name: "Start" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "expiresOn",
      xmlOptions: { name: "Expiry" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "permissions",
      xmlOptions: { name: "Permission" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeXmlObject<AccessPolicy>(xmlObject, properties);
}

/** Stats for the share. */
export interface ShareStats {
  /**
   * The approximate size of the data stored in bytes. Note that this value may not
   * include all recently created or recently resized files.
   */
  shareUsageBytes: number;
}

export function shareStatsDeserializer(item: any): ShareStats {
  return {
    shareUsageBytes: item["shareUsageBytes"],
  };
}

export function shareStatsXmlDeserializer(xmlString: string): ShareStats {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "shareUsageBytes",
      xmlOptions: { name: "ShareUsageBytes" },
      type: "primitive",
      primitiveSubtype: "number",
    },
  ];
  return deserializeFromXml<ShareStats>(xmlString, properties, "ShareStats");
}

/** An enumeration of directories and files. */
export interface ListFilesAndDirectoriesSegmentResponse {
  /** The service endpoint. */
  serviceEndpoint: string;
  /** The share name. */
  shareName: string;
  /** The share snapshot. */
  shareSnapshot?: string;
  /** Whether the listing is encoded. */
  encoded?: boolean;
  /** The directory path. */
  directoryPath: string;
  /** The prefix. */
  prefix: StringEncoded;
  /** The marker. */
  marker?: string;
  /** The max results. */
  maxResults?: number;
  /** Abstract for entries that can be listed from Directory. */
  segment: FilesAndDirectoriesListSegment;
  /** The next marker. */
  continuationToken: string;
  /** The directory ID. */
  directoryId?: string;
}

export function listFilesAndDirectoriesSegmentResponseDeserializer(
  item: any,
): ListFilesAndDirectoriesSegmentResponse {
  return {
    serviceEndpoint: item["serviceEndpoint"],
    shareName: item["shareName"],
    shareSnapshot: item["shareSnapshot"],
    encoded: item["encoded"],
    directoryPath: item["directoryPath"],
    prefix: stringEncodedDeserializer(item["prefix"]),
    marker: item["marker"],
    maxResults: item["maxResults"],
    segment: filesAndDirectoriesListSegmentDeserializer(item["segment"]),
    continuationToken: item["continuationToken"],
    directoryId: item["directoryId"],
  };
}

export function listFilesAndDirectoriesSegmentResponseXmlDeserializer(
  xmlString: string,
): ListFilesAndDirectoriesSegmentResponse {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "serviceEndpoint",
      xmlOptions: { name: "ServiceEndpoint", attribute: true },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "shareName",
      xmlOptions: { name: "ShareName", attribute: true },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "shareSnapshot",
      xmlOptions: { name: "ShareSnapshot", attribute: true },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "encoded",
      xmlOptions: { name: "Encoded", attribute: true },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "directoryPath",
      xmlOptions: { name: "DirectoryPath", attribute: true },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "prefix",
      xmlOptions: { name: "Prefix" },
      type: "object",
      deserializer: stringEncodedXmlObjectDeserializer,
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
      propertyName: "segment",
      xmlOptions: { name: "Entries" },
      type: "object",
      deserializer: filesAndDirectoriesListSegmentXmlObjectDeserializer,
    },
    {
      propertyName: "continuationToken",
      xmlOptions: { name: "NextMarker" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "directoryId",
      xmlOptions: { name: "DirectoryId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<ListFilesAndDirectoriesSegmentResponse>(
    xmlString,
    properties,
    "EnumerationResults",
  );
}

/** An encoded string value. */
export interface StringEncoded {
  /** Whether the value is encoded. */
  encoded?: boolean;
  /** The string content. */
  content?: string;
}

export function stringEncodedDeserializer(item: any): StringEncoded {
  return {
    encoded: item["encoded"],
    content: item["content"],
  };
}

export function stringEncodedXmlDeserializer(xmlString: string): StringEncoded {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "encoded",
      xmlOptions: { name: "Encoded", attribute: true },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "content",
      xmlOptions: { name: "content", unwrapped: true },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<StringEncoded>(xmlString, properties, "StringEncoded");
}

export function stringEncodedXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): StringEncoded {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "encoded",
      xmlOptions: { name: "Encoded", attribute: true },
      type: "primitive",
      primitiveSubtype: "boolean",
    },
    {
      propertyName: "content",
      xmlOptions: { name: "content", unwrapped: true },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeXmlObject<StringEncoded>(xmlObject, properties);
}

/** Abstract for entries that can be listed from Directory. */
export interface FilesAndDirectoriesListSegment {
  /** The directory items. */
  directoryItems: DirectoryItem[];
  /** The file items. */
  fileItems: FileItem[];
}

export function filesAndDirectoriesListSegmentDeserializer(
  item: any,
): FilesAndDirectoriesListSegment {
  return {
    directoryItems: directoryItemArrayDeserializer(item["directoryItems"]),
    fileItems: fileItemArrayDeserializer(item["fileItems"]),
  };
}

export function filesAndDirectoriesListSegmentXmlDeserializer(
  xmlString: string,
): FilesAndDirectoriesListSegment {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "directoryItems",
      xmlOptions: { name: "Directory", unwrapped: true, itemsName: "Directory" },
      type: "array",
      deserializer: directoryItemXmlObjectDeserializer,
    },
    {
      propertyName: "fileItems",
      xmlOptions: { name: "File", unwrapped: true, itemsName: "File" },
      type: "array",
      deserializer: fileItemXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<FilesAndDirectoriesListSegment>(
    xmlString,
    properties,
    "FilesAndDirectoriesListSegment",
  );
}

export function filesAndDirectoriesListSegmentXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): FilesAndDirectoriesListSegment {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "directoryItems",
      xmlOptions: { name: "Directory", unwrapped: true, itemsName: "Directory" },
      type: "array",
      deserializer: directoryItemXmlObjectDeserializer,
    },
    {
      propertyName: "fileItems",
      xmlOptions: { name: "File", unwrapped: true, itemsName: "File" },
      type: "array",
      deserializer: fileItemXmlObjectDeserializer,
    },
  ];
  return deserializeXmlObject<FilesAndDirectoriesListSegment>(xmlObject, properties);
}

export function directoryItemArrayDeserializer(result: Array<DirectoryItem>): any[] {
  return result.map((item) => {
    return directoryItemDeserializer(item);
  });
}

/** A listed directory item. */
export interface DirectoryItem {
  /** The directory name. */
  name: StringEncoded;
  /** The file ID. */
  fileId?: string;
  /** File properties. */
  properties?: FileProperty;
  /** The file attributes. */
  attributes?: string;
  /** The permission key. */
  permissionKey?: string;
}

export function directoryItemDeserializer(item: any): DirectoryItem {
  return {
    name: stringEncodedDeserializer(item["name"]),
    fileId: item["fileId"],
    properties: !item["properties"]
      ? item["properties"]
      : filePropertyDeserializer(item["properties"]),
    attributes: item["attributes"],
    permissionKey: item["permissionKey"],
  };
}

export function directoryItemXmlDeserializer(xmlString: string): DirectoryItem {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "Name" },
      type: "object",
      deserializer: stringEncodedXmlObjectDeserializer,
    },
    {
      propertyName: "fileId",
      xmlOptions: { name: "FileId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "properties",
      xmlOptions: { name: "Properties" },
      type: "object",
      deserializer: filePropertyXmlObjectDeserializer,
    },
    {
      propertyName: "attributes",
      xmlOptions: { name: "Attributes" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "permissionKey",
      xmlOptions: { name: "PermissionKey" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<DirectoryItem>(xmlString, properties, "Directory");
}

export function directoryItemXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): DirectoryItem {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "Name" },
      type: "object",
      deserializer: stringEncodedXmlObjectDeserializer,
    },
    {
      propertyName: "fileId",
      xmlOptions: { name: "FileId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "properties",
      xmlOptions: { name: "Properties" },
      type: "object",
      deserializer: filePropertyXmlObjectDeserializer,
    },
    {
      propertyName: "attributes",
      xmlOptions: { name: "Attributes" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "permissionKey",
      xmlOptions: { name: "PermissionKey" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeXmlObject<DirectoryItem>(xmlObject, properties);
}

/** File properties. */
export interface FileProperty {
  /**
   * Content length of the file. This value may not be up-to-date since an SMB
   * client may have modified the file locally. The value of Content-Length may not
   * reflect that fact until the handle is closed or the op-lock is broken. To
   * retrieve current property values, call Get File Properties.
   */
  contentLength: number;
  /** The creation time. */
  creationTime?: Date;
  /** The last access time. */
  lastAccessTime?: Date;
  /** The last write time. */
  lastWriteTime?: Date;
  /** The change time. */
  changeTime?: Date;
  /** The last modified time. */
  lastModified?: Date;
  /** The ETag of the file. */
  etag?: string;
}

export function filePropertyDeserializer(item: any): FileProperty {
  return {
    contentLength: item["contentLength"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastAccessTime: !item["lastAccessTime"]
      ? item["lastAccessTime"]
      : new Date(item["lastAccessTime"]),
    lastWriteTime: !item["lastWriteTime"] ? item["lastWriteTime"] : new Date(item["lastWriteTime"]),
    changeTime: !item["changeTime"] ? item["changeTime"] : new Date(item["changeTime"]),
    lastModified: !item["lastModified"] ? item["lastModified"] : new Date(item["lastModified"]),
    etag: item["etag"],
  };
}

export function filePropertyXmlDeserializer(xmlString: string): FileProperty {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "contentLength",
      xmlOptions: { name: "Content-Length" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "creationTime",
      xmlOptions: { name: "CreationTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "lastAccessTime",
      xmlOptions: { name: "LastAccessTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "lastWriteTime",
      xmlOptions: { name: "LastWriteTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "changeTime",
      xmlOptions: { name: "ChangeTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "lastModified",
      xmlOptions: { name: "Last-Modified" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "etag",
      xmlOptions: { name: "Etag" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<FileProperty>(xmlString, properties, "FileProperty");
}

export function filePropertyXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): FileProperty {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "contentLength",
      xmlOptions: { name: "Content-Length" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "creationTime",
      xmlOptions: { name: "CreationTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "lastAccessTime",
      xmlOptions: { name: "LastAccessTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "lastWriteTime",
      xmlOptions: { name: "LastWriteTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "changeTime",
      xmlOptions: { name: "ChangeTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "lastModified",
      xmlOptions: { name: "Last-Modified" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "etag",
      xmlOptions: { name: "Etag" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeXmlObject<FileProperty>(xmlObject, properties);
}

export function fileItemArrayDeserializer(result: Array<FileItem>): any[] {
  return result.map((item) => {
    return fileItemDeserializer(item);
  });
}

/** A listed file item. */
export interface FileItem {
  /** The file name. */
  name: StringEncoded;
  /** The file ID. */
  fileId?: string;
  /** File properties. */
  properties: FileProperty;
  /** The file attributes. */
  attributes?: string;
  /** The permission key. */
  permissionKey?: string;
}

export function fileItemDeserializer(item: any): FileItem {
  return {
    name: stringEncodedDeserializer(item["name"]),
    fileId: item["fileId"],
    properties: filePropertyDeserializer(item["properties"]),
    attributes: item["attributes"],
    permissionKey: item["permissionKey"],
  };
}

export function fileItemXmlDeserializer(xmlString: string): FileItem {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "Name" },
      type: "object",
      deserializer: stringEncodedXmlObjectDeserializer,
    },
    {
      propertyName: "fileId",
      xmlOptions: { name: "FileId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "properties",
      xmlOptions: { name: "Properties" },
      type: "object",
      deserializer: filePropertyXmlObjectDeserializer,
    },
    {
      propertyName: "attributes",
      xmlOptions: { name: "Attributes" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "permissionKey",
      xmlOptions: { name: "PermissionKey" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<FileItem>(xmlString, properties, "File");
}

export function fileItemXmlObjectDeserializer(xmlObject: Record<string, unknown>): FileItem {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "name",
      xmlOptions: { name: "Name" },
      type: "object",
      deserializer: stringEncodedXmlObjectDeserializer,
    },
    {
      propertyName: "fileId",
      xmlOptions: { name: "FileId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "properties",
      xmlOptions: { name: "Properties" },
      type: "object",
      deserializer: filePropertyXmlObjectDeserializer,
    },
    {
      propertyName: "attributes",
      xmlOptions: { name: "Attributes" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "permissionKey",
      xmlOptions: { name: "PermissionKey" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeXmlObject<FileItem>(xmlObject, properties);
}

/** An enumeration of handles. */
export interface ListHandlesResponse {
  /** The handle list. */
  handleList?: HandleItem[];
  /** The next marker. */
  continuationToken: string;
}

export function listHandlesResponseDeserializer(item: any): ListHandlesResponse {
  return {
    handleList: !item["handleList"]
      ? item["handleList"]
      : handleItemArrayDeserializer(item["handleList"]),
    continuationToken: item["continuationToken"],
  };
}

export function listHandlesResponseXmlDeserializer(xmlString: string): ListHandlesResponse {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "handleList",
      xmlOptions: { name: "Entries", itemsName: "Handle" },
      type: "array",
      deserializer: handleItemXmlObjectDeserializer,
    },
    {
      propertyName: "continuationToken",
      xmlOptions: { name: "NextMarker" },
      type: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<ListHandlesResponse>(xmlString, properties, "EnumerationResults");
}

export function handleItemArrayDeserializer(result: Array<HandleItem>): any[] {
  return result.map((item) => {
    return handleItemDeserializer(item);
  });
}

/** A listed Azure Storage handle item. */
export interface HandleItem {
  /** XSMB service handle ID */
  handleId: string;
  /** The path. */
  path: StringEncoded;
  /** FileId uniquely identifies the file or directory. */
  fileId: string;
  /** ParentId uniquely identifies the parent directory of the object. */
  parentId?: string;
  /** SMB session ID in context of which the file handle was opened */
  sessionId: string;
  /** Client IP that opened the handle */
  clientIp: string;
  /** Name of the client machine where the share is being mounted */
  clientName: string;
  /**
   * Time when the session that previously opened the handle has last been
   * reconnected. (UTC)
   */
  openTime: Date;
  /** Time handle was last connected to (UTC) */
  lastReconnectTime?: Date;
  /** The access rights. */
  accessRightList?: AccessRight[];
}

export function handleItemDeserializer(item: any): HandleItem {
  return {
    handleId: item["handleId"],
    path: stringEncodedDeserializer(item["path"]),
    fileId: item["fileId"],
    parentId: item["parentId"],
    sessionId: item["sessionId"],
    clientIp: item["clientIp"],
    clientName: item["clientName"],
    openTime: new Date(item["openTime"]),
    lastReconnectTime: !item["lastReconnectTime"]
      ? item["lastReconnectTime"]
      : new Date(item["lastReconnectTime"]),
    accessRightList: !item["accessRightList"]
      ? item["accessRightList"]
      : item["accessRightList"].map((p: any) => {
          return p;
        }),
  };
}

export function handleItemXmlDeserializer(xmlString: string): HandleItem {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "handleId",
      xmlOptions: { name: "HandleId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "path",
      xmlOptions: { name: "Path" },
      type: "object",
      deserializer: stringEncodedXmlObjectDeserializer,
    },
    {
      propertyName: "fileId",
      xmlOptions: { name: "FileId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "parentId",
      xmlOptions: { name: "ParentId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "sessionId",
      xmlOptions: { name: "SessionId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "clientIp",
      xmlOptions: { name: "ClientIp" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "clientName",
      xmlOptions: { name: "ClientName" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "openTime",
      xmlOptions: { name: "OpenTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "lastReconnectTime",
      xmlOptions: { name: "LastReconnectTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "accessRightList",
      xmlOptions: { name: "AccessRightList", itemsName: "AccessRight" },
      type: "array",
      itemType: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeFromXml<HandleItem>(xmlString, properties, "Handle");
}

export function handleItemXmlObjectDeserializer(xmlObject: Record<string, unknown>): HandleItem {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "handleId",
      xmlOptions: { name: "HandleId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "path",
      xmlOptions: { name: "Path" },
      type: "object",
      deserializer: stringEncodedXmlObjectDeserializer,
    },
    {
      propertyName: "fileId",
      xmlOptions: { name: "FileId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "parentId",
      xmlOptions: { name: "ParentId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "sessionId",
      xmlOptions: { name: "SessionId" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "clientIp",
      xmlOptions: { name: "ClientIp" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "clientName",
      xmlOptions: { name: "ClientName" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "openTime",
      xmlOptions: { name: "OpenTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "lastReconnectTime",
      xmlOptions: { name: "LastReconnectTime" },
      type: "date",
      dateEncoding: "rfc7231",
    },
    {
      propertyName: "accessRightList",
      xmlOptions: { name: "AccessRightList", itemsName: "AccessRight" },
      type: "array",
      itemType: "primitive",
      primitiveSubtype: "string",
    },
  ];
  return deserializeXmlObject<HandleItem>(xmlObject, properties);
}

/** Access rights of the access policy. */
export type AccessRight = "Read" | "Write" | "Delete";

/** The list of file ranges */
export interface ShareFileRangeList {
  /** The file ranges. */
  ranges?: FileRange[];
  /** The clear ranges. */
  clearRanges?: ClearRange[];
}

export function shareFileRangeListDeserializer(item: any): ShareFileRangeList {
  return {
    ranges: !item["ranges"] ? item["ranges"] : fileRangeArrayDeserializer(item["ranges"]),
    clearRanges: !item["clearRanges"]
      ? item["clearRanges"]
      : clearRangeArrayDeserializer(item["clearRanges"]),
  };
}

export function shareFileRangeListXmlDeserializer(xmlString: string): ShareFileRangeList {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "ranges",
      xmlOptions: { name: "Range", unwrapped: true, itemsName: "Range" },
      type: "array",
      deserializer: fileRangeXmlObjectDeserializer,
    },
    {
      propertyName: "clearRanges",
      xmlOptions: { name: "ClearRange", unwrapped: true, itemsName: "ClearRange" },
      type: "array",
      deserializer: clearRangeXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<ShareFileRangeList>(xmlString, properties, "Ranges");
}

export function fileRangeArrayDeserializer(result: Array<FileRange>): any[] {
  return result.map((item) => {
    return fileRangeDeserializer(item);
  });
}

/** An Azure Storage file range. */
export interface FileRange {
  /** Start of the range. */
  start: number;
  /** End of the range. */
  end: number;
}

export function fileRangeDeserializer(item: any): FileRange {
  return {
    start: item["start"],
    end: item["end"],
  };
}

export function fileRangeXmlDeserializer(xmlString: string): FileRange {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "start",
      xmlOptions: { name: "Start" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "end",
      xmlOptions: { name: "End" },
      type: "primitive",
      primitiveSubtype: "number",
    },
  ];
  return deserializeFromXml<FileRange>(xmlString, properties, "Range");
}

export function fileRangeXmlObjectDeserializer(xmlObject: Record<string, unknown>): FileRange {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "start",
      xmlOptions: { name: "Start" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "end",
      xmlOptions: { name: "End" },
      type: "primitive",
      primitiveSubtype: "number",
    },
  ];
  return deserializeXmlObject<FileRange>(xmlObject, properties);
}

export function clearRangeArrayDeserializer(result: Array<ClearRange>): any[] {
  return result.map((item) => {
    return clearRangeDeserializer(item);
  });
}

/** A clear range. */
export interface ClearRange {
  /** Start of the range. */
  start: number;
  /** End of the range. */
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
    {
      propertyName: "start",
      xmlOptions: { name: "Start" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "end",
      xmlOptions: { name: "End" },
      type: "primitive",
      primitiveSubtype: "number",
    },
  ];
  return deserializeFromXml<ClearRange>(xmlString, properties, "ClearRange");
}

export function clearRangeXmlObjectDeserializer(xmlObject: Record<string, unknown>): ClearRange {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "start",
      xmlOptions: { name: "Start" },
      type: "primitive",
      primitiveSubtype: "number",
    },
    {
      propertyName: "end",
      xmlOptions: { name: "End" },
      type: "primitive",
      primitiveSubtype: "number",
    },
  ];
  return deserializeXmlObject<ClearRange>(xmlObject, properties);
}

/** The share token intent. */
export enum KnownShareTokenIntent {
  /** backup */
  Backup = "backup",
}

/**
 * The share token intent. \
 * {@link KnownShareTokenIntent} can be used interchangeably with ShareTokenIntent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **backup**: backup
 */
export type ShareTokenIntent = string;
/** The type of share information to include in the listing. */
export type ListSharesIncludeType = "snapshots" | "metadata" | "deleted";

/** The access tier of the share. */
export enum KnownShareAccessTier {
  /** TransactionOptimized */
  TransactionOptimized = "TransactionOptimized",
  /** Hot */
  Hot = "Hot",
  /** Cool */
  Cool = "Cool",
  /** Premium */
  Premium = "Premium",
}

/**
 * The access tier of the share. \
 * {@link KnownShareAccessTier} can be used interchangeably with ShareAccessTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TransactionOptimized**: TransactionOptimized \
 * **Hot**: Hot \
 * **Cool**: Cool \
 * **Premium**: Premium
 */
export type ShareAccessTier = string;
/** The delete snapshots option type. */
export type DeleteSnapshotsOptionType = "include" | "include-leased";

/** The file property semantics. */
export enum KnownFilePropertySemantics {
  /** New */
  New = "New",
  /** Restore */
  Restore = "Restore",
}

/**
 * The file property semantics. \
 * {@link KnownFilePropertySemantics} can be used interchangeably with FilePropertySemantics,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **New**: New \
 * **Restore**: Restore
 */
export type FilePropertySemantics = string;

/** The NFS file type. */
export enum KnownNfsFileType {
  /** Regular */
  Regular = "Regular",
  /** Directory */
  Directory = "Directory",
  /** SymLink */
  SymLink = "SymLink",
}

/**
 * The NFS file type. \
 * {@link KnownNfsFileType} can be used interchangeably with NfsFileType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regular**: Regular \
 * **Directory**: Directory \
 * **SymLink**: SymLink
 */
export type NfsFileType = string;
/** The type of file information to include in the listing. */
export type ListFilesIncludeType = "Timestamps" | "Etag" | "Attributes" | "PermissionKey";
/** The copy status. */
export type CopyStatus = "pending" | "success" | "aborted" | "failed";
/** Specify one of the following options: - Update: Writes the bytes specified by the request body into the specified range. - Clear: Clears the specified range and releases the space used in storage for that range. */
export type FileRangeWriteType = "update" | "clear";
/** The file last written mode. */
export type FileLastWrittenMode = "Now" | "Preserve";
/** Only update is supported: - Update: Writes the bytes downloaded from the source url into the specified range. */
export type FileRangeWriteFromUrlType = "update";
/** The permission copy mode type. */
export type PermissionCopyModeType = "source" | "override";
/** The mode copy mode. */
export type ModeCopyMode = "source" | "override";
/** The owner copy mode. */
export type OwnerCopyMode = "source" | "override";

/** The available API versions */
export enum KnownVersions {
  /** API Version 2026-04-06 */
  V20260406 = "2026-04-06",
}
