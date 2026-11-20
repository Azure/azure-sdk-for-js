// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";

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

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  readonly actionType?: ActionType;
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

/** Localized display information for an operation. */
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
  /** Indicates the operation is initiated by a user. */
  User = "user",
  /** Indicates the operation is initiated by a system. */
  System = "system",
  /** Indicates the operation is initiated by a user or system. */
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

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** Represents a FlowProfile Azure resource, which defines a data replication scenario with a specific data classification and a set of configurable policy rules. */
export interface FlowProfile extends TrackedResource {
  /** The set of configuration properties that define the behavior and rules of the FlowProfile. */
  properties?: FlowProfileProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function flowProfileSerializer(item: FlowProfile): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : flowProfilePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function flowProfileDeserializer(item: any): FlowProfile {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : flowProfilePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Defines the full set of properties for a FlowProfile resource. */
export interface FlowProfileProperties {
  /** The current provisioning state of the FlowProfile. */
  readonly provisioningState?: ProvisioningState;
  /** A guid represented as a string for the FlowProfile resource, assigned by the system. */
  readonly flowProfileId?: string;
  /** The data replication scenario handled by this FlowProfile. Please not, that this value cannot be updated after creation. */
  replicationScenario: DataClassType;
  /** The operational status of the FlowProfile. */
  status: FlowProfileStatus;
  /** A user-defined description of the FlowProfile. */
  description: string;
  /** A set of configurable rulesets applied to this FlowProfile. */
  rulesets?: FlowProfileRulesets;
}

export function flowProfilePropertiesSerializer(item: FlowProfileProperties): any {
  return {
    replicationScenario: item["replicationScenario"],
    status: item["status"],
    description: item["description"],
    rulesets: !item["rulesets"]
      ? item["rulesets"]
      : flowProfileRulesetsSerializer(item["rulesets"]),
  };
}

export function flowProfilePropertiesDeserializer(item: any): FlowProfileProperties {
  return {
    provisioningState: item["provisioningState"],
    flowProfileId: item["flowProfileId"],
    replicationScenario: item["replicationScenario"],
    status: item["status"],
    description: item["description"],
    rulesets: !item["rulesets"]
      ? item["rulesets"]
      : flowProfileRulesetsDeserializer(item["rulesets"]),
  };
}

/** Provisioning state of the pipeline, connection, flow. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Resource has been accepted for creation. */
  Accepted = "Accepted",
}

/**
 * Provisioning state of the pipeline, connection, flow. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Accepted**: Resource has been accepted for creation.
 */
export type ProvisioningState = string;

/** Defines the supported replication scenarios for Azure Data Transfer. */
export enum KnownDataClassType {
  /** Represents standard message-based data, including Azure Service and Event Hub, used in message replication. */
  Messaging = "Messaging",
  /** Represents transactional request/response data types from API endpoints. */
  API = "API",
  /** Represents data types that require continuous, real-time streaming replication (e.g., video). */
  Stream = "Stream",
  /** Represents standard file-based data, including Azure Blob and Table Storage, used in general-purpose replication. */
  Files = "Files",
  /** Represents data related to development, security, and operations workflows such as build artifacts subject to an NCDSMO policy. */
  SoftwareArtifacts = "SoftwareArtifacts",
  /** Represents rich content types such as documents (e.g., Word, PDF) and images that require specialized replication handling. */
  Complex = "Complex",
}

/**
 * Defines the supported replication scenarios for Azure Data Transfer. \
 * {@link KnownDataClassType} can be used interchangeably with DataClassType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Messaging**: Represents standard message-based data, including Azure Service and Event Hub, used in message replication. \
 * **API**: Represents transactional request\/response data types from API endpoints. \
 * **Stream**: Represents data types that require continuous, real-time streaming replication (e.g., video). \
 * **Files**: Represents standard file-based data, including Azure Blob and Table Storage, used in general-purpose replication. \
 * **SoftwareArtifacts**: Represents data related to development, security, and operations workflows such as build artifacts subject to an NCDSMO policy. \
 * **Complex**: Represents rich content types such as documents (e.g., Word, PDF) and images that require specialized replication handling.
 */
export type DataClassType = string;

/** The allowed statuses of a FlowProfile. */
export enum KnownFlowProfileStatus {
  /** Defines a FlowProfile that can no longer be selected. */
  Obsolete = "Obsolete",
  /** Defines a FlowProfile that is enabled. */
  Enabled = "Enabled",
  /** Defines a FlowProfile that is disabled. */
  Disabled = "Disabled",
}

/**
 * The allowed statuses of a FlowProfile. \
 * {@link KnownFlowProfileStatus} can be used interchangeably with FlowProfileStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Obsolete**: Defines a FlowProfile that can no longer be selected. \
 * **Enabled**: Defines a FlowProfile that is enabled. \
 * **Disabled**: Defines a FlowProfile that is disabled.
 */
export type FlowProfileStatus = string;

/** The allowed set of configurable rulesets for a FlowProfile resource, used during data replication. All rulesets are optional, and any ruleset configured will be applied to every applicable replicating data. Any data that fails a ruleset will be denied replication. If a ruleset is not configured then the ruleset is considered disabled and will not apply towards replicating data. */
export interface FlowProfileRulesets {
  /** Antivirus scanning rules for replicated data. */
  antivirus?: AntivirusRuleset;
  /** Rules for handling archive files during replication. */
  archives?: ArchiveRuleset;
  /** Rules that enforce minimum and maximum data size limits. */
  dataSize?: DataSizeRuleset;
  /** Rules for filtering files based on MIME types. */
  mimeFilters?: MimeFilterRuleset;
  /** Rules for filtering XML content using XSD schemas. */
  xmlFilters?: XmlFilterRuleset;
  /** Rules for detecting and blocking specific text patterns. */
  textMatching?: TextMatchingRuleset;
}

export function flowProfileRulesetsSerializer(item: FlowProfileRulesets): any {
  return {
    antivirus: !item["antivirus"]
      ? item["antivirus"]
      : antivirusRulesetSerializer(item["antivirus"]),
    archives: !item["archives"] ? item["archives"] : archiveRulesetSerializer(item["archives"]),
    dataSize: !item["dataSize"] ? item["dataSize"] : dataSizeRulesetSerializer(item["dataSize"]),
    mimeFilters: !item["mimeFilters"]
      ? item["mimeFilters"]
      : mimeFilterRulesetSerializer(item["mimeFilters"]),
    xmlFilters: !item["xmlFilters"]
      ? item["xmlFilters"]
      : xmlFilterRulesetSerializer(item["xmlFilters"]),
    textMatching: !item["textMatching"]
      ? item["textMatching"]
      : textMatchingRulesetSerializer(item["textMatching"]),
  };
}

export function flowProfileRulesetsDeserializer(item: any): FlowProfileRulesets {
  return {
    antivirus: !item["antivirus"]
      ? item["antivirus"]
      : antivirusRulesetDeserializer(item["antivirus"]),
    archives: !item["archives"] ? item["archives"] : archiveRulesetDeserializer(item["archives"]),
    dataSize: !item["dataSize"] ? item["dataSize"] : dataSizeRulesetDeserializer(item["dataSize"]),
    mimeFilters: !item["mimeFilters"]
      ? item["mimeFilters"]
      : mimeFilterRulesetDeserializer(item["mimeFilters"]),
    xmlFilters: !item["xmlFilters"]
      ? item["xmlFilters"]
      : xmlFilterRulesetDeserializer(item["xmlFilters"]),
    textMatching: !item["textMatching"]
      ? item["textMatching"]
      : textMatchingRulesetDeserializer(item["textMatching"]),
  };
}

/** Antivirus scanning rules for replicating data. By default, all antivirus scanning solutions are disabled. */
export interface AntivirusRuleset {
  /** Optional. The list of antiviruses to be used as a scanning solution for replicating data. */
  avSolutions?: AntivirusSolutions[];
}

export function antivirusRulesetSerializer(item: AntivirusRuleset): any {
  return {
    avSolutions: !item["avSolutions"]
      ? item["avSolutions"]
      : item["avSolutions"].map((p: any) => {
          return p;
        }),
  };
}

export function antivirusRulesetDeserializer(item: any): AntivirusRuleset {
  return {
    avSolutions: !item["avSolutions"]
      ? item["avSolutions"]
      : item["avSolutions"].map((p: any) => {
          return p;
        }),
  };
}

/** The list of Antivirus solutions currently provided. */
export enum KnownAntivirusSolutions {
  /** Option to use Microsoft Defender antivirus scanning software as the scanning solution. */
  Defender = "Defender",
  /** Option to use the external ClamAV open-source software as an antivirus scanning solution. */
  ClamAv = "ClamAv",
}

/**
 * The list of Antivirus solutions currently provided. \
 * {@link KnownAntivirusSolutions} can be used interchangeably with AntivirusSolutions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Defender**: Option to use Microsoft Defender antivirus scanning software as the scanning solution. \
 * **ClamAv**: Option to use the external ClamAV open-source software as an antivirus scanning solution.
 */
export type AntivirusSolutions = string;

/** Rules for regulating supported archive files (BZip2, Cpio, Deb, GZip, Rpm, Tar, Zip) during data replication. All properties are optional and only the configured options will be applied against archives. As an example, suppose minimumSizeForExpansion is 10 MiB and maximumExpansionSizeLimit is 1 GiB. Then all archives smaller than 10 MiB will be treated as though the archive ruleset is disabled, although other rulesets will apply as usual. Furthermore, all archives at least 10 MiB in size but with a decompressed size greater than 1 GiB will fail the ruleset. All other archives will have their contents extracted and each extracted element will be applied to all rulesets. */
export interface ArchiveRuleset {
  /** Optional. Default is 0. The minimum archive file size (in bytes) required to trigger expansion during replication. Any archive file size below the configured threshold will skip the rest of the configured rulesets for archives. */
  minimumSizeForExpansion?: number;
  /** Optional. The combined maximum size (in bytes) of all extracted files that an expanded archive is allowed to reach. Archives exceeding the max limit will be denied for replication. */
  maximumExpansionSizeLimit?: number;
  /** Optional. The maximum depth of nested archives that can be expanded. Limits how many layers of embedded archives will be processed. Archives exceeding the max limit will be denied for replication. */
  maximumDepthLimit?: number;
  /** Optional. Provides the multiplication value for an archive in total based on the initial object being validated. This value takes the root object size and multiplies it by this value to create a maximum. Once this maximum is exceeded, the archive is failed. Used to detect and block archives with suspiciously high compression (e.g., zip bombs). */
  maximumCompressionRatioLimit?: number;
}

export function archiveRulesetSerializer(item: ArchiveRuleset): any {
  return {
    minimumSizeForExpansion: item["minimumSizeForExpansion"],
    maximumExpansionSizeLimit: item["maximumExpansionSizeLimit"],
    maximumDepthLimit: item["maximumDepthLimit"],
    maximumCompressionRatioLimit: item["maximumCompressionRatioLimit"],
  };
}

export function archiveRulesetDeserializer(item: any): ArchiveRuleset {
  return {
    minimumSizeForExpansion: item["minimumSizeForExpansion"],
    maximumExpansionSizeLimit: item["maximumExpansionSizeLimit"],
    maximumDepthLimit: item["maximumDepthLimit"],
    maximumCompressionRatioLimit: item["maximumCompressionRatioLimit"],
  };
}

/** Defines rules that enforce minimum and maximum file size limits for data replication. */
export interface DataSizeRuleset {
  /** Optional. Specifies the maximum allowed size (in bytes) for files to be replicated. Any file size greater than maximum will be denied replication. */
  maximum?: number;
  /** Optional. Default is 0. Specifies the minimum required size (in bytes) for a file to be eligible for replication. Any file size less than minimum will be denied replication. */
  minimum?: number;
}

export function dataSizeRulesetSerializer(item: DataSizeRuleset): any {
  return { maximum: item["maximum"], minimum: item["minimum"] };
}

export function dataSizeRulesetDeserializer(item: any): DataSizeRuleset {
  return {
    maximum: item["maximum"],
    minimum: item["minimum"],
  };
}

/** Rules for filtering files based on Media types (f.k.a MIME types). */
export interface MimeFilterRuleset {
  /** Specifies whether the filter is an allow list or deny list. For more detail, please refer to the FilterType model. */
  type?: FilterType;
  /** Defines the Media types (f.k.a MIME types) and associated file extensions to be filtered. For more detail, please refer to the MimeTypeFiler model. */
  filters?: MimeTypeFilter[];
}

export function mimeFilterRulesetSerializer(item: MimeFilterRuleset): any {
  return {
    type: item["type"],
    filters: !item["filters"] ? item["filters"] : mimeTypeFilterArraySerializer(item["filters"]),
  };
}

export function mimeFilterRulesetDeserializer(item: any): MimeFilterRuleset {
  return {
    type: item["type"],
    filters: !item["filters"] ? item["filters"] : mimeTypeFilterArrayDeserializer(item["filters"]),
  };
}

/** Specifies whether the filter applies an allow or deny policy. */
export enum KnownFilterType {
  /** Defines an allow filter used for allowlist. */
  Allow = "Allow",
  /** Defines a denying filter used for blocklisting. */
  Deny = "Deny",
}

/**
 * Specifies whether the filter applies an allow or deny policy. \
 * {@link KnownFilterType} can be used interchangeably with FilterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**: Defines an allow filter used for allowlist. \
 * **Deny**: Defines a denying filter used for blocklisting.
 */
export type FilterType = string;

export function mimeTypeFilterArraySerializer(result: Array<MimeTypeFilter>): any[] {
  return result.map((item) => {
    return mimeTypeFilterSerializer(item);
  });
}

export function mimeTypeFilterArrayDeserializer(result: Array<MimeTypeFilter>): any[] {
  return result.map((item) => {
    return mimeTypeFilterDeserializer(item);
  });
}

/** Defines a list of Media types (f.k.a MIME Types) and associated file extensions subject to filtering. */
export interface MimeTypeFilter {
  /** The Media Types (f.k.a MIME types), following IANA standards (e.g., application/json, image/png). For a more detailed list of allowed media types please refer to the Tika documentation: https://github.com/apache/tika/blob/main/tika-core/src/main/resources/org/apache/tika/mime/tika-mimetypes.xml */
  media?: string;
  /** A list of file extensions associated with the specified Media type (e.g., .json, .png). To specify files with no extension, use an empty string ""." */
  extensions?: string[];
}

export function mimeTypeFilterSerializer(item: MimeTypeFilter): any {
  return {
    media: item["media"],
    extensions: !item["extensions"]
      ? item["extensions"]
      : item["extensions"].map((p: any) => {
          return p;
        }),
  };
}

export function mimeTypeFilterDeserializer(item: any): MimeTypeFilter {
  return {
    media: item["media"],
    extensions: !item["extensions"]
      ? item["extensions"]
      : item["extensions"].map((p: any) => {
          return p;
        }),
  };
}

/** Rules for filtering XML content using XSD schemas. */
export interface XmlFilterRuleset {
  /** The default XML namespace used for schema validation. */
  defaultNamespace?: string;
  /** Defines the method for referencing the xml schema. */
  reference?: XmlReferenceType;
  /** The inline XSD schema to be used for validation. */
  schema?: string;
}

export function xmlFilterRulesetSerializer(item: XmlFilterRuleset): any {
  return {
    defaultNamespace: item["defaultNamespace"],
    reference: item["reference"],
    schema: item["schema"],
  };
}

export function xmlFilterRulesetDeserializer(item: any): XmlFilterRuleset {
  return {
    defaultNamespace: item["defaultNamespace"],
    reference: item["reference"],
    schema: item["schema"],
  };
}

/** Specifies how to reference the XML for processing. */
export enum KnownXmlReferenceType {
  /** Defines a referencing procedure where the xml schema will be provided inline. */
  Inline = "Inline",
}

/**
 * Specifies how to reference the XML for processing. \
 * {@link KnownXmlReferenceType} can be used interchangeably with XmlReferenceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inline**: Defines a referencing procedure where the xml schema will be provided inline.
 */
export type XmlReferenceType = string;

/** Rules for detecting and blocking specific text patterns. If a file contains a text pattern that is part of the configured deny list, the file will be denied. */
export interface TextMatchingRuleset {
  /** A list of text patterns to block, each with matching rules and case sensitivity options. */
  deny?: {
    text: string;
    matchType: MatchType;
    caseSensitivity: Casing;
  }[];
}

export function textMatchingRulesetSerializer(item: TextMatchingRuleset): any {
  return {
    deny: !item["deny"] ? item["deny"] : _textMatchingRulesetDenyArraySerializer(item["deny"]),
  };
}

export function textMatchingRulesetDeserializer(item: any): TextMatchingRuleset {
  return {
    deny: !item["deny"] ? item["deny"] : _textMatchingRulesetDenyArrayDeserializer(item["deny"]),
  };
}

export function _textMatchingRulesetDenyArraySerializer(
  result: Array<_TextMatchingRulesetDeny>,
): any[] {
  return result.map((item) => {
    return _textMatchingRulesetDenySerializer(item);
  });
}

export function _textMatchingRulesetDenyArrayDeserializer(
  result: Array<_TextMatchingRulesetDeny>,
): any[] {
  return result.map((item) => {
    return _textMatchingRulesetDenyDeserializer(item);
  });
}

/** model interface _TextMatchingRulesetDeny */
export interface _TextMatchingRulesetDeny {
  /** The word or phrase to match against replicated content. A phrase with spaces will be considered a single substring. */
  text: string;
  /** Specifies the text matching condition for text comparison. For more detail please refer to the MatchType model. */
  matchType: MatchType;
  /** Specifies the text matching conditions based on casing. For more detail please refer to the Casing model. */
  caseSensitivity: Casing;
}

export function _textMatchingRulesetDenySerializer(item: _TextMatchingRulesetDeny): any {
  return {
    text: item["text"],
    matchType: item["matchType"],
    caseSensitivity: item["caseSensitivity"],
  };
}

export function _textMatchingRulesetDenyDeserializer(item: any): _TextMatchingRulesetDeny {
  return {
    text: item["text"],
    matchType: item["matchType"],
    caseSensitivity: item["caseSensitivity"],
  };
}

/** The text pattern matching conditions for text comparison. */
export enum KnownMatchType {
  /** The option to pattern match substrings within all text content. For example, "hello world" would be found in "chello worlds". */
  Partial = "Partial",
  /** The option to pattern match the entire string explicitly. For example, "hello world" would NOT be found in "chello worlds". */
  Complete = "Complete",
}

/**
 * The text pattern matching conditions for text comparison. \
 * {@link KnownMatchType} can be used interchangeably with MatchType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Partial**: The option to pattern match substrings within all text content. For example, "hello world" would be found in "chello worlds". \
 * **Complete**: The option to pattern match the entire string explicitly. For example, "hello world" would NOT be found in "chello worlds".
 */
export type MatchType = string;

/** Text casing comparison options - diacritics casing is also supported. */
export enum KnownCasing {
  /** Ignores casing when performing pattern matching. For example, "Hello World" would be found in "hello world". */
  Insensitive = "Insensitive",
  /** Requires exact casing for the pattern match. For example, "Hello World" would NOT not be found in "hello world". */
  Sensitive = "Sensitive",
}

/**
 * Text casing comparison options - diacritics casing is also supported. \
 * {@link KnownCasing} can be used interchangeably with Casing,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Insensitive**: Ignores casing when performing pattern matching. For example, "Hello World" would be found in "hello world". \
 * **Sensitive**: Requires exact casing for the pattern match. For example, "Hello World" would NOT not be found in "hello world".
 */
export type Casing = string;

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : Object.fromEntries(
          Object.entries(item["userAssignedIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
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

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
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

export function resourceSerializer(_item: Resource): any {
  return {};
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
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** Defines the patchable properties for a FlowProfile resource. */
export interface FlowProfilePatch {
  /** Properties of FlowProfile patch body. */
  properties?: FlowProfilePatchProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function flowProfilePatchSerializer(item: FlowProfilePatch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : flowProfilePatchPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
  };
}

/** Represents the updatable properties of a FlowProfile. */
export interface FlowProfilePatchProperties {
  /** The current provisioning state of the FlowProfile resource. */
  readonly provisioningState?: ProvisioningState;
  /** A description of the FlowProfile that defines the replication scenario. */
  description?: string;
  /** A set of configurable rulesets applied to this FlowProfile. */
  rulesets?: FlowProfileRulesets;
  /** The operational status of the FlowProfile. */
  status?: FlowProfileStatus;
}

export function flowProfilePatchPropertiesSerializer(item: FlowProfilePatchProperties): any {
  return {
    description: item["description"],
    rulesets: !item["rulesets"]
      ? item["rulesets"]
      : flowProfileRulesetsSerializer(item["rulesets"]),
    status: item["status"],
  };
}

/** The response of a FlowProfile list operation. */
export interface _FlowProfileListResult {
  /** The FlowProfile items on this page */
  value: FlowProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _flowProfileListResultDeserializer(item: any): _FlowProfileListResult {
  return {
    value: flowProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function flowProfileArraySerializer(result: Array<FlowProfile>): any[] {
  return result.map((item) => {
    return flowProfileSerializer(item);
  });
}

export function flowProfileArrayDeserializer(result: Array<FlowProfile>): any[] {
  return result.map((item) => {
    return flowProfileDeserializer(item);
  });
}

/** The pipeline resource definition. A Pipeline defines the scope and identity under which data replication scenarios are managed. */
export interface Pipeline extends TrackedResource {
  /** The set of configurable properties for the Pipeline resource. */
  properties?: PipelineProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function pipelineSerializer(item: Pipeline): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : pipelinePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function pipelineDeserializer(item: any): Pipeline {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : pipelinePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of pipeline */
export interface PipelineProperties {
  /** Remote cloud of the data to be transferred or received */
  remoteCloud: string;
  /** Display name of this pipeline */
  displayName?: string;
  /** Connections associated with pipeline */
  readonly connections?: ReadPipelineConnection[];
  /** Subscribers of this resource */
  subscribers?: Subscriber[];
  /** Provisioning state of the pipeline */
  readonly provisioningState?: ProvisioningState;
  /** The policies for this pipeline. The policies property has reached end of life support starting version 2025-05-30-preview. Please create and use a FlowProfile resource instead. */
  policies?: string[];
  /** The flow type for this flow. The flowTypes property has reached end of life support starting version 2025-05-30-preview. Please create and use a FlowProfile resource instead. */
  flowTypes?: FlowType[];
  /** The flow types that are disabled for this pipeline */
  disabledFlowTypes?: FlowType[];
  /** The DataClasses that are disabled for this pipeline */
  disabledDataClass?: DataClass[];
  /** Quarantine Download Storage Account */
  quarantineDownloadStorageAccount?: string;
  /** Quarantine Download Storage Container */
  quarantineDownloadStorageContainer?: string;
  /** Status of the current pipeline */
  status?: PipelineStatus;
}

export function pipelinePropertiesSerializer(item: PipelineProperties): any {
  return {
    remoteCloud: item["remoteCloud"],
    displayName: item["displayName"],
    subscribers: !item["subscribers"]
      ? item["subscribers"]
      : subscriberArraySerializer(item["subscribers"]),
    policies: !item["policies"]
      ? item["policies"]
      : item["policies"].map((p: any) => {
          return p;
        }),
    flowTypes: !item["flowTypes"]
      ? item["flowTypes"]
      : item["flowTypes"].map((p: any) => {
          return p;
        }),
    disabledFlowTypes: !item["disabledFlowTypes"]
      ? item["disabledFlowTypes"]
      : item["disabledFlowTypes"].map((p: any) => {
          return p;
        }),
    disabledDataClass: !item["disabledDataClass"]
      ? item["disabledDataClass"]
      : item["disabledDataClass"].map((p: any) => {
          return p;
        }),
    quarantineDownloadStorageAccount: item["quarantineDownloadStorageAccount"],
    quarantineDownloadStorageContainer: item["quarantineDownloadStorageContainer"],
    status: item["status"],
  };
}

export function pipelinePropertiesDeserializer(item: any): PipelineProperties {
  return {
    remoteCloud: item["remoteCloud"],
    displayName: item["displayName"],
    connections: !item["connections"]
      ? item["connections"]
      : readPipelineConnectionArrayDeserializer(item["connections"]),
    subscribers: !item["subscribers"]
      ? item["subscribers"]
      : subscriberArrayDeserializer(item["subscribers"]),
    provisioningState: item["provisioningState"],
    policies: !item["policies"]
      ? item["policies"]
      : item["policies"].map((p: any) => {
          return p;
        }),
    flowTypes: !item["flowTypes"]
      ? item["flowTypes"]
      : item["flowTypes"].map((p: any) => {
          return p;
        }),
    disabledFlowTypes: !item["disabledFlowTypes"]
      ? item["disabledFlowTypes"]
      : item["disabledFlowTypes"].map((p: any) => {
          return p;
        }),
    disabledDataClass: !item["disabledDataClass"]
      ? item["disabledDataClass"]
      : item["disabledDataClass"].map((p: any) => {
          return p;
        }),
    quarantineDownloadStorageAccount: item["quarantineDownloadStorageAccount"],
    quarantineDownloadStorageContainer: item["quarantineDownloadStorageContainer"],
    status: item["status"],
  };
}

export function readPipelineConnectionArrayDeserializer(
  result: Array<ReadPipelineConnection>,
): any[] {
  return result.map((item) => {
    return readPipelineConnectionDeserializer(item);
  });
}

/** The ReadPipelineconnection. */
export interface ReadPipelineConnection {
  /** Connection id inside pipeline */
  id: string;
  /** Connection name inside pipeline */
  name?: string;
  /** Connection type inside pipeline */
  type?: string;
  /** Connection location inside pipeline */
  location?: string;
  /** Connection etag inside pipeline */
  etag?: string;
  /** Metadata pertaining to creation and last modification of the resource. */
  systemData?: SystemData;
  /** Connection properties inside pipeline */
  properties?: PipelineConnectionProperties;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function readPipelineConnectionDeserializer(item: any): ReadPipelineConnection {
  return {
    additionalProperties: serializeRecord(item, [
      "id",
      "name",
      "type",
      "location",
      "etag",
      "systemData",
      "properties",
    ]),
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    etag: item["etag"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : pipelineConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** Connection properties inside pipeline */
export interface PipelineConnectionProperties {
  /** Internal metadata of the connection inside pipeline. */
  readonly internalMetadata?: InternalMetadataProperties;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function pipelineConnectionPropertiesDeserializer(item: any): PipelineConnectionProperties {
  return {
    additionalProperties: serializeRecord(item, ["internalMetadata"]),
    internalMetadata: !item["internalMetadata"]
      ? item["internalMetadata"]
      : internalMetadataPropertiesDeserializer(item["internalMetadata"]),
  };
}

/** Internal metadata of the connection inside pipeline. */
export interface InternalMetadataProperties {
  /** Operation status associated with the last patch request */
  readonly operationStatus?: OperationStatusProperties;
  /** User that last set the approved status for this connection */
  readonly statusSetBy?: string;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function internalMetadataPropertiesDeserializer(item: any): InternalMetadataProperties {
  return {
    additionalProperties: serializeRecord(item, ["operationStatus", "statusSetBy"]),
    operationStatus: !item["operationStatus"]
      ? item["operationStatus"]
      : operationStatusPropertiesDeserializer(item["operationStatus"]),
    statusSetBy: item["statusSetBy"],
  };
}

/** Operation status associated with the last patch request */
export interface OperationStatusProperties {
  /** Operation status for the last patch request for this connection. */
  readonly status?: OperationStatusEnum;
  /** Operation status ID of the last patch request for this connection. */
  readonly id?: string;
  /** Message for the operation for the last patch request for this connection. */
  readonly message?: string;
}

export function operationStatusPropertiesDeserializer(item: any): OperationStatusProperties {
  return {
    status: item["status"],
    id: item["id"],
    message: item["message"],
  };
}

/** Operation status for the last patch request for this connection. */
export enum KnownOperationStatusEnum {
  /** The last patch request for this connection completed with an error. */
  Failed = "Failed",
  /** The last patch request for this connection completed. */
  Succeeded = "Succeeded",
}

/**
 * Operation status for the last patch request for this connection. \
 * {@link KnownOperationStatusEnum} can be used interchangeably with OperationStatusEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Failed**: The last patch request for this connection completed with an error. \
 * **Succeeded**: The last patch request for this connection completed.
 */
export type OperationStatusEnum = string;

export function subscriberArraySerializer(result: Array<Subscriber>): any[] {
  return result.map((item) => {
    return subscriberSerializer(item);
  });
}

export function subscriberArrayDeserializer(result: Array<Subscriber>): any[] {
  return result.map((item) => {
    return subscriberDeserializer(item);
  });
}

/** An individual that would like to subscribe to events that occur on a pipeline. */
export interface Subscriber {
  /** Email of the subscriber */
  email?: string;
  /** Number specifying what notifications to receive */
  notifications?: number;
}

export function subscriberSerializer(item: Subscriber): any {
  return { email: item["email"], notifications: item["notifications"] };
}

export function subscriberDeserializer(item: any): Subscriber {
  return {
    email: item["email"],
    notifications: item["notifications"],
  };
}

/** Flow type for the specified resource. FlowType will be deprecated starting from version 2025_05_30_preview - please create a FlowProfile resource instead. */
export enum KnownFlowType {
  /** This type of flow is not set. */
  Unknown = "Unknown",
  /** This flow sends complex documents, such as Microsoft Office documents of Portable document format files. */
  Complex = "Complex",
  /** This flow sends source code files and artifacts. */
  DevSecOps = "DevSecOps",
  /** This flow over the Azure Data Transfer low latency messaging subsystem. */
  Messaging = "Messaging",
  /** This flow sends standard data but is subject to strict cloud owner approval. */
  Mission = "Mission",
  /** This flow is assigned to internal Microsoft use cases. */
  MicrosoftInternal = "MicrosoftInternal",
  /** This flow sends blobs that can be used for multiple use cases. */
  BasicFiles = "BasicFiles",
  /** This flow sends blobs that can be used for multiple use cases. */
  Data = "Data",
  /** This flow sends blobs that can be used for multiple use cases. */
  Standard = "Standard",
  /** This flow sends video streams. */
  StreamingVideo = "StreamingVideo",
  /** This flow sends blobs but is subject to cloud owner approval. */
  Opaque = "Opaque",
  /** This flow sends Extensible Markup Language that is subject to strict cloud owner approval */
  MissionOpaqueXML = "MissionOpaqueXML",
  /** This flow sends blobs that can be used for Virtual Machines. */
  DiskImages = "DiskImages",
  /** This flow sends data via an Application Programmer Interface. */
  API = "API",
}

/**
 * Flow type for the specified resource. FlowType will be deprecated starting from version 2025_05_30_preview - please create a FlowProfile resource instead. \
 * {@link KnownFlowType} can be used interchangeably with FlowType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: This type of flow is not set. \
 * **Complex**: This flow sends complex documents, such as Microsoft Office documents of Portable document format files. \
 * **DevSecOps**: This flow sends source code files and artifacts. \
 * **Messaging**: This flow over the Azure Data Transfer low latency messaging subsystem. \
 * **Mission**: This flow sends standard data but is subject to strict cloud owner approval. \
 * **MicrosoftInternal**: This flow is assigned to internal Microsoft use cases. \
 * **BasicFiles**: This flow sends blobs that can be used for multiple use cases. \
 * **Data**: This flow sends blobs that can be used for multiple use cases. \
 * **Standard**: This flow sends blobs that can be used for multiple use cases. \
 * **StreamingVideo**: This flow sends video streams. \
 * **Opaque**: This flow sends blobs but is subject to cloud owner approval. \
 * **MissionOpaqueXML**: This flow sends Extensible Markup Language that is subject to strict cloud owner approval \
 * **DiskImages**: This flow sends blobs that can be used for Virtual Machines. \
 * **API**: This flow sends data via an Application Programmer Interface.
 */
export type FlowType = string;

/** The list of data types supported for replication. */
export enum KnownDataClass {
  /** (Messaging) Replicates messages from Azure Service Bus for downstream processing or analysis. */
  ServiceBus = "ServiceBus",
  /** (Messaging) Replicates messages from Azure Event Hub for downstream processing or analysis. */
  EventHub = "EventHub",
  /** (API) Replicates request/response data through RESTful API endpoints. */
  ApiEndpoint = "ApiEndpoint",
  /** (API) Replicates request/response data through SDK-based integrations. */
  ApiSDK = "ApiSDK",
  /** (Stream) Enables replication of real-time video streaming data. */
  Video = "Video",
  /** (Files/SoftwareArtifacts/Complex) Replicates generic blobs data using Azure Blob Storage. */
  Blob = "Blob",
  /** (Files) Replicates structured NoSQL data using Azure Table Storage. */
  Table = "Table",
}

/**
 * The list of data types supported for replication. \
 * {@link KnownDataClass} can be used interchangeably with DataClass,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServiceBus**: (Messaging) Replicates messages from Azure Service Bus for downstream processing or analysis. \
 * **EventHub**: (Messaging) Replicates messages from Azure Event Hub for downstream processing or analysis. \
 * **ApiEndpoint**: (API) Replicates request\/response data through RESTful API endpoints. \
 * **ApiSDK**: (API) Replicates request\/response data through SDK-based integrations. \
 * **Video**: (Stream) Enables replication of real-time video streaming data. \
 * **Blob**: (Files\/SoftwareArtifacts\/Complex) Replicates generic blobs data using Azure Blob Storage. \
 * **Table**: (Files) Replicates structured NoSQL data using Azure Table Storage.
 */
export type DataClass = string;

/** Status of the current pipeline */
export enum KnownPipelineStatus {
  /** The pipeline is currently enabled and all child connection and flow resources below able to send or receive data. */
  Enabled = "Enabled",
  /** The pipeline is currently disabled and all child connection and flow resources below are unable to send or receive data. */
  Disabled = "Disabled",
}

/**
 * Status of the current pipeline \
 * {@link KnownPipelineStatus} can be used interchangeably with PipelineStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: The pipeline is currently enabled and all child connection and flow resources below able to send or receive data. \
 * **Disabled**: The pipeline is currently disabled and all child connection and flow resources below are unable to send or receive data.
 */
export type PipelineStatus = string;

/** The pipelines resource patch definition. */
export interface PipelinesPatch {
  /** Properties of pipelines patch body. */
  properties?: PipelinesPatchProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function pipelinesPatchSerializer(item: PipelinesPatch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : pipelinesPatchPropertiesSerializer(item["properties"]),
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** Properties of pipelines patch body. The property has reached end of life support starting version 2025-05-30-preview. Please create and use the FlowProfile resource instead. */
export interface PipelinesPatchProperties {
  /** The flow types allowed for this pipeline. FlowTypes has reached end of life support starting version 2025-05-30-preview. Please create and use the FlowProfile property instead. */
  flowTypes?: FlowType[];
}

export function pipelinesPatchPropertiesSerializer(item: PipelinesPatchProperties): any {
  return {
    flowTypes: !item["flowTypes"]
      ? item["flowTypes"]
      : item["flowTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a Pipeline list operation. */
export interface _PipelineListResult {
  /** The Pipeline items on this page */
  value: Pipeline[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pipelineListResultDeserializer(item: any): _PipelineListResult {
  return {
    value: pipelineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function pipelineArraySerializer(result: Array<Pipeline>): any[] {
  return result.map((item) => {
    return pipelineSerializer(item);
  });
}

export function pipelineArrayDeserializer(result: Array<Pipeline>): any[] {
  return result.map((item) => {
    return pipelineDeserializer(item);
  });
}

/** The resource to reference. */
export interface ResourceBody {
  /** ID of the resource. */
  id: string;
  /** Reason for resource operation. */
  statusReason?: string;
}

export function resourceBodySerializer(item: ResourceBody): any {
  return { id: item["id"], statusReason: item["statusReason"] };
}

/** The connection resource definition. */
export interface Connection extends TrackedResource {
  /** Properties of connection */
  properties?: ConnectionProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function connectionSerializer(item: Connection): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : connectionPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function connectionDeserializer(item: any): Connection {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : connectionPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of connection */
export interface ConnectionProperties {
  /** Pipeline to use to transfer data */
  pipeline: string;
  /** Direction of data movement */
  direction?: Direction;
  /** Justification for the connection request */
  justification?: string;
  /** Status of the connection */
  readonly status?: ConnectionStatus;
  /** Force disablement status of the current connection */
  readonly forceDisabledStatus?: ForceDisabledStatus[];
  /** Reason for status */
  readonly statusReason?: string;
  /** Link status of the current connection */
  readonly linkStatus?: LinkStatus;
  /** Resource ID of the linked connection */
  readonly linkedConnectionId?: string;
  /** The flow types being requested for this connection. This FlowType property has reached end of life support starting version 2025-05-30-preview. Please create a FlowProfile resource instead. */
  flowTypes?: FlowType[];
  /** Provides a list of FlowProfiles . */
  flowProfileList?: FlowProfileMetadata[];
  /** Requirement ID of the connection */
  requirementId?: string;
  /** Subscription ID to link cloud subscriptions together */
  remoteSubscriptionId?: string;
  /** Approver of this connection request */
  readonly approver?: string;
  /** PIN to link requests together */
  pin?: string;
  /** The timestamp that this connection request was submitted at */
  readonly dateSubmitted?: Date;
  /** The primary contact for this connection request */
  primaryContact?: string;
  /** The secondary contacts for this connection request */
  secondaryContacts?: string[];
  /** Provisioning state of the connection */
  readonly provisioningState?: ProvisioningState;
  /** The policies for this connection. The policies property has reached end of life support starting version 2025-05-30-preview. Please create and use a FlowProfile resource instead. */
  policies?: string[];
  /** The schemas for this connection. The schemas property has reached end of life support starting version 2025-05-30-preview. Please create and use a FlowProfile resource instead. */
  schemas?: Schema[];
  /** The schema URIs for this connection. The schemaUris property has reached end of life support starting version 2025-05-30-preview. Please create and use a FlowProfile resource instead. */
  schemaUris?: string[];
  /** Hostname specific to API Flows */
  apiHostname?: string;
}

export function connectionPropertiesSerializer(item: ConnectionProperties): any {
  return {
    pipeline: item["pipeline"],
    direction: item["direction"],
    justification: item["justification"],
    flowTypes: !item["flowTypes"]
      ? item["flowTypes"]
      : item["flowTypes"].map((p: any) => {
          return p;
        }),
    flowProfileList: !item["flowProfileList"]
      ? item["flowProfileList"]
      : flowProfileMetadataArraySerializer(item["flowProfileList"]),
    requirementId: item["requirementId"],
    remoteSubscriptionId: item["remoteSubscriptionId"],
    pin: item["pin"],
    primaryContact: item["primaryContact"],
    secondaryContacts: !item["secondaryContacts"]
      ? item["secondaryContacts"]
      : item["secondaryContacts"].map((p: any) => {
          return p;
        }),
    policies: !item["policies"]
      ? item["policies"]
      : item["policies"].map((p: any) => {
          return p;
        }),
    schemas: !item["schemas"] ? item["schemas"] : schemaArraySerializer(item["schemas"]),
    schemaUris: !item["schemaUris"]
      ? item["schemaUris"]
      : item["schemaUris"].map((p: any) => {
          return p;
        }),
    apiHostname: item["apiHostname"],
  };
}

export function connectionPropertiesDeserializer(item: any): ConnectionProperties {
  return {
    pipeline: item["pipeline"],
    direction: item["direction"],
    justification: item["justification"],
    status: item["status"],
    forceDisabledStatus: !item["forceDisabledStatus"]
      ? item["forceDisabledStatus"]
      : item["forceDisabledStatus"].map((p: any) => {
          return p;
        }),
    statusReason: item["statusReason"],
    linkStatus: item["linkStatus"],
    linkedConnectionId: item["linkedConnectionId"],
    flowTypes: !item["flowTypes"]
      ? item["flowTypes"]
      : item["flowTypes"].map((p: any) => {
          return p;
        }),
    flowProfileList: !item["flowProfileList"]
      ? item["flowProfileList"]
      : flowProfileMetadataArrayDeserializer(item["flowProfileList"]),
    requirementId: item["requirementId"],
    remoteSubscriptionId: item["remoteSubscriptionId"],
    approver: item["approver"],
    pin: item["pin"],
    dateSubmitted: !item["dateSubmitted"] ? item["dateSubmitted"] : new Date(item["dateSubmitted"]),
    primaryContact: item["primaryContact"],
    secondaryContacts: !item["secondaryContacts"]
      ? item["secondaryContacts"]
      : item["secondaryContacts"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
    policies: !item["policies"]
      ? item["policies"]
      : item["policies"].map((p: any) => {
          return p;
        }),
    schemas: !item["schemas"] ? item["schemas"] : schemaArrayDeserializer(item["schemas"]),
    schemaUris: !item["schemaUris"]
      ? item["schemaUris"]
      : item["schemaUris"].map((p: any) => {
          return p;
        }),
    apiHostname: item["apiHostname"],
  };
}

/** Direction of data movement */
export enum KnownDirection {
  /** The direction is on the sending side of a pipeline, connection, or flow. */
  Send = "Send",
  /** The direction is on the receiving side side of a pipeline, connection, or flow. */
  Receive = "Receive",
}

/**
 * Direction of data movement \
 * {@link KnownDirection} can be used interchangeably with Direction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Send**: The direction is on the sending side of a pipeline, connection, or flow. \
 * **Receive**: The direction is on the receiving side side of a pipeline, connection, or flow.
 */
export type Direction = string;

/** Status of the connection */
export enum KnownConnectionStatus {
  /** This connection has been created but is under review by the pipeline owner. */
  InReview = "InReview",
  /** This connection has been approved by the pipeline owner and is ready for use. */
  Approved = "Approved",
  /** This connection has been rejected by the pipeline owner and cannot be used. */
  Rejected = "Rejected",
  /** Creation of the connection has been accepted. */
  Accepted = "Accepted",
}

/**
 * Status of the connection \
 * {@link KnownConnectionStatus} can be used interchangeably with ConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InReview**: This connection has been created but is under review by the pipeline owner. \
 * **Approved**: This connection has been approved by the pipeline owner and is ready for use. \
 * **Rejected**: This connection has been rejected by the pipeline owner and cannot be used. \
 * **Accepted**: Creation of the connection has been accepted.
 */
export type ConnectionStatus = string;

/** Defines different disablement statuses and the circumstances in why they were disabled. */
export enum KnownForceDisabledStatus {
  /** Defines disablement of a Flow due to the parent connection being disabled. */
  ConnectionForceDisabled = "ConnectionForceDisabled",
  /** Defines disablement of a Flow due to the linked flow type being disabled. */
  FlowTypeForceDisabled = "FlowTypeForceDisabled",
  /** Defines disablement of a Flow due to the Pipeline being disabled. */
  PipelineForceDisabled = "PipelineForceDisabled",
  /** Defines disablement of a Flow due to the FlowProfile being disabled. */
  FlowProfileForceDisabled = "FlowProfileForceDisabled",
}

/**
 * Defines different disablement statuses and the circumstances in why they were disabled. \
 * {@link KnownForceDisabledStatus} can be used interchangeably with ForceDisabledStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ConnectionForceDisabled**: Defines disablement of a Flow due to the parent connection being disabled. \
 * **FlowTypeForceDisabled**: Defines disablement of a Flow due to the linked flow type being disabled. \
 * **PipelineForceDisabled**: Defines disablement of a Flow due to the Pipeline being disabled. \
 * **FlowProfileForceDisabled**: Defines disablement of a Flow due to the FlowProfile being disabled.
 */
export type ForceDisabledStatus = string;

/** Link status of the current pipeline, connection, flow. */
export enum KnownLinkStatus {
  /** The pipeline, connection, or flow is currently linked with another corresponding pipeline, connection, or flow, and can be used. */
  Linked = "Linked",
  /** The pipeline, connection, or flow is not linked with another corresponding pipeline, connection, or flow, and cannot be used. */
  Unlinked = "Unlinked",
}

/**
 * Link status of the current pipeline, connection, flow. \
 * {@link KnownLinkStatus} can be used interchangeably with LinkStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Linked**: The pipeline, connection, or flow is currently linked with another corresponding pipeline, connection, or flow, and can be used. \
 * **Unlinked**: The pipeline, connection, or flow is not linked with another corresponding pipeline, connection, or flow, and cannot be used.
 */
export type LinkStatus = string;

export function flowProfileMetadataArraySerializer(result: Array<FlowProfileMetadata>): any[] {
  return result.map((item) => {
    return flowProfileMetadataSerializer(item);
  });
}

export function flowProfileMetadataArrayDeserializer(result: Array<FlowProfileMetadata>): any[] {
  return result.map((item) => {
    return flowProfileMetadataDeserializer(item);
  });
}

/** The FlowProfile Metadata used to concisely provide all publicly viewable information. */
export interface FlowProfileMetadata {
  /** The name of the parent Pipeline Azure resource associated with this FlowProfile. */
  pipeline: string;
  /** The name of the FlowProfile. */
  name: string;
  /** The data replication scenario handled by this FlowProfile. Please note, that this value cannot be updated after creation. See the FlowProfilePatchProperties to see updateable properties. */
  replicationScenario: DataClassType;
  /** A guid represented as a string for the FlowProfile resource, assigned by the system. */
  flowProfileId: string;
  /** The operational status of the FlowProfile. */
  status: FlowProfileStatus;
  /** A description of the FlowProfile and its rulesets. The description should describe the flowprofile's purpose and rulesets applied. */
  description: string;
}

export function flowProfileMetadataSerializer(item: FlowProfileMetadata): any {
  return {
    pipeline: item["pipeline"],
    name: item["name"],
    replicationScenario: item["replicationScenario"],
    flowProfileId: item["flowProfileId"],
    status: item["status"],
    description: item["description"],
  };
}

export function flowProfileMetadataDeserializer(item: any): FlowProfileMetadata {
  return {
    pipeline: item["pipeline"],
    name: item["name"],
    replicationScenario: item["replicationScenario"],
    flowProfileId: item["flowProfileId"],
    status: item["status"],
    description: item["description"],
  };
}

export function schemaArraySerializer(result: Array<Schema>): any[] {
  return result.map((item) => {
    return schemaSerializer(item);
  });
}

export function schemaArrayDeserializer(result: Array<Schema>): any[] {
  return result.map((item) => {
    return schemaDeserializer(item);
  });
}

/** The schema object. Schemas has reached end of life support starting version 2025-05-30-preview. Please manage schemas with a FlowProfile resource instead. */
export interface Schema {
  /** ID associated with this schema */
  id?: string;
  /** Connection ID associated with this schema */
  connectionId?: string;
  /** Status of the schema */
  status?: SchemaStatus;
  /** Name of the schema */
  name?: string;
  /** Content of the schema */
  content?: string;
  /** The direction of the schema. */
  direction?: Direction;
  /** Uri containing SAS token for the zipped schema */
  schemaUri?: string;
  /** The Schema Type */
  schemaType?: SchemaType;
}

export function schemaSerializer(item: Schema): any {
  return {
    id: item["id"],
    connectionId: item["connectionId"],
    status: item["status"],
    name: item["name"],
    content: item["content"],
    direction: item["direction"],
    schemaUri: item["schemaUri"],
    schemaType: item["schemaType"],
  };
}

export function schemaDeserializer(item: any): Schema {
  return {
    id: item["id"],
    connectionId: item["connectionId"],
    status: item["status"],
    name: item["name"],
    content: item["content"],
    direction: item["direction"],
    schemaUri: item["schemaUri"],
    schemaType: item["schemaType"],
  };
}

/** Status of the schema. */
export enum KnownSchemaStatus {
  /** A schema that has not been approved and is awaiting review. */
  New = "New",
  /** A schema that has been approved and is ready for use. */
  Approved = "Approved",
}

/**
 * Status of the schema. \
 * {@link KnownSchemaStatus} can be used interchangeably with SchemaStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **New**: A schema that has not been approved and is awaiting review. \
 * **Approved**: A schema that has been approved and is ready for use.
 */
export type SchemaStatus = string;

/** The Schema Type. */
export enum KnownSchemaType {
  /** The schema represents a single XML schema definition file. */
  Xsd = "Xsd",
  /** The schema represents a ZIP file with multiple XML schema definition files within it. */
  Zip = "Zip",
}

/**
 * The Schema Type. \
 * {@link KnownSchemaType} can be used interchangeably with SchemaType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Xsd**: The schema represents a single XML schema definition file. \
 * **Zip**: The schema represents a ZIP file with multiple XML schema definition files within it.
 */
export type SchemaType = string;

/** The action to be executed. */
export interface Action {
  /** Type of action to be executed */
  actionType: DateTransferActionType;
  /** Type of target to execute the action on */
  targetType: TargetType;
  /** Targets for the action */
  targets?: string[];
  /** Business justification for the action */
  justification?: string;
}

export function actionSerializer(item: Action): any {
  return {
    actionType: item["actionType"],
    targetType: item["targetType"],
    targets: !item["targets"]
      ? item["targets"]
      : item["targets"].map((p: any) => {
          return p;
        }),
    justification: item["justification"],
  };
}

/** The type of action to be executed. */
export enum KnownDateTransferActionType {
  /** Allow a pipeline, connection, or flow to be updated. */
  AllowUpdates = "AllowUpdates",
  /** Force disable a pipeline, connection, or flow. */
  ForceDisable = "ForceDisable",
}

/**
 * The type of action to be executed. \
 * {@link KnownDateTransferActionType} can be used interchangeably with DateTransferActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AllowUpdates**: Allow a pipeline, connection, or flow to be updated. \
 * **ForceDisable**: Force disable a pipeline, connection, or flow.
 */
export type DateTransferActionType = string;

/** Type of target to execute the action on */
export enum KnownTargetType {
  /** The action executing is targeting a pipeline. */
  Pipeline = "Pipeline",
  /** The action executing is targeting a connection. */
  Connection = "Connection",
  /** The action executing is targeting a flow type. */
  FlowType = "FlowType",
  /** The action executing is targeting a flow profile. */
  FlowProfile = "FlowProfile",
}

/**
 * Type of target to execute the action on \
 * {@link KnownTargetType} can be used interchangeably with TargetType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pipeline**: The action executing is targeting a pipeline. \
 * **Connection**: The action executing is targeting a connection. \
 * **FlowType**: The action executing is targeting a flow type. \
 * **FlowProfile**: The action executing is targeting a flow profile.
 */
export type TargetType = string;

/** An array of connection id resources. */
export interface ConnectionIdList {
  /** Connection ID to target */
  value?: string[];
}

export function connectionIdListSerializer(item: ConnectionIdList): any {
  return {
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface _ListParameterBody */
export interface _ListParameterBody {
  /** A list of connection identifiers used to filter the Flows to be retrieved. */
  connections?: ConnectionIdList;
}

export function _listParameterBodySerializer(item: _ListParameterBody): any {
  return {
    connections: !item["connections"]
      ? item["connections"]
      : connectionIdListSerializer(item["connections"]),
  };
}

/** An array of flow resources. */
export interface ListFlowsByPipelineResult {
  /** List flows by pipeline result by connection */
  value?: ListFlowsByPipelineConnection[];
}

export function listFlowsByPipelineResultDeserializer(item: any): ListFlowsByPipelineResult {
  return {
    value: !item["value"]
      ? item["value"]
      : listFlowsByPipelineConnectionArrayDeserializer(item["value"]),
  };
}

export function listFlowsByPipelineConnectionArrayDeserializer(
  result: Array<ListFlowsByPipelineConnection>,
): any[] {
  return result.map((item) => {
    return listFlowsByPipelineConnectionDeserializer(item);
  });
}

/** A connection resource id in addition to all child flow resources under this connection. */
export interface ListFlowsByPipelineConnection {
  /** ID of the connection. */
  id?: string;
  /** List of flows associated with the connection. */
  flows?: Flow[];
}

export function listFlowsByPipelineConnectionDeserializer(
  item: any,
): ListFlowsByPipelineConnection {
  return {
    id: item["id"],
    flows: !item["flows"] ? item["flows"] : flowArrayDeserializer(item["flows"]),
  };
}

export function flowArraySerializer(result: Array<Flow>): any[] {
  return result.map((item) => {
    return flowSerializer(item);
  });
}

export function flowArrayDeserializer(result: Array<Flow>): any[] {
  return result.map((item) => {
    return flowDeserializer(item);
  });
}

/** The flow resource definition. */
export interface Flow extends TrackedResource {
  /** Properties of flow */
  properties?: FlowProperties;
  /** Details of the resource plan. */
  plan?: Plan;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function flowSerializer(item: Flow): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : flowPropertiesSerializer(item["properties"]),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function flowDeserializer(item: any): Flow {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : flowPropertiesDeserializer(item["properties"]),
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of flow */
export interface FlowProperties {
  /** The connection associated with this flow */
  connection?: SelectedResource;
  /** Dataflow GUID associated with this flow */
  readonly flowId?: string;
  /** URI to a Key Vault Secret containing a SAS token. */
  keyVaultUri?: string;
  /** Link status of the current flow */
  readonly linkStatus?: LinkStatus;
  /** Resource ID of the linked flow */
  readonly linkedFlowId?: string;
  /** Status of the current flow */
  status?: FlowStatus;
  /** Force disablement status of the current flow */
  readonly forceDisabledStatus?: ForceDisabledStatus[];
  /** Storage Account */
  storageAccountName?: string;
  /** Storage Account ID */
  storageAccountId?: string;
  /** Storage Container Name */
  storageContainerName?: string;
  /** Storage Table Name */
  storageTableName?: string;
  /** Service Bus Queue ID */
  serviceBusQueueId?: string;
  /** Type of FlowProfile to use for transfer via the flow. */
  flowProfile?: FlowProfileMetadata;
  /** The Flow's data class. */
  flowDataType?: DataClass;
  /** The flow type for this flow. The property has reached end of life support starting version 2025-05-30-preview. Please create and use a FlowProfile resource instead. */
  flowType?: FlowType;
  /** Type of data to transfer via the flow. The property has reached end of life support starting version 2025-05-30-preview. Please create and use a FlowProfile resource instead. */
  dataType?: DataType;
  /** Provisioning state of the flow */
  readonly provisioningState?: ProvisioningState;
  /** The policies for this flow. The property has reached end of life support starting version 2025-05-30-preview. Please create and use a FlowProfile resource instead. */
  policies?: string[];
  /** The selected schema for this flow. The property has reached end of life support starting version 2025-05-30-preview. Please create and use a FlowProfile resource instead. */
  schema?: Schema;
  /** The messaging options for this flow */
  messagingOptions?: MessagingOptions;
  /** The API Flow configuration options for Azure Data Transfer API Flow type. */
  apiFlowOptions?: ApiFlowOptions;
  /** The URI to the customer managed key for this flow */
  customerManagedKeyVaultUri?: string;
  /** The flow stream identifier */
  streamId?: string;
  /** The protocol of the stream */
  streamProtocol?: StreamProtocol;
  /** The latency of the stream in milliseconds */
  streamLatency?: number;
  /** The passphrase used for SRT streams */
  passphrase?: string;
  /** The source IP address and CIDR ranges of the stream */
  sourceAddresses?: StreamSourceAddresses;
  /** The destination endpoints of the stream */
  destinationEndpoints?: string[];
  /** The destination endpoint ports of the stream */
  destinationEndpointPorts?: number[];
  /** Event Hub ID */
  eventHubId?: string;
  /** Event Hub Consumer Group */
  consumerGroup?: string;
}

export function flowPropertiesSerializer(item: FlowProperties): any {
  return {
    connection: !item["connection"]
      ? item["connection"]
      : selectedResourceSerializer(item["connection"]),
    keyVaultUri: item["keyVaultUri"],
    status: item["status"],
    storageAccountName: item["storageAccountName"],
    storageAccountId: item["storageAccountId"],
    storageContainerName: item["storageContainerName"],
    storageTableName: item["storageTableName"],
    serviceBusQueueId: item["serviceBusQueueId"],
    flowProfile: !item["flowProfile"]
      ? item["flowProfile"]
      : flowProfileMetadataSerializer(item["flowProfile"]),
    flowDataType: item["flowDataType"],
    flowType: item["flowType"],
    dataType: item["dataType"],
    policies: !item["policies"]
      ? item["policies"]
      : item["policies"].map((p: any) => {
          return p;
        }),
    schema: !item["schema"] ? item["schema"] : schemaSerializer(item["schema"]),
    messagingOptions: !item["messagingOptions"]
      ? item["messagingOptions"]
      : messagingOptionsSerializer(item["messagingOptions"]),
    apiFlowOptions: !item["apiFlowOptions"]
      ? item["apiFlowOptions"]
      : apiFlowOptionsSerializer(item["apiFlowOptions"]),
    customerManagedKeyVaultUri: item["customerManagedKeyVaultUri"],
    streamId: item["streamId"],
    streamProtocol: item["streamProtocol"],
    streamLatency: item["streamLatency"],
    passphrase: item["passphrase"],
    sourceAddresses: !item["sourceAddresses"]
      ? item["sourceAddresses"]
      : streamSourceAddressesSerializer(item["sourceAddresses"]),
    destinationEndpoints: !item["destinationEndpoints"]
      ? item["destinationEndpoints"]
      : item["destinationEndpoints"].map((p: any) => {
          return p;
        }),
    destinationEndpointPorts: !item["destinationEndpointPorts"]
      ? item["destinationEndpointPorts"]
      : item["destinationEndpointPorts"].map((p: any) => {
          return p;
        }),
    eventHubId: item["eventHubId"],
    consumerGroup: item["consumerGroup"],
  };
}

export function flowPropertiesDeserializer(item: any): FlowProperties {
  return {
    connection: !item["connection"]
      ? item["connection"]
      : selectedResourceDeserializer(item["connection"]),
    flowId: item["flowId"],
    keyVaultUri: item["keyVaultUri"],
    linkStatus: item["linkStatus"],
    linkedFlowId: item["linkedFlowId"],
    status: item["status"],
    forceDisabledStatus: !item["forceDisabledStatus"]
      ? item["forceDisabledStatus"]
      : item["forceDisabledStatus"].map((p: any) => {
          return p;
        }),
    storageAccountName: item["storageAccountName"],
    storageAccountId: item["storageAccountId"],
    storageContainerName: item["storageContainerName"],
    storageTableName: item["storageTableName"],
    serviceBusQueueId: item["serviceBusQueueId"],
    flowProfile: !item["flowProfile"]
      ? item["flowProfile"]
      : flowProfileMetadataDeserializer(item["flowProfile"]),
    flowDataType: item["flowDataType"],
    flowType: item["flowType"],
    dataType: item["dataType"],
    provisioningState: item["provisioningState"],
    policies: !item["policies"]
      ? item["policies"]
      : item["policies"].map((p: any) => {
          return p;
        }),
    schema: !item["schema"] ? item["schema"] : schemaDeserializer(item["schema"]),
    messagingOptions: !item["messagingOptions"]
      ? item["messagingOptions"]
      : messagingOptionsDeserializer(item["messagingOptions"]),
    apiFlowOptions: !item["apiFlowOptions"]
      ? item["apiFlowOptions"]
      : apiFlowOptionsDeserializer(item["apiFlowOptions"]),
    customerManagedKeyVaultUri: item["customerManagedKeyVaultUri"],
    streamId: item["streamId"],
    streamProtocol: item["streamProtocol"],
    streamLatency: item["streamLatency"],
    passphrase: item["passphrase"],
    sourceAddresses: !item["sourceAddresses"]
      ? item["sourceAddresses"]
      : streamSourceAddressesDeserializer(item["sourceAddresses"]),
    destinationEndpoints: !item["destinationEndpoints"]
      ? item["destinationEndpoints"]
      : item["destinationEndpoints"].map((p: any) => {
          return p;
        }),
    destinationEndpointPorts: !item["destinationEndpointPorts"]
      ? item["destinationEndpointPorts"]
      : item["destinationEndpointPorts"].map((p: any) => {
          return p;
        }),
    eventHubId: item["eventHubId"],
    consumerGroup: item["consumerGroup"],
  };
}

/** A resource selected from ARM */
export interface SelectedResource {
  /** Name of the connection */
  name?: string;
  /** Id of the connection */
  id: string;
  /** Location of the connection */
  location?: string;
  /** Name of the subscription with the connection */
  subscriptionName?: string;
}

export function selectedResourceSerializer(item: SelectedResource): any {
  return {
    name: item["name"],
    id: item["id"],
    location: item["location"],
    subscriptionName: item["subscriptionName"],
  };
}

export function selectedResourceDeserializer(item: any): SelectedResource {
  return {
    name: item["name"],
    id: item["id"],
    location: item["location"],
    subscriptionName: item["subscriptionName"],
  };
}

/** Status of the current flow. */
export enum KnownFlowStatus {
  /** The flow is currently enabled and able to send or receive data. */
  Enabled = "Enabled",
  /** The flow is currently disabled and cannot send or receive data. */
  Disabled = "Disabled",
}

/**
 * Status of the current flow. \
 * {@link KnownFlowStatus} can be used interchangeably with FlowStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: The flow is currently enabled and able to send or receive data. \
 * **Disabled**: The flow is currently disabled and cannot send or receive data.
 */
export type FlowStatus = string;

/** Transfer Storage Blobs or Tables */
export enum KnownDataType {
  /** The flow uses Azure Storage blobs to send or receive data. */
  Blob = "Blob",
  /** The flow uses Azure Storage tables to send or receive data. */
  Table = "Table",
}

/**
 * Transfer Storage Blobs or Tables \
 * {@link KnownDataType} can be used interchangeably with DataType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Blob**: The flow uses Azure Storage blobs to send or receive data. \
 * **Table**: The flow uses Azure Storage tables to send or receive data.
 */
export type DataType = string;

/** The option associated with messaging flows. */
export interface MessagingOptions {
  /** Billing tier for this messaging flow */
  billingTier?: FlowBillingTier;
  /** Field indicating whether to enable guaranteed delivery on the flow or not. The default disabled option chooses speed over consistency. When enabled, messages are delivered with minimal delay, but delivery is not guaranteed under all conditions */
  performancePriority?: EnablementStatus;
}

export function messagingOptionsSerializer(item: MessagingOptions): any {
  return { billingTier: item["billingTier"], performancePriority: item["performancePriority"] };
}

export function messagingOptionsDeserializer(item: any): MessagingOptions {
  return {
    billingTier: item["billingTier"],
    performancePriority: item["performancePriority"],
  };
}

/** Billing tier for this messaging flow. */
export enum KnownFlowBillingTier {
  /** Billing tier for messaging processing that charges based on how much data is transferred. */
  BlobTransport = "BlobTransport",
  /** Billing tier for standard messaging processing that charges based on having the messaging resource allocated. */
  Standard = "Standard",
  /** Billing tier for premium messaging processing that charges based on having the messaging resource allocated. */
  Premium = "Premium",
}

/**
 * Billing tier for this messaging flow. \
 * {@link KnownFlowBillingTier} can be used interchangeably with FlowBillingTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BlobTransport**: Billing tier for messaging processing that charges based on how much data is transferred. \
 * **Standard**: Billing tier for standard messaging processing that charges based on having the messaging resource allocated. \
 * **Premium**: Billing tier for premium messaging processing that charges based on having the messaging resource allocated.
 */
export type FlowBillingTier = string;

/** Enablement statuses */
export enum KnownEnablementStatus {
  /** Represents an enabled status. */
  Enabled = "Enabled",
  /** Represents a disabled status. */
  Disabled = "Disabled",
}

/**
 * Enablement statuses \
 * {@link KnownEnablementStatus} can be used interchangeably with EnablementStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Represents an enabled status. \
 * **Disabled**: Represents a disabled status.
 */
export type EnablementStatus = string;

/** Properties specific to API Flow Type */
export interface ApiFlowOptions {
  /** Remote host to which communication needs to be made. The property has reached end of life support starting version 2025-05-30-preview. Please create and use the remoteEndpointSettings.endpoint property instead. */
  remoteEndpoint?: string;
  /** Unique CNAME to represent the Azure Data Transfer API Flow instance */
  cname?: string;
  /** Remote Calling Mode in the Azure Data Transfer API Flow, which describes how the API Flow will be invoked */
  apiMode?: ApiMode;
  /** Determines which identity to use for extracting the user token for Azure Data Transfer API Flow. The property has reached end of life support starting version 2025-05-30-preview. Please create and use the authentication property instead. */
  identityTranslation?: IdentityTranslation;
  /** Sender's app user assigned Manage Identity client ID. The property has reached end of life support starting version 2025-05-30-preview. Please create and use the authentication property instead. */
  senderClientId?: string;
  /** Remote stub app registration Client ID. The property has reached end of life support starting version 2025-05-30-preview. Please create and use the authentication property instead. */
  remoteCallingModeClientId?: string;
  /** Optional field to override the audience of the remote endpoint. The property has reached end of life support starting version 2025-05-30-preview. Please create and use the authentication property instead. */
  audienceOverride?: string;
  /** Optional and for advanced used only. A list of authentication methods to use when accessing the Azure Data Transfer API Flow. If not provided, the default S2S authentication using Entra (API Flow Managed Identity) and RBAC will be applied. */
  authentication?: Authentication[];
  /** Defines the destination remote endpoint for the API calls. */
  remoteEndpointSettings?: RemoteEndpointSettings;
}

export function apiFlowOptionsSerializer(item: ApiFlowOptions): any {
  return {
    remoteEndpoint: item["remoteEndpoint"],
    cname: item["cname"],
    apiMode: item["apiMode"],
    identityTranslation: item["identityTranslation"],
    senderClientId: item["senderClientId"],
    remoteCallingModeClientId: item["remoteCallingModeClientId"],
    audienceOverride: item["audienceOverride"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationArraySerializer(item["authentication"]),
    remoteEndpointSettings: !item["remoteEndpointSettings"]
      ? item["remoteEndpointSettings"]
      : remoteEndpointSettingsSerializer(item["remoteEndpointSettings"]),
  };
}

export function apiFlowOptionsDeserializer(item: any): ApiFlowOptions {
  return {
    remoteEndpoint: item["remoteEndpoint"],
    cname: item["cname"],
    apiMode: item["apiMode"],
    identityTranslation: item["identityTranslation"],
    senderClientId: item["senderClientId"],
    remoteCallingModeClientId: item["remoteCallingModeClientId"],
    audienceOverride: item["audienceOverride"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationArrayDeserializer(item["authentication"]),
    remoteEndpointSettings: !item["remoteEndpointSettings"]
      ? item["remoteEndpointSettings"]
      : remoteEndpointSettingsDeserializer(item["remoteEndpointSettings"]),
  };
}

/** Remote Calling Mode in the Azure Data Transfer API Flow, which describes how the API Flow will be invoked */
export enum KnownApiMode {
  /** The API flow will forward calls to a custom Software Development Kit implementation. */
  SDK = "SDK",
  /** The API flow will forward calls to a specified endpoint. */
  Endpoint = "Endpoint",
}

/**
 * Remote Calling Mode in the Azure Data Transfer API Flow, which describes how the API Flow will be invoked \
 * {@link KnownApiMode} can be used interchangeably with ApiMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SDK**: The API flow will forward calls to a custom Software Development Kit implementation. \
 * **Endpoint**: The API flow will forward calls to a specified endpoint.
 */
export type ApiMode = string;

/** Flag for if Azure Data Transfer API Flow should extract the user token */
export enum KnownIdentityTranslation {
  /** The API flow will make use of the user identity that called this API flow, and pass that token through the boundary. */
  UserIdentity = "UserIdentity",
  /** The API flow will make use of the Azure Data Transfer Flow managed identity on the other side of the boundary. */
  ServiceIdentity = "ServiceIdentity",
}

/**
 * Flag for if Azure Data Transfer API Flow should extract the user token \
 * {@link KnownIdentityTranslation} can be used interchangeably with IdentityTranslation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UserIdentity**: The API flow will make use of the user identity that called this API flow, and pass that token through the boundary. \
 * **ServiceIdentity**: The API flow will make use of the Azure Data Transfer Flow managed identity on the other side of the boundary.
 */
export type IdentityTranslation = string;

export function authenticationArraySerializer(result: Array<Authentication>): any[] {
  return result.map((item) => {
    return authenticationSerializer(item);
  });
}

export function authenticationArrayDeserializer(result: Array<Authentication>): any[] {
  return result.map((item) => {
    return authenticationDeserializer(item);
  });
}

/** Configures the authentication method and parameters for an Azure Data Transfer API Flow. */
export interface Authentication {
  /** Type of authentication mechanism. JWT by default. */
  type?: AuthenticationType;
  /** The identity provider's token service instance. */
  instance?: string;
  /** A unique identifier representing the tenant of the identity provider's token service. */
  tenantId?: string;
  /** The full URL endpoint used to acquire tokens, typically combining the instance and tenant ID to target a specific authentication context. */
  authority?: string;
  /** List of applicationIds allowed to authorize to this flow. This is used as an alternative to the RBAC authorization check. */
  applicationIds?: string[];
  /** Audience of the identity of the remote endpoint service. By default, remoteEndpointSettings.endpoint will be used if a value is not provided. */
  audience?: string;
  /** The Flow can use an Entra app identity that is provided by the Flow user to obtain the token to call the remote endpoint. This field specifies the user provided app's clientId. */
  clientIdOverride?: string;
  /** Determines which identity to use for extracting the user token for Azure Data Transfer API Flow. */
  identityTranslation?: IdentityTranslation;
}

export function authenticationSerializer(item: Authentication): any {
  return {
    type: item["type"],
    instance: item["instance"],
    tenantId: item["tenantId"],
    authority: item["authority"],
    applicationIds: !item["applicationIds"]
      ? item["applicationIds"]
      : item["applicationIds"].map((p: any) => {
          return p;
        }),
    audience: item["audience"],
    clientIdOverride: item["clientIdOverride"],
    identityTranslation: item["identityTranslation"],
  };
}

export function authenticationDeserializer(item: any): Authentication {
  return {
    type: item["type"],
    instance: item["instance"],
    tenantId: item["tenantId"],
    authority: item["authority"],
    applicationIds: !item["applicationIds"]
      ? item["applicationIds"]
      : item["applicationIds"].map((p: any) => {
          return p;
        }),
    audience: item["audience"],
    clientIdOverride: item["clientIdOverride"],
    identityTranslation: item["identityTranslation"],
  };
}

/** Type of authentication mechanism for Azure Data Transfer API Flows. */
export enum KnownAuthenticationType {
  /** Option to use a JWT Bearer Authentication Token. */
  JWT = "JWT",
  /** Option to not use any form of Authentication. */
  None = "None",
}

/**
 * Type of authentication mechanism for Azure Data Transfer API Flows. \
 * {@link KnownAuthenticationType} can be used interchangeably with AuthenticationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **JWT**: Option to use a JWT Bearer Authentication Token. \
 * **None**: Option to not use any form of Authentication.
 */
export type AuthenticationType = string;

/** Properties to configure the destination remote endpoint for API calls. */
export interface RemoteEndpointSettings {
  /** The remote endpoint uri all API calls. */
  endpoint: string;
  /** Optional and for advanced used only. A list of authentication methods to use when accessing the remote endpoint. If not provided, the default S2S authentication using Entra (API Flow Managed Identity) and RBAC will be applied. */
  authentication?: Authentication[];
}

export function remoteEndpointSettingsSerializer(item: RemoteEndpointSettings): any {
  return {
    endpoint: item["endpoint"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationArraySerializer(item["authentication"]),
  };
}

export function remoteEndpointSettingsDeserializer(item: any): RemoteEndpointSettings {
  return {
    endpoint: item["endpoint"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationArrayDeserializer(item["authentication"]),
  };
}

/** The protocol of the stream */
export enum KnownStreamProtocol {
  /** This Flow is using User Datagram Protocol for the video stream. */
  UDP = "UDP",
  /** This Flow is using Secure Reliable Transfer for the video stream. */
  SRT = "SRT",
  /** This Flow is using Real-time Transport Protocol for the video stream. */
  RTP = "RTP",
}

/**
 * The protocol of the stream \
 * {@link KnownStreamProtocol} can be used interchangeably with StreamProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UDP**: This Flow is using User Datagram Protocol for the video stream. \
 * **SRT**: This Flow is using Secure Reliable Transfer for the video stream. \
 * **RTP**: This Flow is using Real-time Transport Protocol for the video stream.
 */
export type StreamProtocol = string;

/** The source IP address and CIDR ranges of the stream */
export interface StreamSourceAddresses {
  /** A source IP address or CIDR range */
  sourceAddresses?: string[];
}

export function streamSourceAddressesSerializer(item: StreamSourceAddresses): any {
  return {
    sourceAddresses: !item["sourceAddresses"]
      ? item["sourceAddresses"]
      : item["sourceAddresses"].map((p: any) => {
          return p;
        }),
  };
}

export function streamSourceAddressesDeserializer(item: any): StreamSourceAddresses {
  return {
    sourceAddresses: !item["sourceAddresses"]
      ? item["sourceAddresses"]
      : item["sourceAddresses"].map((p: any) => {
          return p;
        }),
  };
}

/** Plan for the resource. */
export interface Plan {
  /** A user defined name of the 3rd Party Artifact that is being procured. */
  name: string;
  /** The publisher of the 3rd Party Artifact that is being bought. E.g. NewRelic */
  publisher: string;
  /** The 3rd Party artifact that is being procured. E.g. NewRelic. Product maps to the OfferID specified for the artifact at the time of Data Market onboarding. */
  product: string;
  /** A publisher provided promotion code as provisioned in Data Market for the said product/artifact. */
  promotionCode?: string;
  /** The version of the desired product/artifact. */
  version?: string;
}

export function planSerializer(item: Plan): any {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
  };
}

export function planDeserializer(item: any): Plan {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
  };
}

/** The schemas list result. SchemaListResults has reached end of life support starting version 2025-05-30-preview. Please manage schemas with a FlowProfile resource instead. */
export interface SchemasListResult {
  /** Schemas array. */
  value?: Schema[];
}

export function schemasListResultDeserializer(item: any): SchemasListResult {
  return {
    value: !item["value"] ? item["value"] : schemaArrayDeserializer(item["value"]),
  };
}

/** The connections resource patch definition. */
export interface ConnectionsPatch {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function connectionsPatchSerializer(item: ConnectionsPatch): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
  };
}

/** The response of a Connection list operation. */
export interface _ConnectionListResult {
  /** The Connection items on this page */
  value: Connection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _connectionListResultDeserializer(item: any): _ConnectionListResult {
  return {
    value: connectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function connectionArraySerializer(result: Array<Connection>): any[] {
  return result.map((item) => {
    return connectionSerializer(item);
  });
}

export function connectionArrayDeserializer(result: Array<Connection>): any[] {
  return result.map((item) => {
    return connectionDeserializer(item);
  });
}

/** The custom response of a list operation. */
export interface _PendingConnectionListResult {
  /** The items on this page */
  value: PendingConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pendingConnectionListResultDeserializer(item: any): _PendingConnectionListResult {
  return {
    value: pendingConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function pendingConnectionArrayDeserializer(result: Array<PendingConnection>): any[] {
  return result.map((item) => {
    return pendingConnectionDeserializer(item);
  });
}

/** Pending connection object */
export interface PendingConnection {
  /** Subscription ID of the pending connection. */
  readonly subscriptionId?: string;
  /** Pipeline to use to transfer data */
  pipeline: string;
  /** Direction of data movement */
  direction?: Direction;
  /** Justification for the connection request */
  justification?: string;
  /** Status of the connection */
  readonly status?: ConnectionStatus;
  /** Force disablement status of the current connection */
  readonly forceDisabledStatus?: ForceDisabledStatus[];
  /** Reason for status */
  readonly statusReason?: string;
  /** Link status of the current connection */
  readonly linkStatus?: LinkStatus;
  /** Resource ID of the linked connection */
  readonly linkedConnectionId?: string;
  /** The flow types being requested for this connection. This FlowType property has reached end of life support starting version 2025-05-30-preview. Please create a FlowProfile resource instead. */
  flowTypes?: FlowType[];
  /** Provides a list of FlowProfiles . */
  flowProfileList?: FlowProfileMetadata[];
  /** Requirement ID of the connection */
  requirementId?: string;
  /** Subscription ID to link cloud subscriptions together */
  remoteSubscriptionId?: string;
  /** Approver of this connection request */
  readonly approver?: string;
  /** PIN to link requests together */
  pin?: string;
  /** The timestamp that this connection request was submitted at */
  readonly dateSubmitted?: Date;
  /** The primary contact for this connection request */
  primaryContact?: string;
  /** The secondary contacts for this connection request */
  secondaryContacts?: string[];
  /** Provisioning state of the connection */
  readonly provisioningState?: ProvisioningState;
  /** The policies for this connection. The policies property has reached end of life support starting version 2025-05-30-preview. Please create and use a FlowProfile resource instead. */
  policies?: string[];
  /** The schemas for this connection. The schemas property has reached end of life support starting version 2025-05-30-preview. Please create and use a FlowProfile resource instead. */
  schemas?: Schema[];
  /** The schema URIs for this connection. The schemaUris property has reached end of life support starting version 2025-05-30-preview. Please create and use a FlowProfile resource instead. */
  schemaUris?: string[];
  /** Hostname specific to API Flows */
  apiHostname?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function pendingConnectionDeserializer(item: any): PendingConnection {
  return {
    subscriptionId: item["subscriptionId"],
    pipeline: item["pipeline"],
    direction: item["direction"],
    justification: item["justification"],
    status: item["status"],
    forceDisabledStatus: !item["forceDisabledStatus"]
      ? item["forceDisabledStatus"]
      : item["forceDisabledStatus"].map((p: any) => {
          return p;
        }),
    statusReason: item["statusReason"],
    linkStatus: item["linkStatus"],
    linkedConnectionId: item["linkedConnectionId"],
    flowTypes: !item["flowTypes"]
      ? item["flowTypes"]
      : item["flowTypes"].map((p: any) => {
          return p;
        }),
    flowProfileList: !item["flowProfileList"]
      ? item["flowProfileList"]
      : flowProfileMetadataArrayDeserializer(item["flowProfileList"]),
    requirementId: item["requirementId"],
    remoteSubscriptionId: item["remoteSubscriptionId"],
    approver: item["approver"],
    pin: item["pin"],
    dateSubmitted: !item["dateSubmitted"] ? item["dateSubmitted"] : new Date(item["dateSubmitted"]),
    primaryContact: item["primaryContact"],
    secondaryContacts: !item["secondaryContacts"]
      ? item["secondaryContacts"]
      : item["secondaryContacts"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
    policies: !item["policies"]
      ? item["policies"]
      : item["policies"].map((p: any) => {
          return p;
        }),
    schemas: !item["schemas"] ? item["schemas"] : schemaArrayDeserializer(item["schemas"]),
    schemaUris: !item["schemaUris"]
      ? item["schemaUris"]
      : item["schemaUris"].map((p: any) => {
          return p;
        }),
    apiHostname: item["apiHostname"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The custom response of a list operation. */
export interface _PendingFlowListResult {
  /** The items on this page */
  value: PendingFlow[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pendingFlowListResultDeserializer(item: any): _PendingFlowListResult {
  return {
    value: pendingFlowArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function pendingFlowArrayDeserializer(result: Array<PendingFlow>): any[] {
  return result.map((item) => {
    return pendingFlowDeserializer(item);
  });
}

/** Pending flow object */
export interface PendingFlow {
  /** Subscription ID of the pending flow. */
  readonly subscriptionId?: string;
  /** Connection ID of the pending flow. */
  readonly connectionId?: string;
  /** The connection associated with this flow */
  connection?: SelectedResource;
  /** Dataflow GUID associated with this flow */
  readonly flowId?: string;
  /** URI to a Key Vault Secret containing a SAS token. */
  keyVaultUri?: string;
  /** Link status of the current flow */
  readonly linkStatus?: LinkStatus;
  /** Resource ID of the linked flow */
  readonly linkedFlowId?: string;
  /** Status of the current flow */
  status?: FlowStatus;
  /** Force disablement status of the current flow */
  readonly forceDisabledStatus?: ForceDisabledStatus[];
  /** Storage Account */
  storageAccountName?: string;
  /** Storage Account ID */
  storageAccountId?: string;
  /** Storage Container Name */
  storageContainerName?: string;
  /** Storage Table Name */
  storageTableName?: string;
  /** Service Bus Queue ID */
  serviceBusQueueId?: string;
  /** Type of FlowProfile to use for transfer via the flow. */
  flowProfile?: FlowProfileMetadata;
  /** The Flow's data class. */
  flowDataType?: DataClass;
  /** The flow type for this flow. The property has reached end of life support starting version 2025-05-30-preview. Please create and use a FlowProfile resource instead. */
  flowType?: FlowType;
  /** Type of data to transfer via the flow. The property has reached end of life support starting version 2025-05-30-preview. Please create and use a FlowProfile resource instead. */
  dataType?: DataType;
  /** Provisioning state of the flow */
  readonly provisioningState?: ProvisioningState;
  /** The policies for this flow. The property has reached end of life support starting version 2025-05-30-preview. Please create and use a FlowProfile resource instead. */
  policies?: string[];
  /** The selected schema for this flow. The property has reached end of life support starting version 2025-05-30-preview. Please create and use a FlowProfile resource instead. */
  schema?: Schema;
  /** The messaging options for this flow */
  messagingOptions?: MessagingOptions;
  /** The API Flow configuration options for Azure Data Transfer API Flow type. */
  apiFlowOptions?: ApiFlowOptions;
  /** The URI to the customer managed key for this flow */
  customerManagedKeyVaultUri?: string;
  /** The flow stream identifier */
  streamId?: string;
  /** The protocol of the stream */
  streamProtocol?: StreamProtocol;
  /** The latency of the stream in milliseconds */
  streamLatency?: number;
  /** The passphrase used for SRT streams */
  passphrase?: string;
  /** The source IP address and CIDR ranges of the stream */
  sourceAddresses?: StreamSourceAddresses;
  /** The destination endpoints of the stream */
  destinationEndpoints?: string[];
  /** The destination endpoint ports of the stream */
  destinationEndpointPorts?: number[];
  /** Event Hub ID */
  eventHubId?: string;
  /** Event Hub Consumer Group */
  consumerGroup?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function pendingFlowDeserializer(item: any): PendingFlow {
  return {
    subscriptionId: item["subscriptionId"],
    connectionId: item["connectionId"],
    connection: !item["connection"]
      ? item["connection"]
      : selectedResourceDeserializer(item["connection"]),
    flowId: item["flowId"],
    keyVaultUri: item["keyVaultUri"],
    linkStatus: item["linkStatus"],
    linkedFlowId: item["linkedFlowId"],
    status: item["status"],
    forceDisabledStatus: !item["forceDisabledStatus"]
      ? item["forceDisabledStatus"]
      : item["forceDisabledStatus"].map((p: any) => {
          return p;
        }),
    storageAccountName: item["storageAccountName"],
    storageAccountId: item["storageAccountId"],
    storageContainerName: item["storageContainerName"],
    storageTableName: item["storageTableName"],
    serviceBusQueueId: item["serviceBusQueueId"],
    flowProfile: !item["flowProfile"]
      ? item["flowProfile"]
      : flowProfileMetadataDeserializer(item["flowProfile"]),
    flowDataType: item["flowDataType"],
    flowType: item["flowType"],
    dataType: item["dataType"],
    provisioningState: item["provisioningState"],
    policies: !item["policies"]
      ? item["policies"]
      : item["policies"].map((p: any) => {
          return p;
        }),
    schema: !item["schema"] ? item["schema"] : schemaDeserializer(item["schema"]),
    messagingOptions: !item["messagingOptions"]
      ? item["messagingOptions"]
      : messagingOptionsDeserializer(item["messagingOptions"]),
    apiFlowOptions: !item["apiFlowOptions"]
      ? item["apiFlowOptions"]
      : apiFlowOptionsDeserializer(item["apiFlowOptions"]),
    customerManagedKeyVaultUri: item["customerManagedKeyVaultUri"],
    streamId: item["streamId"],
    streamProtocol: item["streamProtocol"],
    streamLatency: item["streamLatency"],
    passphrase: item["passphrase"],
    sourceAddresses: !item["sourceAddresses"]
      ? item["sourceAddresses"]
      : streamSourceAddressesDeserializer(item["sourceAddresses"]),
    destinationEndpoints: !item["destinationEndpoints"]
      ? item["destinationEndpoints"]
      : item["destinationEndpoints"].map((p: any) => {
          return p;
        }),
    destinationEndpointPorts: !item["destinationEndpointPorts"]
      ? item["destinationEndpointPorts"]
      : item["destinationEndpointPorts"].map((p: any) => {
          return p;
        }),
    eventHubId: item["eventHubId"],
    consumerGroup: item["consumerGroup"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The flows resource patch definition. */
export interface FlowsPatch {
  /** Properties of flows patch body. */
  properties?: FlowsPatchProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function flowsPatchSerializer(item: FlowsPatch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : flowsPatchPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
  };
}

/** Properties of flows patch body. */
export interface FlowsPatchProperties {
  /** The protocol of the stream */
  streamProtocol?: StreamProtocol;
  /** The passphrase used for SRT streams */
  passphrase?: string;
  /** The flow stream identifier */
  streamId?: string;
  /** The latency of the stream in milliseconds */
  streamLatency?: number;
}

export function flowsPatchPropertiesSerializer(item: FlowsPatchProperties): any {
  return {
    streamProtocol: item["streamProtocol"],
    passphrase: item["passphrase"],
    streamId: item["streamId"],
    streamLatency: item["streamLatency"],
  };
}

/** The response of a Flow list operation. */
export interface _FlowListResult {
  /** The Flow items on this page */
  value: Flow[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _flowListResultDeserializer(item: any): _FlowListResult {
  return {
    value: flowArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** List of destination endpoint ports for the flow stream */
export interface GetDestinationEndpointPortsResult {
  /** The destination endpoint port for the flow stream */
  ports?: number[];
}

export function getDestinationEndpointPortsResultDeserializer(
  item: any,
): GetDestinationEndpointPortsResult {
  return {
    ports: !item["ports"]
      ? item["ports"]
      : item["ports"].map((p: any) => {
          return p;
        }),
  };
}

/** List of destination endpoints for the flow stream */
export interface GetDestinationEndpointsResult {
  /** The destination endpoints for the flow stream */
  endpoints?: string[];
}

export function getDestinationEndpointsResultDeserializer(
  item: any,
): GetDestinationEndpointsResult {
  return {
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : item["endpoints"].map((p: any) => {
          return p;
        }),
  };
}

/** The connection string for the specified streaming flow */
export interface GetStreamConnectionStringResult {
  /** The connection string for the specified streaming flow */
  connectionString?: string;
}

export function getStreamConnectionStringResultDeserializer(
  item: any,
): GetStreamConnectionStringResult {
  return {
    connectionString: item["connectionString"],
  };
}

/** Set the destination endpoint ports for the specified flow. */
export interface SetDestinationEndpointPorts {
  /** The specified flow destination endpoint ports */
  ports?: number[];
}

export function setDestinationEndpointPortsSerializer(item: SetDestinationEndpointPorts): any {
  return {
    ports: !item["ports"]
      ? item["ports"]
      : item["ports"].map((p: any) => {
          return p;
        }),
  };
}

/** Set the destination endpoints for the specified flow. */
export interface SetDestinationEndpoints {
  /** The specified flow destination endpoints. */
  endpoints?: string[];
}

export function setDestinationEndpointsSerializer(item: SetDestinationEndpoints): any {
  return {
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : item["endpoints"].map((p: any) => {
          return p;
        }),
  };
}

/** Set the passphrase used for SRT streams */
export interface SetStreamPassphrase {
  /** The passphrase used for SRT streams */
  value?: string;
}

export function setStreamPassphraseSerializer(item: SetStreamPassphrase): any {
  return { value: item["value"] };
}

/** Set the source addresses for the specified flow. */
export interface SetSourceAddresses {
  /** Source addresses */
  values?: string[];
}

export function setSourceAddressesSerializer(item: SetSourceAddresses): any {
  return {
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** The request used to list approved schemas within the resource provider. ListApprovedSchemaRequest has reached end of life support starting version 2025-05-30-preview. Please manage schemas with a FlowProfile resource instead. */
export interface ListApprovedSchemasRequest {
  /** The name of the pipeline to filter approved schemas. */
  pipeline?: string;
  /** The direction pipeline to filter approved schemas. */
  direction?: Direction;
}

export function listApprovedSchemasRequestSerializer(item: ListApprovedSchemasRequest): any {
  return { pipeline: item["pipeline"], direction: item["direction"] };
}

/** Defines the required request body for retrieving FlowProfile information for a provided pipeline. */
export interface ListFlowProfilesRequest {
  /** The name of the pipeline for which to retrieve associated FlowProfiles. */
  pipeline?: string;
}

export function listFlowProfilesRequestSerializer(item: ListFlowProfilesRequest): any {
  return { pipeline: item["pipeline"] };
}

/** The flow profiles list result */
export interface FlowProfilesListResult {
  /** FlowProfileMetadata array. */
  value?: FlowProfileMetadata[];
}

export function flowProfilesListResultDeserializer(item: any): FlowProfilesListResult {
  return {
    value: !item["value"] ? item["value"] : flowProfileMetadataArrayDeserializer(item["value"]),
  };
}

/** Result of the schema validation. ValidateSchemaResult has reached end of life support starting version 2025-05-30-preview. Please manage schemas with a FlowProfile resource instead. */
export interface ValidateSchemaResult {
  /** Validation status of the schema */
  status?: ValidateSchemaStatus;
  /** Message describing the schema validation */
  message?: string;
}

export function validateSchemaResultDeserializer(item: any): ValidateSchemaResult {
  return {
    status: item["status"],
    message: item["message"],
  };
}

/** Validation status of the schema */
export enum KnownValidateSchemaStatus {
  /** Validation of the schema was successful. */
  Succeeded = "Succeeded",
  /** The schema failed validation, whether due to error or an invalid schema. */
  Failed = "Failed",
}

/**
 * Validation status of the schema \
 * {@link KnownValidateSchemaStatus} can be used interchangeably with ValidateSchemaStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Validation of the schema was successful. \
 * **Failed**: The schema failed validation, whether due to error or an invalid schema.
 */
export type ValidateSchemaStatus = string;

/** Defines the required request body for retrieving Pipeline metadata for a provided pipeline. */
export interface ListPipelineMetadataRequest {
  /** The name of the pipeline for which to retrieve associated metadata. */
  pipeline: string;
}

export function listPipelineMetadataRequestSerializer(item: ListPipelineMetadataRequest): any {
  return { pipeline: item["pipeline"] };
}

/** Defines the response body for retrieving Pipeline metadata for a provided pipeline. */
export interface ListPipelineMetadataResult {
  /** Returns the settings associated with send direction of the pipeline. */
  send?: DirectionSettings;
  /** Returns the settings associated with receive direction of the pipeline. */
  receive?: DirectionSettings;
}

export function listPipelineMetadataResultDeserializer(item: any): ListPipelineMetadataResult {
  return {
    send: !item["send"] ? item["send"] : directionSettingsDeserializer(item["send"]),
    receive: !item["receive"] ? item["receive"] : directionSettingsDeserializer(item["receive"]),
  };
}

/**
 * Describes the available settings and supported features for a specific
 * transfer direction (Send or Receive) within a pipeline.
 */
export interface DirectionSettings {
  /** Indicates whether this direction completes the connection linking process. */
  completeLinking: EnablementStatus;
  /** Indicates whether connections in this direction require approval. */
  connectionApprovals: EnablementStatus;
  /** Indicates whether flow approvals are required for this direction. */
  flowApprovals?: EnablementStatus;
  /** The flow types supported for this direction. */
  flowTypesAvailable?: FlowType[];
  /** Indicates whether schema validation is required for data transfer in this direction. */
  messagingFlowTypeSchemaValidation?: EnablementStatus;
  /** The data class types available for FlowProfile-based transfers in this direction. */
  flowProfileDataClassesAvailable?: DataClassType[];
  /** The pricing options available for messaging flows in this direction. */
  messagingFlowsPricingOptions?: FlowBillingTier[];
}

export function directionSettingsDeserializer(item: any): DirectionSettings {
  return {
    completeLinking: item["completeLinking"],
    connectionApprovals: item["connectionApprovals"],
    flowApprovals: item["flowApprovals"],
    flowTypesAvailable: !item["flowTypesAvailable"]
      ? item["flowTypesAvailable"]
      : item["flowTypesAvailable"].map((p: any) => {
          return p;
        }),
    messagingFlowTypeSchemaValidation: item["messagingFlowTypeSchemaValidation"],
    flowProfileDataClassesAvailable: !item["flowProfileDataClassesAvailable"]
      ? item["flowProfileDataClassesAvailable"]
      : item["flowProfileDataClassesAvailable"].map((p: any) => {
          return p;
        }),
    messagingFlowsPricingOptions: !item["messagingFlowsPricingOptions"]
      ? item["messagingFlowsPricingOptions"]
      : item["messagingFlowsPricingOptions"].map((p: any) => {
          return p;
        }),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-04-11-preview API version. */
  V20250411Preview = "2025-04-11-preview",
  /** The 2025-05-21 API version. */
  V20250521 = "2025-05-21",
  /** The 2025-05-30-preview API version. */
  V20250530Preview = "2025-05-30-preview",
  /** The 2025-10-10-preview API version. */
  V20251010Preview = "2025-10-10-preview",
  /** The 2026-02-06-preview API version. */
  V20260206Preview = "2026-02-06-preview",
}
