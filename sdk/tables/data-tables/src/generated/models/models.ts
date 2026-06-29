// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  XmlPropertyMetadata,
  XmlPropertyDeserializeMetadata,
  serializeToXml,
  deserializeFromXml,
  deserializeXmlObject,
  XmlSerializedObject,
} from "../static-helpers/serialization/xml-helpers.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The properties for the table query response. */
export interface _TableQueryResponse {
  /** The metadata response of the table. */
  odataMetadata?: string;
  /** The requested list of tables. */
  value?: TableProperties[];
}

export function _tableQueryResponseDeserializer(item: any): _TableQueryResponse {
  return {
    odataMetadata: item["odata.metadata"],
    value: !item["value"] ? item["value"] : tablePropertiesArrayDeserializer(item["value"]),
  };
}

export function tablePropertiesArraySerializer(result: Array<TableProperties>): any[] {
  return result.map((item) => {
    return tablePropertiesSerializer(item);
  });
}

export function tablePropertiesArrayDeserializer(result: Array<TableProperties>): any[] {
  return result.map((item) => {
    return tablePropertiesDeserializer(item);
  });
}

/** The properties for the table response. */
export interface TableProperties {
  /** The name of the table. */
  tableName?: string;
  /** The odata type of the table. */
  odataType?: string;
  /** The id of the table. */
  odataId?: string;
  /** The edit link of the table. */
  odataEditLink?: string;
}

export function tablePropertiesSerializer(item: TableProperties): any {
  return {
    TableName: item["tableName"],
    "odata.type": item["odataType"],
    "odata.id": item["odataId"],
    "odata.editLink": item["odataEditLink"],
  };
}

export function tablePropertiesDeserializer(item: any): TableProperties {
  return {
    tableName: item["TableName"],
    odataType: item["odata.type"],
    odataId: item["odata.id"],
    odataEditLink: item["odata.editLink"],
  };
}

/** Table JSON error. */
export interface TablesError {
  /** The error message. */
  message?: string;
}

export function tablesErrorDeserializer(item: any): TablesError {
  return {
    message: item["Message"],
  };
}

/** The table properties as returned in an echo response. */
export interface TableResponse {
  /** The name of the table. */
  tableName?: string;
  /** The odata type of the table. */
  odataType?: string;
  /** The id of the table. */
  odataId?: string;
  /** The edit link of the table. */
  odataEditLink?: string;
  /** The metadata response of the table. */
  odataMetadata?: string;
}

export function tableResponseDeserializer(item: any): TableResponse {
  return {
    tableName: item["TableName"],
    odataType: item["odata.type"],
    odataId: item["odata.id"],
    odataEditLink: item["odata.editLink"],
    odataMetadata: item["odata.metadata"],
  };
}

/** The properties for the table entity query response. */
export interface TableEntityQueryResponse {
  /** The metadata response of the table. */
  odataMetadata?: string;
  /** List of table entities. */
  value?: Record<string, any>[];
}

export function tableEntityQueryResponseDeserializer(item: any): TableEntityQueryResponse {
  return {
    odataMetadata: item["odata.metadata"],
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return Object.fromEntries(Object.entries(p).map(([k1, p1]: [string, any]) => [k1, p1]));
        }),
  };
}

/** Table signed identifiers. */
export interface SignedIdentifiers {
  /** An array of signed identifiers */
  identifiers: SignedIdentifier[];
}

export function signedIdentifiersSerializer(item: SignedIdentifiers): any {
  return { identifiers: signedIdentifierArraySerializer(item["identifiers"]) };
}

export function signedIdentifiersDeserializer(item: any): SignedIdentifiers {
  return {
    identifiers: signedIdentifierArrayDeserializer(item["identifiers"]),
  };
}

export function signedIdentifiersXmlSerializer(item: SignedIdentifiers): string {
  const properties: XmlPropertyMetadata[] = [
    {
      propertyName: "identifiers",
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
      propertyName: "identifiers",
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

/** An access policy. */
export interface AccessPolicy {
  /** The date-time the policy is active. */
  start: string;
  /** The date-time the policy expires. */
  expiry: string;
  /** The permissions for acl the policy. */
  permission: string;
}

export function accessPolicySerializer(item: AccessPolicy): any {
  return { start: item["start"], expiry: item["expiry"], permission: item["permission"] };
}

export function accessPolicyDeserializer(item: any): AccessPolicy {
  return {
    start: item["start"],
    expiry: item["expiry"],
    permission: item["permission"],
  };
}

export function accessPolicyXmlSerializer(item: AccessPolicy): string {
  const properties: XmlPropertyMetadata[] = [
    { propertyName: "start", xmlOptions: { name: "Start" }, type: "primitive" },
    { propertyName: "expiry", xmlOptions: { name: "Expiry" }, type: "primitive" },
    { propertyName: "permission", xmlOptions: { name: "Permission" }, type: "primitive" },
  ];
  return serializeToXml(item, properties, "AccessPolicy");
}

export function accessPolicyXmlDeserializer(xmlString: string): AccessPolicy {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "start",
      xmlOptions: { name: "Start" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "expiry",
      xmlOptions: { name: "Expiry" },
      type: "primitive",
      primitiveSubtype: "string",
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
  return { Start: item["start"], Expiry: item["expiry"], Permission: item["permission"] };
}

export function accessPolicyXmlObjectDeserializer(
  xmlObject: Record<string, unknown>,
): AccessPolicy {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "start",
      xmlOptions: { name: "Start" },
      type: "primitive",
      primitiveSubtype: "string",
    },
    {
      propertyName: "expiry",
      xmlOptions: { name: "Expiry" },
      type: "primitive",
      primitiveSubtype: "string",
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

/** The Tables service XML error. */
export interface TableServiceError {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
}

export function tableServiceErrorDeserializer(item: any): TableServiceError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

export function tableServiceErrorXmlDeserializer(xmlString: string): TableServiceError {
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
  ];
  return deserializeFromXml<TableServiceError>(
    xmlString,
    properties,
    "TablesServiceError",
    undefined,
    undefined,
    { propertyName: "additionalProperties", excludeNames: ["Code", "Message"] },
  );
}

/** The service properties. */
export interface TableServiceProperties {
  /** The logging properties. */
  logging?: Logging;
  /** The hour metrics properties. */
  hourMetrics?: Metrics;
  /** The minute metrics properties. */
  minuteMetrics?: Metrics;
  /** The CORS properties. */
  cors?: CorsRule[];
}

export function tableServicePropertiesSerializer(item: TableServiceProperties): any {
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

export function tableServicePropertiesDeserializer(item: any): TableServiceProperties {
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

export function tableServicePropertiesXmlSerializer(item: TableServiceProperties): string {
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

export function tableServicePropertiesXmlDeserializer(xmlString: string): TableServiceProperties {
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
  return deserializeFromXml<TableServiceProperties>(
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
  /**
   * Indicates the number of days that metrics or logging or soft-deleted data
   * should be retained. All data older than this value will be deleted.
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

/** The metrics properties. */
export interface Metrics {
  /** The version of the metrics properties. */
  version?: string;
  /** Indicates whether metrics are enabled for the Table service. */
  enabled: boolean;
  /**
   * Indicates whether metrics should generate summary statistics for called API
   * operations.
   */
  includeAPIs?: boolean;
  /** The retention policy of the metrics. */
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
  /**
   * The origin domains that are permitted to make a request against the service via
   * CORS. The origin domain is the domain from which the request originates. Note
   * that the origin must be an exact case-sensitive match with the origin that the
   * user age sends to the service. You can also use the wildcard character '*' to
   * allow all origin domains to make requests via CORS.
   */
  allowedOrigins: string;
  /**
   * The methods (HTTP request verbs) that the origin domain may use for a CORS
   * request.
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

/** Stats for the table service. */
export interface TableServiceStats {
  /** Geo-Replication information for the Secondary Storage Service. */
  geoReplication?: GeoReplication;
}

export function tableServiceStatsDeserializer(item: any): TableServiceStats {
  return {
    geoReplication: !item["geoReplication"]
      ? item["geoReplication"]
      : geoReplicationDeserializer(item["geoReplication"]),
  };
}

export function tableServiceStatsXmlDeserializer(xmlString: string): TableServiceStats {
  const properties: XmlPropertyDeserializeMetadata[] = [
    {
      propertyName: "geoReplication",
      xmlOptions: { name: "GeoReplication" },
      type: "object",
      deserializer: geoReplicationXmlObjectDeserializer,
    },
  ];
  return deserializeFromXml<TableServiceStats>(xmlString, properties, "StorageServiceStats");
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

/** The status of the secondary location. */
export type GeoReplicationStatusType = "live" | "bootstrap" | "unavailable";
/** Specifies the level of metadata to be returned with the response. */
export type OdataMetadataFormat =
  | "application/json;odata=nometadata"
  | "application/json;odata=minimalmetadata"
  | "application/json;odata=fullmetadata";
/** Specifies whether the response should echo the created content. */
export type ResponseFormat = "return-no-content" | "return-content";

/** The Azure Tables service versions. */
export enum KnownVersions {
  /** The 2019-02-02 version of the Azure.Data.Tables service. */
  V20190202 = "2019-02-02",
}
