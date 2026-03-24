// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** List of supported operations. */
export interface _OperationList {
  /** The system metadata relating to this resource */
  readonly systemData?: SystemData;
  /** List of supported operations. */
  value?: OperationsDefinition[];
}

export function _operationListDeserializer(item: any): _OperationList {
  return {
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    value: !item["value"] ? item["value"] : operationsDefinitionArrayDeserializer(item["value"]),
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

export function operationsDefinitionArrayDeserializer(result: Array<OperationsDefinition>): any[] {
  return result.map((item) => {
    return operationsDefinitionDeserializer(item);
  });
}

/** Definition object with the name and properties of an operation. */
export interface OperationsDefinition {
  /** Name of the operation. */
  name?: string;
  /** Display object with properties of the operation. */
  display?: OperationsDisplayDefinition;
  /** Properties of the operation */
  properties?: OperationProperties;
}

export function operationsDefinitionDeserializer(item: any): OperationsDefinition {
  return {
    name: item["name"],
    display: !item["display"]
      ? item["display"]
      : operationsDisplayDefinitionDeserializer(item["display"]),
    properties: !item["properties"]
      ? item["properties"]
      : operationPropertiesDeserializer(item["properties"]),
  };
}

/** Display object with properties of the operation. */
export interface OperationsDisplayDefinition {
  /** Resource provider of the operation. */
  provider?: string;
  /** Resource for the operation. */
  resource?: string;
  /** Short description of the operation. */
  operation?: string;
  /** Description of the operation. */
  description?: string;
}

export function operationsDisplayDefinitionDeserializer(item: any): OperationsDisplayDefinition {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Extra Operation properties */
export interface OperationProperties {
  /** Service specifications of the operation */
  serviceSpecification?: ServiceSpecification;
}

export function operationPropertiesDeserializer(item: any): OperationProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** Service specification payload */
export interface ServiceSpecification {
  /** Specifications of the Log for Microsoft Azure Attestation */
  logSpecifications?: LogSpecification[];
}

export function serviceSpecificationDeserializer(item: any): ServiceSpecification {
  return {
    logSpecifications: !item["logSpecifications"]
      ? item["logSpecifications"]
      : logSpecificationArrayDeserializer(item["logSpecifications"]),
  };
}

export function logSpecificationArrayDeserializer(result: Array<LogSpecification>): any[] {
  return result.map((item) => {
    return logSpecificationDeserializer(item);
  });
}

/** Specifications of the Log for Microsoft Azure Attestation */
export interface LogSpecification {
  /** Name of the log */
  name?: string;
  /** Localized friendly display name of the log */
  displayName?: string;
}

export function logSpecificationDeserializer(item: any): LogSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
  };
}

/** An error response from Attestation. */
export interface CloudError {
  /** An error response from Attestation. */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** An error response from Attestation. */
export interface CloudErrorBody {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code?: string;
  /** A message describing the error, intended to be suitable for displaying in a user interface. */
  message?: string;
}

export function cloudErrorBodyDeserializer(item: any): CloudErrorBody {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Attestation service response message. */
export interface AttestationProvider extends TrackedResource {
  /** Trust model for the attestation provider. */
  trustModel?: string;
  /** Status of attestation service. */
  status?: AttestationServiceStatus;
  /** Gets the uri of attestation service */
  attestUri?: string;
  /** Controls whether traffic from the public network is allowed to access the Attestation Provider APIs. */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** List of private endpoint connections associated with the attestation provider. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** The setting that controls whether authentication is enabled or disabled for TPM Attestation REST APIs. */
  tpmAttestationAuthentication?: TpmAttestationAuthenticationType;
}

export function attestationProviderDeserializer(item: any): AttestationProvider {
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
    ...(!item["properties"]
      ? item["properties"]
      : _attestationProviderPropertiesDeserializer(item["properties"])),
  };
}

/** Status of attestation service. */
export interface StatusResult {
  /** Trust model for the attestation provider. */
  trustModel?: string;
  /** Status of attestation service. */
  status?: AttestationServiceStatus;
  /** Gets the uri of attestation service */
  attestUri?: string;
  /** Controls whether traffic from the public network is allowed to access the Attestation Provider APIs. */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** List of private endpoint connections associated with the attestation provider. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** The setting that controls whether authentication is enabled or disabled for TPM Attestation REST APIs. */
  tpmAttestationAuthentication?: TpmAttestationAuthenticationType;
}

export function statusResultDeserializer(item: any): StatusResult {
  return {
    trustModel: item["trustModel"],
    status: item["status"],
    attestUri: item["attestUri"],
    publicNetworkAccess: item["publicNetworkAccess"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    tpmAttestationAuthentication: item["tpmAttestationAuthentication"],
  };
}

/** Status of attestation service. */
export enum KnownAttestationServiceStatus {
  /** Ready */
  Ready = "Ready",
  /** NotReady */
  NotReady = "NotReady",
  /** Error */
  Error = "Error",
}

/**
 * Status of attestation service. \
 * {@link KnownAttestationServiceStatus} can be used interchangeably with AttestationServiceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready** \
 * **NotReady** \
 * **Error**
 */
export type AttestationServiceStatus = string;

/** The public network access type for API calls to the Attestation Provider. */
export enum KnownPublicNetworkAccessType {
  /** Enables public network connectivity to the Attestation Provider REST APIs. */
  Enabled = "Enabled",
  /** Disables public network connectivity to the Attestation Provider REST APIs. */
  Disabled = "Disabled",
}

/**
 * The public network access type for API calls to the Attestation Provider. \
 * {@link KnownPublicNetworkAccessType} can be used interchangeably with PublicNetworkAccessType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enables public network connectivity to the Attestation Provider REST APIs. \
 * **Disabled**: Disables public network connectivity to the Attestation Provider REST APIs.
 */
export type PublicNetworkAccessType = string;

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** The Private Endpoint Connection resource. */
export interface PrivateEndpointConnection extends Resource {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    provisioningState: item["provisioningState"],
  };
}

/** The private endpoint resource. */
export interface PrivateEndpoint {
  /** The resource identifier of the private endpoint */
  readonly id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return item;
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: PrivateEndpointServiceConnectionStatus;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** The private endpoint connection status. */
export enum KnownPrivateEndpointServiceConnectionStatus {
  /** Connection waiting for approval or rejection */
  Pending = "Pending",
  /** Connection approved */
  Approved = "Approved",
  /** Connection Rejected */
  Rejected = "Rejected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Connection waiting for approval or rejection \
 * **Approved**: Connection approved \
 * **Rejected**: Connection Rejected
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Connection has been provisioned */
  Succeeded = "Succeeded",
  /** Connection is being created */
  Creating = "Creating",
  /** Connection is being deleted */
  Deleting = "Deleting",
  /** Connection provisioning has failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Connection has been provisioned \
 * **Creating**: Connection is being created \
 * **Deleting**: Connection is being deleted \
 * **Failed**: Connection provisioning has failed
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** The type for specifying the requirement of authentication for TPM Attestation REST APIs. */
export enum KnownTpmAttestationAuthenticationType {
  /** Enables the requirement of authentication for TPM Attestation REST APIs. */
  Enabled = "Enabled",
  /** Disables the requirement of authentication for TPM Attestation REST APIs. */
  Disabled = "Disabled",
}

/**
 * The type for specifying the requirement of authentication for TPM Attestation REST APIs. \
 * {@link KnownTpmAttestationAuthenticationType} can be used interchangeably with TpmAttestationAuthenticationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enables the requirement of authentication for TPM Attestation REST APIs. \
 * **Disabled**: Disables the requirement of authentication for TPM Attestation REST APIs.
 */
export type TpmAttestationAuthenticationType = string;

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

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
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

/** Parameters for creating an attestation provider */
export interface AttestationServiceCreationParams {
  /** The supported Azure location where the attestation provider should be created. */
  location: string;
  /** The tags that will be assigned to the attestation provider. */
  tags?: Record<string, string>;
  /** Properties of the attestation provider */
  properties: AttestationServiceCreationSpecificParams;
}

export function attestationServiceCreationParamsSerializer(
  item: AttestationServiceCreationParams,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    properties: attestationServiceCreationSpecificParamsSerializer(item["properties"]),
  };
}

/** Client supplied parameters used to create a new attestation provider. */
export interface AttestationServiceCreationSpecificParams {
  /** Controls whether traffic from the public network is allowed to access the Attestation Provider APIs. */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** JSON Web Key Set defining a set of X.509 Certificates that will represent the parent certificate for the signing certificate used for policy operations */
  policySigningCertificates?: JsonWebKeySet;
  /** The setting that controls whether authentication is enabled or disabled for TPM Attestation REST APIs. */
  tpmAttestationAuthentication?: TpmAttestationAuthenticationType;
}

export function attestationServiceCreationSpecificParamsSerializer(
  item: AttestationServiceCreationSpecificParams,
): any {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    policySigningCertificates: !item["policySigningCertificates"]
      ? item["policySigningCertificates"]
      : jsonWebKeySetSerializer(item["policySigningCertificates"]),
    tpmAttestationAuthentication: item["tpmAttestationAuthentication"],
  };
}

/** model interface JsonWebKeySet */
export interface JsonWebKeySet {
  /**
   * The value of the "keys" parameter is an array of JWK values.  By
   * default, the order of the JWK values within the array does not imply
   * an order of preference among them, although applications of JWK Sets
   * can choose to assign a meaning to the order for their purposes, if
   * desired.
   */
  keys?: JsonWebKey[];
}

export function jsonWebKeySetSerializer(item: JsonWebKeySet): any {
  return { keys: !item["keys"] ? item["keys"] : jsonWebKeyArraySerializer(item["keys"]) };
}

export function jsonWebKeyArraySerializer(result: Array<JsonWebKey>): any[] {
  return result.map((item) => {
    return jsonWebKeySerializer(item);
  });
}

/** model interface JsonWebKey */
export interface JsonWebKey {
  /**
   * The "alg" (algorithm) parameter identifies the algorithm intended for
   * use with the key.  The values used should either be registered in the
   * IANA "JSON Web Signature and Encryption Algorithms" registry
   * established by [JWA] or be a value that contains a Collision-
   * Resistant Name.
   */
  alg?: string;
  /** The "crv" (curve) parameter identifies the curve type */
  crv?: string;
  /** RSA private exponent or ECC private key */
  d?: string;
  /** RSA Private Key Parameter */
  dp?: string;
  /** RSA Private Key Parameter */
  dq?: string;
  /** RSA public exponent, in Base64 */
  e?: string;
  /** Symmetric key */
  k?: string;
  /**
   * The "kid" (key ID) parameter is used to match a specific key.  This
   * is used, for instance, to choose among a set of keys within a JWK Set
   * during key rollover.  The structure of the "kid" value is
   * unspecified.  When "kid" values are used within a JWK Set, different
   * keys within the JWK Set SHOULD use distinct "kid" values.  (One
   * example in which different keys might use the same "kid" value is if
   * they have different "kty" (key type) values but are considered to be
   * equivalent alternatives by the application using them.)  The "kid"
   * value is a case-sensitive string.
   */
  kid?: string;
  /**
   * The "kty" (key type) parameter identifies the cryptographic algorithm
   * family used with the key, such as "RSA" or "EC". "kty" values should
   * either be registered in the IANA "JSON Web Key Types" registry
   * established by [JWA] or be a value that contains a Collision-
   * Resistant Name.  The "kty" value is a case-sensitive string.
   */
  kty: string;
  /** RSA modulus, in Base64 */
  n?: string;
  /** RSA secret prime */
  p?: string;
  /** RSA secret prime, with p < q */
  q?: string;
  /** RSA Private Key Parameter */
  qi?: string;
  /**
   * Use ("public key use") identifies the intended use of
   * the public key. The "use" parameter is employed to indicate whether
   * a public key is used for encrypting data or verifying the signature
   * on data. Values are commonly "sig" (signature) or "enc" (encryption).
   */
  use?: string;
  /** X coordinate for the Elliptic Curve point */
  x?: string;
  /**
   * The "x5c" (X.509 certificate chain) parameter contains a chain of one
   * or more PKIX certificates [RFC5280].  The certificate chain is
   * represented as a JSON array of certificate value strings.  Each
   * string in the array is a base64-encoded (Section 4 of [RFC4648] --
   * not base64url-encoded) DER [ITU.X690.1994] PKIX certificate value.
   * The PKIX certificate containing the key value MUST be the first
   * certificate.
   */
  x5C?: string[];
  /** Y coordinate for the Elliptic Curve point */
  y?: string;
}

export function jsonWebKeySerializer(item: JsonWebKey): any {
  return {
    alg: item["alg"],
    crv: item["crv"],
    d: item["d"],
    dp: item["dp"],
    dq: item["dq"],
    e: item["e"],
    k: item["k"],
    kid: item["kid"],
    kty: item["kty"],
    n: item["n"],
    p: item["p"],
    q: item["q"],
    qi: item["qi"],
    use: item["use"],
    x: item["x"],
    x5c: !item["x5C"]
      ? item["x5C"]
      : item["x5C"].map((p: any) => {
          return p;
        }),
    y: item["y"],
  };
}

/** Parameters for patching an attestation provider */
export interface AttestationServicePatchParams {
  /** The tags that will be assigned to the attestation provider. */
  tags?: Record<string, string>;
  /** Properties of the attestation provider */
  properties?: AttestationServicePatchSpecificParams;
}

export function attestationServicePatchParamsSerializer(item: AttestationServicePatchParams): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : attestationServicePatchSpecificParamsSerializer(item["properties"]),
  };
}

/** Client supplied parameters used to patch an existing attestation provider. */
export interface AttestationServicePatchSpecificParams {
  /** Controls whether traffic from the public network is allowed to access the Attestation Provider APIs. */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** The setting that controls whether authentication is enabled or disabled for TPM Attestation REST APIs. */
  tpmAttestationAuthentication?: TpmAttestationAuthenticationType;
}

export function attestationServicePatchSpecificParamsSerializer(
  item: AttestationServicePatchSpecificParams,
): any {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    tpmAttestationAuthentication: item["tpmAttestationAuthentication"],
  };
}

/** Attestation Providers List. */
export interface AttestationProviderListResult {
  /** The system metadata relating to this resource */
  readonly systemData?: SystemData;
  /** Attestation Provider array. */
  value?: AttestationProvider[];
}

export function attestationProviderListResultDeserializer(
  item: any,
): AttestationProviderListResult {
  return {
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    value: !item["value"] ? item["value"] : attestationProviderArrayDeserializer(item["value"]),
  };
}

export function attestationProviderArrayDeserializer(result: Array<AttestationProvider>): any[] {
  return result.map((item) => {
    return attestationProviderDeserializer(item);
  });
}

/** The response of a PrivateEndpointConnection list operation. */
export interface _PrivateEndpointConnectionListResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a PrivateLinkResource list operation. */
export interface PrivateLinkResourceListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function privateLinkResourceListResultDeserializer(
  item: any,
): PrivateLinkResourceListResult {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** A private link resource. */
export interface PrivateLinkResource extends Resource {
  /** Resource properties. */
  properties?: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2021-06-01 API version. */
  V20210601 = "2021-06-01",
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function _attestationProviderPropertiesDeserializer(item: any) {
  return {
    trustModel: item["trustModel"],
    status: item["status"],
    attestUri: item["attestUri"],
    publicNetworkAccess: item["publicNetworkAccess"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    tpmAttestationAuthentication: item["tpmAttestationAuthentication"],
  };
}
