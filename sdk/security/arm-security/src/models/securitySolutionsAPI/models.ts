// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../../static-helpers/serialization/serialize-record.js";
import type { CommonProvisioningState } from "../common/models.js";
import type { ProxyResource, SystemData } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface SecuritySolutionsAPIDiscoveredSecuritySolution extends ProxyResource {
  /** Location where the resource is stored */
  readonly location: string;
  /** The security family of the discovered solution */
  securityFamily: SecuritySolutionsAPISecurityFamily;
  /** The security solutions' image offer */
  offer: string;
  /** The security solutions' image publisher */
  publisher: string;
  /** The security solutions' image sku */
  sku: string;
}

export function securitySolutionsAPIDiscoveredSecuritySolutionDeserializer(
  item: any,
): SecuritySolutionsAPIDiscoveredSecuritySolution {
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

/** model interface SecuritySolutionsAPIDiscoveredSecuritySolutionProperties */
export interface SecuritySolutionsAPIDiscoveredSecuritySolutionProperties {
  /** The security family of the discovered solution */
  securityFamily: SecuritySolutionsAPISecurityFamily;
  /** The security solutions' image offer */
  offer: string;
  /** The security solutions' image publisher */
  publisher: string;
  /** The security solutions' image sku */
  sku: string;
}

export function securitySolutionsAPIDiscoveredSecuritySolutionPropertiesDeserializer(
  item: any,
): SecuritySolutionsAPIDiscoveredSecuritySolutionProperties {
  return {
    securityFamily: item["securityFamily"],
    offer: item["offer"],
    publisher: item["publisher"],
    sku: item["sku"],
  };
}

/** The security family of the discovered solution */
export enum KnownSecuritySolutionsAPISecurityFamily {
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
 * {@link KnownSecuritySolutionsAPISecurityFamily} can be used interchangeably with SecuritySolutionsAPISecurityFamily,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Waf**: Waf \
 * **Ngfw**: Ngfw \
 * **SaasWaf**: SaasWaf \
 * **Va**: Va
 */
export type SecuritySolutionsAPISecurityFamily = string;

/** model interface _SecuritySolutionsAPIDiscoveredSecuritySolutionList */
export interface _SecuritySolutionsAPIDiscoveredSecuritySolutionList {
  value?: SecuritySolutionsAPIDiscoveredSecuritySolution[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _securitySolutionsAPIDiscoveredSecuritySolutionListDeserializer(
  item: any,
): _SecuritySolutionsAPIDiscoveredSecuritySolutionList {
  return {
    value: !item["value"]
      ? item["value"]
      : securitySolutionsAPIDiscoveredSecuritySolutionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securitySolutionsAPIDiscoveredSecuritySolutionArrayDeserializer(
  result: Array<SecuritySolutionsAPIDiscoveredSecuritySolution>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIDiscoveredSecuritySolutionDeserializer(item);
  });
}

/** Represents a security solution external to Microsoft Defender for Cloud which sends information to an OMS workspace and whose data is displayed by Microsoft Defender for Cloud. */
export interface SecuritySolutionsAPIExternalSecuritySolution extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: Record<string, any>;
  /** The kind of the external solution */
  /** The discriminator possible values: CEF, ATA, AAD */
  kind?: SecuritySolutionsAPIExternalSecuritySolutionKind;
  /** Location where the resource is stored */
  readonly location: string;
}

export function securitySolutionsAPIExternalSecuritySolutionDeserializer(
  item: any,
): SecuritySolutionsAPIExternalSecuritySolution {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : _securitySolutionsAPIExternalSecuritySolutionProperties1Deserializer(item["properties"]),
    kind: item["kind"],
    location: item["location"],
  };
}

/** Alias for SecuritySolutionsAPIExternalSecuritySolutionUnion */
export type SecuritySolutionsAPIExternalSecuritySolutionUnion =
  | SecuritySolutionsAPICefExternalSecuritySolution
  | SecuritySolutionsAPIAtaExternalSecuritySolution
  | SecuritySolutionsAPIAadExternalSecuritySolution
  | SecuritySolutionsAPIExternalSecuritySolution;

export function securitySolutionsAPIExternalSecuritySolutionUnionDeserializer(
  item: any,
): SecuritySolutionsAPIExternalSecuritySolutionUnion {
  switch (item["kind"]) {
    case "CEF":
      return securitySolutionsAPICefExternalSecuritySolutionDeserializer(
        item as SecuritySolutionsAPICefExternalSecuritySolution,
      );

    case "ATA":
      return securitySolutionsAPIAtaExternalSecuritySolutionDeserializer(
        item as SecuritySolutionsAPIAtaExternalSecuritySolution,
      );

    case "AAD":
      return securitySolutionsAPIAadExternalSecuritySolutionDeserializer(
        item as SecuritySolutionsAPIAadExternalSecuritySolution,
      );

    default:
      return securitySolutionsAPIExternalSecuritySolutionDeserializer(item);
  }
}

/** model interface _SecuritySolutionsAPIExternalSecuritySolutionProperties1 */
export interface _SecuritySolutionsAPIExternalSecuritySolutionProperties1 {}

export function _securitySolutionsAPIExternalSecuritySolutionProperties1Deserializer(
  item: any,
): _SecuritySolutionsAPIExternalSecuritySolutionProperties1 {
  return item;
}

/** The kind of the external solution */
export enum KnownSecuritySolutionsAPIExternalSecuritySolutionKind {
  /** CEF */
  CEF = "CEF",
  /** ATA */
  ATA = "ATA",
  /** AAD */
  AAD = "AAD",
}

/**
 * The kind of the external solution \
 * {@link KnownSecuritySolutionsAPIExternalSecuritySolutionKind} can be used interchangeably with SecuritySolutionsAPIExternalSecuritySolutionKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CEF**: CEF \
 * **ATA**: ATA \
 * **AAD**: AAD
 */
export type SecuritySolutionsAPIExternalSecuritySolutionKind = string;

/** Represents a security solution which sends CEF logs to an OMS workspace */
export interface SecuritySolutionsAPICefExternalSecuritySolution extends SecuritySolutionsAPIExternalSecuritySolution {
  /** The external security solution properties for CEF solutions */
  properties?: SecuritySolutionsAPICefSolutionProperties;
  kind: "CEF";
}

export function securitySolutionsAPICefExternalSecuritySolutionDeserializer(
  item: any,
): SecuritySolutionsAPICefExternalSecuritySolution {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : securitySolutionsAPICefSolutionPropertiesDeserializer(item["properties"]),
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
export interface SecuritySolutionsAPICefSolutionProperties extends SecuritySolutionsAPIExternalSecuritySolutionProperties {
  hostname?: string;
  agent?: string;
  lastEventReceived?: string;
}

export function securitySolutionsAPICefSolutionPropertiesDeserializer(
  item: any,
): SecuritySolutionsAPICefSolutionProperties {
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
      : securitySolutionsAPIConnectedWorkspaceDeserializer(item["workspace"]),
    hostname: item["hostname"],
    agent: item["agent"],
    lastEventReceived: item["lastEventReceived"],
  };
}

/** Represents an ATA security solution which sends logs to an OMS workspace */
export interface SecuritySolutionsAPIAtaExternalSecuritySolution extends SecuritySolutionsAPIExternalSecuritySolution {
  /** The external security solution properties for ATA solutions */
  properties?: SecuritySolutionsAPIAtaSolutionProperties;
  kind: "ATA";
}

export function securitySolutionsAPIAtaExternalSecuritySolutionDeserializer(
  item: any,
): SecuritySolutionsAPIAtaExternalSecuritySolution {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : securitySolutionsAPIAtaSolutionPropertiesDeserializer(item["properties"]),
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
export interface SecuritySolutionsAPIAtaSolutionProperties extends SecuritySolutionsAPIExternalSecuritySolutionProperties {
  lastEventReceived?: string;
}

export function securitySolutionsAPIAtaSolutionPropertiesDeserializer(
  item: any,
): SecuritySolutionsAPIAtaSolutionProperties {
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
      : securitySolutionsAPIConnectedWorkspaceDeserializer(item["workspace"]),
    lastEventReceived: item["lastEventReceived"],
  };
}

/** Represents an AAD identity protection solution which sends logs to an OMS workspace. */
export interface SecuritySolutionsAPIAadExternalSecuritySolution extends SecuritySolutionsAPIExternalSecuritySolution {
  /** The external security solution properties for AAD solutions */
  properties?: SecuritySolutionsAPIAadSolutionProperties;
  kind: "AAD";
}

export function securitySolutionsAPIAadExternalSecuritySolutionDeserializer(
  item: any,
): SecuritySolutionsAPIAadExternalSecuritySolution {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : securitySolutionsAPIAadSolutionPropertiesDeserializer(item["properties"]),
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
export interface SecuritySolutionsAPIAadSolutionProperties {
  deviceVendor?: string;
  deviceType?: string;
  /** Represents an OMS workspace to which the solution is connected */
  workspace?: SecuritySolutionsAPIConnectedWorkspace;
  /** The connectivity state of the external AAD solution */
  connectivityState?: SecuritySolutionsAPIAadConnectivityState;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function securitySolutionsAPIAadSolutionPropertiesDeserializer(
  item: any,
): SecuritySolutionsAPIAadSolutionProperties {
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
      : securitySolutionsAPIConnectedWorkspaceDeserializer(item["workspace"]),
    connectivityState: item["connectivityState"],
  };
}

/** Represents an OMS workspace to which the solution is connected */
export interface SecuritySolutionsAPIConnectedWorkspace {
  /** Azure resource ID of the connected OMS workspace */
  id?: string;
}

export function securitySolutionsAPIConnectedWorkspaceDeserializer(
  item: any,
): SecuritySolutionsAPIConnectedWorkspace {
  return {
    id: item["id"],
  };
}

/** The connectivity state of the external AAD solution */
export enum KnownSecuritySolutionsAPIAadConnectivityState {
  /** Discovered */
  Discovered = "Discovered",
  /** NotLicensed */
  NotLicensed = "NotLicensed",
  /** Connected */
  Connected = "Connected",
}

/**
 * The connectivity state of the external AAD solution \
 * {@link KnownSecuritySolutionsAPIAadConnectivityState} can be used interchangeably with SecuritySolutionsAPIAadConnectivityState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Discovered**: Discovered \
 * **NotLicensed**: NotLicensed \
 * **Connected**: Connected
 */
export type SecuritySolutionsAPIAadConnectivityState = string;

/** The solution properties (correspond to the solution kind) */
export interface SecuritySolutionsAPIExternalSecuritySolutionProperties {
  deviceVendor?: string;
  deviceType?: string;
  /** Represents an OMS workspace to which the solution is connected */
  workspace?: SecuritySolutionsAPIConnectedWorkspace;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function securitySolutionsAPIExternalSecuritySolutionPropertiesDeserializer(
  item: any,
): SecuritySolutionsAPIExternalSecuritySolutionProperties {
  return {
    additionalProperties: serializeRecord(item, ["deviceVendor", "deviceType", "workspace"]),
    deviceVendor: item["deviceVendor"],
    deviceType: item["deviceType"],
    workspace: !item["workspace"]
      ? item["workspace"]
      : securitySolutionsAPIConnectedWorkspaceDeserializer(item["workspace"]),
  };
}

/** model interface _SecuritySolutionsAPIExternalSecuritySolutionList */
export interface _SecuritySolutionsAPIExternalSecuritySolutionList {
  value?: SecuritySolutionsAPIExternalSecuritySolutionUnion[];
  readonly nextLink?: string;
}

export function _securitySolutionsAPIExternalSecuritySolutionListDeserializer(
  item: any,
): _SecuritySolutionsAPIExternalSecuritySolutionList {
  return {
    value: !item["value"]
      ? item["value"]
      : securitySolutionsAPIExternalSecuritySolutionUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securitySolutionsAPIExternalSecuritySolutionUnionArrayDeserializer(
  result: Array<SecuritySolutionsAPIExternalSecuritySolutionUnion>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIExternalSecuritySolutionUnionDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface SecuritySolutionsAPIJitNetworkAccessPolicy extends ProxyResource {
  /** Kind of the resource */
  kind?: string;
  /** Location where the resource is stored */
  readonly location: string;
  /** Configurations for Microsoft.Compute/virtualMachines resource type. */
  virtualMachines: SecuritySolutionsAPIJitNetworkAccessPolicyVirtualMachine[];
  requests?: SecuritySolutionsAPIJitNetworkAccessRequest[];
  /** Gets the provisioning state of the Just-in-Time policy. */
  readonly provisioningState?: string;
}

export function securitySolutionsAPIJitNetworkAccessPolicySerializer(
  item: SecuritySolutionsAPIJitNetworkAccessPolicy,
): any {
  return { properties: _jitNetworkAccessPolicyPropertiesSerializer(item), kind: item["kind"] };
}

export function securitySolutionsAPIJitNetworkAccessPolicyDeserializer(
  item: any,
): SecuritySolutionsAPIJitNetworkAccessPolicy {
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

/** model interface SecuritySolutionsAPIJitNetworkAccessPolicyProperties */
export interface SecuritySolutionsAPIJitNetworkAccessPolicyProperties {
  /** Configurations for Microsoft.Compute/virtualMachines resource type. */
  virtualMachines: SecuritySolutionsAPIJitNetworkAccessPolicyVirtualMachine[];
  requests?: SecuritySolutionsAPIJitNetworkAccessRequest[];
  /** Gets the provisioning state of the Just-in-Time policy. */
  readonly provisioningState?: string;
}

export function securitySolutionsAPIJitNetworkAccessPolicyPropertiesSerializer(
  item: SecuritySolutionsAPIJitNetworkAccessPolicyProperties,
): any {
  return {
    virtualMachines: securitySolutionsAPIJitNetworkAccessPolicyVirtualMachineArraySerializer(
      item["virtualMachines"],
    ),
    requests: !item["requests"]
      ? item["requests"]
      : securitySolutionsAPIJitNetworkAccessRequestArraySerializer(item["requests"]),
  };
}

export function securitySolutionsAPIJitNetworkAccessPolicyPropertiesDeserializer(
  item: any,
): SecuritySolutionsAPIJitNetworkAccessPolicyProperties {
  return {
    virtualMachines: securitySolutionsAPIJitNetworkAccessPolicyVirtualMachineArrayDeserializer(
      item["virtualMachines"],
    ),
    requests: !item["requests"]
      ? item["requests"]
      : securitySolutionsAPIJitNetworkAccessRequestArrayDeserializer(item["requests"]),
    provisioningState: item["provisioningState"],
  };
}

export function securitySolutionsAPIJitNetworkAccessPolicyVirtualMachineArraySerializer(
  result: Array<SecuritySolutionsAPIJitNetworkAccessPolicyVirtualMachine>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIJitNetworkAccessPolicyVirtualMachineSerializer(item);
  });
}

export function securitySolutionsAPIJitNetworkAccessPolicyVirtualMachineArrayDeserializer(
  result: Array<SecuritySolutionsAPIJitNetworkAccessPolicyVirtualMachine>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIJitNetworkAccessPolicyVirtualMachineDeserializer(item);
  });
}

/** model interface SecuritySolutionsAPIJitNetworkAccessPolicyVirtualMachine */
export interface SecuritySolutionsAPIJitNetworkAccessPolicyVirtualMachine {
  /** Resource ID of the virtual machine that is linked to this policy */
  id: string;
  /** Port configurations for the virtual machine */
  ports: SecuritySolutionsAPIJitNetworkAccessPortRule[];
  /** Public IP address of the Azure Firewall that is linked to this policy, if applicable */
  publicIpAddress?: string;
}

export function securitySolutionsAPIJitNetworkAccessPolicyVirtualMachineSerializer(
  item: SecuritySolutionsAPIJitNetworkAccessPolicyVirtualMachine,
): any {
  return {
    id: item["id"],
    ports: securitySolutionsAPIJitNetworkAccessPortRuleArraySerializer(item["ports"]),
    publicIpAddress: item["publicIpAddress"],
  };
}

export function securitySolutionsAPIJitNetworkAccessPolicyVirtualMachineDeserializer(
  item: any,
): SecuritySolutionsAPIJitNetworkAccessPolicyVirtualMachine {
  return {
    id: item["id"],
    ports: securitySolutionsAPIJitNetworkAccessPortRuleArrayDeserializer(item["ports"]),
    publicIpAddress: item["publicIpAddress"],
  };
}

export function securitySolutionsAPIJitNetworkAccessPortRuleArraySerializer(
  result: Array<SecuritySolutionsAPIJitNetworkAccessPortRule>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIJitNetworkAccessPortRuleSerializer(item);
  });
}

export function securitySolutionsAPIJitNetworkAccessPortRuleArrayDeserializer(
  result: Array<SecuritySolutionsAPIJitNetworkAccessPortRule>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIJitNetworkAccessPortRuleDeserializer(item);
  });
}

/** model interface SecuritySolutionsAPIJitNetworkAccessPortRule */
export interface SecuritySolutionsAPIJitNetworkAccessPortRule {
  number: number;
  protocol: SecuritySolutionsAPIProtocol;
  /** Mutually exclusive with the "allowedSourceAddressPrefixes" parameter. Should be an IP address or CIDR, for example "192.168.0.3" or "192.168.0.0/16". */
  allowedSourceAddressPrefix?: string;
  /** Mutually exclusive with the "allowedSourceAddressPrefix" parameter. */
  allowedSourceAddressPrefixes?: string[];
  /** Maximum duration requests can be made for. In ISO 8601 duration format. Minimum 5 minutes, maximum 1 day */
  maxRequestAccessDuration: string;
}

export function securitySolutionsAPIJitNetworkAccessPortRuleSerializer(
  item: SecuritySolutionsAPIJitNetworkAccessPortRule,
): any {
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

export function securitySolutionsAPIJitNetworkAccessPortRuleDeserializer(
  item: any,
): SecuritySolutionsAPIJitNetworkAccessPortRule {
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
export enum KnownSecuritySolutionsAPIProtocol {
  /** TCP */
  TCP = "TCP",
  /** UDP */
  UDP = "UDP",
  /** * */
  All = "*",
}

/** Type of SecuritySolutionsAPIProtocol */
export type SecuritySolutionsAPIProtocol = string;

export function securitySolutionsAPIJitNetworkAccessRequestArraySerializer(
  result: Array<SecuritySolutionsAPIJitNetworkAccessRequest>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIJitNetworkAccessRequestSerializer(item);
  });
}

export function securitySolutionsAPIJitNetworkAccessRequestArrayDeserializer(
  result: Array<SecuritySolutionsAPIJitNetworkAccessRequest>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIJitNetworkAccessRequestDeserializer(item);
  });
}

/** model interface SecuritySolutionsAPIJitNetworkAccessRequest */
export interface SecuritySolutionsAPIJitNetworkAccessRequest {
  virtualMachines: SecuritySolutionsAPIJitNetworkAccessRequestVirtualMachine[];
  /** The start time of the request in UTC */
  startTimeUtc: Date;
  /** The identity of the person who made the request */
  requestor: string;
  /** The justification for making the initiate request */
  justification?: string;
}

export function securitySolutionsAPIJitNetworkAccessRequestSerializer(
  item: SecuritySolutionsAPIJitNetworkAccessRequest,
): any {
  return {
    virtualMachines: securitySolutionsAPIJitNetworkAccessRequestVirtualMachineArraySerializer(
      item["virtualMachines"],
    ),
    startTimeUtc: item["startTimeUtc"].toISOString(),
    requestor: item["requestor"],
    justification: item["justification"],
  };
}

export function securitySolutionsAPIJitNetworkAccessRequestDeserializer(
  item: any,
): SecuritySolutionsAPIJitNetworkAccessRequest {
  return {
    virtualMachines: securitySolutionsAPIJitNetworkAccessRequestVirtualMachineArrayDeserializer(
      item["virtualMachines"],
    ),
    startTimeUtc: new Date(item["startTimeUtc"]),
    requestor: item["requestor"],
    justification: item["justification"],
  };
}

export function securitySolutionsAPIJitNetworkAccessRequestVirtualMachineArraySerializer(
  result: Array<SecuritySolutionsAPIJitNetworkAccessRequestVirtualMachine>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIJitNetworkAccessRequestVirtualMachineSerializer(item);
  });
}

export function securitySolutionsAPIJitNetworkAccessRequestVirtualMachineArrayDeserializer(
  result: Array<SecuritySolutionsAPIJitNetworkAccessRequestVirtualMachine>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIJitNetworkAccessRequestVirtualMachineDeserializer(item);
  });
}

/** model interface SecuritySolutionsAPIJitNetworkAccessRequestVirtualMachine */
export interface SecuritySolutionsAPIJitNetworkAccessRequestVirtualMachine {
  /** Resource ID of the virtual machine that is linked to this policy */
  id: string;
  /** The ports that were opened for the virtual machine */
  ports: SecuritySolutionsAPIJitNetworkAccessRequestPort[];
}

export function securitySolutionsAPIJitNetworkAccessRequestVirtualMachineSerializer(
  item: SecuritySolutionsAPIJitNetworkAccessRequestVirtualMachine,
): any {
  return {
    id: item["id"],
    ports: securitySolutionsAPIJitNetworkAccessRequestPortArraySerializer(item["ports"]),
  };
}

export function securitySolutionsAPIJitNetworkAccessRequestVirtualMachineDeserializer(
  item: any,
): SecuritySolutionsAPIJitNetworkAccessRequestVirtualMachine {
  return {
    id: item["id"],
    ports: securitySolutionsAPIJitNetworkAccessRequestPortArrayDeserializer(item["ports"]),
  };
}

export function securitySolutionsAPIJitNetworkAccessRequestPortArraySerializer(
  result: Array<SecuritySolutionsAPIJitNetworkAccessRequestPort>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIJitNetworkAccessRequestPortSerializer(item);
  });
}

export function securitySolutionsAPIJitNetworkAccessRequestPortArrayDeserializer(
  result: Array<SecuritySolutionsAPIJitNetworkAccessRequestPort>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIJitNetworkAccessRequestPortDeserializer(item);
  });
}

/** model interface SecuritySolutionsAPIJitNetworkAccessRequestPort */
export interface SecuritySolutionsAPIJitNetworkAccessRequestPort {
  number: number;
  /** Mutually exclusive with the "allowedSourceAddressPrefixes" parameter. Should be an IP address or CIDR, for example "192.168.0.3" or "192.168.0.0/16". */
  allowedSourceAddressPrefix?: string;
  /** Mutually exclusive with the "allowedSourceAddressPrefix" parameter. */
  allowedSourceAddressPrefixes?: string[];
  /** The date & time at which the request ends in UTC */
  endTimeUtc: Date;
  /** The status of the port */
  status: SecuritySolutionsAPIStatus;
  /** A description of why the `status` has its value */
  statusReason: SecuritySolutionsAPIStatusReason;
  /** The port which is mapped to this port's `number` in the Azure Firewall, if applicable */
  mappedPort?: number;
}

export function securitySolutionsAPIJitNetworkAccessRequestPortSerializer(
  item: SecuritySolutionsAPIJitNetworkAccessRequestPort,
): any {
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

export function securitySolutionsAPIJitNetworkAccessRequestPortDeserializer(
  item: any,
): SecuritySolutionsAPIJitNetworkAccessRequestPort {
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
export enum KnownSecuritySolutionsAPIStatus {
  /** Revoked */
  Revoked = "Revoked",
  /** Initiated */
  Initiated = "Initiated",
}

/**
 * The status of the port \
 * {@link KnownSecuritySolutionsAPIStatus} can be used interchangeably with SecuritySolutionsAPIStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Revoked**: Revoked \
 * **Initiated**: Initiated
 */
export type SecuritySolutionsAPIStatus = string;

/** A description of why the `status` has its value */
export enum KnownSecuritySolutionsAPIStatusReason {
  /** Expired */
  Expired = "Expired",
  /** UserRequested */
  UserRequested = "UserRequested",
  /** NewerRequestInitiated */
  NewerRequestInitiated = "NewerRequestInitiated",
}

/**
 * A description of why the `status` has its value \
 * {@link KnownSecuritySolutionsAPIStatusReason} can be used interchangeably with SecuritySolutionsAPIStatusReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Expired**: Expired \
 * **UserRequested**: UserRequested \
 * **NewerRequestInitiated**: NewerRequestInitiated
 */
export type SecuritySolutionsAPIStatusReason = string;

/** model interface _SecuritySolutionsAPIJitNetworkAccessPoliciesList */
export interface _SecuritySolutionsAPIJitNetworkAccessPoliciesList {
  value?: SecuritySolutionsAPIJitNetworkAccessPolicy[];
  readonly nextLink?: string;
}

export function _securitySolutionsAPIJitNetworkAccessPoliciesListDeserializer(
  item: any,
): _SecuritySolutionsAPIJitNetworkAccessPoliciesList {
  return {
    value: !item["value"]
      ? item["value"]
      : securitySolutionsAPIJitNetworkAccessPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securitySolutionsAPIJitNetworkAccessPolicyArraySerializer(
  result: Array<SecuritySolutionsAPIJitNetworkAccessPolicy>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIJitNetworkAccessPolicySerializer(item);
  });
}

export function securitySolutionsAPIJitNetworkAccessPolicyArrayDeserializer(
  result: Array<SecuritySolutionsAPIJitNetworkAccessPolicy>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIJitNetworkAccessPolicyDeserializer(item);
  });
}

/** model interface SecuritySolutionsAPIJitNetworkAccessPolicyInitiateRequest */
export interface SecuritySolutionsAPIJitNetworkAccessPolicyInitiateRequest {
  /** A list of virtual machines & ports to open access for */
  virtualMachines: SecuritySolutionsAPIJitNetworkAccessPolicyInitiateVirtualMachine[];
  /** The justification for making the initiate request */
  justification?: string;
}

export function securitySolutionsAPIJitNetworkAccessPolicyInitiateRequestSerializer(
  item: SecuritySolutionsAPIJitNetworkAccessPolicyInitiateRequest,
): any {
  return {
    virtualMachines:
      securitySolutionsAPIJitNetworkAccessPolicyInitiateVirtualMachineArraySerializer(
        item["virtualMachines"],
      ),
    justification: item["justification"],
  };
}

export function securitySolutionsAPIJitNetworkAccessPolicyInitiateVirtualMachineArraySerializer(
  result: Array<SecuritySolutionsAPIJitNetworkAccessPolicyInitiateVirtualMachine>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIJitNetworkAccessPolicyInitiateVirtualMachineSerializer(item);
  });
}

/** model interface SecuritySolutionsAPIJitNetworkAccessPolicyInitiateVirtualMachine */
export interface SecuritySolutionsAPIJitNetworkAccessPolicyInitiateVirtualMachine {
  /** Resource ID of the virtual machine that is linked to this policy */
  id: string;
  /** The ports to open for the resource with the `id` */
  ports: SecuritySolutionsAPIJitNetworkAccessPolicyInitiatePort[];
}

export function securitySolutionsAPIJitNetworkAccessPolicyInitiateVirtualMachineSerializer(
  item: SecuritySolutionsAPIJitNetworkAccessPolicyInitiateVirtualMachine,
): any {
  return {
    id: item["id"],
    ports: securitySolutionsAPIJitNetworkAccessPolicyInitiatePortArraySerializer(item["ports"]),
  };
}

export function securitySolutionsAPIJitNetworkAccessPolicyInitiatePortArraySerializer(
  result: Array<SecuritySolutionsAPIJitNetworkAccessPolicyInitiatePort>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIJitNetworkAccessPolicyInitiatePortSerializer(item);
  });
}

/** model interface SecuritySolutionsAPIJitNetworkAccessPolicyInitiatePort */
export interface SecuritySolutionsAPIJitNetworkAccessPolicyInitiatePort {
  number: number;
  /** Source of the allowed traffic. If omitted, the request will be for the source IP address of the initiate request. */
  allowedSourceAddressPrefix?: string;
  /** The time to close the request in UTC */
  endTimeUtc: Date;
}

export function securitySolutionsAPIJitNetworkAccessPolicyInitiatePortSerializer(
  item: SecuritySolutionsAPIJitNetworkAccessPolicyInitiatePort,
): any {
  return {
    number: item["number"],
    allowedSourceAddressPrefix: item["allowedSourceAddressPrefix"],
    endTimeUtc: item["endTimeUtc"].toISOString(),
  };
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface SecuritySolutionsAPISecuritySolution extends ProxyResource {
  /** Location where the resource is stored */
  readonly location: string;
  /** The security family of the security solution */
  securityFamily?: SecuritySolutionsAPISecurityFamily;
  /** The security family provisioning State */
  provisioningState?: CommonProvisioningState;
  /** The security solutions' template */
  template?: string;
  /** The security solutions' status */
  protectionStatus?: string;
}

export function securitySolutionsAPISecuritySolutionDeserializer(
  item: any,
): SecuritySolutionsAPISecuritySolution {
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

/** model interface SecuritySolutionsAPISecuritySolutionProperties */
export interface SecuritySolutionsAPISecuritySolutionProperties {
  /** The security family of the security solution */
  securityFamily: SecuritySolutionsAPISecurityFamily;
  /** The security family provisioning State */
  provisioningState: CommonProvisioningState;
  /** The security solutions' template */
  template: string;
  /** The security solutions' status */
  protectionStatus: string;
}

export function securitySolutionsAPISecuritySolutionPropertiesDeserializer(
  item: any,
): SecuritySolutionsAPISecuritySolutionProperties {
  return {
    securityFamily: item["securityFamily"],
    provisioningState: item["provisioningState"],
    template: item["template"],
    protectionStatus: item["protectionStatus"],
  };
}

/** model interface _SecuritySolutionsAPISecuritySolutionList */
export interface _SecuritySolutionsAPISecuritySolutionList {
  value?: SecuritySolutionsAPISecuritySolution[];
  readonly nextLink?: string;
}

export function _securitySolutionsAPISecuritySolutionListDeserializer(
  item: any,
): _SecuritySolutionsAPISecuritySolutionList {
  return {
    value: !item["value"]
      ? item["value"]
      : securitySolutionsAPISecuritySolutionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securitySolutionsAPISecuritySolutionArrayDeserializer(
  result: Array<SecuritySolutionsAPISecuritySolution>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPISecuritySolutionDeserializer(item);
  });
}

/** The resource whose properties describes the allowed traffic between Azure resources */
export interface SecuritySolutionsAPIAllowedConnectionsResource extends ProxyResource {
  /** Location where the resource is stored */
  readonly location: string;
  /** The UTC time on which the allowed connections resource was calculated */
  readonly calculatedDateTime?: Date;
  /** List of connectable resources */
  readonly connectableResources?: SecuritySolutionsAPIConnectableResource[];
}

export function securitySolutionsAPIAllowedConnectionsResourceDeserializer(
  item: any,
): SecuritySolutionsAPIAllowedConnectionsResource {
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
export interface SecuritySolutionsAPIAllowedConnectionsResourceProperties {
  /** The UTC time on which the allowed connections resource was calculated */
  readonly calculatedDateTime?: Date;
  /** List of connectable resources */
  readonly connectableResources?: SecuritySolutionsAPIConnectableResource[];
}

export function securitySolutionsAPIAllowedConnectionsResourcePropertiesDeserializer(
  item: any,
): SecuritySolutionsAPIAllowedConnectionsResourceProperties {
  return {
    calculatedDateTime: !item["calculatedDateTime"]
      ? item["calculatedDateTime"]
      : new Date(item["calculatedDateTime"]),
    connectableResources: !item["connectableResources"]
      ? item["connectableResources"]
      : securitySolutionsAPIConnectableResourceArrayDeserializer(item["connectableResources"]),
  };
}

export function securitySolutionsAPIConnectableResourceArrayDeserializer(
  result: Array<SecuritySolutionsAPIConnectableResource>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIConnectableResourceDeserializer(item);
  });
}

/** Describes the allowed inbound and outbound traffic of an Azure resource */
export interface SecuritySolutionsAPIConnectableResource {
  /** The Azure resource id */
  readonly id?: string;
  /** The list of Azure resources that the resource has inbound allowed connection from */
  readonly inboundConnectedResources?: SecuritySolutionsAPIConnectedResource[];
  /** The list of Azure resources that the resource has outbound allowed connection to */
  readonly outboundConnectedResources?: SecuritySolutionsAPIConnectedResource[];
}

export function securitySolutionsAPIConnectableResourceDeserializer(
  item: any,
): SecuritySolutionsAPIConnectableResource {
  return {
    id: item["id"],
    inboundConnectedResources: !item["inboundConnectedResources"]
      ? item["inboundConnectedResources"]
      : securitySolutionsAPIConnectedResourceArrayDeserializer(item["inboundConnectedResources"]),
    outboundConnectedResources: !item["outboundConnectedResources"]
      ? item["outboundConnectedResources"]
      : securitySolutionsAPIConnectedResourceArrayDeserializer(item["outboundConnectedResources"]),
  };
}

export function securitySolutionsAPIConnectedResourceArrayDeserializer(
  result: Array<SecuritySolutionsAPIConnectedResource>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIConnectedResourceDeserializer(item);
  });
}

/** Describes properties of a connected resource */
export interface SecuritySolutionsAPIConnectedResource {
  /** The Azure resource id of the connected resource */
  readonly connectedResourceId?: string;
  /** The allowed tcp ports */
  readonly tcpPorts?: string;
  /** The allowed udp ports */
  readonly udpPorts?: string;
}

export function securitySolutionsAPIConnectedResourceDeserializer(
  item: any,
): SecuritySolutionsAPIConnectedResource {
  return {
    connectedResourceId: item["connectedResourceId"],
    tcpPorts: item["tcpPorts"],
    udpPorts: item["udpPorts"],
  };
}

/** Known values of {@link ConnectionType} that the service accepts. */
export enum KnownSecuritySolutionsAPIConnectionType {
  /** Internal */
  Internal = "Internal",
  /** External */
  External = "External",
}

/** Type of SecuritySolutionsAPIConnectionType */
export type SecuritySolutionsAPIConnectionType = string;

/** List of all possible traffic between Azure resources */
export interface _SecuritySolutionsAPIAllowedConnectionsList {
  readonly value?: SecuritySolutionsAPIAllowedConnectionsResource[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _securitySolutionsAPIAllowedConnectionsListDeserializer(
  item: any,
): _SecuritySolutionsAPIAllowedConnectionsList {
  return {
    value: !item["value"]
      ? item["value"]
      : securitySolutionsAPIAllowedConnectionsResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securitySolutionsAPIAllowedConnectionsResourceArrayDeserializer(
  result: Array<SecuritySolutionsAPIAllowedConnectionsResource>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIAllowedConnectionsResourceDeserializer(item);
  });
}

/** Describes the server vulnerability assessment details on a resource */
export interface SecuritySolutionsAPIServerVulnerabilityAssessment extends ProxyResource {
  /** The provisioningState of the vulnerability assessment capability on the VM */
  readonly provisioningState?: SecuritySolutionsAPIServerVulnerabilityAssessmentPropertiesProvisioningState;
}

export function securitySolutionsAPIServerVulnerabilityAssessmentDeserializer(
  item: any,
): SecuritySolutionsAPIServerVulnerabilityAssessment {
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
export interface SecuritySolutionsAPIServerVulnerabilityAssessmentProperties {
  /** The provisioningState of the vulnerability assessment capability on the VM */
  readonly provisioningState?: SecuritySolutionsAPIServerVulnerabilityAssessmentPropertiesProvisioningState;
}

export function securitySolutionsAPIServerVulnerabilityAssessmentPropertiesDeserializer(
  item: any,
): SecuritySolutionsAPIServerVulnerabilityAssessmentProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** The provisioningState of the vulnerability assessment capability on the VM */
export enum KnownSecuritySolutionsAPIServerVulnerabilityAssessmentPropertiesProvisioningState {
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
 * {@link KnownSecuritySolutionsAPIServerVulnerabilityAssessmentPropertiesProvisioningState} can be used interchangeably with SecuritySolutionsAPIServerVulnerabilityAssessmentPropertiesProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Provisioning**: Provisioning \
 * **Deprovisioning**: Deprovisioning
 */
export type SecuritySolutionsAPIServerVulnerabilityAssessmentPropertiesProvisioningState = string;

/** List of server vulnerability assessments */
export interface _SecuritySolutionsAPIServerVulnerabilityAssessmentsList {
  value?: SecuritySolutionsAPIServerVulnerabilityAssessment[];
}

export function _securitySolutionsAPIServerVulnerabilityAssessmentsListDeserializer(
  item: any,
): _SecuritySolutionsAPIServerVulnerabilityAssessmentsList {
  return {
    value: !item["value"]
      ? item["value"]
      : securitySolutionsAPIServerVulnerabilityAssessmentArrayDeserializer(item["value"]),
  };
}

export function securitySolutionsAPIServerVulnerabilityAssessmentArrayDeserializer(
  result: Array<SecuritySolutionsAPIServerVulnerabilityAssessment>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIServerVulnerabilityAssessmentDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface SecuritySolutionsAPITopologyResource extends ProxyResource {
  /** Location where the resource is stored */
  readonly location: string;
  /** The UTC time on which the topology was calculated */
  readonly calculatedDateTime?: Date;
  /** Azure resources which are part of this topology resource */
  readonly topologyResources?: SecuritySolutionsAPITopologySingleResource[];
}

export function securitySolutionsAPITopologyResourceDeserializer(
  item: any,
): SecuritySolutionsAPITopologyResource {
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

/** model interface SecuritySolutionsAPITopologyResourceProperties */
export interface SecuritySolutionsAPITopologyResourceProperties {
  /** The UTC time on which the topology was calculated */
  readonly calculatedDateTime?: Date;
  /** Azure resources which are part of this topology resource */
  readonly topologyResources?: SecuritySolutionsAPITopologySingleResource[];
}

export function securitySolutionsAPITopologyResourcePropertiesDeserializer(
  item: any,
): SecuritySolutionsAPITopologyResourceProperties {
  return {
    calculatedDateTime: !item["calculatedDateTime"]
      ? item["calculatedDateTime"]
      : new Date(item["calculatedDateTime"]),
    topologyResources: !item["topologyResources"]
      ? item["topologyResources"]
      : securitySolutionsAPITopologySingleResourceArrayDeserializer(item["topologyResources"]),
  };
}

export function securitySolutionsAPITopologySingleResourceArrayDeserializer(
  result: Array<SecuritySolutionsAPITopologySingleResource>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPITopologySingleResourceDeserializer(item);
  });
}

/** model interface SecuritySolutionsAPITopologySingleResource */
export interface SecuritySolutionsAPITopologySingleResource {
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
  readonly parents?: SecuritySolutionsAPITopologySingleResourceParent[];
  /** Azure resources connected to this resource which are in lower level in the topology view */
  readonly children?: SecuritySolutionsAPITopologySingleResourceChild[];
}

export function securitySolutionsAPITopologySingleResourceDeserializer(
  item: any,
): SecuritySolutionsAPITopologySingleResource {
  return {
    resourceId: item["resourceId"],
    severity: item["severity"],
    recommendationsExist: item["recommendationsExist"],
    networkZones: item["networkZones"],
    topologyScore: item["topologyScore"],
    location: item["location"],
    parents: !item["parents"]
      ? item["parents"]
      : securitySolutionsAPITopologySingleResourceParentArrayDeserializer(item["parents"]),
    children: !item["children"]
      ? item["children"]
      : securitySolutionsAPITopologySingleResourceChildArrayDeserializer(item["children"]),
  };
}

export function securitySolutionsAPITopologySingleResourceParentArrayDeserializer(
  result: Array<SecuritySolutionsAPITopologySingleResourceParent>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPITopologySingleResourceParentDeserializer(item);
  });
}

/** model interface SecuritySolutionsAPITopologySingleResourceParent */
export interface SecuritySolutionsAPITopologySingleResourceParent {
  /** Azure resource id which serves as parent resource in topology view */
  readonly resourceId?: string;
}

export function securitySolutionsAPITopologySingleResourceParentDeserializer(
  item: any,
): SecuritySolutionsAPITopologySingleResourceParent {
  return {
    resourceId: item["resourceId"],
  };
}

export function securitySolutionsAPITopologySingleResourceChildArrayDeserializer(
  result: Array<SecuritySolutionsAPITopologySingleResourceChild>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPITopologySingleResourceChildDeserializer(item);
  });
}

/** model interface SecuritySolutionsAPITopologySingleResourceChild */
export interface SecuritySolutionsAPITopologySingleResourceChild {
  /** Azure resource id which serves as child resource in topology view */
  readonly resourceId?: string;
}

export function securitySolutionsAPITopologySingleResourceChildDeserializer(
  item: any,
): SecuritySolutionsAPITopologySingleResourceChild {
  return {
    resourceId: item["resourceId"],
  };
}

/** model interface _SecuritySolutionsAPITopologyList */
export interface _SecuritySolutionsAPITopologyList {
  readonly value?: SecuritySolutionsAPITopologyResource[];
  readonly nextLink?: string;
}

export function _securitySolutionsAPITopologyListDeserializer(
  item: any,
): _SecuritySolutionsAPITopologyList {
  return {
    value: !item["value"]
      ? item["value"]
      : securitySolutionsAPITopologyResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securitySolutionsAPITopologyResourceArrayDeserializer(
  result: Array<SecuritySolutionsAPITopologyResource>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPITopologyResourceDeserializer(item);
  });
}

/** model interface SecuritySolutionsAPIsecuritySolutionsReferenceDataList */
export interface SecuritySolutionsAPIsecuritySolutionsReferenceDataList {
  value?: SecuritySolutionsAPIsecuritySolutionsReferenceData[];
}

export function securitySolutionsAPIsecuritySolutionsReferenceDataListDeserializer(
  item: any,
): SecuritySolutionsAPIsecuritySolutionsReferenceDataList {
  return {
    value: !item["value"]
      ? item["value"]
      : securitySolutionsAPIsecuritySolutionsReferenceDataArrayDeserializer(item["value"]),
  };
}

export function securitySolutionsAPIsecuritySolutionsReferenceDataArrayDeserializer(
  result: Array<SecuritySolutionsAPIsecuritySolutionsReferenceData>,
): any[] {
  return result.map((item) => {
    return securitySolutionsAPIsecuritySolutionsReferenceDataDeserializer(item);
  });
}

/** model interface SecuritySolutionsAPIsecuritySolutionsReferenceData */
export interface SecuritySolutionsAPIsecuritySolutionsReferenceData {
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
  securityFamily: SecuritySolutionsAPISecurityFamily;
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

export function securitySolutionsAPIsecuritySolutionsReferenceDataDeserializer(
  item: any,
): SecuritySolutionsAPIsecuritySolutionsReferenceData {
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

/** model interface SecuritySolutionsAPIsecuritySolutionsReferenceDataProperties */
export interface SecuritySolutionsAPIsecuritySolutionsReferenceDataProperties {
  /** The security family of the security solution */
  securityFamily: SecuritySolutionsAPISecurityFamily;
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

export function securitySolutionsAPIsecuritySolutionsReferenceDataPropertiesDeserializer(
  item: any,
): SecuritySolutionsAPIsecuritySolutionsReferenceDataProperties {
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

export function _jitNetworkAccessPolicyPropertiesSerializer(
  item: SecuritySolutionsAPIJitNetworkAccessPolicy,
): any {
  return {
    virtualMachines: securitySolutionsAPIJitNetworkAccessPolicyVirtualMachineArraySerializer(
      item["virtualMachines"],
    ),
    requests: !item["requests"]
      ? item["requests"]
      : securitySolutionsAPIJitNetworkAccessRequestArraySerializer(item["requests"]),
  };
}

export function _jitNetworkAccessPolicyPropertiesDeserializer(item: any) {
  return {
    virtualMachines: securitySolutionsAPIJitNetworkAccessPolicyVirtualMachineArrayDeserializer(
      item["virtualMachines"],
    ),
    requests: !item["requests"]
      ? item["requests"]
      : securitySolutionsAPIJitNetworkAccessRequestArrayDeserializer(item["requests"]),
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
      : securitySolutionsAPIConnectableResourceArrayDeserializer(item["connectableResources"]),
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
      : securitySolutionsAPITopologySingleResourceArrayDeserializer(item["topologyResources"]),
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
