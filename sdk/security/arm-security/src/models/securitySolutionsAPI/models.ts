// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../../static-helpers/serialization/serialize-record.js";
import type { ProvisioningState } from "../common/models.js";
import type { ProxyResource, SystemData } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface DiscoveredSecuritySolution extends ProxyResource {
  /** Location where the resource is stored */
  readonly location: string;
  /** The security family of the discovered solution */
  securityFamily: SecurityFamily;
  /** The security solutions' image offer */
  offer: string;
  /** The security solutions' image publisher */
  publisher: string;
  /** The security solutions' image sku */
  sku: string;
}

export function discoveredSecuritySolutionDeserializer(item: any): DiscoveredSecuritySolution {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._discoveredSecuritySolutionPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** model interface DiscoveredSecuritySolutionProperties */
export interface DiscoveredSecuritySolutionProperties {
  /** The security family of the discovered solution */
  securityFamily: SecurityFamily;
  /** The security solutions' image offer */
  offer: string;
  /** The security solutions' image publisher */
  publisher: string;
  /** The security solutions' image sku */
  sku: string;
}

export function discoveredSecuritySolutionPropertiesDeserializer(
  item: any,
): DiscoveredSecuritySolutionProperties {
  return {
    securityFamily: item["securityFamily"],
    offer: item["offer"],
    publisher: item["publisher"],
    sku: item["sku"],
  };
}

/** The security family of the discovered solution */
export enum KnownSecurityFamily {
  /** Waf */
  Waf = "Waf",
  /** Ngfw */
  Ngfw = "Ngfw",
  /** SaasWaf */
  SaasWaf = "SaasWaf",
  /** Va */
  Va = "Va",
}

/**
 * The security family of the discovered solution \
 * {@link KnownSecurityFamily} can be used interchangeably with SecurityFamily,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Waf**: Waf \
 * **Ngfw**: Ngfw \
 * **SaasWaf**: SaasWaf \
 * **Va**: Va
 */
export type SecurityFamily = string;

/** model interface _DiscoveredSecuritySolutionList */
export interface _DiscoveredSecuritySolutionList {
  value?: DiscoveredSecuritySolution[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _discoveredSecuritySolutionListDeserializer(
  item: any,
): _DiscoveredSecuritySolutionList {
  return {
    value: !item["value"]
      ? item["value"]
      : discoveredSecuritySolutionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function discoveredSecuritySolutionArrayDeserializer(
  result: Array<DiscoveredSecuritySolution>,
): any[] {
  return result.map((item) => {
    return discoveredSecuritySolutionDeserializer(item);
  });
}

/** Represents a security solution external to Microsoft Defender for Cloud which sends information to an OMS workspace and whose data is displayed by Microsoft Defender for Cloud. */
export interface ExternalSecuritySolution extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: Record<string, any>;
  /** The kind of the external solution */
  /** The discriminator possible values: CEF, ATA, AAD */
  kind?: ExternalSecuritySolutionKind;
  /** Location where the resource is stored */
  readonly location: string;
}

export function externalSecuritySolutionDeserializer(item: any): ExternalSecuritySolution {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : _externalSecuritySolutionProperties1Deserializer(item["properties"]),
    kind: item["kind"],
    location: item["location"],
  };
}

/** Alias for ExternalSecuritySolutionUnion */
export type ExternalSecuritySolutionUnion =
  | CefExternalSecuritySolution
  | AtaExternalSecuritySolution
  | AadExternalSecuritySolution
  | ExternalSecuritySolution;

export function externalSecuritySolutionUnionDeserializer(
  item: any,
): ExternalSecuritySolutionUnion {
  switch (item["kind"]) {
    case "CEF":
      return cefExternalSecuritySolutionDeserializer(item as CefExternalSecuritySolution);

    case "ATA":
      return ataExternalSecuritySolutionDeserializer(item as AtaExternalSecuritySolution);

    case "AAD":
      return aadExternalSecuritySolutionDeserializer(item as AadExternalSecuritySolution);

    default:
      return externalSecuritySolutionDeserializer(item);
  }
}

/** model interface _ExternalSecuritySolutionProperties1 */
export interface _ExternalSecuritySolutionProperties1 {}

export function _externalSecuritySolutionProperties1Deserializer(
  item: any,
): _ExternalSecuritySolutionProperties1 {
  return item;
}

/** The kind of the external solution */
export enum KnownExternalSecuritySolutionKind {
  /** CEF */
  CEF = "CEF",
  /** ATA */
  ATA = "ATA",
  /** AAD */
  AAD = "AAD",
}

/**
 * The kind of the external solution \
 * {@link KnownExternalSecuritySolutionKind} can be used interchangeably with ExternalSecuritySolutionKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CEF**: CEF \
 * **ATA**: ATA \
 * **AAD**: AAD
 */
export type ExternalSecuritySolutionKind = string;

/** Represents a security solution which sends CEF logs to an OMS workspace */
export interface CefExternalSecuritySolution extends ExternalSecuritySolution {
  /** The external security solution properties for CEF solutions */
  properties?: CefSolutionProperties;
  kind: "CEF";
}

export function cefExternalSecuritySolutionDeserializer(item: any): CefExternalSecuritySolution {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : cefSolutionPropertiesDeserializer(item["properties"]),
    kind: item["kind"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The external security solution properties for CEF solutions */
export interface CefSolutionProperties extends ExternalSecuritySolutionProperties {
  hostname?: string;
  agent?: string;
  lastEventReceived?: string;
}

export function cefSolutionPropertiesDeserializer(item: any): CefSolutionProperties {
  return {
    additionalProperties: serializeRecord(item, [
      "deviceVendor",
      "deviceType",
      "workspace",
      "hostname",
      "agent",
      "lastEventReceived",
    ]),
    deviceVendor: item["deviceVendor"],
    deviceType: item["deviceType"],
    workspace: !item["workspace"]
      ? item["workspace"]
      : connectedWorkspaceDeserializer(item["workspace"]),
    hostname: item["hostname"],
    agent: item["agent"],
    lastEventReceived: item["lastEventReceived"],
  };
}

/** Represents an ATA security solution which sends logs to an OMS workspace */
export interface AtaExternalSecuritySolution extends ExternalSecuritySolution {
  /** The external security solution properties for ATA solutions */
  properties?: AtaSolutionProperties;
  kind: "ATA";
}

export function ataExternalSecuritySolutionDeserializer(item: any): AtaExternalSecuritySolution {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : ataSolutionPropertiesDeserializer(item["properties"]),
    kind: item["kind"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The external security solution properties for ATA solutions */
export interface AtaSolutionProperties extends ExternalSecuritySolutionProperties {
  lastEventReceived?: string;
}

export function ataSolutionPropertiesDeserializer(item: any): AtaSolutionProperties {
  return {
    additionalProperties: serializeRecord(item, [
      "deviceVendor",
      "deviceType",
      "workspace",
      "lastEventReceived",
    ]),
    deviceVendor: item["deviceVendor"],
    deviceType: item["deviceType"],
    workspace: !item["workspace"]
      ? item["workspace"]
      : connectedWorkspaceDeserializer(item["workspace"]),
    lastEventReceived: item["lastEventReceived"],
  };
}

/** Represents an AAD identity protection solution which sends logs to an OMS workspace. */
export interface AadExternalSecuritySolution extends ExternalSecuritySolution {
  /** The external security solution properties for AAD solutions */
  properties?: AadSolutionProperties;
  kind: "AAD";
}

export function aadExternalSecuritySolutionDeserializer(item: any): AadExternalSecuritySolution {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : aadSolutionPropertiesDeserializer(item["properties"]),
    kind: item["kind"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The external security solution properties for AAD solutions */
export interface AadSolutionProperties {
  deviceVendor?: string;
  deviceType?: string;
  /** Represents an OMS workspace to which the solution is connected */
  workspace?: ConnectedWorkspace;
  /** The connectivity state of the external AAD solution */
  connectivityState?: AadConnectivityState;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function aadSolutionPropertiesDeserializer(item: any): AadSolutionProperties {
  return {
    additionalProperties: serializeRecord(item, [
      "deviceVendor",
      "deviceType",
      "workspace",
      "connectivityState",
    ]),
    deviceVendor: item["deviceVendor"],
    deviceType: item["deviceType"],
    workspace: !item["workspace"]
      ? item["workspace"]
      : connectedWorkspaceDeserializer(item["workspace"]),
    connectivityState: item["connectivityState"],
  };
}

/** Represents an OMS workspace to which the solution is connected */
export interface ConnectedWorkspace {
  /** Azure resource ID of the connected OMS workspace */
  id?: string;
}

export function connectedWorkspaceDeserializer(item: any): ConnectedWorkspace {
  return {
    id: item["id"],
  };
}

/** The connectivity state of the external AAD solution */
export enum KnownAadConnectivityState {
  /** Discovered */
  Discovered = "Discovered",
  /** NotLicensed */
  NotLicensed = "NotLicensed",
  /** Connected */
  Connected = "Connected",
}

/**
 * The connectivity state of the external AAD solution \
 * {@link KnownAadConnectivityState} can be used interchangeably with AadConnectivityState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Discovered**: Discovered \
 * **NotLicensed**: NotLicensed \
 * **Connected**: Connected
 */
export type AadConnectivityState = string;

/** The solution properties (correspond to the solution kind) */
export interface ExternalSecuritySolutionProperties {
  deviceVendor?: string;
  deviceType?: string;
  /** Represents an OMS workspace to which the solution is connected */
  workspace?: ConnectedWorkspace;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function externalSecuritySolutionPropertiesDeserializer(
  item: any,
): ExternalSecuritySolutionProperties {
  return {
    additionalProperties: serializeRecord(item, ["deviceVendor", "deviceType", "workspace"]),
    deviceVendor: item["deviceVendor"],
    deviceType: item["deviceType"],
    workspace: !item["workspace"]
      ? item["workspace"]
      : connectedWorkspaceDeserializer(item["workspace"]),
  };
}

/** model interface _ExternalSecuritySolutionList */
export interface _ExternalSecuritySolutionList {
  value?: ExternalSecuritySolutionUnion[];
  readonly nextLink?: string;
}

export function _externalSecuritySolutionListDeserializer(
  item: any,
): _ExternalSecuritySolutionList {
  return {
    value: !item["value"]
      ? item["value"]
      : externalSecuritySolutionUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function externalSecuritySolutionUnionArrayDeserializer(
  result: Array<ExternalSecuritySolutionUnion>,
): any[] {
  return result.map((item) => {
    return externalSecuritySolutionUnionDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface JitNetworkAccessPolicy extends ProxyResource {
  /** Kind of the resource */
  kind?: string;
  /** Location where the resource is stored */
  readonly location: string;
  /** Configurations for Microsoft.Compute/virtualMachines resource type. */
  virtualMachines: JitNetworkAccessPolicyVirtualMachine[];
  requests?: JitNetworkAccessRequest[];
  /** Gets the provisioning state of the Just-in-Time policy. */
  readonly provisioningState?: string;
}

export function jitNetworkAccessPolicySerializer(item: JitNetworkAccessPolicy): any {
  return { properties: _jitNetworkAccessPolicyPropertiesSerializer(item), kind: item["kind"] };
}

export function jitNetworkAccessPolicyDeserializer(item: any): JitNetworkAccessPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._jitNetworkAccessPolicyPropertiesDeserializer(item["properties"]),
    kind: item["kind"],
    location: item["location"],
  };
}

/** model interface JitNetworkAccessPolicyProperties */
export interface JitNetworkAccessPolicyProperties {
  /** Configurations for Microsoft.Compute/virtualMachines resource type. */
  virtualMachines: JitNetworkAccessPolicyVirtualMachine[];
  requests?: JitNetworkAccessRequest[];
  /** Gets the provisioning state of the Just-in-Time policy. */
  readonly provisioningState?: string;
}

export function jitNetworkAccessPolicyPropertiesSerializer(
  item: JitNetworkAccessPolicyProperties,
): any {
  return {
    virtualMachines: jitNetworkAccessPolicyVirtualMachineArraySerializer(item["virtualMachines"]),
    requests: !item["requests"]
      ? item["requests"]
      : jitNetworkAccessRequestArraySerializer(item["requests"]),
  };
}

export function jitNetworkAccessPolicyPropertiesDeserializer(
  item: any,
): JitNetworkAccessPolicyProperties {
  return {
    virtualMachines: jitNetworkAccessPolicyVirtualMachineArrayDeserializer(item["virtualMachines"]),
    requests: !item["requests"]
      ? item["requests"]
      : jitNetworkAccessRequestArrayDeserializer(item["requests"]),
    provisioningState: item["provisioningState"],
  };
}

export function jitNetworkAccessPolicyVirtualMachineArraySerializer(
  result: Array<JitNetworkAccessPolicyVirtualMachine>,
): any[] {
  return result.map((item) => {
    return jitNetworkAccessPolicyVirtualMachineSerializer(item);
  });
}

export function jitNetworkAccessPolicyVirtualMachineArrayDeserializer(
  result: Array<JitNetworkAccessPolicyVirtualMachine>,
): any[] {
  return result.map((item) => {
    return jitNetworkAccessPolicyVirtualMachineDeserializer(item);
  });
}

/** model interface JitNetworkAccessPolicyVirtualMachine */
export interface JitNetworkAccessPolicyVirtualMachine {
  /** Resource ID of the virtual machine that is linked to this policy */
  id: string;
  /** Port configurations for the virtual machine */
  ports: JitNetworkAccessPortRule[];
  /** Public IP address of the Azure Firewall that is linked to this policy, if applicable */
  publicIpAddress?: string;
}

export function jitNetworkAccessPolicyVirtualMachineSerializer(
  item: JitNetworkAccessPolicyVirtualMachine,
): any {
  return {
    id: item["id"],
    ports: jitNetworkAccessPortRuleArraySerializer(item["ports"]),
    publicIpAddress: item["publicIpAddress"],
  };
}

export function jitNetworkAccessPolicyVirtualMachineDeserializer(
  item: any,
): JitNetworkAccessPolicyVirtualMachine {
  return {
    id: item["id"],
    ports: jitNetworkAccessPortRuleArrayDeserializer(item["ports"]),
    publicIpAddress: item["publicIpAddress"],
  };
}

export function jitNetworkAccessPortRuleArraySerializer(
  result: Array<JitNetworkAccessPortRule>,
): any[] {
  return result.map((item) => {
    return jitNetworkAccessPortRuleSerializer(item);
  });
}

export function jitNetworkAccessPortRuleArrayDeserializer(
  result: Array<JitNetworkAccessPortRule>,
): any[] {
  return result.map((item) => {
    return jitNetworkAccessPortRuleDeserializer(item);
  });
}

/** model interface JitNetworkAccessPortRule */
export interface JitNetworkAccessPortRule {
  number: number;
  protocol: Protocol;
  /** Mutually exclusive with the "allowedSourceAddressPrefixes" parameter. Should be an IP address or CIDR, for example "192.168.0.3" or "192.168.0.0/16". */
  allowedSourceAddressPrefix?: string;
  /** Mutually exclusive with the "allowedSourceAddressPrefix" parameter. */
  allowedSourceAddressPrefixes?: string[];
  /** Maximum duration requests can be made for. In ISO 8601 duration format. Minimum 5 minutes, maximum 1 day */
  maxRequestAccessDuration: string;
}

export function jitNetworkAccessPortRuleSerializer(item: JitNetworkAccessPortRule): any {
  return {
    number: item["number"],
    protocol: item["protocol"],
    allowedSourceAddressPrefix: item["allowedSourceAddressPrefix"],
    allowedSourceAddressPrefixes: !item["allowedSourceAddressPrefixes"]
      ? item["allowedSourceAddressPrefixes"]
      : item["allowedSourceAddressPrefixes"].map((p: any) => {
          return p;
        }),
    maxRequestAccessDuration: item["maxRequestAccessDuration"],
  };
}

export function jitNetworkAccessPortRuleDeserializer(item: any): JitNetworkAccessPortRule {
  return {
    number: item["number"],
    protocol: item["protocol"],
    allowedSourceAddressPrefix: item["allowedSourceAddressPrefix"],
    allowedSourceAddressPrefixes: !item["allowedSourceAddressPrefixes"]
      ? item["allowedSourceAddressPrefixes"]
      : item["allowedSourceAddressPrefixes"].map((p: any) => {
          return p;
        }),
    maxRequestAccessDuration: item["maxRequestAccessDuration"],
  };
}

/** Known values of {@link Protocol} that the service accepts. */
export enum KnownProtocol {
  /** TCP */
  TCP = "TCP",
  /** UDP */
  UDP = "UDP",
  /** * */
  All = "*",
}

/** Type of Protocol */
export type Protocol = string;

export function jitNetworkAccessRequestArraySerializer(
  result: Array<JitNetworkAccessRequest>,
): any[] {
  return result.map((item) => {
    return jitNetworkAccessRequestSerializer(item);
  });
}

export function jitNetworkAccessRequestArrayDeserializer(
  result: Array<JitNetworkAccessRequest>,
): any[] {
  return result.map((item) => {
    return jitNetworkAccessRequestDeserializer(item);
  });
}

/** model interface JitNetworkAccessRequest */
export interface JitNetworkAccessRequest {
  virtualMachines: JitNetworkAccessRequestVirtualMachine[];
  /** The start time of the request in UTC */
  startTimeUtc: Date;
  /** The identity of the person who made the request */
  requestor: string;
  /** The justification for making the initiate request */
  justification?: string;
}

export function jitNetworkAccessRequestSerializer(item: JitNetworkAccessRequest): any {
  return {
    virtualMachines: jitNetworkAccessRequestVirtualMachineArraySerializer(item["virtualMachines"]),
    startTimeUtc: item["startTimeUtc"].toISOString(),
    requestor: item["requestor"],
    justification: item["justification"],
  };
}

export function jitNetworkAccessRequestDeserializer(item: any): JitNetworkAccessRequest {
  return {
    virtualMachines: jitNetworkAccessRequestVirtualMachineArrayDeserializer(
      item["virtualMachines"],
    ),
    startTimeUtc: new Date(item["startTimeUtc"]),
    requestor: item["requestor"],
    justification: item["justification"],
  };
}

export function jitNetworkAccessRequestVirtualMachineArraySerializer(
  result: Array<JitNetworkAccessRequestVirtualMachine>,
): any[] {
  return result.map((item) => {
    return jitNetworkAccessRequestVirtualMachineSerializer(item);
  });
}

export function jitNetworkAccessRequestVirtualMachineArrayDeserializer(
  result: Array<JitNetworkAccessRequestVirtualMachine>,
): any[] {
  return result.map((item) => {
    return jitNetworkAccessRequestVirtualMachineDeserializer(item);
  });
}

/** model interface JitNetworkAccessRequestVirtualMachine */
export interface JitNetworkAccessRequestVirtualMachine {
  /** Resource ID of the virtual machine that is linked to this policy */
  id: string;
  /** The ports that were opened for the virtual machine */
  ports: JitNetworkAccessRequestPort[];
}

export function jitNetworkAccessRequestVirtualMachineSerializer(
  item: JitNetworkAccessRequestVirtualMachine,
): any {
  return { id: item["id"], ports: jitNetworkAccessRequestPortArraySerializer(item["ports"]) };
}

export function jitNetworkAccessRequestVirtualMachineDeserializer(
  item: any,
): JitNetworkAccessRequestVirtualMachine {
  return {
    id: item["id"],
    ports: jitNetworkAccessRequestPortArrayDeserializer(item["ports"]),
  };
}

export function jitNetworkAccessRequestPortArraySerializer(
  result: Array<JitNetworkAccessRequestPort>,
): any[] {
  return result.map((item) => {
    return jitNetworkAccessRequestPortSerializer(item);
  });
}

export function jitNetworkAccessRequestPortArrayDeserializer(
  result: Array<JitNetworkAccessRequestPort>,
): any[] {
  return result.map((item) => {
    return jitNetworkAccessRequestPortDeserializer(item);
  });
}

/** model interface JitNetworkAccessRequestPort */
export interface JitNetworkAccessRequestPort {
  number: number;
  /** Mutually exclusive with the "allowedSourceAddressPrefixes" parameter. Should be an IP address or CIDR, for example "192.168.0.3" or "192.168.0.0/16". */
  allowedSourceAddressPrefix?: string;
  /** Mutually exclusive with the "allowedSourceAddressPrefix" parameter. */
  allowedSourceAddressPrefixes?: string[];
  /** The date & time at which the request ends in UTC */
  endTimeUtc: Date;
  /** The status of the port */
  status: Status;
  /** A description of why the `status` has its value */
  statusReason: StatusReason;
  /** The port which is mapped to this port's `number` in the Azure Firewall, if applicable */
  mappedPort?: number;
}

export function jitNetworkAccessRequestPortSerializer(item: JitNetworkAccessRequestPort): any {
  return {
    number: item["number"],
    allowedSourceAddressPrefix: item["allowedSourceAddressPrefix"],
    allowedSourceAddressPrefixes: !item["allowedSourceAddressPrefixes"]
      ? item["allowedSourceAddressPrefixes"]
      : item["allowedSourceAddressPrefixes"].map((p: any) => {
          return p;
        }),
    endTimeUtc: item["endTimeUtc"].toISOString(),
    status: item["status"],
    statusReason: item["statusReason"],
    mappedPort: item["mappedPort"],
  };
}

export function jitNetworkAccessRequestPortDeserializer(item: any): JitNetworkAccessRequestPort {
  return {
    number: item["number"],
    allowedSourceAddressPrefix: item["allowedSourceAddressPrefix"],
    allowedSourceAddressPrefixes: !item["allowedSourceAddressPrefixes"]
      ? item["allowedSourceAddressPrefixes"]
      : item["allowedSourceAddressPrefixes"].map((p: any) => {
          return p;
        }),
    endTimeUtc: new Date(item["endTimeUtc"]),
    status: item["status"],
    statusReason: item["statusReason"],
    mappedPort: item["mappedPort"],
  };
}

/** The status of the port */
export enum KnownStatus {
  /** Revoked */
  Revoked = "Revoked",
  /** Initiated */
  Initiated = "Initiated",
}

/**
 * The status of the port \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Revoked**: Revoked \
 * **Initiated**: Initiated
 */
export type Status = string;

/** A description of why the `status` has its value */
export enum KnownStatusReason {
  /** Expired */
  Expired = "Expired",
  /** UserRequested */
  UserRequested = "UserRequested",
  /** NewerRequestInitiated */
  NewerRequestInitiated = "NewerRequestInitiated",
}

/**
 * A description of why the `status` has its value \
 * {@link KnownStatusReason} can be used interchangeably with StatusReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Expired**: Expired \
 * **UserRequested**: UserRequested \
 * **NewerRequestInitiated**: NewerRequestInitiated
 */
export type StatusReason = string;

/** model interface _JitNetworkAccessPoliciesList */
export interface _JitNetworkAccessPoliciesList {
  value?: JitNetworkAccessPolicy[];
  readonly nextLink?: string;
}

export function _jitNetworkAccessPoliciesListDeserializer(
  item: any,
): _JitNetworkAccessPoliciesList {
  return {
    value: !item["value"] ? item["value"] : jitNetworkAccessPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jitNetworkAccessPolicyArraySerializer(
  result: Array<JitNetworkAccessPolicy>,
): any[] {
  return result.map((item) => {
    return jitNetworkAccessPolicySerializer(item);
  });
}

export function jitNetworkAccessPolicyArrayDeserializer(
  result: Array<JitNetworkAccessPolicy>,
): any[] {
  return result.map((item) => {
    return jitNetworkAccessPolicyDeserializer(item);
  });
}

/** model interface JitNetworkAccessPolicyInitiateRequest */
export interface JitNetworkAccessPolicyInitiateRequest {
  /** A list of virtual machines & ports to open access for */
  virtualMachines: JitNetworkAccessPolicyInitiateVirtualMachine[];
  /** The justification for making the initiate request */
  justification?: string;
}

export function jitNetworkAccessPolicyInitiateRequestSerializer(
  item: JitNetworkAccessPolicyInitiateRequest,
): any {
  return {
    virtualMachines: jitNetworkAccessPolicyInitiateVirtualMachineArraySerializer(
      item["virtualMachines"],
    ),
    justification: item["justification"],
  };
}

export function jitNetworkAccessPolicyInitiateVirtualMachineArraySerializer(
  result: Array<JitNetworkAccessPolicyInitiateVirtualMachine>,
): any[] {
  return result.map((item) => {
    return jitNetworkAccessPolicyInitiateVirtualMachineSerializer(item);
  });
}

/** model interface JitNetworkAccessPolicyInitiateVirtualMachine */
export interface JitNetworkAccessPolicyInitiateVirtualMachine {
  /** Resource ID of the virtual machine that is linked to this policy */
  id: string;
  /** The ports to open for the resource with the `id` */
  ports: JitNetworkAccessPolicyInitiatePort[];
}

export function jitNetworkAccessPolicyInitiateVirtualMachineSerializer(
  item: JitNetworkAccessPolicyInitiateVirtualMachine,
): any {
  return {
    id: item["id"],
    ports: jitNetworkAccessPolicyInitiatePortArraySerializer(item["ports"]),
  };
}

export function jitNetworkAccessPolicyInitiatePortArraySerializer(
  result: Array<JitNetworkAccessPolicyInitiatePort>,
): any[] {
  return result.map((item) => {
    return jitNetworkAccessPolicyInitiatePortSerializer(item);
  });
}

/** model interface JitNetworkAccessPolicyInitiatePort */
export interface JitNetworkAccessPolicyInitiatePort {
  number: number;
  /** Source of the allowed traffic. If omitted, the request will be for the source IP address of the initiate request. */
  allowedSourceAddressPrefix?: string;
  /** The time to close the request in UTC */
  endTimeUtc: Date;
}

export function jitNetworkAccessPolicyInitiatePortSerializer(
  item: JitNetworkAccessPolicyInitiatePort,
): any {
  return {
    number: item["number"],
    allowedSourceAddressPrefix: item["allowedSourceAddressPrefix"],
    endTimeUtc: item["endTimeUtc"].toISOString(),
  };
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface SecuritySolution extends ProxyResource {
  /** Location where the resource is stored */
  readonly location: string;
  /** The security family of the security solution */
  securityFamily?: SecurityFamily;
  /** The security family provisioning State */
  provisioningState?: ProvisioningState;
  /** The security solutions' template */
  template?: string;
  /** The security solutions' status */
  protectionStatus?: string;
}

export function securitySolutionDeserializer(item: any): SecuritySolution {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _securitySolutionPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** model interface SecuritySolutionProperties */
export interface SecuritySolutionProperties {
  /** The security family of the security solution */
  securityFamily: SecurityFamily;
  /** The security family provisioning State */
  provisioningState: ProvisioningState;
  /** The security solutions' template */
  template: string;
  /** The security solutions' status */
  protectionStatus: string;
}

export function securitySolutionPropertiesDeserializer(item: any): SecuritySolutionProperties {
  return {
    securityFamily: item["securityFamily"],
    provisioningState: item["provisioningState"],
    template: item["template"],
    protectionStatus: item["protectionStatus"],
  };
}

/** model interface _SecuritySolutionList */
export interface _SecuritySolutionList {
  value?: SecuritySolution[];
  readonly nextLink?: string;
}

export function _securitySolutionListDeserializer(item: any): _SecuritySolutionList {
  return {
    value: !item["value"] ? item["value"] : securitySolutionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securitySolutionArrayDeserializer(result: Array<SecuritySolution>): any[] {
  return result.map((item) => {
    return securitySolutionDeserializer(item);
  });
}

/** The resource whose properties describes the allowed traffic between Azure resources */
export interface AllowedConnectionsResource extends ProxyResource {
  /** Location where the resource is stored */
  readonly location: string;
  /** The UTC time on which the allowed connections resource was calculated */
  readonly calculatedDateTime?: Date;
  /** List of connectable resources */
  readonly connectableResources?: ConnectableResource[];
}

export function allowedConnectionsResourceDeserializer(item: any): AllowedConnectionsResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _allowedConnectionsResourcePropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** Describes the allowed traffic between Azure resources */
export interface AllowedConnectionsResourceProperties {
  /** The UTC time on which the allowed connections resource was calculated */
  readonly calculatedDateTime?: Date;
  /** List of connectable resources */
  readonly connectableResources?: ConnectableResource[];
}

export function allowedConnectionsResourcePropertiesDeserializer(
  item: any,
): AllowedConnectionsResourceProperties {
  return {
    calculatedDateTime: !item["calculatedDateTime"]
      ? item["calculatedDateTime"]
      : new Date(item["calculatedDateTime"]),
    connectableResources: !item["connectableResources"]
      ? item["connectableResources"]
      : connectableResourceArrayDeserializer(item["connectableResources"]),
  };
}

export function connectableResourceArrayDeserializer(result: Array<ConnectableResource>): any[] {
  return result.map((item) => {
    return connectableResourceDeserializer(item);
  });
}

/** Describes the allowed inbound and outbound traffic of an Azure resource */
export interface ConnectableResource {
  /** The Azure resource id */
  readonly id?: string;
  /** The list of Azure resources that the resource has inbound allowed connection from */
  readonly inboundConnectedResources?: ConnectedResource[];
  /** The list of Azure resources that the resource has outbound allowed connection to */
  readonly outboundConnectedResources?: ConnectedResource[];
}

export function connectableResourceDeserializer(item: any): ConnectableResource {
  return {
    id: item["id"],
    inboundConnectedResources: !item["inboundConnectedResources"]
      ? item["inboundConnectedResources"]
      : connectedResourceArrayDeserializer(item["inboundConnectedResources"]),
    outboundConnectedResources: !item["outboundConnectedResources"]
      ? item["outboundConnectedResources"]
      : connectedResourceArrayDeserializer(item["outboundConnectedResources"]),
  };
}

export function connectedResourceArrayDeserializer(result: Array<ConnectedResource>): any[] {
  return result.map((item) => {
    return connectedResourceDeserializer(item);
  });
}

/** Describes properties of a connected resource */
export interface ConnectedResource {
  /** The Azure resource id of the connected resource */
  readonly connectedResourceId?: string;
  /** The allowed tcp ports */
  readonly tcpPorts?: string;
  /** The allowed udp ports */
  readonly udpPorts?: string;
}

export function connectedResourceDeserializer(item: any): ConnectedResource {
  return {
    connectedResourceId: item["connectedResourceId"],
    tcpPorts: item["tcpPorts"],
    udpPorts: item["udpPorts"],
  };
}

/** Known values of {@link ConnectionType} that the service accepts. */
export enum KnownConnectionType {
  /** Internal */
  Internal = "Internal",
  /** External */
  External = "External",
}

/** Type of ConnectionType */
export type ConnectionType = string;

/** List of all possible traffic between Azure resources */
export interface _AllowedConnectionsList {
  readonly value?: AllowedConnectionsResource[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _allowedConnectionsListDeserializer(item: any): _AllowedConnectionsList {
  return {
    value: !item["value"]
      ? item["value"]
      : allowedConnectionsResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function allowedConnectionsResourceArrayDeserializer(
  result: Array<AllowedConnectionsResource>,
): any[] {
  return result.map((item) => {
    return allowedConnectionsResourceDeserializer(item);
  });
}

/** Describes the server vulnerability assessment details on a resource */
export interface ServerVulnerabilityAssessment extends ProxyResource {
  /** The provisioningState of the vulnerability assessment capability on the VM */
  readonly provisioningState?: ServerVulnerabilityAssessmentPropertiesProvisioningState;
}

export function serverVulnerabilityAssessmentDeserializer(
  item: any,
): ServerVulnerabilityAssessment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverVulnerabilityAssessmentPropertiesDeserializer(item["properties"])),
  };
}

/** describes ServerVulnerabilityAssessment properties. */
export interface ServerVulnerabilityAssessmentProperties {
  /** The provisioningState of the vulnerability assessment capability on the VM */
  readonly provisioningState?: ServerVulnerabilityAssessmentPropertiesProvisioningState;
}

export function serverVulnerabilityAssessmentPropertiesDeserializer(
  item: any,
): ServerVulnerabilityAssessmentProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** The provisioningState of the vulnerability assessment capability on the VM */
export enum KnownServerVulnerabilityAssessmentPropertiesProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Deprovisioning */
  Deprovisioning = "Deprovisioning",
}

/**
 * The provisioningState of the vulnerability assessment capability on the VM \
 * {@link KnownServerVulnerabilityAssessmentPropertiesProvisioningState} can be used interchangeably with ServerVulnerabilityAssessmentPropertiesProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Provisioning**: Provisioning \
 * **Deprovisioning**: Deprovisioning
 */
export type ServerVulnerabilityAssessmentPropertiesProvisioningState = string;

/** List of server vulnerability assessments */
export interface _ServerVulnerabilityAssessmentsList {
  value?: ServerVulnerabilityAssessment[];
}

export function _serverVulnerabilityAssessmentsListDeserializer(
  item: any,
): _ServerVulnerabilityAssessmentsList {
  return {
    value: !item["value"]
      ? item["value"]
      : serverVulnerabilityAssessmentArrayDeserializer(item["value"]),
  };
}

export function serverVulnerabilityAssessmentArrayDeserializer(
  result: Array<ServerVulnerabilityAssessment>,
): any[] {
  return result.map((item) => {
    return serverVulnerabilityAssessmentDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface TopologyResource extends ProxyResource {
  /** Location where the resource is stored */
  readonly location: string;
  /** The UTC time on which the topology was calculated */
  readonly calculatedDateTime?: Date;
  /** Azure resources which are part of this topology resource */
  readonly topologyResources?: TopologySingleResource[];
}

export function topologyResourceDeserializer(item: any): TopologyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _topologyResourcePropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** model interface TopologyResourceProperties */
export interface TopologyResourceProperties {
  /** The UTC time on which the topology was calculated */
  readonly calculatedDateTime?: Date;
  /** Azure resources which are part of this topology resource */
  readonly topologyResources?: TopologySingleResource[];
}

export function topologyResourcePropertiesDeserializer(item: any): TopologyResourceProperties {
  return {
    calculatedDateTime: !item["calculatedDateTime"]
      ? item["calculatedDateTime"]
      : new Date(item["calculatedDateTime"]),
    topologyResources: !item["topologyResources"]
      ? item["topologyResources"]
      : topologySingleResourceArrayDeserializer(item["topologyResources"]),
  };
}

export function topologySingleResourceArrayDeserializer(
  result: Array<TopologySingleResource>,
): any[] {
  return result.map((item) => {
    return topologySingleResourceDeserializer(item);
  });
}

/** model interface TopologySingleResource */
export interface TopologySingleResource {
  /** Azure resource id */
  readonly resourceId?: string;
  /** The security severity of the resource */
  readonly severity?: string;
  /** Indicates if the resource has security recommendations */
  readonly recommendationsExist?: boolean;
  /** Indicates the resource connectivity level to the Internet (InternetFacing, Internal ,etc.) */
  readonly networkZones?: string;
  /** Score of the resource based on its security severity */
  readonly topologyScore?: number;
  /** The location of this resource */
  readonly location?: string;
  /** Azure resources connected to this resource which are in higher level in the topology view */
  readonly parents?: TopologySingleResourceParent[];
  /** Azure resources connected to this resource which are in lower level in the topology view */
  readonly children?: TopologySingleResourceChild[];
}

export function topologySingleResourceDeserializer(item: any): TopologySingleResource {
  return {
    resourceId: item["resourceId"],
    severity: item["severity"],
    recommendationsExist: item["recommendationsExist"],
    networkZones: item["networkZones"],
    topologyScore: item["topologyScore"],
    location: item["location"],
    parents: !item["parents"]
      ? item["parents"]
      : topologySingleResourceParentArrayDeserializer(item["parents"]),
    children: !item["children"]
      ? item["children"]
      : topologySingleResourceChildArrayDeserializer(item["children"]),
  };
}

export function topologySingleResourceParentArrayDeserializer(
  result: Array<TopologySingleResourceParent>,
): any[] {
  return result.map((item) => {
    return topologySingleResourceParentDeserializer(item);
  });
}

/** model interface TopologySingleResourceParent */
export interface TopologySingleResourceParent {
  /** Azure resource id which serves as parent resource in topology view */
  readonly resourceId?: string;
}

export function topologySingleResourceParentDeserializer(item: any): TopologySingleResourceParent {
  return {
    resourceId: item["resourceId"],
  };
}

export function topologySingleResourceChildArrayDeserializer(
  result: Array<TopologySingleResourceChild>,
): any[] {
  return result.map((item) => {
    return topologySingleResourceChildDeserializer(item);
  });
}

/** model interface TopologySingleResourceChild */
export interface TopologySingleResourceChild {
  /** Azure resource id which serves as child resource in topology view */
  readonly resourceId?: string;
}

export function topologySingleResourceChildDeserializer(item: any): TopologySingleResourceChild {
  return {
    resourceId: item["resourceId"],
  };
}

/** model interface _TopologyList */
export interface _TopologyList {
  readonly value?: TopologyResource[];
  readonly nextLink?: string;
}

export function _topologyListDeserializer(item: any): _TopologyList {
  return {
    value: !item["value"] ? item["value"] : topologyResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function topologyResourceArrayDeserializer(result: Array<TopologyResource>): any[] {
  return result.map((item) => {
    return topologyResourceDeserializer(item);
  });
}

/** model interface SecuritySolutionsReferenceDataList */
export interface SecuritySolutionsReferenceDataList {
  value?: SecuritySolutionsReferenceData[];
}

export function securitySolutionsReferenceDataListDeserializer(
  item: any,
): SecuritySolutionsReferenceDataList {
  return {
    value: !item["value"]
      ? item["value"]
      : securitySolutionsReferenceDataArrayDeserializer(item["value"]),
  };
}

export function securitySolutionsReferenceDataArrayDeserializer(
  result: Array<SecuritySolutionsReferenceData>,
): any[] {
  return result.map((item) => {
    return securitySolutionsReferenceDataDeserializer(item);
  });
}

/** model interface SecuritySolutionsReferenceData */
export interface SecuritySolutionsReferenceData {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
  /** Location where the resource is stored */
  readonly location?: string;
  /** The security family of the security solution */
  securityFamily: SecurityFamily;
  /** The security solutions' vendor name */
  alertVendorName: string;
  /** The security solutions' package info url */
  packageInfoUrl: string;
  /** The security solutions' product name */
  productName: string;
  /** The security solutions' publisher */
  publisher: string;
  /** The security solutions' publisher display name */
  publisherDisplayName: string;
  /** The security solutions' template */
  template: string;
}

export function securitySolutionsReferenceDataDeserializer(
  item: any,
): SecuritySolutionsReferenceData {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    location: item["location"],
    ..._securitySolutionsReferenceDataPropertiesDeserializer(item["properties"]),
  };
}

/** model interface SecuritySolutionsReferenceDataProperties */
export interface SecuritySolutionsReferenceDataProperties {
  /** The security family of the security solution */
  securityFamily: SecurityFamily;
  /** The security solutions' vendor name */
  alertVendorName: string;
  /** The security solutions' package info url */
  packageInfoUrl: string;
  /** The security solutions' product name */
  productName: string;
  /** The security solutions' publisher */
  publisher: string;
  /** The security solutions' publisher display name */
  publisherDisplayName: string;
  /** The security solutions' template */
  template: string;
}

export function securitySolutionsReferenceDataPropertiesDeserializer(
  item: any,
): SecuritySolutionsReferenceDataProperties {
  return {
    securityFamily: item["securityFamily"],
    alertVendorName: item["alertVendorName"],
    packageInfoUrl: item["packageInfoUrl"],
    productName: item["productName"],
    publisher: item["publisher"],
    publisherDisplayName: item["publisherDisplayName"],
    template: item["template"],
  };
}

export function _discoveredSecuritySolutionPropertiesDeserializer(item: any) {
  return {
    securityFamily: item["securityFamily"],
    offer: item["offer"],
    publisher: item["publisher"],
    sku: item["sku"],
  };
}

export function _jitNetworkAccessPolicyPropertiesSerializer(item: JitNetworkAccessPolicy): any {
  return {
    virtualMachines: jitNetworkAccessPolicyVirtualMachineArraySerializer(item["virtualMachines"]),
    requests: !item["requests"]
      ? item["requests"]
      : jitNetworkAccessRequestArraySerializer(item["requests"]),
  };
}

export function _jitNetworkAccessPolicyPropertiesDeserializer(item: any) {
  return {
    virtualMachines: jitNetworkAccessPolicyVirtualMachineArrayDeserializer(item["virtualMachines"]),
    requests: !item["requests"]
      ? item["requests"]
      : jitNetworkAccessRequestArrayDeserializer(item["requests"]),
    provisioningState: item["provisioningState"],
  };
}

export function _securitySolutionPropertiesDeserializer(item: any) {
  return {
    securityFamily: item["securityFamily"],
    provisioningState: item["provisioningState"],
    template: item["template"],
    protectionStatus: item["protectionStatus"],
  };
}

export function _allowedConnectionsResourcePropertiesDeserializer(item: any) {
  return {
    calculatedDateTime: !item["calculatedDateTime"]
      ? item["calculatedDateTime"]
      : new Date(item["calculatedDateTime"]),
    connectableResources: !item["connectableResources"]
      ? item["connectableResources"]
      : connectableResourceArrayDeserializer(item["connectableResources"]),
  };
}

export function _serverVulnerabilityAssessmentPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
  };
}

export function _topologyResourcePropertiesDeserializer(item: any) {
  return {
    calculatedDateTime: !item["calculatedDateTime"]
      ? item["calculatedDateTime"]
      : new Date(item["calculatedDateTime"]),
    topologyResources: !item["topologyResources"]
      ? item["topologyResources"]
      : topologySingleResourceArrayDeserializer(item["topologyResources"]),
  };
}

export function _securitySolutionsReferenceDataPropertiesDeserializer(item: any) {
  return {
    securityFamily: item["securityFamily"],
    alertVendorName: item["alertVendorName"],
    packageInfoUrl: item["packageInfoUrl"],
    productName: item["productName"],
    publisher: item["publisher"],
    publisherDisplayName: item["publisherDisplayName"],
    template: item["template"],
  };
}
